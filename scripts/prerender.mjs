import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://www.ancientindianbotanicals.com';
const DEFAULT_IMAGE = `${SITE_URL}/assets/images/hero-botanical-still-life.webp`;

const scraped = JSON.parse(await readFile(path.join(ROOT, 'src/data/scraped_products.json'), 'utf8'));
const roseAbsolute = JSON.parse(await readFile(path.join(ROOT, 'src/data/rose_absolute.json'), 'utf8'));
const products = [...scraped, roseAbsolute].sort((a, b) => a.name.localeCompare(b.name));
const baseHtml = await readFile(path.join(DIST, 'index.html'), 'utf8');

const carrierOils = new Set(['castor-oil', 'kalonji-oil', 'neem-oil', 'olive-oil']);
const waterAndClay = new Set(['rose-water', 'kewra-water', 'multani-mitti']);

const getGroup = (product) => {
  if (waterAndClay.has(product.id)) return 'waters-clays';
  if (carrierOils.has(product.id)) return 'carrier-oils';
  const aroma = product.botanicalName.toLowerCase().startsWith('aroma profile') || product.commercialForms.some((form) => form.toLowerCase().includes('aroma and diffuser'));
  if (aroma) return 'aroma-oils';
  if (product.id === 'rose-absolute' || product.commercialForms.some((form) => form.toLowerCase().includes('natural essential oil'))) return 'essential-oils';
  return 'botanicals';
};

const groupLabels = {
  'essential-oils': 'Natural Essential Oils',
  'aroma-oils': 'Aroma & Diffuser Oils',
  botanicals: 'Botanical Ingredients',
  'carrier-oils': 'Carrier & Herbal Oils',
  'waters-clays': 'Floral Waters & Clays',
};

