import React, { useState } from 'react';
import { BotanicalProduct, ProductCategory } from '../types';
import { BOTANICAL_PRODUCTS } from '../data/products';
import { getProductPresentation } from '../data/productPresentation';
import { Search, ArrowRight, FileText } from 'lucide-react';

interface ProductCatalogueProps {
  initialCategory?: ProductCategory | 'all';
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (product: BotanicalProduct) => void;
  openQuoteModal: (productName?: string) => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  initialCategory = 'all',
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  openQuoteModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);

  const popularSearches = ['Ashwagandha', 'Boswellia', 'Lemongrass', 'Sandalwood', 'Rose water', 'Amla', 'Basil Oil'];

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'essential-oils', label: 'Essential & Aroma Oils' },
    { id: 'botanicals', label: 'Botanical Ingredients' },
    { id: 'hydrosols-clays', label: 'Hydrosols & Waters' },
  ];

  const filteredProducts = BOTANICAL_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.botanicalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.subFamily.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.availableForms.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="editorial-section relative w-full overflow-hidden border-b border-[#b56e3a]/20 bg-[#eee8dd] py-20 text-[#1f2925] md:py-28">
      
      {/* Subtle Wood Texture Background Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.055] grayscale"
        style={{
          backgroundImage: `url('/images/dark_wood_bg.png')`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#eee8dd]/50 via-[#f8f4ec]/80 to-[#eee8dd]" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-12">
          <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold block mb-2">
            Featured B2B Portfolio
          </span>
          <div className="section-rule mb-5" />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-[#1f2925] mb-4">
            Explore our featured portfolio
          </h2>
          <p className="text-sm text-[#52635d] font-light leading-relaxed">
            A selective view of priority sourcing routes. Use the complete catalogue for the broader range; specifications and lot availability are confirmed against each enquiry.
          </p>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="mr-1 text-xs font-semibold text-[#52635d]">Popular searches:</span>
            {popularSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(term)}
                className="cursor-pointer border border-[#b56e3a]/35 bg-[#fbf8f1] px-2.5 py-1 text-xs text-[#344740] transition-colors hover:border-[#173f34] hover:bg-[#173f34] hover:text-[#fbf8f1]"
              >
                {term}
              </button>
            ))}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#b88a2c] underline ml-2 cursor-pointer font-semibold"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#b88a2c]/30">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs uppercase tracking-eyebrow font-semibold px-4 py-2.5 border transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'border-[#173f34] bg-[#173f34] text-[#fbf8f1] shadow-lg'
                    : 'border-[#b56e3a]/35 bg-[#fbf8f1] text-[#344740] hover:border-[#173f34]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#b88a2c] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search botanical, form, or marker..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-[#b56e3a]/40 bg-[#fbf8f1] py-2.5 pl-10 pr-4 text-xs text-[#1f2925] placeholder-[#7a837f] focus:border-[#173f34] focus:outline-none"
            />
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
            {filteredProducts.map((product, index) => {
              const presentation = getProductPresentation(product);
              return (
              <div
                key={product.id}
                className="premium-card flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* Card Image Header (4:3 aspect ratio) */}
                  <div className="image-shell relative aspect-[4/3] overflow-hidden bg-[#041e18]">
                    <img
                      src={presentation.image}
                      alt={product.name}
                      width="1200"
                      height="900"
                      loading={index < 4 ? 'eager' : 'lazy'}
                      decoding="async"
                      onError={(event) => {
                        if (event.currentTarget.dataset.fallback === 'true') return;
                        event.currentTarget.dataset.fallback = 'true';
                        event.currentTarget.src = '/assets/images/product-families-flatlay.webp';
                      }}
                      className="relative z-[1] w-full h-full object-cover transform group-hover:scale-[1.04] transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 bg-[#041e18]/95 border border-[#b88a2c]/60 text-[#b88a2c] text-[10px] uppercase tracking-eyebrow px-2.5 py-1 font-bold">
                      {product.badgeNumber}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-[#041e18]/95 text-[#a8c76b] text-[10px] uppercase tracking-eyebrow px-2 py-0.5 border border-[#b88a2c]/30 font-semibold">
                      {product.subFamily}
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="p-6 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-eyebrow text-[#b88a2c] block mb-1 font-semibold">
                        {product.harvestOrigin}
                      </span>
                      <h3 className="font-serif text-2xl font-semibold text-[#1f2925] group-hover:text-[#9b6334] transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <p className="font-serif italic text-sm text-[#b88a2c] font-light mt-0.5">
                        {product.botanicalName}
                      </p>
                    </div>

                    <p className="line-clamp-2 text-xs font-light leading-relaxed text-[#5f6964]">
                      {presentation.summary}
                    </p>

                    {/* Available Forms */}
                    <div className="pt-2">
                      <span className="text-[10px] uppercase tracking-eyebrow text-[#60746a] font-semibold block mb-1.5">
                        Available Export Forms:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.availableForms.slice(0, 2).map((form, idx) => (
                          <span
                            key={idx}
                            className="border border-[#b56e3a]/25 bg-[#e8e7dc] px-2 py-0.5 text-[10px] text-[#344740]"
                          >
                            {form}
                          </span>
                        ))}
                        {product.availableForms.length > 2 && (
                          <span className="text-[10px] text-[#b88a2c] font-semibold">+{product.availableForms.length - 2} more</span>
                        )}
                      </div>
                    </div>

                    {/* Stock Disclaimer */}
                    <p className="text-[10px] text-[#7f7b6f] italic pt-1">
                      Enquire for current lot availability.
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="flex items-center justify-between gap-2 border-t border-[#b56e3a]/25 bg-[#f4efe5] p-4">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-[#173f34] transition-colors hover:text-[#9b6334]"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#b88a2c]" />
                    <span>View Specifications</span>
                  </button>

                  <button
                    onClick={() => openQuoteModal(product.name)}
                    className="bg-[#b88a2c] hover:bg-[#967020] text-[#041e18] p-2 transition-colors cursor-pointer shadow-md"
                    title={`Request quote for ${product.name}`}
                    aria-label={`Request quote for ${product.name}`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4 border border-[#b56e3a]/35 bg-[#fbf8f1] p-8 py-16 text-center shadow-xl">
            <h3 className="font-serif text-2xl font-bold text-[#1f2925]">No matching botanicals found</h3>
            <p className="mx-auto max-w-md text-xs text-[#5f6964]">
              We couldn't find any items matching "{searchQuery}". Tell our trade desk what your formulation requires and we will match suitable raw lots.
            </p>
            <button
              onClick={() => openQuoteModal()}
              className="bg-[#b88a2c] text-[#041e18] font-bold text-xs uppercase tracking-eyebrow px-6 py-3 cursor-pointer shadow-lg"
            >
              Submit Custom Specification Request
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
