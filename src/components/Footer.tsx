import React from 'react';
import { MapPin, Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openQuoteModal: (productName?: string) => void;
  openCoaModal: () => void;
  openAiConsultantModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  openQuoteModal,
  openCoaModal,
  openAiConsultantModal
}) => {
  const handleNav = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#031a15] text-[#fbf7ed] border-t border-[#b88a2c]/25 pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Col 1: Brand & Provenance Statement (2 Cols wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#083a30] border border-[#b88a2c]/50 flex items-center justify-center p-1.5">
                <img
                  src="/assets/svg/brand-mark.svg"
                  alt="Ancient Indian Botanicals"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block font-serif text-xl font-semibold text-[#fbf7ed]">
                  Ancient Indian Botanicals
                </span>
                <span className="block text-[10px] tracking-eyebrow uppercase text-[#82966f]">
                  Pure Botanical Sourcing
                </span>
              </div>
            </div>

            <p className="text-xs text-[#f2ead9]/80 font-light leading-relaxed max-w-sm">
              Connecting buyer specifications with suitable Indian botanical and aromatic supply routes. Direct lot verification, transparent documentation, and export logistics.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#b88a2c] font-serif pt-1">
              <span>सर्वे सन्तु निरामयाः</span>
              <span className="text-[#7f7b6f] font-sans text-[11px]">— May all be free from illness.</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#b88a2c] border-b border-[#b88a2c]/20 pb-1">
              Catalogue Routes
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-eyebrow font-medium text-[#f2ead9]/80">
              <li>
                <button onClick={() => handleNav('essential-oils')} className="hover:text-[#b88a2c] transition-colors">
                  Essential Oils & Accords
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('botanicals')} className="hover:text-[#b88a2c] transition-colors">
                  Botanical Ingredients & Roots
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('packaging')} className="hover:text-[#b88a2c] transition-colors">
                  Export Packaging Options
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('quality')} className="hover:text-[#b88a2c] transition-colors">
                  Quality Assurance & Testing
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#b88a2c] transition-colors">
                  About Our Sourcing House
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Quality Controls */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#b88a2c] border-b border-[#b88a2c]/20 pb-1">
              Verification & Desk
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#f2ead9]/80">
              <li>
                <button onClick={openCoaModal} className="hover:text-[#b88a2c] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b88a2c]" />
                  <span>Verify Batch COA</span>
                </button>
              </li>
              <li>
                <button onClick={openAiConsultantModal} className="hover:text-[#b88a2c] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b88a2c]" />
                  <span>AI Spec Consultant</span>
                </button>
              </li>
              <li>
                <button onClick={() => openQuoteModal()} className="hover:text-[#b88a2c] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#b88a2c]" />
                  <span>Request B2B Quote</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('payments')} className="hover:text-[#b88a2c] transition-colors">
                  Approved Payment Methods
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trade Desk & Hub */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#b88a2c] border-b border-[#b88a2c]/20 pb-1">
              Indian Trade Hub
            </h4>
            <div className="space-y-2 text-xs text-[#f2ead9]/80 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#b88a2c] shrink-0 mt-0.5" />
                <span>Mandsaur Trade Corridor, Madhya Pradesh 458001, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#b88a2c] shrink-0" />
                <a href="mailto:office@ancientindianbotanicals.com" className="font-mono text-[11px] hover:text-[#b88a2c] transition-colors">office@ancientindianbotanicals.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#b88a2c] shrink-0" />
                <span className="text-[11px] text-[#82966f]">Phone contact will be shared with confirmed trade enquiries.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer */}
        <div className="p-5 bg-[#062b23] border border-[#b88a2c]/20 text-[11px] text-[#a9b2ac] font-light leading-relaxed mb-8">
          <strong className="text-[#dfcfad]">Commercial notice:</strong> Ancient Indian Botanicals is currently undergoing incorporation. Product information is supplied for commercial evaluation and does not constitute therapeutic claims or medical advice. Specifications, origin, availability and supporting documents are confirmed in writing for each approved lot and enquiry.
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#b88a2c]/30 text-xs text-[#82966f]">
          <p>© {new Date().getFullYear()} Ancient Indian Botanicals. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-[11px]">
            <button onClick={() => handleNav('terms')} className="hover:text-[#fbf7ed]">Terms of Trade</button>
            <button onClick={() => handleNav('shipping')} className="hover:text-[#fbf7ed]">Export Shipping Policy</button>
            <button onClick={() => handleNav('privacy')} className="hover:text-[#fbf7ed]">Privacy Policy</button>
            <button onClick={() => handleNav('refunds')} className="hover:text-[#fbf7ed]">Quality Guarantee & Refunds</button>
          </div>
        </div>

      </div>
    </footer>
  );
};
