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
  const [emailPrepared, setEmailPrepared] = useState(false);

  const prepareVerificationEmail = () => {
    if (!lotReference.trim() && !productName.trim()) {
      alert('Please enter a lot reference or product name.');
      return;
    }

    const subject = `Lot document verification — ${lotReference.trim() || productName.trim()}`;
    const body = [
      'Hello Ancient Indian Botanicals,',
      '',
      'Please verify the available documentation for the following material:',
      `Lot / reference: ${lotReference.trim() || 'Not available'}`,
      `Product: ${productName.trim() || 'Not specified'}`,
      '',
      'Please confirm which lot-specific documents are available, such as COA, botanical identity, marker or GC/MS analysis, contaminant testing, safety data and origin records.',
    ].join('\n');

    setEmailPrepared(true);
    window.location.href = `mailto:office@ancientindianbotanicals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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

        <div className="p-6 md:p-8 space-y-6">
          <div className="p-4 bg-[#083a30] border border-[#b88a2c]/30 text-xs text-[#f2ead9]/90 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#b88a2c] shrink-0 mt-0.5" />
            <p>Specifications and COAs are checked against the proposed product or actual supplier lot and shared privately where applicable. We do not present a demonstration COA as a current commercial record.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

          {emailPrepared && (
            <div className="p-4 bg-[#083a30] border border-[#a8c76b]/40 text-xs text-[#f2ead9]/90 flex items-start gap-3">
              <Mail className="w-5 h-5 text-[#a8c76b] shrink-0" />
              <p>Your email app should open with the verification request prepared. Review and send it to office@ancientindianbotanicals.com. Nothing is submitted automatically.</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2 border-t border-[#b88a2c]/25">
            <button onClick={() => { onClose(); onOpenQuote(productName || 'Lot-specific documentation request'); }} className="text-xs text-[#f2ead9]/85 hover:text-[#b88a2c] transition-colors cursor-pointer">
              No lot reference? Start a general enquiry
            </button>
            <button onClick={prepareVerificationEmail} className="bg-[#b88a2c] hover:bg-[#967020] text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-6 py-3 flex items-center justify-center gap-2 cursor-pointer">
              <span>Prepare verification email</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
