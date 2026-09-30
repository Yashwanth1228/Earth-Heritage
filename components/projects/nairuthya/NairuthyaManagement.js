'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowRight, Layers } from 'lucide-react';

/**
 * 06 — FARM DEVELOPMENT & MANAGEMENT: Compact Connected Process Flow
 * 
 * Strict Standards:
 * - Connected 5-step flow: OWN → DEVELOP → CULTIVATE → MANAGE → CONTINUE
 * - Factual wording; zero financial return or passive income promises
 * - Warm neutral background (bg-[#FAF7F2]), avoiding repeated green sections
 * - Compact vertical padding (py-10 sm:py-12 lg:py-14)
 */
export default function NairuthyaManagement({ project }) {
  const steps = project?.managementProcess || [
    {
      step: '01',
      action: 'OWN',
      title: 'Titled Land Ownership',
      description: 'You acquire and retain direct, registered legal ownership of your individual farmland plot with clear title deeds.'
    },
    {
      step: '02',
      action: 'DEVELOP',
      title: 'Planned Infrastructure',
      description: 'Earth Heritage develops the complete agricultural layout—30-ft concrete roads, boundary fencing, drainage, and irrigation.'
    },
    {
      step: '03',
      action: 'CULTIVATE',
      title: 'Active Cultivation',
      description: 'Systematic planting and cultivation of high-value timber, coconut, areca nut, and curated seasonal fruit varieties.'
    },
    {
      step: '04',
      action: 'MANAGE',
      title: 'Day-to-Day Operations',
      description: 'Earth Heritage coordinates on-ground agrarian manpower, pruning, soil health management, and irrigation scheduling.'
    },
    {
      step: '05',
      action: 'CONTINUE',
      title: 'Generational Stewardship',
      description: 'Your farmland matures under continuous professional care, creating an enduring living legacy for your family.'
    }
  ];

  return (
    <section
      id="farm-management"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Farm Development and Management Model"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10 space-y-2">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-[#7A6A4E] uppercase">
              <Layers className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
              <span>THE OPERATIONAL CYCLE &bull; STEP BY STEP</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight">
              Farm Development &amp; Management in Practice
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
              How legal ownership and ongoing agricultural care work together seamlessly at Nairuthya Whispering Wood.
            </p>
          </MotionReveal>
        </div>

        {/* Connected 5-Step Editorial Sequence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {steps.map((item, idx) => (
            <MotionReveal key={item.action} delay={0.08 * (idx + 1)} className="flex-1">
              <div className="relative p-4 sm:p-5 rounded-xl bg-white border border-[#DDD3BF] h-full flex flex-col justify-between space-y-4 shadow-2xs hover:shadow-sm hover:border-[#C8BAA3] transition-all">
                
                {/* Top Step Number & Action Pill */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#1E460B]">
                      {item.step}
                    </span>
                    {idx < steps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#C8BAA3] hidden lg:block" aria-hidden="true" />
                    )}
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded bg-[#FAF6F0] border border-[#DDD3BF] font-mono text-[10px] font-bold tracking-widest text-[#1E460B] uppercase">
                    {item.action}
                  </span>

                  <h3 className="font-serif text-base sm:text-lg font-medium text-[#111613] tracking-tight pt-0.5">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-sans text-xs text-[#5A685D] leading-relaxed pt-2.5 border-t border-[#EFE5D5]">
                  {item.description}
                </p>

              </div>
            </MotionReveal>
          ))}
        </div>

        {/* Bottom Clarity Statement */}
        <MotionReveal delay={0.3} className="mt-8 pt-6 border-t border-[#DCCDB7] text-center">
          <p className="font-sans text-xs text-[#7A8A7E] max-w-2xl mx-auto leading-relaxed">
            Earth Heritage provides agronomic care and farm operations under formal agreement. Farmland ownership is registered directly in the buyer’s name. Earth Heritage does not offer financial yields or speculative returns.
          </p>
        </MotionReveal>

      </Container>
    </section>
  );
}
