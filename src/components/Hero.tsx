import React from 'react';
import { ArrowRight, ShieldCheck, Flower2 } from 'lucide-react';

interface HeroProps {
  onExploreOils: () => void;
  onBrowseBotanicals: () => void;
  openCoaModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreOils,
  onBrowseBotanicals,
  openCoaModal,
}) => {
  return (
    <section className="relative flex w-full flex-col justify-center overflow-hidden border-b border-[#b88a2c]/30 bg-[#041e18] py-8 text-[#fbf7ed] sm:py-10 lg:flex-grow lg:py-3">
      
      {/* Background Texture Positioned so Mandsaur sits in the middle of the empty space */}
      <div
        className="absolute inset-0 opacity-65 pointer-events-none bg-cover scale-115 transition-all duration-700 filter brightness-[0.9] contrast-[1.08]"
        style={{
          backgroundImage: `url('/assets/images/hero-dark-green-bg.webp')`,
          backgroundPosition: 'calc(30% + 70px) center',
        }}
      />

      {/* Dimmed Gradient Overlay for High Foreground Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#041e18]/85 via-[#041e18]/30 to-transparent pointer-events-none" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:my-auto">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Copy Panel (5 Columns) Vertically Centered */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-3 lg:space-y-3.5 lg:pr-2 relative z-20">
            
            {/* Single Line Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 border border-[#b88a2c]/60 px-3 py-1 rounded-none text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b88a2c] w-fit max-w-full bg-[#041e18]/95 backdrop-blur-md shadow-xl whitespace-nowrap overflow-hidden text-ellipsis">
              <span>INDIAN BOTANICAL SOURCING · SPECIFICATION-LED B2B SUPPLY</span>
            </div>

            {/* Headline matching reference image formatting */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.15rem] font-bold leading-[1.05] text-[#fbf7ed] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              SOURCE FROM<br />
              THE <span className="text-[#b88a2c]">HEART</span> OF<br />
              INDIAN BOTANICAL<br />
              PROVENANCE.
            </h1>

            {/* Bold Sanskrit Motto with Tiro Devanagari Hindi Font */}
            <div className="flex items-center gap-2.5 text-[#b88a2c] font-bold text-base sm:text-lg pt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ fontFamily: "'Tiro Devanagari Hindi', 'Noto Serif Devanagari', serif" }}>
              <Flower2 className="w-4.5 h-4.5 text-[#b88a2c] shrink-0 stroke-[2.5]" />
              <span className="font-bold tracking-wide text-[#b88a2c]">|| सर्वे सन्तु निरामयाः ||</span>
            </div>

            {/* Bold Body paragraph as requested */}
            <p className="text-[#fbf7ed] text-xs sm:text-sm leading-relaxed font-semibold max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              We align <span className="font-bold text-[#fbf7ed]">botanical identity</span>, <span className="font-bold text-[#b88a2c]">required analytical profile</span>, <span className="font-bold text-[#fbf7ed]">application, volume and destination</span> before matching suitable lots and packing routes.
            </p>

            {/* CTAs matching design reference */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <button
                onClick={onExploreOils}
                className="bg-[#b88a2c] hover:bg-[#967020] text-[#041e18] font-bold text-xs uppercase tracking-[0.14em] px-5 py-2.5 flex items-center gap-2 transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>EXPLORE OILS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onBrowseBotanicals}
                className="bg-[#041e18]/90 hover:bg-[#083a30] text-[#fbf7ed] border border-[#b88a2c] hover:border-[#b88a2c] font-bold text-xs uppercase tracking-[0.14em] px-5 py-2.5 flex items-center gap-2 transition-all cursor-pointer backdrop-blur-sm"
              >
                <span>BOTANICAL RANGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#b88a2c]" />
              </button>
            </div>

            <div className="grid max-w-lg grid-cols-3 border-y border-[#b88a2c]/30 bg-[#041e18]/55 backdrop-blur-sm">
              {[
                ['92', 'Product routes'],
                ['5', 'Ingredient families'],
                ['Lot', 'Specific review'],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-[#b88a2c]/25 px-2 py-2.5 last:border-r-0 sm:px-3">
                  <span className="block font-serif text-lg font-semibold leading-none text-[#d4a43d]">{value}</span>
                  <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.12em] text-[#f2ead9]/70 sm:text-[9px]">{label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Center-Right Column: Photo Cover Frame */}
          <div className="lg:col-span-7 relative z-20 lg:pl-4">
            
            {/* The Image Wrapper breaking out with shadow depth */}
            <div className="relative w-full rounded-none overflow-visible shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9)] group transition-transform duration-500 hover:-translate-x-1">
              
              {/* Main Photo Asset */}
              <div className="image-shell relative w-full h-[300px] sm:h-[330px] lg:h-[390px] overflow-hidden rounded-none border-2 border-[#b88a2c]/70 shadow-2xl bg-[#041e18]">
                <img
                  src="/assets/images/hero-botanical-still-life.webp"
                  alt="Amber botanical bottles surrounded by Indian herbs, roots and flowers"
                  width="1448"
                  height="1086"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  onError={(event) => { if (event.currentTarget.dataset.fallback === 'true') return; event.currentTarget.dataset.fallback = 'true'; event.currentTarget.src = '/assets/images/product-families-flatlay.webp'; }}
                  className="relative z-[1] w-full h-full object-cover object-[56%_50%] transform transition-transform duration-700 hover:scale-[1.02]"
                />
                
                {/* Subtle Lighting Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#041e18]/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Provenance Card on Bottom Right */}
              <div className="absolute bottom-3 left-3 right-3 z-30 max-w-none space-y-1 rounded-[14px] border border-[#b88a2c]/80 bg-[#041e18]/95 p-3.5 shadow-2xl backdrop-blur-md sm:left-auto sm:max-w-[270px]">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-[#062b23] border border-[#b88a2c]/50 rounded-full text-[#a8c76b]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#a8c76b]" />
                  </div>
                  <h4 className="font-serif text-xs sm:text-sm font-semibold text-[#b88a2c]">
                    Provenance You Can Trust
                  </h4>
                </div>

                <p className="text-[10.5px] text-[#f2ead9]/85 leading-snug font-light">
                  Buyer specifications matched with available lot documentation and transparent sourcing routes.
                </p>

                <button
                  onClick={openCoaModal}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-eyebrow text-[#b88a2c] hover:text-[#fbf7ed] pt-0.5 transition-colors cursor-pointer"
                >
                  <span>REQUEST LOT DOCUMENTS</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
