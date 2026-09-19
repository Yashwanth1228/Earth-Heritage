'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowRight, ChevronLeft, ChevronRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 04 — HomeHowItWorks: Scroll-Driven Sticky Step-by-Step Sliding Journey
 * 
 * Features:
 * - True Scroll-Driven Animation: As the user scrolls down the page, the section stays pinned
 *   and one after the other, cards slide in sequentially (01 OWN → 02 PLAN → 03 CULTIVATE → 04 CARE → 05 CONTINUE).
 * - 100% Screen Ratio Visibility: Compact, architectural proportions ensuring 100% of the card,
 *   text, deliverables, and photography are completely visible within standard screen ratios (no cutoff).
 * - Dual scroll synchronizer: Hooks into both window scroll and Lenis smooth scroll ticker.
 * - Dynamic Connected Timeline Bar: Live connected line filling smoothly as you scroll between steps.
 * - Interactive: Clicking any step or arrow smoothly scrolls directly to that step.
 */
export default function HomeHowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const isClickScrolling = useRef(false);

  const steps = [
    {
      number: '01',
      label: 'OWN',
      phaseName: 'Phase 01 &bull; Ownership',
      title: 'Direct Legal Land Ownership',
      subtitle: 'Clear, registered deed in your name',
      desc: 'You legally acquire and retain registered ownership of your chosen agricultural farmland. Legal deeds and title documents remain strictly registered in the landowner’s name with complete transparency.',
      image: '/images/how-it-works/stage-01-understand.jpg',
      alt: 'Open expansive farmland acreage with clear boundaries and natural contours',
      highlights: [
        'Individual legal title registered in your name',
        'Transparent demarcation & survey documents',
        'Enduring generational real property asset'
      ]
    },
    {
      number: '02',
      label: 'PLAN',
      phaseName: 'Phase 02 &bull; Agronomic Blueprint',
      title: 'Customized Farm Plan',
      subtitle: 'Scientific soil and crop planning',
      desc: 'Earth Heritage establishes the structured farm management and seasonal cultivation blueprint suited to the land’s topography, soil biology, and local micro-climate conditions.',
      image: '/images/how-it-works/stage-02-plan.jpg',
      alt: 'Agronomists planning crop rows and plantation layout with architectural maps',
      highlights: [
        'Bespoke seasonal crop & orchard layout',
        'Topographic swales & watershed engineering',
        'Multi-tier agroforestry canopy strategy'
      ]
    },
    {
      number: '03',
      label: 'CULTIVATE',
      phaseName: 'Phase 03 &bull; Active Farming',
      title: 'Dedicated Agricultural Care',
      subtitle: 'Supervised agronomy teams on ground',
      desc: 'Dedicated field specialists carry out scientific planting, organic nourishment, and routine crop tending, revitalizing living soil structure while prioritizing ecological balance.',
      image: '/images/how-it-works/stage-03-work.jpg',
      alt: 'Active agricultural team cultivating healthy crops in disciplined straight rows',
      highlights: [
        'Precision drip irrigation management',
        'Organic composting & microbial vitality',
        'Careful seasonal cultivation cycles'
      ]
    },
    {
      number: '04',
      label: 'CARE',
      phaseName: 'Phase 04 &bull; Maintenance',
      title: 'Routine Farm Infrastructure Upkeep',
      subtitle: 'Daily supervision and ongoing protection',
      desc: 'Routine boundary care, fence maintenance, organic weeding, canopy pruning, and irrigation upkeep are managed daily by our resident farm team with scheduled progress reports.',
      image: '/images/how-it-works/stage-04-cultivate.jpg',
      alt: 'Farm team inspecting lush green tree canopy and organic plantation health',
      highlights: [
        'Dedicated manpower & field supervision',
        'Routine boundary & infrastructure care',
        'Periodic landowner photo progress reports'
      ]
    },
    {
      number: '05',
      label: 'CONTINUE',
      phaseName: 'Phase 05 &bull; Living Legacy',
      title: 'Seasonal Harvest & Family Legacy',
      subtitle: 'Bountiful harvest produce and generational pride',
      desc: 'Receive fresh seasonal produce harvested from your farmland while enjoying an enduring, fruitful sanctuary that your family can visit, cherish, and pass down for generations.',
      image: '/images/how-it-works/stage-05-harvest.jpg',
      alt: 'Bountiful seasonal produce harvested fresh from organic managed farmland',
      highlights: [
        'Systematic produce harvest & logistics',
        'Private weekend farm visits & community',
        'Enduring agricultural family sanctuary'
      ]
    }
  ];

  const totalSteps = steps.length;

  // Scroll listener that maps scroll progress through the pinned 320vh section to activeIndex
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isClickScrolling.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const pinTop = window.innerWidth >= 640 ? 76 : 66;
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      // Distance scrolled past the point where the section reaches pin position
      const scrolled = pinTop - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));
      setScrollProgress(progress);

      // Map progress to step index across the 5 steps
      // 0.00-0.20 -> Step 0, 0.20-0.40 -> Step 1, 0.40-0.60 -> Step 2, 0.60-0.80 -> Step 3, 0.80-1.00 -> Step 4
      const newIndex = Math.min(totalSteps - 1, Math.floor(progress * totalSteps));
      setActiveIndex(newIndex);
    };

    // Attach to native scroll and resize
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Sync with Lenis smooth scroll ticker if available
    let cleanupLenis = null;
    const attachLenis = () => {
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.on('scroll', handleScroll);
        cleanupLenis = () => {
          if (window.__lenis) {
            window.__lenis.off('scroll', handleScroll);
          }
        };
      }
    };
    attachLenis();
    const lenisTimer = setTimeout(attachLenis, 300);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (cleanupLenis) cleanupLenis();
      clearTimeout(lenisTimer);
    };
  }, [totalSteps]);

  // Programmatic smooth scroll to specific step
  const scrollToStep = useCallback((targetIndex) => {
    if (!sectionRef.current) return;
    isClickScrolling.current = true;
    setActiveIndex(targetIndex);

    const rect = sectionRef.current.getBoundingClientRect();
    const pinTop = window.innerWidth >= 640 ? 76 : 66;
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = rect.height - windowHeight;

    const targetFraction = (targetIndex + 0.35) / totalSteps;
    const currentScrollY = window.scrollY;
    const sectionDocTop = currentScrollY + rect.top - pinTop;
    const targetScrollY = sectionDocTop + (targetFraction * totalScrollableDistance);

    if (window.__lenis) {
      window.__lenis.scrollTo(targetScrollY, {
        duration: 0.8,
        onComplete: () => {
          isClickScrolling.current = false;
        }
      });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth'
      });
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 700);
    }
  }, [totalSteps]);

  const prevStep = () => {
    if (activeIndex > 0) {
      scrollToStep(activeIndex - 1);
    }
  };

  const nextStep = () => {
    if (activeIndex < totalSteps - 1) {
      scrollToStep(activeIndex + 1);
    }
  };

  return (
    <section
      id="how-it-works-overview"
      ref={sectionRef}
      data-navbar-theme="light"
      className="relative w-full bg-[#FAF6EE] text-[#111613] border-b border-[#E5DAC4] select-none"
      style={{ height: '320vh' }} // Height translates user scroll into step-by-step card animations
      aria-label="How Earth Heritage Works"
    >
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-45 pointer-events-none" />

      {/* STICKY CONTAINER: Pinned right below floating header (top-[76px])
          Compact vertical envelope ensures 100% of card, copy, highlights, photo are completely visible on 100% screen ratio */}
      <div className="sticky top-[68px] sm:top-[74px] lg:top-[76px] w-full min-h-[calc(100vh-76px)] max-h-[calc(100vh-76px)] flex flex-col justify-center py-2 sm:py-3 z-10 overflow-hidden">
        <Container size="default" className="w-full flex flex-col justify-between max-h-[740px] my-auto">
          
          {/* 1. COMPACT SECTION HEADER */}
          <div className="flex items-center justify-between gap-4 shrink-0 mb-2 sm:mb-3">
            <div>
              <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.2em] text-[#8C7A5A] uppercase block">
                The Ownership Journey
              </span>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-normal tracking-tight text-[#111613] leading-tight mt-0.5">
                How It Works
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {/* Prev/Next Step Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={activeIndex === 0}
                  aria-label="Previous step"
                  className="w-8 h-8 rounded-full border border-[#D5C09D] bg-white/90 hover:bg-white text-[#15341C] flex items-center justify-center shadow-2xs transition-all disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={activeIndex === totalSteps - 1}
                  aria-label="Next step"
                  className="w-8 h-8 rounded-full border border-[#D5C09D] bg-white/90 hover:bg-white text-[#15341C] flex items-center justify-center shadow-2xs transition-all disabled:opacity-35 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <Link
                href="/how-it-works"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#15341C] hover:text-[#1E460B] group transition-colors ml-1"
              >
                <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
                  Full Process
                </span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* 2. CONNECTED TIMELINE PROGRESS BAR (Smooth Line + Step Badges) */}
          <div className="relative shrink-0 mb-3 sm:mb-4">
            {/* Background Line */}
            <div className="absolute top-3.5 sm:top-4 left-6 right-6 h-0.5 bg-[#DED0B8] -z-0" />
            
            {/* Live Progress Line that Fills Smoothly on Scroll */}
            <div
              className="absolute top-3.5 sm:top-4 left-6 h-0.5 bg-[#15341C] transition-all duration-400 ease-out -z-0"
              style={{ width: `${(activeIndex / (totalSteps - 1)) * 96}%` }}
            />

            {/* Step Pills */}
            <div className="grid grid-cols-5 gap-1.5 sm:gap-2 relative z-10">
              {steps.map((step, idx) => {
                const isActive = activeIndex === idx;
                const isPassed = activeIndex > idx;
                return (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => scrollToStep(idx)}
                    className="flex flex-col items-center text-center group cursor-pointer focus-visible:outline-none"
                  >
                    <div
                      className={cn(
                        'w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-mono font-bold transition-all duration-300 shadow-2xs',
                        isActive
                          ? 'bg-[#15341C] text-white scale-110 ring-4 ring-[#15341C]/15 shadow-sm'
                          : isPassed
                          ? 'bg-[#2E5E35] text-white'
                          : 'bg-white border border-[#D5C09D] text-[#8C7A5A] group-hover:border-[#15341C]'
                      )}
                    >
                      {step.number}
                    </div>

                    <span
                      className={cn(
                        'mt-1 text-[9px] sm:text-[10px] font-mono uppercase tracking-wider font-semibold transition-colors',
                        isActive
                          ? 'text-[#15341C]'
                          : 'text-[#8C7A5A] group-hover:text-[#111613]'
                      )}
                    >
                      {step.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. SLIDING STEP SHOWCASE CARD (100% VISIBLE ON 100% SCREEN RATIO) */}
          <div className="relative w-full rounded-xl sm:rounded-2xl bg-white border border-[#DDD3BF] shadow-[0_10px_32px_rgba(17,22,19,0.06)] overflow-hidden">
            {/* Sliding Track: Moves smoothly as activeIndex changes on scroll */}
            <div
              className="flex transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform items-stretch"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {steps.map((step, idx) => (
                <div
                  key={step.number}
                  className={cn(
                    'w-full shrink-0 p-4 sm:p-6 lg:p-7 flex flex-col justify-center transition-opacity duration-300',
                    activeIndex === idx ? 'opacity-100' : 'opacity-35'
                  )}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
                    
                    {/* Left Column: Step Narrative & Deliverables (7 cols on lg) */}
                    <div className="lg:col-span-7 space-y-2 sm:space-y-2.5">
                      
                      {/* Step Number & Phase Badge */}
                      <div className="flex items-center gap-2.5">
                        <span className="font-serif text-2xl sm:text-3xl font-light text-[#15341C] tracking-tight">
                          {step.number}
                        </span>
                        <div className="h-4 w-px bg-[#D5C09D]" />
                        <span
                          className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.18em] text-[#8C7A5A] uppercase"
                          dangerouslySetInnerHTML={{ __html: step.phaseName }}
                        />
                      </div>

                      {/* Main Title */}
                      <h3 className="font-serif text-lg sm:text-xl lg:text-2xl font-normal text-[#111613] tracking-tight leading-snug">
                        {step.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="font-sans text-xs sm:text-[13px] font-medium text-[#7A6A4E]">
                        {step.subtitle}
                      </p>

                      {/* Narrative Description */}
                      <p className="font-sans text-xs sm:text-[13px] text-[#3C4A3E] leading-relaxed line-clamp-3">
                        {step.desc}
                      </p>

                      {/* Key Highlights Checklist (Compact & Clear) */}
                      <div className="space-y-1 pt-1.5 border-t border-[#EAE0CD]">
                        {step.highlights.map((item) => (
                          <div key={item} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#15341C] shrink-0" />
                            <span className="font-sans text-xs text-[#2E3B30] font-medium leading-tight">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Step Navigation Pill Indicator */}
                      <div className="pt-1.5 flex items-center gap-2 text-[11px] font-mono text-[#8C7A5A]">
                        <span className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#D5C09D] text-[10px] uppercase font-semibold text-[#15341C]">
                          Step {step.number} of {totalSteps}
                        </span>
                        <span className="hidden sm:inline-block text-[10px]">
                          Scroll down to slide to Step {idx < totalSteps - 1 ? steps[idx + 1].number : '01'}
                        </span>
                      </div>

                    </div>

                    {/* Right Column: High-Res Step Photography (5 cols on lg) */}
                    <div className="lg:col-span-5 flex items-center justify-center">
                      <div className="relative w-full aspect-[16/10] max-h-[190px] sm:max-h-[230px] lg:max-h-[260px] rounded-xl overflow-hidden border border-[#D5C09D] bg-[#EDE5D5] shadow-xs group">
                        <Image
                          src={step.image}
                          alt={step.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

                        {/* Top Step Badge */}
                        <div className="absolute top-2.5 left-2.5 z-10">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[9px] font-mono tracking-wider uppercase font-semibold">
                            <span>STEP {step.number}</span>
                            <span className="text-[#F2CF84]">&bull;</span>
                            <span>{step.label}</span>
                          </span>
                        </div>

                        {/* Bottom Caption Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-3 z-10 text-white space-y-0.5">
                          <p className="font-serif text-xs sm:text-sm font-normal text-[#FAF7F2] tracking-tight line-clamp-1">
                            {step.title}
                          </p>
                          <p className="font-sans text-[10px] text-[#D8E4DC] line-clamp-1">
                            {step.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. SCROLL PROMPT FOOTER BAR */}
          <div className="flex items-center justify-between shrink-0 pt-2 text-[10px] sm:text-[11px] font-mono text-[#8C7A5A]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#15341C] animate-pulse" />
              <span className="uppercase tracking-wider">Scroll page to slide steps</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span>Step {activeIndex + 1} of {totalSteps}</span>
              <ChevronDown className="w-3 h-3 text-[#15341C] animate-bounce" />
            </div>
          </div>

        </Container>
      </div>
    </section>
  );
}
