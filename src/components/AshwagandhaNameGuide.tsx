import React from 'react';
import { BookOpenCheck, CheckCircle2, Microscope, PackageSearch } from 'lucide-react';
import ashwagandhaGuide from '../data/ashwagandha-search-guide.json';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

const CARD_ICONS = [BookOpenCheck, PackageSearch, Microscope];

export const AshwagandhaNameGuide: React.FC = () => {
  const { language } = useBuyerLanguage();
  const copy = ashwagandhaGuide.copy[language];

  return (
    <section className="border-y border-[#b56e3a]/25 bg-[#f5f0e6] px-4 py-14 md:px-8 lg:py-18">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">{copy.eyebrow}</span>
            <h2 className="mt-3 max-w-4xl font-serif text-3xl font-semibold leading-tight text-[#173f34] sm:text-4xl lg:text-5xl">{copy.title}</h2>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-[#52635d]">{copy.intro}</p>
            <p className="mt-4 border-l-2 border-[#b88a2c] pl-4 text-xs leading-relaxed text-[#52635d]">{copy.distinction}</p>
          </div>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {copy.cards.map((card, index) => {
            const Icon = CARD_ICONS[index];
            return <article key={card.title} className="border border-[#b56e3a]/28 bg-[#fbf8f1] p-6"><Icon className="h-5 w-5 text-[#9b6334]" /><h3 className="mt-4 font-serif text-2xl font-semibold text-[#173f34]">{card.title}</h3><p className="mt-2 text-xs leading-relaxed text-[#52635d]">{card.copy}</p></article>;
          })}
        </div>

        <div className="mt-10">
          <h2 className="font-serif text-3xl font-semibold text-[#173f34]">{copy.faqHeading}</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {copy.faq.map((item) => <article key={item.question} className="border-t border-[#b56e3a]/35 pt-5"><div className="flex items-start gap-3"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#9b6334]" /><div><h3 className="font-serif text-xl font-semibold text-[#173f34]">{item.question}</h3><p className="mt-2 text-xs leading-relaxed text-[#52635d]">{item.answer}</p></div></div></article>)}
          </div>
        </div>
      </div>
    </section>
  );
};
