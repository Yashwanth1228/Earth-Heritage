'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowRight } from 'lucide-react';

/**
 * 04 — HomeHowItWorks: Visual Lifecycle Sequence
 * 
 * Simple, streamlined sequence:
 * OWN -> MANAGE -> CULTIVATE -> CARE -> CONTINUE
 * 
 * Concise visual summary linking to /how-it-works for the deep-dive.
 */
export default function HomeHowItWorks() {
  const lifecycleSteps = [
    {
      phase: '01',
      title: 'OWN',
      subtitle: 'Land Ownership',
      desc: 'You select and legally acquire ownership of the farmland property.'
    },
    {
      phase: '02',
      title: 'MANAGE',
      subtitle: 'Operational Agreement',
      desc: 'Earth Heritage establishes the structured farm management plan.'
    },
    {
      phase: '03',
      title: 'CULTIVATE',
      subtitle: 'Seasonal Agriculture',
      desc: 'On-ground agricultural teams plant, nurture, and tend to crops.'
    },
    {
      phase: '04',
      title: 'CARE',
      subtitle: 'Continuous Maintenance',
      desc: 'Routine infrastructure care, boundary upkeep, and water management.'
    },
    {
      phase: '05',
      title: 'CONTINUE',
      subtitle: 'Generational Legacy',
      desc: 'Enjoy long-term agricultural stewardship and lasting family connection.'
    }
  ];

  return (
    <section
      id="how-it-works-overview"
      data-navbar-theme="light"
      className="relative w-full bg-[#FAF6EE] text-[#111613] py-20 sm:py-28 lg:py-32 border-b border-[#E5DAC4] overflow-hidden"
      aria-label="How Earth Heritage Works"
    >
      <LandContourPattern variant="biscuit-architectural" className="opacity-70" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-18">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADCC2] border border-[#D5C6A6] text-xs font-mono font-semibold tracking-widest text-[#15341C] uppercase mb-6 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              <span>The Journey</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111613] leading-[1.12]">
              How It Works
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-4 font-sans text-base sm:text-lg text-[#3C4A3E] font-normal leading-relaxed max-w-2xl">
              A transparent, disciplined framework that turns farmland ownership into an effortless, multi-generational reality.
            </p>
          </MotionReveal>
        </div>

        {/* Visual Lifecycle Sequence (Horizontal on Desktop, Stacked on Mobile) */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-7 left-10 right-10 h-0.5 bg-[#D8C7A3] -z-0" aria-hidden="true">
            <div className="h-full bg-gradient-to-r from-[#1E460B] via-brand-primary to-[#B88E3E] opacity-60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 relative z-10">
            {lifecycleSteps.map((step, idx) => (
              <MotionReveal key={step.phase} delay={0.15 + idx * 0.08} className="h-full">
                <div className="h-full p-6 rounded-2xl bg-white/90 border border-[#DDD0B7] shadow-xs hover:border-[#1E460B]/40 hover:shadow-sm transition-all duration-200 flex flex-col justify-between space-y-4">
                  
                  {/* Phase Marker & Sequence Header */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-[#15341C] text-[#FAF7F2] font-mono text-xs font-bold flex items-center justify-center shadow-xs">
                        {step.phase}
                      </div>
                      <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-[#8C7A5A]">
                        Step {idx + 1}
                      </span>
                    </div>

                    <div className="space-y-0.5 pt-1">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#111613]">
                        {step.title}
                      </h3>
                      <p className="font-mono text-xs text-[#1E460B] font-semibold tracking-wide">
                        {step.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-[13px] text-[#4E5C50] leading-relaxed pt-1">
                      {step.desc}
                    </p>
                  </div>

                  <div className="w-full pt-3 border-t border-[#EAE0CD] text-[11px] font-mono text-[#8C7A5A] flex items-center justify-between">
                    <span>PHASE {step.phase}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>

        {/* Section CTA */}
        <MotionReveal delay={0.4} className="mt-12 sm:mt-16 text-center sm:text-left">
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#15341C] text-[#FAF7F2] hover:bg-[#1E460B] text-xs sm:text-[13px] font-semibold tracking-[0.16em] uppercase shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span>See How It Works in Detail &rarr;</span>
          </Link>
        </MotionReveal>
      </Container>
    </section>
  );
}
