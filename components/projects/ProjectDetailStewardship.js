'use client';

import { Sprout, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Stewardship / Farm Care Section for Project Detail
 * 
 * Strict Standards:
 * - Renders verified project stewardshipApproach data from data/projects.js
 * - Focuses on care for the land, ongoing farm management, cultivation, and maintenance
 * - Connects land, nature, ownership, and long-term purpose
 * - Zero unsupported environmental or sustainability claims
 */
export default function ProjectDetailStewardship({ project }) {
  if (!project || !project.stewardshipApproach) {
    return null;
  }

  const { stewardshipApproach, name } = project;

  return (
    <section
      id="project-stewardship"
      data-navbar-theme="light"
      className="relative py-16 sm:py-24 bg-[#F7F3EB] text-[#111613] border-b border-[#DCCDB7]/70 overflow-hidden"
      aria-label="Farm Management and Land Stewardship"
    >
      {/* Background Topographic Motifs */}
      <LandContourPattern variant="biscuit-topography" className="opacity-35" />

      <Container size="default" className="relative z-10">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
          
          {/* Section Header */}
          <div className="space-y-4 text-center sm:text-left">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>STEWARDSHIP &amp; FARM CARE</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111613] font-normal tracking-tight leading-[1.16]">
                Care for the land. Purpose for the future.
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl">
                Active agronomic oversight connecting land, nature, ownership, and enduring purpose for {name}.
              </p>
            </MotionReveal>
          </div>

          {/* Verified Stewardship Body Card */}
          <MotionReveal delay={0.2}>
            <div className="rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] p-8 sm:p-12 shadow-sm space-y-8">
              <div className="space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#1E460B] font-semibold block">
                  AGRONOMIC MANAGEMENT APPROACH
                </span>
                <p className="font-sans text-base sm:text-lg text-[#38423A] leading-relaxed whitespace-pre-line">
                  {stewardshipApproach}
                </p>
              </div>

              {/* Core Disciplines of Care */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#DCCDB7]/70">
                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#D5C09D]/60 flex items-start gap-3 text-sm text-[#38423A]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E460B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-[#111613] block font-medium">Active Soil &amp; Tree Health</strong>
                    <span className="text-xs text-[#5A685D]">Routine soil enrichment, organic composting, and canopy monitoring.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#D5C09D]/60 flex items-start gap-3 text-sm text-[#38423A]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E460B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-[#111613] block font-medium">Water System Upkeep</strong>
                    <span className="text-xs text-[#5A685D]">Precision micro-irrigation scheduling and catchment infrastructure care.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#D5C09D]/60 flex items-start gap-3 text-sm text-[#38423A]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E460B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-[#111613] block font-medium">Dedicated Farm Manpower</strong>
                    <span className="text-xs text-[#5A685D]">Deployment of trained field teams under seasoned agronomic supervisors.</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#D5C09D]/60 flex items-start gap-3 text-sm text-[#38423A]">
                  <CheckCircle2 className="w-4 h-4 text-[#1E460B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <strong className="text-[#111613] block font-medium">Ongoing Operational Transparency</strong>
                    <span className="text-xs text-[#5A685D]">Structured seasonal reporting, harvest tracking, and landowner updates.</span>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
