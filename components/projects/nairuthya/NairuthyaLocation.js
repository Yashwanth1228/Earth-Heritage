'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { MapPin, Navigation, ExternalLink, Compass } from 'lucide-react';

/**
 * 07 — LOCATION & CONNECTIVITY: Verified Location Presentation
 * 
 * Strict Standards:
 * - Verified details:
 *   - Honnasandra, Nelamangala Taluk, Karnataka
 *   - ~35 km from Bengaluru
 *   - ~8 km from Nelamangala town
 * - Zero invented driving times or route claims
 * - Zero unverified infrastructure claims (no airport/STRR/highway claims)
 * - Elegant, high-readability map container with clean external link
 */
export default function NairuthyaLocation({ project }) {
  const locationDetails = project?.locationDetails || {
    village: 'Honnasandra',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    distanceBengaluru: '35 km from Bengaluru',
    distanceNelamangala: '8 km from Nelamangala',
    mapQuery: 'Honnasandra, Nelamangala, Karnataka'
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    locationDetails.mapQuery || 'Honnasandra, Nelamangala, Karnataka'
  )}`;

  return (
    <section
      id="location"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Location and Connectivity"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 space-y-2">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-[#7A6A4E] uppercase">
              <Compass className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
              <span>GEOGRAPHY &bull; ACCESSIBILITY</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight">
              Location &amp; Connectivity
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
              Situated in the quiet, agrarian countryside of Honnasandra, Nelamangala Taluk—providing a peaceful rural setting with straightforward connectivity to Bengaluru.
            </p>
          </MotionReveal>
        </div>

        {/* 2-Column Location & Map Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* Left Column: Geographic Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <MotionReveal delay={0.15}>
              <div className="space-y-4">
                
                {/* Primary Address Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#DDD3BF] shadow-2xs space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#15341C] text-[#FAF7F2] flex items-center justify-center shrink-0 shadow-2xs">
                      <MapPin className="w-4 h-4 text-[#55C40D]" aria-hidden="true" />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[#7A6A4E] font-semibold block">
                        ESTATE LOCATION
                      </span>
                      <h3 className="font-serif text-lg font-normal text-[#111613]">
                        Honnasandra, Nelamangala
                      </h3>
                    </div>
                  </div>
                  <p className="font-sans text-xs text-[#4E5C50] leading-relaxed pt-2 border-t border-[#EFE5D5]">
                    Nelamangala Taluk, Bengaluru Rural District, Karnataka.
                  </p>
                </div>

                {/* Distance Specification Strip */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#DDD3BF] space-y-0.5">
                    <span className="font-mono text-[10px] uppercase text-[#7A8A7E] tracking-wider block">
                      Distance to City
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                      ~35 km
                    </span>
                    <span className="font-sans text-[11px] text-[#5A685D] block">
                      from Bengaluru
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#DDD3BF] space-y-0.5">
                    <span className="font-mono text-[10px] uppercase text-[#7A8A7E] tracking-wider block">
                      Nearest Town
                    </span>
                    <span className="font-serif text-xl sm:text-2xl font-normal text-[#111613]">
                      ~8 km
                    </span>
                    <span className="font-sans text-[11px] text-[#5A685D] block">
                      from Nelamangala
                    </span>
                  </div>
                </div>

                {/* Regional Characteristic Notes */}
                <div className="p-4 rounded-xl bg-[#EFE7DA] border border-[#DECDB3] space-y-1">
                  <h4 className="font-serif text-xs sm:text-sm font-medium text-[#15341C] flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#15341C]" />
                    <span>Agronomic Regional Setting</span>
                  </h4>
                  <p className="font-sans text-xs text-[#4E5C50] leading-relaxed">
                    Honnasandra offers a fertile, well-drained agricultural landscape surrounded by established coconut groves and agrarian farms, away from dense industrial corridors.
                  </p>
                </div>

              </div>
            </MotionReveal>

            {/* External Navigation Link Button */}
            <MotionReveal delay={0.25}>
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] font-sans font-semibold text-xs tracking-wider uppercase transition-colors shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
              >
                <span>Open Location in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
              </a>
            </MotionReveal>
          </div>

          {/* Right Column: Google Maps Embed (7 cols) */}
          <div className="lg:col-span-7">
            <MotionReveal delay={0.2} className="h-full">
              <div className="w-full h-full min-h-[300px] sm:min-h-[360px] rounded-2xl overflow-hidden border border-[#DDD3BF] shadow-xs bg-[#EFECE6] relative flex flex-col">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62174.19502747167!2d77.34000000000002!3d13.100000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae25164f89d3eb%3A0xcda6502251ee2bc9!2sNelamangala%20Town%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1789637400000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Nairuthya Whispering Wood Location Region — Honnasandra, Nelamangala"
                  className="w-full h-full min-h-[260px] flex-1 block"
                />

                <div className="p-3 bg-white border-t border-[#EAE0CD] flex items-center justify-between text-xs font-mono text-[#5A685D]">
                  <span>Honnasandra &bull; Nelamangala Taluk</span>
                  <span className="text-[#1E460B] font-semibold">Bengaluru Rural</span>
                </div>
              </div>
            </MotionReveal>
          </div>

        </div>
      </Container>
    </section>
  );
}
