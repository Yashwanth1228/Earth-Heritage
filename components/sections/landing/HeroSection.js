'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { heroSlides } from '@/data/landingImages';
import { useEnquiry } from '@/context/EnquiryContext';
import Logo from '@/components/ui/Logo';

const SLIDE_DURATION = 6000; // 6 seconds per slide

/**
 * Editorial Word-by-Word Typography Revealer
 * Provides smooth staggered word entrances with luxury cubic-bezier easing.
 */
function AnimatedWords({ text, className = '', baseDelay = 0, wordClassName = '' }) {
  const shouldReduceMotion = useReducedMotion();
  const words = text ? text.split(' ') : [];

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
 * HeroSection — Premium Managed Farmland Lifestyle Experience (Hebbevu Aesthetic)
 * 
 * Features:
 * - Bright, natural, sunlit background photography (not overly dark)
 * - Left-aligned layout matching reference composition
 * - Larger, commanding dual-style typography (Bold White Sans + Warm Honey-Gold Italic Serif)
 * - Frosted glass highlights card showcasing verified Earth Heritage pillars
 * - Vertical right-side carousel indicator dots matching reference layout
 */
export default function HeroSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const heroRef = useRef(null);
  const timerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { openEnquiryModal } = useEnquiry();

  const totalSlides = heroSlides.length;
  const currentSlide = heroSlides[currentSlideIndex];

  // Steady autoplay interval with reset capability
  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    }, SLIDE_DURATION);
  }, [totalSlides]);

  useEffect(() => {
    startAutoplay();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startAutoplay]);

  const handleSlideSelect = (index) => {
    setCurrentSlideIndex(index);
    startAutoplay();
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      data-navbar-theme="dark"
      className="relative w-full min-h-[88vh] sm:min-h-screen flex items-center justify-start overflow-hidden pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 outline-none"
      aria-label="Earth Heritage — Managed Farmland"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      {/* Top-Left Company Logo */}
      <div className="absolute top-4 sm:top-6 left-6 sm:left-12 md:left-16 lg:left-24 xl:left-32 2xl:left-44 z-30 flex items-center select-none transition-transform duration-200 hover:scale-102">
        <Logo
          variant="light"
          size="navbar"
          priority
        />
      </div>

      {/* 1. Full-Screen Sunlit Farmland Photography with Light Directional Gradient */}
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
                  scale: isActive ? (shouldReduceMotion ? 1 : 1.04) : 1
                }}
                transition={{
                  opacity: { duration: 1.1, ease: [0.4, 0, 0.2, 1] },
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
                  quality={95}
                  className="object-cover object-center lg:object-[center_35%]"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Natural, Soft Directional Contrast (Bright & Vibrant — NOT overly dark!) */}
        {/* Left directional soft gradient for typography readability */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        {/* Top subtle gradient for navbar visibility */}
        <div
          className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        {/* Bottom subtle grounding gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>

      {/* 2. Left-Aligned Editorial Content Block (Matching Reference Screenshot) */}
      <div className="relative z-20 w-full px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32 2xl:px-44">
        <div className="max-w-xl sm:max-w-2xl lg:max-w-3xl flex flex-col items-start text-left">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -14, filter: 'blur(4px)', transition: { duration: 0.4, ease: 'easeIn' } }}
              className="w-full text-left space-y-3 sm:space-y-4 flex flex-col items-start"
            >
              {/* Eyebrow: Warm Honey-Gold Letterspaced Label */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-start"
              >
                <span className="font-sans text-[11px] sm:text-xs md:text-[13px] uppercase tracking-[0.22em] font-bold text-[#E5B869] drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] select-none">
                  {currentSlide.eyebrow}
                </span>
              </motion.div>

              {/* Primary Headline: Dual-Style Typography Strictly in 2 Lines */}
              <div className="w-full">
                {currentSlide.isMainH1 ? (
                  <h1 className="tracking-tight text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] xl:text-[60px] 2xl:text-[64px] leading-[1.12] sm:leading-[1.14]">
                    {/* Line 1: Bold White Sans + Warm Gold Italic Serif */}
                    <span className="block whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                      <span className="font-sans font-extrabold text-white">
                        <AnimatedWords text={currentSlide.titlePart1} baseDelay={0.1} />
                      </span>
                      <span className="font-serif italic font-normal text-[#E5B869] ml-2 sm:ml-3 inline-block">
                        <AnimatedWords text={currentSlide.titleAccent1} baseDelay={0.25} />
                      </span>
                    </span>

                    {/* Line 2: Bold White Sans + Warm Gold Italic Serif */}
                    <span className="block whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mt-1 sm:mt-2">
                      <span className="font-sans font-extrabold text-white">
                        <AnimatedWords text={currentSlide.titlePart2} baseDelay={0.4} />
                      </span>
                      <span className="font-serif italic font-normal text-[#E5B869] ml-2 sm:ml-3 inline-block">
                        <AnimatedWords text={currentSlide.titleAccent2} baseDelay={0.55} />
                      </span>
                    </span>
                  </h1>
                ) : (
                  <h2 className="tracking-tight text-[28px] xs:text-[34px] sm:text-[42px] md:text-[48px] lg:text-[54px] xl:text-[60px] 2xl:text-[64px] leading-[1.12] sm:leading-[1.14]">
                    {/* Line 1: Bold White Sans + Warm Gold Italic Serif */}
                    <span className="block whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                      <span className="font-sans font-extrabold text-white">
                        <AnimatedWords text={currentSlide.titlePart1} baseDelay={0.1} />
                      </span>
                      <span className="font-serif italic font-normal text-[#E5B869] ml-2 sm:ml-3 inline-block">
                        <AnimatedWords text={currentSlide.titleAccent1} baseDelay={0.25} />
                      </span>
                    </span>

                    {/* Line 2: Bold White Sans + Warm Gold Italic Serif */}
                    <span className="block whitespace-nowrap drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] mt-1 sm:mt-2">
                      <span className="font-sans font-extrabold text-white">
                        <AnimatedWords text={currentSlide.titlePart2} baseDelay={0.4} />
                      </span>
                      <span className="font-serif italic font-normal text-[#E5B869] ml-2 sm:ml-3 inline-block">
                        <AnimatedWords text={currentSlide.titleAccent2} baseDelay={0.55} />
                      </span>
                    </span>
                  </h2>
                )}
              </div>

              {/* Supporting Copy: Clean Left-Aligned Subtext */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.75,
                  delay: shouldReduceMotion ? 0 : 0.6,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="w-full"
              >
                <p className="font-sans text-[14px] sm:text-[16px] md:text-[17px] font-normal leading-relaxed text-[#F7F4EC] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-lg lg:max-w-xl">
                  {currentSlide.description}
                </p>
              </motion.div>

              {/* Left-Aligned Action CTA Buttons */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: shouldReduceMotion ? 0 : 0.7,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2 w-full sm:w-auto"
              >
                <button
                  type="button"
                  onClick={(e) => openEnquiryModal('General Enquiry', e.currentTarget)}
                  className="inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-3 sm:py-3.5 rounded-xl text-xs sm:text-[13px] font-bold tracking-[0.14em] uppercase whitespace-nowrap bg-[#E5B869] text-[#111613] hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-200 shadow-md cursor-pointer"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-4 h-4 text-inherit" aria-hidden="true" />
                </button>

                <Link
                  href={currentSlide.primaryAction.href}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap bg-black/35 hover:bg-black/55 border border-white/25 text-white backdrop-blur-sm hover:scale-[1.02] transition-all duration-200"
                >
                  <span>{currentSlide.primaryAction.label}</span>
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* 3. Vertical Carousel Dots on the Right (Matching Hebbevu Reference Screenshot) */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3" role="tablist" aria-label="Slide controls">
        {heroSlides.map((slide, idx) => {
          const isActive = idx === currentSlideIndex;
          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => handleSlideSelect(idx)}
              role="tab"
              aria-selected={isActive}
              aria-label={`Jump to slide ${idx + 1}: ${slide.chapter}`}
              className={`transition-all duration-300 rounded-full focus:outline-none cursor-pointer ${
                isActive
                  ? 'w-3 h-3 bg-[#E5B869] ring-4 ring-[#E5B869]/30 shadow-[0_0_12px_rgba(229,184,105,0.8)]'
                  : 'w-2.5 h-2.5 bg-white/50 hover:bg-white/90'
              }`}
            />
          );
        })}
      </div>

      {/* 4. Subtle Bottom Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <Link
          href="#statement"
          onClick={(e) => {
            const target = document.getElementById('about-overview') || document.getElementById('statement');
            if (target) {
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className="flex flex-col items-center justify-center gap-1 group cursor-pointer"
          aria-label="Scroll to explore"
        >
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.24em] uppercase font-medium text-white/70 group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <ChevronDown className="w-3.5 h-3.5 animate-bounce text-white/60 group-hover:text-white transition-colors" aria-hidden="true" />
        </Link>
      </div>

    </section>
  );
}
