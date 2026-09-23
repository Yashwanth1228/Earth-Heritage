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
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: '75%' }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.42,
                delay: shouldReduceMotion ? 0 : baseDelay + i * 0.04,
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

  return (
    <section
      id="hero"
      ref={heroRef}
      data-navbar-theme="dark"
      className="relative w-full min-h-[72vh] sm:min-h-[85vh] lg:min-h-screen flex items-center justify-start overflow-hidden pt-12 sm:pt-20 lg:pt-28 pb-6 sm:pb-12 lg:pb-16 outline-none"
      aria-label="Earth Heritage — Managed Farmland"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      {/* Top-Left Company Logo */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-10 md:left-16 lg:left-24 xl:left-32 2xl:left-44 z-30 flex items-center select-none transition-transform duration-200 hover:scale-102">
        <Logo
          variant="light"
          size="hero"
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
          className="absolute inset-0 bg-gradient-to-r from-black/20 via-black/5 to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        {/* Top subtle gradient for navbar visibility */}
        <div
          className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/25 via-transparent to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
        {/* Bottom subtle grounding gradient */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none z-10"
          aria-hidden="true"
        />
      </div>

      {/* 2. Left-Aligned Editorial Content Block (Matching Reference Screenshot) */}
      <div className="relative z-20 w-full px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 2xl:px-44">
        <div className="max-w-2xl sm:max-w-3xl lg:max-w-5xl xl:max-w-6xl flex flex-col items-start text-left">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full text-left space-y-3 sm:space-y-4 md:space-y-5 flex flex-col items-start"
            >
              {/* Eyebrow: Farmhouse Typography Style */}
              <div className="flex items-center justify-start">
                <span className="font-eyebrow-bold uppercase tracking-[0.12em] sm:tracking-[0.18em] text-[11px] xs:text-[13px] sm:text-[16px] md:text-[19px] lg:text-[21px] text-[#F8C32C] drop-shadow-sm select-none">
                  {currentSlide.eyebrow}
                </span>
              </div>

              {/* Primary Headline: Expanded Mobile Font Size with Word-by-Word Luxury Reveal & Minimal Soft Contrast */}
              {(() => {
                const titleSizeClass = currentSlide.id === 'slide-02'
                  ? 'text-[25px] min-[360px]:text-[28px] min-[390px]:text-[31px] xs:text-[37px] sm:text-[48px] md:text-[66px] lg:text-[80px] xl:text-[92px] 2xl:text-[102px]'
                  : 'text-[30px] min-[360px]:text-[34px] min-[390px]:text-[38px] xs:text-[44px] sm:text-[56px] md:text-[72px] lg:text-[86px] xl:text-[98px] 2xl:text-[106px]';

                const headlineContent = (
                  <>
                    {/* Line 1: Farmhouse White + Fraunces Italic Gold */}
                    <span className="block whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.48)]">
                      <span className="font-hero-bold uppercase tracking-[0.05em] sm:tracking-[0.07em] text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.55)]">
                        <AnimatedWords text={currentSlide.titlePart1} baseDelay={0.03} />
                      </span>
                      <span className="font-serif italic font-bold text-[#F8C32C] ml-2 sm:ml-4 md:ml-6 inline-block [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                        <AnimatedWords text={currentSlide.titleAccent1} baseDelay={0.12} />
                      </span>
                    </span>

                    {/* Line 2: Farmhouse White + Fraunces Italic Gold */}
                    <span className="block whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,0.48)] mt-0.5 sm:mt-1.5">
                      <span className="font-hero-bold uppercase tracking-[0.05em] sm:tracking-[0.07em] text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.55)]">
                        <AnimatedWords text={currentSlide.titlePart2} baseDelay={0.18} />
                      </span>
                      <span className="font-serif italic font-bold text-[#F8C32C] ml-2 sm:ml-4 md:ml-6 inline-block [text-shadow:0_1px_6px_rgba(0,0,0,0.45)]">
                        <AnimatedWords text={currentSlide.titleAccent2} baseDelay={0.27} />
                      </span>
                    </span>
                  </>
                );

                return (
                  <div className="w-full overflow-visible">
                    {currentSlide.isMainH1 ? (
                      <h1 className={`tracking-wide ${titleSizeClass} leading-[1.08] sm:leading-[1.04]`}>
                        {headlineContent}
                      </h1>
                    ) : (
                      <h2 className={`tracking-wide ${titleSizeClass} leading-[1.08] sm:leading-[1.04]`}>
                        {headlineContent}
                      </h2>
                    )}
                  </div>
                );
              })()}

              {/* Supporting Copy: Clean Left-Aligned Subtext */}
              <div className="w-full">
                <p className="font-sans text-[13px] xs:text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] font-medium leading-relaxed text-white drop-shadow-sm max-w-sm sm:max-w-lg lg:max-w-xl">
                  {currentSlide.description}
                </p>
              </div>

              {/* Action CTA Buttons: Stacked One After the Other on Mobile, Side-by-Side on Desktop */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-4 pt-2 sm:pt-2 w-full sm:w-auto max-w-xs sm:max-w-none">
                <button
                  type="button"
                  onClick={(e) => openEnquiryModal('General Enquiry', e.currentTarget)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl text-xs sm:text-[14px] font-bold tracking-[0.14em] uppercase whitespace-nowrap bg-[#F8C32C] text-[#111613] hover:bg-white hover:text-black hover:scale-[1.02] transition-all duration-200 shadow-lg cursor-pointer"
                >
                  <span>CONTACT US</span>
                  <ArrowRight className="w-4 h-4 text-inherit" aria-hidden="true" />
                </button>

                <Link
                  href={currentSlide.primaryAction.href}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl text-xs sm:text-[14px] font-bold tracking-[0.14em] uppercase whitespace-nowrap bg-black/45 hover:bg-black/65 border border-white/35 text-white backdrop-blur-sm hover:scale-[1.02] transition-all duration-200 shadow-md"
                >
                  <span>{currentSlide.primaryAction.label}</span>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* 3. Subtle Bottom Scroll Indicator */}
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
