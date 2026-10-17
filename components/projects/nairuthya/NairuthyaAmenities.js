'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import {
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Sun,
  Landmark,
  Route,
  Compass,
  Shield,
  Droplets,
  Sprout,
  Video,
  Droplet
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Infrastructure icon mapping for symbolic identification
const INFRASTRUCTURE_ICONS = {
  'Solar Lights': Sun,
  'Grand Entrance Arch': Landmark,
  '30-ft Double Road': Route,
  'Concrete Road': Compass,
  'Individual Plot Fencing': Shield,
  'Drainage': Droplets,
  'Drip Irrigation': Sprout,
  'CCTV Surveillance': Video,
  'Water Supply': Droplet,
  'Security Guard': ShieldCheck
};

/**
 * 04 — DESIGNED FOR LIFE IN NATURE & PROJECT INFRASTRUCTURE
 * 
 * Part A: "Designed for Life in Nature"
 * - Styled directly after reference screenshot (Aurum TwoFrogs):
 *   - Clean 3-column layout on page background with NO enclosing cards/boxes/borders
 *   - Rounded rectangle photography on top
 *   - Directly beneath image: Serif Title + short description sentence
 *   - Removed all category labels ("Water & Habitat", "Mindfulness & Wellness", etc.)
 *   - Shows first 3 amenities with "See More" button expanding remaining items
 * 
 * Part B: "Built-In Farm Infrastructure"
 * - Shows first 3 infrastructure cards by default with "See More" button for remaining items
 * - Dedicated symbols/icons for each card instead of point/dot design
 * - Removed the footer line "All infrastructure managed & maintained..."
 */
