'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * Projects CTA Section
 * 
 * Provides an inviting, low-pressure closing section allowing visitors to enquire
 * or talk to Earth Heritage about upcoming farmland locations.
 */
export default function ProjectsCta() {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section
      id="cta"
      className="relative py-20 sm:py-28 bg-[#FAF6F0] overflow-hidden"
      aria-label="Connect With Earth Heritage"
    >
      <LandContourPattern variant="biscuit-contours" className="opacity-70" />

      <Container size="default" className="relative z-10 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>START A CONVERSATION</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111613] font-normal tracking-tight leading-[1.2]">
              Have land you want to care for with purpose?
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="font-sans text-base sm:text-lg text-[#38423A] leading-relaxed">
              Explore how Earth Heritage approaches managed farmland and ongoing farm care.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.35}>
            <div className="pt-4">
              <button
                type="button"
                onClick={(e) => openEnquiryModal('Projects Inquiry', e.currentTarget)}
                className="inline-flex items-center justify-center font-sans font-semibold select-none rounded-full px-8 py-3.5 text-sm sm:text-base tracking-wide text-[#FAF6F0] bg-[linear-gradient(135deg,#163A20_0%,#24552A_50%,#1E460B_100%)] border border-[#2E6838]/50 shadow-[0_4px_16px_rgba(22,58,32,0.24)] transition-all duration-250 hover:bg-[linear-gradient(135deg,#1C4627_0%,#2B6132_50%,#24540E_100%)] hover:scale-[1.02] active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                Talk to Us
              </button>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
