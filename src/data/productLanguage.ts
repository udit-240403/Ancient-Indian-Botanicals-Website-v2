import type { BuyerLanguage } from '../context/BuyerLanguageContext';
import type { CatalogueGroup } from './catalogue';

type TranslationSet = Record<Exclude<BuyerLanguage, 'en'>, string>;

const WORDS: Record<Exclude<BuyerLanguage, 'en'>, Record<string, string>> = {
  de: {
    Agarwood: 'Adlerholz', Almond: 'Mandel', Almonds: 'Mandeln', Amaranth: 'Amarant',
    Basil: 'Basilikum', Beetroot: 'Rote Bete', Bergamot: 'Bergamotte', Carrot: 'Karotte',
    Cashew: 'Cashew', Cedarwood: 'Zedernholz', Cherry: 'Kirsche', Chia: 'Chia',
    Chocolate: 'Schokolade', Cinnamon: 'Zimt', Clove: 'Nelke', Coconut: 'Kokosnuss',
    Coffee: 'Kaffee', Cypress: 'Zypresse', Daisy: 'Gänseblümchen', Eucalyptus: 'Eukalyptus',
    Fenugreek: 'Bockshornklee', Flax: 'Leinsamen', Frankincense: 'Weihrauch', Garlic: 'Knoblauch',
    Geranium: 'Geranie', Ginger: 'Ingwer', Grapes: 'Trauben', Hibiscus: 'Hibiskus',
    Jasmine: 'Jasmin', Lavender: 'Lavendel', Lemon: 'Zitrone', Lemongrass: 'Zitronengras',
    Lime: 'Limette', Lotus: 'Lotus', Mandarin: 'Mandarine', Mango: 'Mango',
    Marigold: 'Ringelblume', Mustard: 'Senf', Nutmeg: 'Muskatnuss', Olive: 'Olive',
    Onion: 'Zwiebel', Orange: 'Orange', Peanut: 'Erdnuss', Peanuts: 'Erdnüsse',
    Peppermint: 'Pfefferminze', Pineapple: 'Ananas', Pumpkin: 'Kürbis', Rose: 'Rose',
    Rosemary: 'Rosmarin', Saffron: 'Safran', Sandalwood: 'Sandelholz', Sesame: 'Sesam',
    Sorghum: 'Sorghum', Strawberry: 'Erdbeere', Sunflower: 'Sonnenblume', Tamarind: 'Tamarinde',
    Tomato: 'Tomate', Turmeric: 'Kurkuma', Vanilla: 'Vanille', 'Green Apple': 'Grüner Apfel',
    'Green Tea': 'Grüner Tee', 'Black Seed': 'Schwarzkümmel', 'Bitter Melon': 'Bittermelone',
    'Holy Basil': 'Heiliges Basilikum', 'Night Queen': 'Königin der Nacht',
  },
  fr: {
    Agarwood: 'Bois d’agar', Almond: 'Amande', Almonds: 'Amandes', Amaranth: 'Amarante',
    Basil: 'Basilic', Beetroot: 'Betterave', Bergamot: 'Bergamote', Carrot: 'Carotte',
    Cashew: 'Noix de cajou', Cedarwood: 'Bois de cèdre', Cherry: 'Cerise', Chia: 'Chia',
    Chocolate: 'Chocolat', Cinnamon: 'Cannelle', Clove: 'Clou de girofle', Coconut: 'Noix de coco',
    Coffee: 'Café', Cypress: 'Cyprès', Daisy: 'Marguerite', Eucalyptus: 'Eucalyptus',
    Fenugreek: 'Fenugrec', Flax: 'Lin', Frankincense: 'Encens', Garlic: 'Ail',
    Geranium: 'Géranium', Ginger: 'Gingembre', Grapes: 'Raisin', Hibiscus: 'Hibiscus',
    Jasmine: 'Jasmin', Lavender: 'Lavande', Lemon: 'Citron', Lemongrass: 'Citronnelle',
    Lime: 'Citron vert', Lotus: 'Lotus', Mandarin: 'Mandarine', Mango: 'Mangue',
    Marigold: 'Souci', Mustard: 'Moutarde', Nutmeg: 'Muscade', Olive: 'Olive',
    Onion: 'Oignon', Orange: 'Orange', Peanut: 'Arachide', Peanuts: 'Arachides',
    Peppermint: 'Menthe poivrée', Pineapple: 'Ananas', Pumpkin: 'Citrouille', Rose: 'Rose',
    Rosemary: 'Romarin', Saffron: 'Safran', Sandalwood: 'Bois de santal', Sesame: 'Sésame',
    Sorghum: 'Sorgho', Strawberry: 'Fraise', Sunflower: 'Tournesol', Tamarind: 'Tamarin',
    Tomato: 'Tomate', Turmeric: 'Curcuma', Vanilla: 'Vanille', 'Green Apple': 'Pomme verte',
    'Green Tea': 'Thé vert', 'Black Seed': 'Nigelle', 'Bitter Melon': 'Melon amer',
    'Holy Basil': 'Basilic sacré', 'Night Queen': 'Reine de la nuit',
  },
  es: {
    Agarwood: 'Madera de agar', Almond: 'Almendra', Almonds: 'Almendras', Amaranth: 'Amaranto',
    Basil: 'Albahaca', Beetroot: 'Remolacha', Bergamot: 'Bergamota', Carrot: 'Zanahoria',
    Cashew: 'Anacardo', Cedarwood: 'Madera de cedro', Cherry: 'Cereza', Chia: 'Chía',
    Chocolate: 'Chocolate', Cinnamon: 'Canela', Clove: 'Clavo', Coconut: 'Coco',
    Coffee: 'Café', Cypress: 'Ciprés', Daisy: 'Margarita', Eucalyptus: 'Eucalipto',
    Fenugreek: 'Fenogreco', Flax: 'Lino', Frankincense: 'Incienso', Garlic: 'Ajo',
    Geranium: 'Geranio', Ginger: 'Jengibre', Grapes: 'Uva', Hibiscus: 'Hibisco',
    Jasmine: 'Jazmín', Lavender: 'Lavanda', Lemon: 'Limón', Lemongrass: 'Hierba limón',
    Lime: 'Lima', Lotus: 'Loto', Mandarin: 'Mandarina', Mango: 'Mango',
    Marigold: 'Caléndula', Mustard: 'Mostaza', Nutmeg: 'Nuez moscada', Olive: 'Oliva',
    Onion: 'Cebolla', Orange: 'Naranja', Peanut: 'Cacahuete', Peanuts: 'Cacahuetes',
    Peppermint: 'Menta piperita', Pineapple: 'Piña', Pumpkin: 'Calabaza', Rose: 'Rosa',
    Rosemary: 'Romero', Saffron: 'Azafrán', Sandalwood: 'Sándalo', Sesame: 'Sésamo',
    Sorghum: 'Sorgo', Strawberry: 'Fresa', Sunflower: 'Girasol', Tamarind: 'Tamarindo',
    Tomato: 'Tomate', Turmeric: 'Cúrcuma', Vanilla: 'Vainilla', 'Green Apple': 'Manzana verde',
    'Green Tea': 'Té verde', 'Black Seed': 'Comino negro', 'Bitter Melon': 'Melón amargo',
    'Holy Basil': 'Albahaca sagrada', 'Night Queen': 'Reina de la noche',
  },
};

