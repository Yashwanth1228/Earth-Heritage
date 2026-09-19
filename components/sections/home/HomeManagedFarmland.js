'use client';

import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowRight } from 'lucide-react';

/**
 * 03 — HomeManagedFarmland: Core Managed Farmland Offering
 * 
 * Image-Led Editorial Composition:
 * - Light natural background (#F7F4EC) — NOT dark green.
 * - Left: Large landscape/farmland image occupying ~50% of the visual space.
 * - Right:
 *   - Eyebrow: "MANAGED FARMLAND"
 *   - Headline/Quote: "You own the land. We manage the farm."
 *   - Concise supporting narrative.
 *   - Refined vertical list of the 6 operational areas using typography, spacing, and thin dividers.
 *   - NO 6 cards, NO 6 boxes, NO icon grid.
 *   - CTA: "Explore Managed Farmland →" linking to /managed-farmland.
 */
export default function HomeManagedFarmland() {
  const operationalAreas = [
    { number: '01', title: 'Manpower coordination' },
    { number: '02', title: 'Crop planning' },
    { number: '03', title: 'Cultivation' },
    { number: '04', title: 'Maintenance and care' },
    { number: '05', title: 'Farm operations' },
    { number: '06', title: 'Harvest management' }
  ];

  return (
    <section
      id="managed-farmland-overview"
      data-navbar-theme="light"
      className="relative w-full bg-[#F0E0C6] text-[#111613] py-24 sm:py-32 lg:py-36 border-b border-[#D5C09D] overflow-hidden"
      aria-label="Managed Farmland Service Overview"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-60 pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* LEFT: Large Landscape/Farmland Image (~half visual area: 6 cols on lg) */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <MotionReveal delay={0.15}>
              <div className="relative w-full aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_16px_40px_rgba(17,22,19,0.07)] border border-[#D5C09D] bg-[#E4D1B5]">
                <Image
                  src="/images/landing/solution-management.jpg"
                  alt="Neatly cultivated agricultural acreage with crops under expansive open skies"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-102"
                />
              </div>
            </MotionReveal>
          </div>

          {/* RIGHT: Editorial Content & Refined Vertical List (6 cols on lg) */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-8 sm:space-y-10">
            
            {/* Heading & Core Message */}
            <div className="space-y-4">
              <MotionReveal delay={0.05}>
                <span className="inline-block text-[11px] sm:text-xs font-mono font-semibold tracking-[0.24em] text-[#8C7A5A] uppercase">
                  Managed Farmland
                </span>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111613] leading-[1.14]">
                  You own the land.{' '}
                  <span className="italic font-light text-[#2C4830] block">
                    We manage the farm.
                  </span>
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.25}>
                <p className="font-sans text-sm sm:text-base text-[#3A483E] leading-relaxed max-w-xl pt-1">
                  Farmland ownership remains registered completely in your name. Earth Heritage coordinates the complete operational discipline of agricultural planning, field labor, seasonal cultivation, and ongoing infrastructure care.
                </p>
              </MotionReveal>
            </div>

            {/* 6 Operational Areas — Refined Vertical List with Typography & Thin Dividers */}
            <div className="border-t border-b border-[#D5C09D] divide-y divide-[#DECBB0]">
              {operationalAreas.map((area, idx) => (
                <MotionReveal key={area.number} delay={0.25 + idx * 0.04}>
                  <div className="py-3.5 sm:py-4 flex items-center justify-between group transition-colors">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#8C7A5A] tracking-wider shrink-0">
                        {area.number}
                      </span>
                      <span className="font-serif text-base sm:text-lg font-medium text-[#111613] group-hover:text-[#1E460B] transition-colors">
                        {area.title}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#8C7A5A] opacity-0 group-hover:opacity-100 transition-opacity">
                      Active scope &bull;
                    </span>
                  </div>
                </MotionReveal>
              ))}
            </div>

            {/* CTA */}
            <MotionReveal delay={0.45} className="pt-2">
              <Link
                href="/managed-farmland"
                className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#15341C] hover:text-[#1E460B] group transition-colors"
              >
                <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
                  Explore Managed Farmland
                </span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </MotionReveal>

          </div>

        </div>
      </Container>
    </section>
  );
}
