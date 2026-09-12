'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { aboutData } from '@/data/aboutData';

/**
 * 02 — Ownership + Management Section
 * 
 * Core Proposition: "You own the land. We manage the farm."
 * 6 verified management areas set on a lighter neutral section with subtle flowing cultivation lines.
 */
export default function OwnershipManagement() {
  const { eyebrow, heading, description, areas } = aboutData.ownershipManagement;

  return (
    <section
      id="ownership-management"
      className="relative bg-[#FAF6F0] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Ownership and Management"
    >
      {/* Visible Organic Background Language: Agricultural Furrows & Contours */}
      <LandContourPattern variant="biscuit-cultivation" className="opacity-90" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-[#111613] leading-[1.14]">
              {heading.split('\n').map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-6 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </MotionReveal>
        </div>

        {/* 6 Core Management Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {areas.map((area, idx) => (
            <MotionReveal key={area.number} delay={0.1 + idx * 0.07}>
              <div className="h-full p-6 sm:p-8 rounded-xl sm:rounded-2xl bg-white/80 hover:bg-white border border-[#D5C09D] hover:border-[#1E460B]/60 transition-all duration-300 shadow-[0_4px_16px_rgba(17,22,19,0.03)] hover:shadow-[0_8px_24px_rgba(17,22,19,0.06)] flex flex-col justify-between backdrop-blur-xs">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6D8C3]">
                    <span className="font-mono text-sm font-bold tracking-wider text-[#1E460B]">
                      {area.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  </div>
                  <h3 className="font-sans text-lg sm:text-xl font-medium tracking-tight text-[#111613]">
                    {area.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm sm:text-base text-[#5E6960] font-normal leading-relaxed">
                    {area.description}
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
