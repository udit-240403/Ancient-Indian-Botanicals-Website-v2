import type { BuyerLanguage } from '../context/BuyerLanguageContext';

export const INTERFACE_COPY: Record<BuyerLanguage, {
  hero: {
    eyebrow: string; lead: string; highlight: string; tail: string; body: string;
    extracts: string; botanicals: string; productRoutes: string; families: string;
    lotReview: string; provenanceTitle: string; provenanceBody: string; requestDocuments: string;
  };
  catalogue: {
    searchPlaceholder: string; searchLabel: string; usedAcross: string; matching: string;
    availability: string; fullPage: string; enquire: string; loadMore: string;
    noMatch: string; noMatchBody: string; custom: string; industryApplications: string;
    commercialValue: string; reviewPoints: string; requestProduct: string;
  };
  product: {
    route: string; representative: string; enquire: string; requestCoa: string;
    back: string; applicationContext: string; applicationHeading: string;
    related: string; continue: string; viewCatalogue: string;
  };
}> = {
  en: {
    hero: {
      eyebrow: 'Indian botanical sourcing · Specification-led B2B supply', lead: 'Source from the', highlight: 'heart', tail: 'of Indian botanicals.',
      body: 'From our Mandsaur–Neemuch sourcing base, we align botanical identity, extract marker and analytical method with the buyer’s application, volume and destination before proposing a supply route.',
      extracts: 'Explore extracts', botanicals: 'Explore Indian botanicals', productRoutes: 'Product routes', families: 'Ingredient families', lotReview: 'Lot-specific review',
      provenanceTitle: 'Evidence before promises', provenanceBody: 'Buyer specifications are matched with the documents available for the proposed lot and supply route.', requestDocuments: 'Request lot documents',
    },
    catalogue: {
      searchPlaceholder: 'Search product, alternate name, botanical name, form or use…', searchLabel: 'Search complete product catalogue', usedAcross: 'Used across', matching: 'matching products', availability: 'Current availability is confirmed only after enquiry.', fullPage: 'Full product page', enquire: 'Enquire', loadMore: 'Load more products', noMatch: 'No matching product found', noMatchBody: 'Send the botanical, grade, form and application you require to our trade desk.', custom: 'Request custom sourcing', industryApplications: 'Industry applications', commercialValue: 'Commercial context', reviewPoints: 'Review points', requestProduct: 'Request this product',
    },
    product: { route: 'Product specification', representative: 'Representative product form', enquire: 'Enquire about this product', requestCoa: 'Request spec / sample COA', back: 'Back to collection', applicationContext: 'Application context', applicationHeading: 'Where buyers typically evaluate this material', related: 'Related products', continue: 'Continue exploring', viewCatalogue: 'View complete catalogue' },
  },
  de: {
    hero: {
      eyebrow: 'Indische Botanicals · Spezifikationsgeführte B2B-Beschaffung', lead: 'Direkt aus dem', highlight: 'Herzen', tail: 'indischer Botanicals.',
      body: 'Von unserer Beschaffungsbasis Mandsaur–Neemuch aus stimmen wir botanische Identität, Extraktmarker und Analysemethode mit Anwendung, Menge und Zielland ab, bevor wir eine Lieferroute vorschlagen.',
      extracts: 'Extrakte entdecken', botanicals: 'Botanicals entdecken', productRoutes: 'Produktrouten', families: 'Zutatenfamilien', lotReview: 'Chargenprüfung', provenanceTitle: 'Nachweise vor Versprechen', provenanceBody: 'Käuferspezifikationen werden mit den verfügbaren Unterlagen der vorgeschlagenen Charge und Lieferroute abgeglichen.', requestDocuments: 'Chargendokumente anfordern',
    },
    catalogue: {
      searchPlaceholder: 'Produkt, Alternativname, botanischen Namen, Form oder Anwendung suchen…', searchLabel: 'Gesamten Produktkatalog durchsuchen', usedAcross: 'Typische Bereiche', matching: 'passende Produkte', availability: 'Die aktuelle Verfügbarkeit wird erst nach Anfrage bestätigt.', fullPage: 'Vollständige Produktseite', enquire: 'Anfragen', loadMore: 'Weitere Produkte laden', noMatch: 'Kein passendes Produkt gefunden', noMatchBody: 'Senden Sie die benötigte Pflanze, Qualität, Form und Anwendung an unser Handelsteam.', custom: 'Individuelle Beschaffung anfragen', industryApplications: 'Branchenanwendungen', commercialValue: 'Kommerzieller Kontext', reviewPoints: 'Prüfpunkte', requestProduct: 'Dieses Produkt anfragen',
    },
    product: { route: 'Produktspezifikation', representative: 'Repräsentative Produktform', enquire: 'Produkt anfragen', requestCoa: 'Spezifikation / Muster-COA anfordern', back: 'Zurück zur Kollektion', applicationContext: 'Anwendungskontext', applicationHeading: 'Wo Käufer dieses Material typischerweise bewerten', related: 'Ähnliche Produkte', continue: 'Weiter entdecken', viewCatalogue: 'Gesamtkatalog ansehen' },
  },
  fr: {
    hero: {
      eyebrow: 'Botaniques indiennes · Approvisionnement B2B selon spécification', lead: 'Au', highlight: 'cœur', tail: 'des botaniques indiennes.',
      body: 'Depuis notre base d’approvisionnement de Mandsaur–Neemuch, nous alignons l’identité botanique, le marqueur d’extrait et la méthode d’analyse sur l’application, le volume et la destination avant de proposer une filière.',
      extracts: 'Découvrir les extraits', botanicals: 'Découvrir les botaniques', productRoutes: 'Filières produits', families: 'Familles d’ingrédients', lotReview: 'Revue par lot', provenanceTitle: 'Des preuves avant les promesses', provenanceBody: 'Les spécifications de l’acheteur sont rapprochées des documents disponibles pour le lot et la filière proposés.', requestDocuments: 'Demander les documents du lot',
    },
    catalogue: {
      searchPlaceholder: 'Rechercher produit, nom alternatif, nom botanique, forme ou usage…', searchLabel: 'Rechercher dans le catalogue complet', usedAcross: 'Utilisé dans', matching: 'produits correspondants', availability: 'La disponibilité actuelle est confirmée uniquement après demande.', fullPage: 'Fiche produit complète', enquire: 'Demander', loadMore: 'Charger plus de produits', noMatch: 'Aucun produit correspondant', noMatchBody: 'Indiquez à notre équipe la plante, la qualité, la forme et l’application recherchées.', custom: 'Demander un sourcing personnalisé', industryApplications: 'Applications industrielles', commercialValue: 'Contexte commercial', reviewPoints: 'Points de contrôle', requestProduct: 'Demander ce produit',
    },
    product: { route: 'Spécification produit', representative: 'Présentation indicative du produit', enquire: 'Demander ce produit', requestCoa: 'Demander spécification / COA type', back: 'Retour à la collection', applicationContext: 'Contexte d’application', applicationHeading: 'Où les acheteurs évaluent généralement cette matière', related: 'Produits associés', continue: 'Continuer l’exploration', viewCatalogue: 'Voir le catalogue complet' },
  },
  es: {
    hero: {
      eyebrow: 'Botánicos de India · Suministro B2B según especificación', lead: 'Desde el', highlight: 'corazón', tail: 'de los botánicos de India.',
      body: 'Desde nuestra base de abastecimiento de Mandsaur–Neemuch, alineamos la identidad botánica, el marcador del extracto y el método analítico con la aplicación, el volumen y el destino antes de proponer una ruta de suministro.',
      extracts: 'Explorar extractos', botanicals: 'Explorar botánicos', productRoutes: 'Rutas de producto', families: 'Familias de ingredientes', lotReview: 'Revisión por lote', provenanceTitle: 'Evidencia antes que promesas', provenanceBody: 'Las especificaciones del comprador se contrastan con los documentos disponibles del lote y la ruta propuestos.', requestDocuments: 'Solicitar documentos del lote',
    },
    catalogue: {
      searchPlaceholder: 'Buscar producto, nombre alternativo, nombre botánico, forma o uso…', searchLabel: 'Buscar en el catálogo completo', usedAcross: 'Usado en', matching: 'productos coincidentes', availability: 'La disponibilidad actual se confirma solo tras la consulta.', fullPage: 'Página completa del producto', enquire: 'Consultar', loadMore: 'Cargar más productos', noMatch: 'No se encontró un producto coincidente', noMatchBody: 'Envíe a nuestro equipo el botánico, grado, forma y aplicación que necesita.', custom: 'Solicitar abastecimiento personalizado', industryApplications: 'Aplicaciones industriales', commercialValue: 'Contexto comercial', reviewPoints: 'Puntos de revisión', requestProduct: 'Solicitar este producto',
    },
    product: { route: 'Especificación del producto', representative: 'Presentación representativa del producto', enquire: 'Consultar este producto', requestCoa: 'Solicitar especificación / COA de muestra', back: 'Volver a la colección', applicationContext: 'Contexto de aplicación', applicationHeading: 'Dónde suelen evaluar los compradores este material', related: 'Productos relacionados', continue: 'Seguir explorando', viewCatalogue: 'Ver catálogo completo' },
  },
};

