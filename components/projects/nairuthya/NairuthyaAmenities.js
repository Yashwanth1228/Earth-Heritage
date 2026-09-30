'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { Sparkles, ShieldCheck, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 04 — DESIGNED FOR LIFE IN NATURE & PROJECT INFRASTRUCTURE
 * 
 * Strict Standards:
 * - Part A: "Designed for Life in Nature"
 *   - Heading: "Designed for Life in Nature"
 *   - Inspired by reference screenshot (clean 3-column cards)
 *   - Grid: 3 cards per row on desktop (lg:grid-cols-3), 2 on tablet, 1 on mobile
 *   - Left and right spacing (max-w-6xl with px-6 sm:px-10 lg:px-14)
 *   - Shows 3 cards initially, with "See More" button expanding the remaining 4
 *   - Realistic photography for each amenity:
 *     1. Pond Area · 2. Yoga & Meditation Area · 3. Viewpoint
 *     4. Garden Area · 5. Jogging Track · 6. Children's Play Area · 7. Multi-Play Court Area
 *   - Subtle hover interaction (scale 1.03)
 * - Part B: "Project Infrastructure"
 *   - Compact specification list (10 verified infrastructure specifications)
 * - Compact vertical padding (py-10 sm:py-12 lg:py-14)
 * - Warm neutral background (bg-[#FAF6F0])
 */
export default function NairuthyaAmenities({ project }) {
  const experienceAmenities = project?.amenities?.experience || [];
  const infrastructure = project?.amenities?.infrastructure || [];

  const [showAll, setShowAll] = useState(false);
  const visibleAmenities = showAll ? experienceAmenities : experienceAmenities.slice(0, 3);

  return (
    <section
      id="amenities"
      data-navbar-theme="light"
      className="relative bg-[#FAF6F0] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Amenities and Infrastructure"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10 max-w-6xl px-6 sm:px-10 lg:px-14 space-y-10 sm:space-y-12">
        
        {/* =========================================================================
            PART A: DESIGNED FOR LIFE IN NATURE (3 CARDS PER ROW WITH SEE MORE)
            ========================================================================= */}
        <div className="space-y-6 sm:space-y-8">
          {/* Section Header */}
          <div className="max-w-2xl space-y-1.5">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-[#7A6A4E] uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
                <span>EXPERIENCE &bull; AMENITIES</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight">
                Designed for Life in Nature
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
                The project includes spaces intended for recreation, relaxation, movement and connection with the surrounding landscape.
              </p>
            </MotionReveal>
          </div>

          {/* 3-Column Amenities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleAmenities.map((item, idx) => (
              <MotionReveal key={item.id} delay={0.05 * ((idx % 3) + 1)} className="h-full">
                <div className="group flex flex-col h-full bg-white border border-[#DDD3BF] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xs hover:shadow-md hover:border-[#C8BAA3] transition-all duration-300">
                  {/* Aspect Ratio 4:3 Realistic Photography */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#FAF7F2]">
                    {item.image?.src ? (
                      <Image
                        src={item.image.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#EFE7DA] text-xs font-mono text-[#7A6A4E]">
                        {item.title}
                      </div>
                    )}
                  </div>

                  {/* Factual Editorial Content: Title + One Short Sentence */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-lg sm:text-xl font-normal text-[#111613] tracking-tight group-hover:text-[#1E460B] transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-[13px] text-[#5A685D] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#F0E8DC] flex items-center justify-between text-[11px] font-mono text-[#7A6A4E]">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                        <span>{item.category || 'Recreation'}</span>
                      </span>
                      <span className="text-[10px] text-[#A8987E]">0{idx + 1}</span>
                    </div>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>

          {/* See More / Show Less Toggle Button */}
          {experienceAmenities.length > 3 && (
            <div className="flex justify-center pt-2 sm:pt-4">
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#DDD3BF] bg-white hover:bg-[#FAF7F2] text-[#15341C] hover:text-[#1E460B] font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
              >
                <span>{showAll ? 'Show Fewer Amenities' : `See More Amenities (${experienceAmenities.length - 3} More)`}</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-300", showAll && "rotate-180")} />
              </button>
            </div>
          )}
        </div>

        {/* =========================================================================
            PART B: PROJECT INFRASTRUCTURE (COMPACT SPECIFICATION LIST)
            ========================================================================= */}
        <div className="pt-8 sm:pt-10 border-t border-[#DCCDB7] space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="max-w-2xl space-y-1.5">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-[#7A6A4E] uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1E460B]" aria-hidden="true" />
                <span>PROJECT INFRASTRUCTURE</span>
              </div>
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#111613] tracking-tight">
                Built-In Farm Infrastructure
              </h3>
            </MotionReveal>
            <MotionReveal delay={0.15}>
              <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
                Essential on-ground utilities and layout specifications delivered and maintained across the 5-acre estate layout.
              </p>
            </MotionReveal>
          </div>

          {/* Compact 3-Column Specification List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {infrastructure.map((item, idx) => (
              <MotionReveal key={item.name} delay={0.03 * (idx + 1)}>
                <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-[#E2D7C5] hover:border-[#D0C2AB] transition-colors h-full">
                  <div className="w-5 h-5 rounded-full bg-[#FAF6F0] border border-[#D5C09D] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h4 className="font-serif text-sm sm:text-base font-medium text-[#111613] leading-snug">
                      {item.name}
                    </h4>
                    <p className="font-sans text-xs text-[#5A685D] leading-relaxed">
                      {item.note}
                    </p>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>

          <MotionReveal delay={0.2}>
            <p className="font-mono text-[11px] text-[#7A8A7E] uppercase tracking-wider text-right">
              All infrastructure managed &amp; maintained by Earth Heritage &bull; Nairuthya Whispering Wood
            </p>
          </MotionReveal>
        </div>

      </Container>
    </section>
  );
}
