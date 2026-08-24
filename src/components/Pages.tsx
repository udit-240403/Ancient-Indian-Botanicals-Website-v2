import React from 'react';
import { CompleteCatalogue } from './CompleteCatalogue';
import { CheckCircle2, ArrowRight, Mail, MapPin, Building2, Landmark, FileCheck2, ShieldAlert, Globe2, BarChart3 } from 'lucide-react';
import { BotanicalProcessingStory, OilExtractionStory, PackagingInnovationStory, QualityVisualStory } from './TraditionTechnologySections';
import { PackagingFormatGuide } from './PackagingFormatGuide';

interface SharedPageProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openQuoteModal: (productName?: string) => void;
  openCoaModal: () => void;
}

export const EssentialOilsPage: React.FC<SharedPageProps> = (props) => (
  <CompleteCatalogue
    allowedGroups={['essential-oils', 'aroma-oils', 'carrier-oils']}
    initialVisibleCount={100}
    eyebrow="Complete Oils Portfolio"
    title="Natural oils and aroma grades, clearly separated and fully visible."
    description="Browse all natural essential oils, carrier oils and clearly identified aroma or diffuser grades in one complete collection. Each card shows commercial forms, industry uses and buyer relevance; composition and analytical requirements remain lot-specific."
    heroImage="/assets/images/category-oils-distillation-v2.webp"
    heroImagePosition="center"
    heroMediaLabel="Editorial steam-distillation imagery"
    contextualIntro={<OilExtractionStory />}
    searchQuery={props.searchQuery}
    setSearchQuery={props.setSearchQuery}
    openQuoteModal={props.openQuoteModal}
  />
);

export const BotanicalsPage: React.FC<SharedPageProps> = (props) => (
  <CompleteCatalogue
    allowedGroups={['botanicals', 'waters-clays']}
    initialVisibleCount={100}
    eyebrow="Complete Botanical Portfolio"
    title="Indian botanicals for formulation, sourcing and export."
    description="Explore Indian botanicals across herbs, roots, seeds, extracts, powders, floral waters and clays. Product cards identify typical industry applications, commercial forms and review points; exact origin, grade, marker range and documentation are confirmed against the offered lot."
    heroImage="/assets/images/cultivation-ashwagandha.webp"
    heroImagePosition="center 58%"
    heroMediaLabel="Editorial cultivation imagery"
    contextualIntro={<BotanicalProcessingStory />}
    searchQuery={props.searchQuery}
    setSearchQuery={props.setSearchQuery}
    openQuoteModal={props.openQuoteModal}
  />
);

const FoodIngredientsIntro = () => (
  <section className="border-b border-[#b56e3a]/25 bg-[#062b23] px-4 py-12 text-[#fbf7ed] md:px-8 md:py-16">
    <div className="mx-auto max-w-[1440px]">
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          {
            icon: CheckCircle2,
            title: 'Grade before price',
            copy: 'Variety, crop, size, purity, moisture, cut, processing status and intended application are defined before supplier matching.',
          },
          {
            icon: FileCheck2,
            title: 'Food-safety evidence',
            copy: 'Microbiology, residues, allergens, mycotoxins and other destination controls are scoped to the product and approved buyer brief.',
          },
          {
            icon: Globe2,
            title: 'Destination-led supply',
            copy: 'Export policy, admissibility, labels, certificates and pack requirements are reconfirmed before every commercial offer.',
          },
        ].map(({ icon: Icon, title, copy }) => (
          <article key={title} className="border border-[#b88a2c]/30 bg-[#041e18] p-6 md:p-7">
            <Icon className="h-5 w-5 text-[#d4a43d]" />
            <h2 className="mt-5 font-serif text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-xs leading-relaxed text-[#f2ead9]/70">{copy}</p>
          </article>
        ))}
      </div>
      <p className="mt-6 text-[10px] leading-relaxed text-[#f2ead9]/52">
        Catalogue inclusion represents an enquiry-led sourcing route, not guaranteed stock, certification or destination approval. Final suitability is confirmed in writing for the offered lot.
      </p>
    </div>
  </section>
);

