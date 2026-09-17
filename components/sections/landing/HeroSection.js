'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Container from '@/components/ui/Container';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroSlides } from '@/data/landingImages';
import { useEnquiry } from '@/context/EnquiryContext';

const SLIDE_DURATION = 6000; // 6 seconds per slide

/**
 * Editorial Word-by-Word Typography Revealer
 * Provides smooth staggered word entrances with luxury cubic-bezier easing.
 */
function AnimatedWords({ text, className = '', baseDelay = 0, wordClassName = '' }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="inline-block overflow-hidden py-0.5 align-top">
            <motion.span
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '115%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: shouldReduceMotion ? 0 : baseDelay + i * 0.075,
                ease: [0.16, 1, 0.3, 1]
              }}
              className={`inline-block ${wordClassName}`}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

/**
 * 1. HeroSection — Cinematic Multi-Slide Opening Experience
 * 
 * Features:
 * - 4-chapter narrative sequence defined centrally in data/landingImages.js
 * - Smooth crossfade transitions with continuous slow camera zoom (1.00 -> 1.07)
 * - Word-by-word font reveal animations for titles and smooth de-blur copy reveals
 * - Reliable uninterrupted autoplay timer (6s per slide)
 * - Removed numbered indicators for a clean, distraction-free cinematic presentation
 * - Preserves <section id="hero"> trigger for floating navbar visibility
 * - Full prefers-reduced-motion compliance
 */
