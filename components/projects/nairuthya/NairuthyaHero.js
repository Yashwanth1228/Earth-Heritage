'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';

/**
 * 01 — PROJECT HERO: Nairuthya Whispering Wood
 * 
 * Styled directly after the Hasiru Farms reference:
 * - Edge-to-edge full-bleed cinematic landscape banner
 * - All wording, badges, titles, buttons, and dark overlays removed from on top of the banner
 * - Screen-reader / SEO accessible <h1> preserved visually hidden
 * - Coordinates with floating navbar: hidden while on hero, reveals smoothly on scroll down
 */
export default function NairuthyaHero({ project }) {
  const shouldReduceMotion = useReducedMotion();

  const heroImageSrc =
    project?.heroImage?.src || '/images/projects/nairuthya-whispering-wood-hero.jpg';
  const heroImageAlt =
    project?.heroImage?.alt || 'Nairuthya Whispering Wood farmland landscape in Honnasandra';

  return (
    <section
      id="project-hero"
      data-navbar-theme="dark"
      className="relative w-full bg-[#FAF6F0] p-3 sm:p-5 lg:p-6 xl:p-8"
      aria-label="Nairuthya Whispering Wood Hero"
    >
      {/* Accessible single <h1> for SEO and screen-readers without visual clutter */}
      <h1 className="sr-only">
        {project?.h1 || 'Nairuthya Whispering Wood — Managed Farmland in Honnasandra, Nelamangala'}
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
          <Image
            src={heroImageSrc}
            alt={heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>
    </section>
  );
}

