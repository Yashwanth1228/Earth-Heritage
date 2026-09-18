'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 07 — HomeFaq: Compact Curated First-Visit FAQ
 * 
 * 5 Essential Questions from Confirmed Project Ground Truth (data/aboutData.js):
 * 1. What is managed farmland?
 * 2. Who owns the farmland?
 * 3. What does Earth Heritage manage?
 * 4. How does Earth Heritage approach land and nature?
 * 5. How can I learn more or begin a conversation?
 */
export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      id: 'faq-1',
      question: 'What is managed farmland?',
      answer:
        'Managed farmland allows individuals to own agricultural land while Earth Heritage coordinates professional farm management, maintenance, and day-to-day agricultural stewardship on their behalf.',
      linkText: 'Learn about our Managed Farmland offering',
      href: '/managed-farmland'
    },
    {
      id: 'faq-2',
      question: 'Who owns the farmland?',
      answer:
        'The landowner retains complete and unambiguous ownership of the farmland. The title and deed remain strictly registered in the landowner’s name while Earth Heritage manages agreed on-ground operations.',
      linkText: 'Read about our ownership clarity',
      href: '/about#model'
    },
    {
      id: 'faq-3',
      question: 'What does Earth Heritage manage?',
      answer:
        'Earth Heritage handles agreed day-to-day farm management and coordinates activities including manpower supervision, crop planning, cultivation, maintenance, farm operations, and harvest management.',
      linkText: 'Explore our 6 operational scopes',
      href: '/farm-management'
    },
    {
      id: 'faq-4',
      question: 'How does Earth Heritage approach land and nature?',
      answer:
        'Earth Heritage is guided by responsible development, ecological balance, and long-term stewardship. Agricultural activities are planned to respect natural cycles, preserve soil vitality, and protect native flora.',
      linkText: 'Discover our 5 guiding principles',
      href: '/about#philosophy'
    },
    {
      id: 'faq-5',
      question: 'How can I learn more or begin a conversation?',
      answer:
        'You can connect directly with our team through the enquiry form below or via WhatsApp to discuss farmland ownership, management plans, or to schedule a private estate visit.',
      linkText: 'See the full ownership journey',
      href: '/how-it-works'
    }
  ];

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="home-faq"
      data-navbar-theme="dark"
      className="relative w-full bg-[#0E2413] text-[#FAF7F2] py-20 sm:py-28 lg:py-32 border-b border-[#1A4224] overflow-hidden"
      aria-label="Frequently Asked Questions"
    >
      <LandContourPattern variant="dark-elevation-depth" className="opacity-35" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Context (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183820] border border-[#2B5E38] text-xs font-mono font-semibold tracking-widest text-[#E8DCC8] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                <span>Common Questions</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal tracking-tight text-[#FAF7F2] leading-[1.14]">
                Everything you need to know.
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="font-sans text-sm sm:text-base text-[#B3C7B9] leading-relaxed">
                Clear, transparent answers regarding farmland ownership, professional farm care, and our approach to long-term stewardship.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.35} className="pt-2">
              <Link
                href="/about#faq"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#F2CF84] hover:text-white transition-colors"
              >
                <span>Read Full FAQ on About Page &rarr;</span>
              </Link>
            </MotionReveal>
          </div>

          {/* Right Column: Accessible Accordion (7 cols) */}
          <div className="lg:col-span-7 space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <MotionReveal key={faq.id} delay={0.15 + idx * 0.06}>
                  <div
                    className={cn(
                      'rounded-2xl border transition-all duration-300 overflow-hidden',
                      isOpen
                        ? 'bg-[#14351D] border-[#2E6B3E] shadow-md'
                        : 'bg-[#102B17]/90 border-[#1E4D2A] hover:border-[#2E6B3E]/60'
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${idx}`}
                      id={`faq-btn-${idx}`}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4">
                        <span className="font-mono text-xs font-semibold text-[#8C7A5A]">
                          0{idx + 1}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-medium text-[#FAF7F2] tracking-tight">
                          {faq.question}
                        </h3>
                      </div>

                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300',
                          isOpen
                            ? 'bg-brand-primary text-brand-secondary rotate-180'
                            : 'bg-[#183E23] text-[#A8BEB0]'
                        )}
                        aria-hidden="true"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${idx}`}
                        role="region"
                        aria-labelledby={`faq-btn-${idx}`}
                        className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 space-y-3"
                      >
                        <p className="font-sans text-xs sm:text-sm text-[#C4D5C8] leading-relaxed pl-7">
                          {faq.answer}
                        </p>

                        <div className="pl-7 pt-1">
                          <Link
                            href={faq.href}
                            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-brand-primary hover:text-white transition-colors"
                          >
                            <span>{faq.linkText}</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    )}
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
