'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * Editorial Article Closer CTA Section
 * 
 * Strict Standards:
 * - Marked with data-navbar-theme="dark" for scroll-context navbar adaptation
 * - Deep Earth Green aesthetic (#102B17)
 * - Uses the EXISTING global enquiry modal without creating duplicate forms
 * - Pre-populates enquiry context with the verified article title
 */
export default function BlogDetailCta({ blog }) {
  const { openEnquiryModal } = useEnquiry();

  const title = blog?.title || 'this perspective';
  const enquirySubject = `Journal Inquiry: ${title}`;

  return (
    <section
      id="article-cta"
      data-navbar-theme="dark"
      className="relative py-20 sm:py-28 bg-[#102B17] text-[#FAF7F2] overflow-hidden select-none"
      aria-label="Discuss this perspective"
    >
      {/* Soft Ambient Depth Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#102B17] via-[#0E2514] to-[#0A1A0E] opacity-95 pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative Organic Contour Arc */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden select-none opacity-20"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100,500 C300,380 800,580 1540,420"
            stroke="#215730"
            strokeWidth="1.8"
          />
          <path
            d="M-60,320 C420,200 900,440 1500,260"
            stroke="#276939"
            strokeWidth="1.4"
          />
        </svg>
      </div>

      <Container size="default" className="relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Eyebrow Badge */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14361D] border border-[#235832] text-xs font-mono text-[#C4D1C7]">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              <span>CONTINUE THE CONVERSATION</span>
            </div>
          </MotionReveal>

          {/* Display Headline */}
          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.16] text-[#FAF7F2]">
              Interested in discussing farmland stewardship and land ownership?
            </h2>
          </MotionReveal>

          {/* Supportive Guidance */}
          <MotionReveal delay={0.25}>
            <p className="font-sans text-base sm:text-lg text-[#C4D1C7] font-light leading-relaxed max-w-2xl mx-auto">
              Connect directly with our team to explore agricultural management, visit opportunities, and our long-term farmland model.
            </p>
          </MotionReveal>

          {/* Action Buttons */}
          <MotionReveal delay={0.35}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={(e) => openEnquiryModal(enquirySubject, e.currentTarget)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-brand-primary text-brand-secondary hover:bg-brand-primary-hover text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase shadow-[0_6px_20px_rgba(85,196,13,0.25)] hover:scale-[1.02] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                <span>Talk to Us</span>
                <ArrowRight className="w-4 h-4 text-brand-secondary" aria-hidden="true" />
              </button>

              <Link
                href="/blogs"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 sm:py-4 rounded-full bg-[#13351C] border border-[#1E4D2B] text-[#FAF7F2] hover:bg-[#1C4626] text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase transition-all duration-200"
              >
                <ArrowLeft className="w-4 h-4 text-[#859D8C]" aria-hidden="true" />
                <span>All Perspectives</span>
              </Link>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
