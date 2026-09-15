'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { farmManagementData } from '@/data/farmManagementData';
import { ArrowRight } from 'lucide-react';

/**
 * Section 3 — The Management Cycle
 * 
 * Heading: "Farm management is an ongoing cycle of care."
 * 
 * Continuous Flowing Cycle:
 * UNDERSTAND → PLAN → CULTIVATE → CARE → OPERATE → HARVEST → CONTINUE
 */
export default function ManagementCycle() {
  const { eyebrow, heading, supportingCopy, stages } = farmManagementData.cycle;

  return (
    <section
      id="management-cycle"
      className="relative bg-[#FAF6F0] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="The Ongoing Management Cycle"
    >
      {/* Visible Organic Background Landscape Journey Contours */}
      <LandContourPattern variant="biscuit-journey" className="opacity-95" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111613] leading-[1.14]">
              {heading}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {supportingCopy}
            </p>
          </MotionReveal>
        </div>

        {/* Continuous Flowing Sequence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stages.map((st, idx) => {
            const isLast = idx === stages.length - 1;

            return (
              <MotionReveal key={st.step} delay={0.06 + idx * 0.05}>
                <div className="h-full p-6 rounded-2xl bg-[#FAF6F0]/90 border border-[#D5C09D] hover:border-[#1E460B]/60 transition-all duration-300 shadow-[0_4px_16px_rgba(17,22,19,0.03)] hover:shadow-[0_8px_24px_rgba(17,22,19,0.06)] flex flex-col justify-between backdrop-blur-xs group">
                  <div>
                    {/* Step Badge and Arrow Connector */}
                    <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#E6D8C3]">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#1E460B] text-white text-xs font-mono font-bold tracking-wider">
                        {st.step}
                      </span>
                      {!isLast ? (
                        <ArrowRight className="w-4 h-4 text-[#1E460B]/40 group-hover:text-[#1E460B] group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-[#1E460B]/10 text-[#1E460B] text-[10px] font-mono font-bold tracking-widest uppercase">
                          Cycle Renews
                        </span>
                      )}
                    </div>

                    {/* Stage Title */}
                    <h3 className="font-sans text-base sm:text-lg font-bold tracking-tight text-[#111613] group-hover:text-[#1E460B] transition-colors">
                      {st.title}
                    </h3>

                    {/* Stage Description */}
                    <p className="mt-2.5 font-sans text-sm text-[#5E6960] font-normal leading-relaxed">
                      {st.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E6D8C3]/50 flex items-center justify-between text-[11px] font-mono text-[#1E460B]">
                    <span>Phase {st.step}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
