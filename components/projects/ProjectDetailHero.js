'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

/**
 * Image-First Editorial Project Showcase Hero for /projects/[slug]
 * 
 * Visual Standards:
 * - Dominant cinematic project photography occupying ~75–85vh of the first viewport
 * - Rounded corners consistent with Earth Heritage design philosophy
 * - Slow, subtle scale/zoom entrance animation respecting prefers-reduced-motion
 * - Integrated dark/earthy gradient overlay ensuring high contrast for typography
 * - Clean visual hierarchy: 01 / Category / Concept Pill -> Serif Title -> Narrative -> Subtle Disclosure
 * - Back to All Projects floating pill at top-left
 * - Pure data-driven architecture from data/projects.js
 */
export default function ProjectDetailHero({ project }) {
  const shouldReduceMotion = useReducedMotion();

  if (!project) return null;

  const {
    name,
    number,
    category,
    tagline,
    shortDescription,
    isDemo,
    heroImage,
    coverImage,
    images = []
  } = project;

  // Derive primary landscape visual
  const activeHeroImage = heroImage || coverImage || (images && images.length > 0 ? images[0] : null);
  const narrative = shortDescription || tagline || null;
  const projectNumber = number || '01';

  return (
    <section
      id="project-hero"
      data-navbar-theme="light"
      className="relative bg-[#FAF6F0] pt-20 sm:pt-24 lg:pt-26 pb-8 sm:pb-12 border-b border-[#DCCDB7]/70 overflow-hidden"
      aria-label={`${name} — Project Showcase`}
    >
      <div className="w-full max-w-[1440px] px-3 sm:px-6 lg:px-8 mx-auto">
        {/* Cinematic Image-First Banner Frame */}
        <div className="relative w-full h-[68svh] min-h-[460px] max-h-[580px] sm:h-[74vh] sm:min-h-[540px] sm:max-h-[700px] lg:h-[80vh] lg:min-h-[600px] lg:max-h-[820px] rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden border border-[#D5C09D]/60 shadow-[0_20px_50px_rgba(17,22,19,0.12)] bg-[#102B17]">
          
          {/* 1. Project Visual with Subtle Slow Scale Zoom */}
          {activeHeroImage && (
            <motion.div
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0.85 }}
              animate={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 1 }}
              transition={{
                scale: { duration: 12, ease: [0.25, 1, 0.5, 1] },
                opacity: { duration: 0.8, ease: 'easeOut' }
              }}
              className="relative w-full h-full transform-gpu will-change-transform origin-center"
            >
              <Image
                src={activeHeroImage.src}
                alt={activeHeroImage.alt || name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 96vw, 1440px"
                className="object-cover object-center"
              />
            </motion.div>
          )}

          {/* 2. Top-down Vignette Gradient (for header / back button readability) */}
          <div
            className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* 3. Bottom Earthy Forest Gradient (grounding overlay text while keeping landscape visible) */}
          <div
            className="absolute inset-x-0 bottom-0 h-[75%] sm:h-[65%] bg-gradient-to-t from-[#08170D]/95 via-[#08170D]/65 to-transparent pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* 4. Subtle Radial Ambience Vignette */}
          <div
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,23,13,0.3)_100%)] pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* 5. Return Navigation Pill (Top-Left Inside Banner) */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-20">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-xs sm:text-[13px] font-sans font-medium text-white/90 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
              aria-label="Return to Earth Heritage Projects catalog"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1 text-[#55C40D]" aria-hidden="true" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* 6. Overlay Project Information (Bottom Third) */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-8 lg:p-12 flex flex-col justify-end">
            <div className="max-w-4xl space-y-3 sm:space-y-4 lg:space-y-4.5">
              
              {/* Hierarchy 1: Project Identity (01 / Category / Concept Project) */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-2 sm:gap-3"
              >
                {/* Project Number */}
                {projectNumber && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[11px] sm:text-xs font-mono font-bold tracking-widest text-[#FAF6F0] shadow-2xs">
                    0{parseInt(projectNumber, 10) || projectNumber}
                  </span>
                )}

                {/* Category */}
                {category && (
                  <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-widest uppercase text-[#A4E082]">
                    {category}
                  </span>
                )}

                {/* Concept Project Eyebrow Pill */}
                {isDemo && (
                  <>
                    <span className="text-white/40 text-xs" aria-hidden="true">&bull;</span>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A381F]/85 backdrop-blur-md border border-[#55C40D]/40 text-[10px] sm:text-[11px] font-mono font-semibold tracking-widest text-[#A4E082] uppercase shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] animate-pulse" aria-hidden="true" />
                      <span>CONCEPT PROJECT</span>
                    </div>
                  </>
                )}
              </motion.div>

              {/* Hierarchy 2: Main Project Title (Cormorant Luxury Serif) */}
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF6F0] leading-[1.14] drop-shadow-sm"
              >
                {name}
              </motion.h1>

              {/* Hierarchy 3: Concise Supporting Description */}
              {narrative && (
                <motion.p
                  initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
                  className="font-sans text-xs sm:text-sm md:text-base lg:text-lg text-[#E4EDE6] font-normal leading-relaxed max-w-3xl drop-shadow-xs"
                >
                  {narrative}
                </motion.p>
              )}

              {/* Hierarchy 4: Subtle Integrated Concept Disclosure */}
              {isDemo && (
                <motion.div
                  initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.55 }}
                  className="pt-1 flex items-center gap-2 text-[11px] sm:text-xs font-mono text-[#BAC8BE]/85"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  <span>Concept project &bull; Preview presentation</span>
                </motion.div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
