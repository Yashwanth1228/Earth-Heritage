'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { ArrowRight, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 03 — EventsArchive & 04 — Event Categories
 * 
 * Strict Editorial Standards:
 * - NO generic 3-column card grid.
 * - Alternating asymmetric editorial rows with mixed image proportions.
 * - Elegant, minimal category filter based solely on genuine categories.
 * - Displays authentic title, date, location, category, overview, and link.
 */
export default function EventsArchive({ initialEvents = [], allEvents = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') return initialEvents;
    const pool = allEvents.length > 0 ? allEvents : initialEvents;
    return pool.filter(
      (e) => e.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [initialEvents, allEvents, selectedCategory]);

  return (
    <section
      id="events-archive"
      className="relative bg-[#FAF7F2] text-[#111613] py-16 sm:py-24 lg:py-28"
      aria-label="Events and Gatherings Archive"
    >
      <Container size="default">
        {/* Archive Intro & Minimal Category Filter Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8DFC8]">
          <div className="max-w-xl space-y-2">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#8C7A5A]">
              Index &bull; Seasonal Calendar
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#111613] font-normal tracking-tight">
              Estate Gatherings &amp; Field Experiences
            </h2>
          </div>

          {/* Minimal Category Filter Pills */}
          {categories.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]',
                  selectedCategory === 'All'
                    ? 'bg-[#15341C] text-[#FAF7F2] font-semibold shadow-xs'
                    : 'bg-[#EDE5D5] text-[#5A4D3A] hover:bg-[#E0D5C1] border border-[#D5C6A6]/60'
                )}
              >
                All ({initialEvents.length})
              </button>
              {categories.map((category) => {
                const countPool = allEvents.length > 0 ? allEvents : initialEvents;
                const count = countPool.filter(
                  (e) => e.category.toLowerCase() === category.toLowerCase()
                ).length;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]',
                      selectedCategory.toLowerCase() === category.toLowerCase()
                        ? 'bg-[#15341C] text-[#FAF7F2] font-semibold shadow-xs'
                        : 'bg-[#EDE5D5] text-[#5A4D3A] hover:bg-[#E0D5C1] border border-[#D5C6A6]/60'
                    )}
                  >
                    {category} ({count})
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Asymmetric Editorial Archive Rows */}
        <div className="divide-y divide-[#E8DFC8]">
          {filteredEvents.map((event, index) => {
            const isEven = index % 2 === 0;

            return (
              <article
                key={event.id || event.slug}
                className="py-16 sm:py-20 lg:py-24 first:pt-12"
              >
                <div
                  className={cn(
                    'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center',
                    !isEven && 'lg:grid-flow-dense'
                  )}
                >
                  {/* Image Column */}
                  <div
                    className={cn(
                      'lg:col-span-7',
                      !isEven && 'lg:col-start-6'
                    )}
                  >
                    <MotionReveal delay={0.1}>
                      <Link
                        href={`/events/${event.slug}`}
                        className="group block relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-[#E0D5C1] bg-[#EDE5D5] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
                        aria-label={`View details for ${event.title}`}
                      >
                        <Image
                          src={event.coverImage.src}
                          alt={event.coverImage.alt || event.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 55vw"
                          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                        {/* Top Category Badge */}
                        <div className="absolute top-4 left-4 z-10">
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[11px] font-mono tracking-wider uppercase font-semibold">
                            {event.category}
                          </span>
                        </div>

                        {/* Index Indicator */}
                        <div className="absolute bottom-4 right-4 z-10">
                          <span className="font-mono text-xs text-white/80 tracking-widest uppercase">
                            [ 0{index + 1} ]
                          </span>
                        </div>
                      </Link>
                    </MotionReveal>
                  </div>

                  {/* Text Column */}
                  <div
                    className={cn(
                      'lg:col-span-5 space-y-6',
                      !isEven && 'lg:col-start-1'
                    )}
                  >
                    <MotionReveal delay={0.15}>
                      <div className="space-y-2">
                        <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#8C7A5A]">
                          Experience &bull; 0{index + 1}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight leading-snug">
                          <Link
                            href={`/events/${event.slug}`}
                            className="hover:text-[#1E460B] transition-colors"
                          >
                            {event.title}
                          </Link>
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-[#5A685D] italic">
                          {event.tagline}
                        </p>
                      </div>
                    </MotionReveal>

                    {/* Schedule & Location Details */}
                    <MotionReveal delay={0.2}>
                      <div className="space-y-2 py-3 border-y border-[#E8DFC8]/70">
                        <div className="flex items-start gap-2.5 text-xs text-[#3C4A3E]">
                          <Calendar className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-mono uppercase tracking-wider text-[#8C7A5A] block text-[10px] font-semibold">
                              Schedule
                            </span>
                            <span className="font-medium text-[#111613]">{event.timing}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs text-[#3C4A3E]">
                          <MapPin className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                          <div>
                            <span className="font-mono uppercase tracking-wider text-[#8C7A5A] block text-[10px] font-semibold">
                              Location
                            </span>
                            <span className="font-medium text-[#111613]">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </MotionReveal>

                    {/* Overview Paragraph */}
                    <MotionReveal delay={0.25}>
                      <p className="font-sans text-sm text-[#3C4A3E] leading-relaxed">
                        {event.overview}
                      </p>
                    </MotionReveal>

                    {/* Key Highlight Pill Previews (Top 2) */}
                    {Array.isArray(event.highlights) && event.highlights.length > 0 && (
                      <MotionReveal delay={0.3}>
                        <ul className="space-y-1.5 pt-1">
                          {event.highlights.slice(0, 2).map((item, hIdx) => (
                            <li
                              key={hIdx}
                              className="flex items-start gap-2 text-xs font-sans text-[#4E5C50]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </MotionReveal>
                    )}

                    {/* View Details Link */}
                    <MotionReveal delay={0.35} className="pt-2">
                      <Link
                        href={`/events/${event.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#15341C] hover:text-[#1E460B] group transition-colors"
                      >
                        <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
                          View Gathering Details
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </Link>
                    </MotionReveal>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Elegant Empty State if category has 0 items */}
          {filteredEvents.length === 0 && (
            <div className="py-20 text-center space-y-4">
              <p className="font-serif text-xl text-[#111613]">
                No gatherings currently scheduled under {selectedCategory}.
              </p>
              <p className="font-sans text-sm text-[#5A685D] max-w-md mx-auto">
                Official gathering schedules are updated in tandem with agricultural seasons and farm progress.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#15341C] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider hover:bg-[#1E460B] transition-colors"
              >
                View All Gatherings
              </button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
