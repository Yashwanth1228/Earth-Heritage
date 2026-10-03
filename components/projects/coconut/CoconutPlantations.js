'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { Sprout } from 'lucide-react';

/**
 * 03 — CULTIVATED FARM & PLANTATIONS
 * 
 * Styled directly after the master reference (Nairuthya Whispering Wood):
 * - Centered composition with circular medallion crop image on top
 * - Plantation Name, category metadata, and short factual description
 * - Warm neutral background (#FAF7F2), compact height, and contour watermark
 * - Respects prefers-reduced-motion
 */
export default function CoconutPlantations({ project }) {
  const shouldReduceMotion = useReducedMotion();
  const plantationItem = project?.plantations?.[0] || {
    name: 'Plantation Trees',
    botanical: '25+ Plantation Trees',
    category: 'Agronomic Green Canopy',
    description:
      'The estate features 25+ plantation trees, nurturing long-term soil vitality and creating a lush green environment.'
  };

  return (
    <section
      id="plantations"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] py-6 sm:py-8 lg:py-9 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Cultivated Farm and Plantations"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10 max-w-4xl px-5 sm:px-8">
        
        {/* Centered Section Header */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6 space-y-1.5">
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
              Cultivated farmland with 25+ plantation trees, nurtured for long-term soil health and agricultural vitality in Bidadi.
            </p>
          </MotionReveal>
        </div>

        {/* Centered Plantation Stage */}
        <div className="relative max-w-md mx-auto text-center">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="flex flex-col items-center"
          >
            {/* Circular Medallion Image */}
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full border-4 border-[#DDD3BF] p-1.5 bg-white shadow-sm mx-auto overflow-hidden">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                {plantationItem.image?.src ? (
                  <Image
                    src={plantationItem.image.src}
                    alt={plantationItem.image?.alt || `${plantationItem.name} at Coconut Garden`}
                    fill
                    sizes="(max-width: 640px) 160px, 176px"
                    className="object-cover object-center"
                  />
                ) : (
                  <div className="relative w-full h-full rounded-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-[#13331C] to-[#0A1A0E] text-white p-3 text-center select-none">
                    <div className="absolute inset-0 opacity-25 pointer-events-none">
                      <LandContourPattern variant="biscuit-contours" />
                    </div>
                    <Sprout className="w-8 h-8 text-[#55C40D] mb-1 relative z-10" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-[#F8C32C] relative z-10 font-semibold">
                      25+ Trees
                    </span>
                    <span className="font-serif text-[11px] text-white/80 relative z-10 line-clamp-1">
                      Plantations
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Details Below the Image */}
            <div className="mt-3.5 sm:mt-4 space-y-1">
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111613] tracking-tight">
                {plantationItem.name}
              </h3>

              <p className="font-serif italic text-xs sm:text-[13px] text-[#7A6A4E]">
                {plantationItem.botanical} &bull; {plantationItem.category}
              </p>

              <p className="font-sans text-xs sm:text-[13px] text-[#4E5C50] max-w-md mx-auto leading-relaxed pt-0.5">
                {plantationItem.description}
              </p>
            </div>

            {/* Bottom Status Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#D5C09D] text-xs font-mono text-[#1E460B] shadow-2xs mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
              <span className="font-semibold">25+ Plantation Trees Included</span>
            </div>
          </motion.div>
        </div>

      </Container>
    </section>
  );
}
