import React from 'react';
import { BadgeCheck, FlaskConical, FileCheck2, Sprout } from 'lucide-react';

export const AssuranceStrip: React.FC = () => {
  const features = [
    {
      icon: FlaskConical,
      title: 'LOT-SPECIFIC TESTING',
      description: 'COA, markers or GC/MS reviewed where applicable.'
    },
    {
      icon: FileCheck2,
      title: 'DOCUMENT SUPPORT',
      description: 'Product and destination documents confirmed per enquiry.'
    },
    {
      icon: Sprout,
      title: 'SOURCING TRANSPARENCY',
      description: 'Origin and packing details confirmed for approved lots.'
    },
    {
      icon: BadgeCheck,
      title: 'REGISTERED IN INDIA',
      description: 'Incorporated 2026 · GST and Udyam registered.'
    }
  ];

  return (
    <section className="w-full bg-[#f4efd3] text-[#17231e] py-3.5 md:py-4 border-b border-[#dfcfad] relative overflow-hidden shrink-0">
      
      {/* AI Generated Beige Sheet Background with Indian Heritage Palace Dome Illustration */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none bg-cover bg-right"
        style={{
          backgroundImage: `url('/assets/images/assurance-beige-sheet-bg.webp')`,
        }}
      />

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {features.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-center gap-3.5 border border-[#041e18]/15 bg-[#f8f1dc]/55 px-4 py-3"
              >
                <div className="w-11 h-11 rounded-full bg-[#dfcfad]/80 border border-[#b88a2c]/60 flex items-center justify-center shrink-0 shadow-sm backdrop-blur-sm">
                  <IconComponent className="w-5 h-5 text-[#041e18]" />
                </div>
                <div>
                  <h3 className="font-serif text-xs sm:text-sm font-bold tracking-[0.08em] text-[#041e18] uppercase">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#17231e]/90 font-light leading-snug mt-0.5 max-w-xs">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
