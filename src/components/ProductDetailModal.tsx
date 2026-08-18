import React from 'react';
import { BotanicalProduct } from '../types';
import { X, ShieldCheck, FileText, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { getProductPresentation } from '../data/productPresentation';

interface ProductDetailModalProps {
  product: BotanicalProduct | null;
  onClose: () => void;
  onOpenQuote: (productName: string) => void;
  onVerifyCoa: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onOpenQuote,
  onVerifyCoa
}) => {
  if (!product) return null;
  const presentation = getProductPresentation(product);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#062b23] border border-[#b88a2c] text-[#fbf7ed] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl my-8">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#083a30] border-b border-[#b88a2c]/40 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <span className="bg-[#062b23] border border-[#b88a2c]/40 text-[#b88a2c] text-xs font-semibold uppercase tracking-eyebrow px-3 py-1">
              {product.badgeNumber}
            </span>
            <div>
              <span className="text-[10px] uppercase tracking-eyebrow text-[#82966f]">
                {product.category.replace('-', ' ')} · {product.subFamily}
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#fbf7ed]">
                {product.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close product specifications"
            className="p-2 text-[#82966f] hover:text-[#fbf7ed] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Top Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-5 relative aspect-[4/3] border border-[#b88a2c]/30 overflow-hidden bg-[#083a30]">
              <img
                src={presentation.image}
                alt={product.name}
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="md:col-span-7 space-y-4">
              <div>
                <p className="font-serif italic text-lg text-[#b88a2c]">
                  {product.botanicalName}
                </p>
                <p className="text-xs text-[#82966f] uppercase tracking-eyebrow font-medium pt-0.5">
                  Origin: {product.harvestOrigin}
                </p>
              </div>

              <p className="text-xs text-[#f2ead9]/90 font-light leading-relaxed">
                {presentation.summary}
              </p>

              {/* Notice */}
              <div className="p-3 bg-[#083a30] border border-[#b88a2c]/30 flex items-start gap-2 text-xs text-[#f2ead9]/80">
                <AlertCircle className="w-4 h-4 text-[#b88a2c] shrink-0 mt-0.5" />
                <span>
                  Availability, active markers, and documentation are confirmed lot by lot against approved buyer enquiries.
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote(product.name);
                  }}
                  className="bg-[#b88a2c] hover:bg-[#967020] text-[#062b23] font-semibold text-xs uppercase tracking-eyebrow px-6 py-3 flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Request Product Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onVerifyCoa();
                  }}
                  className="bg-[#083a30] hover:bg-[#125344] border border-[#b88a2c]/40 text-[#fbf7ed] font-medium text-xs uppercase tracking-eyebrow px-5 py-3 flex items-center gap-2 cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#b88a2c]" />
                  <span>Request Lot Documents</span>
                </button>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="space-y-3 pt-4 border-t border-[#b88a2c]/30">
            <h3 className="font-serif text-xl font-semibold text-[#fbf7ed]">
              Indicative specification framework
            </h3>
            <p className="text-xs text-[#f2ead9]/75 leading-relaxed">
              Final values, tolerances, test methods and packaging are confirmed in writing for the approved supplier lot.
            </p>
            
            <div className="border border-[#b88a2c]/30 divide-y divide-[#b88a2c]/20 text-xs bg-[#083a30]">
              <div className="p-3.5 flex flex-col sm:flex-row justify-between gap-2">
                <span className="text-[#82966f] uppercase tracking-eyebrow font-medium sm:w-1/3">Appearance & Form</span>
                <span className="text-[#fbf7ed] sm:w-2/3 font-light">{product.specifications.appearance}</span>
              </div>

              {product.specifications.aromaProfile && (
                <div className="p-3.5 flex flex-col sm:flex-row justify-between gap-2">
                  <span className="text-[#82966f] uppercase tracking-eyebrow font-medium sm:w-1/3">Aroma Profile</span>
                  <span className="text-[#fbf7ed] sm:w-2/3 font-light">{product.specifications.aromaProfile}</span>
                </div>
              )}

              {product.specifications.activeMarkers && (
                <div className="p-3.5 flex flex-col sm:flex-row justify-between gap-2">
                  <span className="text-[#82966f] uppercase tracking-eyebrow font-medium sm:w-1/3">Active Markers</span>
                  <span className="text-[#b88a2c] font-semibold sm:w-2/3">{product.specifications.activeMarkers}</span>
                </div>
              )}

              <div className="p-3.5 flex flex-col sm:flex-row justify-between gap-2">
                <span className="text-[#82966f] uppercase tracking-eyebrow font-medium sm:w-1/3">Shelf Life & Storage</span>
                <span className="text-[#fbf7ed] sm:w-2/3 font-light">{product.specifications.shelfLife}</span>
              </div>

              <div className="p-3.5 flex flex-col sm:flex-row justify-between gap-2">
                <span className="text-[#82966f] uppercase tracking-eyebrow font-medium sm:w-1/3">Standard Export Packaging</span>
                <div className="sm:w-2/3 space-y-1">
                  {product.specifications.packagingOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#b88a2c]" />
                      <span className="text-[#fbf7ed] font-light">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lot documentation request */}
          <div className="p-5 bg-[#083a30] border border-[#b88a2c]/40 space-y-3">
            <div className="flex items-center gap-2 border-b border-[#b88a2c]/30 pb-3">
              <FileText className="w-5 h-5 text-[#b88a2c]" />
              <h4 className="font-serif text-lg font-semibold text-[#fbf7ed]">
                Lot-specific documentation
              </h4>
            </div>
            <p className="text-xs text-[#f2ead9]/85 leading-relaxed">
              COA, botanical identity, marker or GC/MS data, contaminant testing, safety documents and origin records are supplied only where applicable and available for the specific offered lot. No sample record on this website represents a current commercial batch.
            </p>
            <button
              onClick={() => {
                onClose();
                onVerifyCoa();
              }}
              className="bg-[#062b23] hover:bg-[#125344] border border-[#b88a2c]/40 text-[#fbf7ed] font-medium text-xs uppercase tracking-eyebrow px-5 py-3 flex items-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#b88a2c]" />
              <span>Request document verification</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
