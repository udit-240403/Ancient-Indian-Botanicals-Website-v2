import React from 'react';
import { ArrowRight, Droplets, Leaf, Flower2, Package } from 'lucide-react';

interface ProductFamiliesProps {
  onSelectCategory: (category: string) => void;
}

export const ProductFamilies: React.FC<ProductFamiliesProps> = ({ onSelectCategory }) => {
  const families = [
    {
      id: 'essential-oils',
      title: 'Essential & aroma oils',
      description: 'Natural essential oils, selected aroma accords and application-led grades.',
      cta: 'Explore oils',
      icon: Droplets,
      tag: 'Steam Distilled & Accords'
    },
    {
      id: 'botanicals',
      title: 'Botanical ingredients',
      description: 'Whole, cut and powdered herbs, roots, barks, seeds, resins and standardized extracts.',
      cta: 'Browse botanicals',
      icon: Leaf,
      tag: 'Raw & Standardized'
    },
    {
      id: 'hydrosols-clays',
      title: 'Hydrosols, carrier oils & clays',
      description: 'Functional ingredients for personal care, fragrance, wellness and formulation use.',
      cta: 'View ingredients',
      icon: Flower2,
      tag: 'Personal Care & Formulation'
    },
    {
      id: 'packaging',
      title: 'Bulk & private-label packaging',
      description: 'Samples, aluminium bottles, export drums and selected white-label formats.',
      cta: 'See packaging routes',
      icon: Package,
      tag: 'Sample & Bulk Export'
    }
  ];

  return (
    <section
      className="w-full bg-[#041e18] text-[#fbf7ed] py-16 md:py-24 border-b border-[#b88a2c]/40 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(4, 30, 24, 0.88), rgba(4, 30, 24, 0.94)), url('/assets/images/image.png')`,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] block mb-2 font-bold">
              Product Portfolio
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#fbf7ed]">
              Botanical product families
            </h2>
          </div>
          <p className="text-sm text-[#f2ead9]/85 max-w-md font-light leading-relaxed">
            Sourced directly from verified cultivation corridors, processed to exact physical and chemical parameters for international export.
          </p>
        </div>

        {/* Product Families Banner Image & Grid Combo */}
        <div className="mb-12 relative rounded-none overflow-hidden border-2 border-[#b88a2c]/60 shadow-2xl max-h-[360px]">
          <img
            src="/assets/images/product-families-flatlay.png"
            alt="Ancient Indian Botanical Product Families Flatlay"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041e18] via-[#041e18]/50 to-transparent flex items-end p-6 md:p-10">
            <div>
              <span className="text-xs uppercase tracking-eyebrow text-[#b88a2c] font-semibold block mb-1">
                Integrated Supply Chain
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-[#fbf7ed] font-bold">
                From Raw Forest & Harvest Belts to Standardized Industrial Export
              </h3>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid with Deep Dark Green Contrast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {families.map((family) => {
            const IconComp = family.icon;
            return (
              <div
                key={family.id}
                onClick={() => onSelectCategory(family.id)}
                className="bg-[#062b23]/95 text-[#fbf7ed] border border-[#b88a2c]/50 hover:border-[#b88a2c] p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer hover:-translate-y-1.5 shadow-xl backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-[#041e18] border border-[#b88a2c]/40 rounded-full text-[#b88a2c] group-hover:bg-[#b88a2c] group-hover:text-[#062b23] transition-colors">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-eyebrow text-[#a8c76b] font-semibold bg-[#041e18] px-2.5 py-1 border border-[#b88a2c]/30">
                      {family.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#fbf7ed] mb-2 group-hover:text-[#b88a2c] transition-colors">
                    {family.title}
                  </h3>

                  <p className="text-xs text-[#f2ead9]/80 leading-relaxed font-light mb-6">
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
