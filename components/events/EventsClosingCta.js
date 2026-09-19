'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * 06 — EventsClosingCta: Restrained Corporate Closing CTA
 * 
 * Strict Standards:
 * - Restrained tone: "Stay connected with Earth Heritage."
 * - Factual supporting copy grounded in actual estate visits.
 * - Actions: Connect with Farm Operations / Schedule Visit via Enquiry Modal or /contact.
 * - Warm Ivory / Earth Neutral aesthetic matching the corporate design system.
 */
export default function EventsClosingCta({ title = 'Stay connected with Earth Heritage.' }) {
  const { openEnquiryModal } = useEnquiry();

  return (
    <section
      id="events-closing-cta"
      className="relative bg-[#EDE5D5] text-[#111613] py-20 sm:py-24 lg:py-28 border-t border-[#DFD5C0] overflow-hidden"
      aria-label="Connect with Earth Heritage"
    >
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-40 pointer-events-none" />

      <Container size="default" className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Eyebrow */}
          <MotionReveal delay={0.05}>
            <span className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-[0.22em] text-[#7A6A4E] uppercase">
              <CalendarCheck className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
              <span>Estate Visits &bull; Gatherings</span>
            </span>
          </MotionReveal>

          {/* Heading */}
          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#111613] tracking-tight leading-[1.14]">
              {title}
            </h2>
          </MotionReveal>

          {/* Supporting Copy */}
          <MotionReveal delay={0.25}>
            <p className="font-sans text-sm sm:text-base text-[#4A574C] leading-relaxed max-w-xl mx-auto">
              Private estate walkthroughs and seasonal community sessions are held across our managed acreage in the Bengaluru region. Inquire to attend an upcoming gathering or schedule a personal visit with our agronomy team.
            </p>
          </MotionReveal>

          {/* Action Buttons */}
          <MotionReveal delay={0.35} className="pt-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => openEnquiryModal('Event & Estate Visit Enquiry')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
              >
                <span>Schedule an Estate Visit</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </button>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#FAF7F2] hover:bg-white text-[#111613] border border-[#D5C6A6] text-xs font-semibold uppercase tracking-[0.18em] transition-all shadow-xs"
              >
                <span>Contact Office</span>
              </Link>
            </div>
          </MotionReveal>

          {/* Reassurance note */}
          <MotionReveal delay={0.4} className="pt-2">
            <p className="text-[11px] font-mono text-[#8C7A5A] uppercase tracking-wider">
              Private visits organized by advance appointment &bull; Earth Heritage Pvt Ltd
            </p>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
