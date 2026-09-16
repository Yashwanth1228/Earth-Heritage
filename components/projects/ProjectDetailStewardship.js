'use client';

import { Sprout, CheckCircle2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';

/**
 * Stewardship & Farm Management Section for Project Detail
 * 
 * Strict Standards:
 * - Renders ONLY when verified project stewardshipApproach data is supplied
 * - If data is absent, returns null cleanly
 * - Alternating light ivory tone (#FAF6F0)
 * - Purely operational & agricultural: zero claims about guaranteed yields, appreciation, or passive income
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
      className="relative py-16 sm:py-24 bg-[#FAF6F0] text-[#111613] border-b border-[#DCCDB7]"
      aria-label="Farm Management and Stewardship"
    >
      <Container size="default">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Section Header */}
          <div className="space-y-4">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>OPERATIONAL STEWARDSHIP</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#111613] font-normal tracking-tight leading-[1.18]">
                You own the land. We manage the farm.
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="font-sans text-base sm:text-lg text-[#38423A] leading-relaxed max-w-2xl">
                How Earth Heritage provides hands-on, structured agronomic management and operational care for {name}.
              </p>
            </MotionReveal>
          </div>

          {/* Verified Stewardship Body */}
          <MotionReveal delay={0.3}>
            <div className="rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] p-8 sm:p-12 shadow-sm space-y-6">
              <div className="font-sans text-base sm:text-lg text-[#38423A] leading-relaxed whitespace-pre-line">
                {stewardshipApproach}
              </div>

              {/* Core Operational Responsibilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#DCCDB7]">
                <div className="flex items-start gap-3 text-sm text-[#38423A]">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>On-ground agricultural supervision &amp; skilled workforce deployment</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#38423A]">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Water management, micro-irrigation maintenance &amp; soil health monitoring</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#38423A]">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Crop care, canopy management &amp; organic fertilization cycles</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-[#38423A]">
                  <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Transparent progress updates &amp; seasonal harvest coordination</span>
                </div>
              </div>
            </div>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
