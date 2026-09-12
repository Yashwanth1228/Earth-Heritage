'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { aboutData } from '@/data/aboutData';

/**
 * 04 — Our Goals Section
 * 
 * "Built around what matters."
 * Editorial numbered list with dividers and whitespace on warm background with topographic contour lines.
 */
export default function GoalsSection() {
  const { eyebrow, heading, description, items } = aboutData.goals;

  return (
    <section
      id="goals"
      className="relative bg-[#F5E9D3] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Our Goals"
    >
      {/* Visible Organic Background Language: Topographic Elevation Loops & Lines */}
      <LandContourPattern variant="biscuit-topography" className="opacity-95" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-[#111613] leading-[1.14]">
              {heading}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </MotionReveal>
        </div>

        {/* Editorial Numbered Manifesto List */}
        <div className="border-t border-[#D5C09D]">
          {items.map((item, idx) => (
            <MotionReveal key={item.number} delay={0.1 + idx * 0.08}>
              <div className="group border-b border-[#D5C09D] py-8 sm:py-10 lg:py-12 px-2 sm:px-4 hover:bg-[#EAD5B5]/40 transition-colors duration-300">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                  {/* Number */}
                  <div className="md:col-span-2">
                    <span className="font-mono text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#1E460B] group-hover:text-[#55C40D] transition-colors duration-300">
                      {item.number}
                    </span>
                  </div>

                  {/* Title */}
                  <div className="md:col-span-5">
                    <h3 className="font-sans text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-[#111613] uppercase">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5">
                    <p className="font-sans text-sm sm:text-base text-[#5E6960] font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
