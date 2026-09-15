'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { farmManagementData } from '@/data/farmManagementData';
import { farmManagementImages } from '@/data/farmManagementImages';
import { Check } from 'lucide-react';

/**
 * Section 4 — People + Land
 * 
 * Label: "PEOPLE • PLANNING • CARE"
 * Heading: "Management connects people with the land."
 * Copy: "Behind every managed farm are people, planning and consistent attention..."
 * Split layout with authentic field photography.
 */
export default function PeopleAndLand() {
  const { label, eyebrow, heading, supportingCopy, points } =
    farmManagementData.peopleAndLand;

  return (
    <section
      id="people-and-land"
      className="relative bg-[#FAF6F0] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="People and Land"
    >
      {/* Visible Organic Background Topographic Curves */}
      <LandContourPattern variant="biscuit-topography" className="opacity-90" />

      <Container size="default" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Authentic Photography */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <MotionReveal delay={0.15}>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5C09D] shadow-[0_16px_40px_rgba(17,22,19,0.08)] bg-[#E4D1B5] aspect-[4/3] sm:aspect-[16/11]">
                <Image
                  src={farmManagementImages.peopleAndLand.src}
                  alt={farmManagementImages.peopleAndLand.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1.5 rounded-md bg-[#111613]/80 backdrop-blur-md border border-white/15 text-[11px] font-mono tracking-wider text-white/95 uppercase">
                    On-Ground Field Coordination
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#55C40D] animate-pulse" />
                </div>
              </div>
            </MotionReveal>
          </div>

          {/* Right Column: Editorial Narrative & Principles */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 sm:space-y-8">
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

            {/* Editorial Highlight Points */}
            <div className="pt-2 space-y-4 sm:space-y-5 border-t border-[#E6D8C3]">
              {points.map((pt, idx) => (
                <MotionReveal key={pt.title} delay={0.3 + idx * 0.08}>
                  <div className="flex items-start gap-3.5">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1E460B]/10 text-[#1E460B] shrink-0 mt-1 border border-[#1E460B]/20">
                      <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-sans text-base sm:text-lg font-bold text-[#111613]">
                        {pt.title}
                      </h3>
                      <p className="mt-1 font-sans text-sm sm:text-[15px] text-[#5E6960] leading-relaxed">
                        {pt.description}
                      </p>
                    </div>
                  </div>
                </MotionReveal>
              ))}
            </div>

            {/* Small Editorial Badge */}
            <MotionReveal delay={0.4}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-[#EAD5B5]/50 border border-[#D5C09D] text-xs font-mono text-[#1E460B] tracking-wider uppercase font-semibold">
                {label}
              </div>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
