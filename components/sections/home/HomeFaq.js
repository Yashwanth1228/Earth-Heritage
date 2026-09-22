'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 07 — HomeFaq: Expansive Centered Editorial FAQ
 * 
 * Features:
 * - Widen layout (max-w-5xl lg:max-w-6xl) to comfortably utilize left & right horizontal space.
 * - Substantial typography weight: crisp, prominent, bold question headings & clear answer text.
 * - Single-Column Accordion: Centered directly below heading.
 * - Warm biscuit background (#F0E0C6) alternating with light sections.
 * - Thin architectural dividers with smooth expanding animations.
 */
export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: 'faq-1',
      question: 'What does “Managed Farmland” mean at Earth Heritage?',
      answer:
        'Managed farmland means that agreed agricultural and land-management activities can be professionally handled on behalf of owners. The exact services vary by project and are clearly explained before purchase, allowing owners to stay connected to their land without having to manage every activity themselves.'
    },
    {
      id: 'faq-2',
      question: 'What makes Earth Heritage different?',
      answer:
        'We go beyond land ownership by combining nature, thoughtful development, responsible management, and community.'
    },
    {
      id: 'faq-3',
      question: 'What does “Rooted in Nature. Built for Generations.” mean?',
      answer:
        'It reflects our belief in creating spaces that connect people with nature and become meaningful legacies for future generations.'
    },
    {
      id: 'faq-4',
      question: 'What do I actually own?',
      answer:
        'You own the specific plot or property described in your registered sale and ownership documents, subject to the applicable legal terms and project structure.'
    },
    {
      id: 'faq-5',
      question: 'What is the vision behind Earth Heritage?',
      answer:
        'Our vision is to redefine the way people own, experience, and connect with land—creating spaces that can become meaningful legacies for generations.'
    },
    {
      id: 'faq-6',
      question: 'Why choose Earth Heritage?',
      answer:
        'We bring together thoughtful development, responsible land management, transparency, and a strong connection with nature to create more meaningful land-ownership experiences.'
    },
    {
      id: 'faq-7',
      question: 'Is the farmland registered under my name?',
      answer:
        'Yes, the plot is registered in the buyer’s name as per the applicable legal and registration process.'
    },
    {
      id: 'faq-8',
      question: 'What crops are grown on the farmland?',
      answer:
        'We grow carefully selected crops and plantations suited to the local soil, climate, and project location, with specific crops varying by project.'
    }
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="home-faq"
      data-navbar-theme="light"
      className="relative w-full bg-[#F0E0C6] text-[#111613] py-24 sm:py-32 lg:py-36 border-b border-[#D5C09D] overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-60 pointer-events-none" />

      <Container size="default" className="relative z-10">
        
        {/* CENTERED: Eyebrow, Title & Context */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18 space-y-4">
          <MotionReveal delay={0.05}>
            <span className="inline-block text-[11px] sm:text-xs font-mono font-semibold tracking-[0.24em] text-[#8C7A5A] uppercase">
              Frequently Asked
            </span>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111613] leading-[1.14]">
              Questions, answered.
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="font-sans text-sm sm:text-base text-[#3C4A3E] leading-relaxed max-w-2xl mx-auto">
              Clear, transparent answers regarding farmland ownership, our professional management model, and long-term land stewardship.
            </p>
          </MotionReveal>
        </div>

        {/* EXPANSIVE: Single Column Editorial Accordion (Wider layout utilizing horizontal space) */}
        <div className="max-w-5xl lg:max-w-6xl mx-auto border-t border-b border-[#D5C09D] divide-y divide-[#DECBB0]">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <MotionReveal key={faq.id} delay={0.15 + idx * 0.05}>
                <div className="py-2 sm:py-2.5">
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-btn-${idx}`}
                    className="w-full text-left py-5 sm:py-6 px-2 sm:px-4 flex items-center justify-between gap-4 sm:gap-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C] group rounded-xl hover:bg-[#EBDDC5]/40 transition-colors"
                  >
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-8 pr-2">
                      <span className="font-mono text-sm sm:text-base font-bold text-[#7A6A4E] shrink-0 w-8 sm:w-10">
                        0{idx + 1}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl md:text-[22px] font-semibold text-[#111613] group-hover:text-[#1E460B] transition-colors leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="w-8 h-8 rounded-full border border-[#D5C09D] bg-white/60 group-hover:bg-white flex items-center justify-center shrink-0 transition-colors">
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 text-[#8C7A5A] transition-transform duration-300',
                          isOpen && 'rotate-180 text-[#15341C]'
                        )}
                        aria-hidden="true"
                      />
                    </div>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-answer-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      className="pb-6 pt-1 pl-14 sm:pl-18 md:pl-22 pr-4 sm:pr-8"
                    >
                      <p className="font-sans text-sm sm:text-base font-normal text-[#2E3B30] leading-relaxed max-w-4xl">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              </MotionReveal>
            );
          })}
        </div>

        {/* Center Bottom Link */}
        <MotionReveal delay={0.4} className="text-center mt-12 sm:mt-14">
          <Link
            href="/about#faq"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#15341C] hover:text-[#1E460B] group transition-colors"
          >
            <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
              Read Full FAQ on About Page
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </MotionReveal>

      </Container>
    </section>
  );
}