const pages = [
  { path: '/', title: 'Indian Botanical Ingredients & Essential Oils | Ancient Indian Botanicals', description: 'Specification-led B2B sourcing of Indian botanical ingredients, essential oils, aroma oils, carrier oils, hydrosols and clays.', eyebrow: 'Indian botanical sourcing · Specification-led B2B supply', heading: 'Ancient Indian Botanicals', copy: 'We connect buyer specifications with suitable Indian botanical and aromatic supply routes. Our complete catalogue covers 92 products, with availability, origin, specification, packaging and supporting documents confirmed for each offered lot.' },
  { path: '/essential-oils', title: 'Indian Essential, Aroma & Carrier Oils | Ancient Indian Botanicals', description: 'Explore natural essential oils, clearly identified aroma grades and carrier oils sourced through Indian supply corridors for B2B applications.', eyebrow: 'Complete oils portfolio', heading: 'Natural essential, aroma and carrier oils', copy: 'Browse natural essential oils, separately identified aroma and diffuser grades, and carrier oils for fragrance, personal-care, home-care and formulation applications.', groups: ['essential-oils', 'aroma-oils', 'carrier-oils'] },
  { path: '/botanicals', title: 'Indian Herbs, Extracts, Powders & Clays | Ancient Indian Botanicals', description: 'Browse Indian herbs, roots, seeds, botanical powders, extracts, floral waters and clays with lot-specific documentation review.', eyebrow: 'Complete botanical portfolio', heading: 'Indian botanical ingredients, waters and clays', copy: 'Explore whole, cut and powdered herbs, roots, seeds, selected extracts, floral waters and clays with lot-specific commercial and documentation review.', groups: ['botanicals', 'waters-clays'] },
  { path: '/catalogue', title: 'Complete Botanical Product Catalogue | Ancient Indian Botanicals', description: 'Explore 92 Indian botanical, essential-oil, aroma-oil, carrier-oil, floral-water and clay sourcing routes for commercial enquiries.', eyebrow: 'Complete current catalogue', heading: '92 botanical and aromatic sourcing routes', copy: 'Search the complete product portfolio by botanical identity, form, application and commercial route.', groups: ['essential-oils', 'aroma-oils', 'botanicals', 'carrier-oils', 'waters-clays'] },
  { path: '/packaging', title: 'Botanical Export Packaging Options | Ancient Indian Botanicals', description: 'Compare sample vials, amber glass, aluminium, HDPE, drums, high-barrier pouches, lined bags and private-label packaging for botanical exports.', eyebrow: 'Packaging architecture', heading: 'From evaluation sample to commercial bulk', copy: 'Compare practical packaging routes, typical buyer benefits and the compatibility checks required before supply. Final material, lining, closure, fill, label and transport suitability are confirmed per product and order.' },
  { path: '/quality', title: 'Lot Documentation & Quality Process | Ancient Indian Botanicals', description: 'Understand the lot-specific COA, identity, analytical, safety and packing-document review process for botanical supply.', eyebrow: 'Quality control and compliance', heading: 'Documentation built around the product, lot and destination', copy: 'Available COA, identity, marker, chromatography, contaminant, safety and packing records are reviewed against the approved requirement where applicable.' },
  { path: '/about', title: 'About Ancient Indian Botanicals | Indian Sourcing House', description: 'Ancient Indian Botanicals makes Indian botanical sourcing easier through specification translation, supplier coordination, private-label packaging and lot-specific quality review.', eyebrow: 'You build the brand · We organise the work behind it', heading: 'Your trust is our greatest profit', copy: 'Guided by Vasudhaiva Kutumbakam—the world is one family—we coordinate suitable Indian sourcing routes, samples, available lot documents, brand-ready packaging and export preparation around the approved buyer brief.' },
  { path: '/payments', title: 'B2B Payment & Commercial Process | Ancient Indian Botanicals', description: 'Review the verification-led commercial and payment process used for approved Ancient Indian Botanicals quotations and orders.', eyebrow: 'Secure B2B commercial process', heading: 'Payment follows specification, verification and written approval', copy: 'Commercial instructions are issued only against an approved quotation and verified counterparty route.' },
  { path: '/contact', title: 'Contact the Botanical Trade Desk | Ancient Indian Botanicals', description: 'Contact Ancient Indian Botanicals for product availability, samples, sourcing, documentation, packaging and export enquiries.', eyebrow: 'Ancient Indian Botanicals trade desk', heading: 'Reach the right desk with a complete brief', copy: 'For a faster review, include the product, required form or grade, quantity, application, destination and documentation needs.' },
  { path: '/terms', title: 'Terms of Trade | Ancient Indian Botanicals', description: 'B2B website and commercial terms for Ancient Indian Botanicals.', eyebrow: 'Regulatory and legal policy', heading: 'Terms of Trade', copy: 'Website information is intended for B2B commercial evaluation. Binding obligations arise only through an accepted written commercial document.' },
  { path: '/shipping', title: 'Export Shipping Policy | Ancient Indian Botanicals', description: 'Shipping and dispatch information for approved Ancient Indian Botanicals commercial orders.', eyebrow: 'Regulatory and legal policy', heading: 'Export Shipping Policy', copy: 'Shipping terms, documents, packaging and dispatch obligations are confirmed for the approved product, destination and commercial route.' },
  { path: '/privacy', title: 'Privacy Policy | Ancient Indian Botanicals', description: 'How Ancient Indian Botanicals handles website enquiries and privacy-conscious analytics.', eyebrow: 'Regulatory and legal policy', heading: 'Privacy Policy', copy: 'Enquiry information is used to review and respond to the commercial request. Aggregate cookieless analytics help us understand site use and performance.' },
  { path: '/refunds', title: 'Claims & Quality Resolution | Ancient Indian Botanicals', description: 'Claims, inspection and quality-resolution principles for approved botanical supply orders.', eyebrow: 'Regulatory and legal policy', heading: 'Claims & Quality Resolution', copy: 'Inspection, notification, evidence and resolution requirements are governed by the accepted specification and commercial document.' },
];

const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
const absolute = (value) => value.startsWith('http') ? value : `${SITE_URL}${value}`;

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Ancient Indian Botanicals',
  alternateName: ['Ancient Indian Botanical', 'AncientIndianBotanicals', 'AncientIndianBotanical'],
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/icon-512.png`,
  email: 'office@ancientindianbotanicals.com',
};

const pageFallback = (page) => {
  const scoped = page.groups ? products.filter((product) => page.groups.includes(getGroup(product))) : [];
  const links = scoped.length ? `<section><h2>Products in this collection</h2><ul>${scoped.map((product) => `<li><a href="/products/${escapeHtml(product.id)}">${escapeHtml(product.name)} <em>${escapeHtml(product.botanicalName)}</em></a></li>`).join('')}</ul></section>` : '';
  return `<main style="min-height:100vh;background:#f4efe5;color:#1f2925;padding:3rem 1.25rem;font-family:Georgia,serif"><div style="max-width:72rem;margin:0 auto"><p style="color:#9b6334;letter-spacing:.12em;text-transform:uppercase">${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.heading)}</h1><p>${escapeHtml(page.copy)}</p>${links}<p>Commercial enquiries: <a href="mailto:sales@ancientindianbotanicals.com">sales@ancientindianbotanicals.com</a></p></div></main>`;
};

const productFallback = (product) => `<main style="min-height:100vh;background:#f4efe5;color:#1f2925;padding:3rem 1.25rem;font-family:Georgia,serif"><article style="max-width:72rem;margin:0 auto"><p style="color:#9b6334;letter-spacing:.12em;text-transform:uppercase">${escapeHtml(groupLabels[getGroup(product)])}</p><h1>${escapeHtml(product.name)}</h1><p><em>${escapeHtml(product.botanicalName)}</em></p><img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.name)}" style="max-width:42rem;width:100%;height:auto"><p>${escapeHtml(product.fieldDescription)}</p><p>${escapeHtml(product.whyBuyersKnowIt)}</p><h2>Commercial forms</h2><ul>${product.commercialForms.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul><h2>Typical applications</h2><ul>${product.typicalApplications.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul><h2>Review framework</h2><ul>${product.specifications.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul><p>Availability, grade, origin, composition, MOQ, packaging and documents are confirmed for the approved enquiry and offered lot.</p><p><a href="/catalogue">Return to the complete catalogue</a> · <a href="mailto:sales@ancientindianbotanicals.com?subject=${encodeURIComponent(`Enquiry — ${product.name}`)}">Enquire about this product</a></p></article></main>`;

