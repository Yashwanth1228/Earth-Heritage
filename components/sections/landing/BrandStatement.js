'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/sections/SectionWrapper';
import MotionReveal from '@/components/animations/MotionReveal';
import { Subtitle } from '@/components/ui/Typography';
import { landingImages } from '@/data/landingImages';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * 2. BrandStatement — Visual Statement (Editorial Magazine Pairing)
 * Large statement paired with high-resolution vertical nature visual.
 * 
 * TODO: Replace landingImages.statement.src with authentic Earth Heritage photography when delivered.
 */
export default function BrandStatement() {
  return (
    <SectionWrapper
      id="statement"
      padding="lg"
      className="bg-background-biscuit border-b border-border-subtle overflow-hidden"
      pattern={<LandContourPattern variant="biscuit-contours" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Asymmetric Editorial Typography (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          <MotionReveal>
            <Subtitle>A Living Perspective</Subtitle>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-text-primary leading-[1.12]">
              Land is more than an asset.<br />
              <span className="text-text-secondary font-normal italic">
                It is a living legacy.
              </span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <div className="space-y-4 max-w-xl text-text-secondary text-base sm:text-lg leading-relaxed pt-2">
              <p>
                Farmland is where tangible ownership connects with the rhythms of nature. It cannot be reproduced, only nurtured with long-term purpose.
              </p>
              <p className="text-sm sm:text-base text-text-muted">
                Earth Heritage was founded on the belief that owning land should bring clarity, pride, and generational continuity — without the day-to-day operational burden of managing a working farm alone.
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.3}>
            <div className="pt-4 border-l-2 border-brand-primary pl-4 text-xs uppercase tracking-widest text-brand-deep font-semibold">
              Rooted in stewardship &bull; Built for generations
            </div>
          </MotionReveal>
        </div>

        {/* Right: Large Editorial Nature Image (5 cols) */}
        <div className="lg:col-span-5">
          <MotionReveal delay={0.2}>
            <div className="relative rounded-lg overflow-hidden shadow-card border border-border bg-surface aspect-[4/5] sm:aspect-[3/4]">
              <Image
                src={landingImages.statement.src}
                alt={landingImages.statement.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white/90 text-xs font-sans">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">
                  Nature at the Center
                </span>
                <p className="text-xs text-white/80 line-clamp-1 pt-0.5">
                  Thoughtful farm management and responsible land stewardship.
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </div>
    </SectionWrapper>
  );
}
