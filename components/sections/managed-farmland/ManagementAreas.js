'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { managedFarmlandData } from '@/data/managedFarmlandData';
import { managedFarmlandImages } from '@/data/managedFarmlandImages';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Section 3 — What does Earth Heritage manage?
 * 
 * Architecture:
 * - Left column (~42%): Static editorial introduction.
 *   Eyebrow, title, supporting overview, and sequence chips remain visually stable.
 * - Right column (~58%): Premium scroll-driven stacked-card experience with horizontal
 *   right-to-left card entrances matching lp/managed-farmland ("What does caring for a farm really involve?").
 * - Card 01 begins in place. As the user scrolls, Card 02 slides in from right-to-left over Card 01,
 *   followed progressively by Cards 03, 04, 05, and 06.
 * - Previous cards subtly recede behind the active top card with slight scale and offset.
 * - Mobile & Reduced Motion: Natural vertical storytelling stack prioritizing readability.
 */
export default function ManagementAreas() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeStage, setActiveStage] = useState(0);

  const { eyebrow, heading, intro, items } = managedFarmlandData.managementAreas;
  const stages = managedFarmlandImages.managementStages;

  useEffect(() => {
    // Respect prefers-reduced-motion: disable scroll-triggered stacking
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Apply scroll-driven stacking ONLY on desktop (>= 1024px)
      mm.add('(min-width: 1024px)', () => {
        const cards = cardsRef.current.filter(Boolean);
        if (cards.length < 2) return;

        // Card 1 starts initially fully visible in its normal position
        gsap.set(cards[0], {
          xPercent: 0,
          x: 0,
          y: 0,
          scale: 1,
          transformOrigin: 'left center',
          zIndex: 10,
          force3D: true
        });

        // Cards 2 through 6 start outside visible card area on the RIGHT
        for (let i = 1; i < cards.length; i++) {
          gsap.set(cards[i], {
            xPercent: 115,
            x: 0,
            y: 0,
            scale: 1,
            transformOrigin: 'left center',
            zIndex: (i + 1) * 10,
            force3D: true
          });
        }

        // Pinned scrub timeline with horizontal right-to-left card entrances and full-view reading intervals
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top+=65',
            end: '+=2400',
            pin: true,
            scrub: 0.25,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // Calculate which card is currently active (0 to 5)
              const progress = self.progress;
              const stageIdx = Math.min(cards.length - 1, Math.floor(progress * cards.length));
              setActiveStage(stageIdx);
            }
          }
        });

        const transitionDuration = 2.5;
        const pauseDuration = 1.5;
        let currentTime = pauseDuration; // Card 1 stable reading period

        for (let i = 1; i < cards.length; i++) {
          const incomingCard = cards[i];

          // Incoming card slides horizontally from RIGHT -> LEFT over the stack
          tl.to(
            incomingCard,
            {
              xPercent: 0,
              x: 0,
              y: 0,
              scale: 1,
              duration: transitionDuration,
              ease: 'none',
              force3D: true
            },
            currentTime
          );

          // All preceding cards recede subtly to create the physical layered card stack
          for (let j = 0; j < i; j++) {
            const prevCard = cards[j];
            const stackDepth = i - j;
            const targetScale = Math.max(0.93, 1 - stackDepth * 0.015);
            const targetX = -stackDepth * 8;

            tl.to(
              prevCard,
              {
                x: targetX,
                scale: targetScale,
                duration: transitionDuration,
                ease: 'none',
                force3D: true
              },
              currentTime
            );
          }

          currentTime += transitionDuration + pauseDuration;
        }

        // Final hold period so Card 06 remains fully visible before unpinning
        tl.to({}, { duration: 1.0 }, currentTime);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="w-full overflow-x-clip">
      <section
        id="management-scope"
        className="relative bg-[#F0E0C6] text-[#111613] py-6 sm:py-8 lg:py-4 xl:py-5 border-b border-[#DCCDB7] overflow-x-clip"
        aria-label="What Earth Heritage Manages"
      >
        {/* Visible Organic Background Cultivation Furrows */}
        <LandContourPattern variant="biscuit-cultivation" className="opacity-90 pointer-events-none" />

        <Container size="default" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-8 xl:gap-12 items-start">
            
            {/* ========================================================== */}
            {/* LEFT COLUMN: STATIC EDITORIAL INTRODUCTION                 */}
            {/* ========================================================== */}
            <div className="lg:col-span-5 space-y-3 sm:space-y-4 lg:space-y-3 xl:space-y-4">
              <div className="space-y-2 sm:space-y-2.5 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  <span>{eyebrow}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[40px] font-normal tracking-tight text-[#111613] leading-[1.15]">
                  {heading}
                </h2>

                <p className="font-sans text-xs sm:text-sm lg:text-[13px] xl:text-sm text-[#38423A] leading-relaxed">
                  {intro}
                </p>
              </div>

              {/* Permanent Editorial Anchor: Management Stages Overview */}
              <div className="pt-2.5 sm:pt-3.5 border-t border-[#DECFC0] space-y-2 sm:space-y-2.5 max-w-lg">
                <span className="font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#1E460B] font-bold block">
                  Structured Operational Sequence
                </span>

                <p className="font-sans text-[11px] sm:text-xs text-[#38423A] leading-relaxed">
                  Farmland thrives through disciplined continuity. Rather than ad-hoc tasks, Earth Heritage organizes care into agreed phases to coordinate farm operations, maintenance, and harvest activities.
                </p>

                {/* Sequence Stage Markers */}
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-xs font-mono">
                  {items.map((item, idx) => {
                    const isActive = activeStage === idx;
                    return (
                      <span
                        key={item.number}
                        className={cn(
                          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all duration-300 font-medium text-[11px] sm:text-xs',
                          isActive
                            ? 'bg-[#1E460B] text-[#FAF6F0] border-[#1E460B] shadow-xs scale-[1.02]'
                            : 'bg-[#EBDBC2]/90 text-[#1E460B] border-[#D5C2A4]'
                        )}
                      >
                        <span
                          className={cn(
                            'w-1.5 h-1.5 rounded-full transition-colors',
                            isActive ? 'bg-[#55C40D]' : 'bg-[#1E460B]'
                          )}
                        />
                        <span>Stage {item.number} &bull; {item.title}</span>
                      </span>
                    );
                  })}
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
                  // Viewport-aware container height: dynamically fits between 410px and 500px (xl: 520px)
                  'lg:h-[clamp(410px,calc(100dvh-125px),500px)] xl:h-[clamp(430px,calc(100dvh-130px),520px)]',
                  'flex flex-col space-y-6 lg:space-y-0'
                )}
              >
                {items.map((item, idx) => {
                  const stageImage = stages.find((s) => s.stage === item.number) || stages[idx];

                  return (
                    <div
                      key={item.id}
                      ref={(el) => (cardsRef.current[idx] = el)}
                      className={cn(
                        'w-full rounded-2xl overflow-hidden',
                        'bg-[#FAF6F0] border border-[#D8C7AD]',
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
                          <path d="M-20 80 C120 40, 240 160, 520 70" stroke="#1E460B" strokeWidth="1.5" />
                          <path d="M-40 180 C160 120, 280 260, 540 150" stroke="#1E460B" strokeWidth="1.5" />
                          <path d="M-10 280 C180 220, 260 350, 530 250" stroke="#1E460B" strokeWidth="1.5" />
                          <path d="M-30 380 C130 320, 310 440, 550 350" stroke="#1E460B" strokeWidth="1.5" />
                        </svg>
                      </div>

                      {/* Card Header: Sequence Pill + Protocol Tag */}
                      <div className="relative z-10 flex items-center justify-between pb-2 sm:pb-2.5 border-b border-[#DECFC0] flex-shrink-0">
                        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 sm:py-1 rounded-full bg-[#EBDBC2] border border-[#D5C2A4]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
                          <span className="font-mono text-xs font-bold tracking-widest text-[#1E460B] uppercase">
                            STAGE {item.number}
                          </span>
                        </div>

                        <span className="text-[11px] font-mono uppercase tracking-widest text-[#5E6960] font-medium">
                          Stage {item.number} of 06 &bull; Operational Scope
                        </span>
                      </div>

                      {/* Card Title & Editorial Statement */}
                      <div className="relative z-10 space-y-1 my-1.5 sm:my-2 lg:my-1.5 xl:my-2 flex-shrink-0">
                        <h3 className="font-serif text-xl sm:text-2xl lg:text-xl xl:text-2xl font-normal tracking-tight text-[#111613] leading-snug">
                          {item.title}
                        </h3>

                        <p className="font-sans text-xs sm:text-sm text-[#38423A] leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      </div>

                      {/* Large High-Resolution Image (The Visual Hero) */}
                      <div className="relative z-10 w-full flex-1 min-h-[120px] max-h-[225px] rounded-xl overflow-hidden border border-[#D8C7AD]/70 shadow-2xs my-1 sm:my-1.5 bg-[#E4D1B5]">
                        {stageImage && (
                          <Image
                            src={stageImage.src}
                            alt={stageImage.alt || item.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            priority={idx === 0}
                            className="object-cover object-center"
                          />
                        )}

                        {/* Subtle bottom gradient to protect photographic depth */}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none"
                          aria-hidden="true"
                        />
                      </div>

                      {/* Card Detail Information */}
                      <div className="relative z-10 pt-2 border-t border-[#DECFC0] flex-shrink-0">
                        <p className="font-sans text-[11px] sm:text-xs text-[#5E6960] leading-relaxed line-clamp-2">
                          {item.details}
                        </p>
                      </div>

                      {/* Card Footer: Metadata Sign-off */}
                      <div className="relative z-10 flex items-center justify-between pt-2 border-t border-[#DECFC0]/60 text-[11px] font-mono text-[#6A786D] mt-auto flex-shrink-0">
                        <span>Earth Heritage Management</span>
                        <span className="text-[#1E460B] font-semibold">
                          Continuous Stewardship
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
