import { BotanicalProduct, ProvenanceRegion, WorkflowStep } from '../types';

export const BOTANICAL_PRODUCTS: BotanicalProduct[] = [
  {
    id: 'aib-001',
    slug: 'ashwagandha',
    name: 'Ashwagandha Root & Standardized Extract',
    botanicalName: 'Withania somnifera',
    category: 'botanicals',
    subFamily: 'Roots & extracts',
    badgeNumber: 'AIB-001',
    description: 'Premier adaptogenic root harvested from Central Indian dryland corridors. Available as whole dried roots, coarse cuts, micronized powders, and water-alcohol extracts standardized for withanolides.',
    availableForms: ['Whole Dried Root', 'Micronized Powder (80 mesh)', 'Standardized Extract (2.5% - 5% Withanolides)', 'Coarse Cut (2-5mm)'],
    harvestOrigin: 'Mandsaur & Neemuch, Central India',
    image: '/assets/images/hero-botanical-still-life.png',
    specifications: {
      appearance: 'Light tan to brownish fine powder or characteristic fibrous root',
      activeMarkers: '2.5% to 5.0% Withanolides by HPLC',
      shelfLife: '24 Months under cool, sealed nitrogen-flushed conditions',
      packagingOptions: ['25kg HDPE Drums with double PE inner bag', '10kg Sealed Foil Bags', 'Customized Sample Pouches (100g - 1kg)']
    }
  },
  {
    id: 'aib-002',
    slug: 'boswellia-salai-guggul',
    name: 'Boswellia / Salai Guggul Gum Resin',
    botanicalName: 'Boswellia serrata',
    category: 'botanicals',
    subFamily: 'Resins & extracts',
    badgeNumber: 'AIB-002',
    description: 'Sustainably harvested oleo-gum-resin from the dry deciduous forests of Central India. Processed for pharmaceutical, fragrance, and botanical extract applications.',
    availableForms: ['Raw Tear Resin (Selected Grade A)', 'Powdered Resin', 'Boswellic Acid Extract (65% Titration)'],
    harvestOrigin: 'Central Indian Deciduous Forest Belt',
    image: '/assets/images/product-families-flatlay.png',
    specifications: {
      appearance: 'Golden yellow to pale amber tears or light cream powder',
      aromaProfile: 'Balsamic, warm, pine-woody with citrus top note',
      activeMarkers: 'Total Boswellic Acids 65% by Titration / HPLC',
      shelfLife: '36 Months stored in moisture-proof barrier containers',
      packagingOptions: ['25kg Fiber Drums with liner', '50kg Jute Bags with inner liner for raw resin']
    }
  },
  {
    id: 'aib-003',
    slug: 'sandalwood-oil',
    name: 'Mysore Sandalwood Essential Oil',
    botanicalName: 'Santalum album',
    category: 'essential-oils',
    subFamily: 'Wood & resin oils',
    badgeNumber: 'AIB-003',
    description: 'Authentic steam-distilled heartwood oil from legally managed Indian Santalum album plantations. Characterized by unmatched richness, depth, and alpha-santalol concentration.',
    extractionMethod: 'Hydro-steam Distillation of Mature Heartwood',
    availableForms: ['Pure Essential Oil (Grade A Export)', 'Dilution Accords for Perfumery'],
    harvestOrigin: 'Karnataka & Tamil Nadu, South India',
    image: '/assets/images/hero-botanical-still-life.png',
    specifications: {
      appearance: 'Pale yellow to clear viscous liquid',
      aromaProfile: 'Deep, creamy, sweet woody balsamic with extraordinary tenacity',
      activeMarkers: 'Total Santalols > 60% (ISO 3518 compliant)',
      shelfLife: '48 Months when protected from light and heat',
      packagingOptions: ['1kg Aluminium Bottles', '5kg ISO Aluminium Cans', '25kg Lined Steel Drums']
    }
  },
  {
    id: 'aib-004',
    slug: 'basil-oil',
    name: 'Holy Basil / Tulsi Essential Oil',
    botanicalName: 'Ocimum basilicum / Ocimum sanctum',
    category: 'essential-oils',
    subFamily: 'Herbaceous oils',
    badgeNumber: 'AIB-004',
    description: 'Steam-distilled from freshly harvested leaves and flowering tops of Indian Tulsi. Renowned for rich eugenol/methyl chavicol profile and herbal aromatic depth.',
    extractionMethod: 'Steam Distillation',
    availableForms: ['Pure Essential Oil', 'Fractionated Profile'],
    harvestOrigin: 'Plains of North & Central India',
    image: '/assets/images/product-families-flatlay.png',
    specifications: {
      appearance: 'Pale yellow to golden clear liquid',
      aromaProfile: 'Fresh, warm, spicy-herbaceous with sweet clove-like under-notes',
      shelfLife: '24 Months in dark amber or aluminum containers',
      packagingOptions: ['1kg Aluminium Flasks', '5kg Aluminium Drums', '25kg HDPE Export Containers']
    }
  },
  {
    id: 'aib-005',
    slug: 'rose-water-hydrosol',
    name: 'Kannauj Steam-Distilled Rose Water Hydrosol',
    botanicalName: 'Rosa damascena',
    category: 'hydrosols-clays',
    subFamily: 'Hydrosols & floral waters',
    badgeNumber: 'AIB-005',
    description: 'Traditional copper-still steam distillation of fresh morning-picked Damask Rose petals. Contains natural micro-encapsulated rose oil without artificial additives or alcohol.',
    extractionMethod: 'Traditional Hydro-distillation (Deg-Bhapka / Copper Still)',
    availableForms: ['Pure Floral Water (100% Single Distillate)', 'Concentrated Hydrosol Base'],
    harvestOrigin: 'Kannauj Aromatic Belt, Uttar Pradesh',
    image: '/assets/images/hero-botanical-still-life.png',
    specifications: {
      appearance: 'Clear, colorless liquid with natural micro-droplet suspension',
      aromaProfile: 'Rich, authentic, fresh blooming rose bouquet',
      shelfLife: '18 Months stored in UV-filtered cool conditions',
      packagingOptions: ['5kg Sealed HDPE Bottles', '20kg Export Drums', '200kg IBC Totes']
    }
  },
  {
    id: 'aib-006',
    slug: 'amla-fruit-powder',
    name: 'Amla Fruit & Standardized Powder',
    botanicalName: 'Phyllanthus emblica / Emblica officinalis',
    category: 'botanicals',
    subFamily: 'Fruits & powders',
    badgeNumber: 'AIB-006',
    description: 'Wild-harvested Indian Gooseberry processed at controlled low temperatures to retain natural vitamin C complexes and hydrolysable tannins (emblicanin A & B).',
    availableForms: ['Deseeded Dried Fruit Flakes', 'Fine Powder (100 mesh)', 'Standardized Tannin Extract (30% - 40%)'],
    harvestOrigin: 'Pratapgarh & Central India',
    image: '/assets/images/product-families-flatlay.png',
    specifications: {
      appearance: 'Greenish-brown to tan fine powder',
      activeMarkers: 'Total Tannins >= 30% by Titration / Ascorbic Acid profile',
      shelfLife: '24 Months stored away from moisture',
      packagingOptions: ['25kg Double Lined Polyethylene Fiber Drums', '10kg Vacuum Bags']
    }
  },
  {
    id: 'aib-007',
    slug: 'bacopa-brahmi',
    name: 'Bacopa / Brahmi Aerial Herb & Extract',
    botanicalName: 'Bacopa monnieri',
    category: 'botanicals',
    subFamily: 'Herbs & extracts',
    badgeNumber: 'AIB-007',
    description: 'Sustainably cultivated wetland herb harvested before flowering to maximize bacoside yield. Widely specified for cognitive health and botanical tea blends.',
    availableForms: ['Whole Cut Dried Herb', 'Fine Powder (80 mesh)', 'Bacoside Extract 20% - 50%'],
    harvestOrigin: 'Wetland agricultural corridors of South & East India',
    image: '/assets/images/hero-botanical-still-life.png',
    specifications: {
      appearance: 'Dull green to brownish fine powder or cut herb',
      activeMarkers: 'Bacosides A & B >= 20% by HPLC',
      shelfLife: '24 Months in cool dry warehouse conditions',
      packagingOptions: ['25kg HDPE Drums with inner PE seal', '15kg Kraft Paper Bags with PE liner']
    }
  },
  {
    id: 'aib-008',
    slug: 'arjuna-bark-powder',
    name: 'Arjuna Bark & Powder',
    botanicalName: 'Terminalia arjuna',
    category: 'botanicals',
    subFamily: 'Bark & powders',
    badgeNumber: 'AIB-008',
    description: 'Responsibly peeled mature tree bark rich in natural co-enzyme Q10 precursors, arjunolic acid, and flavonoids. Carefully air-dried and ground to uniform mesh.',
    availableForms: ['Coarse Cut Bark (1-2 cm)', 'Powdered Bark (80-100 mesh)', 'Standardized Extract'],
    harvestOrigin: 'Riverine forest corridors of Central India',
    image: '/assets/images/product-families-flatlay.png',
    specifications: {
      appearance: 'Reddish-brown powder or thick curved bark pieces',
      activeMarkers: 'Total Tannins > 15%, Arjunolic acid presence confirmed',
      shelfLife: '36 Months under dark, dry conditions',
      packagingOptions: ['25kg Woven Sacks with inner liner', '25kg Fiber Drums']
    }
  },
  {
    id: 'aib-009',
    slug: 'lemongrass-oil',
    name: 'Cochin Lemongrass Essential Oil',
    botanicalName: 'Cymbopogon citratus / Cymbopogon flexuosus',
    category: 'essential-oils',
    subFamily: 'Herbaceous oils',
    badgeNumber: 'AIB-009',
    description: 'Crisp, high-citral steam distilled oil sourced from Kerala and Southern hillsides. Crucial raw material for fine aroma, cleansing formulations, and natural citral isolation.',
    extractionMethod: 'Steam Distillation of Fresh Grass',
    availableForms: ['Pure Export Grade Oil', 'High-Citral Rectified Fraction'],
    harvestOrigin: 'Alleppey & Malabar Coast, Kerala',
    image: '/assets/images/hero-botanical-still-life.png',
    specifications: {
      appearance: 'Yellow to reddish-brown liquid',
      aromaProfile: 'Fresh, pungent, sharp lemon-like herbaceous scent',
      activeMarkers: 'Total Citral (Geranial + Neral) > 75%',
      shelfLife: '24 Months stored cold and sealed',
      packagingOptions: ['1kg Aluminium Bottle', '10kg Aluminium Canister', '180kg Galvanized Steel Drum']
    }
  },
  {
    id: 'aib-010',
    slug: 'agarwood-oudh-aroma-oil',
    name: 'Agarwood / Oudh Botanical Accord & Aroma Oil',
    botanicalName: 'Aquilaria agallocha (Accords & Distillates)',
    category: 'essential-oils',
    subFamily: 'Aroma oils & accords',
    badgeNumber: 'AIB-010',
    description: 'Expertly crafted botanical accords and selected steam distillates representing classic Indian Oudh heritage. Grade and composition confirmed against buyer application.',
    extractionMethod: 'Hydro-distillation & Botanical Accord Formulation',
    availableForms: ['Concentrated Perfumery Accord', 'Base Dilution'],
    harvestOrigin: 'Assam & North-Eastern Botanical Belt',
    image: '/assets/images/product-families-flatlay.png',
    specifications: {
      appearance: 'Dark amber to deep reddish-brown viscous liquid',
      aromaProfile: 'Complex, smoky, deep woody, resinous animalic tenor',
      shelfLife: '48 Months (matures with age)',
      packagingOptions: ['500g Glass Flasks', '1kg Aluminium Flasks', '5kg Steel Drums']
    }
  },
  {
    id: 'aib-011',
    slug: 'blue-kamal-aroma-oil',
    name: 'Blue Water Lily / Blue Kamal Aroma Oil',
    botanicalName: 'Nymphaea nouchali / caerulea (Accords)',
    category: 'essential-oils',
    subFamily: 'Aroma oils & accords',
    badgeNumber: 'AIB-011',
    description: 'Exquisite aquatic-floral aroma oil capturing the delicate etheric essence of Indian Blue Lotus blossoms. Tailored for fine fragrances, luxury personal care, and anointment oils.',
    availableForms: ['Botanical Accord (100% Concentrate)', 'Oil Soluble Base'],
    harvestOrigin: 'Southern & Central Indian Floral Lakes',
    image: '/assets/images/hero-botanical-still-life.png',
    specifications: {
      appearance: 'Clear dark greenish-amber liquid',
      aromaProfile: 'Ethereal, aquatic, sweet floral with soft anise undertones',
      shelfLife: '24 Months in dark UV-shielded bottles',
      packagingOptions: ['100g Glass Vials', '1kg Aluminium Flasks', '5kg Canisters']
    }
  },
  {
    id: 'aib-012',
    slug: 'bitter-melon',
    name: 'Bitter Melon / Karela Dried Fruit & Powder',
    botanicalName: 'Momordica charantia',
    category: 'botanicals',
    subFamily: 'Fruits & powders',
    badgeNumber: 'AIB-012',
    description: 'Thinly sliced shade-dried bitter melon slices and uniform mesh powders. Rich in charantin and bitter glycosides for dietary formulations.',
    availableForms: ['Dried Slices / Flakes', 'Powder (80 mesh)', 'Water Extract'],
    harvestOrigin: 'Central & Western Agricultural Belts',
    image: '/assets/images/product-families-flatlay.png',
    specifications: {
      appearance: 'Dull green to light yellow-green powder or dried slices',
      activeMarkers: 'Charantin presence confirmed',
      shelfLife: '24 Months in dry sealed conditions',
      packagingOptions: ['20kg HDPE Fiber Drums', '10kg Kraft Bags']
    }
  }
];

