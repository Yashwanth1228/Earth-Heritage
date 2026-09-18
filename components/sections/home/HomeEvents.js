'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { Calendar, ArrowRight } from 'lucide-react';

/**
 * 06 — HomeEvents: Gatherings & Community Moments
 * 
 * Strict Content Integrity:
 * - Zero fabricated event dates, speaker names, or attendee statistics.
 * - Introduces authentic Earth Heritage community event formats:
 *   guided estate visits, seasonal harvest walks, and farm gatherings.
 */
export default function HomeEvents() {
  const eventFormats = [
    {
      title: 'Guided Estate Visits',
      subtitle: 'Land Exploration',
      desc: 'Private walkthroughs across managed acreage, inspecting natural topography, living soil, and boundary zones.',
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Open agricultural acreage with orderly fruit trees and natural topography'
    },
    {
      title: 'Seasonal Harvest Walks',
      subtitle: 'Agricultural Cycles',
      desc: 'Experiencing real crop cycles and harvesting routines alongside our on-ground agricultural teams.',
      src: '/images/gallery/experiences-gathering.jpg',
      alt: 'Warm evening gathering under open timber farm pavilion with lantern light over fields'
    }
  ];

  return (
    <section
      id="community-events"
      data-navbar-theme="light"
      className="relative w-full bg-[#FAF7F2] text-[#111613] py-20 sm:py-28 lg:py-32 border-b border-[#E5DAC4] overflow-hidden"
      aria-label="Earth Heritage Events and Gatherings"
    >
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-65" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-4">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8D8] border border-[#DDD3BF] text-xs font-mono font-semibold tracking-widest text-[#15341C] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                <span>Gatherings &amp; Community</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111613] leading-[1.12]">
                Moments on the Land
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="font-sans text-sm sm:text-base text-[#3C4A3E] leading-relaxed">
                Meaningful opportunities designed for landowners, families, and partners to experience the authentic reality of farmland stewardship.
              </p>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.3}>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#15341C] hover:text-[#1E460B] transition-colors py-2.5 px-5 rounded-full border border-[#D5C6A6] bg-white hover:bg-[#F5EEDB] shadow-xs"
            >
              <span>View All Events &rarr;</span>
            </Link>
          </MotionReveal>
        </div>

        {/* Editorial 2-Moment Image & Narrative Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {eventFormats.map((moment, idx) => (
            <MotionReveal key={moment.title} delay={0.2 + idx * 0.1} className="h-full">
              <article className="h-full rounded-2xl sm:rounded-3xl bg-white border border-[#DDD3BF] overflow-hidden shadow-xs hover:border-[#1E460B]/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between">
                
                {/* Visual Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFE8D8]">
                  <Image
                    src={moment.src}
                    alt={moment.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                      <Calendar className="w-3 h-3 text-brand-primary" aria-hidden="true" />
                      <span>{moment.subtitle}</span>
                    </span>
                  </div>
                </div>

                {/* Narrative Details */}
                <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111613] tracking-tight">
                      {moment.title}
                    </h3>
                    <p className="font-sans text-sm text-[#4E5B51] leading-relaxed">
                      {moment.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#EFE8D8] flex items-center justify-between text-xs font-mono text-[#8C7A5A]">
                    <span>SCHEDULED ON DEMAND &amp; SEASONALLY</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#1E460B]" aria-hidden="true" />
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
