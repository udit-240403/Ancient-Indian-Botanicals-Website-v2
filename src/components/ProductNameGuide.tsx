import React from 'react';
import { BookOpenCheck, CheckCircle2, Microscope, PackageSearch } from 'lucide-react';
import { BuyerLanguage, useBuyerLanguage } from '../context/BuyerLanguageContext';

type GuideCard = { title: string; copy: string };
type GuideFaq = { question: string; answer: string };
type GuideCopy = {
  eyebrow?: string;
  title: string;
  intro: string;
  distinction: string;
  cards?: GuideCard[];
  forms?: string;
  specification?: string;
  faqHeading?: string;
  faq: GuideFaq[];
};

export type ProductSearchGuide = {
  productId: string;
  names: string[];
  urlAliases: string[];
  seoTitle?: string;
  metaDescription?: string;
  copy: Record<BuyerLanguage, GuideCopy>;
};

const LABELS: Record<BuyerLanguage, { eyebrow: string; identity: string; forms: string; specification: string; faq: string; identityCopy: (botanical: string) => string }> = {
  en: { eyebrow: 'Name and identity guide', identity: 'Botanical identity', forms: 'Separate commercial routes', specification: 'Specification checkpoint', faq: 'Common buyer questions about the name', identityCopy: (botanical) => `${botanical} — confirmed together with plant part and physical form.` },
  de: { eyebrow: 'Leitfaden zu Name und Identität', identity: 'Botanische Identität', forms: 'Getrennte Handelsformen', specification: 'Spezifikationsprüfung', faq: 'Häufige Käuferfragen zum Namen', identityCopy: (botanical) => `${botanical} — zusammen mit Pflanzenteil und physischer Form zu bestätigen.` },
  fr: { eyebrow: 'Guide du nom et de l’identité', identity: 'Identité botanique', forms: 'Voies commerciales distinctes', specification: 'Point de spécification', faq: 'Questions fréquentes des acheteurs sur le nom', identityCopy: (botanical) => `${botanical} — à confirmer avec la partie végétale et la forme physique.` },
  es: { eyebrow: 'Guía de nombre e identidad', identity: 'Identidad botánica', forms: 'Rutas comerciales separadas', specification: 'Control de especificación', faq: 'Preguntas frecuentes de compradores sobre el nombre', identityCopy: (botanical) => `${botanical} — confirmada junto con la parte vegetal y la forma física.` },
};

const CARD_ICONS = [BookOpenCheck, PackageSearch, Microscope];

interface ProductNameGuideProps {
  guide: ProductSearchGuide;
  botanicalName: string;
}

export const ProductNameGuide: React.FC<ProductNameGuideProps> = ({ guide, botanicalName }) => {
  const { language } = useBuyerLanguage();
  const copy = guide.copy[language];
  const labels = LABELS[language];
  const cards = copy.cards ?? [
    { title: labels.identity, copy: labels.identityCopy(botanicalName) },
    { title: labels.forms, copy: copy.forms ?? '' },
    { title: labels.specification, copy: copy.specification ?? '' },
  ];

  return (
    <section className="border-y border-[#b56e3a]/25 bg-[#f5f0e6] px-4 py-14 md:px-8 lg:py-18">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">{copy.eyebrow ?? labels.eyebrow}</span>
            <h2 className="mt-3 max-w-4xl font-serif text-3xl font-semibold leading-tight text-[#173f34] sm:text-4xl lg:text-5xl">{copy.title}</h2>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-[#52635d]">{copy.intro}</p>
            <p className="mt-4 border-l-2 border-[#b88a2c] pl-4 text-xs leading-relaxed text-[#52635d]">{copy.distinction}</p>
          </div>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = CARD_ICONS[index];
            return <article key={card.title} className="border border-[#b56e3a]/28 bg-[#fbf8f1] p-6"><Icon className="h-5 w-5 text-[#9b6334]" /><h3 className="mt-4 font-serif text-2xl font-semibold text-[#173f34]">{card.title}</h3><p className="mt-2 text-xs leading-relaxed text-[#52635d]">{card.copy}</p></article>;
          })}
        </div>

        <div className="mt-10">
          <h2 className="font-serif text-3xl font-semibold text-[#173f34]">{copy.faqHeading ?? labels.faq}</h2>
          <div className={`mt-5 grid gap-4 ${copy.faq.length === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}`}>
            {copy.faq.map((item) => <article key={item.question} className="border-t border-[#b56e3a]/35 pt-5"><div className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#9b6334]" /><div><h3 className="font-serif text-xl font-semibold text-[#173f34]">{item.question}</h3><p className="mt-2 text-xs leading-relaxed text-[#52635d]">{item.answer}</p></div></div></article>)}
          </div>
        </div>
      </div>
    </section>
  );
};