export default function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { openEnquiryModal } = useEnquiry();

  const totalSlides = heroSlides.length;
  const currentSlide = heroSlides[currentSlideIndex];

  // Steady, uninterrupted autoplay interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [totalSlides]);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-22 pb-14 sm:pb-16 outline-none"
      aria-label="Earth Heritage — Managed Farmland"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      {/* 1. Dominant Full-Screen Landscape Photography with Restrained Scroll Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Image layers container */}
        <div className="absolute inset-0 z-0">
          {heroSlides.map((slide, index) => {
            const isActive = index === currentSlideIndex;

            return (
              <motion.div
                key={slide.id}
                initial={false}
                animate={{
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? (shouldReduceMotion ? 1 : 1.07) : 1
                }}
                transition={{
                  opacity: { duration: 1.2, ease: [0.4, 0, 0.2, 1] },
                  scale: {
                    duration: shouldReduceMotion ? 0 : 7,
                    ease: 'easeOut'
                  }
                }}
                style={{ zIndex: isActive ? 2 : 1 }}
                className="absolute inset-0 w-full h-full transform-gpu will-change-transform origin-center"
                aria-hidden={!isActive}
              >
                <Image
                  src={slide.image.src}
                  alt={slide.image.alt}
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className="object-cover object-center"
                />
                {slide.imageOverlay && (
                  <div className={`absolute inset-0 pointer-events-none ${slide.imageOverlay}`} aria-hidden="true" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Calibrated Background Overlay (+10% Darker: 58% Base Overlay) - EXACTLY AS BEFORE */}
        {/* 58% base shade balancing rich scenery with high-contrast typography */}
        <div
          className="absolute inset-0 bg-black/58 pointer-events-none z-10"
          aria-hidden="true"
        />
        {/* Top-down gradient for top header contrast */}
        <div
          className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-black/70 via-black/25 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        {/* Bottom grounding gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        {/* Soft edge vignette preserving luminous center */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.32)_100%)] pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>

      {/* 2. Hero Content: Synchronized Text Transitions with Adaptive Image-Based Colors */}
      <Container size="wide" className="relative z-20 w-full">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, filter: 'blur(4px)', transition: { duration: 0.45, ease: 'easeIn' } }}
              className="w-full text-center space-y-5 sm:space-y-7 flex flex-col items-center"
            >
              {/* Eyebrow Pill / Category Badge */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center"
              >
                <div className={`inline-flex items-center gap-2 px-4.5 sm:px-5 py-1.5 sm:py-2 rounded-full border backdrop-blur-md transition-colors duration-300 ${currentSlide.badgeClass || 'bg-[#1A2218]/90 border-[#9A814F]/50 shadow-sm'}`}>
                  <span className={`text-xs select-none ${currentSlide.badgeIconClass || 'text-[#B88E3E]'}`} aria-hidden="true">✦</span>
                  <span className={`font-sans text-[10px] sm:text-xs uppercase tracking-[0.22em] font-medium ${currentSlide.badgeTextClass || 'text-[#B88E3E]'}`}>
                    {currentSlide.eyebrow}
                  </span>
                </div>
              </motion.div>

              {/* Primary Signature Headline with Word-by-Word Reveal (Cormorant Garamond Serif) */}
              <div className={`w-full ${currentSlide.headingShadowClass || ''}`}>
                {currentSlide.isMainH1 ? (
                  <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[98px] tracking-tight leading-[1.05] sm:leading-[1.06]">
                    <span className={`block font-normal ${currentSlide.titleLine1Class || 'text-[#FFFFFF]'}`}>
                      <AnimatedWords text={currentSlide.titleLine1} baseDelay={0.12} wordClassName={currentSlide.titleLine1Class} />
                    </span>
                    <span className={`block italic font-normal mt-1 sm:mt-2 ${currentSlide.titleLine2Class || 'text-[#B88E3E]'}`}>
                      <AnimatedWords
                        text={currentSlide.titleLine2}
                        baseDelay={0.42}
                        wordClassName={currentSlide.titleLine2Class || 'italic text-[#B88E3E]'}
                      />
                    </span>
                  </h1>
                ) : (
                  <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[88px] xl:text-[98px] tracking-tight leading-[1.05] sm:leading-[1.06]">
                    <span className={`block font-normal ${currentSlide.titleLine1Class || 'text-[#FFFFFF]'}`}>
                      <AnimatedWords text={currentSlide.titleLine1} baseDelay={0.12} wordClassName={currentSlide.titleLine1Class} />
                    </span>
                    <span className={`block italic font-normal mt-1 sm:mt-2 ${currentSlide.titleLine2Class || 'text-[#B88E3E]'}`}>
                      <AnimatedWords
                        text={currentSlide.titleLine2}
                        baseDelay={0.42}
                        wordClassName={currentSlide.titleLine2Class || 'italic text-[#B88E3E]'}
                      />
                    </span>
                  </h2>
                )}
              </div>

              {/* Supporting Copy with Smooth De-blur Reveal */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.75,
                  delay: shouldReduceMotion ? 0 : 0.62,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="w-full"
              >
                <p className={`font-sans text-base sm:text-lg md:text-[20px] font-light leading-relaxed max-w-2xl mx-auto transition-colors duration-300 ${currentSlide.descriptionClass || 'text-[#EDE7DE]/90 drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]'}`}>
                  {currentSlide.description}
                </p>
              </motion.div>

              {/* Centered Action CTA Buttons */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduceMotion ? 0 : 0.78,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
              >
                <Link
                  href={currentSlide.primaryAction.href}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase hover:scale-[1.02] transition-all duration-200 ${currentSlide.primaryBtnClass || 'bg-[#F7F4EC] text-[#152B1B] hover:bg-white shadow-[0_6px_20px_rgba(0,0,0,0.22)]'}`}
                >
                  <span>{currentSlide.primaryAction.label}</span>
                  <ArrowRight className={`w-4 h-4 transition-colors ${currentSlide.primaryBtnIconClass || 'text-[#152B1B]'}`} aria-hidden="true" />
                </Link>

                <button
                  type="button"
                  onClick={(e) => openEnquiryModal('General Enquiry', e.currentTarget)}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase hover:scale-[1.02] backdrop-blur-md transition-all duration-200 ${currentSlide.secondaryBtnClass || 'bg-[#183622]/85 hover:bg-[#1E432A] border border-[#346642]/65 text-[#EDE7DD] shadow-[0_6px_20px_rgba(0,0,0,0.22)]'}`}
                >
                  <span>Talk to Us</span>
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* 3. Subtle Bottom Scroll Indicator */}
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
              <span className={`font-sans text-[10px] sm:text-[11px] tracking-[0.28em] uppercase font-medium transition-colors ${currentSlide.scrollIndicatorClass || 'text-[#DCD4C7]/85 group-hover:text-white'}`}>
                Scroll to explore
              </span>
              <ChevronDown className={`w-3.5 h-3.5 animate-bounce transition-colors ${currentSlide.scrollIndicatorClass || 'text-[#DCD4C7]/75 group-hover:text-white'}`} aria-hidden="true" />
            </Link>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
