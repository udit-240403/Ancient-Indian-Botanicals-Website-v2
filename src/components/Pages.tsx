import React from 'react';
import { BOTANICAL_PRODUCTS } from '../data/products';
import { ProductCatalogue } from './ProductCatalogue';
import { BotanicalProduct } from '../types';
import { ShieldCheck, Package, MapPin, Award, CheckCircle2, ArrowRight, FileText, Lock } from 'lucide-react';

interface SharedPageProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectProduct: (product: BotanicalProduct) => void;
  openQuoteModal: (productName?: string) => void;
  openCoaModal: () => void;
}

export const EssentialOilsPage: React.FC<SharedPageProps> = (props) => (
  <div className="w-full bg-[#062b23] text-[#fbf7ed]">
    {/* Page Header */}
    <div className="bg-[#083a30] py-14 px-4 md:px-8 border-b border-[#b88a2c]/30">
      <div className="max-w-[1440px] mx-auto space-y-4">
        <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold">
          Steam Distillates & Aroma Accords
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#fbf7ed]">
          Essential oils selected by origin, profile and application.
        </h1>
        <p className="text-sm md:text-base text-[#f2ead9]/85 max-w-3xl font-light leading-relaxed">
          Source natural essential oils and selected aroma grades with specification-led support. Tell us the target botanical, aroma profile, marker or analytical requirement, application and volume.
        </p>
      </div>
    </div>

    <ProductCatalogue
      initialCategory="essential-oils"
      searchQuery={props.searchQuery}
      setSearchQuery={props.setSearchQuery}
      onSelectProduct={props.onSelectProduct}
      openQuoteModal={props.openQuoteModal}
    />
  </div>
);

export const BotanicalsPage: React.FC<SharedPageProps> = (props) => (
  <div className="w-full bg-[#062b23] text-[#fbf7ed]">
    <div className="bg-[#083a30] py-14 px-4 md:px-8 border-b border-[#b88a2c]/30">
      <div className="max-w-[1440px] mx-auto space-y-4">
        <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold">
          Herbs, Roots & Standardized Extracts
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#fbf7ed]">
          Botanical ingredients in the form your process requires.
        </h1>
        <p className="text-sm md:text-base text-[#f2ead9]/85 max-w-3xl font-light leading-relaxed">
          Explore whole, cut, powdered and extracted botanicals. Availability, origin, mesh size, marker range, solvent system and documentation depend on the approved product and lot.
        </p>
      </div>
    </div>

    <ProductCatalogue
      initialCategory="botanicals"
      searchQuery={props.searchQuery}
      setSearchQuery={props.setSearchQuery}
      onSelectProduct={props.onSelectProduct}
      openQuoteModal={props.openQuoteModal}
    />
  </div>
);

export const PackagingPage: React.FC<{ openQuoteModal: () => void }> = ({ openQuoteModal }) => (
  <div className="w-full bg-[#062b23] text-[#fbf7ed] py-16 px-4 md:px-8">
    <div className="max-w-[1440px] mx-auto space-y-12">
      <div className="max-w-3xl space-y-4">
        <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold">
          Export Containers & White Label
        </span>
        <h1 className="font-serif text-3xl md:text-5xl font-semibold text-[#fbf7ed]">
          Packaging routes for samples, bulk supply and selected finished formats.
        </h1>
        <p className="text-sm text-[#f2ead9]/85 font-light leading-relaxed">
          Final pack type and fill quantity are confirmed only after compatibility, regulatory and transport review.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Evaluation Samples',
            desc: 'Suitable small-format containers (100g - 1kg) subject to material compatibility and safety sealing for trial lab testing.',
            badge: 'Sample Route'
          },
          {
            title: 'Essential Oils Packaging',
            desc: 'Aluminium bottles (1kg, 5kg) or approved fluorinated lined containers in relevant sizes with UN export certification.',
            badge: 'Oils & Accords'
          },
          {
            title: 'Bulk Liquids Shipping',
            desc: 'HDPE drums (25kg - 200kg) or compatible ISO export containers based on chemical composition and shipping mode.',
            badge: 'Bulk Liquids'
          },
          {
            title: 'Dry Botanicals & Powders',
            desc: 'Multi-wall kraft paper bags, double-lined polyethylene fiber drums (25kg) or woven sacks based on grade and destination.',
            badge: 'Powders & Cut'
          },
          {
            title: 'Private-Label Formats',
            desc: 'Selected finished white-label programmes subject to MOQ, packaging feasibility, regulatory label compliance and written sign-off.',
            badge: 'Contract Packing'
          }
        ].map((item, idx) => (
          <div key={idx} className="bg-[#083a30] border border-[#b88a2c]/30 p-6 space-y-3">
            <span className="text-[10px] uppercase tracking-eyebrow text-[#b88a2c] font-bold block">{item.badge}</span>
            <h3 className="font-serif text-2xl font-semibold text-[#fbf7ed]">{item.title}</h3>
            <p className="text-xs text-[#f2ead9]/80 font-light leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8 bg-[#083a30] border border-[#b88a2c]/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl font-semibold text-[#fbf7ed]">Discuss Packaging Requirements</h3>
          <p className="text-xs text-[#f2ead9]/80">Confirm custom drum specifications or sample pouch dispatch with our export desk.</p>
        </div>
        <button
          onClick={openQuoteModal}
          className="bg-[#b88a2c] hover:bg-[#967020] text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-8 py-3.5 cursor-pointer shrink-0"
        >
          Discuss Packaging Route
        </button>
      </div>
    </div>
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
          Verify Batch COA Online
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
