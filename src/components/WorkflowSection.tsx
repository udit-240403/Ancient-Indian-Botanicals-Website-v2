import React from 'react';
import { SPECIFICATION_WORKFLOW } from '../data/products';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface WorkflowSectionProps {
  onStartEnquiry: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onStartEnquiry }) => {
  return (
    <section
      className="w-full bg-[#041e18] text-[#fbf7ed] py-16 md:py-24 border-b border-[#b88a2c]/40 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(4, 30, 24, 0.88), rgba(4, 30, 24, 0.94)), url('/assets/images/image.png')`,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-eyebrow text-[#b88a2c] font-bold block mb-2">
              Quality & Fulfillment Journey
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#fbf7ed]">
              From requirement to dispatch
            </h2>
          </div>
          <p className="text-sm text-[#f2ead9]/85 max-w-md font-light leading-relaxed">
            Every B2B enquiry follows a structured 5-step quality verification cycle ensuring compliance with global import standards.
          </p>
        </div>

        {/* 5 Step Timeline Grid with Deep Dark Green Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {SPECIFICATION_WORKFLOW.map((item) => (
            <div
              key={item.id}
              className="bg-[#062b23]/95 text-[#fbf7ed] border border-[#b88a2c]/40 hover:border-[#b88a2c] p-6 flex flex-col justify-between transition-all duration-300 relative group shadow-xl hover:-translate-y-1.5 backdrop-blur-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#b88a2c]/30">
                  <span className="font-serif text-2xl font-bold text-[#b88a2c]">
                    {item.step}
                  </span>
                  <span className="text-[10px] uppercase tracking-eyebrow text-[#a8c76b] font-semibold">
                    Phase 0{item.id}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#fbf7ed] mb-2 group-hover:text-[#b88a2c] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#f2ead9]/85 font-light leading-relaxed mb-4">
                  {item.fullDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#b88a2c]/30 space-y-1.5">
                <span className="text-[10px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold block">Key Output:</span>
                {item.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#fbf7ed]/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b88a2c] shrink-0" />
                    <span className="line-clamp-1 font-medium">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 p-8 bg-[#062b23] text-[#fbf7ed] border-2 border-[#b88a2c]/60 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-2xl font-bold text-[#b88a2c]">
              Ready to specify your batch requirements?
            </h4>
            <p className="text-xs text-[#f2ead9]/85 font-light">
              Submit your formulation specifications, required volume, and destination port for an immediate lot match.
            </p>
          </div>
          <button
            onClick={onStartEnquiry}
            className="bg-[#b88a2c] hover:bg-[#967020] text-[#041e18] font-bold text-xs uppercase tracking-eyebrow px-8 py-3.5 flex items-center gap-2 transition-all shadow-xl hover:-translate-y-0.5 shrink-0 cursor-pointer"
          >
            <span>Initiate Specification Request</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
