'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { howItWorksData } from '@/data/howItWorksData';
import { CheckCircle2 } from 'lucide-react';

/**
 * Section 3 — The Process Experience (Centerpiece)
 * 
 * Six Sequential Stages:
 * 01 Understand the Land
 * 02 Plan the Farm
 * 03 Manage the Work
 * 04 Cultivate & Care
 * 05 Manage the Harvest
 * 06 Continue the Care
 * 
 * Desktop:
 * - Left: Sticky synchronized stage visual with smooth cross-fade transitions and stage indicator.
 * - Right: Naturally scrolling editorial stage cards connected by an organic contour guide.
 * 
 * Mobile:
 * - Natural vertical process flow with individual stage imagery, zero awkward pinning, and organic continuity.
 */
export default function ProcessJourney() {
  const { stages } = howItWorksData;
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const stageRefs = useRef([]);

  // IntersectionObserver to synchronize active stage smoothly as user scrolls on desktop
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -40% 0px',
      threshold: 0.2
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-stage-index'), 10);
          if (!isNaN(index)) {
            setActiveStageIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    stageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToStage = (index) => {
    setActiveStageIndex(index);
    const targetEl = stageRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const activeStage = stages[activeStageIndex] || stages[0];

  return (
    <section
      id="process-journey"
      className="relative bg-[#F0E0C6] text-[#111613] pt-16 sm:pt-24 lg:pt-28 pb-20 sm:pb-28 lg:pb-32 border-b border-[#DCCDB7]"
      aria-label="The Six-Stage Farmland Process Journey"
    >
      {/* Background Organic Topographic Journey Pattern */}
      <LandContourPattern variant="biscuit-journey" className="opacity-90" />

      <Container size="default" className="relative z-10">
        
        {/* Section Heading & Context */}
        <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-20">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>THE PROCESS JOURNEY</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-[#111613] leading-[1.14]">
              Six stages of dedicated farmland stewardship.
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              A transparent, continuous workflow ensuring your titled land receives thoughtful planning, experienced field teams, ongoing care, and seasonal harvest coordination.
            </p>
          </MotionReveal>
        </div>

        {/* ============================================================ */}
        {/* 1. DESKTOP EXPERIENCE (lg:grid lg:grid-cols-12 gap-12 lg:gap-16) */}
        {/* ============================================================ */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-12 lg:gap-16 relative items-start">
          
          {/* LEFT COLUMN: STICKY VISUAL THEATRE (5 cols) */}
          <div className="lg:col-span-6 xl:col-span-5 sticky top-28 sm:top-32 self-start select-none">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#E4D1B5] border border-[#D5C09D] shadow-[0_20px_50px_rgba(17,22,19,0.12)]">
              
              {/* Stacked Images with Smooth Cross-Fade */}
              {stages.map((stage, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <div
                    key={stage.step}
                    className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                      isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <Image
                      src={stage.image}
                      alt={stage.alt}
                      fill
                      priority={idx < 2}
                      sizes="(max-width: 1280px) 45vw, 600px"
                      className="object-cover object-center transform scale-[1.01]"
                    />
                    {/* Atmospheric contrast gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0C]/85 via-[#0B0F0C]/20 to-transparent" />
                  </div>
                );
              })}

              {/* Active Stage Indicator Badge (Top Left) */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111613]/80 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#FAF6F0] uppercase shadow-md">
                <span className="w-2 h-2 rounded-full bg-[#55C40D] animate-pulse" aria-hidden="true" />
                <span>STAGE {activeStage.step} / 06</span>
              </div>

              {/* Stage Stepper Progress Dots (Top Right) */}
              <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 p-1.5 rounded-full bg-[#111613]/70 backdrop-blur-md border border-white/20">
                {stages.map((s, idx) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => scrollToStage(idx)}
                    aria-label={`Jump to stage ${s.step}: ${s.title}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeStageIndex === idx
                        ? 'w-6 bg-[#55C40D]'
                        : 'bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-20 text-white pointer-events-none">
                <span className="font-mono text-[11px] tracking-widest text-[#55C40D] uppercase font-semibold block mb-1">
                  {activeStage.eyebrow}
                </span>
                <h3 className="font-serif text-2xl xl:text-3xl text-white font-normal tracking-tight drop-shadow-xs">
                  {activeStage.title}
                </h3>
              </div>
            </div>

            {/* Quick Timeline Progress Bar Underneath Sticky Frame */}
            <div className="mt-5 px-2 flex items-center justify-between text-xs font-mono text-[#5A655D]">
              <span className="text-[#1E460B] font-semibold">01 Appraisal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D5C09D]" />
              <span>03 Operations</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D5C09D]" />
              <span>06 Continuity</span>
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLLING EDITORIAL STAGES (6 or 7 cols) */}
          <div className="lg:col-span-6 xl:col-span-7 relative pl-4 lg:pl-8">
            
            {/* Organic Subtle Contour Connecting Path */}
            <div className="absolute left-6 top-8 bottom-12 w-px bg-gradient-to-b from-[#1E460B]/10 via-[#1E460B]/40 to-[#1E460B]/10 pointer-events-none" />

            <div className="space-y-16 xl:space-y-24">
              {stages.map((stage, idx) => {
                const isActive = activeStageIndex === idx;

                return (
                  <div
                    key={stage.step}
                    ref={(el) => (stageRefs.current[idx] = el)}
                    data-stage-index={idx}
                    className="relative pl-12 sm:pl-16 scroll-mt-36"
                  >
                    {/* Timeline Node on the Organic Connector */}
                    <div
                      className={`absolute left-6 -translate-x-1/2 top-4 w-7 h-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                        isActive
                          ? 'bg-[#1E460B] border-[#55C40D] shadow-[0_0_12px_rgba(85,196,13,0.4)] scale-110'
                          : 'bg-[#FAF6F0] border-[#D5C09D]'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive ? 'bg-[#55C40D]' : 'bg-[#D5C09D]'
                        }`}
                      />
                    </div>

                    {/* Stage Card */}
                    <div
                      onClick={() => scrollToStage(idx)}
                      className={`p-7 sm:p-9 rounded-2xl sm:rounded-3xl border transition-all duration-500 cursor-pointer ${
                        isActive
                          ? 'bg-[#FAF6F0] border-[#1E460B]/70 shadow-[0_16px_36px_rgba(30,70,11,0.09)] translate-x-1'
                          : 'bg-[#FAF6F0]/60 border-[#D5C09D]/70 opacity-60 hover:opacity-90'
                      }`}
                    >
                      {/* Step Number & Eyebrow */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span
                          className={`font-mono text-xs font-semibold tracking-widest uppercase transition-colors duration-300 ${
                            isActive ? 'text-[#1E460B]' : 'text-[#69756C]'
                          }`}
                        >
                          {stage.eyebrow}
                        </span>
                        <span
                          className={`font-serif text-3xl sm:text-4xl font-normal transition-colors duration-300 ${
                            isActive ? 'text-[#1E460B]' : 'text-[#A0AFA3]'
                          }`}
                        >
                          {stage.step}
                        </span>
                      </div>

                      {/* Stage Title */}
                      <h3 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight mb-4">
                        {stage.title}
                      </h3>

                      {/* Concise Copy */}
                      <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed mb-6">
                        {stage.copy}
                      </p>

                      {/* Operational Highlights */}
                      <div className="pt-4 border-t border-[#E4D1B5] flex flex-wrap gap-2 sm:gap-2.5">
                        {stage.highlights.map((item, hIdx) => (
                          <span
                            key={hIdx}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-colors duration-300 ${
                              isActive
                                ? 'bg-[#EAD5B5]/90 text-[#1E460B] border border-[#D5C09D]'
                                : 'bg-[#EBDDC8]/50 text-[#5A655D] border border-transparent'
                            }`}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#55C40D]" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* ============================================================ */}
        {/* 2. MOBILE EXPERIENCE (< lg: Natural Vertical Sequence) */}
        {/* ============================================================ */}
        <div className="lg:hidden space-y-12 sm:space-y-16 relative">
          
          {/* Subtle Organic Background Connector Line on Mobile */}
          <div className="absolute left-4 sm:left-6 top-8 bottom-12 w-px bg-gradient-to-b from-[#1E460B]/10 via-[#1E460B]/30 to-[#1E460B]/10 pointer-events-none" />

          {stages.map((stage, idx) => (
            <MotionReveal key={stage.step} delay={0.08} className="relative pl-9 sm:pl-14">
              
              {/* Node Marker */}
              <div className="absolute left-4 sm:left-6 -translate-x-1/2 top-4 w-6 h-6 rounded-full bg-[#1E460B] border-2 border-[#55C40D] flex items-center justify-center shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
              </div>

              {/* Stage Card */}
              <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-[#FAF6F0] border border-[#D5C09D] shadow-[0_10px_28px_rgba(17,22,19,0.06)]">
                
                {/* Stage Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#E4D1B5]">
                  <Image
                    src={stage.image}
                    alt={stage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0C]/75 via-transparent to-transparent" />
                  
                  {/* Step Pill */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#111613]/80 backdrop-blur-md border border-white/20 text-xs font-mono tracking-widest text-[#FAF6F0] uppercase">
                    STAGE {stage.step}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <span className="font-mono text-xs text-[#1E460B] tracking-wider uppercase font-semibold block mb-1">
                    {stage.eyebrow}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight mb-3">
                    {stage.title}
                  </h3>
                  <p className="font-sans text-base text-[#38423A] font-normal leading-relaxed mb-5">
                    {stage.copy}
                  </p>

                  {/* Highlights */}
                  <div className="pt-4 border-t border-[#E4D1B5] flex flex-wrap gap-2">
                    {stage.highlights.map((item, hIdx) => (
                      <span
                        key={hIdx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#EAD5B5]/80 text-[#1E460B] border border-[#D5C09D]"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#55C40D]" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </MotionReveal>
          ))}

        </div>

      </Container>
    </section>
  );
}
