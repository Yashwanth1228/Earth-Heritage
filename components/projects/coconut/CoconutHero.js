'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import EditorialImageSlot from '@/components/projects/nairuthya/EditorialImageSlot';

/**
 * 01 — PROJECT HERO: Coconut Garden
 * 
 * Styled directly after the master reference (Nairuthya Whispering Wood):
 * - Edge-to-edge cinematic landscape banner with outer frame padding
 * - All wording, badges, titles, and dark overlays removed from top of banner
 * - Screen-reader / SEO accessible <h1> preserved visually hidden
 * - Seamless dark navbar theme coordinate
 * - Preserves image slot with brand-consistent editorial canvas when photography is pending
 */
export default function CoconutHero({ project }) {
  const shouldReduceMotion = useReducedMotion();

  const heroImageSrc = project?.heroImage?.src;
  const heroImageAlt =
    project?.heroImage?.alt || 'Coconut Garden premium farm plots landscape in Bidadi';

  return (
    <section
      id="project-hero"
      data-navbar-theme="dark"
      className="relative w-full bg-[#FAF6F0] p-3 sm:p-5 lg:p-6 xl:p-8"
      aria-label="Coconut Garden Hero"
    >
      {/* Accessible single <h1> for SEO and screen-readers without visual clutter */}
      <h1 className="sr-only">
        {project?.h1 || 'Coconut Garden — Premium Farm Plots in Bidadi'}
      </h1>

      {/* Pure, Unobstructed Landscape Visual with Padding on All Sides */}
      <div className="relative w-full h-[58vh] sm:h-[68vh] md:h-[76vh] lg:h-[82vh] xl:h-[86vh] min-h-[400px] max-h-[780px] rounded-2xl sm:rounded-3xl lg:rounded-[28px] overflow-hidden border border-[#D5C09D]/60 shadow-[0_12px_36px_rgba(17,22,19,0.07)] bg-[#102B17]">
        <motion.div
          initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 1.03, opacity: 0.96 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            scale: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
            opacity: { duration: 0.5, ease: 'easeOut' }
          }}
          className="relative w-full h-full"
        >
          {heroImageSrc ? (
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          ) : (
            <EditorialImageSlot
              src={null}
              alt="Coconut Garden — Premium Farm Plots in Bidadi"
              slotLabel="Hero Landscape Slot"
              location="Bidadi • Karnataka"
              caption="6-Acre Premium Farm Plots in Bidadi"
              aspectRatio="h-full w-full"
              variant="dark"
              className="rounded-none border-0 h-full w-full"
            />
          )}
        </motion.div>
      </div>
    </section>
  );
}
