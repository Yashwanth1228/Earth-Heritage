'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Compact Editorial Introduction for /projects
 * 
 * Optimized for bringing the project showcase above the fold:
 * - Removed extra information boxes
 * - Compact top and bottom padding
 * - Preserved Cormorant luxury serif title & brand eyebrow
 * - Seamless transition to Project 01
 */
export default function ProjectsHero() {
  return (
    <section
      id="hero"
      className="relative bg-[#FAF6F0] text-[#111613] pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 lg:pb-8 border-b border-[#DCCDB7]/50 overflow-hidden"
      aria-label="Earth Heritage Projects Introduction"
    >
      {/* Subtle Earth Heritage Organic Contours */}
      <LandContourPattern variant="biscuit-contours" className="opacity-50" />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center relative">
          
          {/* Subtle Organic Arc Accent */}
          <div className="absolute left-1/2 -top-4 -translate-x-1/2 w-[320px] sm:w-[500px] lg:w-[640px] h-[140px] sm:h-[180px] pointer-events-none -z-10 select-none overflow-hidden opacity-10">
            <svg viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M40,210 C180,60 540,60 680,210"
                stroke="#1E460B"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M100,230 C220,110 500,110 620,230"
                stroke="#1E460B"
                strokeWidth="1.5"
                strokeDasharray="10 8"
              />
              <ellipse
                cx="360"
                cy="140"
                rx="260"
                ry="70"
                stroke="#5E7748"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            </svg>
          </div>

          {/* 1. Compact Page Eyebrow Badge */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-4 shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] animate-pulse" aria-hidden="true" />
              <span>OUR PROJECTS</span>
            </div>
          </MotionReveal>

          {/* 2. Editorial Two-Tone Display Title */}
          <MotionReveal delay={0.1}>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] font-normal tracking-tight leading-[1.14] text-center">
              <span className="text-[#111613]">The first chapters are </span>
              <span className="text-[#1E460B] italic font-normal block sm:inline">
                taking shape.
              </span>
            </h1>
          </MotionReveal>

          {/* 3. Centered Supporting Description */}
          <MotionReveal delay={0.15}>
            <p className="mt-4 font-sans text-sm sm:text-base md:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              Earth Heritage is at the beginning of its journey. Our upcoming projects will bring together land, nature, thoughtful development and long-term care.
            </p>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
