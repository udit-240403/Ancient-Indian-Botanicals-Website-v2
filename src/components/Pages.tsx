import React from 'react';
import { CompleteCatalogue } from './CompleteCatalogue';
import { BotanicalProduct } from '../types';
import { Package, CheckCircle2, ArrowRight, FileText, Lock, FlaskConical, Droplets, Layers3, Tags } from 'lucide-react';

interface SharedPageProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectProduct: (product: BotanicalProduct) => void;
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
    searchQuery={props.searchQuery}
    setSearchQuery={props.setSearchQuery}
    openQuoteModal={props.openQuoteModal}
  />
);

export const PackagingPage: React.FC<{ openQuoteModal: () => void }> = ({ openQuoteModal }) => (
  <div className="w-full bg-[#f3eddf] text-[#062b23]">
    <section className="relative min-h-[570px] overflow-hidden border-b border-[#b88a2c]/40">
      <img
        src="/assets/images/packaging-export-system.webp"
        alt="Botanical export packaging formats including sample bottles, pouches, drums and an IBC"
        width="1536"
        height="1024"
        loading="eager"
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
          <button onClick={openQuoteModal} className="inline-flex items-center gap-2 bg-[#b88a2c] px-6 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#041e18] transition-colors hover:bg-[#d4a43d]">
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
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: FlaskConical, badge: 'Evaluation', title: 'Samples', desc: 'Small compatible packs for laboratory and formulation review, with fill size confirmed per material.' },
            { icon: Droplets, badge: 'Natural & aroma oils', title: 'Oil packs', desc: 'Amber glass, aluminium or compatible lined containers selected around composition and quantity.' },
            { icon: Package, badge: 'Commercial lots', title: 'Bulk liquids', desc: 'HDPE drums, metal drums or IBC routes considered against the product and transport requirement.' },
            { icon: Layers3, badge: 'Dry ingredients', title: 'Herbs & powders', desc: 'Lined kraft bags, fibre drums or woven sacks configured for physical form and destination.' },
            { icon: Tags, badge: 'Selected projects', title: 'Private label', desc: 'Bottle, closure and label routes reviewed against MOQ, artwork, compliance and feasibility.' },
          ].map(({ icon: Icon, badge, title, desc }) => (
            <article key={title} className="group border border-[#a97825]/35 bg-[#fbf7ed]/90 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#a97825] hover:shadow-[0_18px_45px_-28px_rgba(4,30,24,.7)]">
              <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-full border border-[#b88a2c]/45 bg-[#efe3c8] text-[#062b23]">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-eyebrow text-[#9b711e]">{badge}</span>
              <h2 className="mt-2 font-serif text-2xl font-semibold">{title}</h2>
              <p className="mt-3 text-xs leading-relaxed text-[#27463c]">{desc}</p>
            </article>
          ))}
        </div>

        <div className="grid overflow-hidden border border-[#b88a2c]/40 bg-[#062b23] text-[#fbf7ed] lg:grid-cols-[1fr_auto]">
          <div className="p-7 sm:p-9">
            <span className="text-[10px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Compatibility before commitment</span>
            <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">One brief connects product, pack and destination.</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#f2ead9]/78">Share the product, grade, trial or commercial quantity, destination and preferred format. Availability and any transport- or market-specific requirements are confirmed in writing before supply.</p>
          </div>
          <div className="flex items-center border-t border-[#b88a2c]/30 p-7 lg:border-l lg:border-t-0">
            <button onClick={openQuoteModal} className="w-full border border-[#d4a43d] px-7 py-3.5 text-xs font-bold uppercase tracking-eyebrow text-[#fbf7ed] transition-colors hover:bg-[#d4a43d] hover:text-[#041e18]">Discuss your format</button>
          </div>
        </div>
        <p className="text-center text-[11px] text-[#47685d]">Packaging image is an illustrative format guide. Final material, closure, fill and markings are product- and shipment-specific.</p>
      </div>
    </section>
  </div>
);