const SPECIAL_NAMES: Record<string, TranslationSet> = {
  'agarwood-oudh-aroma': { de: 'Adlerholz / Oudh Aromaöl', fr: 'Huile aromatique de bois d’agar / oudh', es: 'Aceite aromático de madera de agar / oud' },
  'blue-kamal-aroma': { de: 'Blauer Kamal Aromaöl', fr: 'Huile aromatique de kamal bleu', es: 'Aceite aromático de kamal azul' },
  'amla-fruit-powder': { de: 'Amla-Frucht & Pulver', fr: 'Fruit et poudre d’amla', es: 'Fruto y polvo de amla' },
  'arjuna-bark': { de: 'Arjuna-Rinde & Pulver', fr: 'Écorce et poudre d’arjuna', es: 'Corteza y polvo de arjuna' },
  'ashwagandha-root-powder': { de: 'Ashwagandha-Wurzel & Pulver', fr: 'Racine et poudre d’ashwagandha', es: 'Raíz y polvo de ashwagandha' },
  bacopa: { de: 'Bacopa / Brahmi', fr: 'Bacopa / Brahmi', es: 'Bacopa / Brahmi' },
  boswellia: { de: 'Boswellia / Salai Guggul', fr: 'Boswellia / Salai Guggul', es: 'Boswellia / Salai Guggul' },
  cissus: { de: 'Cissus / Veldt-Traube', fr: 'Cissus / Raisin du Veld', es: 'Cissus / Uva del Veld' },
  dikamali: { de: 'Dikamali-Gummi & Pulver', fr: 'Gomme et poudre de dikamali', es: 'Goma y polvo de dikamali' },
  'jamun-seed': { de: 'Jamun-Samen & Pulver', fr: 'Graines et poudre de jamun', es: 'Semillas y polvo de jamun' },
  'kalonji-oil': { de: 'Schwarzkümmelöl / Kalonjiöl', fr: 'Huile de nigelle / huile de kalonji', es: 'Aceite de comino negro / kalonji' },
  'karela-powder': { de: 'Bittermelone / Karela-Pulver', fr: 'Melon amer / poudre de karela', es: 'Melón amargo / polvo de karela' },
  'kaunch-seed': { de: 'Kaunch-Samen & Pulver', fr: 'Graines et poudre de kaunch', es: 'Semillas y polvo de kaunch' },
  'lodhra-bark': { de: 'Lodhra-Rinde & Pulver', fr: 'Écorce et poudre de lodhra', es: 'Corteza y polvo de lodhra' },
  'marigold-aroma': { de: 'Ringelblume / Genda Aromaöl', fr: 'Huile aromatique de souci / genda', es: 'Aceite aromático de caléndula / genda' },
  'mulethi-root': { de: 'Mulethi / Süßholzwurzel', fr: 'Mulethi / racine de réglisse', es: 'Mulethi / raíz de regaliz' },
  'multani-mitti': { de: 'Multani Mitti / Fullererde', fr: 'Multani Mitti / terre à foulon', es: 'Multani Mitti / tierra de batán' },
  'neem-leaf': { de: 'Neemblatt & Pulver', fr: 'Feuille et poudre de neem', es: 'Hoja y polvo de neem' },
  'orange-peel': { de: 'Orangenschale & Pulver', fr: 'Écorce et poudre d’orange', es: 'Cáscara y polvo de naranja' },
  'rajnigandha-aroma': { de: 'Rajnigandha / Tuberose Aromaöl', fr: 'Huile aromatique de rajnigandha / tubéreuse', es: 'Aceite aromático de rajnigandha / nardo' },
  'rose-absolute': { de: 'Rosen-Absolue', fr: 'Absolue de rose', es: 'Absoluto de rosa' },
  'safed-musli-root': { de: 'Safed-Musli-Wurzel & Pulver', fr: 'Racine et poudre de safed musli', es: 'Raíz y polvo de safed musli' },
  'shatavari-root': { de: 'Shatavari-Wurzel & Pulver', fr: 'Racine et poudre de shatavari', es: 'Raíz y polvo de shatavari' },
  tribulus: { de: 'Tribulus / Gokhru', fr: 'Tribulus / Gokhru', es: 'Tribulus / Gokhru' },
  turmeric: { de: 'Kurkuma / Haldi', fr: 'Curcuma / Haldi', es: 'Cúrcuma / Haldi' },
  'flax-seeds': { de: 'Leinsamen', fr: 'Graines de lin', es: 'Semillas de lino' },
  'peanuts-groundnuts': { de: 'Erdnüsse', fr: 'Arachides', es: 'Cacahuetes' },
  'psyllium-seed-husk': { de: 'Flohsamen & Flohsamenschalen', fr: 'Graines et téguments de psyllium', es: 'Semillas y cáscaras de psyllium' },
  'fox-nuts-makhana': { de: 'Lotussamen / Makhana', fr: 'Graines de lotus / makhana', es: 'Semillas de loto / makhana' },
  jaggery: { de: 'Jaggery / unraffinierter Rohrzucker', fr: 'Jaggery / sucre de canne non raffiné', es: 'Jaggery / azúcar de caña sin refinar' },
  'coconut-kernel-products': { de: 'Kokosnusskernprodukte', fr: 'Produits d’amande de coco', es: 'Productos de pulpa de coco' },
  'guar-gum': { de: 'Guarkernmehl', fr: 'Gomme de guar', es: 'Goma guar' },
  'pearl-millet-bajra': { de: 'Perlhirse / Bajra', fr: 'Mil perlé / bajra', es: 'Mijo perla / bajra' },
  'finger-millet-ragi': { de: 'Fingerhirse / Ragi', fr: 'Éleusine / ragi', es: 'Mijo africano / ragi' },
  'sorghum-jowar': { de: 'Sorghum / Jowar', fr: 'Sorgho / jowar', es: 'Sorgo / jowar' },
  'dried-jackfruit': { de: 'Getrocknete Jackfrucht & Jackfruchtchips', fr: 'Jacquier séché et chips de jacquier', es: 'Yaca deshidratada y chips de yaca' },
  'green-jackfruit-flour': { de: 'Grünes Jackfruchtmehl', fr: 'Farine de jeune jacquier', es: 'Harina de yaca verde' },
  'mango-powder-amchur': { de: 'Mangopulver / Amchur', fr: 'Poudre de mangue / amchur', es: 'Mango en polvo / amchur' },
  'green-banana-flour': { de: 'Grünes Bananenmehl', fr: 'Farine de banane verte', es: 'Harina de plátano verde' },
  'tamarind-pulp-powder': { de: 'Tamarindenmark & Pulver', fr: 'Pulpe et poudre de tamarin', es: 'Pulpa y polvo de tamarindo' },
  'tomato-powder-flakes': { de: 'Tomatenpulver, -flocken & -granulat', fr: 'Poudre, flocons et granulés de tomate', es: 'Tomate en polvo, copos y gránulos' },
  'beetroot-powder': { de: 'Rote-Bete-Pulver & getrocknete Rote Bete', fr: 'Poudre et betterave séchée', es: 'Remolacha en polvo y deshidratada' },
  'carrot-flakes-powder': { de: 'Karottenflocken, -granulat & -pulver', fr: 'Flocons, granulés et poudre de carotte', es: 'Copos, gránulos y polvo de zanahoria' },
  'moringa-leaf-powder': { de: 'Moringa-Blattpulver', fr: 'Poudre de feuilles de moringa', es: 'Polvo de hoja de moringa' },
  'coconut-milk-powder': { de: 'Kokosmilchpulver', fr: 'Poudre de lait de coco', es: 'Leche de coco en polvo' },
  'virgin-coconut-oil': { de: 'Natives Kokosöl', fr: 'Huile de coco vierge', es: 'Aceite de coco virgen' },
  'peanut-oil': { de: 'Erdnussöl', fr: 'Huile d’arachide', es: 'Aceite de cacahuete' },
  'sweet-almond-oil': { de: 'Süßmandelöl', fr: 'Huile d’amande douce', es: 'Aceite de almendra dulce' },
  'flaxseed-oil': { de: 'Leinöl', fr: 'Huile de lin', es: 'Aceite de lino' },
};

