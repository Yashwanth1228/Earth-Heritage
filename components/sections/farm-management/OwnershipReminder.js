'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { farmManagementData } from '@/data/farmManagementData';

/**
 * Section 7 — Ownership + Management Reminder
 * 
 * High-impact statement:
 * "You own the land.
 * We manage the farm."
 * 
 * Supporting:
 * "Earth Heritage works alongside landowners to coordinate agreed farm activities and the ongoing care required to manage the farm."
 */
export default function OwnershipReminder() {
  const { statementLine1, statementLine2, supportingCopy } =
    farmManagementData.ownershipReminder;

  return (
    <section
      id="ownership-reminder"
      className="relative bg-[#F0E0C6] text-[#111613] pt-14 sm:pt-18 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Ownership and Management Reminder"
    >
      {/* Visible Organic Background Root Contours */}
      <LandContourPattern variant="biscuit-roots" className="opacity-95" />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4D1B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>THE CORE MODEL</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-[1.12]">
              <span className="block text-[#111613]">{statementLine1}</span>
              <span className="block text-[#1E460B] italic font-normal mt-1">
                {statementLine2}
              </span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-4 font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {supportingCopy}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.35}>
            <div className="pt-4 flex items-center justify-center gap-6 text-xs font-mono text-[#5E6960] uppercase tracking-wider">
              <span>Titled Ownership</span>
              <span>•</span>
              <span>Agreed Management</span>
              <span>•</span>
              <span>Ongoing Care</span>
            </div>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
