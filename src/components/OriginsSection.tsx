import React, { useState } from 'react';
import { PROVENANCE_REGIONS } from '../data/products';
import { MapPin, Navigation, Anchor } from 'lucide-react';

interface OriginsSectionProps {
  onExploreOrigins?: () => void;
}

export const OriginsSection: React.FC<OriginsSectionProps> = () => {
  const [activeRegionId, setActiveRegionId] = useState<string>('mandsaur');

  const selectedRegion = PROVENANCE_REGIONS.find(r => r.id === activeRegionId) || PROVENANCE_REGIONS[0];

  return (
    <section
      className="w-full bg-[#f4efd3] text-[#17231e] py-20 md:py-32 border-b border-[#b88a2c]/30 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(244, 239, 211, 0.93), rgba(244, 239, 211, 0.96)), url('/assets/images/assurance-beige-sheet-bg.png')`,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mb-14 md:mb-16">
          <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-bold block mb-2">
            Provenance & Supply Corridors
          </span>
          <div className="section-rule mb-5" />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-[#041e18] mb-5 leading-[1.05]">
            Rooted in India’s growing regions
          </h2>
          <p className="text-sm text-[#384941] font-normal leading-relaxed">
            Our sourcing network is organised around established agricultural and processing corridors. Origin availability depends on the botanical, harvest, grade and approved supplier lot.
          </p>
        </div>

        {/* Interactive Region Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Region Navigation Tabs */}
          <div className="lg:col-span-5 space-y-3">
            {PROVENANCE_REGIONS.map((region) => {
              const isActive = region.id === activeRegionId;
              return (
                <div
                  key={region.id}
                  onClick={() => setActiveRegionId(region.id)}
                  className={`p-6 md:p-7 border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#041e18] border-[#b88a2c]/80 text-[#fbf7ed] shadow-xl translate-x-0 md:translate-x-2'
                      : 'bg-[#fbf7ed]/70 border-[#b88a2c]/25 text-[#17231e] hover:border-[#b88a2c]/70'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-full shrink-0 ${
                      isActive ? 'bg-[#b88a2c] text-[#041e18]' : 'bg-[#041e18] text-[#b88a2c]'
                    }`}>
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className={`font-serif text-xl font-bold ${isActive ? 'text-[#b88a2c]' : 'text-[#041e18]'}`}>
                        {region.name}
                      </h3>
                      <p className={`text-xs uppercase tracking-eyebrow font-semibold ${isActive ? 'text-[#a8c76b]' : 'text-[#b88a2c]'}`}>
                        {region.subtitle}
                      </p>
                      <p className={`text-xs line-clamp-2 pt-1 font-light ${isActive ? 'text-[#f2ead9]/80' : 'text-[#384941]'}`}>
                        {region.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Interactive Region Details & Origin Map */}
          <div className="lg:col-span-7 premium-panel text-[#fbf7ed] p-7 md:p-10 flex flex-col justify-between space-y-7">
            
            <div className="flex items-center justify-between border-b border-[#b88a2c]/30 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold">Active Region</span>
                <h3 className="font-serif text-2xl font-bold text-[#fbf7ed]">
                  {selectedRegion.name}
                </h3>
              </div>
              <div className="hidden sm:flex items-center gap-2 bg-[#062b23] px-3 py-1.5 border border-[#b88a2c]/30 text-[11px] text-[#a8c76b]">
                <Navigation className="w-3.5 h-3.5 text-[#b88a2c]" />
                <span>{selectedRegion.latitude}° N, {selectedRegion.longitude}° E</span>
              </div>
            </div>

            <p className="text-sm text-[#f2ead9]/90 leading-relaxed font-light">
              {selectedRegion.description}
            </p>

            {/* Key Crops Tag List */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-eyebrow text-[#b88a2c] font-semibold block">
                Primary Harvest & Cultivation Crops:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedRegion.keyCrops.map((crop, idx) => (
                  <span
                    key={idx}
                    className="bg-[#062b23] border border-[#b88a2c]/40 text-[#fbf7ed] text-xs px-3 py-1 font-medium"
                  >
                    {crop}
                  </span>
                ))}
              </div>
            </div>

            {/* Export Logistics */}
            <div className="p-4 bg-[#062b23] border border-[#b88a2c]/30 flex items-center gap-3">
              <Anchor className="w-5 h-5 text-[#b88a2c] shrink-0" />
              <div>
                <span className="text-[10px] uppercase tracking-eyebrow text-[#a8c76b] block font-semibold">Export Infrastructure</span>
                <span className="text-xs text-[#fbf7ed] font-medium">{selectedRegion.exportCorridor}</span>
              </div>
            </div>

            {/* Origin Map Graphic */}
            <div className="relative border border-[#b88a2c]/40 bg-[#062b23] p-4 flex items-center justify-center min-h-[160px]">
              <img
                src="/assets/svg/origin-map.svg"
                alt="Ancient Indian Botanicals Origin Map"
                className="w-full max-h-[140px] object-contain opacity-90 filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-[#041e18]/95 border border-[#b88a2c] text-[#b88a2c] text-xs uppercase tracking-eyebrow px-4 py-1.5 font-bold shadow-xl">
                  Sourcing corridor · {selectedRegion.name}
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
