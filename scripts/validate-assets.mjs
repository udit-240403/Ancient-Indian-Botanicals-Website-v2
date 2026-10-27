import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const productFiles = [
  'src/data/scraped_products.json',
  'src/data/rose_absolute.json',
  'src/data/food_ingredients.json',
  'src/data/partner_extracts.json',
];

const products = [];
for (const file of productFiles) {
  const parsed = JSON.parse(await readFile(path.join(root, file), 'utf8'));
  products.push(...(Array.isArray(parsed) ? parsed : [parsed]));
}

const overrides = JSON.parse(await readFile(path.join(root, 'src/data/catalogue-overrides.json'), 'utf8'));
const internationalNames = JSON.parse(await readFile(path.join(root, 'src/data/international-product-names.json'), 'utf8'));
const ashwagandhaGuide = JSON.parse(await readFile(path.join(root, 'src/data/ashwagandha-search-guide.json'), 'utf8'));
const commonNameGuides = JSON.parse(await readFile(path.join(root, 'src/data/common-name-search-guides.json'), 'utf8'));
const vercelConfig = JSON.parse(await readFile(path.join(root, 'vercel.json'), 'utf8'));
const missing = [];
for (const product of products) {
  const image = overrides.overrides?.[product.id]?.image ?? product.image;
  const file = path.join(root, 'public', image.replace(/^\//, ''));
  try {
    await access(file);
    if ((await stat(file)).size === 0) missing.push(`${product.id}: ${image} (empty file)`);
  } catch {
    missing.push(`${product.id}: ${image}`);
  }
}

const imageRoots = [path.join(root, 'public', 'images'), path.join(root, 'public', 'assets', 'images')];
const invalidImages = [];
const scanImages = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await scanImages(file);
      continue;
    }
    if (!/\.(?:webp|png|jpe?g)$/i.test(entry.name)) continue;
    const data = await readFile(file);
    const webp = data.length >= 12 && data.subarray(0, 4).toString('ascii') === 'RIFF' && data.subarray(8, 12).toString('ascii') === 'WEBP';
    const png = data.length >= 8 && data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
    const jpeg = data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
    if (!webp && !png && !jpeg) invalidImages.push(path.relative(root, file));
  }
};

for (const imageRoot of imageRoots) await scanImages(imageRoot);

if (invalidImages.length) {
  console.error(`Invalid or incorrectly encoded image files:\n${invalidImages.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

if (missing.length) {
  console.error(`Missing catalogue imagery:\n${missing.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

const productIds = new Set(products.map((product) => product.id));
const canonicalProductIds = new Set(products.map((product) => product.id).filter((id) => !overrides.excludedIds.includes(id) && !/shilajit/i.test(id)));
const redirectMap = new Map((vercelConfig.redirects ?? []).map((redirect) => [redirect.source, redirect.destination]));
const seenAliases = new Set();
const nameDirectoryErrors = [];

for (const entry of internationalNames) {
  if (!productIds.has(entry.productId) || !canonicalProductIds.has(entry.productId)) nameDirectoryErrors.push(`Unknown or excluded product: ${entry.productId}`);
  for (const alias of entry.aliases) {
    if (seenAliases.has(alias)) nameDirectoryErrors.push(`Duplicate alias: ${alias}`);
    seenAliases.add(alias);
    if (canonicalProductIds.has(alias)) nameDirectoryErrors.push(`Alias collides with a canonical product ID: ${alias}`);
    const source = `/products/${alias}`;
    const expected = `/products/${entry.productId}`;
    if (redirectMap.get(source) !== expected) nameDirectoryErrors.push(`Missing redirect: ${source} -> ${expected}`);
  }
}

for (const guide of [ashwagandhaGuide, ...commonNameGuides]) {
  if (!canonicalProductIds.has(guide.productId)) nameDirectoryErrors.push(`Unknown search-guide product: ${guide.productId}`);
  for (const alias of guide.urlAliases) {
    if (seenAliases.has(alias)) nameDirectoryErrors.push(`Duplicate alias: ${alias}`);
    seenAliases.add(alias);
    if (canonicalProductIds.has(alias)) nameDirectoryErrors.push(`Search-guide alias collides with a canonical product ID: ${alias}`);
    const source = `/products/${alias}`;
    const expected = `/products/${guide.productId}`;
    if (redirectMap.get(source) !== expected) nameDirectoryErrors.push(`Missing redirect: ${source} -> ${expected}`);
  }
}

if (nameDirectoryErrors.length) {
  console.error(`Invalid international-name directory:\n${nameDirectoryErrors.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log(`Validated ${products.length} catalogue image references.`);
console.log('Validated image file signatures across public image directories.');
console.log(`Validated ${seenAliases.size} international-name URL aliases.`);
