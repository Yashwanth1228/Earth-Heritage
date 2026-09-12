'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { aboutData } from '@/data/aboutData';
import { aboutImages } from '@/data/aboutImages';

/**
 * Editorial Centered Introduction Section for /about
 * 
 * Composition:
 * ABOUT EARTH HERITAGE (Centered Eyebrow)
 * ↓
 * Land is more than an asset. (Two-Tone Heading with subtle organic contour line behind)
 * It is a living legacy.
 * ↓
 * Supporting Description (Centered, comfortable reading width)
 * ↓
 * Large High-Quality Image (Aspect ratio 16:9 / 21:9 with subtle rounded corners)
 */
export default function AboutIntro() {
  const { eyebrow, headingLine1, headingLine2, description } = aboutData.intro;

  return (
    <section
      id="hero"
      className="relative bg-[#F0E0C6] text-[#111613] pt-24 sm:pt-28 lg:pt-32 pb-14 sm:pb-20 overflow-hidden border-b border-[#DCCDB7]"
      aria-label="About Earth Heritage Introduction"
    >
      {/* Signature Earth Heritage Visible Organic Background Pattern */}
      <LandContourPattern variant="biscuit-contours" className="opacity-95" />

      <Container size="default" className="relative z-10">
        {/* Centered Editorial Intro Content */}
        <div className="max-w-4xl mx-auto text-center relative">
          
          {/* Subtle Organic Arc Behind the Title (10-12% opacity) */}
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

          {/* 1. Page Identity Eyebrow (Centered & Subtle) */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4D1B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-6 sm:mb-8 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          {/* 2. Centered Two-Tone Display Title */}
          <MotionReveal delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal tracking-tight leading-[1.12] text-center">
              <span className="text-[#111613]">Land is more than an </span>
              <span className="text-[#1E460B] italic font-normal">asset.</span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-[#3D4B3F] font-normal mt-2 sm:mt-3 font-serif">
                {headingLine2}
              </span>
            </h1>
          </MotionReveal>

          {/* 3. Centered Supporting Description (Comfortable max width) */}
          <MotionReveal delay={0.25}>
            <p className="mt-6 sm:mt-8 font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </MotionReveal>
        </div>

        {/* 4. Large Centered High-Quality Image */}
        <MotionReveal delay={0.35} className="mt-12 sm:mt-16 lg:mt-20 max-w-6xl mx-auto">
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5C09D] shadow-[0_20px_50px_rgba(17,22,19,0.09)] bg-[#E4D1B5]">
            <Image
              src={aboutImages.intro.src}
              alt={aboutImages.intro.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1150px"
              className="object-cover object-center transform hover:scale-[1.01] transition-transform duration-700 ease-out"
            />
            {/* Subtle atmospheric gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 pointer-events-none" />

            {/* Editorial Caption Badge */}
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 px-3 py-1.5 rounded-md bg-[#111613]/75 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider text-white/95 uppercase pointer-events-none">
              Earth Heritage · Stewardship & Scale
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
