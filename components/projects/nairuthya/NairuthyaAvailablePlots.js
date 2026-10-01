'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { useEnquiry } from '@/context/EnquiryContext';
import { ArrowRight, CheckCircle2, CalendarCheck } from 'lucide-react';

/**
 * 10 — AVAILABLE PLOTS / ENQUIRY: Dedicated Compact Conversion Section
 * 
 * Strict Standards:
 * - Verified Parameters:
 *   - 9 plots currently available
 *   - Minimum plot size: 6,000 sq.ft
 *   - Price: ₹1,699 / sq.ft
 * - Warm neutral background (bg-[#FAF7F2]), avoiding repeated green blocks
 * - Compact vertical padding (py-10 sm:py-12 lg:py-14)
 * - Direct action triggering global EnquiryModal with 'Nairuthya Whispering Wood'
 */
export default function NairuthyaAvailablePlots({ project }) {
  const { openEnquiryModal } = useEnquiry();

  const handleEnquire = (e) => {
    openEnquiryModal(project?.enquiryInterest || 'Nairuthya Whispering Wood', e.currentTarget);
  };

  return (
    <section
      id="available-plots"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Available Plots and Enquiries"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10">
        
        {/* Main Conversion Frame */}
        <div className="relative rounded-2xl sm:rounded-3xl bg-white border border-[#DDD3BF] p-6 sm:p-8 lg:p-10 shadow-xs overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Narrative & Key Attributes (7 cols) */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <MotionReveal delay={0.05}>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#DDD3BF] text-[11px] font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
                  <span>LIMITED AVAILABILITY &bull; 9 PLOTS</span>
                </div>
              </MotionReveal>

              <MotionReveal delay={0.1}>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight leading-tight">
                  Reserve Your Farmland Plot at Nairuthya Whispering Wood
                </h2>
              </MotionReveal>

              <MotionReveal delay={0.15}>
                <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
                  Only 9 farmland plots remain available within this boutique 8-acre enclave in Honnasandra, Nelamangala. Every plot comes with registered legal title deeds and ongoing agronomic management by Earth Heritage.
                </p>
              </MotionReveal>

              {/* Core Assurances */}
              <MotionReveal delay={0.2}>
                <div className="pt-2 space-y-2 font-sans text-xs sm:text-[13px] text-[#3A473C]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#55C40D] shrink-0" />
                    <span>Clear, registered legal title deed for every individual plot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#55C40D] shrink-0" />
                    <span>Active plantation with Mahogany, Teak, Red Sandal, Coconut &amp; Fruit trees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#55C40D] shrink-0" />
                    <span>On-ground agricultural manpower and farm maintenance managed by Earth Heritage</span>
                  </div>
                </div>
              </MotionReveal>
            </div>

            {/* Right: Pricing & Plot Metrics Card (5 cols) */}
            <div className="lg:col-span-5">
              <MotionReveal delay={0.25}>
                <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF6F0] border border-[#DDD3BF] shadow-2xs space-y-5">
                  
                  {/* Pricing Box */}
                  <div className="space-y-0.5 pb-4 border-b border-[#E2D7C5]">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[#7A6A4E] block">
                      OFFICIAL RATE &bull; GROUND PRICE
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl sm:text-4xl font-normal text-[#111613]">
                        ₹1,699
                      </span>
                      <span className="font-sans text-xs text-[#5A685D]">
                        / sq.ft
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-[#E2D7C5]">
                      <span className="text-[#5A685D] uppercase text-[11px]">Minimum Plot Size</span>
                      <span className="text-[#111613] font-semibold">6,000 sq.ft</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#E2D7C5]">
                      <span className="text-[#5A685D] uppercase text-[11px]">Total Estate Area</span>
                      <span className="text-[#111613] font-semibold">8.0 Acres</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#E2D7C5]">
                      <span className="text-[#5A685D] uppercase text-[11px]">Current Availability</span>
                      <span className="text-[#1E460B] font-bold">9 Plots Open</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      type="button"
                      onClick={handleEnquire}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
                    >
                      <span>Enquire About Plots</span>
                      <ArrowRight className="w-3.5 h-3.5 text-inherit" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={handleEnquire}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-5 rounded-full bg-white hover:bg-[#F2ECE1] border border-[#DDD3BF] text-[#111613] font-sans font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                    >
                      <CalendarCheck className="w-3.5 h-3.5 text-[#55C40D]" />
                      <span>Schedule Estate Visit</span>
                    </button>
                  </div>

                  <p className="text-[10px] font-mono text-center text-[#7A8A7E] uppercase tracking-wider">
                    Direct corporate enquiry &bull; Earth Heritage Pvt Ltd
                  </p>

                </div>
              </MotionReveal>
            </div>

          </div>

        </div>

      </Container>
    </section>
  );
}
