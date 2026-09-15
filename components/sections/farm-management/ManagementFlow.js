'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { farmManagementData } from '@/data/farmManagementData';
import { ArrowRight } from 'lucide-react';

/**
 * Section 6 — How the Activities Connect
 * 
 * Heading: "How the activities connect"
 * Clear architectural flow:
 * LAND → PEOPLE → PLANNING → CULTIVATION → CARE → OPERATIONS → HARVEST
 * Emphasizes typography, clean lines, and generous spacing.
 */
export default function ManagementFlow() {
  const { eyebrow, heading, supportingCopy, nodes } = farmManagementData.managementFlow;

  return (
    <section
      id="management-flow"
      className="relative bg-[#FAF6F0] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="How the Activities Connect"
    >
      {/* Visible Organic Background Flow Contours */}
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-90" />

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

        {/* Connected Typographic Progression Flow */}
        <div className="max-w-5xl mx-auto">
          {/* Desktop Horizontal Chain */}
          <div className="hidden lg:flex items-center justify-between gap-2 p-6 rounded-2xl bg-white/70 border border-[#D5C09D] shadow-xs backdrop-blur-xs">
            {nodes.map((nd, idx) => (
              <div key={nd.label} className="flex items-center gap-2 flex-1 last:flex-initial">
                <MotionReveal delay={0.05 + idx * 0.04} className="flex-1">
                  <div className="text-center p-3 rounded-xl hover:bg-[#EAD5B5]/40 transition-colors">
                    <span className="font-mono text-[11px] font-bold text-[#1E460B] block">
                      {nd.step}
                    </span>
                    <span className="font-sans text-sm font-bold tracking-tight text-[#111613] block mt-1">
                      {nd.label}
                    </span>
                    <span className="font-sans text-[11px] text-[#5E6960] block mt-0.5">
                      {nd.subtitle}
                    </span>
                  </div>
                </MotionReveal>
                {idx < nodes.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-[#1E460B]/40 shrink-0 mx-1" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile & Tablet Vertical Connected Sequence */}
          <div className="lg:hidden space-y-4">
            {nodes.map((nd, idx) => (
              <MotionReveal key={nd.label} delay={0.05 + idx * 0.04}>
                <div className="p-4 sm:p-5 rounded-xl bg-white/80 border border-[#D5C09D] flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1E460B] text-white text-xs font-mono font-bold shrink-0">
                      {nd.step}
                    </span>
                    <div>
                      <h3 className="font-sans text-base font-bold text-[#111613]">
                        {nd.label}
                      </h3>
                      <p className="font-sans text-xs text-[#5E6960]">
                        {nd.subtitle}
                      </p>
                    </div>
                  </div>
                  {idx < nodes.length - 1 ? (
                    <span className="text-[#1E460B] font-mono text-sm">↓</span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-[#55C40D]" />
                  )}
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
