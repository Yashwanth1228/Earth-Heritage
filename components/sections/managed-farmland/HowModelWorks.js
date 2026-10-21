'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import AnimatedTitle from '@/components/animations/AnimatedTitle';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { managedFarmlandData } from '@/data/managedFarmlandData';

/**
 * Section 5 — How The Model Works
 * 
 * Heading: "How the managed farmland model works"
 * 
 * Editorial step-by-step lifecycle with visual connectors:
 * 01 Land Ownership
 * 02 Understand the Land
 * 03 Plan the Management
 * 04 Manage the Farm
 * 05 Ongoing Care
 * 06 Harvest Management
 */
export default function HowModelWorks() {
  const { eyebrow, heading, description, steps } = managedFarmlandData.howModelWorks;

  return (
    <section
      id="how-it-works"
      className="relative bg-[#F0E0C6] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="How the Managed Farmland Model Works"
    >
      {/* Visible Organic Background Landscape Journey Contours */}
      <LandContourPattern variant="biscuit-journey" className="opacity-95" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          <div className="flex justify-center">
            <AnimatedTitle
              as="h2"
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#111613] leading-[1.14] text-center"
              withUnderline
              underlineColor="#1E460B"
              underlineDelay={0.4}
            >
              {heading}
            </AnimatedTitle>
          </div>

          <MotionReveal delay={0.25}>
            <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {description}
            </p>
          </MotionReveal>
        </div>

        {/* Editorial Connected Sequence Grid with Alternating Left/Right Reveals */}
        <div className="max-w-5xl mx-auto relative">
          
          {/* Vertical Connecting Guide for Large Screens */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-[#1E460B]/10 via-[#1E460B]/30 to-[#1E460B]/10 -translate-x-1/2 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
            {steps.map((step, idx) => (
              <MotionReveal
                key={step.step}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={0.08 + idx * 0.05}
                duration={0.65}
              >
                <div className="h-full p-6 sm:p-8 rounded-2xl bg-[#FAF6F0]/90 border border-[#D5C09D] hover:border-[#1E460B]/60 transition-all duration-300 shadow-[0_4px_20px_rgba(17,22,19,0.03)] hover:shadow-[0_8px_28px_rgba(17,22,19,0.06)] flex flex-col justify-between backdrop-blur-xs relative group">
                  
                  <div>
                    {/* Header Row: Step Number + Indicator */}
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6D8C3]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1E460B] text-white text-xs font-mono font-bold tracking-wider">
                          {step.step}
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#1E460B] uppercase tracking-wider">
                          Phase {step.step}
                        </span>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-[#55C40D] opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Step Title */}
                    <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-[#111613] group-hover:text-[#1E460B] transition-colors">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="mt-3 font-sans text-sm sm:text-base text-[#2C362F] font-normal leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Technical Annotation */}
                  <div className="mt-6 pt-3.5 border-t border-[#EAD5B5]/60 flex items-center gap-2">
                    <span className="text-[#1E460B] text-xs" aria-hidden="true">↳</span>
                    <span className="font-sans text-xs text-[#5E6960] italic">
                      {step.annotation}
                    </span>
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>

        {/* Contextual Link to /how-it-works */}
        <MotionReveal delay={0.35} className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8 px-6 sm:px-8 py-5 rounded-2xl bg-[#FAF6F0]/90 border border-[#D5C09D] shadow-xs max-w-3xl mx-auto backdrop-blur-xs">
            <div className="text-left sm:text-left">
              <span className="font-mono text-xs font-bold text-[#1E460B] uppercase tracking-wider block">
                Detailed Operational Model
              </span>
              <p className="mt-1 font-sans text-sm text-[#38423A]">
                Understand the complete land acquisition, title registration, and ongoing care workflow in our comprehensive guide.
              </p>
            </div>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1E460B] hover:bg-[#2A5C13] text-white text-xs font-mono font-semibold tracking-wider uppercase transition-colors shrink-0 shadow-2xs group"
            >
              <span>Explore How It Works</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
