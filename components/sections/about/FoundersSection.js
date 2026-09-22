'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { aboutData } from '@/data/aboutData';

/**
 * 06 — Founders Section
 * 
 * Leadership: Sathish Agastya & Khushi Jain authentic leadership portrait presentation.
 * Refined editorial layout featuring two side-by-side portrait panels on desktop,
 * vertically stacked on mobile, with equal visual height, clean framing, and verified profiles.
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
              <article className="h-full bg-white rounded-xl sm:rounded-2xl border border-[#D5C09D] p-6 sm:p-8 lg:p-10 shadow-[0_4px_24px_rgba(17,22,19,0.04)] flex flex-col justify-between space-y-8">
                <div>
                  {/* Executive Portrait Panel */}
                  <div className="relative w-full aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden bg-[#E8DFC8] border border-[#D5C09D] mb-8 shadow-xs">
                    {founder.image ? (
                      <Image
                        src={founder.image}
                        alt={founder.imageAlt || `${founder.name}, ${founder.role}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 540px"
                        className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                        style={{ objectPosition: founder.imagePosition || 'center 15%' }}
                        priority={idx === 0}
                      />
                    ) : null}
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
                <blockquote className="pt-6 border-t border-[#E6D8C3] bg-[#F5E9D3]/50 p-4 sm:p-5 rounded-lg border border-[#D5C09D]/50">
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
