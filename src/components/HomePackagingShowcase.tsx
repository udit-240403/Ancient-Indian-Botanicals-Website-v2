import React from 'react';
import { ArrowRight, FlaskConical, Package, Tags } from 'lucide-react';

interface HomePackagingShowcaseProps {
  openPackagingPage: () => void;
  openQuoteModal: () => void;
}

export const HomePackagingShowcase: React.FC<HomePackagingShowcaseProps> = ({ openPackagingPage, openQuoteModal }) => (
  <section className="border-b border-[#b88a2c]/25 bg-[#f3eddf] px-4 py-20 text-[#062b23] md:px-8 md:py-28">
    <div className="mx-auto max-w-[1440px]">
      <div className="mb-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b711e]">Packaging in view</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl">A visible route from sample to shipment.</h2>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-[#315148]">Buyers can review evaluation bottles, powder pouches, aluminium containers, fibre or HDPE drums and commercial bulk routes before preparing an enquiry. The final pack, closure and marking remain product- and destination-specific.</p>
      </div>

      <div className="grid overflow-hidden border border-[#b88a2c]/40 bg-[#062b23] shadow-[0_26px_70px_-36px_rgba(4,30,24,.75)] lg:grid-cols-[1.45fr_.55fr]">
        <button onClick={openPackagingPage} className="image-shell group relative min-h-[360px] overflow-hidden text-left sm:min-h-[480px]">
          <img
            src="/assets/images/packaging-export-system.webp"
            alt="Export packaging presentation with amber sample bottles, aluminium bottles, pouches, fibre and HDPE drums and an IBC"
            width="1672"
            height="941"
            loading="lazy"
            onError={(event) => { event.currentTarget.src = '/assets/images/product-families-flatlay.webp'; }}
            className="relative z-[1] h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.025]"
          />
          <span className="absolute bottom-5 left-5 z-[2] border border-[#d4a43d]/65 bg-[#041e18]/92 px-4 py-2 text-[10px] font-bold uppercase tracking-eyebrow text-[#fbf7ed] backdrop-blur-sm">View the complete packaging system</span>
        </button>

        <div className="grid bg-[#062b23] text-[#fbf7ed] sm:grid-cols-3 lg:grid-cols-1">
          {[
            { icon: FlaskConical, title: 'Evaluation', copy: 'Compatible small packs for laboratory, formulation and sensory review.' },
            { icon: Package, title: 'Commercial bulk', copy: 'Aluminium, lined, HDPE, fibre-drum and IBC routes reviewed by material.' },
            { icon: Tags, title: 'Selected private label', copy: 'Bottle, closure, artwork and shipper coordination subject to MOQ and compliance.' },
          ].map(({ icon: Icon, title, copy }) => (
            <article key={title} className="border-t border-[#b88a2c]/25 p-6 first:border-t-0 sm:border-l sm:border-t-0 sm:first:border-l-0 lg:border-l-0 lg:border-t lg:first:border-t-0">
              <Icon className="h-5 w-5 text-[#d4a43d]" />
              <h3 className="mt-5 font-serif text-2xl font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#f2ead9]/70">{copy}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button onClick={openPackagingPage} className="inline-flex items-center justify-center gap-2 bg-[#062b23] px-6 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#fbf7ed] hover:bg-[#083a30]">Explore packaging <ArrowRight className="h-4 w-4 text-[#d4a43d]" /></button>
        <button onClick={openQuoteModal} className="inline-flex items-center justify-center gap-2 border border-[#9b711e] px-6 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#062b23] hover:bg-[#efe3c8]">Discuss a pack format <ArrowRight className="h-4 w-4" /></button>
      </div>
    </div>
  </section>
);
