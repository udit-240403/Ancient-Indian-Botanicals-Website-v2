import React from 'react';
import { ArrowRight, Droplets, Leaf, Flower2, Package, Wheat, FlaskConical } from 'lucide-react';
import { CATALOGUE_PRODUCTS, CATALOGUE_PRODUCT_COUNT, getCatalogueGroup } from '../data/catalogue';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface ProductFamiliesProps {
  onSelectCategory: (category: string) => void;
  onViewAll: () => void;
}

export const ProductFamilies: React.FC<ProductFamiliesProps> = ({ onSelectCategory, onViewAll }) => {
  const { language } = useBuyerLanguage();
  const copy = {
    en: { eyebrow: 'Product portfolio', heading: 'A portfolio shaped by origin', intro: 'Explore ingredients by application and form. Origin, specification, documentation and current availability are confirmed for each enquiry.', all: 'Explore all', routes: 'product routes', banner: 'Indian ingredients, prepared around your specification', cards: [
      ['Standardized botanical extracts', 'Partner-processed extracts aligned to plant part, marker, method, ratio, solvent and buyer application.', 'Explore extracts'],
      ['Natural, aroma & carrier oils', 'Natural essential oils, carrier oils and clearly separated aroma or diffuser grades.', 'Explore oils'],
      ['Botanical ingredients', 'Whole, cut and powdered herbs, roots, barks, seeds and resins.', 'Browse botanicals'],
      ['Seeds, nuts & food ingredients', 'Oilseeds, makhana, coconut, jaggery, millets, dehydrated ingredients and culinary oils.', 'Explore food ingredients'],
      ['Floral waters & clays', 'Distinct hydrosol, floral-water and natural-clay routes for formulation and personal care.', 'View ingredients'],
      ['Bulk & private-label packaging', 'Samples, aluminium bottles, export drums and selected white-label formats.', 'See packaging'],
    ] },
    de: { eyebrow: 'Produktportfolio', heading: 'Ein Portfolio mit klarer Herkunft', intro: 'Entdecken Sie Inhaltsstoffe nach Anwendung und Form. Herkunft, Spezifikation, Dokumente und Verfügbarkeit werden je Anfrage bestätigt.', all: 'Alle ansehen:', routes: 'Produktrouten', banner: 'Indische Inhaltsstoffe, abgestimmt auf Ihre Spezifikation', cards: [
      ['Standardisierte Pflanzenextrakte', 'Partnerverarbeitete Extrakte nach Pflanzenteil, Marker, Methode, Verhältnis, Lösungsmittel und Anwendung.', 'Extrakte entdecken'],
      ['Natürliche, Aroma- & Trägeröle', 'Ätherische Öle, Trägeröle und klar getrennte Aroma- oder Diffusorqualitäten.', 'Öle entdecken'],
      ['Botanische Rohstoffe', 'Ganze, geschnittene und pulverisierte Kräuter, Wurzeln, Rinden, Samen und Harze.', 'Botanicals ansehen'],
      ['Saaten, Nüsse & Lebensmittel', 'Ölsaaten, Makhana, Kokos, Jaggery, Hirse, Trockenzutaten und Speiseöle.', 'Lebensmittel entdecken'],
      ['Blütenwässer & Tonerden', 'Hydrolate, Blütenwässer und natürliche Tonerden für Formulierung und Körperpflege.', 'Inhaltsstoffe ansehen'],
      ['Bulk- & Private-Label-Verpackung', 'Muster, Aluminiumflaschen, Exportfässer und ausgewählte White-Label-Formate.', 'Verpackung ansehen'],
    ] },
    fr: { eyebrow: 'Portefeuille produits', heading: 'Un portefeuille guidé par l’origine', intro: 'Explorez les ingrédients par application et forme. Origine, spécification, documents et disponibilité sont confirmés pour chaque demande.', all: 'Voir les', routes: 'filières produits', banner: 'Ingrédients indiens préparés selon votre spécification', cards: [
      ['Extraits botaniques standardisés', 'Extraits transformés par des partenaires selon la partie, le marqueur, la méthode, le ratio, le solvant et l’application.', 'Découvrir les extraits'],
      ['Huiles naturelles, aromatiques & végétales', 'Huiles essentielles, huiles végétales et qualités aromatiques ou diffuseur clairement séparées.', 'Découvrir les huiles'],
      ['Ingrédients botaniques', 'Herbes, racines, écorces, graines et résines entières, coupées ou en poudre.', 'Voir les botaniques'],
      ['Graines, noix & ingrédients alimentaires', 'Oléagineux, makhana, coco, jaggery, millets, ingrédients déshydratés et huiles culinaires.', 'Voir les aliments'],
      ['Eaux florales & argiles', 'Hydrolats, eaux florales et argiles naturelles pour formulation et soins.', 'Voir les ingrédients'],
      ['Conditionnement vrac & marque privée', 'Échantillons, flacons aluminium, fûts export et formats marque blanche sélectionnés.', 'Voir l’emballage'],
    ] },
    es: { eyebrow: 'Portafolio de productos', heading: 'Un portafolio definido por el origen', intro: 'Explore ingredientes por aplicación y forma. Origen, especificación, documentos y disponibilidad se confirman para cada consulta.', all: 'Explorar las', routes: 'rutas de producto', banner: 'Ingredientes de India, preparados según su especificación', cards: [
      ['Extractos botánicos estandarizados', 'Extractos procesados por socios según parte, marcador, método, proporción, solvente y aplicación.', 'Explorar extractos'],
      ['Aceites naturales, aromáticos y portadores', 'Aceites esenciales, portadores y calidades aromáticas o para difusor claramente separadas.', 'Explorar aceites'],
      ['Ingredientes botánicos', 'Hierbas, raíces, cortezas, semillas y resinas enteras, cortadas o en polvo.', 'Ver botánicos'],
      ['Semillas, frutos secos y alimentos', 'Oleaginosas, makhana, coco, jaggery, mijo, deshidratados y aceites culinarios.', 'Explorar alimentos'],
      ['Aguas florales y arcillas', 'Hidrolatos, aguas florales y arcillas naturales para formulación y cuidado personal.', 'Ver ingredientes'],
      ['Embalaje a granel y marca privada', 'Muestras, botellas de aluminio, bidones de exportación y formatos de marca blanca.', 'Ver embalaje'],
    ] },
  }[language];
  const countGroups = (groups: ReturnType<typeof getCatalogueGroup>[]) => CATALOGUE_PRODUCTS.filter((product) => groups.includes(getCatalogueGroup(product))).length;
  const families = [
    {
      id: 'standardized-extracts',
      title: copy.cards[0][0], description: copy.cards[0][1], cta: copy.cards[0][2],
      icon: FlaskConical,
      tag: `${countGroups(['standardized-extracts'])} ${copy.routes}`
    },
    {
      id: 'essential-oils',
      title: copy.cards[1][0], description: copy.cards[1][1], cta: copy.cards[1][2],
      icon: Droplets,
      tag: `${countGroups(['essential-oils', 'aroma-oils', 'carrier-oils'])} ${copy.routes}`
    },
    {
      id: 'botanicals',
      title: copy.cards[2][0], description: copy.cards[2][1], cta: copy.cards[2][2],
      icon: Leaf,
      tag: `${countGroups(['botanicals'])} ${copy.routes}`
    },
    {
      id: 'food-ingredients',
      title: copy.cards[3][0], description: copy.cards[3][1], cta: copy.cards[3][2],
      icon: Wheat,
      tag: `${countGroups(['seeds-food', 'cold-pressed-oils'])} ${copy.routes}`
    },
    {
      id: 'catalogue',
      title: copy.cards[4][0], description: copy.cards[4][1], cta: copy.cards[4][2],
      icon: Flower2,
      tag: `${countGroups(['waters-clays'])} ${copy.routes}`
    },
    {
      id: 'packaging',
      title: copy.cards[5][0], description: copy.cards[5][1], cta: copy.cards[5][2],
      icon: Package,
      tag: '5 format routes'
    }
  ];

  return (
    <section
      className="editorial-section relative w-full overflow-hidden border-b border-[#b56e3a]/20 bg-[#f4efe5] py-20 text-[#1f2925] md:py-28"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(244, 239, 229, 0.93), rgba(244, 239, 229, 0.97)), url('/assets/images/section-botanical-texture.webp')`,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div>
            <span className="text-[11px] uppercase tracking-eyebrow text-[#9b6334] block mb-2 font-bold">
              {copy.eyebrow}
            </span>
            <div className="section-rule mb-5" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-[#1f2925]">
              {copy.heading}
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-sm text-[#52635d] font-light leading-relaxed">
              {copy.intro}
            </p>
            <button
              onClick={onViewAll}
              className="mt-5 inline-flex items-center gap-2 bg-[#173f34] px-6 py-3 text-xs font-bold uppercase tracking-eyebrow text-[#fbf8f1] shadow-lg transition-colors hover:bg-[#102a23]"
            >
              <span>{copy.all} {CATALOGUE_PRODUCT_COUNT} {copy.routes}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Product Families Banner Image & Grid Combo */}
        <div className="image-shell mb-10 relative overflow-hidden border border-[#b88a2c]/35 shadow-2xl h-[300px] md:h-[440px]">
          <img
            src="/assets/images/product-families-flatlay.webp"
            alt="Essential oils, botanical powders and export packaging arranged on a sourcing table"
            width="1659"
            height="948"
            loading="lazy"
            decoding="async"
            onError={(event) => { if (event.currentTarget.dataset.fallback === 'true') return; event.currentTarget.dataset.fallback = 'true'; event.currentTarget.src = '/assets/images/hero-botanical-still-life.webp'; }}
            className="relative z-[1] w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041e18] via-[#041e18]/50 to-transparent flex items-end p-6 md:p-10">
            <div>
              <span className="text-xs uppercase tracking-eyebrow text-[#b88a2c] font-semibold block mb-1">
                Integrated Supply Chain
              </span>
              <h3 className="font-serif text-3xl md:text-5xl text-[#fbf7ed] font-semibold max-w-3xl leading-[1.05]">
                {copy.banner}
              </h3>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid with Deep Dark Green Contrast */}
        <div className="grid grid-cols-1 gap-px border border-[#b56e3a]/25 bg-[#b56e3a]/25 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {families.map((family) => {
            const IconComp = family.icon;
            return (
              <div
                key={family.id}
                onClick={() => onSelectCategory(family.id)}
                className="group flex min-h-[300px] cursor-pointer flex-col justify-between bg-[#fbf8f1] p-7 text-[#1f2925] transition-all duration-300 hover:bg-white md:p-8"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="rounded-full border border-[#b56e3a]/35 bg-[#e8e7dc] p-3 text-[#173f34] transition-colors group-hover:bg-[#173f34] group-hover:text-[#fbf8f1]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] uppercase tracking-eyebrow text-[#6d7f73] font-semibold">
                      {family.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#1f2925] mb-3 group-hover:text-[#9b6334] transition-colors leading-tight">
                    {family.title}
                  </h3>

                  <p className="text-sm text-[#5f6964] leading-relaxed font-light mb-6">
                    {family.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 border-t border-[#b56e3a]/25 pt-4 text-xs font-semibold uppercase tracking-eyebrow text-[#173f34] transition-colors group-hover:text-[#9b6334]">
                  <span>{family.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
