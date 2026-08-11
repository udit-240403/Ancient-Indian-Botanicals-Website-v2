import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle2, RefreshCw } from 'lucide-react';
import { SpecConsultationResult } from '../types';

interface AiSpecConsultantModalProps {
  onClose: () => void;
  onOpenQuote: (productName?: string) => void;
}

export const AiSpecConsultantModal: React.FC<AiSpecConsultantModalProps> = ({
  onClose,
  onOpenQuote
}) => {
  const [targetApplication, setTargetApplication] = useState<string>('Nutraceuticals & Dietary Supplements');
  const [desiredEffect, setDesiredEffect] = useState<string>('Adaptogenic & Stress Resilience');
  const [solventSystem, setSolventSystem] = useState<string>('Water-Alcohol (Hydro-ethanolic)');
  const [volumeGoal, setVolumeGoal] = useState<string>('100 kg - 500 kg Export Batch');

  const [result, setResult] = useState<SpecConsultationResult | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      let specResult: SpecConsultationResult;

      if (targetApplication.includes('Nutraceutical') || desiredEffect.includes('Adaptogenic')) {
        specResult = {
          title: 'Adaptogenic Root & Standardized Extract Specification Match',
          summary: 'Recommended specification matching high-withanolide Ashwagandha and Boswellia resin titrations for maximum stability in encapsulated and tableted formulations.',
          recommendedIngredients: [
            {
              commonName: 'Ashwagandha Root Extract',
              botanicalName: 'Withania somnifera',
              recommendedForm: 'Fine Micronized Powder (100 mesh)',
              specificationStandard: '2.5% to 5.0% Withanolides by HPLC',
              function: 'Primary active adaptogen for stress resilience'
            },
            {
              commonName: 'Salai Guggul / Boswellia Gum',
              botanicalName: 'Boswellia serrata',
              recommendedForm: 'Standardized Extract Powder',
              specificationStandard: '65% Boswellic Acids by Titration',
              function: 'Synergistic botanical marker for structural integrity'
            }
          ],
          testingStandard: 'HPLC Assay, Heavy Metals (USP <2232>), EP 5.1.8 Microbial Limit',
          suggestedPackaging: '25kg Food-grade HDPE Export Drums with double polyethylene seals',
          documentationAvailable: ['Certificate of Analysis (COA)', 'Heavy Metals & Pesticides Screening', 'Method of Analysis (MOA) Summary'],
          leadTimeEstimate: 'Ready for lot dispatch within 5-7 business days'
        };
      } else if (targetApplication.includes('Fragrance') || targetApplication.includes('Aroma')) {
        specResult = {
          title: 'Aromatic & Essential Oil Perfumery Accord Match',
          summary: 'Recommended specification focusing on authentic Mysore Sandalwood and steam-distilled Holy Basil/Tulsi for rich balsamic heart-notes.',
          recommendedIngredients: [
            {
              commonName: 'Mysore Sandalwood Essential Oil',
              botanicalName: 'Santalum album',
              recommendedForm: '100% Pure Steam Distilled Heartwood Oil',
              specificationStandard: 'Total Santalols > 60% (ISO 3518)',
              function: 'Deep creamy woody fixative base note'
            },
            {
              commonName: 'Holy Basil / Tulsi Oil',
              botanicalName: 'Ocimum basilicum / sanctum',
              recommendedForm: 'Steam Distilled Floral Tops Oil',
              specificationStandard: 'Eugenol content 40-45% by GC/MS',
              function: 'Crisp spicy-herbaceous top note'
            }
          ],
          testingStandard: 'GC/MS Fingerprint Analysis, Refractive Index, Optical Rotation',
          suggestedPackaging: '1kg & 5kg Sealed Fluorinated Aluminium Export Containers',
          documentationAvailable: ['GC/MS Chromatogram', 'IFRA Conformity Certificate', 'MSDS Safety Sheet'],
          leadTimeEstimate: '3-5 business days from Mandsaur/South India dispatch'
        };
      } else {
        specResult = {
          title: 'Custom Formulation Specification Match',
          summary: 'Balanced botanical ingredient matrix tailored for functional personal care, lotions, and aqueous topical formulations.',
          recommendedIngredients: [
            {
              commonName: 'Damask Rose Water Hydrosol',
              botanicalName: 'Rosa damascena',
              recommendedForm: 'Copper-still Hydro-distillate',
              specificationStandard: '100% Pure Single Distillate (Alcohol-free)',
              function: 'Aqueous soothing floral base'
            },
            {
              commonName: 'Cochin Lemongrass Essential Oil',
              botanicalName: 'Cymbopogon flexuosus',
              recommendedForm: 'Pure Essential Oil',
              specificationStandard: 'Total Citral > 75%',
              function: 'Antimicrobial & aromatic botanical accent'
            }
          ],
          testingStandard: 'Microbiological limits (<10 CFU/ml), Heavy Metals, Organoleptic match',
          suggestedPackaging: '20kg Sealed Drums or 200kg IBC Totes',
          documentationAvailable: ['Certificate of Analysis (COA)', 'Microbial Challenge Test', 'Origin Record'],
          leadTimeEstimate: '4-6 business days'
        };
      }

      setResult(specResult);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#062b23] border border-[#b88a2c] text-[#fbf7ed] w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl my-6">
        
        {/* Header */}
        <div className="sticky top-0 bg-[#083a30] border-b border-[#b88a2c]/40 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-[#b88a2c]" />
            <div>
              <span className="text-[10px] uppercase tracking-eyebrow text-[#82966f] font-semibold">
                Formulation & Specification Engine
              </span>
              <h2 className="font-serif text-2xl font-semibold text-[#fbf7ed]">
                AI Specification Consultant
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
          
          <p className="text-xs text-[#f2ead9]/85 leading-relaxed font-light">
            Select your product application and target parameters. The consultant cross-references our certified harvest records and export monographs to recommend suitable botanical species, physical forms, and analytical standards.
          </p>

          <form onSubmit={handleGenerate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                Target Application / Sector
              </label>
              <select
                value={targetApplication}
                onChange={(e) => setTargetApplication(e.target.value)}
                className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
              >
                <option value="Nutraceuticals & Dietary Supplements">Nutraceuticals & Dietary Supplements</option>
                <option value="Fine Fragrance & Aromatherapy">Fine Fragrance & Aromatherapy</option>
                <option value="Personal Care & Cosmetics">Personal Care & Cosmetics</option>
                <option value="Functional Beverages & Botanical Teas">Functional Beverages & Botanical Teas</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                Target Functional Profile
              </label>
              <select
                value={desiredEffect}
                onChange={(e) => setDesiredEffect(e.target.value)}
                className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
              >
                <option value="Adaptogenic & Stress Resilience">Adaptogenic & Stress Resilience</option>
                <option value="Deep Woody & Balsamic Fixation">Deep Woody & Balsamic Fixation</option>
                <option value="Cognitive & Brain Health Focus">Cognitive & Brain Health Focus</option>
                <option value="Hydrated Floral & Soothing Base">Hydrated Floral & Soothing Base</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                Preferred Solvent / Extraction System
              </label>
              <select
                value={solventSystem}
                onChange={(e) => setSolventSystem(e.target.value)}
                className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
              >
                <option value="Water-Alcohol (Hydro-ethanolic)">Water-Alcohol (Hydro-ethanolic)</option>
                <option value="Steam Distillation (100% Solvent-Free)">Steam Distillation (100% Solvent-Free)</option>
                <option value="Aqueous Distillate / Hydrosol">Aqueous Distillate / Hydrosol</option>
                <option value="Raw Shade-Dried Milled Material">Raw Shade-Dried Milled Material</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-eyebrow text-[#82966f] mb-1">
                Estimated Commercial Quantity
              </label>
              <select
                value={volumeGoal}
                onChange={(e) => setVolumeGoal(e.target.value)}
                className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]"
              >
                <option value="Evaluation Sample Batch (1-5 kg)">Evaluation Sample Batch (1-5 kg)</option>
                <option value="100 kg - 500 kg Export Batch">100 kg - 500 kg Export Batch</option>
                <option value="Container Load (1 MT +)">Container Load (1 MT +)</option>
              </select>
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-[#b88a2c] hover:bg-[#967020] text-[#062b23] font-bold text-xs uppercase tracking-eyebrow py-3.5 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isGenerating ? (
                  <span>Evaluating Harvest Monographs...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Botanical Specification Match</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Generated Specification Output */}
          {result && (
            <div className="bg-[#083a30] border border-[#b88a2c]/50 p-6 space-y-6 animate-fadeIn shadow-xl">
              <div>
                <span className="text-[10px] uppercase tracking-eyebrow text-[#b88a2c] font-bold block mb-1">
                  CONSULTANT RECOMMENDATION RESULT
                </span>
                <h3 className="font-serif text-2xl font-semibold text-[#fbf7ed]">
                  {result.title}
                </h3>
                <p className="text-xs text-[#f2ead9]/85 font-light leading-relaxed mt-1">
                  {result.summary}
                </p>
              </div>

              {/* Recommended Ingredients Table */}
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-eyebrow text-[#b88a2c]">
                  Matched Botanical Ingredients:
                </span>
                <div className="border border-[#b88a2c]/30 divide-y divide-[#b88a2c]/20 bg-[#062b23]">
                  {result.recommendedIngredients.map((item, idx) => (
                    <div key={idx} className="p-3 text-xs space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#fbf7ed]">{item.commonName}</span>
                        <span className="font-serif italic text-[#b88a2c]">{item.botanicalName}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#f2ead9]/80 pt-1">
                        <div><strong className="text-[#82966f]">Form:</strong> {item.recommendedForm}</div>
                        <div><strong className="text-[#82966f]">Standard:</strong> {item.specificationStandard}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#062b23] border border-[#b88a2c]/20 space-y-1">
                  <span className="text-[10px] uppercase tracking-eyebrow text-[#82966f] font-semibold block">Analytical Standards</span>
                  <span className="text-[#fbf7ed]">{result.testingStandard}</span>
                </div>
                <div className="p-3 bg-[#062b23] border border-[#b88a2c]/20 space-y-1">
                  <span className="text-[10px] uppercase tracking-eyebrow text-[#82966f] font-semibold block">Export Packaging Route</span>
                  <span className="text-[#fbf7ed]">{result.suggestedPackaging}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-[#82966f]">
                  Lead time estimate: <strong className="text-[#fbf7ed]">{result.leadTimeEstimate}</strong>
                </span>

                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote(result.recommendedIngredients[0]?.commonName || 'Consultant Specification Match');
                  }}
                  className="w-full sm:w-auto bg-[#b88a2c] hover:bg-[#967020] text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-6 py-3 cursor-pointer"
                >
                  Request Quotation for Matched Specs
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
