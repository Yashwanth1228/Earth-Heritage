'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { aboutData } from '@/data/aboutData';

/**
 * 06 — Founders Section: Alternating Editorial Founder Story
 * 
 * SATHISH AGASTYA & KHUSHI JAIN
 * - Alternating 2-row editorial composition:
 *   Row 1: [ Sathish Image ] [ Sathish Information ]
 *   Row 2: [ Khushi Information ] [ Khushi Image ]
 * - Mobile: Each row transforms into a clean vertical stack (Image -> Information)
 * - 4:5 executive portrait frames with identical visual dimensions and restrained borders
 * - Equal typography hierarchy, visual prominence, and generous whitespace
 * - Safe area spacing ensuring zero collision with floating enquiry button
 */
export default function FoundersSection() {
  const { eyebrow, heading, subheading, profiles } = aboutData.founders;
  const [sathish, khushi] = profiles;

  return (
    <section
      id="founders"
      className="relative bg-[#F5E9D3] text-[#111613] pt-16 sm:pt-20 lg:pt-24 pb-28 sm:pb-36 lg:pb-44 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Leadership & Founders Story: Sathish Agastya and Khushi Jain"
    >
      {/* Organic Background Language: Architectural Land Survey Curves */}
      <LandContourPattern variant="biscuit-architectural" className="opacity-90 pointer-events-none" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 lg:mb-28">
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

        {/* Alternating Editorial Founder Story Rows */}
        <div className="space-y-20 sm:space-y-28 lg:space-y-36">

          {/* =========================================================================
              ROW 1: SATHISH AGASTYA (Desktop: Image Left, Info Right | Mobile: Image Top, Info Below)
              ========================================================================= */}
          {sathish && (
            <article aria-label={`Founder Story: ${sathish.name}`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
                
                {/* Left on Desktop / Top on Mobile: Portrait Photograph */}
                <div className="lg:col-span-5 w-full">
                  <MotionReveal delay={0.15}>
                    <div className="relative w-full max-w-md mx-auto lg:max-w-none aspect-[4/5] rounded-xl overflow-hidden bg-[#E8DFC8] border border-[#D5C09D] shadow-[0_12px_32px_rgba(17,22,19,0.06)] group">
                      <Image
                        src={sathish.image}
                        alt={sathish.imageAlt || `${sathish.name}, ${sathish.role}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px"
                        quality={95}
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
                        priority
                      />
                    </div>
                  </MotionReveal>
                </div>

                {/* Right on Desktop / Below on Mobile: Founder Information */}
                <div className="lg:col-span-7 space-y-6">
                  <MotionReveal delay={0.25}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#1E460B] tracking-wider uppercase font-semibold px-3 py-1 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D]">
                          {sathish.role}
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#111613] leading-[1.12]">
                        {sathish.name}
                      </h3>

                      {sathish.positioning && (
                        <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#8C7A5A] uppercase">
                          {sathish.positioning}
                        </p>
                      )}
                    </div>
                  </MotionReveal>

                  {/* Biography Paragraph */}
                  {sathish.bio && (
                    <MotionReveal delay={0.3}>
                      <p className="font-sans text-base sm:text-lg text-[#2E3B30] font-normal leading-relaxed">
                        {sathish.bio}
                      </p>
                    </MotionReveal>
                  )}

                  {/* Verified Background Pillars */}
                  {sathish.background && (
                    <MotionReveal delay={0.35}>
                      <div className="pt-4 border-t border-[#DCCDB7]/80">
                        <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C7A5A] font-semibold mb-3">
                          Leadership &amp; Agronomic Experience
                        </h4>
                        <ul className="space-y-2.5" aria-label={`Verified background for ${sathish.name}`}>
                          {sathish.background.map((point, pointIdx) => (
                            <li key={pointIdx} className="flex items-start gap-3 text-sm sm:text-[15px] text-[#38423A] font-normal leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] shrink-0 mt-2" aria-hidden="true" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </MotionReveal>
                  )}

                  {/* Pull Quote */}
                  {sathish.quote && (
                    <MotionReveal delay={0.4}>
                      <blockquote className="pt-2">
                        <div className="border-l-2 border-[#1E460B]/40 pl-5 sm:pl-6 py-1">
                          <p className="font-serif text-base sm:text-lg italic text-[#1E460B] leading-relaxed">
                            “{sathish.quote}”
                          </p>
                        </div>
                      </blockquote>
                    </MotionReveal>
                  )}
                </div>

              </div>
            </article>
          )}

          {/* Refined Editorial Row Divider */}
          <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center">
            <div className="w-full border-t border-[#D5C09D]/60" />
            <div className="absolute w-2 h-2 rounded-full bg-[#8C7A5A]/40" />
          </div>

          {/* =========================================================================
              ROW 2: KHUSHI JAIN (Desktop: Info Left, Image Right | Mobile: Image Top, Info Below)
              ========================================================================= */}
          {khushi && (
            <article aria-label={`Founder Story: ${khushi.name}`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">

                {/* Left on Desktop / Below on Mobile: Founder Information */}
                <div className="order-2 lg:order-1 lg:col-span-7 space-y-6">
                  <MotionReveal delay={0.25}>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-[#1E460B] tracking-wider uppercase font-semibold px-3 py-1 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D]">
                          {khushi.role}
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl sm:text-4xl lg:text-[44px] font-normal tracking-tight text-[#111613] leading-[1.12]">
                        {khushi.name}
                      </h3>

                      {khushi.positioning && (
                        <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#8C7A5A] uppercase">
                          {khushi.positioning}
                        </p>
                      )}
                    </div>
                  </MotionReveal>

                  {/* Biography Paragraph */}
                  {khushi.bio && (
                    <MotionReveal delay={0.3}>
                      <p className="font-sans text-base sm:text-lg text-[#2E3B30] font-normal leading-relaxed">
                        {khushi.bio}
                      </p>
                    </MotionReveal>
                  )}

                  {/* Verified Background Pillars */}
                  {khushi.background && (
                    <MotionReveal delay={0.35}>
                      <div className="pt-4 border-t border-[#DCCDB7]/80">
                        <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C7A5A] font-semibold mb-3">
                          Leadership &amp; Strategic Experience
                        </h4>
                        <ul className="space-y-2.5" aria-label={`Verified background for ${khushi.name}`}>
                          {khushi.background.map((point, pointIdx) => (
                            <li key={pointIdx} className="flex items-start gap-3 text-sm sm:text-[15px] text-[#38423A] font-normal leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] shrink-0 mt-2" aria-hidden="true" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </MotionReveal>
                  )}

                  {/* Pull Quote */}
                  {khushi.quote && (
                    <MotionReveal delay={0.4}>
                      <blockquote className="pt-2">
                        <div className="border-l-2 border-[#1E460B]/40 pl-5 sm:pl-6 py-1">
                          <p className="font-serif text-base sm:text-lg italic text-[#1E460B] leading-relaxed">
                            “{khushi.quote}”
                          </p>
                        </div>
                      </blockquote>
                    </MotionReveal>
                  )}
                </div>

                {/* Right on Desktop / Top on Mobile: Portrait Photograph */}
                <div className="order-1 lg:order-2 lg:col-span-5 w-full">
                  <MotionReveal delay={0.15}>
                    <div className="relative w-full max-w-md mx-auto lg:max-w-none aspect-[4/5] rounded-xl overflow-hidden bg-[#E8DFC8] border border-[#D5C09D] shadow-[0_12px_32px_rgba(17,22,19,0.06)] group">
                      <Image
                        src={khushi.image}
                        alt={khushi.imageAlt || `${khushi.name}, ${khushi.role}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 640px"
                        quality={95}
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
                        priority
                      />
                    </div>
                  </MotionReveal>
                </div>

              </div>
            </article>
          )}

        </div>
      </Container>
    </section>
  );
}
