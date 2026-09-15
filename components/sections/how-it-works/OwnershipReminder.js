'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { howItWorksData } from '@/data/howItWorksData';
import { ShieldCheck, Check } from 'lucide-react';

/**
 * Section 4 — Ownership + Management Reminder for /how-it-works
 * 
 * Clean two-column statement:
 * LEFT: YOU OWN THE LAND.
 * RIGHT: WE MANAGE THE FARM.
 * Explains that land ownership and farm management are distinct parts of the model.
 */
export default function OwnershipReminder() {
  const { eyebrow, heading, description, columns } = howItWorksData.ownershipReminder;

  return (
    <section
      id="ownership-reminder"
      className="relative bg-[#FAF6F0] text-[#111613] py-16 sm:py-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Ownership and Farm Management Distinction"
    >
      {/* Background Topographic Contours */}
      <LandContourPattern variant="biscuit-topography" className="opacity-70" />

      <Container size="default" className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111613] leading-[1.14]">
              {heading}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </MotionReveal>
        </div>

        {/* Two-Column Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {columns.map((col, idx) => {
            const isFirst = idx === 0;

            return (
              <MotionReveal key={col.badge} delay={0.15 + idx * 0.1}>
                <div
                  className={`h-full p-8 sm:p-10 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                    isFirst
                      ? 'bg-[#F0E0C6] border-[#D5C09D] shadow-[0_12px_32px_rgba(17,22,19,0.06)]'
                      : 'bg-[#EBDDC8] border-[#D5C09D] shadow-[0_12px_32px_rgba(17,22,19,0.06)]'
                  }`}
                >
                  <div>
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111613]/80 text-[#FAF6F0] text-xs font-mono tracking-widest uppercase mb-6">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#55C40D]" />
                      <span>{col.badge}</span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight mb-4">
                      {col.title}
                    </h3>

                    {/* Paragraph */}
                    <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed mb-8">
                      {col.text}
                    </p>
                  </div>

                  {/* Feature Checkpoints */}
                  <div className="pt-6 border-t border-[#D5C09D]/80 space-y-3">
                    {col.points.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#1E460B] text-white flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#55C40D]" />
                        </div>
                        <span className="font-sans text-sm sm:text-base text-[#2B352E] font-medium">
                          {pt}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
