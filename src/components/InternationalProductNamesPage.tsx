import React from 'react';
import { ArrowRight, BookOpenCheck, Globe2, SearchCheck } from 'lucide-react';
import internationalNames from '../data/international-product-names.json';
import { CATALOGUE_PRODUCTS } from '../data/catalogue';
import { getLocalizedProductName } from '../data/productLanguage';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';
import { ProductVisual } from './ProductVisual';

const COPY = {
  en: {
    eyebrow: 'International name directory',
    title: 'One botanical identity, understood across markets.',
    intro: 'Buyers often search with an international common name while Indian suppliers use a regional or trade name. This directory connects both terms to one verified botanical identity and one canonical product page.',
    international: 'International buyer term', indian: 'Indian trade name', botanical: 'Botanical identity', urls: 'Buyer-friendly URLs', open: 'Open product route',
    principle: 'How the naming system works', principleCopy: 'Each alias URL permanently redirects to the main product page. This helps buyers find the correct route without creating duplicate pages or splitting search authority.',
    search: 'Search works across every name', searchCopy: 'The catalogue recognises the international name, Indian trade name and botanical Latin wherever these are available.',
    notice: 'English is the controlling commercial version. Product identity, form, grade, specification and offered lot are reconfirmed in writing before quotation.',
  },
  de: {
    eyebrow: 'Verzeichnis internationaler Namen', title: 'Eine botanische Identität, marktübergreifend verständlich.', intro: 'Käufer suchen häufig nach einem internationalen Trivialnamen, während indische Lieferanten einen regionalen oder Handelsnamen verwenden. Dieses Verzeichnis verbindet beide Begriffe mit einer botanischen Identität und einer kanonischen Produktseite.',
    international: 'Internationaler Käuferbegriff', indian: 'Indischer Handelsname', botanical: 'Botanische Identität', urls: 'Käuferfreundliche URLs', open: 'Produktseite öffnen',
    principle: 'So funktioniert das Namenssystem', principleCopy: 'Jede Alias-URL leitet dauerhaft auf die zentrale Produktseite weiter. So finden Käufer die richtige Seite, ohne doppelte Inhalte oder geteilte Suchsignale.',
    search: 'Suche über alle Namen', searchCopy: 'Der Katalog erkennt den internationalen Namen, den indischen Handelsnamen und die botanische lateinische Bezeichnung, soweit verfügbar.',
    notice: 'Die englische Fassung ist für geschäftliche Zwecke maßgeblich. Identität, Form, Qualität, Spezifikation und angebotene Charge werden vor dem Angebot schriftlich bestätigt.',
  },
  fr: {
    eyebrow: 'Répertoire des noms internationaux', title: 'Une identité botanique, comprise sur plusieurs marchés.', intro: 'Les acheteurs recherchent souvent un nom commun international, tandis que les fournisseurs indiens utilisent un nom régional ou commercial. Ce répertoire relie les deux à une identité botanique et à une page produit canonique.',
    international: 'Terme utilisé par les acheteurs', indian: 'Nom commercial indien', botanical: 'Identité botanique', urls: 'URL adaptées aux acheteurs', open: 'Ouvrir la fiche produit',
    principle: 'Fonctionnement du système de noms', principleCopy: 'Chaque URL alternative redirige définitivement vers la page produit principale. Les acheteurs trouvent ainsi la bonne fiche sans contenu dupliqué ni dilution du référencement.',
    search: 'Recherche avec tous les noms', searchCopy: 'Le catalogue reconnaît le nom international, le nom commercial indien et le nom botanique latin lorsqu’ils sont disponibles.',
    notice: 'La version anglaise fait foi pour les échanges commerciaux. L’identité, la forme, la qualité, les spécifications et le lot proposé sont reconfirmés par écrit avant devis.',
  },
  es: {
    eyebrow: 'Directorio de nombres internacionales', title: 'Una identidad botánica, entendida en distintos mercados.', intro: 'Los compradores suelen buscar un nombre común internacional, mientras que los proveedores indios utilizan un nombre regional o comercial. Este directorio conecta ambos términos con una identidad botánica y una página de producto canónica.',
    international: 'Término internacional del comprador', indian: 'Nombre comercial indio', botanical: 'Identidad botánica', urls: 'URL pensadas para compradores', open: 'Abrir ficha del producto',
    principle: 'Cómo funciona el sistema de nombres', principleCopy: 'Cada URL alternativa redirige permanentemente a la página principal del producto. Así los compradores encuentran la ruta correcta sin contenido duplicado ni señales SEO divididas.',
    search: 'Búsqueda con todos los nombres', searchCopy: 'El catálogo reconoce el nombre internacional, el nombre comercial indio y el nombre botánico en latín cuando están disponibles.',
    notice: 'La versión inglesa rige a efectos comerciales. La identidad, forma, calidad, especificación y lote ofrecido se reconfirman por escrito antes de la cotización.',
  },
} as const;

