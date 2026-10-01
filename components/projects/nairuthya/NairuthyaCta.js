'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { useEnquiry } from '@/context/EnquiryContext';
import { ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

/**
 * 12 — FINAL CTA: Closing Project Exhibition Action
 * 
 * Strict Standards:
 * - Premium Earth Heritage closing section
 * - Triggers existing global EnquiryModal with 'Nairuthya Whispering Wood'
 * - Zero fake urgency, zero 'last chance' or financial guarantee language
 * - Grounded in Earth Heritage's authentic brand creed
 */
export default function NairuthyaCta({ project }) {
  const { openEnquiryModal } = useEnquiry();

  const handleEnquire = (e) => {
    openEnquiryModal(project?.enquiryInterest || 'Nairuthya Whispering Wood', e.currentTarget);
  };

  return (
    <section
      id="project-closing-cta"
      data-navbar-theme="dark"
      className="relative bg-[#08170D] text-[#FAF7F2] py-12 sm:py-16 lg:py-20 overflow-hidden"
      aria-label="Connect with Earth Heritage on Nairuthya Whispering Wood"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-20 pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Eyebrow Pill */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-semibold tracking-widest text-[#F8C32C] uppercase shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-[#55C40D]" />
              <span>OWN A PIECE OF EARTH &bull; BUILD A LEGACY</span>
            </div>
          </MotionReveal>

          {/* Heading */}
          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#FAF7F2] tracking-tight leading-[1.14]">
              Talk to Earth Heritage &mdash;{' '}
              <span className="italic text-[#F8C32C] block sm:inline">
                Nairuthya Whispering Wood
              </span>
            </h2>
          </MotionReveal>

          {/* Factual Narrative */}
          <MotionReveal delay={0.15}>
            <p className="font-sans text-sm sm:text-base text-[#C4D1C7] font-light leading-relaxed max-w-2xl mx-auto">
              8 acres of master-planned managed farmland in Honnasandra, Nelamangala. 25 premium plots from 6,000 sq.ft at ₹1,699/sq.ft with titled land ownership and continuing professional farm care.
            </p>
          </MotionReveal>

          {/* Actions */}
          <MotionReveal delay={0.25} className="pt-2">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleEnquire}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#F8C32C] hover:bg-white text-[#111613] hover:text-black font-sans font-bold text-xs sm:text-[13px] tracking-wider uppercase transition-all duration-200 shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Talk to Earth Heritage</span>
                <ArrowRight className="w-4 h-4 text-inherit" aria-hidden="true" />
              </button>

              <Link
                href="/projects"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-sans font-semibold text-xs sm:text-[13px] tracking-wider uppercase transition-colors"
              >
                <ArrowLeft className="w-4 h-4 text-[#55C40D]" />
                <span>Explore all Earth Heritage projects</span>
              </Link>
            </div>
          </MotionReveal>

          {/* Reassurance Disclaimer */}
          <MotionReveal delay={0.35} className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <p className="font-mono text-[11px] text-[#BAC8BE]/70 uppercase tracking-widest">
              Direct Titled Land Ownership &bull; Agronomic Management &bull; Earth Heritage Private Limited
            </p>
            <Link
              href="/contact"
              className="font-mono text-[11px] text-[#F8C32C] hover:underline uppercase tracking-wider shrink-0"
            >
              Contact Earth Heritage &rarr;
            </Link>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
