'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { useEnquiry } from '@/context/EnquiryContext';
import { farmManagementData } from '@/data/farmManagementData';
import { ArrowRight } from 'lucide-react';

/**
 * Section 8 — Final Enquiry CTA for /farm-management
 * 
 * Heading: "Let's talk about your farmland."
 * Supporting: "Have questions about managed farmland or farm management? Talk to Earth Heritage to understand how the approach works."
 * Action: "Talk to Us" -> Opens existing EnquiryModal with "Farm Management" preselected.
 */
export default function FarmManagementCta() {
  const { openEnquiryModal } = useEnquiry();
  const { eyebrow, heading, supportingText, buttonText } = farmManagementData.cta;

  return (
    <section
      id="cta"
      className="relative bg-[#FAF6F0] text-[#111613] pt-14 sm:pt-20 lg:pt-24 pb-20 sm:pb-28 lg:pb-32 overflow-hidden"
      aria-label="Contact Earth Heritage"
    >
      {/* Visible Organic Background Topographic Elevation Loops */}
      <LandContourPattern variant="biscuit-topography" className="opacity-90" />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow */}
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          {/* Heading */}
          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal tracking-tight text-[#111613] leading-[1.12]">
              {heading}
            </h2>
          </MotionReveal>

          {/* Supporting Copy */}
          <MotionReveal delay={0.25}>
            <p className="mt-6 font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {supportingText}
            </p>
          </MotionReveal>

          {/* Primary Action Button */}
          <MotionReveal delay={0.35}>
            <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={(e) => openEnquiryModal('Farm Management', e.currentTarget)}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-sans font-bold text-sm sm:text-base text-white tracking-wide bg-[linear-gradient(135deg,#163A20_0%,#24552A_50%,#1E460B_100%)] hover:bg-[linear-gradient(135deg,#1C4627_0%,#2B6132_50%,#24540E_100%)] border border-[#2E6838]/60 shadow-[0_10px_25px_rgba(22,58,32,0.25)] hover:shadow-[0_14px_32px_rgba(22,58,32,0.35)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E460B] focus-visible:ring-offset-2"
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4 text-[#55C40D] group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </button>
            </div>
          </MotionReveal>

          {/* Reassurance Micro-copy */}
          <MotionReveal delay={0.4}>
            <p className="mt-6 font-mono text-xs text-[#5E6960] tracking-wider uppercase">
              Confidential Discussion · Titled Land Ownership · Operational Planning
            </p>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
