'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import EditorialImageSlot from './EditorialImageSlot';
import { useEnquiry } from '@/context/EnquiryContext';
import { CalendarCheck, ArrowRight, Sprout } from 'lucide-react';

/**
 * 02 — KEY PROJECT SNAPSHOT: Two-Column Editorial Composition
 * 
 * Strict Standards:
 * - Equal 50/50 two-column split (grid-cols-1 lg:grid-cols-2)
 * - User-friendly simple title: "Project Overview"
 * - Eyebrow removed
 * - Left (50%):
 *   - Simple user-friendly heading + intro paragraph
 *   - Compact inline specification points (sprout bullet, label — value, font ~13.5px)
 *   - "Book a site visit" action button
 * - Right (50%):
 *   - Large project / site layout visual taking equal width and matching height
 * - Comfortable container margins on left and right
 * - Warm ivory/off-white background (#FAF7F2)
 */
export default function NairuthyaSnapshot({ project }) {
  const { openEnquiryModal } = useEnquiry();

  const handleBookVisit = (e) => {
    openEnquiryModal('Nairuthya Whispering Wood — Site Visit', e.currentTarget);
  };

  const specifications = [
    { label: 'Total Project Area', value: '5 Acres' },
    { label: 'Total Plots', value: '24' },
    { label: 'Minimum Plot Size', value: '6,000 sq.ft' },
    { label: 'Price', value: '₹1,699 / sq.ft' },
    { label: 'Location', value: 'Honnasandra, Nelamangala' },
    { label: 'Distance from Bengaluru', value: 'Approximately 35 km' },
    { label: 'Distance from Nelamangala', value: 'Approximately 8 km' },
  ];

  return (
    <section
      id="snapshot"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Project Snapshot and Specifications"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10 max-w-6xl px-5 sm:px-8 lg:px-10">
        
        {/* Equal 50/50 Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading + Intro + Inline Specifications + Button (50% width) */}
          <div className="flex flex-col justify-between space-y-5 sm:space-y-6">
            
            {/* Header Content (User-friendly title, eyebrow removed) */}
            <div className="space-y-2">
              <MotionReveal delay={0.05}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#111613] tracking-tight">
                  Project Overview
                </h2>
              </MotionReveal>
              <MotionReveal delay={0.1}>
                <p className="font-sans text-xs sm:text-[13px] text-[#4E5C50] leading-relaxed pt-0.5 max-w-lg">
                  The Project will be handed over with infrastructure in place: Bio fencing, drip irrigation, solar street lighting, CCTV surveillance, security, and themed landscaping.
                </p>
              </MotionReveal>
            </div>

            {/* Specifications List (Inline, compact font size matching reference) */}
            <MotionReveal delay={0.15}>
              <div className="space-y-2.5 sm:space-y-3">
                {specifications.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-[13.5px]"
                  >
                    <Sprout className="w-3.5 h-3.5 text-[#55C40D] shrink-0" aria-hidden="true" />
                    <span className="font-sans text-[#5A685D] font-normal">
                      {item.label}
                    </span>
                    <span className="text-[#C8BAA3] mx-0.5">—</span>
                    <span className="font-sans font-semibold text-[#111613]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </MotionReveal>

            {/* Action Button: Book a Site Visit */}
            <MotionReveal delay={0.2} className="pt-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleBookVisit}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
                >
                  <CalendarCheck className="w-3.5 h-3.5 text-[#55C40D]" />
                  <span>Book a site visit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-white/80" />
                </button>
                <span className="text-[11px] font-mono text-[#7A8A7E]">
                  Private visits arranged by appointment
                </span>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Large Project / Site Visual (50% width) */}
          <div className="flex flex-col justify-center">
            <MotionReveal delay={0.15} className="w-full">
              <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DDD3BF] bg-white p-2.5 sm:p-3 shadow-xs flex flex-col justify-between">
                <EditorialImageSlot
                  src={project?.coverImage?.src}
                  alt="Nairuthya Whispering Wood — 5-Acre Layout Plan"
                  slotLabel="Master Plan Layout Slot"
                  caption="5 Acres Master-Planned Farmland Layout · Honnasandra, Nelamangala"
                  aspectRatio="aspect-[4/3]"
                  variant="neutral"
                  className="rounded-xl sm:rounded-2xl w-full"
                />
                <div className="pt-2 px-1 flex items-center justify-between text-[11px] font-mono text-[#7A6A4E] shrink-0">
                  <span>Layout Plan &bull; 24 Plots</span>
                  <span className="text-[#1E460B] font-semibold">Titled Ownership</span>
                </div>
              </div>
            </MotionReveal>
          </div>

        </div>

      </Container>
    </section>
  );
}
