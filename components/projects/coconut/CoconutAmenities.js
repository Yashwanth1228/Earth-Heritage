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
  Video
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Infrastructure icon mapping for symbolic identification
const INFRASTRUCTURE_ICONS = {
  'Grand Entrance': Landmark,
  'Solar Street Lights': Sun,
  '24/7 Security': ShieldCheck,
  'CCTV Surveillance': Video
};

/**
 * 04 — DESIGNED FOR LIFE IN NATURE & PROJECT INFRASTRUCTURE
 * 
 * Styled directly after the master reference (Nairuthya Whispering Wood):
 * 
 * Part A: "Designed for Life in Nature"
 * - Clean 3-column layout on page background with NO enclosing cards/boxes/borders
 * - Rounded rectangle visual slot on top
 * - Directly beneath image: Serif Title + short description sentence
 * - Shows first 3 amenities with "See More" button expanding remaining items
 * 
 * Part B: "Built-In Farm Infrastructure"
 * - 3-column specification grid with dedicated symbols/icons
 * - Displays verified project features: Grand Entrance, Solar Street Lights, 24/7 Security, CCTV Surveillance
 */
export default function CoconutAmenities({ project }) {
  const experienceAmenities = project?.amenities?.experience || [
    {
      id: 'camping-area',
      title: 'Camping Area',
      description: 'Designated outdoor camping spaces immersed in the quiet countryside landscape.'
    },
    {
      id: 'cottages',
      title: 'Cottages',
      description: 'Peaceful farm cottage retreats designed for comfortable weekend stays surrounded by nature.'
    },
    {
      id: 'club-house',
      title: 'Club House',
      description: 'Community gathering space for relaxation, social interaction, and countryside hospitality.'
    },
    {
      id: 'indoor-games',
      title: 'Indoor Games',
      description: 'Recreational indoor games facility providing leisure activities for all age groups.'
    },
    {
      id: 'swimming-pool',
      title: 'Swimming Pool',
      description: 'Recreational swimming pool thoughtfully integrated into the green agricultural estate landscape.'
    },
    {
      id: 'kids-play-area',
      title: 'Kids Play Area',
      description: 'Dedicated open-air play zone for children amidst clean rural surroundings.'
    }
  ];

  const infrastructure = project?.amenities?.infrastructure || [
    { name: 'Grand Entrance', note: 'Secure and architecturally distinguished estate entrance portal.' },
    { name: 'Solar Street Lights', note: 'Eco-friendly solar illumination across all internal estate roadways.' },
    { name: '24/7 Security', note: 'Continuous round-the-clock on-ground security personnel safeguarding the estate.' },
    { name: 'CCTV Surveillance', note: 'Round-the-clock perimeter and internal lane security camera surveillance.' }
  ];

  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const visibleAmenities = showAllAmenities
    ? experienceAmenities
    : experienceAmenities.slice(0, 3);

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
                Designed for Life in Nature
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
                Thoughtfully planned lifestyle and recreational amenities designed for weekend farmland living amidst the peaceful rural countryside of Bidadi.
              </p>
            </MotionReveal>
          </div>

          {/* 3-Column Grid Styled After Master Reference (No Cards, Direct Image + Text) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {visibleAmenities.map((item, idx) => (
              <MotionReveal key={item.id} delay={0.05 * ((idx % 3) + 1)} className="h-full">
                <div className="group flex flex-col h-full">
                  
                  {/* Rounded Image on Page Background */}
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F2] shadow-2xs">
                    {item.image?.src ? (
                      <Image
                        src={item.image.src}
                        alt={item.image?.alt || `${item.title} at Coconut Garden`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-b from-[#FBF8F3] via-[#F3ECE0] to-[#E9DFC8] select-none text-[#111613] overflow-hidden">
                        <div className="absolute inset-0 opacity-25 pointer-events-none">
                          <LandContourPattern variant="biscuit-topography" />
                        </div>
                        <div className="relative z-10 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#D5C09D] text-[10px] font-mono tracking-widest text-[#1E460B] uppercase shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                            <span>Amenity Slot</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#7A6A4E] uppercase tracking-wider">
                            Bidadi
                          </span>
                        </div>
                        <div className="relative z-10 my-auto text-center py-2 space-y-0.5">
                          <h4 className="font-serif text-base sm:text-lg font-medium text-[#111613] tracking-tight">
                            {item.title}
                          </h4>
                        </div>
                        <div className="relative z-10 pt-1.5 border-t border-[#D5C09D]/60">
                          <p className="font-mono text-[10px] text-[#5A685D] truncate">
                            Earth Heritage &bull; Planned Amenity
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Title & Short Sentence Directly Below Image (No Card Wrapper) */}
                  <div className="pt-3.5 sm:pt-4 space-y-1">
                    <h3 className="font-serif text-lg sm:text-xl font-normal text-[#111613] tracking-tight group-hover:text-[#1E460B] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-[13px] text-[#5A685D] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                </div>
              </MotionReveal>
            ))}
          </div>

          {/* See More / Show Less Toggle Button for Amenities */}
          {experienceAmenities.length > 3 && (
            <div className="flex justify-center pt-2 sm:pt-4">
              <button
                type="button"
                onClick={() => setShowAllAmenities((prev) => !prev)}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-[#DDD3BF] bg-white hover:bg-[#FAF7F2] text-[#15341C] hover:text-[#1E460B] font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-2xs hover:shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
              >
                <span>
                  {showAllAmenities
                    ? 'Show Fewer Amenities'
                    : `See More Amenities (${experienceAmenities.length - 3} More)`}
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
            PART B: BUILT-IN FARM INFRASTRUCTURE
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
                Built-In Farm Infrastructure
              </h2>
            </MotionReveal>
            <MotionReveal delay={0.15}>
              <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
                Essential on-ground utilities and layout infrastructure delivered across the 6-acre estate in Bidadi for secure and disciplined farm plot ownership.
              </p>
            </MotionReveal>
          </div>

          {/* 3-Column Specification List with Dedicated Symbols/Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {infrastructure.map((item, idx) => {
              const IconComponent = INFRASTRUCTURE_ICONS[item.name] || ShieldCheck;

              return (
                <MotionReveal key={item.name} delay={0.03 * ((idx % 3) + 1)}>
                  <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-xl bg-white border border-[#E2D7C5] hover:border-[#D0C2AB] transition-colors h-full shadow-2xs">
                    {/* Symbol / Logo badge */}
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
        </div>

      </Container>
    </section>
  );
}