const MARKETING_TRANSLATIONS: Record<string, Partial<Record<Exclude<BuyerLanguage, 'en'>, string>>> = {
  'Complete Current Catalogue': { de: 'Vollständiger aktueller Katalog', fr: 'Catalogue actuel complet', es: 'Catálogo actual completo' },
  'A broader Indian botanical portfolio, organised for serious buyers.': { de: 'Ein breites indisches Botanical-Portfolio für professionelle Einkäufer.', fr: 'Un large portefeuille botanique indien pour acheteurs professionnels.', es: 'Un amplio portafolio botánico indio para compradores profesionales.' },
  'Explore natural essential oils, clearly identified aroma grades, botanical ingredients, carrier oils, floral waters and clays. Availability, composition, specification and documents are confirmed in writing for every enquiry.': { de: 'Entdecken Sie ätherische Öle, klar gekennzeichnete Aromaqualitäten, Botanicals, Trägeröle, Blütenwässer und Tonerden. Verfügbarkeit, Zusammensetzung, Spezifikation und Dokumente werden je Anfrage schriftlich bestätigt.', fr: 'Découvrez huiles essentielles, qualités aromatiques clairement identifiées, botaniques, huiles végétales, eaux florales et argiles. Disponibilité, composition, spécification et documents sont confirmés par écrit pour chaque demande.', es: 'Explore aceites esenciales, calidades aromáticas claramente identificadas, botánicos, aceites portadores, aguas florales y arcillas. Disponibilidad, composición, especificación y documentos se confirman por escrito para cada consulta.' },
  'Complete Oils Portfolio': { de: 'Vollständiges Ölportfolio', fr: 'Portefeuille complet d’huiles', es: 'Portafolio completo de aceites' },
  'Natural oils and aroma grades, clearly separated and fully visible.': { de: 'Natürliche Öle und Aromaqualitäten – klar getrennt und transparent.', fr: 'Huiles naturelles et qualités aromatiques, clairement séparées.', es: 'Aceites naturales y calidades aromáticas, claramente separadas.' },
  'Browse all natural essential oils, carrier oils and clearly identified aroma or diffuser grades in one complete collection. Each card shows commercial forms, industry uses and buyer relevance; composition and analytical requirements remain lot-specific.': { de: 'Durchsuchen Sie ätherische Öle, Trägeröle und klar gekennzeichnete Aroma- oder Diffusorqualitäten. Jede Karte zeigt Handelsformen und Anwendungen; Zusammensetzung und Analytik bleiben chargenspezifisch.', fr: 'Parcourez les huiles essentielles, huiles végétales et qualités aromatiques ou diffuseur clairement identifiées. Chaque fiche présente formes et usages ; composition et analyses restent propres au lot.', es: 'Explore aceites esenciales, portadores y calidades aromáticas o para difusor claramente identificadas. Cada ficha muestra formas y usos; la composición y los análisis dependen del lote.' },
  'Complete Botanical Portfolio': { de: 'Vollständiges Botanical-Portfolio', fr: 'Portefeuille botanique complet', es: 'Portafolio botánico completo' },
  'Indian botanicals for formulation, sourcing and export.': { de: 'Indische Botanicals für Formulierung, Beschaffung und Export.', fr: 'Botaniques indiennes pour formulation, sourcing et export.', es: 'Botánicos de India para formulación, abastecimiento y exportación.' },
  'Explore Indian botanicals across whole, cut and powdered herbs, roots, seeds, resins, floral waters and clays. Standardized extracts are presented separately so marker, method and processing requirements remain clear.': { de: 'Entdecken Sie ganze, geschnittene und pulverisierte Kräuter, Wurzeln, Samen, Harze, Blütenwässer und Tonerden. Standardisierte Extrakte werden separat gezeigt, damit Marker, Methode und Verarbeitung klar bleiben.', fr: 'Découvrez herbes, racines, graines et résines entières, coupées ou en poudre, ainsi que les eaux florales et argiles. Les extraits standardisés sont séparés pour clarifier marqueur, méthode et transformation.', es: 'Explore hierbas, raíces, semillas y resinas enteras, cortadas o en polvo, además de aguas florales y arcillas. Los extractos estandarizados se muestran aparte para aclarar marcador, método y proceso.' },
  'Manufacturing-Partner Extract Portfolio': { de: 'Extraktportfolio unserer Fertigungspartner', fr: 'Portefeuille d’extraits de partenaires fabricants', es: 'Portafolio de extractos de socios fabricantes' },
  'Standardized botanical extracts, qualified around the buyer specification.': { de: 'Standardisierte Pflanzenextrakte, qualifiziert nach Käuferspezifikation.', fr: 'Extraits botaniques standardisés, qualifiés selon la spécification acheteur.', es: 'Extractos botánicos estandarizados, calificados según la especificación del comprador.' },
  'Explore priority and extended extract routes coordinated through manufacturing partners. Plant part, active marker, analytical method, extract ratio, solvent system, carrier status, application grade, MOQ and documents are confirmed before quotation.': { de: 'Entdecken Sie priorisierte und erweiterte Extrakte unserer Fertigungspartner. Pflanzenteil, Marker, Analysemethode, Extraktverhältnis, Lösungsmittel, Träger, Anwendung, MOQ und Dokumente werden vor dem Angebot bestätigt.', fr: 'Explorez les extraits prioritaires et étendus coordonnés avec nos partenaires fabricants. Partie végétale, marqueur, méthode, ratio, solvant, support, application, MOQ et documents sont confirmés avant devis.', es: 'Explore extractos prioritarios y ampliados coordinados con socios fabricantes. Parte vegetal, marcador, método, proporción, solvente, portador, aplicación, MOQ y documentos se confirman antes de cotizar.' },
  'Seeds, Nuts & Value-Added Food Ingredients': { de: 'Saaten, Nüsse & veredelte Lebensmittelzutaten', fr: 'Graines, noix et ingrédients alimentaires à valeur ajoutée', es: 'Semillas, frutos secos e ingredientes alimentarios de valor añadido' },
  "Indian food ingredients, selected around the buyer's specification.": { de: 'Indische Lebensmittelzutaten nach Käuferspezifikation.', fr: 'Ingrédients alimentaires indiens sélectionnés selon la spécification acheteur.', es: 'Ingredientes alimentarios de India seleccionados según la especificación del comprador.' },
  'Explore oilseeds, nuts, makhana, coconut products, jaggery, millets, dehydrated ingredients and clearly identified cold-pressed oil routes. Origin, grade, food-safety evidence, destination suitability and current availability remain offer-specific.': { de: 'Entdecken Sie Ölsaaten, Nüsse, Makhana, Kokosprodukte, Jaggery, Hirse, Trockenzutaten und klar gekennzeichnete kaltgepresste Öle. Herkunft, Qualität, Lebensmittelsicherheitsnachweise, Ziellandeignung und Verfügbarkeit bleiben angebotsspezifisch.', fr: 'Découvrez oléagineux, noix, makhana, coco, jaggery, millets, ingrédients déshydratés et huiles pressées à froid clairement identifiées. Origine, qualité, preuves de sécurité, destination et disponibilité restent propres à l’offre.', es: 'Explore oleaginosas, frutos secos, makhana, coco, jaggery, mijo, ingredientes deshidratados y aceites prensados en frío claramente identificados. Origen, grado, seguridad, destino y disponibilidad dependen de la oferta.' },
};

export const localizeMarketingText = (value: string, language: BuyerLanguage) =>
  language === 'en' ? value : MARKETING_TRANSLATIONS[value]?.[language] ?? value;
