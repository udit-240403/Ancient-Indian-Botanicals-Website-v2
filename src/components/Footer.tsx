import React from 'react';
import { MapPin, Mail, Phone, ShieldCheck, ArrowRight } from 'lucide-react';
import { PAGE_ROUTES } from '../siteRoutes';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openQuoteModal: (productName?: string) => void;
  openCoaModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  openQuoteModal,
  openCoaModal
}) => {
  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
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
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#d4a43d] bg-[#f4efd3] p-1.5 shadow-[0_8px_28px_rgba(0,0,0,.28)]">
                <img
                  src="/assets/images/aib-official-logo.webp"
                  alt="Ancient Indian Botanicals official circular botanical emblem"
                  width="512"
                  height="512"
                  onError={(event) => { event.currentTarget.src = '/assets/images/aib-official-symbol.webp'; }}
                  className="h-full w-full rounded-full object-cover"
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
              Connecting buyer specifications with suitable Indian botanical and aromatic supply routes. Lot-level documentation coordination, transparent communication and export support.
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
                <a href={PAGE_ROUTES.catalogue} onClick={(event) => handleNav(event, 'catalogue')} className="text-[#b88a2c] hover:text-[#fbf7ed] transition-colors">
                  Complete Product Catalogue
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES['essential-oils']} onClick={(event) => handleNav(event, 'essential-oils')} className="hover:text-[#b88a2c] transition-colors">
                  Essential Oils & Accords
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.botanicals} onClick={(event) => handleNav(event, 'botanicals')} className="hover:text-[#b88a2c] transition-colors">
                  Botanical Ingredients & Roots
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.packaging} onClick={(event) => handleNav(event, 'packaging')} className="hover:text-[#b88a2c] transition-colors">
                  Export Packaging Options
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.quality} onClick={(event) => handleNav(event, 'quality')} className="hover:text-[#b88a2c] transition-colors">
                  Quality Assurance & Testing
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.about} onClick={(event) => handleNav(event, 'about')} className="hover:text-[#b88a2c] transition-colors">
                  About Our Sourcing House
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.contact} onClick={(event) => handleNav(event, 'contact')} className="hover:text-[#b88a2c] transition-colors">
                  Contact the Trade Desk
                </a>
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
                  <span>Request Lot Documents</span>
                </button>
              </li>
              <li>
                <button onClick={() => openQuoteModal()} className="hover:text-[#b88a2c] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#b88a2c]" />
                  <span>Request B2B Quote</span>
                </button>
              </li>
              <li>
                <a href={PAGE_ROUTES.payments} onClick={(event) => handleNav(event, 'payments')} className="hover:text-[#b88a2c] transition-colors">
                  Commercial Terms
                </a>
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
                <div className="space-y-1 font-mono text-[10px]"><a href="mailto:sales@ancientindianbotanicals.com" className="block hover:text-[#b88a2c]">sales@ancientindianbotanicals.com</a><a href="mailto:office@ancientindianbotanicals.com" className="block hover:text-[#b88a2c]">office@ancientindianbotanicals.com</a></div>
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
          <strong className="text-[#dfcfad]">Commercial notice:</strong> Ancient Indian Botanicals is incorporated in India. Product information is supplied for commercial evaluation and does not constitute therapeutic claims or medical advice. Specifications, origin, availability and supporting documents are confirmed in writing for each approved lot and enquiry.
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#b88a2c]/30 text-xs text-[#82966f]">
          <p>© {new Date().getFullYear()} Ancient Indian Botanicals. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 text-[11px]">
            <a href={PAGE_ROUTES.terms} onClick={(event) => handleNav(event, 'terms')} className="hover:text-[#fbf7ed]">Terms of Trade</a>
            <a href={PAGE_ROUTES.shipping} onClick={(event) => handleNav(event, 'shipping')} className="hover:text-[#fbf7ed]">Export Shipping Policy</a>
            <a href={PAGE_ROUTES.privacy} onClick={(event) => handleNav(event, 'privacy')} className="hover:text-[#fbf7ed]">Privacy Policy</a>
            <a href={PAGE_ROUTES.refunds} onClick={(event) => handleNav(event, 'refunds')} className="hover:text-[#fbf7ed]">Claims & Quality Resolution</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
