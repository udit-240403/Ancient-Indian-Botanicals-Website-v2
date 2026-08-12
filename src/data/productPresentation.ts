import { BotanicalProduct } from '../types';

type ProductPresentation = {
  image: string;
  summary: string;
};

const PRODUCT_PRESENTATION: Record<string, ProductPresentation> = {
  ashwagandha: {
    image: '/images/scraped/products_ashwagandha.webp',
    summary: 'Whole root, cut material, powder and selected extract grades. Final withanolide range, mesh and documentation are confirmed against the approved lot.',
  },
  'boswellia-salai-guggul': {
    image: '/images/scraped/products_boswellia.webp',
    summary: 'Selected Boswellia serrata resin, powder and extract formats for commercial evaluation. Grade, origin and assay requirements are matched enquiry by enquiry.',
  },
  'sandalwood-oil': {
    image: '/images/scraped/products_commodity_sandalwood-aroma.webp',
    summary: 'Sandalwood oil and aroma-grade routes for fragrance and formulation applications. Botanical identity, composition and legal sourcing documents are confirmed per offered lot.',
  },
  'basil-oil': {
    image: '/images/scraped/products_tulsi.webp',
    summary: 'Tulsi essential-oil routes selected around species, aroma profile, application and analytical requirement. Composition is confirmed through the applicable lot documentation.',
  },
  'rose-water-hydrosol': {
    image: '/images/scraped/products_commodity_rose-water.webp',
    summary: 'Rose hydrosol and floral-water formats for personal-care, fragrance and formulation use. Distillation method, concentration and preservation system are confirmed before quotation.',
  },
  'amla-fruit-powder': {
    image: '/images/scraped/products_amla.webp',
    summary: 'Amla fruit, powder and selected extract formats. Particle size, assay, processing route and supporting tests remain subject to the approved specification and lot.',
  },
  'bacopa-brahmi': {
    image: '/images/scraped/products_bacopa.webp',
    summary: 'Bacopa whole herb, powder and extract routes for commercial evaluation. Bacoside range, solvent system and contaminant limits are agreed before supply.',
  },
  'arjuna-bark-powder': {
    image: '/images/scraped/products_commodity_arjuna-bark.webp',
    summary: 'Arjuna bark in cut, powdered and selected extract formats. Origin, mesh, marker range and documentation are confirmed against the buyer requirement.',
  },
  'lemongrass-oil': {
    image: '/images/scraped/products_lemongrass.webp',
    summary: 'Lemongrass essential-oil routes selected around species, citral target and intended application. GC/MS or other analytical documents are provided where applicable.',
  },
  'agarwood-oudh-aroma-oil': {
    image: '/images/scraped/products_commodity_agarwood-oudh-aroma.webp',
    summary: 'Agarwood-inspired aroma accords and selected distillate routes for fragrance applications. Natural, blended and aroma-grade materials are identified separately in every offer.',
  },
  'blue-kamal-aroma-oil': {
    image: '/images/scraped/products_commodity_blue-kamal-aroma.webp',
    summary: 'Blue-kamal-inspired aroma formats for fragrance and personal-care applications. Composition, carrier system and regulatory suitability are confirmed before quotation.',
  },
  'bitter-melon': {
    image: '/images/scraped/products_bitter-melon.webp',
    summary: 'Karela dried slices, powder and selected extract formats. Mesh, processing method, marker requirement and test limits are agreed for the approved lot.',
  },
};

export const getProductPresentation = (product: BotanicalProduct): ProductPresentation =>
  PRODUCT_PRESENTATION[product.slug] ?? {
    image: product.image,
    summary: 'Available forms, origin, specification and documentation are confirmed against each approved commercial enquiry.',
  };
