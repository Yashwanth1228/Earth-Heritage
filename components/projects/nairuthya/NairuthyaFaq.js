'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 11 — PROJECT FAQ: Verified Project Questions Accordion
 * 
 * Strict Standards:
 * - 9 verified questions directly grounded in confirmed project data:
 *   1. Where is Nairuthya Whispering Wood located?
 *   2. What is the total project size?
 *   3. How many plots are there?
 *   4. What is the minimum plot size?
 *   5. What is the current price per sq.ft?
 *   6. How many plots are currently available?
 *   7. What plantations are planned/grown?
 *   8. What amenities are provided?
 *   9. How does Earth Heritage manage the farmland after purchase?
 * - Zero invented claims, zero financial promises
 * - Accessible keyboard navigation & smooth height animations
 */
export default function NairuthyaFaq({ project }) {
  const faqs = project?.faqs || [];
  const [openIndex, setOpenIndex] = useState(0); // first item open by default
  const shouldReduceMotion = useReducedMotion();

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="project-faq"
      data-navbar-theme="light"
      className="relative bg-[#FAF6F0] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Frequently Asked Questions about Nairuthya Whispering Wood"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 space-y-2">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-[#7A6A4E] uppercase">
              <HelpCircle className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
              <span>FREQUENT QUESTIONS &bull; PROJECT CLARITY</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight">
              Frequently Asked Questions
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
              Essential verified details regarding land ownership, plot dimensions, pricing, plantations, and ongoing farm management at Nairuthya Whispering Wood.{' '}
              <Link
                href="/managed-farmland"
                className="text-[#1E460B] font-medium underline underline-offset-2 hover:text-[#55C40D] transition-colors"
              >
                Explore our farm management approach
              </Link>
            </p>
          </MotionReveal>
        </div>

        {/* Accordion List */}
        <div className="max-w-4xl space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <MotionReveal key={idx} delay={0.04 * (idx + 1)}>
                <div className="rounded-xl sm:rounded-2xl bg-white border border-[#DDD3BF] overflow-hidden transition-colors shadow-2xs">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E460B]"
                  >
                    <span className="font-serif text-base sm:text-lg font-medium text-[#111613] tracking-tight">
                      {faq.question}
                    </span>
                    <span
                      className={cn(
                        'w-7 h-7 rounded-full border border-[#D5C09D] flex items-center justify-center shrink-0 transition-transform duration-200 text-[#1E460B]',
                        isOpen ? 'rotate-180 bg-[#1E460B] text-white' : 'bg-[#FAF7F2]'
                      )}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                        animate={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 1, height: 'auto' }}
                        exit={shouldReduceMotion ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#4E5C50] leading-relaxed border-t border-[#EFE5D5] pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </MotionReveal>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
