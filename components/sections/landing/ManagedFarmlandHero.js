'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { ArrowRight } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * ManagedFarmlandHero — Dedicated Art-Directed Hero for /lp/managed-farmland
 * 
 * Creative Direction:
 * - Editorial landscape film + premium real-estate & legacy brand
 * - Full-viewport authentic landscape photography with subtle slow scale (1.00 -> 1.04)
 * - Restrained natural lighting with localized lower-left atmospheric vignette (no heavy blanket dark overlays)
 * - Asymmetrical text placement:
 *   - Upper-left: Subtle "EARTH HERITAGE • MANAGED FARMLAND" brand eyebrow and mobile logo
 *   - Lower-left / Left-center: Large editorial serif headline + concise supporting proposition
 * - Understated scroll interaction: "SCROLL TO EXPLORE" with a refined horizontal/vertical hairline accent
 * - Height: 85-88svh on mobile, 92-100svh on desktop
 * - Retains id="hero" and data-navbar-theme="dark" for existing navbar ScrollTrigger & floating controls
 */
export default function ManagedFarmlandHero() {
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { openEnquiryModal } = useEnquiry();

  return (
    <section
      id="hero"
      ref={heroRef}
      data-navbar-theme="dark"
      className="relative w-full h-[88svh] sm:h-[90svh] lg:h-screen min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-between overflow-hidden pt-5 sm:pt-7 lg:pt-8 pb-5 sm:pb-6 lg:pb-7 outline-none select-none"
      aria-label="Earth Heritage — Managed Farmland"
    >
      {/* 1. Full-Viewport Authentic Landscape Photography */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={false}
          animate={{ scale: shouldReduceMotion ? 1 : 1.04 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 8,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="absolute inset-0 w-full h-full transform-gpu will-change-transform origin-center"
        >
          <Image
            src="/images/landing/hero-landscape.jpg"
            alt="Expansive Earth Heritage managed farmland with verdant tree canopies under morning light"
            fill
            priority
            unoptimized
            className="object-cover object-[center_60%] sm:object-center"
          />
        </motion.div>

        {/* Cinematic Natural Atmosphere Treatment:
            - Subtle top gradient for header & eyebrow legibility
            - Localized bottom-left / lower vignette specifically behind text
            - Preserves radiant sunlight and horizon luminosity across upper-right landscape
        */}
        {/* Top-down gentle gradient */}
        <div
          className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Localized lower-left atmospheric shade behind text anchor */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent sm:bg-[radial-gradient(ellipse_at_bottom_left,rgba(10,18,12,0.85)_0%,rgba(10,18,12,0.35)_55%,transparent_75%)] pointer-events-none z-10"
          aria-hidden="true"
        />

        {/* Very gentle outer vignette */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.25)_100%)] pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>

      {/* 2. Top Region: Brand Eyebrow & Mobile Brand Identity */}
      <div className="relative z-20 w-full">
        <Container size="wide">
          <div className="flex items-center justify-between pt-1">
            
            {/* Top-Left Brand Eyebrow with Emblem */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3 sm:gap-4"
            >
              {/* Mobile-visible logo */}
              <div className="flex sm:hidden">
                <Logo variant="light" size="navbar" priority />
              </div>

              {/* Desktop Eyebrow Stamp */}
              <div className="hidden sm:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E]" aria-hidden="true" />
                <span className="font-mono text-[10px] lg:text-[11px] tracking-[0.24em] uppercase text-[#EDE7DD] font-medium">
                  Earth Heritage
                </span>
                <span className="text-[#B88E3E]/60 text-xs">&bull;</span>
                <span className="font-mono text-[10px] lg:text-[11px] tracking-[0.2em] uppercase text-[#D5C7B0] font-light">
                  Managed Farmland
                </span>
              </div>
            </motion.div>

            {/* Top-Right Geographic / Purpose Cue (Editorial detail) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 0.85 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-[#D8CFBF] uppercase"
            >
              <span>Long-Term Agricultural Stewardship</span>
            </motion.div>

          </div>
        </Container>
      </div>

      {/* 3. Lower-Left / Left-Center Typographic Anchor */}
      <div className="relative z-20 w-full mt-auto mb-4 sm:mb-6 lg:mb-6">
        <Container size="wide">
          <div className="max-w-3xl xl:max-w-4xl text-left">
            
            {/* Small Category Stamp on Mobile */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="sm:hidden mb-2"
            >
              <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.22em] text-[#D8CFBF] uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B88E3E]" aria-hidden="true" />
                <span>Managed Farmland</span>
              </span>
            </motion.div>

            {/* Display Headline (Fraunces Editorial Serif — Normal Title Case) */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-0.5 sm:space-y-1.5 drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]"
            >
              <h1 className="font-serif font-normal text-[32px] xs:text-[38px] sm:text-[48px] md:text-[56px] lg:text-[62px] xl:text-[68px] leading-[1.08] tracking-tight text-white">
                <span className="block font-normal">
                  Own a Piece of Earth.
                </span>
                <span className="block italic font-light text-[#F2CF84] mt-0.5 sm:mt-1">
                  Build a Legacy.
                </span>
              </h1>
            </motion.div>

            {/* Supporting Proposition: Concise, Pure Truth */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-2.5 sm:mt-3.5 max-w-xl"
            >
              <p className="font-sans text-sm sm:text-base md:text-[17px] lg:text-[18px] text-[#EDE7DD]/95 font-light leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
                You own the land. We manage the farm.
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#D8CFBF]/85 font-light leading-relaxed mt-1 hidden sm:block drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
                Retain complete registered ownership while our on-ground agricultural teams coordinate daily cultivation, crop care, and long-term farm stewardship.
              </p>
            </motion.div>

            {/* Balanced Action CTAs: Refined, Grounded Buttons */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 sm:gap-4 pt-4 sm:pt-5 w-full xs:w-auto"
            >
              {/* Primary Action Button: Luminous Ivory Cream */}
              <Link
                href="#statement"
                onClick={(e) => {
                  const target = document.getElementById('statement');
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#F7F4EC] text-[#152B1B] hover:bg-white text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.99]"
              >
                <span>Explore the Estate</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#152B1B]" aria-hidden="true" />
              </Link>

              {/* Secondary Action Button: Deep Forest Green Pill */}
              <button
                type="button"
                onClick={(e) => openEnquiryModal('Managed Farmland', e.currentTarget)}
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#163A20] hover:bg-[#1E4829] border border-[#386842] text-[#FAF7F2] text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase transition-all duration-200 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <span>Talk to Us</span>
              </button>
            </motion.div>

          </div>
        </Container>
      </div>

      {/* 4. Understated Bottom Scroll Cue (Hairline Indicator) */}
      <div className="relative z-20 w-full">
        <Container size="wide">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex items-center justify-between border-t border-white/10 pt-3 sm:pt-4"
          >
            {/* Left: Brand Creed Micro-Stamp */}
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-[#C9BEAA]/80 uppercase font-light">
              Back to Roots &bull; Forward with Purpose
            </span>

            {/* Right: Refined Hairline Scroll Indicator */}
            <Link
              href="#statement"
              onClick={(e) => {
                const target = document.getElementById('statement');
                if (target) {
                  e.preventDefault();
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2.5 group cursor-pointer"
              aria-label="Scroll to explore the landing page"
            >
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-[#D8CFBF]/80 uppercase group-hover:text-white transition-colors">
                Scroll to explore
              </span>
              <div className="w-4 h-px bg-[#B88E3E]/70 group-hover:w-6 transition-all duration-300" />
            </Link>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