const replaceMeta = (html, selectorPattern, replacement) => html.replace(selectorPattern, replacement);

const renderHtml = ({ routePath, title, description, image = DEFAULT_IMAGE, type = 'website', fallback, schema }) => {
  const canonical = `${SITE_URL}${routePath === '/' ? '/' : routePath}`;
  let html = baseHtml;
  html = replaceMeta(html, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = replaceMeta(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`);
  html = replaceMeta(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`);
  html = replaceMeta(html, /<meta property="og:type" content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${type}" />`);
  html = replaceMeta(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`);
  html = replaceMeta(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(description)}" />`);
  html = replaceMeta(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`);
  html = replaceMeta(html, /<meta property="og:image" content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${absolute(image)}" />`);
  html = replaceMeta(html, /<meta property="og:image:alt" content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${escapeHtml(title)}" />`);
  html = replaceMeta(html, /<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`);
  html = replaceMeta(html, /<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`);
  html = replaceMeta(html, /<meta name="twitter:image" content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${absolute(image)}" />`);
  html = html.replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/, `<script id="route-structured-data" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`);
  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.indexOf('</body>', rootStart);
  if (rootStart === -1 || bodyEnd === -1) throw new Error(`Unable to locate app root for ${routePath}`);
  html = `${html.slice(0, rootStart)}<div id="root">${fallback}</div>\n  ${html.slice(bodyEnd)}`;
  return html;
};

const writeRoute = async (routePath, html) => {
  if (routePath === '/') {
    await writeFile(path.join(DIST, 'index.html'), html);
    return;
  }
  const outputFile = path.join(DIST, `${routePath.replace(/^\//, '')}.html`);
  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, html);
};

for (const page of pages) {
  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [organization, { '@type': page.path === '/' ? 'WebSite' : 'WebPage', '@id': `${SITE_URL}${page.path}#page`, url: `${SITE_URL}${page.path}`, name: page.title, description: page.description, publisher: { '@id': `${SITE_URL}/#organization` } }],
  };
  await writeRoute(page.path, renderHtml({ routePath: page.path, title: page.title, description: page.description, fallback: pageFallback(page), schema: pageSchema }));
}

for (const product of products) {
  const routePath = `/products/${product.id}`;
  const title = `${product.name} | B2B Indian Botanical Supply`;
  const description = `${product.whyBuyersKnowIt} Forms, applications, documentation and current availability are confirmed per enquiry.`.slice(0, 260);
  const productSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Catalogue', item: `${SITE_URL}/catalogue` },
        { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}${routePath}` },
      ] },
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${routePath}#page`,
        url: `${SITE_URL}${routePath}`,
        name: title,
        description,
        primaryImageOfPage: { '@type': 'ImageObject', contentUrl: absolute(product.image) },
        about: {
          '@type': 'Thing',
          '@id': `${SITE_URL}${routePath}#botanical`,
          name: product.name,
          alternateName: product.botanicalName,
          description: product.fieldDescription,
        },
        keywords: [product.name, product.botanicalName, groupLabels[getGroup(product)]],
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };
  await writeRoute(routePath, renderHtml({ routePath, title, description, image: product.image, type: 'product', fallback: productFallback(product), schema: productSchema }));
}

const allPaths = [...pages.map((page) => page.path), ...products.map((product) => `/products/${product.id}`)];
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allPaths.map((routePath) => `  <url>\n    <loc>${SITE_URL}${routePath === '/' ? '/' : routePath}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${routePath === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${routePath === '/' ? '1.0' : routePath.startsWith('/products/') ? '0.7' : '0.8'}</priority>\n  </url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap);

console.log(`Pre-rendered ${pages.length} pages and ${products.length} product routes (${allPaths.length} sitemap URLs).`);