export const PROVENANCE_REGIONS: ProvenanceRegion[] = [
  {
    id: 'mandsaur',
    name: 'Mandsaur & Central India Corridor',
    subtitle: 'Roots, herbs, seeds & regional agricultural supply',
    description: 'Positioned at the agrarian crossroads of Madhya Pradesh and Rajasthan, Mandsaur is India’s premier trading and cultivation hub for root botanicals like Ashwagandha, Isabgol, and seed spices. Dry climatic conditions promote optimal secondary metabolite concentration.',
    keyCrops: ['Ashwagandha (Withania somnifera)', 'Boswellia serrata Gum', 'Amla (Phyllanthus emblica)', 'Arjuna Bark'],
    exportCorridor: 'Direct rail & highway connections to Western Indian Container Ports (JNPT & Mundra)',
    latitude: 24.0725,
    longitude: 75.0683,
    image: '/assets/images/hero-botanical-still-life.png'
  },
  {
    id: 'alleppey',
    name: 'Alleppey & Malabar Coast, Kerala',
    subtitle: 'Spice, leaf & coastal aromatic supply corridors',
    description: 'The historic spice coast of Kerala provides tropical rainfall, fertile laterite soil, and centuries of distillation expertise. Sourced botanicals include premium lemongrass, ginger, pepper, cardamoms, and coastal hydrosols.',
    keyCrops: ['Lemongrass Oil (Cymbopogon flexuosus)', 'Black Pepper Extracts', 'Cardamom Oil', 'Fresh Hydrosols'],
    exportCorridor: 'Direct sea feeder connections via Cochin Port (COK)',
    latitude: 9.4981,
    longitude: 76.3388,
    image: '/assets/images/product-families-flatlay.png'
  },
  {
    id: 'mysore',
    name: 'Mysore & South India Belt',
    subtitle: 'Aromatic, floral & specialty botanical connections',
    description: 'Renowned globally for fragrant timber, essential oils, and floral extracts. The Mysore plateau hosts sustainable Santalum album plantations alongside jasmine and davana cultivation.',
    keyCrops: ['Mysore Sandalwood Oil (Santalum album)', 'Davana Oil', 'Jasmine Grandiflorum Absolutes', 'Vetiver Root'],
    exportCorridor: 'Export processing via Chennai & Bengaluru Air/Sea Hubs',
    latitude: 12.2958,
    longitude: 76.6394,
    image: '/assets/images/hero-botanical-still-life.png'
  }
];

