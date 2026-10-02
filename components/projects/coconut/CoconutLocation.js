'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { MapPin, ExternalLink } from 'lucide-react';

/**
 * 05 — LOCATION & CONNECTIVITY
 * 
 * Styled directly after the master reference (Nairuthya Whispering Wood):
 * - Left side: Verified location details and environment description
 * - Right side: Official Google Map iframe embedding "Destiny coconut Garden by Destiny Promoters"
 * - Direct, reliable "Open in Google Maps" link opening the verified project pin
 */
export default function CoconutLocation({ project }) {
  const locationDetails = project?.locationDetails || {
    village: null,
    taluk: 'Bidadi',
    district: 'Ramanagara',
    state: 'Karnataka',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7785.265340472722!2d77.397198!3d12.672073!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5b0056537b67%3A0x776326ca88bf971c!2sDestiny%20coconut%20Garden%20by%20Destiny%20Promoters!5e0!3m2!1sen!2sin!4v1790916445325!5m2!1sen!2sin',
    mapShareUrl:
      'https://www.google.com/maps/place/Destiny+coconut+Garden+by+Destiny+Promoters/@12.672078,77.3946228,17z'
  };

  const googleMapsUrl =
    locationDetails.mapShareUrl ||
    'https://www.google.com/maps/place/Destiny+coconut+Garden+by+Destiny+Promoters/@12.672078,77.3946228,17z';

  const connectivityRows = [
    {
      label: 'PROJECT LOCATION',
      value: 'Bidadi, Karnataka',
      detail: 'Ramanagara District, Karnataka'
    },
    {
      label: 'NATURAL SURROUNDINGS',
      value: 'Green & Peaceful Environment',
      detail: 'Surrounded by nature and agricultural greenery'
    },
    {
      label: 'DESTINATION',
      value: 'Destiny Coconut Garden',
      detail: 'Accessible via Bidadi regional connectivity corridor'
    }
  ];

  return (
    <section
      id="location"
      data-navbar-theme="light"
      className="relative bg-[#FAF7F2] text-[#111613] py-7 sm:py-8 lg:py-10 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Location and Connectivity"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10 max-w-6xl px-5 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-5 sm:mb-6 space-y-1">
          <MotionReveal delay={0.05}>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#7A6A4E] font-semibold block">
              LOCATION &bull; CONNECTIVITY
            </span>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight">
              Location &amp; Connectivity
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.12}>
            <p className="font-serif text-base sm:text-lg text-[#1E460B] font-normal pt-0.5">
              Connected to Bidadi &amp; Greater Bengaluru.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed pt-0.5">
              Situated in the quiet, agrarian countryside of Bidadi—providing a peaceful rural setting with straightforward regional access.
            </p>
          </MotionReveal>
        </div>

        {/* 2-Column Main Composition: Information (Left) + Google Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Side — Project Location Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <MotionReveal delay={0.15}>
              <div className="divide-y divide-[#E2D7C5] border-y border-[#E2D7C5]">
                {connectivityRows.map((item, idx) => (
                  <div key={idx} className="py-2.5 sm:py-3 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D] shrink-0" aria-hidden="true" />
                      <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-[#7A6A4E] font-medium">
                        {item.label}
                      </span>
                    </div>
                    <div className="font-serif text-base sm:text-lg font-normal text-[#111613] tracking-tight pl-3.5">
                      {item.value}
                    </div>
                    <div className="font-sans text-xs text-[#5A685D] pl-3.5 leading-snug">
                      {item.detail}
                    </div>
                  </div>
                ))}
              </div>
            </MotionReveal>

            {/* Google Maps External Navigation Link Button */}
            <MotionReveal delay={0.2} className="pt-0.5">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#55C40D]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                </a>
                <span className="text-[10px] font-mono text-[#7A8A7E]">
                  Bidadi &bull; Verified Pin
                </span>
              </div>
            </MotionReveal>
          </div>

          {/* Right Side — Official Google Map Embed Area (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <MotionReveal delay={0.2} className="w-full">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#DDD3BF] bg-white p-2 shadow-xs flex flex-col">
                
                {/* Embedded Google Map Iframe with matching dimensions */}
                <div className="relative w-full h-[220px] sm:h-[250px] lg:h-[260px] rounded-xl overflow-hidden">
                  <iframe
                    src={locationDetails.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    className="w-full h-full border-0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    title="Destiny Coconut Garden by Destiny Promoters Google Map"
                  />
                </div>

                {/* Footer Bar with Verified Place Link */}
                <div className="pt-2 px-1 flex items-center justify-between text-[11px] font-mono text-[#7A6A4E] shrink-0">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
                    Verified Project Location &bull; Bidadi
                  </span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E460B] hover:text-[#55C40D] font-medium flex items-center gap-1 transition-colors"
                  >
                    Open Map Pin &rarr;
                  </a>
                </div>

              </div>
            </MotionReveal>
          </div>

        </div>

      </Container>
    </section>
  );
}
