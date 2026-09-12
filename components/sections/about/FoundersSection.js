'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { aboutData } from '@/data/aboutData';

/**
 * 06 — Founders Section
 * 
 * Heading: "Two journeys. One vision."
 * Sathish Agastya & Khushi Jain verified profiles with architectural monogram placeholders.
 * Set on warm neutral background with subtle organic survey framing.
 */
export default function FoundersSection() {
  const { eyebrow, heading, subheading, profiles } = aboutData.founders;

  return (
    <section
      id="founders"
      className="relative bg-[#F5E9D3] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Leadership: Sathish Agastya and Khushi Jain"
    >
      {/* Visible Organic Background Language: Architectural Land Survey Curves */}
      <LandContourPattern variant="biscuit-architectural" className="opacity-95" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-[#111613] leading-[1.14]">
              {heading}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {subheading}
            </p>
          </MotionReveal>
        </div>

        {/* 2 Side-by-Side Founder Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {profiles.map((founder, idx) => (
            <MotionReveal key={founder.id} delay={0.15 + idx * 0.1} className="h-full">
              <article className="h-full bg-white/95 rounded-2xl sm:rounded-3xl border border-[#D5C09D] p-8 sm:p-10 lg:p-12 shadow-[0_8px_30px_rgba(17,22,19,0.05)] flex flex-col justify-between space-y-8 backdrop-blur-xs">
                <div>
                  {/* Architectural Portrait Placeholder Slot */}
                  <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden bg-[#F0E0C6]/70 border border-[#D5C09D] mb-8 flex flex-col items-center justify-center p-6 text-center">
                    {/* Subtle geometric contour grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(#D5C09D_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />

                    <div className="relative z-10 space-y-3">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-[#EAD5B5] border-2 border-[#1E460B]/35 flex items-center justify-center text-xl sm:text-2xl font-serif font-bold text-[#1E460B] shadow-inner">
                        {founder.initials}
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1E460B]/10 text-[10px] font-mono uppercase tracking-wider text-[#1E460B] font-semibold">
                          Executive Portrait Slot
                        </span>
                        <p className="text-xs font-sans text-[#5E6960]">
                          Reserved for official photography of {founder.name}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Founder Identification */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-baseline justify-between flex-wrap gap-2">
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-[#111613]">
                        {founder.name}
                      </h3>
                      <span className="font-mono text-xs text-[#1E460B] tracking-wider uppercase font-semibold px-2.5 py-0.5 rounded-full bg-[#EAD5B5]/60 border border-[#D5C09D]">
                        {founder.role}
                      </span>
                    </div>

                    {founder.positioning && (
                      <p className="font-sans text-xs sm:text-sm font-medium tracking-wide text-[#8C7A64] uppercase">
                        {founder.positioning}
                      </p>
                    )}
                  </div>

                  {/* Verified Details Bullet Points */}
                  <ul className="space-y-3 pt-4 border-t border-[#E6D8C3] mb-8" aria-label={`Verified background for ${founder.name}`}>
                    {founder.background.map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start gap-3 text-sm text-[#38423A] font-normal leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] shrink-0 mt-2" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Verified Founder Quote */}
                <blockquote className="pt-6 border-t border-[#E6D8C3] bg-[#F5E9D3]/50 p-4 sm:p-5 rounded-xl border border-[#D5C09D]/50">
                  <p className="font-serif text-base sm:text-lg italic text-[#1E460B] leading-relaxed">
                    “{founder.quote}”
                  </p>
                </blockquote>
              </article>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
