'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import Container from '@/components/ui/Container';
import { howItWorksData } from '@/data/howItWorksData';
import { howItWorksImages } from '@/data/howItWorksImages';

/**
 * Section 5 — Responsible Land Care for /how-it-works
 * 
 * Brand Motto: "BACK TO ROOTS. FORWARD WITH PURPOSE."
 * Supporting: "Earth Heritage aims to bring people closer to land, nature, and meaningful ownership through thoughtfully managed farmland and responsible development."
 */
export default function ResponsibleCare() {
  const { brandMotto, heading, copy } = howItWorksData.responsibleCare;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="responsible-care"
      className="relative w-full min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden py-24 sm:py-32"
      aria-label="Responsible Land Care Philosophy"
    >
      {/* 1. Cinematic Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src={howItWorksImages.responsibleCare.src}
            alt={howItWorksImages.responsibleCare.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Controlled gradient overlay: preserves photographic depth while supporting text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/70 pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Editorial Overlaid Statement */}
      <Container size="default" className="relative z-10 w-full text-center">
        <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
          
          {/* Brand Motto Eyebrow Badge */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold tracking-widest text-[#55C40D] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{brandMotto}</span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FAF6F0] font-normal tracking-tight leading-[1.15]">
              {heading}
            </h2>
          </motion.div>

          {/* Supporting Copy */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#FAF6F0]/85 font-normal leading-relaxed max-w-2xl mx-auto">
              {copy}
            </p>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
