'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'motion/react';
import Container from '@/components/ui/Container';
import { ArrowRight } from 'lucide-react';
import { landingImages } from '@/data/landingImages';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * 10. FinalCtaSection — Editorial Conversion Moment
 * 
 * Closes the narrative journey (Land → Care → Management → Legacy → Conversation)
 * with a calm, trustworthy, and cinematic editorial composition.
 * 
 * Centralized Image Configuration:
 * - Image src and metadata are driven by `landingImages.cta` in `@/data/landingImages.js`
 * - When authentic Earth Heritage photography is supplied, update `src` in `landingImages.js`
 *   without altering this component's structure.
 */
export default function FinalCtaSection() {
  const shouldReduceMotion = useReducedMotion();
  const { openEnquiryModal } = useEnquiry();

  return (
    <section
      id="contact-cta"
      data-navbar-theme="dark"
      className="relative w-full min-h-[70vh] sm:min-h-[78vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden py-24 sm:py-32 lg:py-36"
      aria-label="Begin a Conversation with Earth Heritage"
    >
      {/* 1. Cinematic Full-Width Landscape Background Visual */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full transform-gpu will-change-transform"
        >
          <Image
            src={landingImages.cta.src}
            alt={landingImages.cta.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Sophisticated Editorial Overlays: Preserves rich green hills, sky, and light while ensuring pristine text contrast */}
        {/* Base dark veil allowing landscape detail and sunlight to shine through */}
        <div
          className="absolute inset-0 bg-[#0B150E]/45 pointer-events-none"
          aria-hidden="true"
        />
        {/* Top-down gentle vignette for smooth transition from preceding section */}
        <div
          className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0e1610]/75 via-[#0e1610]/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        {/* Bottom grounding vignette seamlessly blending into the deep green footer */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#102B17]/90 via-[#102B17]/35 to-transparent pointer-events-none"
          aria-hidden="true"
        />
        {/* Soft centered radial shade ensuring sharp headline legibility */}
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,21,14,0.45)_0%,rgba(11,21,14,0.15)_60%,rgba(11,21,14,0.50)_100%)] pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* 2. Overlaid Centered Editorial Conversion Content */}
      <Container size="wide" className="relative z-10 w-full text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8">
          {/* Eyebrow: Small Understated Brand Pill */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#152419]/85 border border-[#9A814F]/40 backdrop-blur-md shadow-sm">
              <span className="text-[#C5A25D] text-xs select-none" aria-hidden="true">✦</span>
              <span className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.22em] font-medium text-[#C5A25D]">
                Begin a Conversation
              </span>
            </div>
          </motion.div>

          {/* Signature Headline (Cormorant Garamond Luxury Serif: Roman Line 1 + Cursive Italic Line 2) */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[82px] tracking-tight leading-[1.08] sm:leading-[1.08]">
              <span className="block text-[#FAF7F2] font-normal">
                Have farmland that
              </span>
              <span className="block italic text-[#C5A25D] font-normal mt-1 sm:mt-2.5">
                deserves to be cared for?
              </span>
            </h2>
          </motion.div>

          {/* Supporting Message: Calm, Trustworthy, Non-Sales Tone */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <p className="font-sans text-base sm:text-xl md:text-[22px] text-[#EDE7DE]/90 font-light leading-relaxed max-w-2xl mx-auto">
              Let’s explore how Earth Heritage can help you manage your land with care and purpose.
            </p>
          </motion.div>

          {/* Balanced CTA Actions */}
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full sm:w-auto"
          >
            {/* Primary Action Button: Earth Heritage Brand Green */}
            <button
              type="button"
              onClick={(e) => openEnquiryModal('Farm Management', e.currentTarget)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-brand-primary text-brand-secondary hover:bg-brand-primary-hover text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase shadow-[0_6px_20px_rgba(85,196,13,0.25)] hover:shadow-[0_8px_25px_rgba(85,196,13,0.35)] hover:scale-[1.02] transition-all duration-200"
            >
              <span>Talk to Earth Heritage</span>
              <ArrowRight className="w-4 h-4 text-brand-secondary" aria-hidden="true" />
            </button>

            {/* Secondary Action Button: Translucent Natural Treatment */}
            <Link
              href="/farm-management"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-[#18261B]/80 hover:bg-[#1F3324] border border-[#35543B]/65 text-[#EDE7DD] hover:border-[#4B7553]/80 text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase shadow-[0_6px_20px_rgba(0,0,0,0.2)] hover:scale-[1.02] backdrop-blur-md transition-all duration-200"
            >
              <span>Explore Farm Management</span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
