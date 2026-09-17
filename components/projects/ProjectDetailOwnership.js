'use client';

import { ShieldCheck, Sprout, Users, CheckCircle2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Dedicated Ownership + Management Section for Project Detail
 * 
 * Core Concept:
 * "YOU OWN THE LAND. WE MANAGE THE FARM."
 * 
 * Explains:
 * - Landowner retains titled ownership
 * - Earth Heritage manages agreed farm operations
 * - Management involves people/manpower coordination, cultivation, maintenance, farm operations, harvest
 * - 100% factual, zero financial or speculative return claims
 */
export default function ProjectDetailOwnership({ project }) {
  return (
    <section
      id="project-ownership"
      data-navbar-theme="light"
      className="relative py-16 sm:py-24 lg:py-28 bg-[#FAF6F0] text-[#111613] border-b border-[#DCCDB7]/70 overflow-hidden"
      aria-label="Ownership and Farm Management Structure"
    >
      {/* Background Ambience */}
      <LandContourPattern variant="biscuit-contours" className="opacity-40" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>THE CORE MODEL</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] text-[#111613] font-normal tracking-tight leading-[1.14]">
              You own the land.{' '}
              <span className="text-[#1E460B] italic block sm:inline">
                We manage the farm.
              </span>
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              A transparent, disciplined partnership that balances individual land title rights with structured agrarian stewardship.
            </p>
          </MotionReveal>
        </div>

        {/* Two-Column Visual Comparison Exhibition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-stretch">
          
          {/* Column 1: Landowner Rights (5 cols) */}
          <MotionReveal delay={0.2} className="lg:col-span-5 flex flex-col">
            <div className="group relative rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] p-8 sm:p-10 shadow-sm hover:shadow-md hover:border-[#1E460B]/40 transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-[#DCCDB7]/70 pb-5">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="w-5 h-5 text-[#1E460B]" aria-hidden="true" />
                    <span className="font-mono text-xs font-semibold tracking-widest text-[#1E460B] uppercase">
                      01 — OWNERSHIP
                    </span>
                  </div>
                  <span className="font-serif text-4xl text-[#1E460B]/20 font-light select-none">
                    01
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight">
                    Titled Land Ownership
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#38423A] leading-relaxed">
                    You acquire and retain legally titled ownership of the farmland plot. Your property rights remain permanent, unencumbered, and independent.
                  </p>
                </div>

                <ul className="space-y-3 pt-4 border-t border-[#DCCDB7]/60" role="list">
                  <li className="flex items-start gap-2.5 text-sm text-[#38423A]">
                    <CheckCircle2 className="w-4 h-4 text-[#1E460B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Clear demarcation of private property boundaries</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-[#38423A]">
                    <CheckCircle2 className="w-4 h-4 text-[#1E460B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Complete retention of agricultural land deeds</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-sm text-[#38423A]">
                    <CheckCircle2 className="w-4 h-4 text-[#1E460B] flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Freedom from daily farm labor and equipment burdens</span>
                  </li>
                </ul>
              </div>
            </div>
          </MotionReveal>

          {/* Column 2: Earth Heritage Farm Management (7 cols) */}
          <MotionReveal delay={0.25} className="lg:col-span-7 flex flex-col">
            <div className="group relative rounded-3xl bg-[#FAF6F0] border border-[#D5C09D] p-8 sm:p-10 shadow-sm hover:shadow-md hover:border-[#1E460B]/40 transition-all duration-300 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="flex items-baseline justify-between border-b border-[#DCCDB7]/70 pb-5">
                  <div className="flex items-center gap-2.5">
                    <Sprout className="w-5 h-5 text-[#1E460B]" aria-hidden="true" />
                    <span className="font-mono text-xs font-semibold tracking-widest text-[#1E460B] uppercase">
                      02 — MANAGEMENT
                    </span>
                  </div>
                  <span className="font-serif text-4xl text-[#1E460B]/20 font-light select-none">
                    02
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight">
                    Structured Agricultural Management
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-[#38423A] leading-relaxed">
                    Earth Heritage manages agreed farm operations, deploying trained agricultural teams, maintenance schedules, and continuous field oversight.
                  </p>
                </div>

                {/* Confirmed Management Areas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#DCCDB7]/60">
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D5C09D]/60 space-y-1.5">
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#1E460B] uppercase block">
                      Manpower Coordination
                    </span>
                    <p className="text-xs text-[#5A685D] leading-normal">
                      Supervising skilled farm workers and coordinating agricultural tasks across seasons.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D5C09D]/60 space-y-1.5">
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#1E460B] uppercase block">
                      Cultivation Activities
                    </span>
                    <p className="text-xs text-[#5A685D] leading-normal">
                      Planning crop cycles, soil nourishment, tree health monitoring, and pruning.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D5C09D]/60 space-y-1.5">
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#1E460B] uppercase block">
                      Ongoing Maintenance
                    </span>
                    <p className="text-xs text-[#5A685D] leading-normal">
                      Upkeeping drip irrigation, water logistics, internal farm tracks, and boundary fences.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#D5C09D]/60 space-y-1.5">
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#1E460B] uppercase block">
                      Harvest Coordination
                    </span>
                    <p className="text-xs text-[#5A685D] leading-normal">
                      Managing harvest logistics, produce handling, and ongoing seasonal reporting.
                    </p>
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
