import React from 'react';
import {
  ArrowRight,
  Droplets,
  FlaskConical,
  Layers3,
  Package,
  ShieldCheck,
  Tags,
  Truck,
} from 'lucide-react';

interface PackagingFormatGuideProps {
  openQuoteModal: (productName?: string) => void;
}

const PACKAGING_FALLBACK = '/assets/images/packaging-export-system.webp';

const packagingFormats = [
  {
    icon: FlaskConical,
    category: 'Evaluation',
    title: 'Sample vials & bottles',
    bestFor: 'Laboratory evaluation, fragrance trials and retained samples.',
    benefits: ['Low-volume buyer assessment', 'Amber options help limit light exposure', 'Tamper-evident closure options'],
    review: 'Fill size, closure compatibility and courier restrictions.',
    position: '7% 64%',
  },
  {
    icon: Droplets,
    category: 'High-value liquids',
    title: 'Amber glass bottles',
    bestFor: 'Essential oils, absolutes and smaller commercial quantities.',
    benefits: ['Strong light barrier', 'Suitable for many oil profiles after review', 'Easy visual inspection and sampling'],
    review: 'Breakage risk, cushioning, cap liner and seal integrity.',
    position: '17% 68%',
  },
  {
    icon: ShieldCheck,
    category: 'Protected liquids',
    title: 'Aluminium bottles & cans',
    bestFor: 'Natural oils and aroma grades requiring an opaque, lightweight pack.',
    benefits: ['Complete light barrier', 'Lower weight than glass', 'Reclosable formats for routine handling'],
    review: 'Internal lining, gasket and product compatibility.',
    position: '34% 52%',
  },
  {
    icon: Package,
    category: 'Mid-volume liquids',
    title: 'Compatible HDPE jerrycans',
    bestFor: 'Selected liquid ingredients and practical production handling.',
    benefits: ['Lower handling weight', 'Stackable commercial formats', 'Convenient controlled dispensing'],
    review: 'Permeation, interaction, closure and transport classification.',
    position: '76% 46%',
  },
  {
    icon: Truck,
    category: 'Bulk liquids',
    title: 'Lined metal or HDPE drums',
    bestFor: 'Commercial oil and liquid-extract lots suited to drum supply.',
    benefits: ['Durable bulk protection', 'Efficient palletisation', 'Tamper-evident sealing options'],
    review: 'Lining, headspace, closure, net fill and UN rating where applicable.',
    position: '86% 39%',
  },
  {
    icon: Layers3,
    category: 'Dry powders',
    title: 'High-barrier pouches',
    bestFor: 'Powders, extracts, trial lots and moisture-sensitive dry materials.',
    benefits: ['Moisture, oxygen and light barrier options', 'Lower shipment weight', 'Resealable formats where suitable'],
    review: 'Food-contact layer, seal strength, fill weight and labelling.',
    position: '55% 70%',
  },
  {
    icon: Package,
    category: 'Roots, herbs & powders',
    title: 'Lined bags & fibre drums',
    bestFor: 'Whole, cut and powdered botanicals requiring protected bulk handling.',
    benefits: ['Inner liners support moisture control', 'Fibre drums add rigid protection', 'Practical storage and pallet handling'],
    review: 'Particle form, liner gauge, odour transfer and pallet plan.',
    position: '64% 36%',
  },
  {
    icon: Tags,
    category: 'Buyer presentation',
    title: 'Private-label & heritage kits',
    bestFor: 'Approved launches, buyer sample programmes and premium secondary presentation.',
    benefits: ['Coordinated bottle, closure, label and carton', 'Indian pattern or embossing can add distinction', 'Reusable document/sample cases can improve review'],
    review: 'MOQ, artwork approval, claims, destination rules and production feasibility.',
    position: '94% 68%',
  },
];

const handleImageError: React.ReactEventHandler<HTMLImageElement> = (event) => {
  if (event.currentTarget.dataset.fallback === 'true') return;
  event.currentTarget.dataset.fallback = 'true';
  event.currentTarget.src = PACKAGING_FALLBACK;
};

