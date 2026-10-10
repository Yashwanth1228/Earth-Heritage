'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { aboutData } from '@/data/aboutData';
import { cn } from '@/lib/utils';

/**
 * Single Founder Profile with Compact Two-Column Editorial Layout
 * 
 * - Left column (34-38%): Moderately sized portrait photograph
 * - Right column (58-62%): All founder narrative content arranged vertically:
 *     1. Founder name
 *     2. Role & title positioning
 *     3. Biography narrative
 *     4. Leadership / agronomic / strategic experience bullet points
 *     5. Pull quote
 */
function FounderProfileCard({ profile, priority = false }) {
  if (!profile) return null;

  const experienceHeading =
    profile.id === 'sathish-agastya'
      ? 'Leadership & Agronomic Experience'
      : 'Leadership & Strategic Experience';

  return (
    <article
      aria-label={`Founder Story: ${profile.name}`}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 xl:gap-14 items-start">
        
        {/* Left Column: Portrait Photograph (~34-38% width) */}
        <div className="w-full md:w-[38%] lg:w-[36%] shrink-0">
          <MotionReveal delay={0.15}>
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] md:max-w-none mx-auto aspect-[4/5] rounded-xl overflow-hidden bg-[#E8DFC8] border border-[#D5C09D] shadow-[0_12px_32px_rgba(17,22,19,0.06)] group">
              <Image
                src={profile.image}
                alt={profile.imageAlt || `${profile.name}, ${profile.role}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 40vw, 400px"
                quality={95}
                className={cn(
                  'object-cover transition-transform duration-700 group-hover:scale-[1.015]',
                  profile.id === 'khushi-jain' ? 'object-[center_20%]' : 'object-center'
                )}
                priority={priority}
              />
            </div>
          </MotionReveal>
        </div>

        {/* Right Column: All Founder Information (~58-62% width) */}
        <div className="w-full md:flex-1 flex flex-col space-y-5 pt-0.5">
          
          {/* 1. Name & Role/Title */}
          <MotionReveal delay={0.2}>
            <div className="space-y-1.5">
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-[40px] font-normal tracking-tight text-[#111613] leading-[1.12]">
                {profile.name}
              </h3>

              {profile.positioning && (
                <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[#8C7A5A] uppercase">
                  {profile.positioning}
                </p>
              )}
            </div>
          </MotionReveal>

          {/* 2. Main Biography Narrative */}
          {profile.bio && (
            <MotionReveal delay={0.25}>
              <p className="font-sans text-sm sm:text-base text-[#2E3B30] font-normal leading-relaxed">
                {profile.bio}
              </p>
            </MotionReveal>
          )}

          {/* 3. Verified Leadership & Experience Bullet Points */}
          {profile.background && (
            <MotionReveal delay={0.3}>
              <div className="pt-3 border-t border-[#DCCDB7]/70">
                <h4 className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C7A5A] font-semibold mb-2.5">
                  {experienceHeading}
                </h4>
                <ul
                  className="space-y-2"
                  aria-label={`Verified background for ${profile.name}`}
                >
                  {profile.background.map((point, pointIdx) => (
                    <li
                      key={pointIdx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[#38423A] font-normal leading-relaxed"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[#55C40D] shrink-0 mt-1.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </MotionReveal>
          )}

          {/* 4. Pull Quote */}
          {profile.quote && (
            <MotionReveal delay={0.35}>
              <blockquote className="pt-1">
                <div className="border-l-2 border-[#1E460B]/40 pl-4 py-1">
                  <p className="font-serif text-sm sm:text-base italic text-[#1E460B] leading-relaxed">
                    “{profile.quote}”
                  </p>
                </div>
              </blockquote>
            </MotionReveal>
          )}

        </div>
      </div>
    </article>
  );
}

/**
 * 06 — Founders Section: Two-Column Editorial Layout
 * 
 * SATHISH AGASTYA & KHUSHI JAIN
 * - Balanced Two-Column Structure:
 *   Left: Moderately sized portrait photograph (34-38%)
 *   Right: All narrative & experience details (55-60%)
 * - Unified presentation for both founders
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
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 lg:mb-24">
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

        {/* Consistent Two-Column Founder Profiles */}
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {sathish && <FounderProfileCard profile={sathish} priority />}

          {sathish && khushi && (
            <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center">
              <div className="w-full border-t border-[#D5C09D]/60" />
              <div className="absolute w-2 h-2 rounded-full bg-[#8C7A5A]/40" />
            </div>
          )}

          {khushi && <FounderProfileCard profile={khushi} priority={false} />}
        </div>
      </Container>
    </section>
  );
}
