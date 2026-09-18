'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/sections/SectionWrapper';
import MotionReveal from '@/components/animations/MotionReveal';
import { Subtitle } from '@/components/ui/Typography';
import { landingImages } from '@/data/landingImages';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * 3. ProblemSection — The Ownership Reality (Image Left / Text Right)
 * Asymmetric editorial composition with large farmland landscape.
 * 
 * TODO: Replace landingImages.problem.src with authentic Earth Heritage photography when delivered.
 */
export default function ProblemSection() {
  return (
    <SectionWrapper
      id="responsibility"
      padding="lg"
      className="bg-background-biscuit-light border-b border-border-subtle overflow-hidden"
      pattern={<LandContourPattern variant="biscuit-topography" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Large Farmland Landscape Visual (6 cols) */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <MotionReveal>
            <div className="relative rounded-lg overflow-hidden shadow-card border border-border bg-surface aspect-[16/10] sm:aspect-[4/3]">
              <Image
                src={landingImages.problem.src}
                alt={landingImages.problem.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white/90 text-xs font-sans">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">
                  The Land Care Responsibility
                </span>
                <p className="text-xs text-white/80 line-clamp-1 pt-0.5">
                  Consistent on-ground attention is essential for caring for farmland.
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>

        {/* Right: The Provocative Question & Supporting Copy (6 cols) */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <MotionReveal>
            <Subtitle>The Responsibility of Ownership</Subtitle>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-text-primary leading-[1.14]">
              You own the land.<br />
              <span className="text-text-secondary font-normal italic">
                But who takes care of it?
              </span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div className="space-y-4 max-w-xl text-text-secondary text-base sm:text-lg leading-relaxed pt-2">
              <p>
                Farmland ownership comes with responsibility. Managing people, cultivation, maintenance, and everyday farm operations requires time, attention, and consistency.
              </p>
              <p className="text-sm sm:text-base text-text-muted leading-relaxed">
                For landowners living in cities or balancing demanding careers, coordinating seasonal agricultural cycles, managing local labor, and safeguarding property boundaries can quickly become overwhelming.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.3}>
            <div className="pt-2 text-sm text-brand-deep font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              <span>Professional stewardship bridges the distance between ownership and management.</span>
            </div>
          </MotionReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
