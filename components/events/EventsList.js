'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { Calendar, MapPin } from 'lucide-react';

/**
 * EventsList: Direct List of Event Cards with Minimal Unique Design Accents
 * 
 * Refinements:
 * - Removed the Schedule Attendance button as requested
 * - Added minimal unique design elements:
 *   - Faint organic contour watermark curve in card background
 *   - Editorial mono index stamp [ 01 ]
 *   - Pill-styled Theme highlight with brand dot
 *   - Structured Location & Schedule metadata strip with icons
 *   - Clean Experience Elements pill grid with subtle organic borders
 *   - Warm, high-resolution photography with rounded corners and caption
 */
export default function EventsList({ events = [] }) {
  if (!events || events.length === 0) return null;

  return (
    <section
      id="events-list"
      className="relative bg-[#FAF7F2] text-[#111613] pt-4 pb-20 sm:pb-28"
      aria-label="Earth Heritage Gatherings and Events"
    >
      <Container size="default">
        <div className="space-y-8 sm:space-y-12">
          {events.map((event, idx) => (
            <MotionReveal key={event.id || event.slug} delay={0.08 * idx}>
              <article
                id={event.slug}
                className="relative overflow-hidden w-full bg-white rounded-3xl sm:rounded-[36px] border border-[#E2D8C3] hover:border-[#D0C2A5] p-6 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(26,22,17,0.05)] transition-all duration-300 hover:shadow-[0_14px_40px_rgba(21,52,28,0.07)]"
              >
                {/* Minimal Unique Design Accent: Faint Organic Contour Curve in Card Background */}
                <svg
                  className="absolute -right-10 -top-10 w-72 h-72 text-[#15341C] pointer-events-none select-none opacity-[0.04]"
                  viewBox="0 0 200 200"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M20,180 C80,60 140,40 190,10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 4" />
                  <path d="M50,190 C100,90 150,70 195,40" stroke="currentColor" strokeWidth="2" />
                  <circle cx="160" cy="40" r="28" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                </svg>

                {/* Card Top Row: Title + Badges + Index Stamp */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-5 border-b border-[#F0E9DC] relative z-10">
                  <div className="space-y-3">
                    {/* Index Stamp & Title */}
                    <div className="flex items-start sm:items-center gap-2.5">
                      <span className="font-mono text-xs font-semibold text-[#8C7A5A] tracking-wider uppercase shrink-0 whitespace-nowrap mt-1 sm:mt-0">
                        [ 0{idx + 1} ]
                      </span>
                      <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-semibold text-[#15341C] tracking-tight leading-tight">
                        {event.title}
                      </h2>
                    </div>

                    {/* Theme Line: Unique Editorial Capsule */}
                    {event.theme && (
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E4DCC8] shadow-2xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1E460B]" aria-hidden="true" />
                        <span className="font-mono text-[11px] uppercase tracking-wider font-semibold text-[#8C7A5A]">
                          Theme:
                        </span>
                        <span className="font-sans text-xs sm:text-[13px] font-medium text-[#15341C]">
                          {event.theme}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Top Right Badges (Timing / Date Pill + Category Pill) */}
                  <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-1">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#111613] text-[#FAF7F2] text-xs font-mono font-medium shadow-xs">
                      <Calendar className="w-3.5 h-3.5 text-[#B58A38]" aria-hidden="true" />
                      <span>{event.timing}</span>
                    </span>

                    <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#15341C] text-[#FAF7F2] text-xs font-mono font-semibold tracking-wider uppercase shadow-xs">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Card Content Grid: Left Narrative + Right Event Photo (Reordered on Mobile: Image first, details second) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-6 sm:mt-8 items-center relative z-10">
                  
                  {/* Narrative Column: Descriptive Copy & Experience Elements (order-2 on mobile, order-1 on desktop) */}
                  <div className="order-2 lg:order-1 lg:col-span-7 space-y-4 sm:space-y-5">
                    <p className="font-sans text-sm sm:text-base text-[#3C4A3E] leading-relaxed font-normal">
                      {event.overview}
                    </p>

                    {event.details && (
                      <p className="font-sans text-sm sm:text-[15px] text-[#556457] leading-relaxed">
                        {event.details}
                      </p>
                    )}

                    {/* Location & Schedule Strip */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 py-3 border-y border-[#F0E9DC] text-xs font-sans">
                      <div className="flex items-center gap-2 text-[#3C4A3E]">
                        <MapPin className="w-4 h-4 text-[#15341C] shrink-0" aria-hidden="true" />
                        <span className="font-semibold text-[#111613]">Location:</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#3C4A3E]">
                        <Calendar className="w-4 h-4 text-[#15341C] shrink-0" aria-hidden="true" />
                        <span className="font-semibold text-[#111613]">Schedule:</span>
                        <span>{event.timing}</span>
                      </div>
                    </div>

                    {/* Key Experience Elements Grid */}
                    {Array.isArray(event.highlights) && event.highlights.length > 0 && (
                      <div className="pt-1">
                        <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#8C7A5A] font-semibold mb-2.5">
                          Key Experience Elements:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {event.highlights.slice(0, 4).map((item, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EAE3D2] text-xs font-sans text-[#334237]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#15341C] shrink-0 mt-1.5" />
                              <span className="line-clamp-2 leading-relaxed">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Photo Column: Real Event Image (order-1 on mobile, order-2 on desktop) */}
                  <div className="order-1 lg:order-2 lg:col-span-5">
                    <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E0D5C1] bg-[#EDE5D5] shadow-xs group">
                      <Image
                        src={event.coverImage.src}
                        alt={event.coverImage.alt || event.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />

                      {event.coverImage.caption && (
                        <div className="absolute bottom-3 left-4 right-4 z-10">
                          <p className="text-[11px] font-mono text-[#FAF7F2]/90 tracking-wide line-clamp-1 drop-shadow-sm">
                            {event.coverImage.caption}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </article>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
