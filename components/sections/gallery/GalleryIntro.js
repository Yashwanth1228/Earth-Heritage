'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { galleryData } from '@/data/galleryData';

/**
 * Section 1 — Editorial Introduction for /gallery
 * 
 * Eyebrow: EARTH HERITAGE GALLERY
 * Heading: A closer look at the land, the work, and the moments in between.
 * Supporting: A curated visual exhibition reflecting the enduring relationship...
 */
export default function GalleryIntro() {
  const { eyebrow, headingPart1, headingPart2, description } = galleryData.intro;

  return (
    <section
      id="hero"
      className="relative bg-[#FAF6F0] text-[#111613] pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 overflow-hidden"
      aria-label="Earth Heritage Gallery Introduction"
    >
      {/* Signature Earth Heritage Organic Contours */}
      <LandContourPattern variant="biscuit-contours" className="opacity-95" />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center relative">
          
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

          {/* 1. Page Eyebrow Badge */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4D1B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-6 sm:mb-8 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          {/* 2. Editorial Two-Tone Display Title */}
          <MotionReveal delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[70px] font-normal tracking-tight leading-[1.12] text-center">
              <span className="text-[#111613]">{headingPart1}</span>
              <span className="text-[#1E460B] italic font-normal block sm:inline">
                {headingPart2}
              </span>
            </h1>
          </MotionReveal>

          {/* 3. Centered Supporting Description */}
          <MotionReveal delay={0.25}>
            <p className="mt-6 sm:mt-8 font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
