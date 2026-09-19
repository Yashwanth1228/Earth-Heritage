'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial Introduction for /blogs
 * 
 * Strict Standards:
 * - Begins with approved light ivory background (#FAF7F2)
 * - Eyebrow: "EARTH HERITAGE JOURNAL"
 * - Headline: "Perspectives on land, farming and a life connected to the earth."
 * - Restrained typography, subtle contour motif, low vertical footprint
 * - Compact direct presentation without bulky supporting copy or filter clutter
 */
export default function BlogHero() {
  return (
    <section
      id="blog-hero"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-12 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Earth Heritage Journal Introduction"
    >
      {/* Signature Earth Heritage Contour Motifs */}
      <LandContourPattern variant="biscuit-contours" className="opacity-50 pointer-events-none" />

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

          {/* Eyebrow Badge */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>EARTH HERITAGE JOURNAL</span>
            </div>
          </MotionReveal>

          {/* Editorial Display Headline — Two-Tone Serif with Italic Accent */}
          <MotionReveal delay={0.1}>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal tracking-tight leading-[1.12] text-center">
              <span className="text-[#111613]">Perspectives on land, farming and a </span>
              <span className="text-[#1E460B] italic font-normal block sm:inline">
                life connected to the earth.
              </span>
            </h1>
          </MotionReveal>

          {/* Supporting Statement */}
          <MotionReveal delay={0.15}>
            <p className="font-sans text-sm sm:text-base md:text-lg text-[#3C4A3E] font-normal leading-relaxed max-w-2xl mx-auto">
              Reflections, agricultural field notes, and educational perspectives exploring the responsibilities, soil science, and enduring legacy of managed farmland.
            </p>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
