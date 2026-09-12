'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { useEnquiry } from '@/context/EnquiryContext';
import { aboutData } from '@/data/aboutData';

/**
 * 07 — Frequently Asked Questions (FAQ) Section
 * 
 * Replaces the repeated closing brand CTA.
 * Premium editorial accordion with smooth expansion, accessible button semantics,
 * and answers based strictly on verified Earth Heritage information.
 */
export default function FaqSection() {
  const { openEnquiryModal } = useEnquiry();
  const { eyebrow, heading, description, items } = aboutData.faq;
  
  // Single-open accordion state (default first item open)
  const [openId, setOpenId] = useState('faq-1');

  const toggleItem = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="relative bg-[#F0E0C6] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      {/* Visible Organic Background Language: Root Branching & Grounding Contours */}
      <LandContourPattern variant="biscuit-roots" className="opacity-95" />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-14">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-6 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>{eyebrow}</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#111613] leading-[1.14]">
                {heading.split('\n').map((line, idx) => (
                  <span key={idx} className="block">
                    {line}
                  </span>
                ))}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-xl mx-auto">
                {description}
              </p>
            </MotionReveal>
          </div>

          {/* Premium Editorial Accordion */}
          <div className="border-t border-[#D5C09D]">
            {items.map((item, idx) => {
              const isOpen = openId === item.id;
              const buttonId = `faq-btn-${item.id}`;
              const contentId = `faq-content-${item.id}`;

              return (
                <MotionReveal key={item.id} delay={0.08 + idx * 0.05}>
                  <div className="border-b border-[#D5C09D] transition-colors duration-200">
                    <button
                      id={buttonId}
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={contentId}
                      className="w-full py-6 sm:py-8 flex items-start justify-between gap-6 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E460B] focus-visible:ring-offset-2 rounded-sm"
                    >
                      <div className="flex items-baseline gap-4 sm:gap-6 flex-1">
                        {/* Number */}
                        <span className="font-mono text-sm sm:text-base font-bold text-[#1E460B] shrink-0 tracking-wider">
                          {item.number}
                        </span>
                        {/* Question */}
                        <span className="font-sans text-lg sm:text-xl lg:text-2xl font-medium tracking-tight text-[#111613] group-hover:text-[#1E460B] transition-colors duration-200">
                          {item.question}
                        </span>
                      </div>

                      {/* Animated Plus / Minus Toggle Icon */}
                      <span className="shrink-0 p-1.5 sm:p-2 rounded-full border border-[#D5C09D] bg-white/60 group-hover:bg-white text-[#1E460B] transition-all duration-200 mt-0.5">
                        <Plus
                          className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                            isOpen ? 'rotate-45 text-[#1E460B]' : 'text-[#5E6960]'
                          }`}
                          aria-hidden="true"
                        />
                      </span>
                    </button>

                    {/* Expandable Answer Content */}
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
                          <div className="pb-8 sm:pb-10 pl-8 sm:pl-12 pr-4 sm:pr-8 text-[#38423A] font-sans text-base sm:text-lg leading-relaxed space-y-4">
                            <p>{item.answer}</p>
                            {item.id === 'faq-6' && (
                              <div className="pt-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEnquiryModal('General Enquiry', e.currentTarget);
                                  }}
                                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1E460B] hover:bg-[#2A5C13] text-white text-xs font-mono font-semibold tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
                                >
                                  <span>Open Enquiry Form</span>
                                  <span aria-hidden="true">→</span>
                                </button>
                              </div>
                            )}
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
