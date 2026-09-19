'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

/**
 * EventDetailHero: Editorial Header and Marquee Photography for /events/[slug]
 */
export default function EventDetailHero({ event }) {
  if (!event) return null;

  return (
    <section
      id="event-detail-hero"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] pt-32 sm:pt-36 lg:pt-40 pb-12 sm:pb-16 border-b border-[#E8DFC8] overflow-hidden"
      aria-label={`${event.title} Introduction`}
    >
      <LandContourPattern variant="biscuit-contours" className="opacity-60 pointer-events-none" />

      <Container size="default" className="relative z-10">
        {/* Breadcrumb Navigation */}
        <MotionReveal delay={0.05}>
          <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
            <ol className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7A6A4E]">
              <li>
                <Link href="/" className="hover:text-[#111613] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-[#A8987C]" aria-hidden="true" />
              </li>
              <li>
                <Link href="/events" className="hover:text-[#111613] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-[#A8987C]" aria-hidden="true" />
              </li>
              <li className="text-[#15341C] font-semibold truncate max-w-[200px] sm:max-w-none">
                {event.category}
              </li>
            </ol>
          </nav>
        </MotionReveal>

        {/* Header Metadata & Display Title */}
        <div className="max-w-4xl space-y-5 mb-10 sm:mb-12">
          <MotionReveal delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] text-xs font-mono font-semibold tracking-[0.2em] text-[#1E460B] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{event.category}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#111613] leading-[1.12]">
              {event.title}
            </h1>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <p className="font-sans text-base sm:text-xl text-[#3C4A3E] leading-relaxed font-normal">
              {event.tagline}
            </p>
          </MotionReveal>

          {/* Quick Schedule & Location Strip */}
          <MotionReveal delay={0.25}>
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 pt-3 text-xs sm:text-sm font-sans text-[#4E5C50]">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#15341C]" aria-hidden="true" />
                <span className="font-medium text-[#111613]">{event.timing}</span>
              </div>
              <div className="hidden sm:block text-[#D5C09D]">&bull;</div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#15341C]" aria-hidden="true" />
                <span className="font-medium text-[#111613]">{event.location}</span>
              </div>
            </div>
          </MotionReveal>
        </div>

        {/* Large Editorial Hero Visual */}
        <MotionReveal delay={0.3}>
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E0D5C1] bg-[#EDE5D5] shadow-[0_12px_40px_rgba(21,52,28,0.06)]">
            <Image
              src={event.coverImage.src}
              alt={event.coverImage.alt || event.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {event.coverImage.caption && (
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 z-10">
                <p className="font-mono text-xs text-[#FAF7F2]/90 tracking-wide">
                  {event.coverImage.caption}
                </p>
              </div>
            )}
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
