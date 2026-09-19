'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * EventsHeader: Compact Editorial Header with Original Brand Wording
 * 
 * Eyebrow: "EVENTS & MOMENTS"
 * Headline: "Where people, land and community come together."
 * Low vertical height ensuring event cards appear immediately above the fold.
 */
export default function EventsHeader() {
  return (
    <section
      id="events-header"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] pt-28 sm:pt-32 lg:pt-36 pb-6 sm:pb-8 overflow-hidden"
      aria-label="Earth Heritage Events & Moments"
    >
      {/* Subtle organic contour line accent */}
      <LandContourPattern variant="biscuit-contours" className="opacity-40 pointer-events-none" />

      <Container size="default" className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-5 relative">
          {/* Subtle Organic Arc Behind the Title */}
          <div className="absolute left-1/2 -top-6 -translate-x-1/2 w-[340px] sm:w-[560px] lg:w-[720px] h-[180px] sm:h-[240px] pointer-events-none -z-10 select-none overflow-hidden opacity-15">
            <svg viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M40,210 C180,60 540,60 680,210"
                stroke="#1E460B"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M100,230 C220,110 500,110 620,230"
                stroke="#1E460B"
                strokeWidth="1.8"
                strokeDasharray="10 8"
              />
              <ellipse
                cx="360"
                cy="140"
                rx="260"
                ry="70"
                stroke="#5E7748"
                strokeWidth="1.2"
                strokeDasharray="4 6"
              />
            </svg>
          </div>

          {/* Eyebrow */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>EVENTS &amp; MOMENTS</span>
            </div>
          </MotionReveal>

          {/* Two-Tone Headline Wordings */}
          <MotionReveal delay={0.1}>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal tracking-tight leading-[1.12] text-center">
              <span className="text-[#111613]">Where people, land and </span>
              <span className="text-[#1E460B] italic font-normal block sm:inline">
                community come together.
              </span>
            </h1>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
