'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { Play, ArrowRight, Film, Camera, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 05 — HomeStories: Dual Infinite Circular Marquees
 * 
 * Features:
 * - Row 1 (Top): Documentary Video Cards scrolling LEFT TO RIGHT in an infinite loop.
 * - Row 2 (Bottom): Field Photography Cards scrolling RIGHT TO LEFT in an infinite loop.
 * - Both rows use equal-sized cards (aspect-[16/10], w-[280px] sm:w-[340px] lg:w-[380px]).
 * - Continuous circular repeating with zero empty space or reset jumps.
 * - Automatically pauses smoothly on hover / active touch for effortless reading.
 * - Warm biscuit background (#F0E0C6) maintaining the editorial color rhythm.
 */
export default function HomeStories() {
  // 6 Curated Video Chronicles (Documentaries & Field Filming)
  const videoStories = [
    {
      id: 'vid-1',
      title: 'Morning Light over the Valley',
      subtitle: 'Capturing seasonal transitions, topography, and living soil',
      tag: 'Documentary Film',
      src: '/images/gallery/hero-feature.jpg',
      alt: 'Misty agricultural valley and rolling green hills at golden sunrise'
    },
    {
      id: 'vid-2',
      title: 'The Quiet Sanctuary of the Land',
      subtitle: 'A cinematic perspective on managed acreage and open horizons',
      tag: 'Field Chronicle',
      src: '/images/managed-farmland/core-proposition.jpg',
      alt: 'Peaceful gravel farm pathway meandering through open fields and shade trees'
    },
    {
      id: 'vid-3',
      title: 'Hands-on Agronomic Stewardship',
      subtitle: 'Dedicated field specialists supervising daily agricultural care',
      tag: 'Farm Operations',
      src: '/images/farm-management/people-and-land.jpg',
      alt: 'Agricultural field specialists assessing healthy crops and soil structure'
    },
    {
      id: 'vid-4',
      title: 'Rhythms of the Plantation',
      subtitle: 'Documenting tree growth, canopy shade, and native biodiversity',
      tag: 'Agroforestry Film',
      src: '/images/gallery/nature-canopy.jpg',
      alt: 'Lush green tree canopy with sunlight filtering through native trees'
    },
    {
      id: 'vid-5',
      title: 'Water Flow & Natural Contours',
      subtitle: 'Topographic swales and watershed engineering in practice',
      tag: 'Land Stewardship',
      src: '/images/how-it-works/responsible-care-panorama.jpg',
      alt: 'Panoramic agricultural contours demonstrating sustainable watershed engineering'
    },
    {
      id: 'vid-6',
      title: 'From Sapling to Thriving Orchard',
      subtitle: 'Long-term organic cultivation records across managed acreage',
      tag: 'Orchard Film',
      src: '/images/landing/manage-03-cultivation.jpg',
      alt: 'Young fruit trees thriving along contoured agricultural ridges'
    }
  ];

  // 6 Curated Field Photography Chronicles (Authentic Estate Visuals)
  const imageStories = [
    {
      id: 'img-1',
      title: 'Cultivated Acreage & Boundary Trails',
      subtitle: 'Disciplined crop rows and thriving boundary agroforestry',
      tag: 'Estate Photography',
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Expansive managed agricultural estate with disciplined crop rows and fruit trees'
    },
    {
      id: 'img-2',
      title: 'Topographic Contours & Living Soil',
      subtitle: 'Preserving organic soil vitality across natural slopes',
      tag: 'Soil Vitality',
      src: '/images/farm-management/responsible-care.jpg',
      alt: 'Rolling green agricultural acreage with orderly contour furrows'
    },
    {
      id: 'img-3',
      title: 'Evening Gatherings Under the Stars',
      subtitle: 'Connecting landowners and families over farmland moments',
      tag: 'Community Life',
      src: '/images/gallery/experiences-gathering.jpg',
      alt: 'Warm twilight gathering under open timber farm pavilion with lantern light over fields'
    },
    {
      id: 'img-4',
      title: 'Scheduled Seasonal Planting Cycles',
      subtitle: 'Structured agricultural cycles aligned with rainfall and climate',
      tag: 'Seasonal Planting',
      src: '/images/landing/manage-02-crop.jpg',
      alt: 'Young vibrant crop seedlings planted in disciplined straight field rows'
    },
    {
      id: 'img-5',
      title: 'Organic Crop Canopy & Micro-Climate',
      subtitle: 'Multi-tier shade canopy providing ideal orchard humidity',
      tag: 'Canopy Structure',
      src: '/images/gallery/cultivation-detail.jpg',
      alt: 'Close-up detail of thriving organic plantation foliage and healthy leaves'
    },
    {
      id: 'img-6',
      title: 'Seasonal Harvest Handover Logistics',
      subtitle: 'Fresh produce gathered with systematic agricultural care',
      tag: 'Harvest Care',
      src: '/images/landing/manage-06-harvest.jpg',
      alt: 'Bountiful fresh seasonal harvest produce gathered with systematic agricultural care'
    }
  ];

  return (
    <section
      id="field-stories"
      data-navbar-theme="light"
      className="relative w-full bg-[#F0E0C6] text-[#111613] py-24 sm:py-32 lg:py-36 border-b border-[#D5C09D] overflow-hidden"
      aria-label="Stories from the Ground"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-60 pointer-events-none" />

      <Container size="default" className="relative z-10 mb-10 sm:mb-16">
        {/* Section Header (Centered on mobile, split on desktop) */}
        <div className="flex flex-col items-center text-center md:items-end md:text-left md:flex-row justify-between gap-6">
          <div className="max-w-2xl space-y-3 sm:space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <MotionReveal delay={0.05}>
              <span className="inline-block text-[11px] sm:text-xs font-mono font-semibold tracking-[0.24em] text-[#8C7A5A] uppercase">
                Field Chronicles &amp; Visual Records
              </span>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111613] leading-[1.14]">
                Stories from the Ground
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="font-sans text-sm sm:text-base text-[#3C4A3E] leading-relaxed max-w-xl md:max-w-none mx-auto md:mx-0">
                Authentic visual moments capturing seasonal rhythms, living soil, and daily farm care across Earth Heritage estates. Continuous documentary video and photography rows.
              </p>
            </MotionReveal>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 shrink-0 mx-auto md:mx-0">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#15341C] hover:text-[#1E460B] group transition-colors"
            >
              <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
                Explore Full Gallery
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>

      {/* DUAL CONTINUOUS INFINITE MARQUEE CONTAINERS (INDEPENDENT HOVER PAUSE, CENTERED ON MOBILE) */}
      <div className="relative w-full space-y-8 sm:space-y-10 select-none">
        
        {/* =========================================================================
            ROW 1: DOCUMENTARY VIDEO CARDS — SCROLLS LEFT TO RIGHT (LTR STEPPED)
            Hovering here pauses ONLY the video row; image row continues.
            Centered in mobile viewport via pl-[calc((100vw-300px)/2)]
            ========================================================================= */}
        <div className="relative w-full overflow-hidden pause-marquee-hover group/video">
          {/* Row Sub-label (Centered on mobile) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-center sm:justify-between">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-[0.2em] uppercase text-[#7A6A4E] font-medium">
              <Film className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
              <span>Video Chronicles &bull; Left to Right</span>
            </span>
            <span className="text-[10px] font-mono text-[#8C7A5A]/80 uppercase hidden sm:inline-block">
              2s Card Stay &bull; Hover Video to Pause
            </span>
          </div>

          {/* Marquee Track: Duplicated sets seamlessly looping -50% to 0% with 2s hold per card (Centered offset on mobile) */}
          <div className="flex w-max animate-marquee-stepped-ltr pl-[calc((100vw-300px)/2)] sm:pl-0">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
              {videoStories.map((item, idx) => (
                <div
                  key={`vid-set1-${item.id}-${idx}`}
                  className={cn(
                    'w-[300px] xs:w-[320px] sm:w-[340px] lg:w-[380px] shrink-0',
                    'aspect-[16/10] rounded-2xl overflow-hidden relative group',
                    'border border-[#D5C09D] bg-[#E4D1B5] shadow-[0_10px_30px_rgba(17,22,19,0.06)]'
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" aria-hidden="true" />

                  {/* Top Badge (Centered on mobile, left on desktop) */}
                  <div className="absolute top-3.5 sm:top-4 inset-x-0 sm:inset-x-auto sm:left-4 z-10 flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                      <Film className="w-3 h-3 text-[#F2CF84]" aria-hidden="true" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Center Video Play Badge */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center my-auto pointer-events-none">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#15341C] shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-[#15341C] text-[#15341C]" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Bottom Caption Bar (Centered on mobile, left on desktop) */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#FAF7F2] tracking-tight leading-snug line-clamp-1 w-full">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#D8E4DC] leading-relaxed line-clamp-1 w-full">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (Identical duplicate for seamless continuous wrap) */}
            <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8" aria-hidden="true">
              {videoStories.map((item, idx) => (
                <div
                  key={`vid-set2-${item.id}-${idx}`}
                  className={cn(
                    'w-[300px] xs:w-[320px] sm:w-[340px] lg:w-[380px] shrink-0',
                    'aspect-[16/10] rounded-2xl overflow-hidden relative group',
                    'border border-[#D5C09D] bg-[#E4D1B5] shadow-[0_10px_30px_rgba(17,22,19,0.06)]'
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" aria-hidden="true" />

                  {/* Top Badge (Centered on mobile, left on desktop) */}
                  <div className="absolute top-3.5 sm:top-4 inset-x-0 sm:inset-x-auto sm:left-4 z-10 flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                      <Film className="w-3 h-3 text-[#F2CF84]" aria-hidden="true" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Center Video Play Badge */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center my-auto pointer-events-none">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#15341C] shadow-lg group-hover:scale-110 transition-transform duration-200">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-[#15341C] text-[#15341C]" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Bottom Caption Bar (Centered on mobile, left on desktop) */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#FAF7F2] tracking-tight leading-snug line-clamp-1 w-full">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#D8E4DC] leading-relaxed line-clamp-1 w-full">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            ROW 2: FIELD PHOTOGRAPHY CARDS — SCROLLS RIGHT TO LEFT (RTL STEPPED)
            Hovering here pauses ONLY the image row; video row continues.
            Centered in mobile viewport via pl-[calc((100vw-300px)/2)]
            ========================================================================= */}
        <div className="relative w-full overflow-hidden pause-marquee-hover group/image">
          {/* Row Sub-label (Centered on mobile) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-center sm:justify-between">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-[0.2em] uppercase text-[#7A6A4E] font-medium">
              <Camera className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
              <span>Estate Photography &bull; Right to Left</span>
            </span>
            <span className="text-[10px] font-mono text-[#8C7A5A]/80 uppercase hidden sm:inline-block">
              2s Card Stay &bull; Hover Image to Pause
            </span>
          </div>

          {/* Marquee Track: Duplicated sets seamlessly looping 0% to -50% with 2s hold per card (Centered offset on mobile) */}
          <div className="flex w-max animate-marquee-stepped-rtl pl-[calc((100vw-300px)/2)] sm:pl-0">
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
              {imageStories.map((item, idx) => (
                <div
                  key={`img-set1-${item.id}-${idx}`}
                  className={cn(
                    'w-[300px] xs:w-[320px] sm:w-[340px] lg:w-[380px] shrink-0',
                    'aspect-[16/10] rounded-2xl overflow-hidden relative group',
                    'border border-[#D5C09D] bg-[#E4D1B5] shadow-[0_10px_30px_rgba(17,22,19,0.06)]'
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" aria-hidden="true" />

                  {/* Top Badge (Centered on mobile, left on desktop) */}
                  <div className="absolute top-3.5 sm:top-4 inset-x-0 sm:inset-x-auto sm:left-4 z-10 flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                      <Camera className="w-3 h-3 text-[#55c40d]" aria-hidden="true" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Bottom Caption Bar (Centered on mobile, left on desktop) */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#FAF7F2] tracking-tight leading-snug line-clamp-1 w-full">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#D8E4DC] leading-relaxed line-clamp-1 w-full">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Set 2 (Identical duplicate for seamless continuous wrap) */}
            <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8" aria-hidden="true">
              {imageStories.map((item, idx) => (
                <div
                  key={`img-set2-${item.id}-${idx}`}
                  className={cn(
                    'w-[300px] xs:w-[320px] sm:w-[340px] lg:w-[380px] shrink-0',
                    'aspect-[16/10] rounded-2xl overflow-hidden relative group',
                    'border border-[#D5C09D] bg-[#E4D1B5] shadow-[0_10px_30px_rgba(17,22,19,0.06)]'
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" aria-hidden="true" />

                  {/* Top Badge (Centered on mobile, left on desktop) */}
                  <div className="absolute top-3.5 sm:top-4 inset-x-0 sm:inset-x-auto sm:left-4 z-10 flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                      <Camera className="w-3 h-3 text-[#55c40d]" aria-hidden="true" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Bottom Caption Bar (Centered on mobile, left on desktop) */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#FAF7F2] tracking-tight leading-snug line-clamp-1 w-full">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#D8E4DC] leading-relaxed line-clamp-1 w-full">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Subtle Note */}
      <Container size="default" className="relative z-10 mt-10 text-center">
        <p className="font-mono text-xs text-[#8C7A5A] tracking-wider uppercase">
          Continuous Live Chronicles &bull; All Visuals Captured on Location across Earth Heritage Estates
        </p>
      </Container>
    </section>
  );
}
