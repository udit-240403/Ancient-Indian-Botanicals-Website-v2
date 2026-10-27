import React, { useState } from 'react';
import { X, ShieldCheck, Mail, AlertCircle, ArrowRight } from 'lucide-react';

interface VerifyCoaModalProps {
  onClose: () => void;
  onOpenQuote: (productName?: string) => void;
  initialProductName?: string;
}

export const VerifyCoaModal: React.FC<VerifyCoaModalProps> = ({ onClose, onOpenQuote, initialProductName = '' }) => {
  const [lotReference, setLotReference] = useState('');
  const [productName, setProductName] = useState(initialProductName);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const buildVerificationEmail = () => {
    const subject = `Lot document verification — ${lotReference.trim() || productName.trim()}`;
    const body = [
      'Hello Ancient Indian Botanicals,', '',
      'Please verify the available documentation for the following material:',
      `Name: ${fullName.trim()}`,
      `Company: ${companyName.trim()}`,
      `Business email: ${email.trim()}`,
      `Lot / reference: ${lotReference.trim() || 'Not available'}`,
      `Product: ${productName.trim() || 'Not specified'}`, '',
      'Please confirm which lot-specific documents are available, such as COA, botanical identity, marker or GC/MS analysis, contaminant testing, safety data and origin records.',
    ].join('\n');
    return `mailto:office@ancientindianbotanicals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submitVerificationRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!lotReference.trim() && !productName.trim()) {
      alert('Please enter a lot reference or product name.');
      return;
    }
    setStatus('sending');
    setStatusMessage('');
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          companyName,
          email,
          selectedProduct: `Document request — ${productName.trim() || lotReference.trim()}`,
          additionalNotes: `Lot / sample reference: ${lotReference.trim() || 'Not available'}`,
          documentationNeeds: ['Lot-specific documents', 'COA / specification review'],
          sourcePath: window.location.pathname,
          consent: true,
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'Secure submission is unavailable.');
      setStatus('sent');
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Secure submission is unavailable.');
      setStatus('fallback');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#062b23] border border-[#b88a2c] text-[#fbf7ed] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl my-6">
        <div className="sticky top-0 bg-[#083a30] border-b border-[#b88a2c]/40 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#b88a2c]" />
            <div>
              <span className="text-[10px] uppercase tracking-eyebrow text-[#82966f] font-semibold">Lot-level document desk</span>
              <h2 className="font-serif text-2xl font-semibold text-[#fbf7ed]">Request specification or lot documents</h2>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close document verification form" className="p-2 text-[#82966f] hover:text-[#fbf7ed] transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={submitVerificationRequest} className="p-6 md:p-8 space-y-6">
          <div className="p-4 bg-[#083a30] border border-[#b88a2c]/30 text-xs text-[#f2ead9]/90 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#b88a2c] shrink-0 mt-0.5" />
            <p>Specifications and COAs are checked against the proposed product or actual supplier lot and shared privately where applicable. We do not present a demonstration COA as a current commercial record.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="document-name" className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">Your name *</label>
              <input id="document-name" required autoComplete="name" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
            <div>
              <label htmlFor="document-company" className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">Company *</label>
              <input id="document-company" required autoComplete="organization" type="text" value={companyName} onChange={(event) => setCompanyName(event.target.value)} className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="document-email" className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">Business email *</label>
              <input id="document-email" required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">Lot / sample reference</label>
              <input type="text" value={lotReference} onChange={(event) => setLotReference(event.target.value)} placeholder="Reference shown on your sample" className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">Product name</label>
              <input type="text" value={productName} onChange={(event) => setProductName(event.target.value)} placeholder="e.g. Ashwagandha root powder" className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
          </div>

          <div className="p-4 border border-[#b88a2c]/25 text-xs text-[#f2ead9]/80 space-y-2">
            <p className="font-semibold text-[#b88a2c]">Documents that may be checked where applicable:</p>
            <p>COA · botanical identity · marker or GC/MS analysis · contaminant testing · safety data · origin and packing records</p>
          </div>

          {status === 'sent' && (
            <div className="p-4 bg-[#083a30] border border-[#a8c76b]/40 text-xs text-[#f2ead9]/90 flex items-start gap-3" role="status">
              <Mail className="w-5 h-5 text-[#a8c76b] shrink-0" />
              <p>Your document request has been received. Our trade desk will reply to {email} after checking the proposed product or lot reference.</p>
            </div>
          )}
          {status === 'fallback' && (
            <div className="p-4 bg-[#083a30] border border-[#d4a43d]/40 text-xs text-[#f2ead9]/90 flex items-start gap-3" role="alert">
              <Mail className="w-5 h-5 text-[#d4a43d] shrink-0" />
              <p>{statusMessage} <a href={buildVerificationEmail()} className="font-bold text-[#d4a43d] underline">Open the prepared email instead.</a></p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2 border-t border-[#b88a2c]/25">
            <button type="button" onClick={() => { onClose(); onOpenQuote(productName || 'Lot-specific documentation request'); }} className="text-xs text-[#f2ead9]/85 hover:text-[#b88a2c] transition-colors cursor-pointer">
              No lot reference? Start a general enquiry
            </button>
            <button type="submit" disabled={status === 'sending' || status === 'sent'} className="bg-[#b88a2c] hover:bg-[#967020] disabled:cursor-wait disabled:opacity-60 text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-6 py-3 flex items-center justify-center gap-2 cursor-pointer">
              <span>{status === 'sending' ? 'Sending request…' : status === 'sent' ? 'Request received' : 'Send document request'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
