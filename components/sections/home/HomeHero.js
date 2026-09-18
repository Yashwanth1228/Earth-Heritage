'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * Senior-Level Corporate Home Hero — Earth Heritage
 * 
 * Aesthetic Direction:
 * EDITORIAL · ARCHITECTURAL · NATURAL · CONFIDENT · RESTRAINED
 * 
 * Design Features:
 * 1. Warm ivory canvas (#FAF7F2) avoiding generic dark-green blocks.
 * 2. Full-viewport asymmetric editorial composition with generous negative space.
 * 3. Dominant, authentic photographic field occupying 55-60% of the desktop composition.
 * 4. Fraunces display typography carefully set with restrained leading and proportion.
 * 5. Two crisp, non-pill, non-glowing corporate actions.
 * 6. One subtle creative detail: An architectural coordinate datum (12°58'N · 77°35'E · 01 / LAND & STEWARDSHIP).
 * 7. Barely perceptible scroll-driven motion (scale 1 -> 1.03, subtle text shift).
 * 8. Deliberate mobile recomposition with image dominant and zero horizontal overflow.
 * 9. id="hero" coordinates with useFloatingControls for scroll-based CTA reveals.
 * 10. data-navbar-theme="light" ensures pristine contrast with the ivory header region.
 */
export default function HomeHero() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { openEnquiryModal } = useEnquiry();

  // Gentle, barely perceptible scroll-driven motion (respects reduced motion)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.03]);
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '3%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], shouldReduceMotion ? [1, 1] : [1, 0.35]);

  return (
    <section
      ref={heroRef}
      id="hero"
      data-navbar-theme="light"
      className="relative w-full min-h-screen bg-[#FAF7F2] text-[#111A13] overflow-hidden pt-24 sm:pt-28 lg:pt-32 border-b border-[#102B17]/10 flex flex-col justify-between"
      aria-label="Earth Heritage Corporate Hero"
    >
      {/* ============================================================== */}
      {/* 1. EDITORIAL ASYMMETRIC GRID (DESKTOP) / RECOMPOSED (MOBILE)   */}
      {/* ============================================================== */}
      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-12 items-stretch">
        
        {/* ------------------------------------------------------------ */}
        {/* COLUMN A: EDITORIAL MASTHEAD & BRAND STATEMENTS (5 COLS)     */}
        {/* ------------------------------------------------------------ */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="lg:col-span-5 flex flex-col justify-between px-6 sm:px-10 lg:pl-16 lg:pr-8 py-8 sm:py-12 lg:py-14 z-10"
        >
          {/* Top: Eyebrow + Subtle Architectural Datum */}
          <div className="flex items-center gap-3 pt-2">
            <span className="font-mono text-[11px] sm:text-xs tracking-[0.26em] uppercase text-[#1B3B22] font-semibold">
              Earth Heritage
            </span>
            <span className="h-px w-8 bg-[#102B17]/25" aria-hidden="true" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#55695B] uppercase hidden sm:inline-block">
              Est. 2026
            </span>
          </div>

          {/* Center: Editorial Display Headline, Supporting Line & CTAs */}
          <div className="my-auto py-8 sm:py-12 lg:py-8 space-y-6 lg:space-y-7">
            {/* Display Headline in Fraunces Serif */}
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[40px] sm:text-[52px] md:text-[58px] lg:text-[54px] xl:text-[64px] font-normal tracking-[-0.025em] text-[#111A13] leading-[1.04]"
            >
              Own a Piece <br className="hidden sm:inline" />
              of Earth. <br />
              <span className="font-light text-[#1B3B22]">
                Build a Legacy.
              </span>
            </motion.h1>

            {/* Concise Supporting Copy */}
            <motion.p
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-base sm:text-lg text-[#3E5244] font-normal leading-relaxed max-w-md"
            >
              Land ownership, managed with purpose.
            </motion.p>

            {/* Restrained Corporate Actions */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 sm:pt-4"
            >
              <Link
                href="/managed-farmland"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#102B17] hover:bg-[#194224] text-[#FAF7F2] text-xs font-medium tracking-[0.14em] uppercase transition-colors duration-200 rounded-[2px] shadow-xs text-center"
              >
                <span>Explore Managed Farmland</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FAF7F2]" aria-hidden="true" />
              </Link>

              <button
                type="button"
                onClick={(e) => openEnquiryModal('Corporate Home Hero', e.currentTarget)}
                className="inline-flex items-center justify-center px-6 py-3.5 border border-[#102B17]/35 hover:border-[#102B17] text-[#102B17] hover:bg-[#102B17]/5 text-xs font-medium tracking-[0.14em] uppercase transition-all duration-200 rounded-[2px] text-center"
              >
                <span>Talk to Us</span>
              </button>
            </motion.div>
          </div>

          {/* Bottom: Subtle Architectural Index Detail (Desktop) */}
          <div className="hidden lg:flex items-center justify-between text-[11px] font-mono text-[#55695B] tracking-wider pt-6 border-t border-[#102B17]/10">
            <span>01 / LAND &amp; STEWARDSHIP</span>
            <span>12°58&apos;N · 77°35&apos;E</span>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------ */}
        {/* COLUMN B: DOMINANT AUTHENTIC PHOTOGRAPHIC PLANE (7 COLS)     */}
        {/* ------------------------------------------------------------ */}
        <div className="lg:col-span-7 relative w-full h-[360px] sm:h-[480px] lg:h-full min-h-[380px] lg:min-h-[580px] overflow-hidden border-t lg:border-t-0 lg:border-l border-[#102B17]/12 bg-[#122417]">
          {/* Subtle slow scale/parallax image */}
          <motion.div
            style={{ scale: imageScale, y: imageY }}
            className="relative w-full h-full will-change-transform"
          >
            <Image
              src="/images/about/philosophy-farmland.jpg"
              alt="Rolling terraced agricultural farmland with traditional stone estate villa under natural golden sunlight"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover object-[65%_center] lg:object-center"
            />
            {/* Very delicate natural vignette for visual depth */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#102B17]/40 via-transparent to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>

          {/* Subtle Architectural Photo Metadata Marker */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-[2px] bg-[#102B17]/75 backdrop-blur-xs text-[10px] font-mono uppercase tracking-[0.2em] text-[#E8DCC8] border border-white/10">
              <span className="w-1 h-1 rounded-full bg-[#E2B755]" aria-hidden="true" />
              <span>Terraced Cultivation · Estate Perspective</span>
            </span>
          </div>
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. ARCHITECTURAL BOTTOM STATUS BAR (MOBILE & TABLET)           */}
      {/* ============================================================== */}
      <div className="lg:hidden flex items-center justify-between px-6 py-3 text-[10px] sm:text-[11px] font-mono text-[#55695B] tracking-wider border-t border-[#102B17]/10 bg-[#FAF7F2]">
        <span>01 / LAND &amp; STEWARDSHIP</span>
        <span>12°58&apos;N · 77°35&apos;E</span>
      </div>
    </section>
  );
}
