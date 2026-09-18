'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import { landingImages } from '@/data/landingImages';

/**
 * 7. PhilosophySection — Full-Width Cinematic Brand Campaign
 * Full-width photography with overlaid typography: "BACK TO ROOTS. FORWARD WITH PURPOSE."
 * 
 * TODO: Replace landingImages.philosophy.src with authentic Earth Heritage landscape photography when delivered.
 */
export default function PhilosophySection() {
  const sectionRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative w-full min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden py-24 sm:py-32"
      aria-label="Earth Heritage Philosophy"
    >
      {/* 1. Full-Width Background Landscape Visual */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={landingImages.philosophy.src}
            alt={landingImages.philosophy.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Controlled gradient overlay: preserves photographic clarity while supporting text contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/70 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Overlaid Campaign Statement */}
      <Container size="wide" className="relative z-10 w-full text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="brand" className="bg-brand-primary text-brand-secondary font-semibold">
              Brand Philosophy
            </Badge>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] text-white drop-shadow-md">
              BACK TO ROOTS.<br />
              <span className="text-white/85 font-normal italic">
                FORWARD WITH PURPOSE.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-base sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Earth Heritage brings people closer to land, nature, and meaningful ownership through thoughtfully managed farmland and responsible development.
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
