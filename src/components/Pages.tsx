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
    title="Herbs, roots, seeds, extracts, powders, waters and clays."
    description="Explore the complete botanical collection rather than a short featured selection. Product cards identify typical industry applications, commercial forms and review points; exact origin, grade, marker range and documentation are confirmed against the offered lot."
    heroImage="/assets/images/cultivation-ashwagandha.webp"
    heroImagePosition="center 58%"
    heroMediaLabel="Editorial cultivation imagery"
    contextualIntro={<BotanicalProcessingStory />}
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

export const AboutPage: React.FC<{ openQuoteModal: () => void }> = ({ openQuoteModal }) => (
  <div className="w-full bg-[#eee8dd] px-4 py-16 text-[#1f2925] md:px-8 lg:py-20">
    <div className="max-w-[1440px] mx-auto space-y-12">
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_19rem]">
        <div className="max-w-3xl space-y-4">
          <span className="text-[11px] uppercase tracking-eyebrow text-[#9b6334] font-semibold">
            Sourcing House Provenance
          </span>
          <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-[#1f2925] md:text-6xl">
            A modern botanical sourcing house with an Indian origin advantage.
          </h1>
          <p className="text-sm md:text-base text-[#52635d] font-light leading-relaxed">
            Ancient Indian Botanicals connects buyer specifications with suitable Indian botanical and aromatic supply routes. Our role is to make sourcing clearer: identify the requirement, match the material, coordinate available documentation, confirm packaging and support export execution.
          </p>
        </div>
        <div className="mx-auto w-full max-w-[19rem] border border-[#b56e3a]/35 bg-[#fbf8f1] p-5 shadow-[0_24px_70px_rgba(16,42,35,.13)]">
          <img src="/assets/images/aib-official-logo.webp" alt="Ancient Indian Botanicals official circular botanical logo" width="1024" height="1024" loading="eager" onError={(event) => { event.currentTarget.src = '/assets/images/aib-official-symbol.webp'; }} className="aspect-square w-full object-cover" />
          <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[0.18em] text-[#765411]">Official botanical seal</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 border border-[#b56e3a]/25 bg-[#fbf8f1] p-8 shadow-[0_18px_45px_-34px_rgba(16,42,35,.6)]">
          <h3 className="font-serif text-2xl font-semibold text-[#173f34]">Our Core Trade Values</h3>
          <ul className="space-y-3 text-xs text-[#52635d] font-light">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#b88a2c] shrink-0 mt-0.5" />
              <span><strong>Specification before quotation:</strong> We never issue generic pricing without confirming physical form and destination standards.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#b88a2c] shrink-0 mt-0.5" />
              <span><strong>Transparent lot communication:</strong> Direct details on harvest origin and available analytical reports.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#b88a2c] shrink-0 mt-0.5" />
              <span><strong>Relationship-led sourcing:</strong> Supplier routes are evaluated against the buyer specification, available evidence and commercial readiness.</span>
            </li>
          </ul>
        </div>

        <div className="image-shell relative aspect-video border border-[#b88a2c]/40 overflow-hidden bg-[#083a30]">
          <img
            src="/assets/images/hero-botanical-still-life.webp"
            alt="Amber botanical bottles with Indian herbs and roots"
            onError={(event) => { if (event.currentTarget.dataset.fallback === 'true') return; event.currentTarget.dataset.fallback = 'true'; event.currentTarget.src = '/assets/images/product-families-flatlay.webp'; }}
            className="relative z-[1] w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
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
