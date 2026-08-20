import React from 'react';
import { CheckCircle2, FlaskConical, PackageCheck, ScanSearch, ShieldCheck, Sparkles } from 'lucide-react';

interface StoryCardProps {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
  description: string;
  imagePosition?: string;
}

const EDITORIAL_IMAGE_FALLBACK = '/assets/images/product-families-flatlay.webp';

const handleEditorialImageError: React.ReactEventHandler<HTMLImageElement> = (event) => {
  if (event.currentTarget.dataset.fallback === 'true') return;
  event.currentTarget.dataset.fallback = 'true';
  event.currentTarget.src = EDITORIAL_IMAGE_FALLBACK;
};

const StoryCard: React.FC<StoryCardProps> = ({ image, alt, eyebrow, title, description, imagePosition = 'center' }) => (
  <article className="group overflow-hidden border border-[#b56e3a]/30 bg-[#fbf8f1] shadow-[0_24px_60px_-44px_rgba(16,42,35,.7)]">
    <div className="image-shell relative aspect-[16/10] overflow-hidden">
      <img src={image} alt={alt} width={1774} height={1024} loading="lazy" decoding="async" onError={handleEditorialImageError} className="relative z-[1] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" style={{ objectPosition: imagePosition }} />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#041e18]/72 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 z-[3] border border-[#d4a43d]/55 bg-[#041e18]/88 px-3 py-1.5 text-[9px] font-bold uppercase tracking-eyebrow text-[#e1bd67] backdrop-blur-sm">{eyebrow}</span>
    </div>
    <div className="p-6 sm:p-7">
      <h3 className="font-serif text-2xl font-semibold leading-tight text-[#173f34] sm:text-3xl">{title}</h3>
      <p className="mt-3 text-sm font-light leading-relaxed text-[#52635d]">{description}</p>
    </div>
  </article>
);

export const OilExtractionStory: React.FC = () => (
  <section className="editorial-section border-b border-[#b56e3a]/20 bg-[#eee8dd] px-4 py-16 text-[#1f2925] md:px-8 lg:py-20">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
        <div><span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Indian extraction traditions</span><div className="section-rule my-4" /><h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">Heritage in method. Precision in supply.</h2></div>
        <p className="max-w-2xl text-sm leading-relaxed text-[#52635d]">India's aromatic supply landscape includes living craft traditions and controlled modern processing. We present both as possible sourcing contexts; the actual method, facility, composition and documents are confirmed for the offered material.</p>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <StoryCard image="/assets/images/process-kannauj-deg-bhapka.webp" alt="Editorial representation of a Kannauj artisan preparing a copper deg and bhapka system" eyebrow="Heritage reference · Kannauj" title="The deg–bhapka attar tradition" description="In the traditional Kannauj system, a copper deg is heated on a clay bhatti and connected through a chonga to a copper bhapka cooled in water. This scene represents loading and preparation before the deg is sealed and operated by a skilled artisan." imagePosition="center 46%" />
        <StoryCard image="/assets/images/process-modern-steam-distillation.webp" alt="Editorial representation of a modern stainless-steel botanical steam-distillation system" eyebrow="Modern processing reference" title="Controlled steam distillation" description="Closed stainless-steel routes can support controlled heating, condensation and oil–water separation. The appropriate extraction route depends on the botanical, target profile, supplier capability and approved buyer specification." imagePosition="center" />
      </div>
      <p className="mt-6 border-l-2 border-[#b88a2c] bg-[#fbf8f1]/72 px-4 py-3 text-[11px] leading-relaxed text-[#66706b]">Editorial process imagery—not photographs of an Ancient Indian Botanicals-owned facility. Traditional attar production and commercial essential-oil production are related but distinct routes and are never presented as interchangeable without product-specific confirmation.</p>
    </div>
  </section>
);

export const BotanicalProcessingStory: React.FC = () => (
  <section className="editorial-section border-b border-[#b56e3a]/20 bg-[#eee8dd] px-4 py-16 text-[#1f2925] md:px-8 lg:py-20">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid gap-7 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
        <div><span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">From harvest to commercial form</span><div className="section-rule my-4" /><h2 className="font-serif text-4xl font-semibold leading-tight sm:text-5xl">Traditional care. Controlled preparation.</h2></div>
        <p className="max-w-2xl text-sm leading-relaxed text-[#52635d]">Botanical quality begins before milling or extraction. Plant part, cleaning, drying conditions, segregation and final physical form all shape the buyer's review. The route is matched to the ingredient and destination—not assumed from a photograph.</p>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <StoryCard image="/assets/images/process-botanical-traditional.webp" alt="Editorial representation of clean hand sorting and shade preparation of Indian botanicals" eyebrow="Field & craft reference" title="Sorting and shade preparation" description="Hand selection, clean segregation and appropriate shade-drying remain valuable for many roots, leaves and fruits where appearance, identity and careful handling matter." imagePosition="center" />
        <StoryCard image="/assets/images/process-botanical-modern.webp" alt="Editorial representation of controlled botanical drying, milling and sieving" eyebrow="Modern processing reference" title="Drying, milling and sieving controls" description="For commercial powders and cuts, controlled drying, enclosed size reduction, sieving and sampling can support more consistent physical specifications—subject to the actual supplier process and lot file." imagePosition="center" />
      </div>
      <p className="mt-6 border-l-2 border-[#b88a2c] bg-[#fbf8f1]/72 px-4 py-3 text-[11px] leading-relaxed text-[#66706b]">Editorial process imagery—not photographs of an Ancient Indian Botanicals-owned processing unit. Cleaning method, temperature, particle size, microbial controls and documentation are confirmed only for an approved sourcing route.</p>
    </div>
  </section>
);

