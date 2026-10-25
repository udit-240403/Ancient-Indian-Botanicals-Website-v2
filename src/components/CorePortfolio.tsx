import React from 'react';
import { ArrowRight, FileCheck2, Leaf, MapPin } from 'lucide-react';
import { CATALOGUE_PRODUCTS } from '../data/catalogue';

interface CorePortfolioProps {
  openProduct: (productId: string) => void;
  openQuoteModal: (productName?: string) => void;
}

const priorityIds = [
  'ashwagandha',
  'amla',
  'boswellia',
  'mentha-arvensis',
  'lemongrass',
  'dehydrated-garlic',
];

const focusNotes: Record<string, string> = {
  ashwagandha: 'Central India focus · whole root, powder and extract routes',
  amla: 'Fruit, powder and specification-led extract routes',
  boswellia: 'Central Indian resin and extract enquiries',
  'mentha-arvensis': 'India-origin mint oil evaluated against the required profile',
  lemongrass: 'Essential-oil route aligned to citral and application requirements',
  'dehydrated-garlic': 'Food-ingredient route by cut, grade and destination controls',
};

export const CorePortfolio: React.FC<CorePortfolioProps> = ({ openProduct, openQuoteModal }) => {
  const products = priorityIds
    .map((id) => CATALOGUE_PRODUCTS.find((product) => product.id === id))
    .filter(Boolean) as typeof CATALOGUE_PRODUCTS;

  return (
    <section className="border-b border-[#b88a2c]/30 bg-[#062b23] px-4 py-16 text-[#fbf7ed] md:px-8 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Priority enquiry routes</span>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">Start with the products we are actively developing.</h2>
          </div>
          <div>
            <p className="text-sm leading-relaxed text-[#f2ead9]/75">The complete catalogue remains available, but these routes receive priority attention for supplier matching, samples, specification review and buyer discussions. Inclusion does not imply ready stock or universal certification.</p>
            <button onClick={() => openQuoteModal('Priority product sourcing brief')} className="mt-5 inline-flex items-center gap-2 border border-[#d4a43d] px-5 py-3 text-[10px] font-bold uppercase tracking-eyebrow hover:bg-[#d4a43d] hover:text-[#041e18]">Share a priority brief <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden border border-[#b88a2c]/30 bg-[#b88a2c]/30 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article key={product.id} className="group bg-[#041e18]">
              <button type="button" onClick={() => openProduct(product.id)} className="block w-full text-left">
                <div className="aspect-[16/9] overflow-hidden bg-[#173f34]">
                  <img src={product.image} alt={product.name} width="720" height="405" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]" />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-eyebrow text-[#d4a43d]"><Leaf className="h-3.5 w-3.5" />Priority route</div>
                  <h3 className="mt-3 font-serif text-2xl font-semibold text-[#fbf7ed]">{product.name}</h3>
                  <p className="mt-1 font-serif text-sm italic text-[#a8c76b]">{product.botanicalName}</p>
                  <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-[#f2ead9]/68"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d4a43d]" />{focusNotes[product.id]}</p>
                  <span className="mt-5 inline-flex items-center gap-2 border-t border-[#b88a2c]/25 pt-4 text-[9px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Review forms and requirements <ArrowRight className="h-3.5 w-3.5" /></span>
                </div>
              </button>
            </article>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 border border-[#b88a2c]/25 bg-[#083a30] p-4 text-[11px] leading-relaxed text-[#f2ead9]/72"><FileCheck2 className="mt-0.5 h-4 w-4 shrink-0 text-[#d4a43d]" /><p>Before quotation, we still confirm the exact form, grade, active marker or analytical method, quantity, packaging, destination and required documentation.</p></div>
      </div>
    </section>
  );
};