const translateBase = (base: string, language: Exclude<BuyerLanguage, 'en'>) => {
  const translated = WORDS[language][base.trim()];
  return translated ?? base.trim();
};

const PATTERNS: Array<{
  expression: RegExp;
  render: (base: string, language: Exclude<BuyerLanguage, 'en'>) => string;
}> = [
  {
    expression: /^(.+) Aroma Oil$/,
    render: (base, language) => ({
      de: `${translateBase(base, language)} Aromaöl`,
      fr: `Huile aromatique de ${translateBase(base, language).toLowerCase()}`,
      es: `Aceite aromático de ${translateBase(base, language).toLowerCase()}`,
    })[language],
  },
  {
    expression: /^(.+) Essential Oil$/,
    render: (base, language) => ({
      de: `${translateBase(base, language)} ätherisches Öl`,
      fr: `Huile essentielle de ${translateBase(base, language).toLowerCase()}`,
      es: `Aceite esencial de ${translateBase(base, language).toLowerCase()}`,
    })[language],
  },
  {
    expression: /^(.+) Seed Oil$/,
    render: (base, language) => ({
      de: `${translateBase(base, language)}samenöl`,
      fr: `Huile de graines de ${translateBase(base, language).toLowerCase()}`,
      es: `Aceite de semilla de ${translateBase(base, language).toLowerCase()}`,
    })[language],
  },
  {
    expression: /^(.+) Oil$/,
    render: (base, language) => ({
      de: `${translateBase(base, language)}öl`,
      fr: `Huile de ${translateBase(base, language).toLowerCase()}`,
      es: `Aceite de ${translateBase(base, language).toLowerCase()}`,
    })[language],
  },
  {
    expression: /^(.+) Seeds$/,
    render: (base, language) => ({
      de: `${translateBase(base, language)}samen`,
      fr: `Graines de ${translateBase(base, language).toLowerCase()}`,
      es: `Semillas de ${translateBase(base, language).toLowerCase()}`,
    })[language],
  },
  {
    expression: /^Dehydrated (.+)$/,
    render: (base, language) => ({
      de: `Getrockneter ${translateBase(base, language)}`,
      fr: `${translateBase(base, language)} déshydraté`,
      es: `${translateBase(base, language)} deshidratado`,
    })[language],
  },
  {
    expression: /^(.+) Water$/,
    render: (base, language) => ({
      de: `${translateBase(base, language)}wasser`,
      fr: `Eau de ${translateBase(base, language).toLowerCase()}`,
      es: `Agua de ${translateBase(base, language).toLowerCase()}`,
    })[language],
  },
];

