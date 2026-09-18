'use client';

import Image from 'next/image';
import SectionWrapper from '@/components/sections/SectionWrapper';
import MotionReveal from '@/components/animations/MotionReveal';
import { Subtitle } from '@/components/ui/Typography';
import { companyData } from '@/data/company';
import { landingImages } from '@/data/landingImages';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * 8. PrinciplesSection — "Built around what matters."
 * Large typography + vertical editorial sequence + high-res detail visual.
 * 
 * TODO: Replace landingImages.principles.src with authentic Earth Heritage photography when delivered.
 */
export default function PrinciplesSection() {
  return (
    <SectionWrapper
      id="principles"
      padding="lg"
      className="bg-background-biscuit border-b border-border-subtle overflow-hidden"
      pattern={<LandContourPattern variant="biscuit-roots" />}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Title + Detail Photography (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8">
          <div className="space-y-4">
            <MotionReveal>
              <Subtitle>Foundational Approach</Subtitle>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-text-primary leading-[1.14]">
                Built around what matters.
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.2}>
              <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-md">
                Five core principles that govern our land stewardship, management decisions, and commitment to multi-generational value.
              </p>
            </MotionReveal>
          </div>

          {/* High-Resolution Land Detail Image */}
          <MotionReveal delay={0.3}>
            <div className="relative rounded-lg overflow-hidden shadow-card border border-border aspect-[16/10] bg-surface">
              <Image
                src={landingImages.principles.src}
                alt={landingImages.principles.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />
              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-sans">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brand-primary">
                  Long-Term Value
                </span>
                <p className="text-xs text-white/90 line-clamp-1">
                  Stewardship rooted in sustainable natural practice.
                </p>
              </div>
            </div>
          </MotionReveal>
        </div>

        {/* Right Column: Flowing 5-Principle Editorial Sequence (7 cols) */}
        <div className="lg:col-span-7 divide-y divide-border border-t border-border lg:border-t-0">
          {companyData.principles.map((principle, idx) => (
            <MotionReveal key={idx} delay={idx * 0.08} className="py-7 first:pt-0 last:pb-0">
              <div className="space-y-2">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-semibold text-brand-deep tracking-wider">
                    0{idx + 1}
                  </span>
                  <h3 className="font-sans text-xl sm:text-2xl font-medium text-text-primary tracking-tight">
                    {principle.title}
                  </h3>
                </div>
                <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed pl-8">
                  {principle.description}
                </p>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
