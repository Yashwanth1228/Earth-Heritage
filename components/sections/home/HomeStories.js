'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { Play, ArrowRight, Film } from 'lucide-react';

/**
 * 05 — HomeStories: Visual Storytelling & Field Perspectives
 * 
 * Strict Content Integrity:
 * - Zero fabricated customer reviews, quotes, or fake star ratings.
 * - Built as an authentic "Watch & Discover" editorial showcase highlighting genuine
 *   agricultural photography from Earth Heritage projects and an architectural
 *   cinematic documentary player frame structured to receive authentic films.
 */
export default function HomeStories() {
  const perspectives = [
    {
      title: 'Topographic Contours & Living Soil',
      tag: 'CULTIVATION',
      src: '/images/farm-management/responsible-care.jpg',
      alt: 'Rolling green agricultural acreage with orderly contour furrows and native shade trees'
    },
    {
      title: 'The Quiet Sanctuary of the Land',
      tag: 'EXPERIENCES',
      src: '/images/managed-farmland/core-proposition.jpg',
      alt: 'Peaceful gravel farm pathway meandering through open fields and shade trees'
    }
  ];

  return (
    <section
      id="field-stories"
      data-navbar-theme="dark"
      className="relative w-full bg-[#0C1E12] text-[#FAF7F2] py-20 sm:py-28 lg:py-32 border-b border-[#1A3D25] overflow-hidden"
      aria-label="Field Stories and Visual Perspectives"
    >
      <LandContourPattern variant="dark-elevation-depth" className="opacity-35" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-4">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#163820] border border-[#2B5E38] text-xs font-mono font-semibold tracking-widest text-[#E8DCC8] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                <span>Field Perspectives</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#FAF7F2] leading-[1.12]">
                Stories from the Ground
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="font-sans text-sm sm:text-base text-[#B3C7B9] leading-relaxed">
                Authentic visual moments capturing the reality of agricultural care, seasonal growth, and open landscapes across Earth Heritage managed estates.
              </p>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.3}>
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#E8DCC8] hover:text-white transition-colors py-2 px-4 rounded-full border border-[#2B5E38] bg-[#14351D]/60 hover:bg-[#1A4224]"
            >
              <span>Explore Visual Gallery</span>
              <ArrowRight className="w-4 h-4 text-brand-primary" aria-hidden="true" />
            </Link>
          </MotionReveal>
        </div>

        {/* Editorial Story Layout: 1 Featured Cinematic Frame + 2 Field Glimpses */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Main Cinematic Feature Frame (7 cols) */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.2} className="h-full">
              <div className="h-full relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#235832] bg-[#0E2413] shadow-[0_16px_40px_rgba(0,0,0,0.4)] flex flex-col justify-between min-h-[380px] sm:min-h-[440px]">
                <Image
                  src="/images/gallery/hero-feature.jpg"
                  alt="Misty agricultural valley and rolling green hills at golden sunrise"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0E]/95 via-[#0A1A0E]/40 to-black/30 pointer-events-none" aria-hidden="true" />

                {/* Top Badge */}
                <div className="relative z-10 p-6 flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D1E12]/80 border border-[#235832] text-[11px] font-mono tracking-wider uppercase text-[#F2CF84]">
                    <Film className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                    <span>Visual Chronicle</span>
                  </span>
                </div>

                {/* Center Cinematic Play Badge (Intentional Preview Frame) */}
                <div className="relative z-10 p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-brand-primary/20 border border-brand-primary/60 backdrop-blur-md flex items-center justify-center text-brand-primary shadow-lg group hover:scale-105 transition-transform duration-200 cursor-pointer">
                    <Play className="w-6 h-6 ml-0.5 fill-brand-primary text-brand-primary" aria-hidden="true" />
                  </div>
                  <span className="mt-3 text-xs font-mono tracking-widest text-[#D2C5AB] uppercase">
                    Documenting the Land
                  </span>
                </div>

                {/* Bottom Title Bar */}
                <div className="relative z-10 p-6 sm:p-8 bg-[#0D1E12]/90 border-t border-[#1E4D2A] backdrop-blur-md">
                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAF7F2] tracking-tight">
                    Morning Light over the Valley
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#A8BEB0] mt-1 leading-relaxed">
                    Capturing the transition of seasons, natural topography, and living soil across our managed farmland parcels.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: 2 Photographic Perspectives (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8 justify-between">
            {perspectives.map((item, idx) => (
              <MotionReveal key={item.title} delay={0.25 + idx * 0.1} className="flex-1">
                <div className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#235832] bg-[#0E2413] shadow-md min-h-[200px] sm:min-h-[220px] flex flex-col justify-end p-5 sm:p-6 group">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0E]/95 via-[#0A1A0E]/40 to-transparent pointer-events-none" aria-hidden="true" />

                  <div className="relative z-10 space-y-1">
                    <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-[#F2CF84]">
                      {item.tag}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-normal text-[#FAF7F2] tracking-tight">
                      {item.title}
                    </h4>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