export const QualityPage: React.FC<{ openCoaModal: () => void; openQuoteModal: () => void }> = ({ openCoaModal, openQuoteModal }) => (
  <div className="w-full bg-[#062b23] text-[#fbf7ed] py-16 px-4 md:px-8">
    <div className="max-w-[1440px] mx-auto space-y-12">
      <div className="max-w-3xl space-y-4">
        <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold">
          Quality Control & Compliance
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#fbf7ed]">
          Documentation built around the product, lot and destination.
        </h1>
        <p className="text-sm text-[#f2ead9]/85 font-light leading-relaxed">
          Quality requirements are agreed before supply. Depending on the botanical and grade, documentation may include a certificate of analysis, botanical identity, organoleptic profile, relevant chromatography or marker testing, microbiological or contaminant testing, safety documentation and packing records.
        </p>
      </div>

      <div className="p-6 bg-[#083a30] border border-[#b88a2c]/40 space-y-3 max-w-3xl">
        <span className="text-xs uppercase tracking-eyebrow text-[#b88a2c] font-bold block">Integrity Commitment</span>
        <p className="text-xs text-[#f2ead9]/90 leading-relaxed font-light">
          We do not claim universally: organic certification, GC/MS on every product, therapeutic benefit, guaranteed harvest dates or regulatory approval without product-specific evidence. All claims are lot-verified.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          'Certificate of Analysis (COA) per Lot',
          'GC/MS Fingerprint (Selected Essential Oils)',
          'Active Marker Assay (HPLC / Titration)',
          'Microbiological & Heavy Metal Limits',
          'Safety Data Sheet (MSDS) & Handling',
          'Traceable Batch Packing Records'
        ].map((doc, idx) => (
          <div key={idx} className="p-5 bg-[#083a30] border border-[#b88a2c]/30 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#b88a2c] shrink-0" />
            <span className="text-xs font-semibold text-[#fbf7ed]">{doc}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={openCoaModal}
          className="bg-[#b88a2c] text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-8 py-3.5 cursor-pointer"
        >
          Request Lot Documents
        </button>
        <button
          onClick={openQuoteModal}
          className="bg-[#083a30] border border-[#b88a2c]/50 text-[#fbf7ed] font-medium text-xs uppercase tracking-eyebrow px-8 py-3.5 cursor-pointer"
        >
          Request Lot Sample
        </button>
      </div>
    </div>
  </div>
);

export const AboutPage: React.FC<{ openQuoteModal: () => void }> = ({ openQuoteModal }) => (
  <div className="w-full bg-[#062b23] text-[#fbf7ed] py-16 px-4 md:px-8">
    <div className="max-w-[1440px] mx-auto space-y-12">
      <div className="max-w-3xl space-y-4">
        <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold">
          Sourcing House Provenance
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#fbf7ed]">
          A modern botanical sourcing house with an Indian origin advantage.
        </h1>
        <p className="text-sm md:text-base text-[#f2ead9]/85 font-light leading-relaxed">
          Ancient Indian Botanicals connects buyer specifications with suitable Indian botanical and aromatic supply routes. Our role is to make sourcing clearer: identify the requirement, match the material, coordinate available documentation, confirm packaging and support export execution.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4 bg-[#083a30] border border-[#b88a2c]/30 p-8">
          <h3 className="font-serif text-2xl font-semibold text-[#b88a2c]">Our Core Trade Values</h3>
          <ul className="space-y-3 text-xs text-[#f2ead9]/90 font-light">
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

        <div className="relative aspect-video border border-[#b88a2c]/40 overflow-hidden bg-[#083a30]">
          <img
            src="/assets/images/hero-botanical-still-life.webp"
            alt="Amber botanical bottles with Indian herbs and roots"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);

export const PaymentsPage: React.FC = () => (
  <div className="w-full bg-[#062b23] text-[#fbf7ed] py-16 px-4 md:px-8">
    <div className="max-w-[1440px] mx-auto space-y-8 max-w-3xl">
      <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold">Approved B2B Commercial Payment Terms</span>
      <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#fbf7ed]">
        Commercial Payment & Accounts Guidelines
      </h1>
      <p className="text-xs text-[#f2ead9]/85 leading-relaxed font-light">
        Ancient Indian Botanicals is currently undergoing incorporation. Payment instructions will be issued only after written quotation, counterparty verification and confirmation of the applicable banking route. We do not collect card payments through this website.
      </p>

      <div className="space-y-4 bg-[#083a30] border border-[#b88a2c]/30 p-6 text-xs">
        <h3 className="font-serif text-xl text-[#b88a2c]">Commercial routes considered case by case:</h3>
        <ul className="space-y-2 font-light">
          <li>• Bank transfer against an approved quotation and invoice</li>
          <li>• Letter of Credit for eligible larger orders, subject to written acceptance</li>
          <li>• Currency, Incoterms and payment schedule confirmed in the final commercial offer</li>
        </ul>
      </div>
    </div>
  </div>
);

export const LegalPage: React.FC<{ policyType: 'terms' | 'shipping' | 'privacy' | 'refunds' }> = ({ policyType }) => (
  <div className="w-full bg-[#062b23] text-[#fbf7ed] py-16 px-4 md:px-8">
    <div className="max-w-3xl mx-auto space-y-6">
      <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold">Regulatory & Legal Policy</span>
      <h1 className="font-serif text-3xl font-semibold text-[#fbf7ed] capitalize">
        {policyType} Policy
      </h1>
      <div className="p-6 bg-[#083a30] border border-[#b88a2c]/30 text-xs text-[#f2ead9]/85 space-y-4 font-light leading-relaxed">
        <p>
          Ancient Indian Botanicals is currently undergoing incorporation. Website information is preliminary and intended for B2B commercial evaluation. Any order, specification, documentation obligation, shipping term, return term or payment condition becomes binding only through a written offer or contract issued after incorporation and counterparty review.
        </p>
        <p>
          For questions regarding trade terms, shipping documents, privacy or batch-return protocols, contact <a href="mailto:office@ancientindianbotanicals.com" className="font-mono text-[#b88a2c] hover:text-[#fbf7ed]">office@ancientindianbotanicals.com</a>.
        </p>
      </div>
    </div>
  </div>
);
