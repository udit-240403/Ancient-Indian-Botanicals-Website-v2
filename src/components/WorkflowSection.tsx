import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const SPECIFICATION_WORKFLOW = [
  {
    id: 1,
    step: '01',
    title: 'Specify Requirement',
    shortDesc: 'Share botanical identity, form, quantity, application and destination.',
    deliverables: ['Requirement summary', 'Open questions checklist'],
  },
  {
    id: 2,
    step: '02',
    title: 'Review Supply Routes',
    shortDesc: 'We evaluate suitable sourcing routes and currently available supplier lots.',
    deliverables: ['Candidate supply route', 'Availability review'],
  },
  {
    id: 3,
    step: '03',
    title: 'Confirm Documents',
    shortDesc: 'Available COA, identity, analytical and safety documents are checked where applicable.',
    deliverables: ['Document availability list', 'Specification gaps'],
  },
  {
    id: 4,
    step: '04',
    title: 'Agree Pack Format',
    shortDesc: 'Sample, bulk and selected label formats are reviewed for product compatibility.',
    deliverables: ['Proposed pack route', 'Label information list'],
  },
  {
    id: 5,
    step: '05',
    title: 'Confirm Commercial Route',
    shortDesc: 'Price, Incoterms, payment, documents and dispatch plan are confirmed in writing.',
    deliverables: ['Written commercial offer', 'Dispatch document plan'],
  },
];

interface WorkflowSectionProps {
  onStartEnquiry: () => void;
}

export const WorkflowSection: React.FC<WorkflowSectionProps> = ({ onStartEnquiry }) => {
  return (
    <section
      className="editorial-section relative w-full overflow-hidden border-b border-[#b56e3a]/20 bg-[#dfe3d8] py-20 text-[#1f2925] md:py-28"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(223, 227, 216, 0.94), rgba(244, 239, 229, 0.95)), url('/assets/images/section-botanical-texture.webp')`,
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-eyebrow text-[#9b6334] font-bold block mb-2">
              Quality & Fulfillment Journey
            </span>
            <div className="section-rule mb-5" />
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-[#1f2925]">
              From brief to shipment
            </h2>
          </div>
          <p className="text-sm text-[#52635d] max-w-md font-light leading-relaxed">
            A clear commercial process—from understanding the requirement to confirming documentation, packing and dispatch.
          </p>
        </div>

        {/* 5 Step Timeline Grid with Deep Dark Green Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {SPECIFICATION_WORKFLOW.map((item) => (
            <div
              key={item.id}
              className="premium-card group relative flex min-h-[330px] flex-col justify-between p-6 text-[#1f2925] md:p-7"
            >
              <div>
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#b88a2c]/30">
                  <span className="font-serif text-2xl font-bold text-[#b88a2c]">
                    {item.step}
                  </span>
                  <span className="text-[10px] uppercase tracking-eyebrow text-[#708076] font-semibold">
                    Phase 0{item.id}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#1f2925] mb-2 group-hover:text-[#9b6334] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-[#5f6964] font-light leading-relaxed mb-4">
                  {item.shortDesc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#b88a2c]/30 space-y-1.5">
                <span className="text-[10px] uppercase tracking-eyebrow text-[#b88a2c] font-semibold block">Typical review items:</span>
                {item.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#344740]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#b88a2c] shrink-0" />
                    <span className="line-clamp-1 font-medium">{del}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-12 p-8 md:p-10 premium-panel text-[#fbf7ed] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="font-serif text-2xl font-bold text-[#b88a2c]">
              Ready to specify your batch requirements?
            </h4>
            <p className="text-xs text-[#f2ead9]/85 font-light">
              Share the product, form, quantity and destination. We’ll review the requirement and respond with the next practical step.
            </p>
          </div>
          <button
            onClick={onStartEnquiry}
            className="bg-[#b88a2c] hover:bg-[#967020] text-[#041e18] font-bold text-xs uppercase tracking-eyebrow px-8 py-3.5 flex items-center gap-2 transition-all shadow-xl hover:-translate-y-0.5 shrink-0 cursor-pointer"
          >
            <span>Start a B2B enquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
