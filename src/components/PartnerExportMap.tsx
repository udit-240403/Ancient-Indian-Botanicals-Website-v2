import React from 'react';
import { ArrowUpRight, Globe2, ShieldCheck } from 'lucide-react';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface PartnerExportMapProps {
  onRequestDocuments: () => void;
}

const MARKET_COPY = {
  en: {
    eyebrow: 'Active international business routes',
    title: 'From India to growing buyer markets.',
    mode: 'Specification · Sampling · Supply coordination',
    india: 'INDIA · ORIGIN DESK',
    usa: 'UNITED STATES', mexico: 'MEXICO', brazil: 'BRAZIL', uae: 'UAE', australia: 'AUSTRALIA',
    verified: '5 active market relationships', review: 'Destination review per enquiry',
    note: 'Routes reflect active buyer enquiries, sampling or commercial discussions. Product availability, documentation and destination compliance are reconfirmed before every order.',
    action: 'Review destination documents',
  },
  de: {
    eyebrow: 'Aktive internationale Geschäftswege',
    title: 'Von Indien zu wachsenden Abnehmermärkten.',
    mode: 'Spezifikation · Muster · Lieferkoordination',
    india: 'INDIEN · URSPRUNGSDESK',
    usa: 'VEREINIGTE STAATEN', mexico: 'MEXIKO', brazil: 'BRASILIEN', uae: 'VAE', australia: 'AUSTRALIEN',
    verified: '5 aktive Marktbeziehungen', review: 'Ziellandprüfung je Anfrage',
    note: 'Die Routen zeigen aktive Käuferanfragen, Bemusterung oder Geschäftsgespräche. Verfügbarkeit, Unterlagen und Ziellandkonformität werden vor jeder Bestellung erneut bestätigt.',
    action: 'Ziellandunterlagen prüfen',
  },
  fr: {
    eyebrow: 'Filières commerciales internationales actives',
    title: 'De l’Inde vers des marchés acheteurs en développement.',
    mode: 'Spécification · Échantillons · Coordination',
    india: 'INDE · BUREAU D’ORIGINE',
    usa: 'ÉTATS-UNIS', mexico: 'MEXIQUE', brazil: 'BRÉSIL', uae: 'EAU', australia: 'AUSTRALIE',
    verified: '5 relations de marché actives', review: 'Revue destination par demande',
    note: 'Les routes représentent des demandes actives, des échantillons ou des échanges commerciaux. Disponibilité, documents et conformité sont reconfirmés avant chaque commande.',
    action: 'Examiner les documents destination',
  },
  es: {
    eyebrow: 'Rutas comerciales internacionales activas',
    title: 'Desde India hacia mercados compradores en crecimiento.',
    mode: 'Especificación · Muestras · Coordinación',
    india: 'INDIA · MESA DE ORIGEN',
    usa: 'ESTADOS UNIDOS', mexico: 'MÉXICO', brazil: 'BRASIL', uae: 'EAU', australia: 'AUSTRALIA',
    verified: '5 relaciones de mercado activas', review: 'Revisión de destino por consulta',
    note: 'Las rutas representan consultas activas, muestras o conversaciones comerciales. La disponibilidad, documentación y conformidad se reconfirman antes de cada pedido.',
    action: 'Revisar documentos de destino',
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
    <div className="relative h-full w-full overflow-hidden bg-[#041e18]" aria-label="Active AIB business routes from India to the United States, Mexico, Brazil, the United Arab Emirates and Australia">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_54%,rgba(168,199,107,.13),transparent_24rem),linear-gradient(145deg,#041e18,#062b23_58%,#041e18)]" />
      <div className="absolute inset-0 opacity-[.055] [background-image:linear-gradient(rgba(242,234,217,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(242,234,217,.8)_1px,transparent_1px)] [background-size:42px_42px]" aria-hidden="true" />

      <div className="absolute left-4 top-4 z-20 max-w-[72%] sm:left-6 sm:top-5">
        <div className="flex items-center gap-2 text-[#d4a43d]"><Globe2 className="h-4 w-4" /><span className="text-[8px] font-bold uppercase tracking-[.17em] sm:text-[9px]">{copy.eyebrow}</span></div>
        <h2 className="mt-1.5 max-w-lg font-serif text-xl font-semibold leading-tight text-[#fbf7ed] sm:text-2xl lg:text-[1.7rem]">{copy.title}</h2>
      </div>
      <span className="absolute right-5 top-5 z-20 hidden border border-[#b88a2c]/45 bg-[#041e18]/80 px-2.5 py-1 text-[7px] font-bold uppercase tracking-[.14em] text-[#a8c76b] sm:block">{copy.mode}</span>

      <svg viewBox="0 0 900 420" className="absolute inset-x-0 top-[64px] h-[65%] w-full sm:top-[58px] sm:h-[68%]" role="img" aria-label="Global business map with active routes from India to North America, South America, the Gulf and Australia">
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

        {/* Active commercial routes: enquiries, sampling and supply coordination. */}
        <g fill="none" stroke="url(#shipping-route)" strokeWidth="2.8" strokeDasharray="7 7" markerEnd="url(#shipping-arrow)" filter="url(#shipping-glow)">
          <path d="M634 204 C606 194 584 191 560 193" />
          <path d="M634 204 C692 228 728 258 770 290" />
          <path d="M634 204 C545 286 380 313 220 260" />
        </g>
        <g fill="none" stroke="#f2ead9" strokeOpacity=".52" strokeWidth="1.8" strokeDasharray="3 7" markerEnd="url(#shipping-arrow)">
          <path d="M634 204 C560 80 340 55 170 101" />
          <path d="M634 204 C535 138 350 130 187 166" />
        </g>

        <Ship x={555} y={250} /><Ship x={420} y={286} /><Ship x={700} y={252} />
        <Plane x={470} y={95} rotate={-72} /><Plane x={310} y={126} rotate={-80} />
        <Truck x={658} y={212} /><Truck x={582} y={186} />

        <g>
          <circle cx="634" cy="204" r="18" fill="#a8c76b" fillOpacity=".12" stroke="#a8c76b" strokeWidth="1.5"/><circle cx="634" cy="204" r="6" fill="#d4a43d"/>
          <circle cx="170" cy="101" r="5" fill="#d4a43d"/><circle cx="187" cy="166" r="5" fill="#d4a43d"/>
          <circle cx="220" cy="260" r="5" fill="#d4a43d"/><circle cx="560" cy="193" r="5" fill="#d4a43d"/><circle cx="770" cy="290" r="5" fill="#d4a43d"/>
        </g>

        <g fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="9" letterSpacing="1.1">
          <g><rect x="112" y="79" width="128" height="24" fill="#041e18" stroke="#b88a2c" strokeOpacity=".7"/><text x="124" y="95" fill="#fbf7ed">{copy.usa}</text></g>
          <g><rect x="126" y="173" width="96" height="24" fill="#041e18" stroke="#b88a2c" strokeOpacity=".7"/><text x="138" y="189" fill="#fbf7ed">{copy.mexico}</text></g>
          <g><rect x="179" y="270" width="92" height="24" fill="#041e18" stroke="#b88a2c" strokeOpacity=".7"/><text x="191" y="286" fill="#fbf7ed">{copy.brazil}</text></g>
          <g><rect x="525" y="157" width="72" height="24" fill="#041e18" stroke="#b88a2c" strokeOpacity=".7"/><text x="537" y="173" fill="#fbf7ed">{copy.uae}</text></g>
          <g><rect x="722" y="304" width="116" height="24" fill="#041e18" stroke="#b88a2c" strokeOpacity=".7"/><text x="734" y="320" fill="#fbf7ed">{copy.australia}</text></g>
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
