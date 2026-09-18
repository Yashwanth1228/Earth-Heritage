import SectionWrapper from '@/components/sections/SectionWrapper';
import MotionReveal from '@/components/animations/MotionReveal';
import { Subtitle } from '@/components/ui/Typography';
import { companyData } from '@/data/company';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * 9. FoundersSection — "Two journeys. One vision."
 * Premium editorial composition for co-founders Sathish Agastya & Khushi Jain.
 * 
 * TODO: Replace portrait placeholder slots with authentic founder photography when delivered.
 */
export default function FoundersSection() {
  const founders = companyData.founders;

  return (
    <SectionWrapper
      id="founders"
      padding="lg"
      className="bg-background-biscuit-light border-b border-border-subtle overflow-hidden"
      pattern={<LandContourPattern variant="biscuit-architectural" />}
    >
      <div className="space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <MotionReveal>
            <Subtitle>Leadership & Stewardship</Subtitle>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-text-primary leading-[1.14]">
              Two Journeys.<br />
              <span className="text-text-secondary font-normal italic">
                One Vision.
              </span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed">
              United by a shared commitment to land stewardship, professional farm management, and building an enduring generational legacy.
            </p>
          </MotionReveal>
        </div>

        {/* Editorial Two-Founder Composition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl">
          {founders.map((founder, idx) => (
            <MotionReveal key={founder.name} delay={idx * 0.15}>
              <div className="group rounded-lg overflow-hidden border border-border bg-surface shadow-card transition-all duration-300 hover:shadow-card-hover">
                {/* Large Editorial Portrait Placeholder Slot (Preserved without stock photos) */}
                <div className="relative overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#1A221C] via-[#222D25] to-[#141B16] flex items-center justify-center p-8">
                  {/* Subtle architectural contour lines */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
                    <svg className="w-full h-full" viewBox="0 0 400 500" fill="none" preserveAspectRatio="none">
                      <circle cx="200" cy="250" r="180" stroke="white" strokeWidth="1" strokeDasharray="3 6" />
                      <circle cx="200" cy="250" r="120" stroke="currentColor" strokeWidth="1" className="text-brand-primary" />
                    </svg>
                  </div>

                  {/* Elegant architectural monogram insignia */}
                  <div className="relative z-10 text-center space-y-3">
                    <div className="w-20 h-20 rounded-full border border-brand-primary/40 bg-white/5 backdrop-blur-sm flex items-center justify-center mx-auto text-white font-serif text-2xl font-light tracking-wider shadow-inner group-hover:scale-105 transition-transform duration-300">
                      {founder.initials}
                    </div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-white/50">
                      Earth Heritage Leadership
                    </span>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-sm bg-black/60 text-white border border-white/10 backdrop-blur-sm">
                      {founder.role}
                    </span>
                  </div>
                </div>

                {/* Founder Credentials & Verified Factual Background */}
                <div className="p-6 sm:p-8 space-y-3 border-t border-border-subtle">
                  <div>
                    <h3 className="font-sans text-2xl font-medium text-text-primary tracking-tight">
                      {founder.name}
                    </h3>
                    <p className="font-sans text-xs uppercase tracking-widest text-brand-deep font-semibold pt-1">
                      {founder.role} &bull; Earth Heritage Pvt. Ltd.
                    </p>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed pt-1">
                    {founder.bio}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
