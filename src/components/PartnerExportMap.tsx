import React from 'react';
import { ArrowUpRight, Globe2, ShieldCheck } from 'lucide-react';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface PartnerExportMapProps {
  onRequestDocuments: () => void;
}

const MARKET_COPY = {
  en: {
    eyebrow: 'Manufacturing-partner export experience',
    title: 'India connected to documented buyer markets.',
    india: 'INDIA · COORDINATION BASE',
    usa: 'UNITED STATES', canada: 'CANADA', germany: 'GERMANY',
    verified: '3 documented markets', review: 'Destination review per enquiry',
    note: 'Routes reflect verified manufacturing-partner supply experience—not a claim that AIB has shipped every route directly.',
    action: 'Review lot documents',
  },
  de: {
    eyebrow: 'Exporterfahrung unserer Fertigungspartner',
    title: 'Indien verbunden mit dokumentierten Absatzmärkten.',
    india: 'INDIEN · KOORDINATIONSBASIS',
    usa: 'VEREINIGTE STAATEN', canada: 'KANADA', germany: 'DEUTSCHLAND',
    verified: '3 dokumentierte Märkte', review: 'Ziellandprüfung je Anfrage',
    note: 'Die Routen zeigen verifizierte Liefererfahrung von Fertigungspartnern—nicht AIB-Eigenexporte auf jeder Route.',
    action: 'Chargendokumente prüfen',
  },
  fr: {
    eyebrow: 'Expérience export des partenaires fabricants',
    title: 'L’Inde reliée à des marchés documentés.',
    india: 'INDE · BASE DE COORDINATION',
    usa: 'ÉTATS-UNIS', canada: 'CANADA', germany: 'ALLEMAGNE',
    verified: '3 marchés documentés', review: 'Revue destination par demande',
    note: 'Les routes reflètent l’expérience vérifiée de partenaires fabricants, sans prétendre qu’AIB a expédié directement sur chaque route.',
    action: 'Examiner les documents du lot',
  },
  es: {
    eyebrow: 'Experiencia exportadora de socios fabricantes',
    title: 'India conectada con mercados documentados.',
    india: 'INDIA · BASE DE COORDINACIÓN',
    usa: 'ESTADOS UNIDOS', canada: 'CANADÁ', germany: 'ALEMANIA',
    verified: '3 mercados documentados', review: 'Revisión de destino por consulta',
    note: 'Las rutas reflejan experiencia verificada de socios fabricantes, no envíos directos de AIB en cada ruta.',
    action: 'Revisar documentos del lote',
  },
} as const;

export const PartnerExportMap: React.FC<PartnerExportMapProps> = ({ onRequestDocuments }) => {
  const { language } = useBuyerLanguage();
  const copy = MARKET_COPY[language];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#041e18]" aria-label="Manufacturing-partner supply experience from India to the United States, Canada and Germany">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(168,199,107,.13),transparent_26rem),linear-gradient(145deg,#041e18,#062b23_58%,#041e18)]" />
      <div className="absolute left-4 top-4 z-20 max-w-[76%] sm:left-6 sm:top-5">
        <div className="flex items-center gap-2 text-[#d4a43d]"><Globe2 className="h-4 w-4" /><span className="text-[8px] font-bold uppercase tracking-[.17em] sm:text-[9px]">{copy.eyebrow}</span></div>
        <h2 className="mt-2 max-w-lg font-serif text-xl font-semibold leading-tight text-[#fbf7ed] sm:text-2xl lg:text-[1.75rem]">{copy.title}</h2>
      </div>

      <svg viewBox="0 0 760 410" className="absolute inset-x-0 top-[54px] h-[72%] w-full sm:top-[48px]" role="img" aria-label="World map with routes from India to North America and Europe">
        <defs>
          <linearGradient id="hero-route" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a8c76b"/><stop offset="1" stopColor="#d4a43d"/></linearGradient>
          <filter id="hero-glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <marker id="hero-arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#d4a43d"/></marker>
        </defs>

        {/* Restrained geographic outlines modelled after the brochure map. */}
        <g fill="#0b3c31" stroke="#b88a2c" strokeOpacity=".5" strokeWidth="1.2">
          <path d="M38 90 L70 61 126 48 178 62 207 95 188 119 162 125 145 151 107 159 81 138 53 132 29 111 Z" />
          <path d="M151 168 L184 178 202 210 194 246 175 285 158 328 139 301 132 258 118 222 124 187 Z" />
          <path d="M315 83 L350 66 382 73 400 94 385 111 354 108 332 119 306 105 Z" />
          <path d="M347 126 L394 123 424 151 415 190 396 231 368 278 339 248 330 202 310 163 Z" />
          <path d="M399 80 L456 59 528 63 581 82 645 77 707 105 689 135 638 146 604 169 561 157 531 180 488 169 463 144 423 132 384 107 Z" />
          <path d="M617 252 L658 239 700 254 711 285 678 305 635 299 603 278 Z" />
        </g>
        <g fill="none" stroke="url(#hero-route)" strokeWidth="2.4" strokeDasharray="7 7" markerEnd="url(#hero-arrow)" filter="url(#hero-glow)">
          <path d="M505 177 C430 65 254 50 126 82" />
          <path d="M505 177 C405 110 255 102 118 123" />
          <path d="M505 177 C455 104 405 81 363 91" />
        </g>
        <g>
          <circle cx="505" cy="177" r="13" fill="#a8c76b" fillOpacity=".18" stroke="#a8c76b"/><circle cx="505" cy="177" r="4.5" fill="#a8c76b"/>
          <circle cx="126" cy="82" r="4" fill="#d4a43d"/><circle cx="118" cy="123" r="4" fill="#d4a43d"/><circle cx="363" cy="91" r="4" fill="#d4a43d"/>
        </g>
        <g fill="#fbf7ed" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1.4">
          <text x="72" y="71">{copy.canada}</text>
          <text x="68" y="145">{copy.usa}</text>
          <text x="331" y="78">{copy.germany}</text>
        </g>
        <g><rect x="451" y="194" width="166" height="27" fill="#041e18" stroke="#a8c76b" strokeOpacity=".65"/><text x="464" y="212" fill="#a8c76b" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="9" letterSpacing="1.2">{copy.india}</text></g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-[#b88a2c]/35 bg-[#031a15]/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[8px] font-bold uppercase tracking-[.13em] text-[#a8c76b] sm:text-[9px]"><span>{copy.verified}</span><span className="text-[#d4a43d]">{copy.review}</span></div>
          <button type="button" onClick={onRequestDocuments} className="inline-flex w-fit items-center gap-1.5 text-[8px] font-bold uppercase tracking-[.13em] text-[#d4a43d] hover:text-[#fbf7ed] sm:text-[9px]">{copy.action}<ArrowUpRight className="h-3 w-3" /></button>
        </div>
        <p className="mt-1.5 flex items-start gap-2 text-[8px] leading-relaxed text-[#f2ead9]/58 sm:text-[9px]"><ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-[#a8c76b]" />{copy.note}</p>
      </div>
    </div>
  );
};
