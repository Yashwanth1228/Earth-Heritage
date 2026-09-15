'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { managedFarmlandData } from '@/data/managedFarmlandData';
import { managedFarmlandImages } from '@/data/managedFarmlandImages';

/**
 * Section 3 — What does Earth Heritage manage?
 * 
 * Editorial visual sequence of 6 management responsibilities:
 * 01 People & Manpower
 * 02 Crop Planning
 * 03 Cultivation
 * 04 Farm Maintenance
 * 05 Day-to-Day Operations
 * 06 Harvest Management
 * 
 * Designed as a visual sequence featuring curated photography,
 * disciplined numbering, and clear editorial hierarchy.
 */
export default function ManagementAreas() {
  const { eyebrow, heading, intro, items } = managedFarmlandData.managementAreas;
  const stages = managedFarmlandImages.managementStages;

  return (
    <section
      id="management-scope"
      className="relative bg-[#F0E0C6] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="What Earth Heritage Manages"
    >
      {/* Visible Organic Background Cultivation Furrows */}
      <LandContourPattern variant="biscuit-cultivation" className="opacity-90" />

      <Container size="default" className="relative z-10">
        {/* Centered Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase mb-5 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{eyebrow}</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-normal tracking-tight text-[#111613] leading-[1.12]">
              {heading}
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.25}>
            <p className="mt-5 font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed max-w-2xl mx-auto">
              {intro}
            </p>
          </MotionReveal>
        </div>

        {/* Editorial Visual Sequence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((item, idx) => {
            const stageImage = stages.find((s) => s.stage === item.number) || stages[idx];

            return (
              <MotionReveal key={item.id} delay={0.1 + idx * 0.06}>
                <div className="group h-full flex flex-col rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#D5C09D] hover:border-[#1E460B]/70 transition-all duration-300 shadow-[0_4px_16px_rgba(17,22,19,0.04)] hover:shadow-[0_12px_32px_rgba(17,22,19,0.08)]">
                  
                  {/* Visual Image Header */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#E4D1B5]">
                    {stageImage && (
                      <Image
                        src={stageImage.src}
                        alt={stageImage.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
                    
                    {/* Stage Number Badge */}
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#111613]/85 backdrop-blur-xs border border-white/20 text-xs font-mono font-bold text-white tracking-widest">
                      {item.number}
                    </div>
                  </div>

                  {/* Editorial Copy Body */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#1E460B]">
                          Management Activity
                        </span>
                      </div>
                      <h3 className="font-sans text-lg sm:text-xl font-bold tracking-tight text-[#111613] group-hover:text-[#1E460B] transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 font-sans text-sm sm:text-[15px] font-medium text-[#2C362F] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[#E6D8C3]">
                      <p className="font-sans text-xs sm:text-[13px] text-[#5E6960] leading-relaxed">
                        {item.details}
                      </p>
                    </div>
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