export const SPECIFICATION_WORKFLOW: WorkflowStep[] = [
  {
    id: 1,
    step: '01',
    title: 'Specify Requirement',
    shortDesc: 'Share botanical identity, form, volume & port',
    fullDesc: 'Buyers provide target botanical species, required active-marker concentration, physical form (powder/cut/oil), trial or container volume, and destination country/port.',
    iconName: 'FileText',
    deliverables: ['Target Specification Matrix', 'Regulatory Check against Destination']
  },
  {
    id: 2,
    step: '02',
    title: 'Match Lot & Origin Route',
    shortDesc: 'We evaluate current harvest & verified supplier lots',
    fullDesc: 'We cross-reference buyer needs with current verified harvest lots across our Central & Southern Indian origin corridors to find an exact specification match.',
    iconName: 'GitBranch',
    deliverables: ['Lot Identification Report', 'Preliminary COA Draft']
  },
  {
    id: 3,
    step: '03',
    title: 'Document & COA Verification',
    shortDesc: 'Review batch certificates, GC/MS or lab analysis',
    fullDesc: 'Documentation relevant to the product and destination (Certificate of Analysis, GC/MS profiles, Heavy Metals, MSDS) is supplied for buyer technical sign-off.',
    iconName: 'ShieldCheck',
    deliverables: ['Batch COA', 'Chromatography Data (Where Applicable)', 'MSDS & Technical Data Sheet']
  },
  {
    id: 4,
    step: '04',
    title: 'Pack & Custom Labeling',
    shortDesc: 'Confirm sample, bulk drum or white-label format',
    fullDesc: 'Material is packaged into compliant aluminium bottles, food-grade HDPE drums, or nitrogen-flushed foil bags with complete batch labeling and barcode tracking.',
    iconName: 'Package',
    deliverables: ['Package Compatibility Sign-off', 'Shipping Label Mockup']
  },
  {
    id: 5,
    step: '05',
    title: 'Dispatch & Export Execution',
    shortDesc: 'Finalize Incoterms, customs docs & container loading',
    fullDesc: 'Shipment documents (Bill of Lading, Phytosanitary Certificate, Certificate of Origin, Packing List) are compiled for smooth customs release at destination.',
    iconName: 'Truck',
    deliverables: ['Phytosanitary Certificate', 'Certificate of Origin', 'Shipping Tracking & BL']
  }
];
