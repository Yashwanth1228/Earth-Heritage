'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import EditorialImageSlot from './EditorialImageSlot';
import { CheckCircle2 } from 'lucide-react';

/**
 * 03 — ABOUT THE PROJECT: Editorial Model Explanation
 * 
 * Strict Standards:
 * - Image + text editorial split explaining the actual project model:
 *   1. Earth Heritage has purchased/acquired the project land
 *   2. The company develops the farm
 *   3. Individual farmland plots are sold to buyers
 *   4. Earth Heritage continues managing the sold farmland
 * - Factual, restrained language (no financial returns or investment promises)
 * - Visually distinct from snapshot and amenities sections
 */
export default function NairuthyaAbout({ project }) {
  const modelPoints = project?.aboutModel?.points || [
    {
      num: '01',
      title: 'Direct Land Acquisition',
      description: 'Earth Heritage has acquired and secured the 5-acre estate land under comprehensive legal due diligence.'
    },
    {
      num: '02',
      title: 'Agricultural Farm Development',
      description: 'The company executes complete on-ground development: 30-ft internal roads, drainage, boundary fencing, entrance arch, and water supply.'
    },
    {
      num: '03',
      title: 'Individual Titled Plot Sale',
      description: 'Farmland plots starting from 6,000 sq.ft are sold directly to buyers with registered, individual legal title deeds.'
    },
    {
      num: '04',
      title: 'Continuing Professional Stewardship',
      description: 'Earth Heritage continues managing the farmland post-purchase, coordinating agrarian manpower, cultivation, maintenance, irrigation, and daily operations.'
    }
  ];

  return (
    <section
      id="about-project"
      data-navbar-theme="light"
      className="relative bg-[#FAF6F0] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="About Nairuthya Whispering Wood"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Model Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="space-y-2">
              <MotionReveal delay={0.05}>
                <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#7A6A4E] font-semibold block">
                  DEVELOPMENT &amp; STEWARDSHIP MODEL
                </span>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight leading-[1.16]">
                  Acquired, Developed, &amp; Professionally Managed by Earth Heritage
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed pt-0.5">
                  At Nairuthya Whispering Wood, we bridge titled land ownership with disciplined agricultural stewardship. The land is acquired by Earth Heritage, master-planned into 24 boutique plots, and maintained through active agrarian oversight.
                </p>
              </MotionReveal>
            </div>

            {/* 4 Sequential Model Points */}
            <div className="space-y-2.5 pt-1">
              {modelPoints.map((point, idx) => (
                <MotionReveal key={point.num} delay={0.1 + idx * 0.06}>
                  <div className="flex items-start gap-3.5 p-3 sm:p-3.5 rounded-xl bg-white border border-[#E2D7C5] shadow-2xs">
                    <span className="w-7 h-7 rounded-full bg-[#15341C] text-[#FAF7F2] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {point.num}
                    </span>
                    <div className="space-y-0.5 min-w-0">
                      <h3 className="font-serif text-sm sm:text-base font-medium text-[#111613]">
                        {point.title}
                      </h3>
                      <p className="font-sans text-xs text-[#4E5C50] leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>

            {/* Ground Truth Core Proposition */}
            <MotionReveal delay={0.35}>
              <div className="p-3 sm:p-3.5 rounded-xl bg-[#EFE7DA] border border-[#DECDB3] flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#15341C] shrink-0" aria-hidden="true" />
                <p className="font-serif italic text-xs sm:text-sm text-[#15341C]">
                  &ldquo;You own the land. Earth Heritage manages the farm.&rdquo;
                </p>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Visual Frame / Land Composition (5 cols) */}
          <div className="lg:col-span-5">
            <MotionReveal delay={0.2}>
              <div className="relative space-y-3">
                <EditorialImageSlot
                  src={project?.coverImage?.src}
                  alt="Nairuthya Whispering Wood 5-Acre Layout"
                  slotLabel="Estate Land Slot"
                  caption="5 Acres Master-Planned Farmland Layout · Honnasandra, Nelamangala"
                  aspectRatio="aspect-[4/4]"
                  variant="neutral"
                />

                {/* Specification Badges Overlay Card */}
                <div className="p-4 rounded-xl bg-white border border-[#DDD3BF] shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#7A8A7E] uppercase text-[11px]">Project Status</span>
                    <span className="text-[#1E460B] font-semibold uppercase">Plots Available</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#7A8A7E] uppercase text-[11px]">Total Acreage</span>
                    <span className="text-[#111613] font-semibold">5.0 Acres</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#7A8A7E] uppercase text-[11px]">Legal Title</span>
                    <span className="text-[#111613] font-semibold">Individual Registered Deed</span>
                  </div>
                </div>
              </div>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