export const FoodIngredientsPage: React.FC<SharedPageProps> = (props) => (
  <CompleteCatalogue
    allowedGroups={['seeds-food', 'cold-pressed-oils']}
    initialVisibleCount={100}
    eyebrow="Seeds, Nuts & Value-Added Food Ingredients"
    title="Indian food ingredients, selected around the buyer's specification."
    description="Explore oilseeds, nuts, makhana, coconut products, jaggery, millets, dehydrated ingredients and clearly identified cold-pressed oil routes. Origin, grade, food-safety evidence, destination suitability and current availability remain offer-specific."
    heroImage="/assets/images/food-ingredients-export-hero.webp"
    heroImagePosition="center"
    heroMediaLabel="Representative ingredient portfolio"
    contextualIntro={<FoodIngredientsIntro />}
    searchQuery={props.searchQuery}
    setSearchQuery={props.setSearchQuery}
    openQuoteModal={props.openQuoteModal}
  />
);

export const PackagingPage: React.FC<{ openQuoteModal: (productName?: string) => void }> = ({ openQuoteModal }) => (
  <div className="w-full bg-[#f3eddf] text-[#062b23]">
    <section className="image-shell relative min-h-[570px] overflow-hidden border-b border-[#b88a2c]/40">
      <img
        src="/assets/images/packaging-export-system.webp"
        alt="Botanical export packaging formats including sample bottles, pouches, drums and an IBC"
        width="1536"
        height="1024"
        loading="eager"
        onError={(event) => { if (event.currentTarget.dataset.fallback === 'true') return; event.currentTarget.dataset.fallback = 'true'; event.currentTarget.src = '/assets/images/product-families-flatlay.webp'; }}
        className="absolute inset-0 h-full w-full object-cover object-[65%_50%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#041e18] via-[#041e18]/88 to-[#041e18]/15" />
      <div className="relative z-10 mx-auto flex min-h-[570px] max-w-[1440px] items-center px-4 py-16 md:px-8">
        <div className="max-w-2xl space-y-5 text-[#fbf7ed]">
          <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-[#d4a43d]">Packaging architecture · sample to bulk</span>
          <h1 className="font-serif text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl">From evaluation sample to commercial bulk.</h1>
          <p className="max-w-xl text-sm leading-relaxed text-[#f2ead9]/88 sm:text-base">
            A clear packaging route helps protect material integrity and prevents surprises at dispatch. We align the pack format with product compatibility, fill quantity, destination and shipping mode before confirmation.
          </p>
          <button onClick={() => openQuoteModal('Packaging brief')} className="inline-flex items-center gap-2 bg-[#b88a2c] px-6 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#041e18] transition-colors hover:bg-[#d4a43d]">
            Build a packaging brief <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>

    <section
      className="px-4 py-16 md:px-8 lg:py-20"
      style={{ backgroundImage: "linear-gradient(rgba(243,237,223,.94),rgba(243,237,223,.94)), url('/assets/svg/botanical-pattern.svg')" }}
    >
      <div className="mx-auto max-w-[1440px] space-y-10">
        <div className="grid gap-6 lg:grid-cols-[.78fr_1.22fr] lg:items-end">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b711e]">Packaging formats in view</span>
            <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight sm:text-4xl">The pack is part of the product specification.</h2>
          </div>
          <p className="text-sm leading-relaxed text-[#315148]">Pictures help buyers understand the available route, while the final container is confirmed only after product compatibility, fill quantity, destination, closure and transport review.</p>
        </div>

        <PackagingInnovationStory />

        <PackagingFormatGuide openQuoteModal={openQuoteModal} />

        <div className="grid overflow-hidden border border-[#b88a2c]/40 bg-[#062b23] text-[#fbf7ed] lg:grid-cols-[1fr_auto]">
          <div className="p-7 sm:p-9">
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Compatibility before commitment</span>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">One brief connects product, pack and destination.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#f2ead9]/78">Share the product, grade, trial or commercial quantity, destination and preferred format. Availability and any transport- or market-specific requirements are confirmed in writing before supply.</p>
          </div>
          <div className="flex items-center border-t border-[#b88a2c]/30 p-7 lg:border-l lg:border-t-0">
            <button onClick={() => openQuoteModal('Packaging specification')} className="w-full border border-[#d4a43d] px-7 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#fbf7ed] transition-colors hover:bg-[#d4a43d] hover:text-[#041e18]">Discuss your format</button>
          </div>
        </div>
        <p className="text-center text-[11px] text-[#47685d]">Packaging image is an illustrative format guide. Final material, closure, fill and markings are product- and shipment-specific.</p>
      </div>
    </section>
  </div>
);

