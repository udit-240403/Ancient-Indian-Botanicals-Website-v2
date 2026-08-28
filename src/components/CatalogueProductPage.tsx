import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, FileCheck2, FileText, Fingerprint, Microscope, PackageCheck, PackageSearch } from 'lucide-react';
import {
  CATALOGUE_GROUP_LABELS,
  CatalogueProduct,
  getCatalogueGroup,
  getProductPath,
} from '../data/catalogue';
import { ProductVisual } from './ProductVisual';

const BUYER_REVIEW_STEPS = [
  { icon: Fingerprint, number: '01', title: 'Identity', copy: 'Botanical name, part, physical form and required grade.' },
  { icon: Microscope, number: '02', title: 'Analytical brief', copy: 'Relevant markers, composition and testing expectations.' },
  { icon: PackageSearch, number: '03', title: 'Pack route', copy: 'Quantity, compatibility, closure and destination needs.' },
  { icon: FileCheck2, number: '04', title: 'Lot file', copy: 'Available product, safety, origin and dispatch documents.' },
];

interface CatalogueProductPageProps {
  product: CatalogueProduct;
  relatedProducts: CatalogueProduct[];
  openQuoteModal: (productName?: string) => void;
  openCoaModal: (productName?: string) => void;
}

export const CatalogueProductPage: React.FC<CatalogueProductPageProps> = ({
  product,
  relatedProducts,
  openQuoteModal,
  openCoaModal,
}) => {
  const group = getCatalogueGroup(product);
  const collectionPath = group === 'botanicals' || group === 'waters-clays'
    ? '/botanicals'
    : group === 'seeds-food' || group === 'cold-pressed-oils'
      ? '/food-ingredients'
      : '/essential-oils';

  return (
    <div className="w-full bg-[#f4efe5] text-[#1f2925]">
      <section className="border-b border-[#b56e3a]/25 bg-[#eee8dd] px-4 py-6 md:px-8">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-eyebrow text-[#66706b]">
          <a href="/catalogue" className="hover:text-[#9b6334]">Catalogue</a>
          <span>/</span>
          <a href={collectionPath} className="hover:text-[#9b6334]">{CATALOGUE_GROUP_LABELS[group]}</a>
          <span>/</span>
          <span className="text-[#173f34]">{product.name}</span>
        </div>
      </section>

      <section className="px-4 py-12 md:px-8 md:py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-9 lg:grid-cols-[minmax(0,.92fr)_minmax(0,1.08fr)] lg:items-start">
          <ProductVisual
              src={product.image}
              alt={`${product.name} representative product-form presentation`}
              width={1200}
              height={900}
              loading="eager"
              fetchPriority="high"
              className="aspect-[4/3] border border-[#b56e3a]/35 shadow-[0_28px_70px_-40px_rgba(16,42,35,.8)] lg:sticky lg:top-8"
            >
            <span className="absolute left-4 top-4 z-[4] border border-[#d4a43d]/55 bg-[#102a23]/94 px-3 py-1.5 text-[9px] font-bold uppercase tracking-eyebrow text-[#e1bd67] backdrop-blur-sm">
              {CATALOGUE_GROUP_LABELS[group]}
            </span>
            <span className="absolute bottom-3 right-3 z-[4] bg-[#102a23]/88 px-2.5 py-1 text-[8px] font-semibold uppercase tracking-[0.16em] text-[#f2ead9]/82 backdrop-blur-sm">
              Representative product form
            </span>
          </ProductVisual>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Specification-led product route</span>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.02] sm:text-5xl lg:text-6xl">{product.name}</h1>
            <p className="mt-3 font-serif text-xl italic text-[#9b6334]">{product.botanicalName}</p>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#52635d] md:text-base">{product.fieldDescription}</p>

            <div className="mt-7 border-l-2 border-[#b56e3a] bg-[#fbf8f1] px-5 py-4 text-sm leading-relaxed text-[#344740]">
              {product.whyBuyersKnowIt}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => openQuoteModal(product.name)} className="inline-flex items-center justify-center gap-2 bg-[#173f34] px-7 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#fbf8f1] hover:bg-[#102a23]">
                Enquire about this product <ArrowRight className="h-4 w-4" />
              </button>
              <button onClick={() => openCoaModal(product.name)} className="inline-flex items-center justify-center gap-2 border border-[#b56e3a] bg-[#fbf8f1] px-7 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#765411] hover:bg-[#efe3c8]">
                <FileCheck2 className="h-4 w-4" /> Request spec / sample COA
              </button>
              <a href={collectionPath} className="inline-flex items-center justify-center gap-2 border border-[#173f34] px-7 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#173f34] hover:bg-[#173f34] hover:text-[#fbf8f1]">
                <ArrowLeft className="h-4 w-4" /> Back to collection
              </a>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-[#66706b]">Availability, origin, composition, grade, MOQ, documentation and packaging are confirmed only against the approved enquiry and offered lot.</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[#b88a2c]/30 bg-[#062b23] px-4 text-[#fbf7ed] md:px-8">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
          {BUYER_REVIEW_STEPS.map(({ icon: Icon, number, title, copy }, index) => (
            <article key={title} className={`relative px-1 py-7 sm:px-6 lg:py-8 ${index > 0 ? 'border-t border-[#b88a2c]/20 sm:border-t-0 sm:border-l' : ''} ${index === 2 ? 'sm:border-l-0 lg:border-l' : ''}`}>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b88a2c]/45 bg-[#041e18] text-[#d4a43d]"><Icon className="h-[18px] w-[18px]" /></div>
                <div><span className="text-[9px] font-bold uppercase tracking-eyebrow text-[#b88a2c]">Buyer review {number}</span><h2 className="mt-1 font-serif text-xl font-semibold">{title}</h2><p className="mt-1.5 text-[11px] leading-relaxed text-[#f2ead9]/68">{copy}</p></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#b56e3a]/20 bg-[#fbf8f1] px-4 py-14 md:px-8 lg:py-18">
        <div className="mx-auto grid max-w-[1440px] gap-6 lg:grid-cols-3">
          <article className="border border-[#b56e3a]/25 bg-white p-6">
            <FileText className="h-5 w-5 text-[#9b6334]" />
            <h2 className="mt-5 font-serif text-2xl font-semibold">Commercial forms</h2>
            <div className="mt-4 space-y-3">
              {product.commercialForms.map((form) => <div key={form} className="flex items-start gap-2 text-xs leading-relaxed text-[#52635d]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9b6334]" />{form}</div>)}
            </div>
          </article>
          <article className="border border-[#b56e3a]/25 bg-white p-6">
            <PackageCheck className="h-5 w-5 text-[#9b6334]" />
            <h2 className="mt-5 font-serif text-2xl font-semibold">Typical industries</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.typicalApplications.map((application) => <span key={application} className="rounded-full border border-[#82966f]/30 bg-[#e8e7dc] px-3 py-1.5 text-[10px] text-[#344740]">{application}</span>)}
            </div>
          </article>
          <article className="border border-[#b56e3a]/25 bg-white p-6">
            <CheckCircle2 className="h-5 w-5 text-[#9b6334]" />
            <h2 className="mt-5 font-serif text-2xl font-semibold">Review framework</h2>
            <div className="mt-4 space-y-3">
              {product.specifications.map((item) => <div key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[#52635d]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9b6334]" />{item}</div>)}
            </div>
          </article>
        </div>
      </section>

      <section className="px-4 py-14 md:px-8 lg:py-18">
        <div className="mx-auto max-w-[1440px]">
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Application context</span>
          <h2 className="mt-2 font-serif text-3xl font-semibold sm:text-4xl">Where buyers typically evaluate this material</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {product.realWorldApps.map((application) => (
              <article key={application.title} className="border border-[#b56e3a]/25 bg-[#fbf8f1] p-6">
                <h3 className="font-serif text-2xl font-semibold text-[#173f34]">{application.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#52635d]">{application.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#b56e3a]/20 bg-[#fbf8f1] px-4 py-14 md:px-8 lg:py-18">
        <div className="mx-auto grid max-w-[1440px] overflow-hidden border border-[#b56e3a]/30 bg-[#f4efe5] lg:grid-cols-[1.08fr_.92fr] lg:items-stretch">
          <div className="image-shell relative min-h-[320px] overflow-hidden lg:min-h-[410px]">
            <img src="/assets/images/packaging-export-system.webp" alt="Illustrative export packaging route from samples to bulk containers" width="1672" height="941" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[62%_50%]" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#041e18]/18" />
          </div>
          <div className="flex flex-col justify-center bg-[#062b23] p-7 text-[#fbf7ed] sm:p-10 lg:p-12">
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Packaging is part of the specification</span>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">A route from evaluation sample to commercial supply.</h2>
            <p className="mt-4 text-sm leading-relaxed text-[#f2ead9]/75">For {product.name}, the final container, lining, closure, fill quantity and markings are reviewed against product compatibility, destination and shipment mode before confirmation.</p>
            <a href="/packaging" className="mt-7 inline-flex w-fit items-center gap-2 border border-[#d4a43d] px-6 py-3 text-[10px] font-bold uppercase tracking-eyebrow text-[#fbf7ed] transition-colors hover:bg-[#d4a43d] hover:text-[#041e18]">Review packaging routes <ArrowRight className="h-4 w-4" /></a>
            <p className="mt-5 text-[10px] leading-relaxed text-[#f2ead9]/48">Illustrative packaging presentation; the approved pack remains product- and order-specific.</p>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-[#b56e3a]/20 bg-[#eee8dd] px-4 py-14 md:px-8 lg:py-18">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Related sourcing routes</span><h2 className="mt-2 font-serif text-3xl font-semibold">Continue exploring</h2></div><a href="/catalogue" className="text-xs font-bold uppercase tracking-eyebrow text-[#173f34] hover:text-[#9b6334]">View complete catalogue →</a></div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => (
                <a key={related.id} href={getProductPath(related.id)} className="group overflow-hidden border border-[#b56e3a]/25 bg-[#fbf8f1] transition-all hover:-translate-y-1 hover:border-[#b56e3a]/60">
                  <ProductVisual src={related.image} alt={related.name} loading="lazy" className="aspect-[16/9]" />
                  <div className="p-5"><p className="font-serif text-sm italic text-[#9b6334]">{related.botanicalName}</p><h3 className="mt-1 font-serif text-2xl font-semibold text-[#1f2925] group-hover:text-[#9b6334]">{related.name}</h3></div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
