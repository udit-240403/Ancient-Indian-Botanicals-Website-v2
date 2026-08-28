export const SITE_URL = 'https://www.ancientindianbotanicals.com';

export const PAGE_ROUTES: Record<string, string> = {
  home: '/',
  'essential-oils': '/essential-oils',
  botanicals: '/botanicals',
  'food-ingredients': '/food-ingredients',
  catalogue: '/catalogue',
  search: '/catalogue',
  packaging: '/packaging',
  quality: '/quality',
  faq: '/faq',
  about: '/about',
  payments: '/payments',
  contact: '/contact',
  terms: '/terms',
  shipping: '/shipping',
  privacy: '/privacy',
  refunds: '/refunds',
};

export const PAGE_META: Record<string, { title: string; description: string }> = {
  home: {
    title: 'Indian Botanicals & Essential Oils | Ancient Indian Botanicals',
    description: 'Ancient Indian Botanicals connects B2B buyers with Indian botanicals, essential oils, seeds, nuts and value-added food ingredients through specification-led sourcing and lot-specific review.',
  },
  'essential-oils': {
    title: 'Indian Essential, Aroma & Carrier Oils | Ancient Indian Botanicals',
    description: 'Explore natural essential oils, clearly identified aroma grades and carrier oils sourced through Indian supply corridors for B2B applications.',
  },
  botanicals: {
    title: 'Indian Botanicals, Herbs & Extracts | Ancient Indian Botanicals',
    description: 'Explore Indian botanicals for B2B sourcing: herbs, roots, seeds, powders, extracts, floral waters and clays, with commercial forms and lot-specific review.',
  },
  'food-ingredients': {
    title: 'Indian Seeds, Nuts & Food Ingredients | Ancient Indian Botanicals',
    description: 'Explore enquiry-led B2B routes for oilseeds, nuts, makhana, coconut products, jaggery, millets, dehydrated ingredients and cold-pressed oils from India.',
  },
  catalogue: {
    title: 'Complete Botanical Product Catalogue | Ancient Indian Botanicals',
    description: 'Explore 132 Indian botanical, essential-oil, oilseed, nut, dehydrated-food, cold-pressed-oil, floral-water and clay sourcing routes for commercial enquiries.',
  },
  packaging: {
    title: 'Botanical Export Packaging Options | Ancient Indian Botanicals',
    description: 'Compare sample vials, amber glass, aluminium, HDPE, drums, high-barrier pouches, lined bags and private-label packaging for botanical exports.',
  },
  quality: {
    title: 'Lot Documentation & Quality Process | Ancient Indian Botanicals',
    description: 'Understand the lot-specific COA, identity, analytical, safety and packing-document review process for botanical supply.',
  },
  faq: {
    title: 'Botanical Sourcing FAQ | Ancient Indian Botanicals',
    description: 'Answers about MOQ, COA and specification documents, payment terms, Incoterms, private-label packaging and verified company registrations.',
  },
  about: {
    title: 'About Ancient Indian Botanicals | Indian Sourcing House',
    description: 'Meet an Indian sourcing house established in 2026 and registered under GST and Udyam, supporting specification-led botanical and food-ingredient coordination.',
  },
  payments: {
    title: 'B2B Payment & Commercial Process | Ancient Indian Botanicals',
    description: 'Review the verification-led commercial and payment process used for approved Ancient Indian Botanicals quotations and orders.',
  },
  contact: {
    title: 'Contact the Botanical Trade Desk | Ancient Indian Botanicals',
    description: 'Contact Ancient Indian Botanicals for product availability, samples, sourcing, documentation, packaging and export enquiries.',
  },
  terms: { title: 'Terms of Trade | Ancient Indian Botanicals', description: 'B2B website and commercial terms for Ancient Indian Botanicals.' },
  shipping: { title: 'Export Shipping Policy | Ancient Indian Botanicals', description: 'Shipping and dispatch information for approved Ancient Indian Botanicals commercial orders.' },
  privacy: { title: 'Privacy Policy | Ancient Indian Botanicals', description: 'How Ancient Indian Botanicals handles website enquiries and privacy-conscious analytics.' },
  refunds: { title: 'Claims & Quality Resolution | Ancient Indian Botanicals', description: 'Claims, inspection and quality-resolution principles for approved botanical supply orders.' },
};

export const normalizePath = (pathname: string) => {
  const clean = pathname.split('?')[0].replace(/\/+$/, '');
  return clean || '/';
};

export const getPageIdFromPath = (pathname: string) => {
  const path = normalizePath(pathname);
  if (path.startsWith('/products/')) return 'product';
  return Object.entries(PAGE_ROUTES).find(([id, route]) => id !== 'search' && route === path)?.[0] ?? 'not-found';
};

export const getProductIdFromPath = (pathname: string) => {
  const match = normalizePath(pathname).match(/^\/products\/([^/]+)$/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const getPathForPage = (pageId: string) => PAGE_ROUTES[pageId] ?? '/';
