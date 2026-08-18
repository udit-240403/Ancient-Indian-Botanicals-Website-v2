import React from 'react';
import { ArrowRight, Droplets, Leaf, Flower2, Package } from 'lucide-react';

interface ProductFamiliesProps {
  onSelectCategory: (category: string) => void;
  onViewAll: () => void;
}

export const ProductFamilies: React.FC<ProductFamiliesProps> = ({ onSelectCategory, onViewAll }) => {
  const families = [
    {
      id: 'essential-oils',
      title: 'Natural, aroma & carrier oils',
      description: 'Natural essential oils, carrier oils and clearly separated aroma or diffuser grades.',
      cta: 'Explore oils',
      icon: Droplets,
      tag: '59 product routes'
    },
    {
      id: 'botanicals',
      title: 'Botanical ingredients',
      description: 'Whole, cut and powdered herbs, roots, barks, seeds, resins and standardized extracts.',
      cta: 'Browse botanicals',
      icon: Leaf,
      tag: '30 product routes'
    },
    {
      id: 'catalogue',
      title: 'Floral waters & clays',
      description: 'Distinct hydrosol, floral-water and natural-clay routes for formulation and personal care.',
      cta: 'View ingredients',
      icon: Flower2,
      tag: '3 product routes'
    },
    {
      id: 'packaging',
      title: 'Bulk & private-label packaging',
      description: 'Samples, aluminium bottles, export drums and selected white-label formats.',
      cta: 'See packaging routes',
      icon: Package,
      tag: '5 format routes'
    }
  ];

  return (
    <section
      className="editorial-section w-full bg-[#041e18] text-[#fbf7ed] py-20 md:py-32 border-b border-[#b88a2c]/20 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(4, 30, 24, 0.88), rgba(4, 30, 24, 0.94)), url('/assets/images/section-botanical-texture.webp')`,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] block mb-2 font-bold">
              Product Portfolio
            </span>
            <div className="section-rule mb-5" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-[#fbf7ed]">
              A portfolio shaped by origin
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-[#f2ead9]/85 font-light leading-relaxed">
              Explore ingredients by application and form. Origin, specification, documentation and current availability are confirmed for each enquiry.
            </p>
            <button
              onClick={onViewAll}
              className="mt-5 inline-flex items-center gap-2 bg-[#b88a2c] px-6 py-3 text-xs font-bold uppercase tracking-eyebrow text-[#041e18] shadow-lg transition-colors hover:bg-[#d3a84f]"
            >
              <span>Explore all 92 products</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Families Banner Image & Grid Combo */}
        <div className="image-shell mb-10 relative overflow-hidden border border-[#b88a2c]/35 shadow-2xl h-[300px] md:h-[440px]">
          <img
            src="/assets/images/product-families-flatlay.webp"
            alt="Essential oils, botanical powders and export packaging arranged on a sourcing table"
            width="1659"
            height="948"
            loading="lazy"
            decoding="async"
            onError={(event) => { if (event.currentTarget.dataset.fallback === 'true') return; event.currentTarget.dataset.fallback = 'true'; event.currentTarget.src = '/assets/images/hero-botanical-still-life.webp'; }}
            className="relative z-[1] w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041e18] via-[#041e18]/50 to-transparent flex items-end p-6 md:p-10">
            <div>
              <span className="text-xs uppercase tracking-eyebrow text-[#b88a2c] font-semibold block mb-1">
                Integrated Supply Chain
              </span>
              <h3 className="font-serif text-3xl md:text-5xl text-[#fbf7ed] font-semibold max-w-3xl leading-[1.05]">
                Indian botanicals, prepared around your specification
              </h3>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid with Deep Dark Green Contrast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#b88a2c]/25 border border-[#b88a2c]/25">
          {families.map((family) => {
            const IconComp = family.icon;
            return (
              <div
                key={family.id}
                onClick={() => onSelectCategory(family.id)}
                className="bg-[#062b23] text-[#fbf7ed] p-7 md:p-8 min-h-[300px] flex flex-col justify-between transition-all duration-300 group cursor-pointer hover:bg-[#083a30]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#041e18] border border-[#b88a2c]/30 rounded-full text-[#b88a2c] group-hover:bg-[#b88a2c] group-hover:text-[#062b23] transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] uppercase tracking-eyebrow text-[#a8c76b] font-semibold">
                      {family.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#fbf7ed] mb-3 group-hover:text-[#b88a2c] transition-colors leading-tight">
                    {family.title}
                  </h3>

                  <p className="text-sm text-[#f2ead9]/72 leading-relaxed font-light mb-6">
                    {family.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#b88a2c] group-hover:text-[#fbf7ed] uppercase tracking-eyebrow pt-4 border-t border-[#b88a2c]/30">
                  <span>{family.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
