'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { MapPin, Navigation, Compass } from 'lucide-react';

/**
 * 08 — NEARBY PLACES / THINGS TO EXPLORE: Data-Driven Regional Architecture
 * 
 * Strict Standards:
 * - DO NOT invent fake nearby attractions or speculative driving claims
 * - Clean data-driven architecture ready for verified destinations:
 *   name · distance · short description · image · location link
 * - When array is empty, renders an authentic editorial note explaining that regional destinations are detailed during guided estate walkthroughs
 * - Visually original to Earth Heritage design philosophy
 */
export default function NairuthyaNearby({ project }) {
  const nearbyPlaces = project?.nearbyPlaces || [];
  const hasPlaces = nearbyPlaces.length > 0;

  return (
    <section
      id="nearby-places"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] py-8 sm:py-10 lg:py-12 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Nearby Places and Region"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 space-y-2">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-[#7A6A4E] uppercase">
              <Compass className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
              <span>THE REGION &bull; EXPLORATION</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight">
              Nearby Places &amp; Things to Explore
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
              Nelamangala Taluk and its surrounding green countryside offer peaceful agro-tourism sanctuaries, scenic rural hillscapes, and historic temples.
            </p>
          </MotionReveal>
        </div>

        {/* Content Showcase */}
        {hasPlaces ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {nearbyPlaces.map((place, idx) => (
              <MotionReveal key={place.id || idx} delay={0.08 * (idx + 1)}>
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDD3BF] shadow-2xs space-y-3 flex flex-col justify-between h-full">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-[#1E460B] uppercase">
                        {place.distance}
                      </span>
                      <MapPin className="w-4 h-4 text-[#C6923C]" />
                    </div>
                    <h3 className="font-serif text-lg font-medium text-[#111613]">
                      {place.name}
                    </h3>
                    <p className="font-sans text-xs text-[#4E5C50] leading-relaxed">
                      {place.description}
                    </p>
                  </div>
                  {place.locationLink && (
                    <a
                      href={place.locationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#15341C] hover:underline pt-2 border-t border-[#EFE5D5]"
                    >
                      <span>View Location</span>
                      <Navigation className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </MotionReveal>
            ))}
          </div>
        ) : (
          /* Editorial Content-Ready State (Zero Invented Destinations) */
          <MotionReveal delay={0.15}>
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DDD3BF] shadow-2xs space-y-4 max-w-4xl">
              <div className="space-y-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#7A6A4E] font-semibold block">
                  REGIONAL ACCESS &bull; ON-GROUND ORIENTATION
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111613] tracking-tight">
                  Guided Regional Walkthroughs with Farm Operations
                </h3>
              </div>

              <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
                Honnasandra is situated in a green agricultural belt of Nelamangala with direct access to local village markets, agrarian lakes, and regional temples. Specific local landmarks, travel access routes, and nearby scenic points are personally verified and shared with prospective buyers during private, scheduled estate walkthroughs.
              </p>

              <div className="pt-3 border-t border-[#EFE5D5] flex flex-wrap items-center gap-4 text-xs font-mono text-[#5A685D]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
                  <span>Honnasandra Countryside</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
                  <span>Nelamangala Agrarian Belt</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
                  <span>Private Visits by Appointment</span>
                </div>
              </div>
            </div>
          </MotionReveal>
        )}

      </Container>
    </section>
  );
}
