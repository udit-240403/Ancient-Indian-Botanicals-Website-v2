import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { B2BQuoteRequest } from '../types';

interface QuoteFormModalProps {
  initialProductName?: string;
  onClose: () => void;
}

export const QuoteFormModal: React.FC<QuoteFormModalProps> = ({
  initialProductName = '',
  onClose
}) => {
  const [formData, setFormData] = useState<B2BQuoteRequest>({
    fullName: '',
    companyName: '',
    country: '',
    email: '',
    phoneWhatsapp: '',
    selectedProduct: initialProductName || 'Ashwagandha Root & Standardized Extract',
    preferredForm: 'Standardized Extract Powder',
    estimatedQuantity: '100 kg - 500 kg',
    applicationUse: 'Nutraceutical / Dietary Supplement',
    destinationPort: 'Hamburg, Germany',
    packagingPreference: '25kg HDPE Export Drum',
    documentationNeeds: ['Certificate of Analysis (COA)', 'MSDS / Safety Data Sheet', 'Batch Traceability Record'],
    additionalNotes: '',
    consent: true
  });

  const [emailPrepared, setEmailPrepared] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.companyName || !formData.email) {
      alert('Please fill in your name, company, and email address.');
      return;
    }

    const subject = `B2B botanical enquiry — ${formData.selectedProduct}`;
    const body = [
      'Hello Ancient Indian Botanicals,',
      '',
      'Please review the following commercial requirement:',
      `Name: ${formData.fullName}`,
      `Company: ${formData.companyName}`,
      `Business email: ${formData.email}`,
      `Country / phone: ${formData.phoneWhatsapp || 'Not provided'}`,
      `Product: ${formData.selectedProduct}`,
      `Preferred form: ${formData.preferredForm}`,
      `Estimated quantity: ${formData.estimatedQuantity}`,
      `Destination: ${formData.destinationPort || 'To be confirmed'}`,
      `Requested documents: ${formData.documentationNeeds.join(', ') || 'To be confirmed'}`,
      `Additional notes: ${formData.additionalNotes || 'None'}`,
      '',
      'I understand that availability, specification, documentation and pricing are confirmed in writing for each approved lot.',
    ].join('\n');

    setEmailPrepared(true);
    window.location.href = `mailto:office@ancientindianbotanicals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDocCheckbox = (doc: string) => {
    setFormData((prev) => {
      const exists = prev.documentationNeeds.includes(doc);
      return {
        ...prev,
        documentationNeeds: exists
          ? prev.documentationNeeds.filter((d) => d !== doc)
          : [...prev.documentationNeeds, doc]
      };
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#062b23] border border-[#b88a2c] text-[#fbf7ed] w-full max-w-3xl max-h-[92vh] overflow-y-auto relative shadow-2xl my-6">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#083a30] border-b border-[#b88a2c]/40 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <span className="text-[10px] uppercase tracking-eyebrow text-[#82966f] font-semibold">
              B2B Commercial Enquiry Desk
            </span>
            <h2 className="font-serif text-2xl font-semibold text-[#fbf7ed]">
              Request Botanical Specification & Quotation
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close commercial enquiry form"
            className="p-2 text-[#82966f] hover:text-[#fbf7ed] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          
          {emailPrepared ? (
            /* Confirmation State */
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 bg-[#083a30] border-2 border-[#b88a2c] rounded-full flex items-center justify-center mx-auto text-[#b88a2c]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-eyebrow text-[#82966f]">Enquiry email prepared</span>
                <h3 className="font-serif text-3xl text-[#fbf7ed]">Review and send from your email app</h3>
              </div>
              
              <p className="text-xs text-[#f2ead9]/85 max-w-md mx-auto leading-relaxed">
                Your email app should open with the requirement prefilled for <strong className="text-[#b88a2c]">{formData.selectedProduct}</strong>. Please review it and send it to <strong className="text-[#fbf7ed]">office@ancientindianbotanicals.com</strong>.
              </p>

              <div className="p-4 bg-[#083a30] border border-[#b88a2c]/30 text-xs text-[#82966f] max-w-md mx-auto">
                Nothing has been submitted automatically. No payment or financial transaction was initiated. Pricing and lot availability are confirmed only after written review.
              </div>

              <button
                onClick={onClose}
                className="bg-[#b88a2c] hover:bg-[#967020] text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-8 py-3.5 cursor-pointer"
              >
                Close & Return to Catalogue
              </button>
            </div>
          ) : (
            /* Form View */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="p-4 bg-[#083a30] border border-[#b88a2c]/30 text-xs text-[#f2ead9]/90 space-y-1">
                <span className="text-[#b88a2c] font-semibold block uppercase tracking-eyebrow">Export Trade Notice:</span>
                <p>
                  Share your botanical requirement, volume, destination, and technical standards. We will match available harvest lots and compile the necessary documentation before quotation.
                </p>
              </div>

              {/* Personal & Company Information */}
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-semibold text-[#b88a2c] border-b border-[#b88a2c]/20 pb-1">
                  1. Contact & Organization Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Arthur Vance"
                      className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. Apothecary Formulations Inc."
                      className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. procurement@apothecary.com"
                      className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                      Country & Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.phoneWhatsapp}
                      onChange={(e) => setFormData({ ...formData, phoneWhatsapp: e.target.value })}
                      placeholder="e.g. Germany, +49 170 1234567"
                      className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
                    />
                  </div>
                </div>
              </div>

              {/* Product Specification Requirements */}
              <div className="space-y-3 pt-2">
                <h3 className="font-serif text-lg font-semibold text-[#b88a2c] border-b border-[#b88a2c]/20 pb-1">
                  2. Product Specification & Order Volume
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                      Target Botanical / Ingredient *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.selectedProduct}
                      onChange={(e) => setFormData({ ...formData, selectedProduct: e.target.value })}
                      placeholder="e.g. Ashwagandha, Sandalwood Oil, Boswellia"
                      className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                      Preferred Physical Form / Grade
                    </label>
                    <select
                      value={formData.preferredForm}
                      onChange={(e) => setFormData({ ...formData, preferredForm: e.target.value })}
                      className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
                    >
                      <option value="Standardized Extract Powder">Standardized Extract Powder</option>
                      <option value="Micronized Fine Powder (80-100 mesh)">Micronized Fine Powder (80-100 mesh)</option>
                      <option value="Whole Dried / Cut Material">Whole Dried / Cut Material</option>
                      <option value="Pure Essential Oil (100% Steam Distilled)">Pure Essential Oil (100% Steam Distilled)</option>
                      <option value="Hydrosol / Floral Water">Hydrosol / Floral Water</option>
                      <option value="Custom Specification Match">Custom Specification Match</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                      Estimated Order Volume
                    </label>
                    <select
                      value={formData.estimatedQuantity}
                      onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                      className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
                    >
                      <option value="Sample Order (100g - 1kg)">Sample Order (100g - 1kg)</option>
                      <option value="Trial Batch (10 kg - 50 kg)">Trial Batch (10 kg - 50 kg)</option>
                      <option value="100 kg - 500 kg">100 kg - 500 kg</option>
                      <option value="1 Metric Ton +">1 Metric Ton +</option>
                      <option value="Annual Supply Contract">Annual Supply Contract</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                      Destination Country & Port
                    </label>
                    <input
                      type="text"
                      value={formData.destinationPort}
                      onChange={(e) => setFormData({ ...formData, destinationPort: e.target.value })}
                      placeholder="e.g. Hamburg Port, Germany / Port of Los Angeles, USA"
                      className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
                    />
                  </div>
                </div>
              </div>

              {/* Documentation Checkboxes */}
              <div className="space-y-2 pt-2">
                <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f]">
                  Required Quality & Shipment Documentation:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {[
                    'Certificate of Analysis (COA)',
                    'MSDS / Safety Data Sheet',
                    'GC/MS Fingerprint Analysis (Oils)',
                    'Heavy Metals & Microbial Test Report',
                    'Phytosanitary Certificate',
                    'Certificate of Origin'
                  ].map((doc, idx) => (
                    <label
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-[#083a30] border border-[#b88a2c]/30 cursor-pointer hover:border-[#b88a2c]"
                    >
                      <input
                        type="checkbox"
                        checked={formData.documentationNeeds.includes(doc)}
                        onChange={() => handleDocCheckbox(doc)}
                        className="accent-[#b88a2c]"
                      />
                      <span className="text-[#fbf7ed]">{doc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                  Additional Specification Details or Application Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  placeholder="Specify target active-marker range, particle size, solvent constraints, or custom packaging preferences..."
                  className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
                />
              </div>

              {/* Submit button */}
              <div className="pt-4 border-t border-[#b88a2c]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] text-[#7f7b6f]">
                  This prepares an email in your own email app; nothing is submitted until you send it.
                </span>

                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[#b88a2c] hover:bg-[#967020] text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-8 py-3.5 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                >
                  <span>Prepare Enquiry Email</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
