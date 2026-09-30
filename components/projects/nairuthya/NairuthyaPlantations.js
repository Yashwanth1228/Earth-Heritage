'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ChevronLeft, ChevronRight, Sprout } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 03 — CULTIVATED FARM & PLANTATIONS
 * 
 * Styled directly after reference screenshot (Diverse Plantation):
 * - Centered composition: Circular/rounded primary crop image on top
 * - Directly below the image:
 *   - Plantation Name (e.g. Mahogany, Teak Wood, Coconut, etc.)
 *   - Botanical & Category metadata
 *   - Short factual description
 *   - 6 subtle progress indicator dots
 * - Smooth slow transition (5s interval, 0.8s crossfade)
 * - Pauses on hover/focus; respects prefers-reduced-motion
 * - Minimal manual controls (prev/next + clickable dots)
 * - Warm neutral background (#FAF7F2), compact height
 */
export default function NairuthyaPlantations({ project }) {
  const plantations = project?.plantations || [];
  const total = plantations.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const timerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 5 seconds (paused on hover or when reduced-motion is preferred)
  useEffect(() => {
    if (shouldReduceMotion || isPaused || total <= 1) return;

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, shouldReduceMotion, nextSlide, total]);

  if (total === 0) return null;

  const current = plantations[activeIndex];

  return (
    <section
      id="plantations"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Cultivated Farm and Plantations"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10 max-w-4xl px-5 sm:px-8">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10 space-y-2">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-[#7A6A4E] uppercase">
              <Sprout className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
              <span>AGRONOMIC CROPS &bull; PLANTATIONS</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight">
              Cultivated Farm &amp; Plantations
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
              Professionally cultivated and maintained for long-term agricultural vitality.
            </p>
          </MotionReveal>
        </div>

        {/* Centered Plantation Stage (Image on top, details below) */}
        <div className="relative max-w-md mx-auto text-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              {/* Circular Medallion Image (Inspired by reference screenshot) */}
              <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full border-4 border-[#DDD3BF] p-1.5 bg-white shadow-md mx-auto overflow-hidden">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={current.image?.src}
                    alt={current.name}
                    fill
                    sizes="(max-width: 640px) 208px, 240px"
                    className="object-cover object-center"
                    priority={activeIndex === 0}
                  />
                </div>
              </div>

              {/* Details Below the Image */}
              <div className="mt-5 sm:mt-6 space-y-1.5">
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#111613] tracking-tight">
                  {current.name}
                </h3>

                <p className="font-serif italic text-xs sm:text-sm text-[#7A6A4E]">
                  {current.botanical} &bull; {current.category}
                </p>

                <p className="font-sans text-xs sm:text-sm text-[#4E5C50] max-w-md mx-auto leading-relaxed pt-1">
                  {current.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicator Dots + Minimal Arrows Below Details */}
          <div className="flex items-center justify-center gap-3 mt-6 sm:mt-7">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous plantation"
              className="w-7 h-7 rounded-full border border-[#DDD3BF] bg-white hover:bg-[#FAF6F0] text-[#111613] flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:border-[#C8BAA3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-2" role="tablist" aria-label="Select plantation">
              {plantations.map((item, idx) => (
                <button
                  key={item.id}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`View ${item.name}`}
                  onClick={() => setActiveIndex(idx)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]',
                    idx === activeIndex
                      ? 'w-6 bg-[#15341C]'
                      : 'w-2 bg-[#DCCDB7] hover:bg-[#A8987E]'
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next plantation"
              className="w-7 h-7 rounded-full border border-[#DDD3BF] bg-white hover:bg-[#FAF6F0] text-[#111613] flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:border-[#C8BAA3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <p className="font-mono text-[10px] text-[#A8987E] mt-3">
            0{activeIndex + 1} of 0{total} &bull; Auto-transitions every 5s &bull; Hover to pause
          </p>

        </div>

      </Container>
    </section>
  );
}