export default function NairuthyaAmenities({ project, className, id = 'amenities' }) {
  const experienceAmenities = project?.amenities?.experience || [];
  const infrastructure = project?.amenities?.infrastructure || [];

  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [showAllInfrastructure, setShowAllInfrastructure] = useState(false);

  const visibleAmenities = showAllAmenities
    ? experienceAmenities
    : experienceAmenities.slice(0, 3);

  const visibleInfrastructure = showAllInfrastructure
    ? infrastructure
    : infrastructure.slice(0, 6);

  return (
    <section
      id={id}
      data-navbar-theme="light"
      className={cn(
        'relative bg-[#FAF6F0] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden',
        className
      )}
      aria-label="Amenities and Infrastructure"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10 max-w-6xl px-4 sm:px-10 lg:px-14 space-y-10 sm:space-y-12">
        
        {/* =========================================================================
            PART A: DESIGNED FOR LIFE IN NATURE (NO CARDS - DIRECT IMAGE + TEXT)
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
                Designed for <span className="italic font-light text-[#1F3322]">Life in Nature</span>
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
                The project includes spaces intended for recreation, relaxation, movement and connection with the surrounding landscape.
              </p>
            </MotionReveal>
          </div>

          {/* 3-Column Grid on Laptop/Desktop, 2-Column Side-by-Side on Mobile & Tablet */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 lg:gap-8">
            {visibleAmenities.map((item, idx) => {
              const cardDir = idx % 3 === 0 ? 'left' : idx % 3 === 2 ? 'right' : 'up';
              return (
                <MotionReveal
                  key={item.id}
                  delay={0.06 * ((idx % 3) + 1)}
                  direction={cardDir}
                  className={cn(
                    "h-full",
                    idx === 2 && !showAllAmenities && "hidden lg:block"
                  )}
                >
                <div className="group flex flex-col h-full">
                  
                  {/* Rounded Image on Page Background */}
                  <div className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF7F2] shadow-2xs">
                    {item.image?.src ? (
                      <Image
                        src={item.image.src}
                        alt={item.image?.alt || `${item.title} at Nairuthya Whispering Wood`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#EFE7DA] text-xs font-mono text-[#7A6A4E]">
                        {item.title}
                      </div>
                    )}
                  </div>

                  {/* Title & Short Sentence Directly Below Image (No Card Wrapper) */}
                  <div className="pt-2.5 sm:pt-4 space-y-0.5 sm:space-y-1">
                    <h3 className="font-serif text-sm sm:text-lg lg:text-xl font-medium sm:font-normal text-[#111613] tracking-tight group-hover:text-[#1E460B] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-[13px] text-[#5A685D] leading-snug sm:leading-relaxed line-clamp-3 sm:line-clamp-none">
                      {item.description}
                    </p>
                  </div>

                </div>
              </MotionReveal>
            );
          })}
          </div>

          {/* See More / Show Less Toggle Button for Amenities */}
          {experienceAmenities.length > 2 && (
            <div className="flex justify-center pt-2 sm:pt-4">
              <button
                type="button"
                onClick={() => setShowAllAmenities((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#DDD3BF] bg-white hover:bg-[#FAF7F2] text-[#15341C] hover:text-[#1E460B] font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
              >
                <span>
                  {showAllAmenities ? 'Show Fewer Amenities' : 'See More Amenities'}
                </span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-300',
                    showAllAmenities && 'rotate-180'
                  )}
                />
              </button>
            </div>
          )}
        </div>

        {/* =========================================================================
            PART B: BUILT-IN FARM INFRASTRUCTURE (SHOW 3 CARDS DEFAULT + SEE MORE)
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
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal text-[#111613] tracking-tight">
                Built-In <span className="italic font-light text-[#1F3322]">Farm Infrastructure</span>
              </h2>
            </MotionReveal>
            <MotionReveal delay={0.15}>
              <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
                Essential on-ground utilities and layout specifications delivered across the 8-acre estate layout.
              </p>
            </MotionReveal>
          </div>

          {/* 3-Column Specification List with Dedicated Symbols/Icons: 6 cards on laptop & tablet, 3 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {visibleInfrastructure.map((item, idx) => {
              const IconComponent = INFRASTRUCTURE_ICONS[item.name] || ShieldCheck;
              const cardDir = idx % 2 === 0 ? 'left' : 'right';

              return (
                <MotionReveal
                  key={item.name}
                  delay={0.04 * ((idx % 3) + 1)}
                  direction={cardDir}
                  className={cn(
                    "h-full",
                    idx >= 3 && !showAllInfrastructure && "hidden sm:block"
                  )}
                >
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white border border-[#E2D7C5] hover:border-[#D0C2AB] transition-colors h-full shadow-2xs">
                    {/* Symbol / Logo badge instead of simple point */}
                    <div className="w-8 h-8 rounded-lg bg-[#FAF6F0] border border-[#D5C09D] flex items-center justify-center shrink-0 mt-0.5 text-[#1E460B]">
                      <IconComponent className="w-4 h-4 text-[#1E460B]" />
                    </div>
                    <div className="min-w-0 space-y-0.5">
                      <h3 className="font-serif text-sm sm:text-base font-medium text-[#111613] leading-snug">
                        {item.name}
                      </h3>
                      <p className="font-sans text-xs text-[#5A685D] leading-relaxed">
                        {item.note}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>

          {/* See More Toggle for Infrastructure (Shows 3 on mobile / 6 on tablet & laptop, expands all) */}
          {infrastructure.length > 3 && (
            <div className="flex justify-center pt-2 sm:pt-3">
              <button
                type="button"
                onClick={() => setShowAllInfrastructure((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#DDD3BF] bg-white hover:bg-[#FAF7F2] text-[#15341C] hover:text-[#1E460B] font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
              >
                <span>
                  {showAllInfrastructure ? (
                    'Show Fewer Specifications'
                  ) : (
                    <>
                      <span className="sm:hidden">
                        See More Infrastructure ({infrastructure.length - 3} More)
                      </span>
                      <span className="hidden sm:inline">
                        See More Infrastructure ({infrastructure.length - 6} More)
                      </span>
                    </>
                  )}
                </span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-300',
                    showAllInfrastructure && 'rotate-180'
                  )}
                />
              </button>
            </div>
          )}
        </div>

      </Container>
    </section>
  );
}
