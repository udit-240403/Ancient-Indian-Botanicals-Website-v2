import React, { useState } from 'react';
import { Mail, MessageSquareText, X } from 'lucide-react';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface ContactDockProps {
  openQuoteModal: () => void;
  openContactPage: () => void;
}

export const ContactDock: React.FC<ContactDockProps> = ({ openQuoteModal, openContactPage }) => {
  const [open, setOpen] = useState(false);
  const { language } = useBuyerLanguage();
  const copy = {
    en: { desk: 'Trade enquiry desk', help: 'How can we help?', product: 'Start a product enquiry', productNote: 'Prepare a structured B2B requirement', emailDesk: 'Email the right desk', emailDeskNote: 'Sales, sourcing and general contact', emailNow: 'Send email now', close: 'Close contact options', open: 'Open email and enquiry options', title: 'Email / Enquire', label: 'Email / Enquire' },
    de: { desk: 'Handelsanfragen', help: 'Wie können wir helfen?', product: 'Produktanfrage starten', productNote: 'Strukturierte B2B-Anforderung vorbereiten', emailDesk: 'Passende Stelle per E-Mail', emailDeskNote: 'Vertrieb, Beschaffung und allgemeiner Kontakt', emailNow: 'Jetzt E-Mail senden', close: 'Kontaktoptionen schließen', open: 'E-Mail- und Anfrageoptionen öffnen', title: 'E-Mail / Anfrage', label: 'E-Mail / Anfrage' },
    fr: { desk: 'Service demandes commerciales', help: 'Comment pouvons-nous aider ?', product: 'Démarrer une demande produit', productNote: 'Préparer un besoin B2B structuré', emailDesk: 'Écrire au bon service', emailDeskNote: 'Ventes, sourcing et contact général', emailNow: 'Envoyer un e-mail', close: 'Fermer les options de contact', open: 'Ouvrir les options e-mail et demande', title: 'E-mail / Demande', label: 'E-mail / Demande' },
    es: { desk: 'Mesa de consultas comerciales', help: '¿Cómo podemos ayudar?', product: 'Iniciar consulta de producto', productNote: 'Preparar un requisito B2B estructurado', emailDesk: 'Escribir al área adecuada', emailDeskNote: 'Ventas, abastecimiento y contacto general', emailNow: 'Enviar correo ahora', close: 'Cerrar opciones de contacto', open: 'Abrir opciones de correo y consulta', title: 'Correo / Consulta', label: 'Correo / Consulta' },
  }[language];

  return (
    <div className="contact-dock fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-[46] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="w-[min(21rem,calc(100vw-2rem))] overflow-hidden border border-[#d4a43d]/55 bg-[#fbf7ed] text-[#062b23] shadow-[0_24px_70px_rgba(0,0,0,.34)]">
          <div className="flex items-start justify-between gap-4 bg-[#062b23] px-5 py-4 text-[#fbf7ed]">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-eyebrow text-[#d4a43d]">{copy.desk}</span>
              <p className="mt-1 font-serif text-xl font-semibold">{copy.help}</p>
            </div>
            <button onClick={() => setOpen(false)} aria-label={copy.close} className="p-1 text-[#f2ead9]/70 transition-colors hover:text-[#fbf7ed]">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2 p-3">
            <button
              onClick={() => { setOpen(false); openQuoteModal(); }}
              className="flex w-full items-center gap-3 border border-[#b88a2c]/30 bg-[#f3eddf] p-3.5 text-left transition-colors hover:border-[#b88a2c]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#062b23] text-[#d4a43d]"><MessageSquareText className="h-4.5 w-4.5" /></span>
              <span><strong className="block text-sm">{copy.product}</strong><small className="mt-0.5 block text-[10px] text-[#47685d]">{copy.productNote}</small></span>
            </button>
            <button
              onClick={() => { setOpen(false); openContactPage(); }}
              className="flex w-full items-center gap-3 border border-[#b88a2c]/30 p-3.5 text-left transition-colors hover:border-[#b88a2c]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#b88a2c]/40 text-[#765411]"><Mail className="h-4.5 w-4.5" /></span>
              <span><strong className="block text-sm">{copy.emailDesk}</strong><small className="mt-0.5 block text-[10px] text-[#47685d]">{copy.emailDeskNote}</small></span>
            </button>
            <a
              href="mailto:sales@ancientindianbotanicals.com?subject=Botanical%20product%20enquiry"
              onClick={() => setOpen(false)}
              className="flex w-full items-center gap-3 border border-[#b88a2c]/30 bg-[#062b23] p-3.5 text-left text-[#fbf7ed] transition-colors hover:bg-[#083a30]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d4a43d]/45 text-[#d4a43d]"><Mail className="h-4.5 w-4.5" /></span>
              <span><strong className="block text-sm">{copy.emailNow}</strong><small className="mt-0.5 block text-[10px] text-[#f2ead9]/65">sales@ancientindianbotanicals.com</small></span>
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? copy.close : copy.open}
        title={copy.title}
        className="contact-dock-trigger flex h-14 items-center justify-center gap-2 rounded-full border border-[#e3bd67]/70 bg-[#b88a2c] px-4 text-[#041e18] shadow-[0_14px_38px_rgba(0,0,0,.38)] transition-all hover:-translate-y-1 hover:bg-[#d4a43d] sm:h-15 sm:px-5 lg:w-15 lg:px-0"
      >
        {open ? <X className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
        <span className="text-[9px] font-extrabold uppercase tracking-[0.13em] sm:text-[10px] sm:tracking-[0.16em] lg:sr-only">{copy.label}</span>
      </button>
    </div>
  );
};
