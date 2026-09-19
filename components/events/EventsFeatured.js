'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';

/**
 * 02 — EventsFeatured: Editorial Asymmetric Lead Feature
 * 
 * Composition:
 * - Asymmetric editorial layout (not a generic 3-column card)
 * - Large landscape image with subtle hover zoom
 * - Split metadata: Category tag, date/timing, confirmed location, overview excerpt
 * - Direct link to the event detail route (/events/[slug])
 */
export default function EventsFeatured({ event }) {
  if (!event) return null;

  return (
    <section
      id="featured-event"
      className="relative bg-[#FAF7F2] text-[#111613] py-16 sm:py-20 lg:py-24 border-b border-[#E8DFC8]"
      aria-label="Featured Gathering"
    >
      <Container size="default">
        {/* Section Lead Eyebrow */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#8C7A5A]">
            Current Feature &bull; Seasonal Gathering
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-[#1E460B] bg-[#EAD5B5]/60 px-3 py-1 rounded-full border border-[#D5C09D]">
            <Sparkles className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
            <span>Open to Landowners &amp; Guests</span>
          </span>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Large Editorial Image Feature (7 cols) */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.1}>
              <Link
                href={`/events/${event.slug}`}
                className="group block relative aspect-[16/10] sm:aspect-[16/10] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E0D5C1] bg-[#EDE5D5] shadow-[0_12px_36px_rgba(21,52,28,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
                aria-label={`Read full details for featured event: ${event.title}`}
              >
                <Image
                  src={event.coverImage.src}
                  alt={event.coverImage.alt || event.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Corner Category Tag */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-xs font-mono tracking-wider uppercase font-semibold">
                    {event.category}
                  </span>
                </div>

                {/* Subtle Image Caption Overlay */}
                {event.coverImage.caption && (
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-10">
                    <p className="text-xs font-mono text-[#FAF7F2]/80 tracking-wide line-clamp-1">
                      {event.coverImage.caption}
                    </p>
                  </div>
                )}
              </Link>
            </MotionReveal>
          </div>

          {/* Editorial Content Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <MotionReveal delay={0.2}>
              <div className="space-y-3">
                <span className="inline-block text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#1E460B]">
                  Featured Experience
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111613] font-normal tracking-tight leading-[1.18]">
                  <Link
                    href={`/events/${event.slug}`}
                    className="hover:text-[#1E460B] transition-colors"
                  >
                    {event.title}
                  </Link>
                </h2>
              </div>
            </MotionReveal>

            {/* Timing & Location Chips */}
            <MotionReveal delay={0.25}>
              <div className="space-y-2.5 py-2 border-y border-[#E8DFC8]/80">
                <div className="flex items-start gap-2.5 text-xs text-[#3C4A3E]">
                  <Calendar className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-mono uppercase tracking-wider text-[#8C7A5A] block text-[10px] font-semibold">
                      Schedule &amp; Cadence
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

            {/* Editorial Overview Paragraph */}
            <MotionReveal delay={0.3}>
              <p className="font-sans text-sm sm:text-base text-[#3C4A3E] leading-relaxed">
                {event.overview}
              </p>
            </MotionReveal>

            {/* CTA Button */}
            <MotionReveal delay={0.35} className="pt-2">
              <Link
                href={`/events/${event.slug}`}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-sm hover:gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#15341C]"
              >
                <span>Explore Experience</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
