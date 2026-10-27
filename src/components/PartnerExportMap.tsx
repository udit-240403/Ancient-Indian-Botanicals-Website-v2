import React from 'react';
import { ArrowUpRight, Globe2, ShieldCheck } from 'lucide-react';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface PartnerExportMapProps {
  onRequestDocuments: () => void;
}

const MARKET_COPY = {
  en: {
    eyebrow: 'Verified manufacturing-partner reach',
    title: 'Partner shipping lanes from India.',
    mode: 'Sea · Air · Road coordination',
    india: 'INDIA · ORIGIN DESK',
    usa: 'UNITED STATES', canada: 'CANADA', germany: 'GERMANY',
    verified: '3 documented markets', review: 'Destination review per enquiry',
    note: 'Routes show verified manufacturing-partner supply experience—not a claim that AIB has directly shipped every lane.',
    action: 'Review lot documents',
  },
  de: {
    eyebrow: 'Verifizierte Reichweite unserer Fertigungspartner',
    title: 'Partnerrouten für Lieferungen aus Indien.',
    mode: 'See · Luft · Straßenkoordination',
    india: 'INDIEN · URSPRUNGSDESK',
    usa: 'VEREINIGTE STAATEN', canada: 'KANADA', germany: 'DEUTSCHLAND',
    verified: '3 dokumentierte Märkte', review: 'Ziellandprüfung je Anfrage',
    note: 'Die Routen zeigen verifizierte Liefererfahrung von Fertigungspartnern—nicht AIB-Eigenexporte auf jeder Route.',
    action: 'Chargendokumente prüfen',
  },
  fr: {
    eyebrow: 'Portée vérifiée des partenaires fabricants',
    title: 'Filières logistiques partenaires depuis l’Inde.',
    mode: 'Coordination mer · air · route',
    india: 'INDE · BUREAU D’ORIGINE',
    usa: 'ÉTATS-UNIS', canada: 'CANADA', germany: 'ALLEMAGNE',
    verified: '3 marchés documentés', review: 'Revue destination par demande',
    note: 'Les routes reflètent l’expérience vérifiée de partenaires fabricants, sans prétendre qu’AIB a expédié directement sur chaque liaison.',
    action: 'Examiner les documents du lot',
  },
  es: {
    eyebrow: 'Alcance verificado de socios fabricantes',
    title: 'Rutas logísticas asociadas desde India.',
    mode: 'Coordinación marítima · aérea · terrestre',
    india: 'INDIA · MESA DE ORIGEN',
    usa: 'ESTADOS UNIDOS', canada: 'CANADÁ', germany: 'ALEMANIA',
    verified: '3 mercados documentados', review: 'Revisión de destino por consulta',
    note: 'Las rutas reflejan experiencia verificada de socios fabricantes, no envíos directos de AIB en cada trayecto.',
    action: 'Revisar documentos del lote',
  },
} as const;

const Plane = ({ x, y, rotate = 0 }: { x: number; y: number; rotate?: number }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`} fill="#f2ead9">
    <path d="M-3-15h6l3 11 12 6v4L5 3 3 15h-6L-5 3l-13 3V2l12-6z" />
  </g>
);

const Ship = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`} fill="#a8c76b">
    <path d="M-15 3h30l-4 8H-9zM-9-1h18v4H-9zM-4-8h8v7h-8z" />
    <path d="M-17 14c4 3 8 3 12 0 4 3 8 3 12 0 4 3 8 3 12 0" fill="none" stroke="#a8c76b" strokeWidth="2" />
  </g>
);

const Truck = ({ x, y }: { x: number; y: number }) => (
  <g transform={`translate(${x} ${y})`} fill="#d4a43d">
    <path d="M-16-7H4V8h-20zM4-3h8l5 6v5H4z" />
    <circle cx="-9" cy="10" r="3" /><circle cx="11" cy="10" r="3" />
  </g>
);

