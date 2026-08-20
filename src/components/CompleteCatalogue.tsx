import React, { useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  CATALOGUE_GROUP_LABELS,
  CATALOGUE_PRODUCTS,
  CatalogueGroup,
  CatalogueProduct,
  getCatalogueGroup,
  getProductPath,
} from '../data/catalogue';
import { ProductVisual } from './ProductVisual';

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
  heroImage?: string;
  heroImagePosition?: string;
  heroMediaLabel?: string;
  contextualIntro?: React.ReactNode;
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
  heroImage = '/assets/images/product-families-flatlay.webp',
  heroImagePosition = 'center',
  heroMediaLabel = 'Editorial portfolio imagery',
  contextualIntro,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<'all' | CatalogueGroup>('all');
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [selectedProduct, setSelectedProduct] = useState<CatalogueProduct | null>(null);

  const scopedProducts = useMemo(
    () => (allowedGroups?.length ? CATALOGUE_PRODUCTS.filter((product) => allowedGroups.includes(getCatalogueGroup(product))) : CATALOGUE_PRODUCTS),
    [allowedGroups],
  );

  const availableFilters = useMemo(
    () => FILTERS.filter((filter) => filter.id === 'all' || !allowedGroups?.length || allowedGroups.includes(filter.id)),
    [allowedGroups],
  );

  const groupCounts = useMemo(
    () =>
      scopedProducts.reduce<Record<string, number>>((counts, product) => {
        const group = getCatalogueGroup(product);
        counts[group] = (counts[group] ?? 0) + 1;
        return counts;
      }, {}),
    [scopedProducts],
  );

  const filteredProducts = useMemo(() => {
    const term = searchQuery.trim().toLowerCase();
    return scopedProducts.filter((product) => {
      const group = getCatalogueGroup(product);
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
    <div className="w-full bg-[#f4efe5] text-[#1f2925]">
      <section className="relative flex min-h-[430px] items-center overflow-hidden border-b border-[#b56e3a]/30 bg-[#eee8dd] px-4 py-16 md:min-h-[500px] md:px-8 md:py-20">
        <img
          src={heroImage}
          alt=""
          aria-hidden="true"
          width={1774}
          height={887}
          loading="eager"
          fetchPriority="high"
          decoding="async"
              onError={(event) => {
                if (event.currentTarget.dataset.fallback === 'true') return;
                event.currentTarget.dataset.fallback = 'true';
                event.currentTarget.src = '/assets/images/product-families-flatlay.webp';
              }}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: heroImagePosition }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(244,239,229,.99)_0%,rgba(244,239,229,.96)_40%,rgba(244,239,229,.76)_61%,rgba(244,239,229,.24)_100%)] max-md:bg-[linear-gradient(90deg,rgba(244,239,229,.96),rgba(244,239,229,.82))]" />
        <div className="absolute inset-0 bg-[url('/assets/images/section-botanical-texture.webp')] bg-cover bg-center opacity-[0.035] grayscale" />
        <div className="absolute inset-y-0 left-0 w-1.5 bg-[#173f34] md:w-2" />
        <div className="relative mx-auto w-full max-w-[1440px]">
          <div className="max-w-4xl lg:max-w-[64%]">
          <span className="mb-3 block text-[11px] font-semibold uppercase tracking-eyebrow text-[#9b6334]">
            {eyebrow} · {scopedProducts.length} Product Routes
          </span>
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-[#1f2925] md:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-sm font-light leading-relaxed text-[#52635d] md:text-base">
            {description}
          </p>
          </div>
        </div>
        <span className="absolute bottom-4 right-5 hidden border border-[#173f34]/18 bg-[#fbf8f1]/78 px-3 py-1.5 text-[8px] font-bold uppercase tracking-eyebrow text-[#344740]/72 backdrop-blur-sm md:block">{heroMediaLabel}</span>
      </section>

      {contextualIntro}

      <section className="mx-auto max-w-[1440px] px-4 py-12 md:px-8 md:py-16">
        <div className="mb-8 border border-[#b56e3a]/30 bg-[#fbf8f1] p-4 shadow-[0_18px_45px_-34px_rgba(16,42,35,.55)] md:p-6">
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
                        ? 'border-[#173f34] bg-[#173f34] text-[#fbf8f1]'
                        : 'border-[#b56e3a]/30 bg-[#f4efe5] text-[#344740] hover:border-[#173f34]'
                    }`}
                  >
                    {filter.label} <span className="ml-1 opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9b6334]" />
              <input
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setVisibleCount(initialVisibleCount);
                }}
                placeholder="Search product, botanical name, form or use..."
                aria-label="Search complete product catalogue"
                className="w-full border border-[#b56e3a]/40 bg-white py-3 pl-10 pr-10 text-xs text-[#1f2925] placeholder:text-[#7a837f] focus:border-[#173f34] focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear catalogue search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a837f] hover:text-[#173f34]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#b56e3a]/20 pt-4 text-xs text-[#66706b]">
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
                const group = getCatalogueGroup(product);
                return (
                  <article
                    key={product.id}
                    className="group flex flex-col overflow-hidden border border-[#b56e3a]/25 bg-[#fbf8f1] shadow-[0_18px_45px_-30px_rgba(16,42,35,.45)] transition-all duration-300 hover:-translate-y-1 hover:border-[#b56e3a]/65 hover:shadow-[0_24px_55px_-30px_rgba(16,42,35,.6)]"
                  >
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="relative block w-full text-left"
                      aria-label={`View details for ${product.name}`}
                    >
                      <ProductVisual
                        src={product.image}
                        alt={product.name}
                        loading={index < 8 ? 'eager' : 'lazy'}
                        fetchPriority={index < 4 ? 'high' : 'auto'}
                        className="aspect-[4/3] w-full"
                      >
                        <span className="absolute left-3 top-3 z-[4] border border-[#d4a43d]/55 bg-[#041e18]/94 px-2.5 py-1 text-[9px] font-bold uppercase tracking-eyebrow text-[#e1bd67] backdrop-blur-sm">
                          {CATALOGUE_GROUP_LABELS[group]}
                        </span>
                      </ProductVisual>
                    </button>

                    <div className="flex flex-1 flex-col p-5">
                      <p className="mb-1 font-serif text-sm italic text-[#b88a2c]">{product.botanicalName}</p>
                      <h2 className="font-serif text-2xl font-semibold leading-tight text-[#1f2925]">
                        <a href={getProductPath(product.id)} className="transition-colors hover:text-[#9b6334]">{product.name}</a>
                      </h2>
                      <p className="mt-3 line-clamp-3 text-xs font-light leading-relaxed text-[#5f6964]">
                        {product.whyBuyersKnowIt || product.fieldDescription}
                      </p>

                      <div className="mt-4">
                        <span className="mb-2 block text-[9px] font-semibold uppercase tracking-eyebrow text-[#60746a]">
                          Used across
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.typicalApplications.slice(0, 3).map((application) => (
                            <span
                              key={application}
                              className="rounded-full border border-[#82966f]/30 bg-[#e8e7dc] px-2.5 py-1 text-[9px] text-[#344740]"
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
                            className="border border-[#b56e3a]/25 bg-white px-2 py-1 text-[9px] text-[#5f6964]"
                          >
                            {form}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#b88a2c]/20 pt-5">
                        <a
                          href={getProductPath(product.id)}
                          className="text-[11px] font-semibold uppercase tracking-eyebrow text-[#173f34] hover:text-[#9b6334]"
                        >
                          Full product page
                        </a>
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
                  className="border border-[#173f34] bg-[#173f34] px-8 py-3 text-xs font-semibold uppercase tracking-eyebrow text-[#fbf8f1] hover:bg-[#102a23]"
                >
                  Load more products
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="border border-[#b56e3a]/30 bg-[#fbf8f1] px-6 py-16 text-center">
            <h2 className="font-serif text-3xl text-[#1f2925]">No matching product found</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-[#66706b]">
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
          <div className="relative my-8 max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-[#b56e3a] bg-[#fbf8f1] text-[#1f2925] shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#b88a2c]/35 bg-[#083a30] px-5 py-4 md:px-7">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-[#b88a2c]">
                  {CATALOGUE_GROUP_LABELS[getCatalogueGroup(selectedProduct)]}
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
                <ProductVisual src={selectedProduct.image} alt={selectedProduct.name} loading="eager" className="aspect-[4/3] border border-[#b88a2c]/30" />
                <p className="mt-4 font-serif text-lg italic text-[#b88a2c]">{selectedProduct.botanicalName}</p>
              </div>

              <div className="space-y-6 md:col-span-7">
                <p className="text-sm font-light leading-relaxed text-[#52635d]">
                  {selectedProduct.fieldDescription}
                </p>

                <div>
                  <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-[#60746a]">
                    Industry applications
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {selectedProduct.realWorldApps.map((application) => (
                      <div key={application.title} className="border border-[#b56e3a]/25 bg-[#f4efe5] p-3">
                        <strong className="block text-xs text-[#1f2925]">{application.title}</strong>
                        <span className="mt-1 block text-[11px] leading-relaxed text-[#66706b]">{application.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-[#60746a]">
                    Commercial value
                  </h3>
                  <p className="border-l-2 border-[#b88a2c] pl-4 text-sm font-light leading-relaxed text-[#52635d]">
                    {selectedProduct.whyBuyersKnowIt}
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-[#60746a]">
                    Commercial forms
                  </h3>
                  <div className="space-y-2">
                    {selectedProduct.commercialForms.map((form) => (
                      <div key={form} className="flex items-start gap-2 text-xs text-[#52635d]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b88a2c]" />
                        <span>{form}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-eyebrow text-[#60746a]">
                    Review points
                  </h3>
                  <div className="space-y-2">
                    {selectedProduct.specifications.map((specification) => (
                      <div key={specification} className="flex items-start gap-2 text-xs text-[#52635d]">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b88a2c]" />
                        <span>{specification}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-[#b56e3a]/30 bg-[#f4efe5] p-4 text-xs leading-relaxed text-[#66706b]">
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
