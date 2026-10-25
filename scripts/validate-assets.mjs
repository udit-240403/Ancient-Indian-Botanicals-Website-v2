import { access, readFile, stat } from 'node:fs/promises';
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

if (missing.length) {
  console.error(`Missing catalogue imagery:\n${missing.map((item) => `- ${item}`).join('\n')}`);
  process.exit(1);
}

console.log(`Validated ${products.length} catalogue image references.`);
