import React, { useState } from 'react';
import { Mail, MessageSquareText, X } from 'lucide-react';

interface ContactDockProps {
  openQuoteModal: () => void;
  openContactPage: () => void;
}

export const ContactDock: React.FC<ContactDockProps> = ({ openQuoteModal, openContactPage }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[46] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="w-[min(21rem,calc(100vw-2rem))] overflow-hidden border border-[#d4a43d]/55 bg-[#fbf7ed] text-[#062b23] shadow-[0_24px_70px_rgba(0,0,0,.34)]">
          <div className="flex items-start justify-between gap-4 bg-[#062b23] px-5 py-4 text-[#fbf7ed]">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">Trade enquiry desk</span>
              <p className="mt-1 font-serif text-xl font-semibold">How can we help?</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close contact options" className="p-1 text-[#f2ead9]/70 transition-colors hover:text-[#fbf7ed]">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2 p-3">
            <button
              onClick={() => { setOpen(false); openQuoteModal(); }}
              className="flex w-full items-center gap-3 border border-[#b88a2c]/30 bg-[#f3eddf] p-3.5 text-left transition-colors hover:border-[#b88a2c]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#062b23] text-[#d4a43d]"><MessageSquareText className="h-4.5 w-4.5" /></span>
              <span><strong className="block text-sm">Start a product enquiry</strong><small className="mt-0.5 block text-[10px] text-[#47685d]">Prepare a structured B2B requirement</small></span>
            </button>
            <button
              onClick={() => { setOpen(false); openContactPage(); }}
              className="flex w-full items-center gap-3 border border-[#b88a2c]/30 p-3.5 text-left transition-colors hover:border-[#b88a2c]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b88a2c]/40 text-[#765411]"><Mail className="h-4.5 w-4.5" /></span>
              <span><strong className="block text-sm">Email the right desk</strong><small className="mt-0.5 block text-[10px] text-[#47685d]">Sales, sourcing and general contact</small></span>
            </button>
            <a
              href="mailto:sales@ancientindianbotanicals.com?subject=Botanical%20product%20enquiry"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 border border-[#b88a2c]/30 bg-[#062b23] p-3.5 text-left text-[#fbf7ed] transition-colors hover:bg-[#083a30]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4a43d]/45 text-[#d4a43d]"><Mail className="h-4.5 w-4.5" /></span>
              <span><strong className="block text-sm">Send email now</strong><small className="mt-0.5 block text-[10px] text-[#f2ead9]/65">sales@ancientindianbotanicals.com</small></span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? 'Close contact options' : 'Open email and enquiry options'}
        className="contact-dock-trigger flex h-14 items-center justify-center gap-2 rounded-full border border-[#e3bd67]/70 bg-[#b88a2c] px-4 text-[#041e18] shadow-[0_14px_38px_rgba(0,0,0,.38)] transition-all hover:-translate-y-1 hover:bg-[#d4a43d] sm:h-15 sm:px-5"
      >
        {open ? <X className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
        <span className="text-[9px] font-extrabold uppercase tracking-[0.13em] sm:text-[10px] sm:tracking-[0.16em]">Email / Enquire</span>
      </button>
    </div>
  );
};
