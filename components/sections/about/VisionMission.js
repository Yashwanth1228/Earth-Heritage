'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { aboutData } from '@/data/aboutData';

/**
 * 05 — Vision + Mission Section
 * 
 * Distinct Vision & Mission blocks with strong typography and generous whitespace.
 * Set on warm background with a quiet, minimal organic contour variation.
 */
export default function VisionMission() {
  const { eyebrow, vision, mission } = aboutData.visionMission;

  return (
    <section
      id="vision-mission"
      className="relative bg-[#FAF6F0] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Vision and Mission"
    >
      {/* Visible Organic Background Language: Gentle Trajectory Pathways */}
      <LandContourPattern variant="biscuit-journey" className="opacity-85" />

      <Container size="default" className="relative z-10">
        {/* Section Eyebrow */}
        <div className="text-center mb-10 sm:mb-14">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>
        </div>

        {/* Dual Balanced Editorial Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Vision Panel */}
          <MotionReveal delay={0.15}>
            <div className="h-full p-8 sm:p-12 lg:p-14 rounded-2xl sm:rounded-3xl bg-white/90 border border-[#D5C09D] shadow-[0_8px_30px_rgba(17,22,19,0.04)] flex flex-col justify-between space-y-8 backdrop-blur-xs">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#1E460B] uppercase mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  <span>{vision.label}</span>
                </div>
                <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#111613] font-normal leading-[1.2] tracking-tight">
                  “{vision.statement}”
                </blockquote>
              </div>
              <p className="font-sans text-sm sm:text-base text-[#5E6960] font-normal leading-relaxed pt-6 border-t border-[#E6D8C3]">
                {vision.description}
              </p>
            </div>
          </MotionReveal>

          {/* Mission Panel */}
          <MotionReveal delay={0.25}>
            <div className="h-full p-8 sm:p-12 lg:p-14 rounded-2xl sm:rounded-3xl bg-white/90 border border-[#D5C09D] shadow-[0_8px_30px_rgba(17,22,19,0.04)] flex flex-col justify-between space-y-8 backdrop-blur-xs">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#B88E3E] uppercase mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#B88E3E]" aria-hidden="true" />
                  <span>{mission.label}</span>
                </div>
                <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#111613] font-normal leading-[1.2] tracking-tight">
                  “{mission.statement}”
                </blockquote>
              </div>
              <p className="font-sans text-sm sm:text-base text-[#5E6960] font-normal leading-relaxed pt-6 border-t border-[#E6D8C3]">
                {mission.description}
              </p>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