export const PartnerExportMap: React.FC<PartnerExportMapProps> = ({ onRequestDocuments }) => {
  const { language } = useBuyerLanguage();
  const copy = MARKET_COPY[language];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#041e18]" aria-label="Verified manufacturing-partner logistics routes from India to the United States, Canada and Germany">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_54%,rgba(168,199,107,.13),transparent_24rem),linear-gradient(145deg,#041e18,#062b23_58%,#041e18)]" />
      <div className="absolute inset-0 opacity-[.055] [background-image:linear-gradient(rgba(242,234,217,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(242,234,217,.8)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />

      <div className="absolute left-4 top-4 z-20 max-w-[72%] sm:left-6 sm:top-5">
        <div className="flex items-center gap-2 text-[#d4a43d]"><Globe2 className="h-4 w-4" /><span className="text-[8px] font-bold uppercase tracking-[.17em] sm:text-[9px]">{copy.eyebrow}</span></div>
        <h2 className="mt-1.5 max-w-lg font-serif text-xl font-semibold leading-tight text-[#fbf7ed] sm:text-2xl lg:text-[1.7rem]">{copy.title}</h2>
      </div>
      <span className="absolute right-5 top-5 z-20 hidden border border-[#b88a2c]/45 bg-[#041e18]/80 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[.14em] text-[#a8c76b] sm:block">{copy.mode}</span>

      <svg viewBox="0 0 900 420" className="absolute inset-x-0 top-[64px] h-[65%] w-full sm:top-[58px] sm:h-[68%]" role="img" aria-label="Global shipping map with sea and air lanes from India to North America and Europe">
        <defs>
          <linearGradient id="shipping-route" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a8c76b"/><stop offset="1" stopColor="#d4a43d"/></linearGradient>
          <filter id="shipping-glow"><feGaussianBlur stdDeviation="2.8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <marker id="shipping-arrow" markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#d4a43d"/></marker>
        </defs>

        {/* Recognisable world land masses, restrained to the brand palette. */}
        <g fill="#0d4a3d" stroke="#a8c76b" strokeOpacity=".34" strokeWidth="1.25">
          <path d="M47 111 74 77 116 61 148 35 216 31 266 54 291 88 274 110 243 116 224 139 188 145 169 166 130 170 99 155 68 154 43 132 25 127Z" />
          <path d="M196 180 231 188 250 218 246 252 231 285 216 319 195 363 173 332 167 295 148 258 151 215 166 190Z" />
          <path d="M365 93 394 68 429 69 453 89 446 110 423 118 408 138 376 131 351 111Z" />
          <path d="M401 145 448 140 478 168 471 207 452 247 423 303 392 270 383 226 362 184Z" />
          <path d="M449 95 489 68 545 60 603 70 648 59 711 66 772 86 846 119 831 143 789 154 752 178 708 171 668 194 622 182 591 201 553 188 522 157 479 150 443 126Z" />
          <path d="M724 277 770 260 816 272 830 309 795 333 748 326 708 301Z" />
          <path d="M333 53 346 37 363 42 358 59 342 66Z" />
          <path d="M854 153 869 143 881 151 873 166 859 170Z" />
        </g>

        {/* Marine routes follow an India–Suez–Atlantic corridor; air routes sit higher. */}
        <g fill="none" stroke="url(#shipping-route)" strokeWidth="2.8" strokeDasharray="7 7" markerEnd="url(#shipping-arrow)" filter="url(#shipping-glow)">
          <path d="M634 204 C596 166 554 139 518 117" />
          <path d="M634 204 C560 246 498 249 429 228 C350 204 272 177 191 159" />
          <path d="M634 204 C557 283 467 291 378 263 C291 236 220 205 166 193" />
        </g>
        <g fill="none" stroke="#f2ead9" strokeOpacity=".48" strokeWidth="1.7" strokeDasharray="3 7">
          <path d="M634 204 C552 76 350 55 170 101" />
          <path d="M634 204 C535 110 352 102 187 151" />
        </g>

        <Ship x={546} y={241} /><Ship x={365} y={249} /><Ship x={246} y={210} />
        <Plane x={474} y={97} rotate={-72} /><Plane x={299} y={99} rotate={-80} />
        <Truck x={673} y={212} /><Truck x={503} y={116} />

        <g>
          <circle cx="634" cy="204" r="18" fill="#a8c76b" fillOpacity=".12" stroke="#a8c76b" strokeWidth="1.5"/><circle cx="634" cy="204" r="6" fill="#d4a43d"/>
          <circle cx="170" cy="101" r="5" fill="#d4a43d"/><circle cx="187" cy="151" r="5" fill="#d4a43d"/><circle cx="518" cy="117" r="5" fill="#d4a43d"/>
          <circle cx="429" cy="228" r="3" fill="#a8c76b"/><circle cx="378" cy="263" r="3" fill="#a8c76b"/>
        </g>

        <g fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="10" letterSpacing="1.2">
          <g><rect x="119" y="79" width="104" height="24" fill="#041e18" stroke="#b88a2c" strokeOpacity=".65"/><text x="131" y="95" fill="#fbf7ed">{copy.canada}</text></g>
          <g><rect x="124" y="159" width="130" height="24" fill="#041e18" stroke="#b88a2c" strokeOpacity=".65"/><text x="136" y="175" fill="#fbf7ed">{copy.usa}</text></g>
          <g><rect x="473" y="86" width="104" height="24" fill="#041e18" stroke="#b88a2c" strokeOpacity=".65"/><text x="485" y="102" fill="#fbf7ed">{copy.germany}</text></g>
          <g><rect x="646" y="220" width="170" height="27" fill="#041e18" stroke="#a8c76b" strokeOpacity=".75"/><text x="658" y="238" fill="#a8c76b">{copy.india}</text></g>
        </g>
      </svg>

      <div className="absolute inset-x-0 bottom-0 z-20 border-t border-[#b88a2c]/35 bg-[#031a15]/95 px-4 py-2.5 backdrop-blur-sm sm:px-6">
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[8px] font-bold uppercase tracking-[.13em] text-[#a8c76b] sm:text-[9px]"><span>{copy.verified}</span><span className="text-[#d4a43d]">{copy.review}</span></div>
          <button type="button" onClick={onRequestDocuments} className="inline-flex w-fit items-center gap-1.5 text-[8px] font-bold uppercase tracking-[.13em] text-[#d4a43d] hover:text-[#fbf7ed] sm:text-[9px]">{copy.action}<ArrowUpRight className="h-3 w-3" /></button>
        </div>
        <p className="mt-1 flex items-start gap-2 text-[8px] leading-relaxed text-[#f2ead9]/58 sm:text-[9px]"><ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-[#a8c76b]" />{copy.note}</p>
      </div>
    </div>
  );
};