export const QualityPage: React.FC<{ openCoaModal: () => void; openQuoteModal: () => void }> = ({ openCoaModal, openQuoteModal }) => (
  <div className="w-full bg-[#f4efe5] px-4 py-16 text-[#1f2925] md:px-8 lg:py-20">
    <div className="max-w-[1440px] mx-auto space-y-12">
      <div className="grid gap-8 border-b border-[#b56e3a]/25 pb-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <div className="max-w-4xl space-y-4">
          <span className="text-[11px] uppercase tracking-eyebrow text-[#9b6334] font-semibold">Quality Control & Compliance</span>
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-[#1f2925] md:text-6xl">Documentation built around the product, lot and destination.</h1>
        </div>
        <p className="text-sm font-light leading-relaxed text-[#52635d]">Quality requirements are agreed before supply. Depending on the botanical and grade, documentation may include a certificate of analysis, botanical identity, organoleptic profile, relevant chromatography or marker testing, microbiological or contaminant testing, safety documentation and packing records.</p>
      </div>

      <QualityVisualStory />

      <div className="max-w-4xl space-y-3 border border-[#b56e3a]/35 bg-[#173f34] p-6 text-[#fbf8f1] shadow-[0_20px_55px_-35px_rgba(16,42,35,.8)]">
        <span className="text-xs uppercase tracking-eyebrow text-[#b88a2c] font-bold block">Integrity Commitment</span>
        <p className="text-xs text-[#f2ead9]/90 leading-relaxed font-light">
          We do not claim universally: organic certification, GC/MS on every product, therapeutic benefit, guaranteed harvest dates or regulatory approval without product-specific evidence. All claims are lot-verified.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          'Lot-linked COA or Specification Review',
          'GC/MS Profile for Selected Essential Oils',
          'Marker Assay Where Applicable',
          'Required Microbiology or Contaminant Review',
          'Safety & Handling Documents Where Applicable',
          'Available Batch and Packing Records'
        ].map((doc, idx) => (
          <div key={idx} className="flex items-center gap-3 border border-[#b56e3a]/25 bg-[#fbf8f1] p-5 shadow-[0_14px_36px_-30px_rgba(16,42,35,.6)]">
            <CheckCircle2 className="w-5 h-5 text-[#9b6334] shrink-0" />
            <span className="text-xs font-semibold text-[#344740]">{doc}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <button
          onClick={openCoaModal}
          className="cursor-pointer bg-[#173f34] px-8 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#fbf8f1] hover:bg-[#102a23]"
        >
          Request Lot Documents
        </button>
        <button
          onClick={openQuoteModal}
          className="cursor-pointer border border-[#173f34] bg-transparent px-8 py-3.5 text-xs font-semibold uppercase tracking-eyebrow text-[#173f34] hover:bg-[#173f34] hover:text-[#fbf8f1]"
        >
          Request Lot Sample
        </button>
      </div>
    </div>
  </div>
);

export const AboutPage: React.FC<{ openQuoteModal: (productName?: string) => void }> = ({ openQuoteModal }) => (
  <div className="w-full bg-[#eee8dd] text-[#1f2925]">
    <section className="border-b border-[#b56e3a]/25 px-4 py-16 md:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[1fr_21rem]">
        <div className="max-w-4xl space-y-5">
          <span className="text-[11px] font-semibold uppercase tracking-eyebrow text-[#9b6334]">About Ancient Indian Botanicals</span>
          <h1 className="font-serif text-4xl font-semibold leading-[1.03] text-[#1f2925] md:text-6xl lg:text-7xl">You build the brand. We organise the work behind it.</h1>
          <p className="max-w-3xl text-sm font-light leading-relaxed text-[#52635d] md:text-base">Ancient Indian Botanicals is an Indian B2B sourcing and coordination house for botanical and aromatic ingredients. We translate the buyer brief into an organised India-side route—material matching, samples, available lot documents, packaging coordination and export preparation—so your team can stay focused on market, product and brand.</p>
          <div className="flex flex-wrap gap-2 pt-2 text-[9px] font-bold uppercase tracking-eyebrow text-[#765411]">
            {['Incorporated in India', 'Specification-led', 'Buyer-brand focused'].map((item) => <span key={item} className="border border-[#b88a2c]/40 bg-[#fbf8f1] px-3 py-2">{item}</span>)}
          </div>
        </div>
        <div className="mx-auto w-full max-w-[21rem] border border-[#b56e3a]/35 bg-[#fbf8f1] p-5 shadow-[0_24px_70px_rgba(16,42,35,.13)]">
          <img src="/assets/images/aib-official-logo.webp" alt="Ancient Indian Botanicals official circular botanical logo" width="1024" height="1024" loading="eager" onError={(event) => { event.currentTarget.src = '/assets/images/aib-official-symbol.webp'; }} className="aspect-square w-full object-cover" />
          <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-[#765411]">Official botanical seal</p>
        </div>
      </div>
    </section>

    <section className="border-b border-[#b88a2c]/30 bg-[#062b23] px-4 py-14 text-[#fbf7ed] md:px-8 lg:py-16">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Our guiding thought</span>
          <p className="mt-5 font-serif text-4xl leading-none text-[#e1bd67] sm:text-5xl">वसुधैव कुटुम्बकम्</p>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[.2em] text-[#f2ead9]/65">Vasudhaiva Kutumbakam · The world is one family</p>
        </div>
        <div className="border-l-2 border-[#b88a2c] pl-6 sm:pl-8">
          <h2 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">Business travels farther when relationships come first.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#f2ead9]/72">We see the international buyer, Indian cultivation and processing partners, packaging teams and logistics specialists as one connected commercial family. That means clearer expectations, respect for every participant and long-term value instead of a one-transaction mindset.</p>
        </div>
      </div>
    </section>

    <section className="px-4 py-16 md:px-8 lg:py-20">
      <div className="mx-auto max-w-[1440px] space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
          <figure className="overflow-hidden border border-[#b56e3a]/30 bg-[#fbf8f1] shadow-[0_24px_70px_-48px_rgba(16,42,35,.8)]">
            <div className="image-shell aspect-[16/10] overflow-hidden">
              <img src="/assets/images/about-sourcing-operations-v2.webp" alt="Editorial representation of an Indian sourcing team reviewing botanical samples, packaging and quality documents" width="1440" height="900" loading="eager" decoding="async" onError={(event) => { if (event.currentTarget.dataset.fallback === 'true') return; event.currentTarget.dataset.fallback = 'true'; event.currentTarget.src = '/assets/images/product-families-flatlay.webp'; }} className="h-full w-full object-cover" />
            </div>
            <figcaption className="border-t border-[#b56e3a]/20 px-4 py-3 text-[9px] leading-relaxed text-[#7a837f]">Editorial representation of sourcing coordination—not a photograph of a company-owned office or facility.</figcaption>
          </figure>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Ease of doing business</span>
            <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">One brief. One coordinated India-side route.</h2>
            <p className="mt-5 text-sm leading-relaxed text-[#52635d]">Working across suppliers, samples, packaging vendors and documents can consume a buyer’s time. Our role is to reduce that friction: place the requirement in one commercial brief, coordinate suitable routes and bring the relevant decisions back to you in a form your team can review.</p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { icon: FileCheck2, title: 'Translate the brief', copy: 'Product, grade, application, volume, destination and evidence requirements.' },
                { icon: Globe2, title: 'Build the route', copy: 'Suitable Indian material and supplier routes reviewed for commercial readiness.' },
                { icon: Building2, title: 'Coordinate execution', copy: 'Samples, pack formats, closures, artwork and hand-finishing where feasible.' },
                { icon: CheckCircle2, title: 'Prepare the review', copy: 'Available lot documents, pack checks and dispatch requirements brought together.' },
              ].map(({ icon: Icon, title, copy }) => <article key={title} className="border-t border-[#b56e3a]/30 pt-4"><Icon className="h-5 w-5 text-[#9b6334]" /><h3 className="mt-3 font-serif text-xl font-semibold text-[#173f34]">{title}</h3><p className="mt-2 text-[11px] leading-relaxed text-[#66706b]">{copy}</p></article>)}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="border-y border-[#b56e3a]/25 bg-[#f5f0e6] px-4 py-16 md:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
        <div className="order-2 lg:order-1">
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b6334]">Brand-ready coordination</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">Skilled execution where it creates real value.</h2>
          <p className="mt-5 text-sm leading-relaxed text-[#52635d]">India’s broad botanical, packaging and skilled-service ecosystem can support commercially efficient programmes—from evaluation kits to buyer-specific labels, cartons and secondary presentation. We coordinate these possibilities around your approved brand brief rather than forcing your team to manage every India-side task separately.</p>
          <ul className="mt-7 space-y-3 text-xs leading-relaxed text-[#425b52]">
            {['Evaluation samples and organised buyer review kits', 'Bottle, closure, label and carton coordination', 'Careful hand-finishing and packing support where suitable', 'Consolidated quality, packaging and destination requirements'].map((item) => <li key={item} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9b6334]" /><span>{item}</span></li>)}
          </ul>
          <div className="mt-7 border-l-2 border-[#b88a2c] bg-[#fbf8f1] p-4 text-[11px] leading-relaxed text-[#52635d]"><strong className="text-[#173f34]">Cost-efficient does not mean compromise.</strong> Final supplier capability, MOQ, pack material, artwork, quality evidence, destination compliance and transport suitability are confirmed for each approved project.</div>
        </div>
        <figure className="order-1 overflow-hidden border border-[#b56e3a]/30 bg-[#fbf8f1] shadow-[0_24px_70px_-48px_rgba(16,42,35,.8)] lg:order-2">
          <div className="image-shell aspect-[16/10] overflow-hidden">
            <img src="/assets/images/about-private-label-coordination-v2.webp" alt="Editorial representation of skilled Indian packaging staff applying labels, checking closures and assembling cartons" width="1440" height="900" loading="lazy" decoding="async" onError={(event) => { if (event.currentTarget.dataset.fallback === 'true') return; event.currentTarget.dataset.fallback = 'true'; event.currentTarget.src = '/assets/images/packaging-heritage-modern-system.webp'; }} className="h-full w-full object-cover" />
          </div>
          <figcaption className="border-t border-[#b56e3a]/20 px-4 py-3 text-[9px] leading-relaxed text-[#7a837f]">Editorial representation of private-label coordination—not a photograph of a company-owned packaging unit. Capability is project-specific.</figcaption>
        </figure>
      </div>
    </section>

    <section className="px-4 py-16 md:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1440px] overflow-hidden border border-[#b88a2c]/40 bg-[#062b23] text-[#fbf7ed] lg:grid-cols-[1fr_auto]">
        <div className="p-8 sm:p-10 lg:p-12">
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">The measure that matters</span>
          <h2 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-5xl">Your trust is our greatest profit.</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#f2ead9]/72">We measure success through clear communication, honest limitations, dependable coordination and relationships that become stronger with every approved lot—not through promises the evidence cannot support.</p>
        </div>
        <div className="flex items-center border-t border-[#b88a2c]/25 p-8 lg:border-l lg:border-t-0">
          <button type="button" onClick={() => openQuoteModal('Brand and private-label programme')} className="inline-flex w-full items-center justify-center gap-2 bg-[#b88a2c] px-7 py-4 text-[10px] font-bold uppercase tracking-eyebrow text-[#041e18] hover:bg-[#d4a43d]">Share your brand brief <ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  </div>
);

export const PaymentsPage: React.FC = () => (
  <div className="w-full bg-[#f3eddf] text-[#062b23]">
    <section className="border-b border-[#b88a2c]/35 bg-[#062b23] px-4 py-16 text-[#fbf7ed] md:px-8 lg:py-20">
      <div className="mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Secure B2B commercial process</span>
          <h1 className="mt-3 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">Payment follows specification, verification and written approval.</h1>
        </div>
        <p className="text-sm leading-relaxed text-[#f2ead9]/78">We do not collect card payments or publish bank details on this website. Commercial instructions are issued only against an approved quotation and verified counterparty route.</p>
      </div>
    </section>

    <section className="px-4 py-16 md:px-8 lg:py-20">
      <div className="mx-auto max-w-[1440px] space-y-12">
        <div className="grid gap-px overflow-hidden border border-[#b88a2c]/30 bg-[#b88a2c]/30 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FileCheck2, step: '01', title: 'Requirement agreed', copy: 'Product, grade, quantity, documentation, packaging and destination are placed in one commercial brief.' },
            { icon: Building2, step: '02', title: 'Counterparty checked', copy: 'Buyer and supply route details are reviewed before any payment instruction is issued.' },
            { icon: Landmark, step: '03', title: 'Banking route confirmed', copy: 'Currency, account route, schedule and applicable trade terms are confirmed in writing.' },
            { icon: CheckCircle2, step: '04', title: 'Payment matched', copy: 'Funds are matched only to the approved quotation, invoice or accepted commercial document.' },
          ].map(({ icon: Icon, step, title, copy }) => (
            <article key={title} className="bg-[#fbf7ed] p-6 sm:p-8">
              <div className="flex items-center justify-between"><Icon className="h-6 w-6 text-[#765411]" /><span className="font-serif text-xl text-[#b88a2c]">{step}</span></div>
              <h2 className="mt-7 font-serif text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-xs leading-relaxed text-[#315148]">{copy}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_.85fr]">
          <div className="border border-[#b88a2c]/35 bg-[#fbf7ed] p-7 sm:p-9">
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#9b711e]">Routes considered case by case</span>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {['Bank transfer against approved quotation and invoice', 'Letter of Credit for eligible larger orders', 'Currency and Incoterms confirmed in the final offer', 'Payment schedule linked to the accepted commercial route'].map((item) => <div key={item} className="flex gap-3 border-t border-[#b88a2c]/25 pt-4 text-sm leading-relaxed"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9b711e]" /><span>{item}</span></div>)}
            </div>
          </div>
          <div className="border border-[#b88a2c]/45 bg-[#062b23] p-7 text-[#fbf7ed] sm:p-9">
            <div className="flex items-center gap-3 text-[#d4a43d]"><ShieldAlert className="h-6 w-6" /><span className="text-[10px] font-bold uppercase tracking-eyebrow">Payment safety notice</span></div>
            <h2 className="mt-5 font-serif text-2xl font-semibold">Verify any instruction before remitting funds.</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#f2ead9]/75">Do not act on changed bank details, personal-account requests, cryptocurrency requests or payment links claiming to represent us. Reconfirm through an official <strong className="text-[#fbf7ed]">@ancientindianbotanicals.com</strong> email address.</p>
          </div>
        </div>

        <p className="text-center text-[11px] text-[#526d64]">Ancient Indian Botanicals is incorporated in India. Final payment terms become binding only through an accepted written commercial document.</p>
      </div>
    </section>
  </div>
);

export const ContactPage: React.FC<{ openQuoteModal: () => void }> = ({ openQuoteModal }) => (
  <div className="w-full bg-[#f3eddf] text-[#062b23]">
    <section className="relative overflow-hidden border-b border-[#b88a2c]/35 bg-[#062b23] px-4 py-16 text-[#fbf7ed] md:px-8 lg:py-20">
      <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url('/assets/svg/botanical-pattern.svg')" }} />
      <div className="relative mx-auto grid max-w-[1440px] gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div><span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Ancient Indian Botanicals trade desk</span><h1 className="mt-3 font-serif text-4xl font-semibold leading-[1.04] sm:text-5xl lg:text-6xl">Reach the right desk with a complete brief.</h1></div>
        <div><p className="text-sm leading-relaxed text-[#f2ead9]/80">For a faster commercial review, include the product, required form or grade, quantity, application, destination and documentation needs.</p><button onClick={openQuoteModal} className="mt-5 inline-flex items-center gap-2 bg-[#b88a2c] px-6 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#041e18] hover:bg-[#d4a43d]">Open structured enquiry <ArrowRight className="h-4 w-4" /></button></div>
      </div>
    </section>

    <section className="px-4 py-16 md:px-8 lg:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            { icon: Globe2, label: 'Buyer & product enquiries', email: 'sales@ancientindianbotanicals.com', copy: 'Product availability, grades, samples, quotation briefs and destination requirements.' },
            { icon: Building2, label: 'Sourcing & supply routes', email: 'sourcing@ancientindianbotanicals.com', copy: 'Indian cultivation, processing, packaging and specification-led supplier introductions.' },
            { icon: Mail, label: 'General, documents & legal', email: 'office@ancientindianbotanicals.com', copy: 'General correspondence, document coordination, privacy and commercial administration.' },
          ].map(({ icon: Icon, label, email, copy }) => (
            <a key={email} href={`mailto:${email}`} className="group border border-[#b88a2c]/35 bg-[#fbf7ed] p-7 transition-all hover:-translate-y-1 hover:border-[#b88a2c] hover:shadow-[0_22px_55px_-38px_rgba(4,30,24,.8)] sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#062b23] text-[#d4a43d]"><Icon className="h-5 w-5" /></span>
              <span className="mt-7 block text-[9px] font-bold uppercase tracking-eyebrow text-[#9b711e]">{label}</span>
              <h2 className="mt-2 break-all font-serif text-2xl font-semibold">{email}</h2>
              <p className="mt-3 text-xs leading-relaxed text-[#315148]">{copy}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-eyebrow text-[#765411]">Prepare email <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
            </a>
          ))}
        </div>

        <div className="mt-8 grid border border-[#b88a2c]/35 bg-[#062b23] text-[#fbf7ed] lg:grid-cols-[.78fr_1.22fr]">
          <div className="border-b border-[#b88a2c]/25 p-7 lg:border-b-0 lg:border-r sm:p-9"><MapPin className="h-6 w-6 text-[#d4a43d]" /><span className="mt-6 block text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Trade location</span><h2 className="mt-2 font-serif text-3xl font-semibold">Mandsaur, Madhya Pradesh</h2><p className="mt-3 text-xs leading-relaxed text-[#f2ead9]/70">Positioned within a central Indian agricultural and botanical trading corridor. Registered particulars are shared through official commercial documents.</p></div>
          <div className="p-7 sm:p-9"><span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">What to include</span><div className="mt-5 grid gap-3 sm:grid-cols-2">{['Botanical or ingredient name', 'Required physical form or grade', 'Trial and commercial quantity', 'Application and destination', 'Packaging preference', 'Analytical or document requirements'].map((item) => <div key={item} className="flex items-start gap-2 border-t border-[#b88a2c]/20 pt-3 text-xs text-[#f2ead9]/80"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d4a43d]" />{item}</div>)}</div></div>
        </div>

        <div className="mt-8 flex items-start gap-3 border border-[#b88a2c]/30 bg-[#efe3c8]/70 p-5 text-xs leading-relaxed text-[#315148]"><BarChart3 className="mt-0.5 h-4 w-4 shrink-0 text-[#765411]" /><p>The website enquiry form submits only after you press its final button. If direct submission is temporarily unavailable, it provides a clearly labelled email fallback rather than claiming that your enquiry was received.</p></div>
      </div>
    </section>
  </div>
);

export const LegalPage: React.FC<{ policyType: 'terms' | 'shipping' | 'privacy' | 'refunds' }> = ({ policyType }) => (
  <div className="w-full bg-[#f4efe5] px-4 py-16 text-[#1f2925] md:px-8 lg:py-20">
    <div className="max-w-3xl mx-auto space-y-6">
      <span className="text-[11px] uppercase tracking-eyebrow text-[#9b6334] font-semibold">Regulatory & Legal Policy</span>
      <h1 className="font-serif text-4xl font-semibold text-[#1f2925] capitalize md:text-5xl">
        {policyType} Policy
      </h1>
      <div className="space-y-4 border border-[#b56e3a]/30 bg-[#fbf8f1] p-6 text-sm font-light leading-relaxed text-[#52635d] shadow-[0_18px_45px_-34px_rgba(16,42,35,.6)]">
        <p>
          Ancient Indian Botanicals is incorporated in India. Website information is intended for B2B commercial evaluation. Any order, specification, documentation obligation, shipping term, return term or payment condition becomes binding only through a written offer or contract and counterparty review.
        </p>
        {policyType === 'privacy' && (
          <p>
            The site uses privacy-conscious, cookieless Vercel Web Analytics and performance telemetry to understand aggregate page visits, device type, broad country-level origin and site performance. It does not intentionally publish visitor-level analytics. Information entered in an enquiry form is used only to review and respond to that commercial request and is not sold.
          </p>
        )}
        <p>
          For questions regarding trade terms, shipping documents, privacy or batch-return protocols, contact <a href="mailto:office@ancientindianbotanicals.com" className="font-mono font-semibold text-[#9b6334] hover:text-[#173f34]">office@ancientindianbotanicals.com</a>.
        </p>
      </div>
    </div>
  </div>
);
