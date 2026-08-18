import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

interface CultivationStoriesProps {
  onBrowseBotanicals: () => void;
}

const stories = [
  {
    name: 'Ashwagandha roots',
    botanical: 'Withania somnifera',
    region: 'Mandsaur & Central India',
    image: '/assets/images/cultivation-ashwagandha.webp',
    description: 'A dryland root crop traded as whole or cut root, powder and extract routes. Identity, root character, particle size and any requested marker range shape the commercial brief.',
    applications: ['Nutraceuticals', 'Botanical extracts', 'Herbal formulations'],
    value: 'Recognised botanical identity with selectable root and extract formats.',
  },
  {
    name: 'Lemongrass',
    botanical: 'Cymbopogon flexuosus',
    region: 'South Indian growing belts',
    image: '/assets/images/cultivation-lemongrass.webp',
    description: 'A cultivated aromatic grass whose cut biomass moves quickly toward distillation. Buyers typically define the required olfactory direction, citral profile, application and pack size.',
    applications: ['Fragrance', 'Personal care', 'Home care'],
    value: 'A fresh, citral-led aromatic profile used across functional fragrance systems.',
  },
  {
    name: 'Tulsi',
    botanical: 'Ocimum tenuiflorum',
    region: 'Central & North India',
    image: '/assets/images/cultivation-tulsi.webp',
    description: 'Leaf and flowering tops support several commercial forms, including dried herb, powder, extract and essential oil. Species, plant part and intended application should be explicit.',
    applications: ['Botanical products', 'Personal care', 'Aromatic formulations'],
    value: 'Multiple ingredient routes from a well-known Indian aromatic botanical.',
  },
  {
    name: 'Damask rose',
    botanical: 'Rosa damascena',
    region: 'Kannauj aromatic belt',
    image: '/assets/images/cultivation-rose.webp',
    description: 'Delicate flowers are gathered early and directed into distinct processing routes. Rose absolute, hydrosol and aroma grades are presented separately so buyers can specify correctly.',
    applications: ['Fine fragrance', 'Personal care', 'Floral waters'],
    value: 'A premium floral identity available through clearly differentiated formats.',
  },
];

export const CultivationStories: React.FC<CultivationStoriesProps> = ({ onBrowseBotanicals }) => (
  <section className="relative overflow-hidden bg-[#f3eddf] px-4 py-16 text-[#062b23] md:px-8 lg:py-24">
    <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url('/assets/svg/botanical-pattern.svg')" }} />
    <div className="relative mx-auto max-w-[1440px]">
      <div className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b711e]">Cultivation to commercial form</span>
          <h2 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-[1.06] sm:text-5xl">Know the crop. Specify the ingredient.</h2>
        </div>
        <div className="lg:pb-1">
          <p className="text-sm leading-relaxed text-[#315148]">The field is the beginning, not the specification. These crop stories show how Indian origin, plant part, processing route and end use come together in a buyer-ready brief.</p>
          <button onClick={onBrowseBotanicals} className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-eyebrow text-[#765411] transition-colors hover:text-[#062b23]">Explore the complete range <ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {stories.map((story, index) => (
          <article key={story.name} className="group overflow-hidden border border-[#a97825]/35 bg-[#fbf7ed] shadow-[0_18px_55px_-42px_rgba(4,30,24,.8)]">
            <div className="image-shell relative h-64 overflow-hidden sm:h-72">
              <img src={story.image} alt={`${story.name} cultivation and harvest in ${story.region}`} width="1536" height="1024" loading="lazy" onError={(event) => { event.currentTarget.hidden = true; }} className="relative z-[1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041e18]/78 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-[#fbf7ed] sm:p-6">
                <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-eyebrow text-[#e1bd67]"><MapPin className="h-3.5 w-3.5" />{story.region}</div>
                <h3 className="mt-1 font-serif text-3xl font-semibold">{story.name}</h3>
                <p className="mt-0.5 text-xs italic text-[#f2ead9]/78">{story.botanical}</p>
              </div>
              <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#e1bd67]/60 bg-[#041e18]/75 font-serif text-xs text-[#e1bd67]">0{index + 1}</span>
            </div>
            <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.15fr_.85fr]">
              <div>
                <p className="text-sm leading-relaxed text-[#28483e]">{story.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {story.applications.map((application) => <span key={application} className="border border-[#b88a2c]/35 bg-[#efe3c8]/65 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#60460f]">{application}</span>)}
                </div>
              </div>
              <div className="border-t border-[#b88a2c]/25 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
                <span className="text-[9px] font-bold uppercase tracking-eyebrow text-[#9b711e]">Commercial value</span>
                <p className="mt-2 font-serif text-lg leading-snug text-[#062b23]">{story.value}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-7 text-center text-[11px] leading-relaxed text-[#526d64]">Cultivation images are editorial representations of Indian growing and processing contexts. Actual origin, harvest, form and analytical profile are confirmed for the offered lot.</p>
    </div>
  </section>
);
