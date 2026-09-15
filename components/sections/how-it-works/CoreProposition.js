'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { howItWorksData } from '@/data/howItWorksData';

/**
 * Section 2 — Core Proposition for /how-it-works
 * 
 * Heading: "YOU OWN THE LAND. WE MANAGE THE FARM."
 * Supporting: "Earth Heritage manages agreed farm activities and coordinates the people and operations required to care for the farmland."
 */
export default function CoreProposition() {
  const { eyebrow, heading1, heading2, supportingCopy } = howItWorksData.coreProposition;

  return (
    <section
      id="core-proposition"
      className="relative bg-[#FAF6F0] text-[#111613] py-16 sm:py-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Core Proposition: Land Ownership and Farm Management"
    >
      {/* Background Topographic Elevation Loops */}
      <LandContourPattern variant="biscuit-topography" className="opacity-80" />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          {/* Statement Headline */}
          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-tight text-[#111613] leading-[1.12]">
              <span className="block">{heading1}</span>
              <span className="block text-[#1E460B] italic mt-1 sm:mt-2">{heading2}</span>
            </h2>
          </MotionReveal>

          {/* Supporting Narrative */}
          <MotionReveal delay={0.25}>
            <p className="mt-6 sm:mt-8 font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {supportingCopy}
            </p>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
