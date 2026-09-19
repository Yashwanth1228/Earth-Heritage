'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { CheckCircle2, Clock, MapPin, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * EventDetailBody: Editorial Narrative, Highlights & Sticky Schedule/Enquiry Card
 */
export default function EventDetailBody({ event }) {
  const { openEnquiryModal } = useEnquiry();

  if (!event) return null;

  return (
    <section
      id="event-detail-body"
      className="relative bg-[#FAF7F2] text-[#111613] py-16 sm:py-20 lg:py-24"
      aria-label="Event Details and Schedule"
    >
      <Container size="default">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Main Narrative & Experience Highlights (7 cols) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* 1. About the Experience */}
            <MotionReveal delay={0.05}>
              <div className="space-y-4">
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#8C7A5A]">
                  Overview &bull; The Experience
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight">
                  About this Gathering
                </h2>
                <p className="font-sans text-base sm:text-lg text-[#3C4A3E] leading-relaxed">
                  {event.overview}
                </p>
              </div>
            </MotionReveal>

            {/* 2. Key Highlights Checklist */}
            {Array.isArray(event.highlights) && event.highlights.length > 0 && (
              <MotionReveal delay={0.15}>
                <div className="space-y-5 pt-6 border-t border-[#E8DFC8]">
                  <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#8C7A5A]">
                    Key Elements &bull; What to Expect
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#111613] font-normal tracking-tight">
                    Experience Highlights
                  </h3>
                  <div className="grid grid-cols-1 gap-3.5">
                    {event.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-xl bg-white/70 border border-[#E8DFC8] text-sm text-[#2D382F]"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#15341C] shrink-0 mt-0.5" aria-hidden="true" />
                        <span className="leading-relaxed">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionReveal>
            )}

            {/* 3. Practical Field Guidelines */}
            <MotionReveal delay={0.25}>
              <div className="space-y-4 pt-6 border-t border-[#E8DFC8]">
                <span className="text-xs font-mono font-semibold uppercase tracking-[0.2em] text-[#8C7A5A]">
                  Preparation &bull; Guidelines
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#111613] font-normal tracking-tight">
                  Visiting the Farmland
                </h3>
                <div className="space-y-3 text-sm text-[#4E5C50] leading-relaxed">
                  <p>
                    Because Earth Heritage managed farmland is an active agricultural ecosystem, we recommend wearing durable walking footwear suitable for soil paths and natural terrain.
                  </p>
                  <p>
                    Sun protection, hats, and light cotton apparel are recommended for outdoor walking sessions. Drinking water and light refreshments prepared with estate-sourced botanical ingredients are provided on-site.
                  </p>
                </div>
              </div>
            </MotionReveal>

          </div>

          {/* Sticky Schedule & Attendance Sidebar (5 cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <MotionReveal delay={0.2}>
              <aside
                className="rounded-3xl bg-[#EDE5D5] border border-[#DCD0BA] p-6 sm:p-8 shadow-[0_8px_30px_rgba(21,52,28,0.05)] space-y-6"
                aria-label="Gathering Schedule Summary"
              >
                <div className="space-y-2">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.2em] text-[#8C7A5A]">
                    Participation Details
                  </span>
                  <h3 className="font-serif text-2xl text-[#111613] font-normal tracking-tight">
                    Schedule &amp; Attendance
                  </h3>
                </div>

                <div className="space-y-4 py-2 border-y border-[#DFD5C0]">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#15341C] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-[#8C7A5A] font-semibold">
                        Timing / Cadence
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#111613]">
                        {event.timing}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#15341C] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-[#8C7A5A] font-semibold">
                        Location
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#111613]">
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Users className="w-4 h-4 text-[#15341C] shrink-0 mt-1" aria-hidden="true" />
                    <div>
                      <span className="block text-[10px] font-mono uppercase tracking-wider text-[#8C7A5A] font-semibold">
                        Participation
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-[#111613]">
                        Registered Landowners &amp; Prospective Buyers by Advance Booking
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Enquiry Action */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => openEnquiryModal(`Event Attendance: ${event.title}`)}
                    className="w-full py-3.5 px-6 rounded-full bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] text-xs font-semibold uppercase tracking-[0.18em] shadow-sm flex items-center justify-center gap-2.5 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
                  >
                    <span>Schedule Attendance</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-[#7A6A4E]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
                    <span>Complimentary for registered landowners</span>
                  </div>
                </div>
              </aside>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
