import SectionWrapper from '@/components/sections/SectionWrapper';
import MotionReveal from '@/components/animations/MotionReveal';
import { Subtitle } from '@/components/ui/Typography';
import { companyData } from '@/data/company';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * 6. HowItWorksSection — Visual Journey
 * 01 — You Own the Land
 * 02 — We Manage
 * 03 — We Cultivate
 * 04 — Your Farm Thrives
 * Large horizontal visual timeline on desktop avoiding generic cards.
 */
export default function HowItWorksSection() {
  return (
    <SectionWrapper
      id="how-it-works"
      padding="lg"
      className="bg-background-biscuit-light border-b border-border-subtle overflow-hidden"
      pattern={<LandContourPattern variant="biscuit-journey" />}
    >
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <MotionReveal>
            <Subtitle>The Journey</Subtitle>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-text-primary leading-[1.14]">
              A Clear Path from Land to Legacy
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
              Our model aligns clean title ownership with professional farm management from day one.
            </p>
          </MotionReveal>
        </div>

        {/* Large Horizontal Timeline Progression on Desktop */}
        <div className="relative">
          {/* Subtle horizontal connecting guideline on desktop */}
          <div
            className="hidden lg:block absolute top-7 left-0 right-0 h-0.5 bg-border z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 relative z-10">
            {companyData.howItWorksSteps.map((step, idx) => (
              <MotionReveal key={step.number} delay={idx * 0.1} className="space-y-5">
                {/* Step Marker Node */}
                <div className="flex items-center gap-3">
                  <span className="w-14 h-14 rounded-full bg-surface border-2 border-brand-primary text-brand-deep font-serif text-xl font-normal flex items-center justify-center shadow-sm">
                    {step.number}
                  </span>
                  <span className="lg:hidden font-mono text-xs uppercase tracking-widest text-text-muted">
                    Step 0{idx + 1}
                  </span>
                </div>

                <div className="space-y-2 pt-2 border-t border-border lg:border-t-0">
                  <h3 className="font-serif text-lg sm:text-xl font-normal text-text-primary tracking-tight">
                    {step.title}
                  </h3>

                  <p className="font-sans text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
