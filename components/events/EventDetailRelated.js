'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * EventDetailRelated: Curated Related Gatherings and Previous/Next Traversal
 */
export default function EventDetailRelated({
  relatedEvents = [],
  adjacent = { prev: null, next: null }
}) {
  return (
    <section
      id="event-detail-related"
      className="relative bg-[#FAF7F2] text-[#111613] py-16 sm:py-20 lg:py-24 border-t border-[#E8DFC8]"
      aria-label="Related Gatherings"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-8 sm:pb-10 border-b border-[#E8DFC8]">
          <div className="space-y-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#8C7A5A]">
              Continue Exploring
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight">
              Other Gatherings &amp; Field Days
            </h2>
          </div>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#15341C] hover:text-[#1E460B] group"
          >
            <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
              View All Gatherings
            </span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* Curated Related Events List */}
        {relatedEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-10">
            {relatedEvents.map((evt, idx) => (
              <MotionReveal key={evt.id || evt.slug} delay={0.1 + idx * 0.05}>
                <Link
                  href={`/events/${evt.slug}`}
                  className="group block rounded-2xl overflow-hidden bg-[#EDE5D5] border border-[#E0D5C1] shadow-xs hover:shadow-md transition-all flex flex-col h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#D8CEBA]">
                    <Image
                      src={evt.coverImage.src}
                      alt={evt.coverImage.alt || evt.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                        {evt.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-lg font-normal text-[#111613] tracking-tight group-hover:text-[#1E460B] transition-colors line-clamp-2">
                        {evt.title}
                      </h3>
                      <p className="font-sans text-xs text-[#5A685D] line-clamp-2 leading-relaxed">
                        {evt.tagline}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#DFD5C0] flex items-center justify-between text-xs text-[#15341C] font-semibold uppercase tracking-wider">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </MotionReveal>
            ))}
          </div>
        )}

        {/* Previous / Next Traversal */}
        {(adjacent.prev || adjacent.next) && (
          <div className="mt-14 pt-8 border-t border-[#E8DFC8] flex items-center justify-between gap-4">
            {adjacent.prev ? (
              <Link
                href={`/events/${adjacent.prev.slug}`}
                className="group inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#5A4D3A] hover:text-[#111613] transition-colors"
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
                <span className="hidden sm:inline font-semibold">Previous:</span>
                <span className="truncate max-w-[160px] sm:max-w-xs">{adjacent.prev.title}</span>
              </Link>
            ) : <div />}

            {adjacent.next && (
              <Link
                href={`/events/${adjacent.next.slug}`}
                className="group inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#5A4D3A] hover:text-[#111613] transition-colors text-right"
              >
                <span className="hidden sm:inline font-semibold">Next:</span>
                <span className="truncate max-w-[160px] sm:max-w-xs">{adjacent.next.title}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
