import rawCatalogue from './scraped_products.json';
import roseAbsolute from './rose_absolute.json';
import foodIngredients from './food_ingredients.json';
import partnerExtracts from './partner_extracts.json';
import catalogueOverrides from './catalogue-overrides.json';
import catalogueNames from './catalogue-names.json';
import internationalProductNames from './international-product-names.json';
import productSearchSeo from './product-search-seo.json';

export type CatalogueGroup =
  | 'essential-oils'
  | 'aroma-oils'
  | 'botanicals'
  | 'standardized-extracts'
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
  alternateNames?: string[];
};

const RAW_CATALOGUE_PRODUCTS: CatalogueProduct[] = [
  ...(rawCatalogue as CatalogueProduct[]),
  roseAbsolute as CatalogueProduct,
  ...(foodIngredients as CatalogueProduct[]),
  ...(partnerExtracts as CatalogueProduct[]),
];

const prohibitedProductPattern = /shilajit/i;
const excludedIds = new Set(catalogueOverrides.excludedIds);
const internationalNameByProductId = new Map(internationalProductNames.map((entry) => [entry.productId, entry]));
const productSearchGuideById = new Map(productSearchSeo.map((guide) => [guide.productId, guide]));

export const CATALOGUE_PRODUCTS: CatalogueProduct[] = RAW_CATALOGUE_PRODUCTS
  .filter((product) => !excludedIds.has(product.id) && !prohibitedProductPattern.test(`${product.id} ${product.name}`))
  .map((product) => {
    const overridden = {
      ...product,
      ...(catalogueOverrides.overrides[product.id as keyof typeof catalogueOverrides.overrides] ?? {}),
    };
    const naming = catalogueNames[product.id as keyof typeof catalogueNames];
    const internationalNaming = internationalNameByProductId.get(product.id);
    const searchGuide = productSearchGuideById.get(product.id);
    const alternateNames = Array.from(new Set([
      ...(overridden.alternateNames ?? []),
      ...(naming?.alternateNames ?? []),
      ...(internationalNaming ? [internationalNaming.internationalName, internationalNaming.indianTradeName, ...internationalNaming.aliases.map((alias) => alias.replaceAll('-', ' '))] : []),
      ...(searchGuide?.names ?? []),
    ]));
    return {
      ...overridden,
      ...(naming ? { name: naming.primaryName } : {}),
      ...(alternateNames.length ? { alternateNames } : {}),
    };
  });

export const CATALOGUE_PRODUCT_COUNT = CATALOGUE_PRODUCTS.length;

const STANDARDIZED_EXTRACTS = new Set([
  'amla',
  'ashwagandha',
  'bacopa',
  'bitter-melon',
  'boswellia',
  'cissus',
  'curcumin-extract',
  'fenugreek',
  'ginger-extract',
  'green-tea-extract',
  'gymnema',
  'holy-basil',
  'kalmegh-extract',
  'moringa-extract',
  'safed-musli',
  'shatavari',
  'tribulus',
  'triphala',
]);

const CARRIER_OILS = new Set(['castor-oil', 'kalonji-oil', 'neem-oil', 'olive-oil']);
const WATER_AND_CLAY_PRODUCTS = new Set(['rose-water', 'kewra-water', 'multani-mitti']);

export const getCatalogueGroup = (product: CatalogueProduct): CatalogueGroup => {
  if (product.category === 'standardized-extracts' || STANDARDIZED_EXTRACTS.has(product.id)) return 'standardized-extracts';
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
  'standardized-extracts': 'Standardized Botanical Extracts',
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
  'amla-fruit-powder': 'amla',
  'bacopa-brahmi': 'bacopa',
  'arjuna-bark-powder': 'arjuna-bark',
  'lemongrass-oil': 'lemongrass',
  'agarwood-oudh-aroma-oil': 'agarwood-oudh-aroma',
  'blue-kamal-aroma-oil': 'blue-kamal-aroma',
  'bitter-melon': 'bitter-melon',
};

export const getProductPath = (productId: string) => `/products/${productId}`;
