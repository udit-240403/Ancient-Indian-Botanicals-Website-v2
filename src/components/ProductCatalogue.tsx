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
    <section className="editorial-section w-full bg-[#041e18] text-[#fbf7ed] py-20 md:py-32 border-b border-[#b88a2c]/20 relative overflow-hidden">
      
      {/* Subtle Wood Texture Background Overlay */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-center filter brightness-[0.7] contrast-[1.2]"
        style={{
          backgroundImage: `url('/images/dark_wood_bg.png')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#041e18] via-transparent to-[#041e18] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-4xl mb-12">
          <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold block mb-2">
            Featured B2B Portfolio
          </span>
          <div className="section-rule mb-5" />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-[#fbf7ed] mb-4">
            Explore our featured portfolio
          </h2>
          <p className="text-sm text-[#f2ead9]/85 font-light leading-relaxed">
            A selective view of priority sourcing routes. Use the complete catalogue for the broader range; specifications and lot availability are confirmed against each enquiry.
          </p>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs text-[#a8c76b] font-semibold mr-1">Popular searches:</span>
            {popularSearches.map((term, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(term)}
                className="text-xs bg-[#062b23] hover:bg-[#b88a2c] hover:text-[#041e18] text-[#f2ead9] border border-[#b88a2c]/40 px-2.5 py-1 transition-colors cursor-pointer"
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
                    ? 'bg-[#b88a2c] text-[#041e18] border-[#b88a2c] shadow-lg'
                    : 'bg-[#062b23] text-[#fbf7ed]/90 border-[#b88a2c]/40 hover:border-[#b88a2c]'
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
              className="w-full bg-[#062b23] border border-[#b88a2c]/50 text-xs text-[#fbf7ed] placeholder-[#82966f] pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#b88a2c]"
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
                      <h3 className="font-serif text-2xl font-semibold text-[#fbf7ed] group-hover:text-[#b88a2c] transition-colors leading-tight">
                        {product.name}
                      </h3>
                      <p className="font-serif italic text-sm text-[#b88a2c] font-light mt-0.5">
                        {product.botanicalName}
                      </p>
                    </div>

                    <p className="text-xs text-[#f2ead9]/80 line-clamp-2 font-light leading-relaxed">
                      {presentation.summary}
                    </p>

                    {/* Available Forms */}
                    <div className="pt-2">
                      <span className="text-[10px] uppercase tracking-eyebrow text-[#a8c76b] font-semibold block mb-1.5">
                        Available Export Forms:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.availableForms.slice(0, 2).map((form, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] bg-[#041e18] border border-[#b88a2c]/30 text-[#fbf7ed] px-2 py-0.5"
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
                <div className="p-4 bg-[#041e18] border-t border-[#b88a2c]/30 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProduct(product)}
                    className="text-xs font-semibold text-[#fbf7ed] hover:text-[#b88a2c] flex items-center gap-1 transition-colors cursor-pointer"
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
          <div className="text-center py-16 bg-[#062b23] border border-[#b88a2c]/40 p-8 space-y-4 shadow-2xl">
            <h3 className="font-serif text-2xl text-[#fbf7ed] font-bold">No matching botanicals found</h3>
            <p className="text-xs text-[#f2ead9]/80 max-w-md mx-auto">
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
