'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { managedFarmlandData } from '@/data/managedFarmlandData';
import { Check } from 'lucide-react';

/**
 * Section 4 — Why Managed Farmland?
 * 
 * Heading:
 * "Owning farmland is one thing. Caring for it consistently is another."
 * 
 * Visual Split:
 * High-contrast architectural dual comparison:
 * Left: LAND OWNERSHIP (What you retain as the landowner)
 * Right: FARM MANAGEMENT (What Earth Heritage coordinates for you)
 */
export default function WhyManagedFarmland() {
  const { eyebrow, heading, supportingCopy, resolution, split } =
    managedFarmlandData.whyManagedFarmland;

  return (
    <section
      id="why-managed-farmland"
      className="relative bg-[#FAF6F0] text-[#111613] pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 border-b border-[#DCCDB7] overflow-hidden"
      aria-label="Why Managed Farmland"
    >
      {/* Visible Organic Background Topographic Elevation Loops */}
      <LandContourPattern variant="biscuit-topography" className="opacity-90" />

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
              {supportingCopy}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.3}>
            <div className="mt-6 inline-block px-5 py-2.5 rounded-xl bg-[#EAD5B5]/60 border border-[#D5C09D] text-sm sm:text-base font-sans font-medium text-[#1E460B]">
              {resolution}
            </div>
          </MotionReveal>
        </div>

        {/* Strong Visual Split: Ownership vs Management */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          
          {/* Panel 1: Land Ownership */}
          <MotionReveal delay={0.2}>
            <div className="h-full rounded-2xl sm:rounded-3xl p-8 sm:p-10 bg-white/90 border border-[#D5C09D] shadow-[0_8px_30px_rgba(17,22,19,0.05)] flex flex-col justify-between backdrop-blur-xs relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#EAD5B5]/30 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />
              
              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-[#E6D8C3]">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#1E460B] uppercase">
                    01 · THE LANDOWNER
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#EAD5B5] text-[#1E460B] text-xs font-mono font-semibold">
                    YOUR TITLE
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight">
                  {split.ownership.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-[#5E6960] font-medium">
                  {split.ownership.subtitle}
                </p>

                <ul className="mt-8 space-y-4">
                  {split.ownership.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1E460B]/10 text-[#1E460B] shrink-0 mt-0.5 border border-[#1E460B]/20">
                        <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />
                      </span>
                      <span className="font-sans text-sm sm:text-[15px] text-[#2C362F] leading-relaxed">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-5 border-t border-[#E6D8C3] text-xs font-mono uppercase tracking-wider text-[#5E6960]">
                Protected & Registered In Your Name
              </div>
            </div>
          </MotionReveal>

          {/* Panel 2: Farm Management */}
          <MotionReveal delay={0.28}>
            <div className="h-full rounded-2xl sm:rounded-3xl p-8 sm:p-10 bg-[linear-gradient(145deg,#133019_0%,#1B4122_50%,#102B16_100%)] text-[#FAF6F0] border border-[#2B5E34] shadow-[0_12px_40px_rgba(19,48,25,0.22)] flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#55C40D]/15 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12" />
              
              <div>
                <div className="flex items-center justify-between pb-5 mb-6 border-b border-white/15">
                  <span className="font-mono text-xs font-bold tracking-widest text-[#55C40D] uppercase">
                    02 · EARTH HERITAGE
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-semibold border border-white/20">
                    OUR CARE
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
                  {split.management.title}
                </h3>
                <p className="mt-2 font-sans text-sm text-white/70 font-medium">
                  {split.management.subtitle}
                </p>

                <ul className="mt-8 space-y-4">
                  {split.management.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3.5">
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#55C40D]/20 text-[#55C40D] shrink-0 mt-0.5 border border-[#55C40D]/40">
                        <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />
                      </span>
                      <span className="font-sans text-sm sm:text-[15px] text-[#E8F0EA] leading-relaxed">
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 pt-5 border-t border-white/15 text-xs font-mono uppercase tracking-wider text-[#A8C7AF]">
                Systematic On-Ground Operational Oversight
              </div>
            </div>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
