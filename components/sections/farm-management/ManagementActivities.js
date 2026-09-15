'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { farmManagementData } from '@/data/farmManagementData';
import { farmManagementImages } from '@/data/farmManagementImages';

/**
 * Section 2 — What Farm Management Involves
 * 
 * Layout:
 * Left side: Large editorial anchor statement and operational context
 * Right side: Structured vertical timeline / sequence of the 6 management activities
 * featuring supporting image crops, numbers, green accents, and thin dividers.
 */
export default function ManagementActivities() {
  const { eyebrow, heading, supportingCopy, items } = farmManagementData.activities;
  const activityImages = farmManagementImages.activities;

  return (
    <section
      id="management-activities"
      className="relative bg-[#F0E0C6] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="What Farm Management Involves"
    >
      {/* Visible Organic Background Topographic Elevation Contours */}
      <LandContourPattern variant="biscuit-topography" className="opacity-90" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Anchored Editorial Narrative */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit space-y-6 sm:space-y-8">
            <MotionReveal delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>{eyebrow}</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#111613] leading-[1.12]">
                {heading}
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed">
                {supportingCopy}
              </p>
            </MotionReveal>

            {/* Guiding Principle Card */}
            <MotionReveal delay={0.35}>
              <div className="p-6 rounded-2xl bg-white/85 border border-[#D5C09D] shadow-[0_4px_20px_rgba(17,22,19,0.03)] backdrop-blur-xs">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E460B]">
                  Operational Principle
                </span>
                <p className="mt-2 font-serif text-lg sm:text-xl text-[#111613] italic font-normal">
                  “Farm management is not a single transaction. It is the steady coordination of skilled hands and seasonal care.”
                </p>
                <div className="mt-4 pt-3 border-t border-[#E6D8C3] flex items-center justify-between text-xs font-mono text-[#5E6960]">
                  <span>Earth Heritage Care</span>
                  <span className="w-2 h-2 rounded-full bg-[#55C40D]" />
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Progressive Vertical Editorial Timeline */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {items.map((item, idx) => {
              const img = activityImages.find((a) => a.number === item.number) || activityImages[idx];

              return (
                <MotionReveal key={item.id} delay={0.1 + idx * 0.05}>
                  <div className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-[#D5C09D] hover:border-[#1E460B]/60 transition-all duration-300 shadow-[0_4px_16px_rgba(17,22,19,0.03)] hover:shadow-[0_10px_30px_rgba(17,22,19,0.06)] group">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                      
                      {/* Photographic Supporting Thumbnail / Crop */}
                      {img && (
                        <div className="relative w-full sm:w-36 h-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-[#D5C09D] bg-[#E4D1B5]">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            sizes="(max-width: 640px) 100vw, 150px"
                            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors pointer-events-none" />
                          <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-[#111613]/80 text-[10px] font-mono text-white font-bold">
                            {item.number}
                          </span>
                        </div>
                      )}

                      {/* Text & Content Block */}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                            <span className="font-mono text-xs font-bold text-[#1E460B] tracking-wider uppercase">
                              Activity {item.number}
                            </span>
                          </div>
                        </div>

                        <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-[#111613] group-hover:text-[#1E460B] transition-colors">
                          {item.title}
                        </h3>

                        <p className="font-sans text-sm sm:text-[15px] font-medium text-[#2C362F] leading-relaxed">
                          {item.description}
                        </p>

                        <div className="pt-2 border-t border-[#E6D8C3]/70">
                          <p className="font-sans text-xs sm:text-[13px] text-[#5E6960] leading-relaxed">
                            {item.scope}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </MotionReveal>
              );
            })}
          </div>

        </div>
      </Container>
    </section>
  );
}
