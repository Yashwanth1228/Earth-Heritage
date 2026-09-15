'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { managedFarmlandData } from '@/data/managedFarmlandData';
import { managedFarmlandImages } from '@/data/managedFarmlandImages';

/**
 * Section 2 — Core Proposition for /managed-farmland
 * 
 * Statement:
 * "YOU OWN THE LAND. WE MANAGE THE FARM."
 * 
 * Composition:
 * Powerful editorial split: Bold typography, clear supporting explanation,
 * 3 core pillars (Ownership, Coordination, Stewardship), and a scenic
 * high-resolution agricultural estate visual.
 */
export default function CoreProposition() {
  const { eyebrow, statementLine1, statementLine2, description, pillars } =
    managedFarmlandData.coreProposition;

  return (
    <section
      id="core-proposition"
      className="relative bg-[#FAF6F0] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Core Proposition"
    >
      {/* Visible Organic Background Topographic Curves */}
      <LandContourPattern variant="biscuit-topography" className="opacity-90" />

      <Container size="default" className="relative z-10">
        {/* Editorial 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Bold Typography & Narrative */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>{eyebrow}</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111613] leading-[1.08]">
                <span className="block">{statementLine1}</span>
                <span className="block text-[#1E460B] italic font-normal mt-1">
                  {statementLine2}
                </span>
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed">
                {description}
              </p>
            </MotionReveal>

            {/* 3 Core Editorial Pillars */}
            <div className="pt-2 space-y-4 sm:space-y-5 border-t border-[#E6D8C3]">
              {pillars.map((pillar, idx) => (
                <MotionReveal key={pillar.title} delay={0.3 + idx * 0.08}>
                  <div className="flex items-start gap-4">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1E460B]/10 text-[#1E460B] text-xs font-mono font-bold shrink-0 mt-0.5 border border-[#1E460B]/20">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-sans text-base sm:text-lg font-semibold text-[#111613]">
                        {pillar.title}
                      </h3>
                      <p className="mt-1 font-sans text-sm sm:text-[15px] text-[#5E6960] leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>
          </div>

          {/* Right Column: High-Impact Estate Visual */}
          <div className="lg:col-span-6">
            <MotionReveal delay={0.2}>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5C09D] shadow-[0_16px_40px_rgba(17,22,19,0.08)] bg-[#E4D1B5] aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src={managedFarmlandImages.coreProposition.src}
                  alt={managedFarmlandImages.coreProposition.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                
                {/* Visual Label */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1.5 rounded-md bg-[#111613]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider text-white/95 uppercase">
                    Title & Stewardship in Harmony
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#55C40D] animate-pulse" />
                </div>
              </div>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
