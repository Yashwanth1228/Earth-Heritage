'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import EditorialImageSlot from '@/components/projects/nairuthya/EditorialImageSlot';
import { useEnquiry } from '@/context/EnquiryContext';
import { CalendarCheck, ArrowRight, Sprout } from 'lucide-react';

/**
 * 02 — KEY PROJECT SNAPSHOT: Two-Column Editorial Composition
 * 
 * Styled directly after the master reference (Nairuthya Whispering Wood):
 * - Equal 50/50 two-column editorial composition
 * - "Project Overview" heading hierarchy
 * - Compact inline specifications with Sprout icons and unified font weight
 * - Interactive "Book a site visit" button triggering global enquiry modal
 * - Aspect-locked layout plan visual slot with titled ownership verification
 */
export default function CoconutSnapshot({ project }) {
  const { openEnquiryModal } = useEnquiry();

  const handleBookVisit = (e) => {
    openEnquiryModal('Coconut Garden — Site Visit', e.currentTarget);
  };

  const specifications = [
    { label: 'Total Project Area', value: '6 Acres' },
    { label: 'Minimum Plot Size', value: '6,000 Sq. Ft.' },
    { label: 'Plantation', value: '25+ Plantation Trees' },
    { label: 'Location', value: 'Bidadi' },
    { label: 'Status', value: 'Ongoing' },
    { label: 'Project Type', value: 'Premium Farm Plots' }
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
            
            {/* Header Content */}
            <div className="space-y-2">
              <MotionReveal delay={0.05}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-normal text-[#111613] tracking-tight">
                  Project Overview
                </h2>
              </MotionReveal>
              <MotionReveal delay={0.1}>
                <p className="font-sans text-xs sm:text-[13px] text-[#4E5C50] leading-relaxed pt-0.5 max-w-lg">
                  The project is being developed with essential infrastructure in place: Grand entrance, solar street lights, 24/7 security, and CCTV surveillance surrounded by peaceful nature.{' '}
                  <Link
                    href="/how-it-works"
                    className="text-[#1E460B] font-medium underline underline-offset-2 hover:text-[#55C40D] transition-colors"
                  >
                    Learn how managed farmland works
                  </Link>
                </p>
              </MotionReveal>
            </div>

            {/* Specifications List (Inline, matching master reference styling) */}
            <MotionReveal delay={0.15}>
              <div className="space-y-2.5 sm:space-y-3">
                {specifications.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs sm:text-[13.5px]"
                  >
                    <Sprout className="w-3.5 h-3.5 text-[#55C40D] shrink-0" aria-hidden="true" />
                    <span className="font-sans font-extrabold text-[#5A685D]">
                      {item.label}
                    </span>
                    <span className="text-[#5A685D] font-extrabold mx-0.5">—</span>
                    <span className="font-sans font-extrabold text-[#5A685D]">
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
                  alt={project?.coverImage?.alt || 'Coconut Garden 6-acre farm plots layout in Bidadi'}
                  slotLabel="Master Plan Layout Slot"
                  location="Bidadi • Karnataka"
                  caption={project?.coverImage?.caption || '6 Acres Master-Planned Farm Plots · Bidadi'}
                  aspectRatio="aspect-[4/3]"
                  variant="neutral"
                  className="rounded-xl sm:rounded-2xl w-full"
                />
                <div className="pt-2 px-1 flex items-center justify-between text-[11px] font-mono text-[#7A6A4E] shrink-0">
                  <span>Layout Plan &bull; 6 Acres</span>
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
