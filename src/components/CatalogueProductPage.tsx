import React from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, FileText, PackageCheck } from 'lucide-react';
import {
  CATALOGUE_GROUP_LABELS,
  CatalogueProduct,
  getCatalogueGroup,
  getProductPath,
} from '../data/catalogue';

interface CatalogueProductPageProps {
  product: CatalogueProduct;
  relatedProducts: CatalogueProduct[];
  openQuoteModal: (productName?: string) => void;
}

export const CatalogueProductPage: React.FC<CatalogueProductPageProps> = ({
  product,
  relatedProducts,
  openQuoteModal,
}) => {
  const group = getCatalogueGroup(product);
  const collectionPath = group === 'botanicals' || group === 'waters-clays' ? '/botanicals' : '/essential-oils';

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
          <div className="image-shell relative aspect-[4/3] overflow-hidden border border-[#b56e3a]/35 bg-[#173f34] shadow-[0_28px_70px_-40px_rgba(16,42,35,.8)] lg:sticky lg:top-8">
            <img
              src={product.image}
              alt={`${product.name} botanical ingredient presentation`}
              width="1200"
              height="900"
              loading="eager"
              fetchPriority="high"
              onError={(event) => {
                if (event.currentTarget.dataset.fallback === 'true') return;
                event.currentTarget.dataset.fallback = 'true';
                event.currentTarget.src = '/assets/images/product-families-flatlay.webp';
              }}
              className="relative z-[1] h-full w-full object-cover"
            />
            <span className="absolute left-4 top-4 z-[2] border border-[#d4a43d]/55 bg-[#102a23]/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-eyebrow text-[#e1bd67]">
              {CATALOGUE_GROUP_LABELS[group]}
            </span>
          </div>

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
              <a href={collectionPath} className="inline-flex items-center justify-center gap-2 border border-[#173f34] px-7 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#173f34] hover:bg-[#173f34] hover:text-[#fbf8f1]">
                <ArrowLeft className="h-4 w-4" /> Back to collection
              </a>
            </div>

            <p className="mt-4 text-[11px] leading-relaxed text-[#66706b]">Availability, origin, composition, grade, MOQ, documentation and packaging are confirmed only against the approved enquiry and offered lot.</p>
          </div>
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

      {relatedProducts.length > 0 && (
        <section className="border-t border-[#b56e3a]/20 bg-[#eee8dd] px-4 py-14 md:px-8 lg:py-18">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Related sourcing routes</span><h2 className="mt-2 font-serif text-3xl font-semibold">Continue exploring</h2></div><a href="/catalogue" className="text-xs font-bold uppercase tracking-eyebrow text-[#173f34] hover:text-[#9b6334]">View complete catalogue →</a></div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((related) => (
                <a key={related.id} href={getProductPath(related.id)} className="group overflow-hidden border border-[#b56e3a]/25 bg-[#fbf8f1] transition-all hover:-translate-y-1 hover:border-[#b56e3a]/60">
                  <div className="image-shell aspect-[16/9] overflow-hidden"><img src={related.image} alt={related.name} loading="lazy" className="relative z-[1] h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" /></div>
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