export const InternationalProductNamesPage: React.FC = () => {
  const { language } = useBuyerLanguage();
  const copy = COPY[language];
  const entries = internationalNames.flatMap((entry) => {
    const product = CATALOGUE_PRODUCTS.find((item) => item.id === entry.productId);
    return product ? [{ entry, product }] : [];
  });

  return (
    <div className="w-full bg-[#f3eddf] text-[#062b23]">
      <section className="relative overflow-hidden border-b border-[#b88a2c]/35 bg-[#062b23] px-4 py-16 text-[#fbf7ed] md:px-8 lg:py-20">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url('/assets/svg/botanical-pattern.svg')" }} />
        <div className="relative mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
          <div><span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">{copy.eyebrow}</span><h1 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl">{copy.title}</h1></div>
          <p className="text-sm leading-relaxed text-[#f2ead9]/80">{copy.intro}</p>
        </div>
      </section>

      <section className="border-b border-[#b88a2c]/25 px-4 py-10 md:px-8">
        <div className="mx-auto grid max-w-[1440px] gap-4 md:grid-cols-2">
          <article className="border border-[#b88a2c]/30 bg-[#fbf8f1] p-6"><BookOpenCheck className="h-5 w-5 text-[#9b6334]" /><h2 className="mt-4 font-serif text-2xl font-semibold">{copy.principle}</h2><p className="mt-2 text-xs leading-relaxed text-[#52635d]">{copy.principleCopy}</p></article>
          <article className="border border-[#b88a2c]/30 bg-[#fbf8f1] p-6"><SearchCheck className="h-5 w-5 text-[#9b6334]" /><h2 className="mt-4 font-serif text-2xl font-semibold">{copy.search}</h2><p className="mt-2 text-xs leading-relaxed text-[#52635d]">{copy.searchCopy}</p></article>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 lg:py-18">
        <div className="mx-auto grid max-w-[1440px] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {entries.map(({ entry, product }) => (
            <article key={product.id} className="group overflow-hidden border border-[#b56e3a]/30 bg-[#fbf8f1] shadow-[0_20px_55px_-45px_rgba(4,30,24,.75)] transition-transform hover:-translate-y-1">
              <div className="aspect-[16/9] overflow-hidden border-b border-[#b56e3a]/20 bg-[#e9e0cf]"><ProductVisual src={product.image} alt={product.name} className="h-full w-full" imageClassName="transition-transform duration-700 group-hover:scale-[1.035]" /></div>
              <div className="p-6">
                <span className="text-[9px] font-bold uppercase tracking-eyebrow text-[#9b6334]">{copy.international}</span>
                <h2 className="mt-2 font-serif text-2xl font-semibold leading-tight text-[#173f34]">{language === 'en' ? entry.internationalName : getLocalizedProductName(product.id, product.name, language)}</h2>
                {language !== 'en' && <p className="mt-2 text-[11px] leading-relaxed text-[#66706b]">English: {entry.internationalName}</p>}
                <dl className="mt-5 space-y-3 border-t border-[#b56e3a]/20 pt-4 text-xs">
                  <div><dt className="font-bold uppercase tracking-[.12em] text-[#9b6334]">{copy.indian}</dt><dd className="mt-1 text-[#315148]">{entry.indianTradeName}</dd></div>
                  <div><dt className="font-bold uppercase tracking-[.12em] text-[#9b6334]">{copy.botanical}</dt><dd className="mt-1 font-serif italic text-[#315148]">{product.botanicalName}</dd></div>
                  <div><dt className="font-bold uppercase tracking-[.12em] text-[#9b6334]">{copy.urls}</dt><dd className="mt-2 flex flex-wrap gap-2">{entry.aliases.map((alias) => <a key={alias} href={`/products/${alias}`} className="border border-[#b88a2c]/30 bg-[#f4efe5] px-2.5 py-1 font-mono text-[9px] text-[#52635d] hover:border-[#9b6334] hover:text-[#173f34]">/products/{alias}</a>)}</dd></div>
                </dl>
                <a href={`/products/${product.id}`} className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-eyebrow text-[#765411] hover:text-[#173f34]">{copy.open} <ArrowRight className="h-3.5 w-3.5" /></a>
              </div>
            </article>
          ))}
        </div>
        <div className="mx-auto mt-8 flex max-w-[1440px] items-start gap-3 border border-[#b88a2c]/30 bg-[#062b23] p-5 text-[#fbf7ed]"><Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-[#d4a43d]" /><p className="text-xs leading-relaxed text-[#f2ead9]/78">{copy.notice}</p></div>
      </section>
    </div>
  );
};
