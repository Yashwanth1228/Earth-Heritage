'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/sections/SectionWrapper';
import MotionReveal from '@/components/animations/MotionReveal';
import { Subtitle } from '@/components/ui/Typography';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { landingImages } from '@/data/landingImages';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * 4. SolutionSection — The Core Proposition (Split Composition)
 * "You own the land. We manage the farm."
 * Large photography occupying 45% of the frame with sophisticated numbered editorial list.
 * 
 * TODO: Replace landingImages.solution.src with authentic Earth Heritage photography when delivered.
 */
export default function SolutionSection() {
  const managementScopes = [
    { num: '01', title: 'Manpower coordination', desc: 'Coordinating on-ground personnel and supervising farm labor for agreed tasks.' },
    { num: '02', title: 'Crop planning', desc: 'Planning seasonal crops suited to the land and local agricultural conditions.' },
    { num: '03', title: 'Cultivation activities', desc: 'Planning and carrying out cultivation activities with careful attention to land needs.' },
    { num: '04', title: 'Farm maintenance', desc: 'Pruning, weeding, boundary care, and ground infrastructure upkeep.' },
    { num: '05', title: 'Day-to-day farm operations', desc: 'Managing daily farm tasks, water logistics, and ongoing operational coordination.' },
    { num: '06', title: 'Harvest management', desc: 'Coordinating harvest activities and handling produce according to agreed plans.' }
  ];

  return (
    <SectionWrapper
      id="solution"
      padding="lg"
      className="bg-background-biscuit-deep border-b border-border-subtle overflow-hidden"
      pattern={<LandContourPattern variant="biscuit-cultivation" />}
    >
      <div className="space-y-16">
        {/* Top Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 space-y-4">
            <MotionReveal>
              <Subtitle>The Proposition</Subtitle>
            </MotionReveal>
            <MotionReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-text-primary leading-[1.12]">
                You own the land.<br />
                <span className="text-brand-deep font-normal italic">
                  We manage the farm.
                </span>
              </h2>
            </MotionReveal>
          </div>

          <div className="lg:col-span-5">
            <MotionReveal delay={0.2}>
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
                Earth Heritage works with landowners to manage agreed day-to-day farm operations. You retain clear land title and long-term ownership, while our agricultural teams oversee on-ground execution.
              </p>
            </MotionReveal>
          </div>
        </div>

        {/* Core Visual + Numbered Editorial List Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-4">
          {/* Left: Large Farmland Management Image (5 cols) */}
          <div className="lg:col-span-5">
            <MotionReveal>
              <div className="relative rounded-lg overflow-hidden shadow-card border border-border bg-surface aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src={landingImages.solution.src}
                  alt={landingImages.solution.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">
                    Agreed Operational Standards
                  </span>
                  <p className="text-sm text-white/90 font-medium">
                    Professional farm stewardship tailored to each property.
                  </p>
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right: Sophisticated Numbered Editorial List (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-t border-border divide-y divide-border">
              {managementScopes.map((scope, idx) => (
                <MotionReveal key={scope.num} delay={idx * 0.05} className="py-4 sm:py-5 group">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono text-xs font-semibold text-brand-deep tracking-wider w-6">
                        {scope.num}
                      </span>
                      <div>
                        <h3 className="font-sans text-lg sm:text-xl font-medium text-text-primary tracking-tight group-hover:text-black transition-colors">
                          {scope.title}
                        </h3>
                        <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                          {scope.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button href="#management-sequence" variant="outline" size="md" iconRight={ArrowRight}>
                Explore Farm Management Scope
              </Button>
              <span className="text-xs text-text-muted font-sans hidden sm:inline">
                *Subject to agreed operational contracts
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
