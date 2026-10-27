import React from 'react';
import { ArrowRight, Flower2 } from 'lucide-react';
import { CATALOGUE_PRODUCT_COUNT } from '../data/catalogue';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';
import { INTERFACE_COPY } from '../data/siteCopy';
import { PartnerExportMap } from './PartnerExportMap';

interface HeroProps {
  onExploreExtracts: () => void;
  onBrowseBotanicals: () => void;
  openCoaModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreExtracts,
  onBrowseBotanicals,
  openCoaModal,
}) => {
  const { language } = useBuyerLanguage();
  const copy = INTERFACE_COPY[language].hero;
  return (
    <section className="hero-cinematic relative flex w-full flex-col justify-center overflow-hidden border-b border-[#b88a2c]/30 bg-[#041e18] py-8 text-[#fbf7ed] sm:py-10 lg:flex-grow lg:py-8">
      
      {/* Background Texture Positioned so Mandsaur sits in the middle of the empty space */}
      <div
        className="hero-cinematic__backdrop absolute inset-0 opacity-65 pointer-events-none bg-cover scale-115 filter brightness-[0.9] contrast-[1.08]"
        style={{
          backgroundImage: `url('/assets/images/hero-dark-green-bg.webp')`,
          backgroundPosition: 'calc(30% + 70px) center',
        }}
      />

      {/* Dimmed Gradient Overlay for High Foreground Text Readability */}
      <div className="hero-cinematic__veil absolute inset-0 pointer-events-none" />
      <div className="hero-cinematic__orb hero-cinematic__orb--one" aria-hidden="true" />
      <div className="hero-cinematic__orb hero-cinematic__orb--two" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:my-auto">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Copy Panel (5 Columns) Vertically Centered */}
          <div className="hero-cinematic__copy lg:col-span-5 flex flex-col justify-center space-y-3 lg:space-y-3.5 lg:pr-2 relative z-20">
            
            {/* Single Line Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 border border-[#b88a2c]/60 px-3 py-1 rounded-none text-[10px] font-semibold uppercase tracking-[0.14em] text-[#b88a2c] w-fit max-w-full bg-[#041e18]/95 backdrop-blur-md shadow-xl whitespace-nowrap overflow-hidden text-ellipsis">
              <span>{copy.eyebrow}</span>
            </div>

            {/* Headline matching reference image formatting */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.85rem] xl:text-[3.15rem] font-bold leading-[1.05] text-[#fbf7ed] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              {copy.lead}<br />
              <span className="text-[#b88a2c]">{copy.highlight}</span><br />
              {copy.tail}
            </h1>

            {/* Bold Sanskrit Motto with Tiro Devanagari Hindi Font */}
            <div className="flex items-center gap-2.5 text-[#b88a2c] font-bold text-base sm:text-lg pt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]" style={{ fontFamily: "'Tiro Devanagari Hindi', 'Noto Serif Devanagari', serif" }}>
              <Flower2 className="w-4.5 h-4.5 text-[#b88a2c] shrink-0 stroke-[2.5]" />
              <span className="font-bold tracking-wide text-[#b88a2c]">|| सर्वे सन्तु निरामयाः ||</span>
            </div>

            {/* Bold Body paragraph as requested */}
            <p className="text-[#fbf7ed] text-xs sm:text-sm leading-relaxed font-semibold max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {copy.body}
            </p>

            {/* CTAs matching design reference */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <button
                onClick={onExploreExtracts}
                className="bg-[#b88a2c] hover:bg-[#967020] text-[#041e18] font-bold text-xs uppercase tracking-[0.14em] px-5 py-2.5 flex items-center gap-2 transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
              >
                <span>{copy.extracts}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onBrowseBotanicals}
                className="bg-[#041e18]/90 hover:bg-[#083a30] text-[#fbf7ed] border border-[#b88a2c] hover:border-[#b88a2c] font-bold text-xs uppercase tracking-[0.14em] px-5 py-2.5 flex items-center gap-2 transition-all cursor-pointer backdrop-blur-sm"
              >
                <span>{copy.botanicals}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#b88a2c]" />
              </button>
            </div>

            <div className="grid max-w-lg grid-cols-3 border-y border-[#b88a2c]/30 bg-[#041e18]/55 backdrop-blur-sm">
              {[
                [String(CATALOGUE_PRODUCT_COUNT), copy.productRoutes],
                ['8', copy.families],
                ['Lot', copy.lotReview],
              ].map(([value, label]) => (
                <div key={label} className="border-r border-[#b88a2c]/25 px-2 py-2.5 last:border-r-0 sm:px-3">
                  <span className="block font-serif text-lg font-semibold leading-none text-[#d4a43d]">{value}</span>
                  <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.12em] text-[#f2ead9]/70 sm:text-[9px]">{label}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Center-Right Column: partner-market route map */}
          <div className="hero-cinematic__stage lg:col-span-7 relative z-20 lg:pl-4">
            <div className="hero-cinematic__index hero-cinematic__index--top" aria-hidden="true">
              <span>01</span>
              <strong>Origin-led</strong>
            </div>
            <div className="hero-cinematic__index hero-cinematic__index--side" aria-hidden="true">
              <span>{CATALOGUE_PRODUCT_COUNT} routes</span>
              <strong>One sourcing desk</strong>
            </div>
            
            {/* Brochure-inspired export map replacing the cultivation photograph. */}
            <div className="hero-cinematic__frame relative w-full overflow-visible group">
              <div className="hero-cinematic__image-shell image-shell relative w-full h-[300px] sm:h-[330px] lg:h-[420px] overflow-hidden rounded-none border border-[#b88a2c]/70 shadow-2xl bg-[#041e18]">
                <PartnerExportMap onRequestDocuments={openCoaModal} />
              </div>

              <div className="hero-cinematic__caption" aria-hidden="true">
                <span>India coordination</span>
                <span>Partner experience</span>
                <span>Destination review</span>
              </div>

            </div>

          </div>

        </div>
      </div>
      <div className="hero-cinematic__scroll" aria-hidden="true">
        <span>Discover</span>
        <i />
      </div>
    </section>
  );
};
