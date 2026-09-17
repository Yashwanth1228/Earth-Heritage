'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * Project-Specific Consultation CTA Section
 * 
 * Strict Standards:
 * - Marked with data-navbar-theme="dark" for scroll-context navbar adaptation
 * - Deep Earth Green aesthetic (#102B17) matching corporate conversion palette
 * - Communicates "Own the land. Let us help care for the farm."
 * - Integrates with the EXISTING global enquiry modal without creating duplicate forms
 * - Pre-populates enquiry context with the verified project name
 */
export default function ProjectDetailCta({ project }) {
  const { openEnquiryModal } = useEnquiry();

  if (!project) return null;

  const projectName = project.name;
  const enquirySubject = project.enquiryInterest || `${projectName} Inquiry`;

  return (
    <section
      id="project-cta"
      data-navbar-theme="dark"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#102B17] text-[#FAF7F2] overflow-hidden select-none"
      aria-label={`Inquire about ${projectName}`}
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
              <span>START A CONVERSATION</span>
            </div>
          </MotionReveal>

          {/* Luxury Serif Title */}
          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.14] text-[#FAF7F2]">
              Own the land.{' '}
              <span className="text-[#C5A25D] italic block sm:inline">
                Let us help care for the farm.
              </span>
            </h2>
          </MotionReveal>

          {/* Supportive Guidance */}
          <MotionReveal delay={0.15}>
            <p className="font-sans text-base sm:text-lg md:text-xl text-[#C4D1C7] font-light leading-relaxed max-w-2xl mx-auto">
              Connect with Earth Heritage to discuss land stewardship, visit opportunities, and our managed farmland approach for {projectName}.
            </p>
          </MotionReveal>

          {/* Action Buttons */}
          <MotionReveal delay={0.2}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary Action Button (pre-fills project context) */}
              <button
                type="button"
                onClick={(e) => openEnquiryModal(enquirySubject, e.currentTarget)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-full bg-brand-primary text-brand-secondary hover:bg-brand-primary-hover text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase shadow-[0_6px_20px_rgba(85,196,13,0.25)] hover:shadow-[0_8px_25px_rgba(85,196,13,0.35)] hover:scale-[1.02] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary cursor-pointer"
              >
                <span>Talk to Us</span>
                <ArrowRight className="w-4 h-4 text-brand-secondary" aria-hidden="true" />
              </button>

              {/* Secondary Navigation Button */}
              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full bg-transparent text-[#FAF7F2] border border-[#235832] hover:bg-[#14361D] hover:border-[#337D48] text-xs sm:text-[13px] font-medium tracking-wider transition-all duration-200"
              >
                <span>Back to All Projects</span>
              </Link>
            </div>
          </MotionReveal>

          {/* Conversational Footnote */}
          <MotionReveal delay={0.25}>
            <p className="text-xs font-sans text-[#7A9A80] pt-2">
              Earth Heritage coordinates farm management and agricultural planning alongside titled landowners.
            </p>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
