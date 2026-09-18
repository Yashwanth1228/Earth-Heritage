'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowRight } from 'lucide-react';
import { companyData } from '@/data/company';

/**
 * 03 — HomeManagedFarmland: Core Managed Farmland Offering
 * 
 * Headline: "Managed Farmland"
 * Core message: "You own the land. We manage the farm."
 * 
 * Editorial Composition:
 * - Left side: Large cinematic visual of managed cultivation rows with an editorial badge.
 * - Right side: Compact, numbered vertical sequence of the 6 confirmed operational scopes.
 * - Deep green palette (#102B17) providing visual depth and luxury brand tone.
 */
export default function HomeManagedFarmland() {
  const managementScopes = [
    {
      number: '01',
      title: 'Manpower Coordination',
      desc: 'Supervising experienced agricultural teams and on-ground field labor.'
    },
    {
      number: '02',
      title: 'Crop Planning',
      desc: 'Developing seasonal cropping schedules tailored to local soil and climate.'
    },
    {
      number: '03',
      title: 'Cultivation',
      desc: 'Carrying out systematic planting, soil nourishment, and active agricultural work.'
    },
    {
      number: '04',
      title: 'Maintenance & Care',
      desc: 'Routine boundary upkeep, pruning, weeding, and ground infrastructure care.'
    },
    {
      number: '05',
      title: 'Farm Operations',
      desc: 'Coordinating day-to-day farm logistics, irrigation systems, and water management.'
    },
    {
      number: '06',
      title: 'Harvest Management',
      desc: 'Managing harvest logistics and produce handling according to agreed farm plans.'
    }
  ];

  return (
    <section
      id="managed-farmland-overview"
      data-navbar-theme="dark"
      className="relative w-full bg-[#102B17] text-[#FAF7F2] py-20 sm:py-28 lg:py-32 border-b border-[#1E4D2A] overflow-hidden"
      aria-label="Managed Farmland Service Overview"
    >
      <LandContourPattern variant="dark-elevation-depth" className="opacity-40" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183D22] border border-[#2B5E38] text-xs font-mono font-semibold tracking-widest text-[#E8DCC8] uppercase mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              <span>Core Offering</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#FAF7F2] leading-[1.12]">
              Managed Farmland
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-4 font-serif text-xl sm:text-2xl text-[#F2CF84] font-normal italic">
              &ldquo;You own the land. We manage the farm.&rdquo;
            </p>
            <p className="mt-3 font-sans text-sm sm:text-base text-[#B8CCC0] leading-relaxed max-w-2xl">
              A balanced partnership where farmland ownership remains legally registered to you, while Earth Heritage handles the operational complexity of agriculture, maintenance, and seasonal cycles.
            </p>
          </MotionReveal>
        </div>

        {/* 2-Column Editorial Composition: Large Visual Left + Numbered List Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Large Cinematic Cultivation Visual (5 cols) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <MotionReveal delay={0.2}>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#235832] bg-[#0E2413] shadow-[0_16px_40px_rgba(0,0,0,0.4)] aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src="/images/landing/solution-management.jpg"
                  alt="Neatly cultivated agricultural acreage with crops under expansive open skies"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1A0E]/90 via-transparent to-black/20 pointer-events-none" aria-hidden="true" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-xl bg-[#0F2815]/95 border border-[#235832] backdrop-blur-md text-[#FAF7F2] space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-[#B88E3E] uppercase font-semibold">
                    <span>Active Stewardship</span>
                    <span aria-hidden="true">&bull;</span>
                    <span>All Year Round</span>
                  </div>
                  <p className="font-serif text-sm font-normal text-[#E8DCC8] leading-snug">
                    Complete agricultural care without the day-to-day burden.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right: Numbered Vertical Operational Sequence (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <div className="divide-y divide-[#1D4A27]">
              {managementScopes.map((scope, idx) => (
                <MotionReveal key={scope.number} delay={0.15 + idx * 0.06}>
                  <div className="py-3.5 sm:py-4 flex items-start gap-4 sm:gap-6 group hover:pl-2 transition-all duration-200">
                    <span className="font-mono text-sm sm:text-base font-bold text-[#F2CF84] tracking-wider shrink-0 mt-0.5">
                      {scope.number}
                    </span>
                    <div className="space-y-0.5">
                      <h3 className="font-serif text-base sm:text-lg font-medium text-[#FAF7F2] group-hover:text-[#F2CF84] transition-colors">
                        {scope.title}
                      </h3>
                      <p className="font-sans text-xs sm:text-sm text-[#A8BEB0] leading-relaxed">
                        {scope.desc}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>

            {/* Section CTA */}
            <MotionReveal delay={0.5} className="pt-6">
              <Link
                href="/managed-farmland"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FAF7F2] text-[#111613] hover:bg-white text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Explore Managed Farmland &rarr;</span>
              </Link>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
