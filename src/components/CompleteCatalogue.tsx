import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Search, SlidersHorizontal, X } from 'lucide-react';
import rawCatalogue from '../data/scraped_products.json';

export type CatalogueGroup =
  | 'essential-oils'
  | 'aroma-oils'
  | 'botanicals'
  | 'carrier-oils'
  | 'waters-clays';

type CatalogueProduct = {
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

const ROSE_ABSOLUTE: CatalogueProduct = {
  id: 'rose-absolute',
  name: 'Rose Absolute',
  botanicalName: 'Rosa damascena / Rosa centifolia',
  category: 'essential-oils',
  tagline: 'Natural floral extract · grade confirmed per enquiry',
  specifications: [
    'Botanical species and extraction route confirmed for the offered grade',
    'Lot-specific sensory profile and analytical documents where applicable',
    'Residual-solvent and allergen information reviewed against buyer requirements',
  ],
  commercialForms: ['Natural rose absolute', 'Evaluation and commercial bulk formats'],
  typicalApplications: ['Fine fragrance', 'Luxury personal care', 'Natural-aromatic compositions'],
  whyBuyersKnowIt: 'A concentrated natural rose material valued for depth, warmth and floral tenacity.',
  fieldDescription:
    'Rose absolute is presented separately from rose water and rose aroma oil. Species, extraction route, composition, documentation and availability are confirmed for the specific offered lot.',
  realWorldApps: [
    { title: 'Fine fragrance', description: 'Natural-floral compositions developed to an approved fragrance brief.' },
    { title: 'Personal care', description: 'Premium cosmetic and aromatic formulations subject to grade review.' },
  ],
  image: '/images/scraped/products_floral-oils.webp',
};

const PRODUCTS = [...(rawCatalogue as CatalogueProduct[]), ROSE_ABSOLUTE];

const CARRIER_OILS = new Set([
  'castor-oil',
  'kalonji-oil',
  'neem-oil',
  'olive-oil',
]);

const WATER_AND_CLAY_PRODUCTS = new Set(['rose-water', 'kewra-water', 'multani-mitti']);

const getGroup = (product: CatalogueProduct): CatalogueGroup => {
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

const GROUP_LABELS: Record<CatalogueGroup, string> = {
  'essential-oils': 'Natural Essential Oils',
  'aroma-oils': 'Aroma & Diffuser Oils',
  botanicals: 'Botanical Ingredients',
  'carrier-oils': 'Carrier & Herbal Oils',
  'waters-clays': 'Floral Waters & Clays',
};

const FILTERS: Array<{ id: 'all' | CatalogueGroup; label: string }> = [
  { id: 'all', label: 'All Products' },
  { id: 'essential-oils', label: 'Essential Oils' },
  { id: 'aroma-oils', label: 'Aroma Oils' },
  { id: 'botanicals', label: 'Botanicals' },
  { id: 'carrier-oils', label: 'Carrier Oils' },
  { id: 'waters-clays', label: 'Waters & Clays' },
];

interface CompleteCatalogueProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openQuoteModal: (productName?: string) => void;
  allowedGroups?: CatalogueGroup[];
  initialVisibleCount?: number;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export const CompleteCatalogue: React.FC<CompleteCatalogueProps> = ({
  searchQuery,
  setSearchQuery,
  openQuoteModal,
  allowedGroups,
  initialVisibleCount = 24,
  eyebrow = 'Complete Current Catalogue',
  title = 'A broader Indian botanical portfolio, organised for serious buyers.',
  description = 'Explore natural essential oils, clearly identified aroma grades, botanical ingredients, carrier oils, floral waters and clays. Availability, composition, specification and documents are confirmed in writing for every enquiry.',
}) => {
  const [selectedGroup, setSelectedGroup] = useState<'all' | CatalogueGroup>('all');
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [selectedProduct, setSelectedProduct] = useState<CatalogueProduct | null>(null);

  const scopedProducts = useMemo(
    () => (allowedGroups?.length ? PRODUCTS.filter((product) => allowedGroups.includes(getGroup(product))) : PRODUCTS),
    [allowedGroups],
  );

  const availableFilters = useMemo(
    () => FILTERS.filter((filter) => filter.id === 'all' || !allowedGroups?.length || allowedGroups.includes(filter.id)),
    [allowedGroups],
  );

  const groupCounts = useMemo(
    () =>
      scopedProducts.reduce<Record<string, number>>((counts, product) => {
        const group = getGroup(product);
        counts[group] = (counts[group] ?? 0) + 1;
        return counts;
      }, {}),
    [scopedProducts],
  );

  const filteredProducts = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    return scopedProducts.filter((product) => {
      const group = getGroup(product);
      const matchesGroup = selectedGroup === 'all' || group === selectedGroup;
      const searchableText = [
        product.name,
        product.botanicalName,
        ...product.specifications,
        ...product.commercialForms,
        ...product.typicalApplications,
      ]
        .join(' ')
        .toLowerCase();
      return matchesGroup && (!term || searchableText.includes(term));
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [scopedProducts, searchQuery, selectedGroup]);

  const chooseGroup = (group: 'all' | CatalogueGroup) => {
    setSelectedGroup(group);
    setVisibleCount(initialVisibleCount);
  };

  return (
    <div className="w-full bg-[#041e18] text-[#fbf7ed]">
      <section className="relative overflow-hidden border-b border-[#b88a2c]/30 bg-[#083a30] px-4 py-16 md:px-8 md:py-20">
        <div className="absolute inset-0 opacity-10 bg-[url('/images/dark_wood_bg.png')] bg-cover bg-center" />
        <div className="relative mx-auto max-w-[1440px]">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-eyebrow text-[#b88a2c]">
            {eyebrow} · {scopedProducts.length} Product Routes
          </span>
          <h1 className="max-w-5xl font-serif text-4xl font-semibold leading-tight text-[#fbf7ed] md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm font-light leading-relaxed text-[#f2ead9]/85 md:text-base">
            {description}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <div className="mb-8 border border-[#b88a2c]/35 bg-[#062b23] p-4 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {availableFilters.map((filter) => {
                const count = filter.id === 'all' ? scopedProducts.length : groupCounts[filter.id] ?? 0;
                return (
                  <button
                    key={filter.id}
                    onClick={() => chooseGroup(filter.id)}
                    className={`border px-3.5 py-2 text-[10px] font-semibold uppercase tracking-eyebrow transition-colors md:text-[11px] ${
                      selectedGroup === filter.id
                        ? 'border-[#b88a2c] bg-[#b88a2c] text-[#041e18]'
                        : 'border-[#b88a2c]/35 bg-[#041e18] text-[#fbf7ed] hover:border-[#b88a2c]'
                    }`}
                  >
                    {filter.label} <span className="ml-1 opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b88a2c]" />
              <input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setVisibleCount(initialVisibleCount);
                }}
                placeholder="Search product, botanical name, form or use..."
                aria-label="Search complete product catalogue"
                className="w-full border border-[#b88a2c]/45 bg-[#041e18] py-3 pl-10 pr-10 text-xs text-[#fbf7ed] placeholder:text-[#82966f] focus:border-[#b88a2c] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear catalogue search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#82966f] hover:text-[#fbf7ed]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#b88a2c]/20 pt-4 text-xs text-[#f2ead9]/70">
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#b88a2c]" />
              {filteredProducts.length} matching product{filteredProducts.length === 1 ? '' : 's'}
            </span>
            <span className="hidden text-right md:block">Current availability is confirmed only after enquiry.</span>
          </div>
        </div>

        {filteredProducts.length ? (
          <>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.slice(0, visibleCount).map((product, index) => {
                const group = getGroup(product);
                return (
                  <article
                    key={product.id}
                    className="group flex flex-col overflow-hidden border border-[#b88a2c]/30 bg-[#062b23] shadow-xl transition-transform duration-300 hover:-translate-y-1 hover:border-[#b88a2c]/70"
                  >
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="image-shell relative block aspect-[4/3] w-full overflow-hidden bg-[#083a30] text-left"
                      aria-label={`View details for ${product.name}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading={index < 8 ? 'eager' : 'lazy'}
                        decoding="async"
                        onError={(event) => { event.currentTarget.hidden = true; }}
                        className="relative z-[1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                      <span className="absolute left-3 top-3 border border-[#b88a2c]/50 bg-[#041e18]/95 px-2.5 py-1 text-[9px] font-bold uppercase tracking-eyebrow text-[#b88a2c]">
                        {GROUP_LABELS[group]}
                      </span>
                    </button>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="mb-1 font-serif text-sm italic text-[#b88a2c]">{product.botanicalName}</p>
                      <h2 className="font-serif text-2xl font-semibold leading-tight text-[#fbf7ed]">
                        {product.name}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-xs font-light leading-relaxed text-[#f2ead9]/75">
                        {product.whyBuyersKnowIt || product.fieldDescription}
                      </p>

                      <div className="mt-4">
                        <span className="mb-2 block text-[9px] font-semibold uppercase tracking-eyebrow text-[#a8c76b]">
                          Used across
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.typicalApplications.slice(0, 3).map((application) => (
                            <span
                              key={application}
                              className="rounded-full border border-[#82966f]/35 bg-[#083a30] px-2.5 py-1 text-[9px] text-[#f2ead9]/85"
                            >
                              {application}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {product.commercialForms.slice(0, 2).map((form) => (
                          <span
                            key={form}
                            className="border border-[#b88a2c]/25 bg-[#041e18] px-2 py-1 text-[9px] text-[#f2ead9]/80"
                          >
                            {form}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#b88a2c]/20 pt-5">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="text-[11px] font-semibold uppercase tracking-eyebrow text-[#fbf7ed] hover:text-[#b88a2c]"
                        >
                          View details
                        </button>
                        <button
                          onClick={() => openQuoteModal(product.name)}
                          aria-label={`Request ${product.name}`}
                          className="flex items-center gap-1.5 bg-[#b88a2c] px-3 py-2 text-[10px] font-bold uppercase tracking-eyebrow text-[#041e18] hover:bg-[#d3a84f]"
                        >
                          Enquire <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {visibleCount < filteredProducts.length && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisibleCount((count) => count + 24)}
                  className="border border-[#b88a2c] bg-[#062b23] px-8 py-3 text-xs font-semibold uppercase tracking-eyebrow text-[#fbf7ed] hover:bg-[#b88a2c] hover:text-[#041e18]"
                >
                  Load more products
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="border border-[#b88a2c]/35 bg-[#062b23] px-6 py-16 text-center">
            <h2 className="font-serif text-3xl text-[#fbf7ed]">No matching product found</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#f2ead9]/70">
              Send the required botanical, grade, form and application to our trade desk for a custom sourcing review.
            </p>
            <button
              onClick={() => openQuoteModal(searchQuery)}
              className="mt-6 bg-[#b88a2c] px-7 py-3 text-xs font-bold uppercase tracking-eyebrow text-[#041e18]"
            >
              Request custom sourcing
            </button>
          </div>
        )}
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative my-8 max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-[#b88a2c] bg-[#062b23] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#b88a2c]/35 bg-[#083a30] px-5 py-4 md:px-7">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-[#b88a2c]">
                  {GROUP_LABELS[getGroup(selectedProduct)]}
                </span>
                <h2 className="font-serif text-2xl font-semibold text-[#fbf7ed] md:text-3xl">
                  {selectedProduct.name}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                aria-label="Close product details"
                className="p-2 text-[#82966f] hover:text-[#fbf7ed]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid gap-7 p-5 md:grid-cols-12 md:p-8">
              <div className="md:col-span-5">
                <div className="image-shell aspect-[4/3] overflow-hidden border border-[#b88a2c]/30 bg-[#083a30]">
                  <img src={selectedProduct.image} alt={selectedProduct.name} onError={(event) => { event.currentTarget.hidden = true; }} className="relative z-[1] h-full w-full object-cover" />
                </div>
                <p className="mt-4 font-serif text-lg italic text-[#b88a2c]">{selectedProduct.botanicalName}</p>
              </div>

              <div className="space-y-6 md:col-span-7">
                <p className="text-sm font-light leading-relaxed text-[#f2ead9]/85">
                  {selectedProduct.fieldDescription}
                </p>

                <div>
                  <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-[#a8c76b]">
                    Industry applications
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {selectedProduct.realWorldApps.map((application) => (
                      <div key={application.title} className="border border-[#b88a2c]/25 bg-[#041e18] p-3">
                        <strong className="block text-xs text-[#fbf7ed]">{application.title}</strong>
                        <span className="mt-1 block text-[11px] leading-relaxed text-[#f2ead9]/70">{application.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-[#a8c76b]">
                    Commercial value
                  </h3>
                  <p className="border-l-2 border-[#b88a2c] pl-4 text-sm font-light leading-relaxed text-[#f2ead9]/85">
                    {selectedProduct.whyBuyersKnowIt}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-[#a8c76b]">
                    Commercial forms
                  </h3>
                  <div className="space-y-2">
                    {selectedProduct.commercialForms.map((form) => (
                      <div key={form} className="flex items-start gap-2 text-xs text-[#f2ead9]/85">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b88a2c]" />
                        <span>{form}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-[#a8c76b]">
                    Review points
                  </h3>
                  <div className="space-y-2">
                    {selectedProduct.specifications.map((specification) => (
                      <div key={specification} className="flex items-start gap-2 text-xs text-[#f2ead9]/85">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b88a2c]" />
                        <span>{specification}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-[#b88a2c]/30 bg-[#041e18] p-4 text-xs leading-relaxed text-[#f2ead9]/75">
                  Product availability, grade, origin, composition, MOQ, packaging and supporting documents are confirmed only for the approved enquiry and offered lot.
                </div>

                <button
                  onClick={() => {
                    const productName = selectedProduct.name;
                    setSelectedProduct(null);
                    openQuoteModal(productName);
                  }}
                  className="flex items-center gap-2 bg-[#b88a2c] px-6 py-3 text-xs font-bold uppercase tracking-eyebrow text-[#041e18] hover:bg-[#d3a84f]"
                >
                  Request this product <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
