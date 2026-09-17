'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial Project Overview Section ("An approach to managed farmland.")
 * 
 * Strict Standards:
 * - Uses existing project overview content from data/projects.js
 * - Zero invented statistics, yields, returns, or pricing
 * - High-end editorial exhibition layout (12-column asymmetric composition)
 */
export default function ProjectDetailOverview({ project }) {
  if (!project) return null;

  const { overview, description, name } = project;
  const contentText = overview || description;

  if (!contentText) return null;

  return (
    <section
      id="project-overview"
      data-navbar-theme="light"
      className="relative py-16 sm:py-24 bg-[#F7F3EB] text-[#111613] border-b border-[#DCCDB7]/70 overflow-hidden"
      aria-label="An approach to managed farmland"
    >
      {/* Background Topographic Ambience */}
      <LandContourPattern variant="biscuit-topography" className="opacity-40" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Editorial Philosophy (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>THE APPROACH</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#111613] font-normal tracking-tight leading-[1.15]">
                An approach to managed farmland.
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <div className="p-6 rounded-2xl bg-[#FAF7F2] border border-[#D5C09D]/80 shadow-2xs space-y-3">
                <span className="font-mono text-[11px] font-semibold tracking-widest text-[#1E460B] uppercase block">
                  CORE PHILOSOPHY
                </span>
                <p className="font-serif text-lg sm:text-xl text-[#111613] italic font-normal leading-snug">
                  “Disciplined agronomic stewardship, clear boundary demarcation, and long-term soil health management.”
                </p>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Verified Project Overview Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-[#DCCDB7]/70 lg:pl-10">
            <MotionReveal delay={0.2}>
              <div className="font-sans text-base sm:text-lg lg:text-[19px] text-[#38423A] leading-relaxed space-y-5 whitespace-pre-line">
                {contentText}
              </div>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#D5C09D] space-y-2">
                <span className="font-mono text-xs uppercase tracking-wider text-[#1E460B] font-semibold block">
                  Concept Perspective
                </span>
                <p className="font-sans text-xs sm:text-sm text-[#5A685D] leading-normal">
                  This concept profile demonstrates how Earth Heritage project narratives will integrate titled land preservation, professional crop management, and long-term agrarian purpose as verified details become available.
                </p>
              </div>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
