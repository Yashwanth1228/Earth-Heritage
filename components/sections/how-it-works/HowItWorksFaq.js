'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { howItWorksData } from '@/data/howItWorksData';

/**
 * Section 6 — Frequently Asked Questions (FAQ) for /how-it-works
 * 
 * 6 verified factual questions about the process, ownership, and management scope.
 * Smooth accordion animations, accessible button controls, and clear keyboard focus.
 */
export default function HowItWorksFaq() {
  const { eyebrow, heading, description, items } = howItWorksData.faq;
  
  // Single-open accordion state (default first item open)
  const [openId, setOpenId] = useState('faq-1');

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative bg-[#F0E0C6] text-[#111613] pt-16 sm:pt-24 lg:pt-28 pb-16 sm:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Frequently Asked Questions About the Process"
    >
      {/* Background Roots Pattern */}
      <LandContourPattern variant="biscuit-roots" className="opacity-90" />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>{eyebrow}</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111613] leading-[1.14]">
                {heading}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-xl mx-auto">
                {description}
              </p>
            </MotionReveal>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {items.map((item, idx) => {
              const isOpen = openId === item.id;
              const contentId = `${item.id}-content`;
              const buttonId = `${item.id}-button`;

              return (
                <MotionReveal key={item.id} delay={0.08 + idx * 0.04}>
                  <div className="rounded-2xl bg-[#FAF6F0] border border-[#D5C09D] shadow-xs overflow-hidden transition-colors duration-200">
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      className="w-full flex items-center justify-between gap-4 p-6 sm:p-7 text-left font-sans font-semibold text-base sm:text-lg text-[#111613] hover:text-[#1E460B] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#1E460B] select-none"
                    >
                      <span className="flex-1 leading-snug">{item.question}</span>
                      <span
                        className={`w-8 h-8 rounded-full border border-[#D5C09D] flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-[#1E460B] text-white rotate-45 border-[#1E460B]'
                            : 'bg-[#EAD5B5]/60 text-[#2B352E]'
                        }`}
                        aria-hidden="true"
                      >
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={contentId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 font-sans text-sm sm:text-base text-[#47524A] font-normal leading-relaxed border-t border-[#EBDDC8]/60">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </MotionReveal>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
