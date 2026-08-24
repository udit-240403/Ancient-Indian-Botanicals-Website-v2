import rawCatalogue from './scraped_products.json';
import roseAbsolute from './rose_absolute.json';
import foodIngredients from './food_ingredients.json';

export type CatalogueGroup =
  | 'essential-oils'
  | 'aroma-oils'
  | 'botanicals'
  | 'carrier-oils'
  | 'waters-clays'
  | 'seeds-food'
  | 'cold-pressed-oils';

export type CatalogueProduct = {
  id: string;
  name: string;
  botanicalName: string;
  category: string;
  tagline: string;
  specifications: string[];
  commercialForms: string[];
  typicalApplications: string[];
  whyBuyersKnowIt: string;
  fieldDescription: string;
  realWorldApps: Array<{ title: string; description: string }>;
  image: string;
};

export const CATALOGUE_PRODUCTS: CatalogueProduct[] = [
  ...(rawCatalogue as CatalogueProduct[]),
  roseAbsolute as CatalogueProduct,
  ...(foodIngredients as CatalogueProduct[]),
];

const CARRIER_OILS = new Set(['castor-oil', 'kalonji-oil', 'neem-oil', 'olive-oil']);
const WATER_AND_CLAY_PRODUCTS = new Set(['rose-water', 'kewra-water', 'multani-mitti']);

export const getCatalogueGroup = (product: CatalogueProduct): CatalogueGroup => {
  if (product.category === 'seeds-food') return 'seeds-food';
  if (product.category === 'cold-pressed-oils') return 'cold-pressed-oils';
  if (WATER_AND_CLAY_PRODUCTS.has(product.id)) return 'waters-clays';
  if (CARRIER_OILS.has(product.id)) return 'carrier-oils';

  const isAromaGrade =
    product.botanicalName.toLowerCase().startsWith('aroma profile') ||
    product.commercialForms.some((form) => form.toLowerCase().includes('aroma and diffuser'));

  if (isAromaGrade) return 'aroma-oils';
  if (
    product.id === 'rose-absolute' ||
    product.commercialForms.some((form) => form.toLowerCase().includes('natural essential oil'))
  ) {
    return 'essential-oils';
  }

  return 'botanicals';
};

export const CATALOGUE_GROUP_LABELS: Record<CatalogueGroup, string> = {
  'essential-oils': 'Natural Essential Oils',
  'aroma-oils': 'Aroma & Diffuser Oils',
  botanicals: 'Botanical Ingredients',
  'carrier-oils': 'Carrier & Herbal Oils',
  'waters-clays': 'Floral Waters & Clays',
  'seeds-food': 'Seeds, Nuts & Food Ingredients',
  'cold-pressed-oils': 'Cold-Pressed & Culinary Oils',
};

export const FEATURED_TO_CATALOGUE_ID: Record<string, string> = {
  ashwagandha: 'ashwagandha',
  'boswellia-salai-guggul': 'boswellia',
  'sandalwood-oil': 'sandalwood-aroma',
  'basil-oil': 'basil-oil',
  'rose-water-hydrosol': 'rose-water',
  'amla-fruit-powder': 'amla-fruit-powder',
  'bacopa-brahmi': 'bacopa',
  'arjuna-bark-powder': 'arjuna-bark',
  'lemongrass-oil': 'lemongrass',
  'agarwood-oudh-aroma-oil': 'agarwood-oudh-aroma',
  'blue-kamal-aroma-oil': 'blue-kamal-aroma',
  'bitter-melon': 'bitter-melon',
};

export const getProductPath = (productId: string) => `/products/${productId}`;
