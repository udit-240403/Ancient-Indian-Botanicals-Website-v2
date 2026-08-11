import React, { useState } from 'react';
import { X, ShieldCheck, Search, FileText, CheckCircle, Download, AlertCircle } from 'lucide-react';
import { BOTANICAL_PRODUCTS } from '../data/products';

interface VerifyCoaModalProps {
  onClose: () => void;
  onOpenQuote: (productName?: string) => void;
}

export const VerifyCoaModal: React.FC<VerifyCoaModalProps> = ({ onClose, onOpenQuote }) => {
  const [searchLotNumber, setSearchLotNumber] = useState<string>('LOT-ASH-2026-0412');
  const [searchedProduct, setSearchedProduct] = useState(BOTANICAL_PRODUCTS[0]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = (lot: string) => {
    setSearchLotNumber(lot);
    const found = BOTANICAL_PRODUCTS.find(
      (p) => p.coaDetails.batchNumber.toLowerCase() === lot.trim().toLowerCase() || p.slug.toLowerCase().includes(lot.trim().toLowerCase())
    );
    if (found) {
      setSearchedProduct(found);
      setErrorMsg(null);
    } else {
      setErrorMsg(`No batch records found matching "${lot}". Please verify the lot number on your sample container or contact the trade desk.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#062b23] border border-[#b88a2c] text-[#fbf7ed] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl my-6">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#083a30] border-b border-[#b88a2c]/40 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#b88a2c]" />
            <div>
              <span className="text-[10px] uppercase tracking-eyebrow text-[#82966f] font-semibold">
                Lot Traceability & Testing Registry
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#fbf7ed]">
                Verify Batch Certificate of Analysis (COA)
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#82966f] hover:text-[#fbf7ed] transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Search Box & Quick Sample Lots */}
          <div className="space-y-3">
            <label className="block text-xs uppercase tracking-eyebrow text-[#82966f] font-medium">
              Enter Batch / Lot Reference Number:
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#82966f] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchLotNumber}
                  onChange={(e) => setSearchLotNumber(e.target.value)}
                  placeholder="e.g. LOT-ASH-2026-0412"
                  className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] pl-10 pr-4 py-3 focus:outline-none focus:border-[#b88a2c]"
                />
              </div>
              <button
                onClick={() => handleSearch(searchLotNumber)}
                className="bg-[#b88a2c] hover:bg-[#967020] text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-6 py-3 cursor-pointer shrink-0"
              >
                Inspect Record
              </button>
            </div>

            {/* Available Sample Batches */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-[#82966f]">Verified Sample Lots:</span>
              {BOTANICAL_PRODUCTS.slice(0, 4).map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSearch(p.coaDetails.batchNumber)}
                  className={`px-2.5 py-1 text-[11px] border font-mono transition-colors cursor-pointer ${
                    searchedProduct.id === p.id && !errorMsg
                      ? 'bg-[#b88a2c] text-[#062b23] border-[#b88a2c] font-bold'
                      : 'bg-[#083a30] text-[#f2ead9] border-[#b88a2c]/30 hover:border-[#b88a2c]'
                  }`}
                >
                  {p.coaDetails.batchNumber}
                </button>
              ))}
            </div>
          </div>

          {errorMsg ? (
            <div className="p-4 bg-[#083a30] border border-[#9f3d32] text-[#fbf7ed] text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-[#9f3d32] shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Lot Record Not Found</p>
                <p>{errorMsg}</p>
              </div>
            </div>
          ) : (
            /* Verified COA Document Sheet */
            <div className="bg-[#083a30] border border-[#b88a2c]/40 p-6 space-y-6 shadow-lg">
              
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#b88a2c]/30 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#062b23] border border-[#b88a2c]/40 text-[#b88a2c] text-[10px] uppercase tracking-eyebrow px-2.5 py-0.5 font-bold">
                      VERIFIED LOT RECORD
                    </span>
                    <span className="text-xs text-[#82966f]">Test Date: {searchedProduct.coaDetails.testDate}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#fbf7ed] mt-1">
                    {searchedProduct.name}
                  </h3>
                  <p className="font-serif italic text-sm text-[#b88a2c]">
                    {searchedProduct.botanicalName}
                  </p>
                </div>

                <div className="text-right border-l sm:border-l-0 border-[#b88a2c]/20 pl-3 sm:pl-0">
                  <span className="text-[10px] text-[#82966f] uppercase tracking-eyebrow block">Batch Number</span>
                  <span className="font-mono text-lg font-bold text-[#b88a2c]">{searchedProduct.coaDetails.batchNumber}</span>
                </div>
              </div>

              {/* Provenance & Quality Notes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-[#062b23] border border-[#b88a2c]/20">
                  <span className="text-[10px] text-[#82966f] uppercase tracking-eyebrow block mb-1">Harvest Origin</span>
                  <span className="font-semibold text-[#fbf7ed]">{searchedProduct.coaDetails.harvestRegion}</span>
                </div>
                <div className="p-3 bg-[#062b23] border border-[#b88a2c]/20">
                  <span className="text-[10px] text-[#82966f] uppercase tracking-eyebrow block mb-1">Assay / Purity Marker</span>
                  <span className="font-semibold text-[#b88a2c]">
                    {searchedProduct.specifications.activeMarkers || searchedProduct.coaDetails.purityPercentage || 'Assay Standard Compliant'}
                  </span>
                </div>
              </div>

              {/* GC/MS Breakdown if available */}
              {searchedProduct.coaDetails.gcmsProfile && (
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-eyebrow text-[#b88a2c] block">
                    GC/MS Chromatography Profile (Gas Chromatography / Mass Spectrometry):
                  </span>
                  <div className="border border-[#b88a2c]/30 divide-y divide-[#b88a2c]/20 text-xs bg-[#062b23]">
                    <div className="p-2.5 grid grid-cols-3 font-semibold text-[#82966f] uppercase tracking-eyebrow text-[10px]">
                      <span>Compound Identity</span>
                      <span>Relative Peak %</span>
                      <span className="text-right">Monograph Status</span>
                    </div>
                    {searchedProduct.coaDetails.gcmsProfile.map((item, idx) => (
                      <div key={idx} className="p-2.5 grid grid-cols-3 items-center">
                        <span className="font-medium text-[#fbf7ed]">{item.compound}</span>
                        <span className="font-bold text-[#b88a2c]">{item.percentage}</span>
                        <span className="text-right">
                          <span className="bg-[#083a30] text-[#82966f] border border-[#b88a2c]/30 text-[10px] px-2 py-0.5 font-medium">
                            {item.status}
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Heavy Metals & Microbial Safety */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-[#062b23] border border-[#b88a2c]/20 space-y-1">
                  <span className="text-[10px] text-[#82966f] uppercase tracking-eyebrow font-semibold block">Heavy Metals Limits</span>
                  <p className="text-[#fbf7ed] font-light">{searchedProduct.coaDetails.heavyMetals}</p>
                </div>
                <div className="p-3 bg-[#062b23] border border-[#b88a2c]/20 space-y-1">
                  <span className="text-[10px] text-[#82966f] uppercase tracking-eyebrow font-semibold block">Microbial Limits</span>
                  <p className="text-[#fbf7ed] font-light">{searchedProduct.coaDetails.microbialLimit}</p>
                </div>
              </div>

              {/* Quality Director Sign-off */}
              <div className="p-4 bg-[#062b23] border-l-2 border-[#b88a2c] text-xs text-[#f2ead9]/90 italic">
                "{searchedProduct.coaDetails.qualityDirectorNote}"
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-[10px] text-[#7f7b6f]">
                  Complete certified PDF documentation supplied with approved commercial shipments.
                </span>

                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote(searchedProduct.name);
                  }}
                  className="w-full sm:w-auto bg-[#b88a2c] hover:bg-[#967020] text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-6 py-3 cursor-pointer"
                >
                  Request Lot Sample / Quote
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