export const QualityVisualStory: React.FC = () => (
  <section className="overflow-hidden border border-[#b56e3a]/30 bg-[#fbf8f1] shadow-[0_24px_70px_-48px_rgba(16,42,35,.8)] lg:grid lg:grid-cols-[1.08fr_.92fr]">
    <div className="image-shell relative min-h-[340px] overflow-hidden lg:min-h-[470px]">
      <img src="/assets/images/quality-analytical-laboratory.webp" alt="Editorial representation of an analytical chemist reviewing botanical samples and chromatographic data" width={1745} height={901} loading="eager" decoding="async" onError={handleEditorialImageError} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041e18]/58 via-transparent to-transparent" />
      <span className="absolute bottom-4 left-4 border border-[#d4a43d]/55 bg-[#041e18]/88 px-3 py-1.5 text-[9px] font-bold uppercase tracking-eyebrow text-[#e1bd67] backdrop-blur-sm">Editorial laboratory reference</span>
    </div>
    <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
      <FlaskConical className="h-6 w-6 text-[#9b6334]" />
      <span className="mt-6 text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Evidence before assurance</span>
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl">A quality conversation grounded in the offered lot.</h2>
      <p className="mt-4 text-sm leading-relaxed text-[#52635d]">The appropriate laboratory review depends on the material and buyer requirement. It may involve botanical identity, organoleptic review, relevant markers, chromatography, microbiology, contaminants or safety documentation where applicable and available.</p>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {['Identity & physical form', 'Relevant analytical profile', 'Contaminant requirements', 'Lot-linked documentation'].map((item) => <div key={item} className="flex items-start gap-2 border-t border-[#b56e3a]/25 pt-3 text-xs text-[#344740]"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9b6334]" />{item}</div>)}
      </div>
      <p className="mt-6 text-[10px] leading-relaxed text-[#7a837f]">The image is illustrative and does not represent a company-owned laboratory or a universal testing claim.</p>
    </div>
  </section>
);

export const PackagingInnovationStory: React.FC = () => (
  <section className="overflow-hidden border border-[#b88a2c]/35 bg-[#062b23] text-[#fbf7ed] shadow-[0_28px_80px_-48px_rgba(4,30,24,.95)]">
    <div className="image-shell relative aspect-[16/8] min-h-[300px] overflow-hidden sm:min-h-[420px]">
      <img src="/assets/images/packaging-heritage-modern-system.webp" alt="Editorial packaging system with sample vials, aluminium containers, pouches, fibre and bulk drums, and heritage-inspired secondary cartons" width={1672} height={941} loading="lazy" decoding="async" onError={handleEditorialImageError} className="absolute inset-0 h-full w-full object-cover object-center" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#041e18]/82 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-9"><span className="text-[9px] font-bold uppercase tracking-eyebrow text-[#e1bd67]">Editorial packaging concept</span><h2 className="mt-2 max-w-3xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">Heritage outside. Product compatibility inside.</h2></div>
    </div>
    <div className="grid gap-px bg-[#b88a2c]/22 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { icon: ScanSearch, title: 'Evaluation', copy: 'Amber vials, sample bottles and document kits for approved review quantities.' },
        { icon: ShieldCheck, title: 'Oil protection', copy: 'Amber glass, aluminium and compatible lined bulk routes considered by composition.' },
        { icon: PackageCheck, title: 'Dry ingredients', copy: 'High-barrier pouches, lined bags and fibre or HDPE drums considered by form.' },
        { icon: Sparkles, title: 'Distinctive presentation', copy: 'Indian pattern, embossing and reusable cases reserved for secondary presentation.' },
      ].map(({ icon: Icon, title, copy }) => <article key={title} className="bg-[#062b23] p-6 sm:p-7"><Icon className="h-5 w-5 text-[#d4a43d]" /><h3 className="mt-5 font-serif text-2xl font-semibold">{title}</h3><p className="mt-2 text-xs leading-relaxed text-[#f2ead9]/68">{copy}</p></article>)}
    </div>
    <p className="border-t border-[#b88a2c]/25 px-6 py-4 text-center text-[10px] leading-relaxed text-[#f2ead9]/55">Concept imagery only. Final material, lining, closure, fill, label, MOQ, destination compliance and transport suitability are confirmed per product and order.</p>
  </section>
);