export const PackagingFormatGuide: React.FC<PackagingFormatGuideProps> = ({ openQuoteModal }) => (
  <section className="space-y-8" aria-labelledby="packaging-format-guide-title">
    <div className="grid gap-6 border-b border-[#b88a2c]/35 pb-7 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b711e]">B2B packaging guide</span>
        <h2 id="packaging-format-guide-title" className="mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
          Choose by product, volume and route—not appearance alone.
        </h2>
      </div>
      <p className="text-sm leading-relaxed text-[#315148]">
        These formats show practical starting points for buyer discussion. The advantages below are typical, while final suitability is confirmed against the actual material, quantity, destination, shipping mode and applicable regulations.
      </p>
    </div>

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {packagingFormats.map(({ icon: Icon, category, title, bestFor, benefits, review, position }) => (
        <article key={title} className="group flex h-full flex-col overflow-hidden border border-[#a97825]/35 bg-[#fbf7ed] shadow-[0_18px_48px_-38px_rgba(4,30,24,.75)] transition-all duration-300 hover:-translate-y-1 hover:border-[#a97825]">
          <div className="image-shell relative h-44 overflow-hidden bg-[#e8dfcc]">
            <img
              src="/assets/images/packaging-heritage-modern-system.webp"
              alt={`${title} shown within an editorial export-packaging system`}
              width="1672"
              height="941"
              loading="lazy"
              decoding="async"
              onError={handleImageError}
              className="h-full w-full scale-[1.42] object-cover transition-transform duration-700 group-hover:scale-[1.49]"
              style={{ objectPosition: position }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041e18]/70 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2 border border-[#d4a43d]/45 bg-[#041e18]/88 px-3 py-1.5 text-[#f7edda] backdrop-blur-sm">
              <Icon className="h-3.5 w-3.5 text-[#d4a43d]" />
              <span className="text-[8px] font-bold uppercase tracking-eyebrow">{category}</span>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <h3 className="font-serif text-2xl font-semibold leading-tight text-[#173f34]">{title}</h3>
            <p className="mt-3 text-xs leading-relaxed text-[#52635d]"><strong className="font-semibold text-[#29483e]">Best for:</strong> {bestFor}</p>
            <div className="mt-5 border-t border-[#b88a2c]/25 pt-4">
              <p className="text-[9px] font-bold uppercase tracking-eyebrow text-[#9b711e]">Typical advantages</p>
              <ul className="mt-3 space-y-2">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2 text-xs leading-relaxed text-[#315148]">
                    <span className="mt-[.42rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#b88a2c]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-5 border-l-2 border-[#b88a2c] bg-[#efe5d2]/70 px-3 py-2.5 text-[10px] leading-relaxed text-[#52635d]"><strong className="font-bold uppercase tracking-[.08em] text-[#765411]">Confirm:</strong> {review}</p>
            <button
              type="button"
              onClick={() => openQuoteModal(`Packaging: ${title}`)}
              className="mt-5 inline-flex items-center gap-2 self-start text-[9px] font-bold uppercase tracking-eyebrow text-[#765411] transition-colors hover:text-[#173f34]"
            >
              Enquire about this format <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </article>
      ))}
    </div>

    <div className="grid gap-px overflow-hidden border border-[#b88a2c]/35 bg-[#b88a2c]/30 lg:grid-cols-4">
      {[
        ['1 · Material', 'Oil, extract, powder, whole herb or cut botanical'],
        ['2 · Quantity', 'Evaluation size, pilot lot or commercial bulk fill'],
        ['3 · Destination', 'Country, shipping mode, storage and handling route'],
        ['4 · Presentation', 'Label, closure, carton, pallet and document needs'],
      ].map(([title, copy]) => (
        <div key={title} className="bg-[#062b23] p-5 text-[#fbf7ed] sm:p-6">
          <p className="text-[9px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">{title}</p>
          <p className="mt-2 text-xs leading-relaxed text-[#f2ead9]/72">{copy}</p>
        </div>
      ))}
    </div>
  </section>
);
