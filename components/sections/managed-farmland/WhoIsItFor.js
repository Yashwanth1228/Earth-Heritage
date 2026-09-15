'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { managedFarmlandData } from '@/data/managedFarmlandData';

/**
 * Section 8 — Who is managed farmland for?
 * 
 * Heading: "Who is managed farmland for?"
 * 
 * 5 Landowner Profiles:
 * 01 Retain Full Land Ownership
 * 02 Professional On-Ground Coordination
 * 03 Reduced Operational Burden
 * 04 Continuous Connection to Nature
 * 05 Care & Purposeful Stewardship
 */
export default function WhoIsItFor() {
  const { eyebrow, heading, description, profiles } = managedFarmlandData.whoIsItFor;

  return (
    <section
      id="who-is-it-for"
      className="relative bg-[#FAF6F0] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Who Is Managed Farmland For"
    >
      {/* Visible Organic Background Topographic Elevation Contours */}
      <LandContourPattern variant="biscuit-topography" className="opacity-90" />

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
              {description}
            </p>
          </MotionReveal>
        </div>

        {/* 5 Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {profiles.map((prof, idx) => (
            <MotionReveal key={prof.number} delay={0.08 + idx * 0.06}>
              <div className="h-full p-6 sm:p-8 rounded-2xl bg-white/85 border border-[#D5C09D] hover:border-[#1E460B]/60 transition-all duration-300 shadow-[0_4px_16px_rgba(17,22,19,0.03)] hover:shadow-[0_8px_24px_rgba(17,22,19,0.06)] flex flex-col justify-between backdrop-blur-xs group">
                <div>
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6D8C3]">
                    <span className="font-mono text-xs font-bold tracking-wider text-[#1E460B]">
                      {prof.number}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  </div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-[#111613] group-hover:text-[#1E460B] transition-colors">
                    {prof.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm sm:text-[15px] text-[#5E6960] font-normal leading-relaxed">
                    {prof.description}
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
