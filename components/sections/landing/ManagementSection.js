'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import SectionWrapper from '@/components/sections/SectionWrapper';
import { Subtitle } from '@/components/ui/Typography';
import { landingImages } from '@/data/landingImages';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * 5. ManagementSection — "What does caring for a farm really involve?"
 * 
 * Architecture:
 * - Left column (~40%): Permanent static editorial introduction.
 *   Heading and supporting copy remain visually stable and NEVER change per card.
 * - Right column (~60%): Premium scroll-driven stacked-card experience.
 *   Card 01 begins in place; scrolling progressively drives Card 02 up to stack over Card 01,
 *   and further scrolling drives Card 03 up to stack over Card 02.
 * - Previous cards remain subtly visible behind the active top card with slight scale and vertical offset.
 * - Mobile & Reduced Motion: Natural vertical storytelling stack prioritizing readability.
 */
export default function ManagementSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const cards = landingImages.managementCards;

  useEffect(() => {
    // Respect prefers-reduced-motion: disable scroll-triggered stacking
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Apply scroll-driven stacking ONLY on desktop (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        const card1 = cardsRef.current[0];
        const card2 = cardsRef.current[1];
        const card3 = cardsRef.current[2];

        if (!card1 || !card2 || !card3) return;

        // Establish initial states for cards with explicit deterministic z-index
        // Card 1 starts initially fully visible in its normal position
        gsap.set(card1, {
          xPercent: 0,
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: 'left center',
          zIndex: 10,
          force3D: true
        });

        // Card 2 starts outside visible card area on the RIGHT
        gsap.set(card2, {
          xPercent: 115,
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: 'left center',
          zIndex: 20,
          force3D: true
        });

        // Card 3 starts outside visible card area on the RIGHT
        gsap.set(card3, {
          xPercent: 115,
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: 'left center',
          zIndex: 30,
          force3D: true
        });

        // Compact pinned scrub timeline structured into 6 distinct phases
        // with horizontal right-to-left card entrances and dedicated full-view periods
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top+=65',
            end: '+=900',
            pin: true,
            scrub: 0.25,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        // -------------------------------------------------------------
        // PHASE 1 & 2: Card 01 stable full-view period (t = 0.0 -> 2.0)
        // Card 01 remains 100% visible and completely stationary
        // Card 02 waits off-screen to the right
        // -------------------------------------------------------------
        // (Timeline advances during this interval without moving any cards)

        // -------------------------------------------------------------
        // PHASE 3: Card 02 slides in horizontally from RIGHT -> LEFT (t = 2.0 -> 4.5)
        // Card 02 glides from xPercent: 115 to 0 and settles on top of Card 01
        // Card 01 recedes subtly underneath (scale: 0.985, x: -8) retaining full appearance
        // -------------------------------------------------------------
        tl.to(card2, {
          xPercent: 0,
          x: 0,
          y: 0,
          scale: 1,
          duration: 2.5,
          ease: 'none',
          force3D: true
        }, 2.0);

        tl.to(card1, {
          x: -8,
          scale: 0.985,
          duration: 2.5,
          ease: 'none',
          force3D: true
        }, 2.0);

        // -------------------------------------------------------------
        // PHASE 4: Card 02 stable full-view reading period (t = 4.5 -> 6.5)
        // Card 02 remains 100% visible and completely stationary on top
        // Card 03 waits off-screen to the right
        // -------------------------------------------------------------
        // (Timeline advances during this interval without moving any cards)

        // -------------------------------------------------------------
        // PHASE 5: Card 03 slides in horizontally from RIGHT -> LEFT (t = 6.5 -> 9.0)
        // Card 03 glides from xPercent: 115 to 0 and settles on top of Card 02
        // Card 02 recedes to scale: 0.985, x: -8; Card 01 recedes to scale: 0.97, x: -16
        // Previous cards remain visually present underneath without fading to black
        // -------------------------------------------------------------
        tl.to(card3, {
          xPercent: 0,
          x: 0,
          y: 0,
          scale: 1,
          duration: 2.5,
          ease: 'none',
          force3D: true
        }, 6.5);

        tl.to(card2, {
          x: -8,
          scale: 0.985,
          duration: 2.5,
          ease: 'none',
          force3D: true
        }, 6.5);

        tl.to(card1, {
          x: -16,
          scale: 0.97,
          duration: 2.5,
          ease: 'none',
          force3D: true
        }, 6.5);

        // -------------------------------------------------------------
        // PHASE 6: Card 03 stable full-view period (t = 9.0 -> 10.0)
        // Card 03 remains 100% visible at active stacked position
        // Pinned section completes naturally and smoothly continues scroll
        // -------------------------------------------------------------
        tl.to({}, { duration: 1.0 }, 9.0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full overflow-x-clip">
      <SectionWrapper
        id="management-sequence"
        padding="none"
        className="bg-background-biscuit border-b border-border-subtle overflow-x-clip py-4 sm:py-6 lg:py-3 xl:py-4"
        pattern={<LandContourPattern variant="biscuit-organic-flow" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-12 items-start">
          {/* ========================================================== */}
          {/* LEFT COLUMN: STATIC EDITORIAL INTRODUCTION                 */}
          {/* ========================================================== */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4 lg:space-y-3 xl:space-y-5">
            <div className="space-y-2 sm:space-y-2.5 max-w-lg">
              <Subtitle>Operational Depth</Subtitle>

              <h2 className="font-sans text-2xl sm:text-3xl lg:text-[32px] xl:text-[38px] font-medium tracking-tight text-text-primary leading-tight">
                What does caring for a farm really involve?
              </h2>

              <p className="font-sans text-xs sm:text-sm lg:text-[13px] xl:text-sm text-text-secondary leading-relaxed">
                Professional farm management involves multiple stages of caring for and operating farmland — from strategic crop planning to day-to-day stewardship and harvest coordination.
              </p>
            </div>

            {/* Permanent Editorial Anchor: Management Stages Overview */}
            <div className="pt-2.5 sm:pt-3.5 border-t border-[#DECFC0] space-y-2 sm:space-y-2.5 max-w-lg">
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#1e460b] font-bold block">
                Structured Operational Sequence
              </span>

              <p className="font-sans text-[11px] sm:text-xs text-text-secondary leading-relaxed">
                Farmland thrives through disciplined continuity. Rather than ad-hoc tasks, Earth Heritage organizes care into agreed phases to coordinate farm operations, maintenance, and harvest activities.
              </p>

              {/* Sequence Markers */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-0.5 text-xs font-mono text-[#1e460b]">
                {cards.map((c) => (
                  <span
                    key={c.number}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBDBC2] border border-[#D5C2A4] font-medium text-[11px] sm:text-xs"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e460b]" />
                    <span>Phase {c.number} &bull; {c.title}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT COLUMN: SCROLL-DRIVEN STACKED CARDS                  */}
          {/* ========================================================== */}
          <div className="lg:col-span-7 w-full">
            <div
              ref={containerRef}
              className={cn(
                'relative w-full max-w-xl lg:max-w-none mx-auto',
                // Responsive viewport-aware container height: dynamically fits between 380px and 485px (xl: 505px)
                // ensuring the complete card fits at 100%, 90%, 110% zoom on any desktop display (1366x768 to 1920x1080)
                'lg:h-[clamp(380px,calc(100dvh-115px),485px)] xl:h-[clamp(400px,calc(100dvh-125px),505px)]',
                'flex flex-col space-y-6 lg:space-y-0'
              )}
            >
              {cards.map((card, idx) => (
                <div
                  key={card.id}
                  ref={(el) => (cardsRef.current[idx] = el)}
                  className={cn(
                    'w-full rounded-2xl overflow-hidden',
                    'bg-[#FAF5EC] border border-[#D8C7AD]',
                    'shadow-[0_12px_32px_rgba(30,70,11,0.08)]',
                    'p-4 sm:p-5 lg:p-4 xl:p-5',
                    'flex flex-col justify-between',
                    // On desktop, cards occupy the absolute container stack with 100% of container height
                    'lg:absolute lg:inset-0 lg:h-full',
                    'lg:will-change-transform',
                    // On mobile, height is natural
                    'h-auto min-h-[420px]'
                  )}
                  style={{
                    zIndex: (idx + 1) * 10
                  }}
                >
                  {/* Subtle Background Topographic Watermark */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06] overflow-hidden"
                    aria-hidden="true"
                  >
                    <svg
                      className="w-full h-full object-cover"
                      viewBox="0 0 500 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M-20 80 C120 40, 240 160, 520 70" stroke="#1e460b" strokeWidth="1.5" />
                      <path d="M-40 180 C160 120, 280 260, 540 150" stroke="#1e460b" strokeWidth="1.5" />
                      <path d="M-10 280 C180 220, 260 350, 530 250" stroke="#1e460b" strokeWidth="1.5" />
                      <path d="M-30 380 C130 320, 310 440, 550 350" stroke="#1e460b" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Card Header: Sequence Pill + Protocol Tag */}
                  <div className="relative z-10 flex items-center justify-between pb-2 sm:pb-2.5 border-b border-[#DECFC0] flex-shrink-0">
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#EBDBC2] border border-[#D5C2A4]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1e460b]" />
                      <span className="font-mono text-xs font-bold tracking-widest text-[#1e460b] uppercase">
                        {card.number}
                      </span>
                    </div>

                    <span className="text-[11px] font-mono uppercase tracking-widest text-text-muted font-medium">
                      Stage {card.number} of 03 &bull; Protocol
                    </span>
                  </div>

                  {/* Card Title & Editorial Statement / Quote */}
                  <div className="relative z-10 space-y-1 my-1.5 sm:my-2 lg:my-1.5 xl:my-2 flex-shrink-0">
                    <h3 className="font-sans text-xl sm:text-2xl lg:text-xl xl:text-2xl font-medium tracking-tight text-[#111613] leading-snug">
                      {card.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-text-secondary leading-relaxed font-normal line-clamp-2">
                      {card.quote}
                    </p>
                  </div>

                  {/* Large High-Resolution Image (The Visual Hero) */}
                  <div className="relative z-10 w-full flex-1 min-h-[110px] max-h-[235px] rounded-xl overflow-hidden border border-[#D8C7AD]/70 shadow-sm my-1 sm:my-1.5">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={idx === 0}
                      className="object-cover object-center"
                    />

                    {/* Subtle bottom gradient to protect photographic depth */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Card Footer: Metadata Sign-off */}
                  <div className="relative z-10 flex items-center justify-between pt-2 sm:pt-2.5 border-t border-[#DECFC0] text-[11px] sm:text-xs font-mono text-text-muted mt-auto flex-shrink-0">
                    <span>Earth Heritage Management</span>
                    <span className="text-[#1e460b] font-medium">
                      Continuous Stewardship
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
