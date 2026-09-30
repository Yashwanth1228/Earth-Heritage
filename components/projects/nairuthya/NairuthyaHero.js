'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, ArrowDown } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useEnquiry } from '@/context/EnquiryContext';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * 01 — PROJECT HERO: Nairuthya Whispering Wood
 * 
 * Strict Standards:
 * - Full-width, premium cinematic project hero
 * - High-readability editorial typography with Fraunces serif
 * - Verified location: Honnasandra · Nelamangala · Bengaluru
 * - Subdued, natural image treatment with subtle Ken Burns scale animation
 * - Action CTA triggering EnquiryModal with pre-filled interest
 * - Avoids SaaS styles, oversized pills, and fake statistics
 */
export default function NairuthyaHero({ project }) {
  const shouldReduceMotion = useReducedMotion();
  const { openEnquiryModal } = useEnquiry();

  const hasHeroImage =
    typeof project?.heroImage?.src === 'string' &&
    project.heroImage.src.trim().length > 0;

  const handleEnquire = (e) => {
    openEnquiryModal(project?.enquiryInterest || 'Nairuthya Whispering Wood', e.currentTarget);
  };

  const scrollToSnapshot = () => {
    const el = document.getElementById('snapshot');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="project-hero"
      data-navbar-theme="light"
      className="relative bg-[#FAF6F0] pt-18 sm:pt-20 pb-5 sm:pb-7 border-b border-[#DCCDB7]/70 overflow-hidden"
      aria-label="Nairuthya Whispering Wood Hero"
    >
      <div className="w-full max-w-[1440px] px-3 sm:px-6 lg:px-8 mx-auto">
        {/* Cinematic Hero Container */}
        <div className="relative w-full h-[62svh] min-h-[440px] max-h-[560px] sm:h-[68vh] sm:min-h-[480px] sm:max-h-[600px] lg:h-[70vh] lg:min-h-[520px] lg:max-h-[640px] rounded-2xl sm:rounded-3xl lg:rounded-[28px] overflow-hidden border border-[#D5C09D]/70 shadow-[0_16px_40px_rgba(17,22,19,0.1)] bg-[#102B17]">
          
          {/* 1. Background Image with Slow Subtle Scale / Editorial Canvas */}
          {hasHeroImage ? (
            <motion.div
              initial={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0.85 }}
              animate={shouldReduceMotion ? { scale: 1, opacity: 1 } : { scale: 1.05, opacity: 1 }}
              transition={{
                scale: { duration: 14, ease: [0.25, 1, 0.5, 1] },
                opacity: { duration: 0.8, ease: 'easeOut' }
              }}
              className="relative w-full h-full transform-gpu will-change-transform origin-center"
            >
              <Image
                src={project.heroImage.src}
                alt={project.heroImage.alt || 'Nairuthya Whispering Wood'}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 96vw, 1440px"
                className="object-cover object-center"
              />
            </motion.div>
          ) : (
            /* Editorial Canvas when real photo is pending */
            <div className="relative w-full h-full bg-gradient-to-b from-[#13331C] via-[#0F2816] to-[#08170D] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <LandContourPattern variant="biscuit-contours" />
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(8,23,13,0.6)_100%)] pointer-events-none" />
            </div>
          )}

          {/* 2. Top-down Subtle Vignette for Navigation Visibility */}
          <div
            className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* 3. Bottom Earthy Forest Gradient for High-Contrast Readability */}
          <div
            className="absolute inset-x-0 bottom-0 h-[80%] sm:h-[68%] bg-gradient-to-t from-[#08170D]/95 via-[#08170D]/65 to-transparent pointer-events-none z-10"
            aria-hidden="true"
          />

          {/* 4. Top Navigation Bar Inside Banner */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-20 flex items-center gap-3">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/45 hover:bg-black/65 backdrop-blur-md border border-white/20 text-xs sm:text-[13px] font-sans font-medium text-white/90 hover:text-white transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
              aria-label="Return to Earth Heritage Projects catalog"
            >
              <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-x-1 text-[#55C40D]" aria-hidden="true" />
              <span>Back to All Projects</span>
            </Link>
          </div>

          {/* 5. Overlay Content (Bottom Area) */}
          <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-8 lg:p-12 xl:p-14 flex flex-col justify-end">
            <div className="max-w-4xl space-y-4 sm:space-y-5">
              
              {/* Hierarchy 1: Location & Category Metadata */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap items-center gap-2 sm:gap-3"
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAD5B5]/85 backdrop-blur-md border border-[#D5C09D] text-xs font-mono font-semibold tracking-wider text-[#1E460B] uppercase shadow-2xs">
                  5 ACRES &bull; MANAGED FARMLAND
                </span>

                <span className="text-white/40 text-xs hidden sm:inline" aria-hidden="true">&bull;</span>

                <div className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-mono font-medium tracking-wide text-[#FAF6F0]/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] animate-pulse" aria-hidden="true" />
                  <span>Honnasandra &bull; Nelamangala &bull; Bengaluru</span>
                </div>
              </motion.div>

              {/* Hierarchy 2: Project Title (Fraunces Luxury Serif) */}
              <motion.h1
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal tracking-tight text-[#FAF6F0] leading-[1.12] drop-shadow-sm"
              >
                Nairuthya Whispering Wood
              </motion.h1>

              {/* Hierarchy 3: Verified Project Description */}
              <motion.p
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-sans text-sm sm:text-base lg:text-lg text-[#E4EDE6] font-normal leading-relaxed max-w-2xl drop-shadow-xs"
              >
                A 5-acre managed farmland estate in Honnasandra, Nelamangala. 24 master-planned plots with titled legal ownership, active timber and crop plantations, and ongoing farm stewardship by Earth Heritage.
              </motion.p>

              {/* Hierarchy 4: Actions Bar */}
              <motion.div
                initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
              >
                <button
                  type="button"
                  onClick={handleEnquire}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-[#F8C32C] hover:bg-white text-[#111613] hover:text-black font-sans font-bold text-xs sm:text-[13px] tracking-[0.14em] uppercase transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Enquire About Farmland</span>
                  <ArrowRight className="w-4 h-4 text-inherit" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={scrollToSnapshot}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-black/45 hover:bg-black/65 border border-white/30 text-white font-sans font-semibold text-xs sm:text-[13px] tracking-wider uppercase backdrop-blur-md transition-all duration-200 cursor-pointer"
                >
                  <span>Explore Specifications</span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
                </button>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