export const getLocalizedProductName = (
  productId: string,
  englishName: string,
  language: BuyerLanguage,
) => {
  if (language === 'en') return englishName;
  const specialName = SPECIAL_NAMES[productId]?.[language];
  if (specialName) return specialName;

  for (const pattern of PATTERNS) {
    const match = englishName.match(pattern.expression);
    if (match) return pattern.render(match[1], language);
  }

  return WORDS[language][englishName] ?? englishName;
};

export const PRODUCT_LANGUAGE_LABELS: Record<BuyerLanguage, {
  buyerLanguage: string;
  englishTradeName: string;
  hsReview: string;
  hsNotice: string;
}> = {
  en: {
    buyerLanguage: 'Buyer language',
    englishTradeName: 'English trade name',
    hsReview: 'HS/HSN review',
    hsNotice: 'Final 6/8-digit classification is confirmed against the exact product form and destination.',
  },
  de: {
    buyerLanguage: 'Käufersprache',
    englishTradeName: 'Englische Handelsbezeichnung',
    hsReview: 'HS/HSN-Prüfung',
    hsNotice: 'Die endgültige 6-/8-stellige Einreihung wird nach Produktform und Zielland bestätigt.',
  },
  fr: {
    buyerLanguage: 'Langue de l’acheteur',
    englishTradeName: 'Nom commercial anglais',
    hsReview: 'Vérification HS/HSN',
    hsNotice: 'Le classement final à 6/8 chiffres est confirmé selon la forme exacte et la destination.',
  },
  es: {
    buyerLanguage: 'Idioma del comprador',
    englishTradeName: 'Nombre comercial en inglés',
    hsReview: 'Revisión HS/HSN',
    hsNotice: 'La clasificación final de 6/8 dígitos se confirma según la forma exacta y el destino.',
  },
};

export const getHsFamilyReference = (group: CatalogueGroup) => {
  switch (group) {
    case 'essential-oils':
      return 'HS family 3301';
    case 'aroma-oils':
      return 'HS family 3302';
    case 'botanicals':
      return 'HS family 1211 / 1302';
    case 'carrier-oils':
      return 'HS family 1515 / 3301';
    case 'cold-pressed-oils':
      return 'HS Chapter 15';
    default:
      return 'Product-form specific';
  }
};
