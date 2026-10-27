import React, { useState } from 'react';
import { PROVENANCE_REGIONS } from '../data/products';
import { MapPin, Navigation, Anchor, Globe2, ArrowUpRight } from 'lucide-react';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface OriginsSectionProps {
  onExploreOrigins?: () => void;
}

export const OriginsSection: React.FC<OriginsSectionProps> = () => {
  const [activeRegionId, setActiveRegionId] = useState<string>('mandsaur');
  const { language } = useBuyerLanguage();

  const exportCopy = {
    en: { eyebrow: 'Manufacturing-partner export experience', title: 'Documented market reach behind our supply routes', origin: 'India · coordination base', note: 'This footprint reflects verified manufacturing-partner supply experience. It does not claim that AIB has shipped every route directly. Product suitability and destination documents are confirmed for each enquiry.', cta: 'Destination review per enquiry' },
    de: { eyebrow: 'Exporterfahrung unserer Fertigungspartner', title: 'Dokumentierte Markterfahrung unserer Lieferrouten', origin: 'Indien · Koordinationsbasis', note: 'Diese Übersicht zeigt verifizierte Liefererfahrung von Fertigungspartnern. Sie behauptet nicht, dass AIB jede Route selbst beliefert hat. Eignung und Ziellanddokumente werden je Anfrage bestätigt.', cta: 'Ziellandprüfung je Anfrage' },
    fr: { eyebrow: 'Expérience export des partenaires fabricants', title: 'Portée commerciale documentée de nos filières', origin: 'Inde · base de coordination', note: 'Cette carte reflète l’expérience vérifiée de partenaires fabricants. Elle ne signifie pas qu’AIB a expédié directement sur chaque route. L’adéquation et les documents sont confirmés pour chaque demande.', cta: 'Revue destination par demande' },
    es: { eyebrow: 'Experiencia exportadora de socios fabricantes', title: 'Alcance comercial documentado de nuestras rutas', origin: 'India · base de coordinación', note: 'Este mapa refleja experiencia de suministro verificada de socios fabricantes. No afirma que AIB haya enviado directamente por cada ruta. La idoneidad y los documentos se confirman para cada consulta.', cta: 'Revisión de destino por consulta' },
  }[language];

  const selectedRegion = PROVENANCE_REGIONS.find(r => r.id === activeRegionId) || PROVENANCE_REGIONS[0];

  return (
    <section
      className="w-full bg-[#f4efd3] text-[#17231e] py-20 md:py-32 border-b border-[#b88a2c]/30 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(244, 239, 211, 0.93), rgba(244, 239, 211, 0.96)), url('/assets/images/assurance-beige-sheet-bg.webp')`,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-4xl mb-14 md:mb-16">
          <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-bold block mb-2">
            Current Sourcing Base
          </span>
          <div className="section-rule mb-5" />
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-[#041e18] mb-5 leading-[1.05]">
            Focused on the Mandsaur–Neemuch region
          </h2>
          <p className="text-sm text-[#384941] font-normal leading-relaxed">
            We currently present only the region where AIB is actively building and verifying its sourcing and manufacturing-partner network. Additional locations will be added only after a documented commercial tie-up.
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
                <span className="text-[10px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold">Current verified region</span>
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
                Current sourcing and enquiry focus:
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

            {/* Verified partner-market footprint replaces the former decorative crop photo. */}
            <div className="overflow-hidden border border-[#b88a2c]/40 bg-[#062b23]">
              <div className="grid gap-6 p-5 sm:grid-cols-[1.15fr_.85fr] sm:p-6">
                <div>
                  <div className="flex items-center gap-2 text-[#d4a43d]"><Globe2 className="h-4 w-4" /><span className="text-[9px] font-bold uppercase tracking-eyebrow">{exportCopy.eyebrow}</span></div>
                  <h4 className="mt-3 max-w-lg font-serif text-2xl font-semibold leading-tight text-[#fbf7ed]">{exportCopy.title}</h4>
                  <div className="relative mt-6 min-h-40 overflow-hidden border border-[#b88a2c]/20 bg-[#041e18] p-4" aria-label="Partner market experience from India to the United States, Canada and Germany">
                    <svg viewBox="0 0 620 210" className="absolute inset-0 h-full w-full" aria-hidden="true">
                      <defs><linearGradient id="routeGlow" x1="0" x2="1"><stop offset="0" stopColor="#a8c76b" stopOpacity=".75"/><stop offset="1" stopColor="#d4a43d" stopOpacity=".95"/></linearGradient></defs>
                      <path d="M420 147 C350 110 220 104 98 72" fill="none" stroke="url(#routeGlow)" strokeWidth="2" strokeDasharray="6 7" />
                      <path d="M420 147 C332 155 200 151 88 140" fill="none" stroke="url(#routeGlow)" strokeWidth="2" strokeDasharray="6 7" />
                      <path d="M420 147 C400 92 426 55 486 43" fill="none" stroke="url(#routeGlow)" strokeWidth="2" strokeDasharray="6 7" />
                      <circle cx="420" cy="147" r="7" fill="#a8c76b"/><circle cx="98" cy="72" r="6" fill="#d4a43d"/><circle cx="88" cy="140" r="6" fill="#d4a43d"/><circle cx="486" cy="43" r="6" fill="#d4a43d"/>
                    </svg>
                    <span className="absolute bottom-4 right-[22%] border border-[#a8c76b]/50 bg-[#062b23] px-2 py-1 text-[8px] font-bold uppercase tracking-eyebrow text-[#a8c76b]">{exportCopy.origin}</span>
                  </div>
                </div>
                <div className="flex flex-col justify-center gap-2">
                  {[
                    ['United States', 'North America'],
                    ['Canada', 'North America'],
                    ['Germany', 'European Union'],
                  ].map(([country, region]) => (
                    <div key={country} className="flex items-center justify-between gap-3 border border-[#b88a2c]/25 bg-[#083a30] px-4 py-3">
                      <div><strong className="block text-sm text-[#fbf7ed]">{country}</strong><span className="text-[9px] uppercase tracking-eyebrow text-[#a8c76b]">{region}</span></div>
                      <ArrowUpRight className="h-4 w-4 text-[#d4a43d]" />
                    </div>
                  ))}
                  <span className="mt-2 text-[9px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">{exportCopy.cta}</span>
                </div>
              </div>
              <p className="border-t border-[#b88a2c]/25 px-5 py-3 text-[9px] leading-relaxed text-[#f2ead9]/65 sm:px-6">{exportCopy.note}</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
