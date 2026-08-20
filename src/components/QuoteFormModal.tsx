import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, X } from 'lucide-react';
import { B2BQuoteRequest } from '../types';

interface QuoteFormModalProps {
  initialProductName?: string;
  onClose: () => void;
}

const inputClassName =
  'w-full rounded-lg border border-[#d7c6a5] bg-white px-4 py-3 text-sm text-[#16352d] outline-none transition placeholder:text-[#7b817b] focus:border-[#b88a2c] focus:ring-2 focus:ring-[#b88a2c]/15';

const labelClassName =
  'mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#50685f]';

export const QuoteFormModal: React.FC<QuoteFormModalProps> = ({
  initialProductName = '',
  onClose,
}) => {
  const [formData, setFormData] = useState<B2BQuoteRequest>({
    fullName: '',
    companyName: '',
    country: '',
    email: '',
    phoneWhatsapp: '',
    selectedProduct: initialProductName,
    preferredForm: '',
    estimatedQuantity: 'Not sure yet',
    applicationUse: '',
    destinationPort: '',
    packagingPreference: '',
    documentationNeeds: [],
    additionalNotes: '',
    consent: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'sending' | 'sent' | 'fallback'
  >('idle');
  const [website, setWebsite] = useState('');

  const buildMailtoUrl = () => {
    const subject = `B2B botanical enquiry — ${formData.selectedProduct}`;
    const body = [
      'Hello Ancient Indian Botanicals,',
      '',
      'I would like to discuss the following requirement:',
      `Name: ${formData.fullName}`,
      `Company: ${formData.companyName}`,
      `Business email: ${formData.email}`,
      `Phone / WhatsApp: ${formData.phoneWhatsapp || 'Not provided'}`,
      `Product or requirement: ${formData.selectedProduct}`,
      `Approximate quantity: ${formData.estimatedQuantity}`,
      `Destination: ${formData.destinationPort || 'To be confirmed'}`,
      `Notes: ${formData.additionalNotes || 'None'}`,
      '',
      'Please contact me to confirm the suitable specification, packaging, documentation and quotation.',
    ].join('\n');

    return `mailto:sales@ancientindianbotanicals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.fullName || !formData.companyName || !formData.email || !formData.selectedProduct) {
      alert('Please add your name, company, email and product requirement.');
      return;
    }

    if (!formData.consent) {
      alert('Please confirm that we may contact you about this enquiry.');
      return;
    }

    setSubmissionStatus('sending');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website,
          sourcePath: window.location.pathname,
        }),
      });

      if (!response.ok) throw new Error('Enquiry service unavailable');
      setSubmissionStatus('sent');
    } catch {
      setSubmissionStatus('fallback');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#071c17]/80 p-3 backdrop-blur-md sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-heading"
        className="relative my-auto max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#c69a40]/55 bg-[#f7f1e5] shadow-[0_28px_90px_rgba(0,0,0,0.4)]"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-[#c69a40]/35 bg-[#073b30] px-5 py-5 text-[#fffaf0] sm:px-8">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d6ad59]">
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              About one minute
            </div>
            <h2 id="enquiry-heading" className="font-serif text-2xl font-semibold leading-tight sm:text-3xl">
              Tell us what you need.
            </h2>
            <p className="mt-1 max-w-lg text-xs leading-relaxed text-[#e8dfcf]/80 sm:text-sm">
              A short brief is enough. We will confirm specifications, packaging and documents with you.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close enquiry form"
            className="shrink-0 rounded-full border border-white/15 p-2 text-[#e8dfcf] transition hover:border-[#d6ad59] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {submissionStatus === 'sent' || submissionStatus === 'fallback' ? (
          <div className="px-6 py-12 text-center sm:px-10 sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#b88a2c]/45 bg-white text-[#9d741f] shadow-sm">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9d741f]">
              {submissionStatus === 'sent' ? 'Enquiry received' : 'One final step'}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-[#17362e]">
              {submissionStatus === 'sent'
                ? 'Thank you. We will review your requirement.'
                : 'Please send the prepared email.'}
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#50685f]">
              {submissionStatus === 'sent'
                ? `Our trade desk will reply to ${formData.email} to confirm the right product, specification and next steps.`
                : 'Direct submission is temporarily unavailable. Your details are ready in an email addressed to our sales desk.'}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {submissionStatus === 'fallback' && (
                <a
                  href={buildMailtoUrl()}
                  className="rounded-full bg-[#b88a2c] px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#062b23] transition hover:bg-[#cda348]"
                >
                  Open prepared email
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[#17362e]/25 px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#17362e] transition hover:border-[#17362e]"
              >
                Return to website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="enquiry-website">Website</label>
              <input id="enquiry-website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} />
            </div>
            <div className="mb-6 rounded-xl border border-[#d7c6a5] bg-white/70 px-4 py-3 text-sm leading-relaxed text-[#405b52]">
              <strong className="text-[#17362e]">Start with the basics.</strong> Grade, testing, private-label and export paperwork can be decided after we understand your requirement.
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="enquiry-name" className={labelClassName}>Your name *</label>
                <input
                  id="enquiry-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                  placeholder="Full name"
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-company" className={labelClassName}>Company *</label>
                <input
                  id="enquiry-company"
                  type="text"
                  autoComplete="organization"
                  required
                  value={formData.companyName}
                  onChange={(event) => setFormData({ ...formData, companyName: event.target.value })}
                  placeholder="Company name"
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-email" className={labelClassName}>Work email *</label>
                <input
                  id="enquiry-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  placeholder="name@company.com"
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-phone" className={labelClassName}>Phone / WhatsApp <span className="font-normal normal-case tracking-normal">(optional)</span></label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneWhatsapp}
                  onChange={(event) => setFormData({ ...formData, phoneWhatsapp: event.target.value })}
                  placeholder="Country code and number"
                  className={inputClassName}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="enquiry-product" className={labelClassName}>Product or requirement *</label>
                <input
                  id="enquiry-product"
                  type="text"
                  required
                  value={formData.selectedProduct}
                  onChange={(event) => setFormData({ ...formData, selectedProduct: event.target.value })}
                  placeholder="e.g. Ashwagandha powder, peppermint oil or private-label packaging"
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-quantity" className={labelClassName}>Approximate quantity</label>
                <select
                  id="enquiry-quantity"
                  value={formData.estimatedQuantity}
                  onChange={(event) => setFormData({ ...formData, estimatedQuantity: event.target.value })}
                  className={inputClassName}
                >
                  <option>Not sure yet</option>
                  <option>Sample / evaluation</option>
                  <option>1–25 kg</option>
                  <option>25–100 kg</option>
                  <option>100–500 kg</option>
                  <option>500 kg–2 MT</option>
                  <option>Above 2 MT</option>
                </select>
              </div>

              <div>
                <label htmlFor="enquiry-destination" className={labelClassName}>Destination</label>
                <input
                  id="enquiry-destination"
                  type="text"
                  autoComplete="country-name"
                  value={formData.destinationPort}
                  onChange={(event) => setFormData({ ...formData, destinationPort: event.target.value })}
                  placeholder="Country or port"
                  className={inputClassName}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="enquiry-notes" className={labelClassName}>Anything else? <span className="font-normal normal-case tracking-normal">(optional)</span></label>
                <textarea
                  id="enquiry-notes"
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(event) => setFormData({ ...formData, additionalNotes: event.target.value })}
                  placeholder="Intended use, preferred grade, packaging or documents — only if already known."
                  className={`${inputClassName} resize-y`}
                />
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#50685f]">
              <input
                type="checkbox"
                required
                checked={formData.consent}
                onChange={(event) => setFormData({ ...formData, consent: event.target.checked })}
                className="mt-0.5 h-4 w-4 accent-[#a97c24]"
              />
              <span>You may use these details to contact me about this enquiry. This is not an order or payment instruction.</span>
            </label>

            <div className="mt-7 border-t border-[#d7c6a5] pt-5">
              <div className="mb-5 grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase tracking-[0.11em] text-[#60766e]">
                <span>1 · We review</span>
                <span>2 · Confirm details</span>
                <span>3 · Share quotation</span>
              </div>

              <button
                type="submit"
                disabled={submissionStatus === 'sending'}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#b88a2c] px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#062b23] shadow-[0_10px_30px_rgba(184,138,44,0.2)] transition hover:-translate-y-0.5 hover:bg-[#cda348] disabled:cursor-wait disabled:opacity-60 sm:ml-auto sm:w-auto"
              >
                {submissionStatus === 'sending' ? 'Sending enquiry…' : 'Send enquiry'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
