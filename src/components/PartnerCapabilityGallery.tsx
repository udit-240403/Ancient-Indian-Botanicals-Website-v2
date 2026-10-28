import React from 'react';
import { ArrowRight, BadgeCheck, FlaskConical, Globe2, PackageCheck, Sprout } from 'lucide-react';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

const COPY = {
  en: {
    eyebrow: 'Partner capability · real working environments',
    title: 'A closer look at the people and systems behind the supply route.',
    body: 'These photographs show selected manufacturing-partner operations and international ingredient-industry participation. They help buyers understand the environments that may support an approved brief; the exact facility, tests, documents and route are reconfirmed for every enquiry.',
    cta: 'Discuss your specification',
    disclosure: 'Partner-supplied photographs. Facilities, personnel and exhibition participation shown are operated by qualified manufacturing partners and are not presented as AIB-owned operations.',
    cards: [
      ['Analytical laboratory', 'Partner laboratory work supporting identity, marker and quality review where relevant.'],
      ['Raw-herb preparation', 'Controlled cleaning and handling before an agreed processing route.'],
      ['Organised bulk storage', 'Segregated commercial storage for packed botanical ingredients.'],
      ['International buyer dialogue', 'Partner participation in an international ingredient-industry exhibition.'],
    ],
  },
  de: {
    eyebrow: 'Partnerkompetenz · reale Arbeitsumgebungen',
    title: 'Ein Einblick in die Menschen und Systeme hinter der Lieferroute.',
    body: 'Diese Aufnahmen zeigen ausgewählte Abläufe von Fertigungspartnern und deren Teilnahme an internationalen Fachveranstaltungen der Zutatenbranche. Die konkrete Anlage, Prüfungen, Unterlagen und Lieferroute werden für jede Anfrage erneut bestätigt.',
    cta: 'Spezifikation besprechen',
    disclosure: 'Vom Partner bereitgestellte Aufnahmen. Gezeigte Anlagen, Mitarbeitende und Messeteilnahmen werden von qualifizierten Fertigungspartnern betrieben und nicht als AIB-eigene Aktivitäten dargestellt.',
    cards: [
      ['Analytisches Labor', 'Laborarbeit des Partners zur Identitäts-, Marker- und Qualitätsprüfung, soweit relevant.'],
      ['Rohwarenvorbereitung', 'Kontrollierte Reinigung und Handhabung vor der vereinbarten Verarbeitung.'],
      ['Geordnete Großmengenlagerung', 'Getrennte kommerzielle Lagerung verpackter pflanzlicher Zutaten.'],
      ['Internationaler Käuferdialog', 'Teilnahme eines Partners an einer internationalen Zutatenfachmesse.'],
    ],
  },
  fr: {
    eyebrow: 'Capacités partenaires · environnements réels',
    title: 'Un aperçu des personnes et des systèmes derrière la filière.',
    body: 'Ces photographies présentent des opérations sélectionnées de partenaires fabricants et leur participation à des salons internationaux des ingrédients. L’installation, les analyses, les documents et la filière exacte sont reconfirmés pour chaque demande.',
    cta: 'Discuter de votre spécification',
    disclosure: 'Photographies fournies par les partenaires. Les installations, le personnel et les salons présentés relèvent de partenaires fabricants qualifiés et ne sont pas présentés comme des opérations détenues par AIB.',
    cards: [
      ['Laboratoire analytique', 'Travail du laboratoire partenaire pour l’identité, les marqueurs et la qualité lorsque pertinent.'],
      ['Préparation des plantes', 'Nettoyage et manipulation contrôlés avant la transformation convenue.'],
      ['Stockage en vrac organisé', 'Stockage commercial séparé des ingrédients botaniques conditionnés.'],
      ['Dialogue international', 'Participation d’un partenaire à un salon international des ingrédients.'],
    ],
  },
  es: {
    eyebrow: 'Capacidad de socios · entornos reales',
    title: 'Una mirada a las personas y sistemas detrás de la ruta de suministro.',
    body: 'Estas fotografías muestran operaciones seleccionadas de socios fabricantes y su participación en ferias internacionales de ingredientes. La instalación, los análisis, los documentos y la ruta exacta se reconfirman para cada consulta.',
    cta: 'Comentar su especificación',
    disclosure: 'Fotografías facilitadas por socios. Las instalaciones, el personal y la participación ferial mostrados corresponden a socios fabricantes cualificados y no se presentan como operaciones propiedad de AIB.',
    cards: [
      ['Laboratorio analítico', 'Trabajo del laboratorio del socio para identidad, marcadores y calidad cuando corresponde.'],
      ['Preparación de hierbas', 'Limpieza y manipulación controladas antes del proceso acordado.'],
      ['Almacenamiento organizado', 'Almacenamiento comercial segregado de ingredientes botánicos envasados.'],
      ['Diálogo internacional', 'Participación de un socio en una feria internacional de ingredientes.'],
    ],
  },
} as const;

