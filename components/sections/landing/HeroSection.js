'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import Container from '@/components/ui/Container';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { landingImages } from '@/data/landingImages';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * 1. HeroSection — Image-Led Cinematic Experience
 * Full-screen landscape visual with elegant editorial typography overlay.
 * Features restrained GSAP ScrollTrigger image zoom from 1.00 to 1.07 during scroll.
 */
export default function HeroSection() {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { openEnquiryModal } = useEnquiry();

  // Cinematic scroll zoom tied to scroll progress using GSAP ScrollTrigger
  useEffect(() => {
    if (shouldReduceMotion || !heroRef.current || !imageRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.0 },
        {
          scale: 1.07,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
            invalidateOnRefresh: true
          }
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-22 pb-14 sm:pb-16"
      aria-label="Earth Heritage — Managed Farmland"
    >
      {/* 1. Dominant Full-Screen Landscape Photography with Restrained Scroll Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          ref={imageRef}
          className="relative w-full h-full transform-gpu will-change-transform origin-center"
          style={{ transform: 'scale(1)' }}
        >
          <Image
            src={landingImages.hero.src}
            alt={landingImages.hero.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Calibrated Background Overlay (+10% Darker: 58% Base Overlay) */}
        {/* 58% base shade balancing rich scenery with high-contrast typography */}
        <div
          className="absolute inset-0 bg-black/58 pointer-events-none"
          aria-hidden="true"
        />
        {/* Top-down gradient for top header contrast */}
        <div
          className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        {/* Bottom grounding gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        {/* Soft edge vignette preserving luminous center */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.32)_100%)] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Hero Content: Centered Editorial Composition with Generous Top Breathing Room */}
      <Container size="wide" className="relative z-10 w-full">
        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-7 flex flex-col items-center">
          {/* Eyebrow Pill / Category Badge */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1A2218]/90 border border-[#9A814F]/50 backdrop-blur-md shadow-sm">
              <span className="text-[#B88E3E] text-xs select-none" aria-hidden="true">✦</span>
              <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium text-[#B88E3E]">
                Managed Farmland &bull; Land Ownership &amp; Stewardship
              </span>
            </div>
          </motion.div>

          {/* Primary Signature Headline (Editorial Serif: Roman Line 1 + Cursive Italic Line 2) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[98px] tracking-tight leading-[1.05] sm:leading-[1.06]">
              {/* Line 1: Pure crisp white / ivory serif without black drop shadow */}
              <span className="block text-[#FFFFFF] font-normal">
                Own a Piece of Earth.
              </span>
              {/* Line 2: Elegant cursive italic serif in pure dark gold color without black drop shadow */}
              <span className="block italic text-[#B88E3E] font-normal mt-1 sm:mt-2">
                Build a Legacy.
              </span>
            </h1>
          </motion.div>

          {/* Supporting Copy: Centered with refined weight & warm tone */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <p className="font-sans text-base sm:text-lg md:text-[20px] text-[#EDE7DE]/90 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
              Managed farmland for people who want to own land, stay connected to nature, and build something meaningful for the long term.
            </p>
          </motion.div>

          {/* Centered CTA Buttons Matching Reference Styling */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
          >
            {/* Primary Action Button (White Pill with dark text and right arrow) */}
            <Link
              href="#statement"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-[#F7F4EC] text-[#152B1B] hover:bg-white text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase shadow-[0_6px_20px_rgba(0,0,0,0.22)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all duration-200"
            >
              <span>Discover Earth Heritage</span>
              <ArrowRight className="w-4 h-4 text-[#152B1B]" aria-hidden="true" />
            </Link>

            {/* Secondary Action Button (Forest Green Pill with cream text) */}
            <button
              type="button"
              onClick={(e) => openEnquiryModal('General Enquiry', e.currentTarget)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full bg-[#183622]/85 hover:bg-[#1E432A] border border-[#346642]/65 text-[#EDE7DD] text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase shadow-[0_6px_20px_rgba(0,0,0,0.22)] hover:shadow-[0_8px_25px_rgba(0,0,0,0.3)] hover:scale-[1.02] backdrop-blur-md transition-all duration-200"
            >
              <span>Talk to Us</span>
            </button>
          </motion.div>

          {/* Subtle Bottom Scroll Indicator Matching Reference Placement */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="pt-8 sm:pt-12"
          >
            <Link
              href="#statement"
              className="flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
              aria-label="Scroll to explore"
            >
              <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#DCD4C7]/85 font-medium group-hover:text-white transition-colors">
                Scroll to explore
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#DCD4C7]/75 group-hover:text-white animate-bounce transition-colors" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
