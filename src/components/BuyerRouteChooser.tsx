import React from 'react';
import { ArrowUpRight, Droplets, FileCheck2, FlaskConical, Leaf, Wheat } from 'lucide-react';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface BuyerRouteChooserProps {
  onNavigate: (route: string) => void;
}

const ROUTES = [
  { id: 'standardized-extracts', href: '/standardized-extracts', icon: FlaskConical },
  { id: 'essential-oils', href: '/essential-oils', icon: Droplets },
  { id: 'botanicals', href: '/botanicals', icon: Leaf },
  { id: 'food-ingredients', href: '/food-ingredients', icon: Wheat },
  { id: 'verification', href: '/verification', icon: FileCheck2 },
];

export const BuyerRouteChooser: React.FC<BuyerRouteChooserProps> = ({ onNavigate }) => {
  const { language } = useBuyerLanguage();
  const copy = {
    en: {
      eyebrow: 'Start with your requirement',
      heading: 'Reach the right sourcing desk faster.',
      intro: 'Choose the route closest to your brief. Each page explains the relevant forms, specifications and enquiry details.',
      items: [
        ['Standardized extracts', 'Markers, ratios and methods'],
        ['Essential & carrier oils', 'Natural, aroma and carrier grades'],
        ['Botanical ingredients', 'Whole, cut and powdered forms'],
        ['Food ingredients', 'Seeds, millets, nuts and culinary oils'],
        ['Documents & verification', 'Registrations and buyer checks'],
      ],
    },
    de: {
      eyebrow: 'Beginnen Sie mit Ihrem Bedarf',
      heading: 'Schneller zum passenden Sourcing-Bereich.',
      intro: 'Wählen Sie die Route, die Ihrer Anfrage am nächsten kommt. Jede Seite erläutert Formen, Spezifikationen und Anfragedaten.',
      items: [
        ['Standardisierte Extrakte', 'Marker, Verhältnisse und Methoden'],
        ['Ätherische & Trägeröle', 'Natur-, Aroma- und Trägerqualitäten'],
        ['Botanische Rohstoffe', 'Ganz, geschnitten und pulverisiert'],
        ['Lebensmittelzutaten', 'Saaten, Hirse, Nüsse und Speiseöle'],
        ['Dokumente & Verifizierung', 'Registrierungen und Käuferprüfungen'],
      ],
    },
    fr: {
      eyebrow: 'Commencez par votre besoin',
      heading: 'Accédez plus vite au bon service sourcing.',
      intro: 'Choisissez la filière la plus proche de votre cahier des charges. Chaque page précise formes, spécifications et éléments de demande.',
      items: [
        ['Extraits standardisés', 'Marqueurs, ratios et méthodes'],
        ['Huiles essentielles & végétales', 'Qualités naturelles, aromatiques et végétales'],
        ['Ingrédients botaniques', 'Formes entières, coupées et en poudre'],
        ['Ingrédients alimentaires', 'Graines, millets, noix et huiles culinaires'],
        ['Documents & vérification', 'Enregistrements et contrôles acheteur'],
      ],
    },
    es: {
      eyebrow: 'Empiece por su necesidad',
      heading: 'Llegue más rápido al área de abastecimiento adecuada.',
      intro: 'Elija la ruta más cercana a su solicitud. Cada página explica formas, especificaciones y datos necesarios para consultar.',
      items: [
        ['Extractos estandarizados', 'Marcadores, proporciones y métodos'],
        ['Aceites esenciales y portadores', 'Calidades naturales, aromáticas y portadoras'],
        ['Ingredientes botánicos', 'Formas enteras, cortadas y en polvo'],
        ['Ingredientes alimentarios', 'Semillas, mijo, frutos secos y aceites culinarios'],
        ['Documentos y verificación', 'Registros y controles del comprador'],
      ],
    },
  }[language];

  return (
    <section className="border-b border-[#d9c79e] bg-[#f4efe5] px-4 py-10 text-[#1f2925] md:px-8 md:py-12" aria-labelledby="buyer-route-heading">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">{copy.eyebrow}</span>
            <h2 id="buyer-route-heading" className="mt-3 max-w-xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
              {copy.heading}
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-[#52635d] lg:justify-self-end">{copy.intro}</p>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden border border-[#c9b47f] bg-[#c9b47f] sm:grid-cols-2 lg:grid-cols-5">
          {ROUTES.map((route, index) => {
            const Icon = route.icon;
            const [title, detail] = copy.items[index];
            return (
              <a
                key={route.id}
                href={route.href}
                onClick={(event) => {
                  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                  event.preventDefault();
                  onNavigate(route.id);
                }}
                className="group flex min-h-40 flex-col justify-between bg-[#fbf8f1] p-5 transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-[#9b6334]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#b88a2c]/40 bg-[#ece5d6] text-[#173f34] transition-colors group-hover:bg-[#173f34] group-hover:text-[#fbf8f1]">
                    <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-[#9b6334] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </div>
                <div className="mt-6">
                  <h3 className="font-serif text-xl font-semibold leading-tight">{title}</h3>
                  <p className="mt-2 text-[11px] leading-relaxed text-[#65716c]">{detail}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