const IMAGES = [
  { src: '/assets/images/partner-capability/laboratory-analysis.webp', icon: FlaskConical, position: 'center' },
  { src: '/assets/images/partner-capability/herb-cleaning.webp', icon: Sprout, position: 'center' },
  { src: '/assets/images/partner-capability/bulk-storage.webp', icon: PackageCheck, position: 'center' },
  { src: '/assets/images/partner-capability/international-exhibition.webp', icon: Globe2, position: 'center 38%' },
] as const;

export const PartnerCapabilityGallery: React.FC<{ onStartEnquiry: () => void }> = ({ onStartEnquiry }) => {
  const { language } = useBuyerLanguage();
  const copy = COPY[language];

  return (
    <section className="border-y border-[#b88a2c]/30 bg-[#082a22] px-4 py-16 text-[#fbf7ed] md:px-8 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-7 border-b border-[#d4a43d]/25 pb-9 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">
              <BadgeCheck className="h-4 w-4" /> {copy.eyebrow}
            </span>
            <h2 className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl">{copy.title}</h2>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-[#f2ead9]/72">{copy.body}</p>
            <button onClick={onStartEnquiry} className="mt-6 inline-flex items-center gap-2 border border-[#d4a43d] px-5 py-3 text-[10px] font-bold uppercase tracking-eyebrow text-[#fbf7ed] transition-colors hover:bg-[#d4a43d] hover:text-[#041e18]">
              {copy.cta} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-12">
          {IMAGES.map(({ src, icon: Icon, position }, index) => {
            const [title, body] = copy.cards[index];
            const span = index === 0 ? 'xl:col-span-7' : index === 1 ? 'xl:col-span-5' : index === 2 ? 'xl:col-span-5' : 'xl:col-span-7';
            return (
              <figure key={src} className={`group overflow-hidden border border-[#d4a43d]/28 bg-[#041e18] ${span}`}>
                <div className="relative aspect-[16/10] overflow-hidden xl:aspect-auto xl:h-[400px]">
                  <img src={src} alt={title} width="1200" height="750" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" style={{ objectPosition: position }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031712]/78 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-4 inline-flex h-10 w-10 items-center justify-center border border-[#d4a43d]/50 bg-[#041e18]/85 text-[#d4a43d] backdrop-blur-sm"><Icon className="h-5 w-5" /></span>
                </div>
                <figcaption className="grid gap-2 border-t border-[#d4a43d]/20 p-5 sm:grid-cols-[13rem_1fr] sm:items-start xl:min-h-[118px]">
                  <strong className="font-serif text-xl font-semibold text-[#fbf7ed]">{title}</strong>
                  <span className="text-[11px] leading-relaxed text-[#f2ead9]/62">{body}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <p className="mt-6 border-l-2 border-[#d4a43d] pl-4 text-[10px] leading-relaxed text-[#f2ead9]/58">{copy.disclosure}</p>
      </div>
    </section>
  );
};
