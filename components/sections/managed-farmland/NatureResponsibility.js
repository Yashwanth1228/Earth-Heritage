'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { managedFarmlandData } from '@/data/managedFarmlandData';
import { managedFarmlandImages } from '@/data/managedFarmlandImages';

/**
 * Section 7 — Land, Nature & Responsibility
 * 
 * Statement:
 * "Management isn't just about operating a farm. It's about caring for the land."
 * 
 * Supporting:
 * "Earth Heritage brings people closer to land and nature through thoughtfully managed farmland and responsible development."
 * 
 * Brand Motto:
 * "BACK TO ROOTS. FORWARD WITH PURPOSE."
 */
export default function NatureResponsibility() {
  const { eyebrow, statement, supportingCopy, brandMotto, values } =
    managedFarmlandData.natureResponsibility;

  return (
    <section
      id="nature-responsibility"
      className="relative bg-[#F0E0C6] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Land, Nature and Responsibility"
    >
      {/* Visible Organic Background Root Contours */}
      <LandContourPattern variant="biscuit-roots" className="opacity-95" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#111613] leading-[1.12]">
              {statement}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-6 font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {supportingCopy}
            </p>
          </MotionReveal>

          {/* Philosophy Banner Badge */}
          <MotionReveal delay={0.3}>
            <div className="mt-6 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#111613] text-[#FAF6F0] shadow-md border border-[#1E460B]/30">
              <span className="w-2 h-2 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span className="font-mono text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#FAF6F0]">
                {brandMotto}
              </span>
            </div>
          </MotionReveal>
        </div>

        {/* Large Panoramic Stewardship Image */}
        <MotionReveal delay={0.35} className="max-w-5xl mx-auto mb-12 sm:mb-16">
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5C09D] shadow-[0_16px_40px_rgba(17,22,19,0.08)] bg-[#E4D1B5]">
            <Image
              src={managedFarmlandImages.natureResponsibility.src}
              alt={managedFarmlandImages.natureResponsibility.alt}
              fill
              sizes="(max-width: 1200px) 100vw, 1100px"
              className="object-cover object-center transform hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-3 py-1.5 rounded-md bg-[#111613]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider text-white/95 uppercase pointer-events-none">
              Earth Heritage · Ecological Harmony
            </div>
          </div>
        </MotionReveal>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {values.map((val, idx) => (
            <MotionReveal key={val.title} delay={0.1 + idx * 0.08}>
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#FAF6F0]/90 border border-[#D5C09D] shadow-[0_4px_16px_rgba(17,22,19,0.03)] flex flex-col justify-between backdrop-blur-xs">
                <div>
                  <div className="w-8 h-8 rounded-full bg-[#1E460B]/10 text-[#1E460B] flex items-center justify-center font-mono text-xs font-bold mb-4 border border-[#1E460B]/20">
                    0{idx + 1}
                  </div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-[#111613]">
                    {val.title}
                  </h3>
                  <p className="mt-2.5 font-sans text-sm sm:text-[15px] text-[#5E6960] font-normal leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
