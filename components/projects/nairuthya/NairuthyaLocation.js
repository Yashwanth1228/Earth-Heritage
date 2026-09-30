'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { MapPin, ExternalLink } from 'lucide-react';

/**
 * 05 — LOCATION & CONNECTIVITY
 * 
 * Clean, editorial location presentation featuring:
 * - Left side: Confirmed distances (Bengaluru ~35 km, Nelamangala ~8 km) and project location
 * - Right side: Official Google Map iframe embedding "Whispering Wood by Nairuthya Properties"
 * - Bottom strip: Regional connectivity corridors (Bengaluru, Nelamangala, Tumkur Road, STRR)
 * - Direct, reliable "Open in Google Maps" link opening the exact project pin
 */
export default function NairuthyaLocation({ project }) {
  const locationDetails = project?.locationDetails || {
    village: 'Honnasandra',
    taluk: 'Nelamangala',
    district: 'Bengaluru Rural',
    state: 'Karnataka',
    distanceBengaluru: '35 km from Bengaluru',
    distanceNelamangala: '8 km from Nelamangala',
    mapQuery: 'Whispering Wood by Nairuthya Properties',
    mapEmbedUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.00800222693!2d77.33212307359022!3d13.03516221348457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae310049c2514b%3A0x31df4bed6b535bbd!2sWhispering%20Wood%20by%20Nairuthya%20Properties!5e0!3m2!1sen!2sin!4v1790763247598!5m2!1sen!2sin',
    mapShareUrl:
      'https://www.google.com/maps/place/Whispering+Wood+by+Nairuthya+Properties/@13.0351622,77.332123,17z'
  };

  const googleMapsUrl =
    locationDetails.mapShareUrl ||
    'https://www.google.com/maps/place/Whispering+Wood+by+Nairuthya+Properties/@13.0351622,77.332123,17z';

  const connectivityRows = [
    {
      label: 'BENGALURU',
      value: 'Approx. 35 km',
      detail: 'Direct regional access from Bengaluru city via elevated expressway'
    },
    {
      label: 'NELAMANGALA',
      value: 'Approx. 8 km',
      detail: 'Nearest taluk center with essential civic infrastructure and markets'
    },
    {
      label: 'PROJECT LOCATION',
      value: 'Honnasandra, Nelamangala',
      detail: 'Bengaluru Rural District, Karnataka'
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
              Connected to Bengaluru. Close to Nelamangala.
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed pt-0.5">
              Situated in the quiet, agrarian countryside of Honnasandra, Nelamangala Taluk—providing a peaceful rural setting with straightforward regional access.
            </p>
          </MotionReveal>
        </div>

        {/* 2-Column Main Composition: Information (Left) + Google Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
          {/* Left Side — Project Location & Distances (5 cols) */}
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
                  Honnasandra &bull; Verified Pin
                </span>
              </div>
            </MotionReveal>
          </div>

          {/* Right Side — Official Google Map Embed Area (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <MotionReveal delay={0.2} className="w-full">
              <div className="relative w-full rounded-2xl overflow-hidden border border-[#DDD3BF] bg-white p-2 shadow-xs flex flex-col">
                
                {/* Embedded Google Map Iframe with reduced height */}
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
                    title="Whispering Wood by Nairuthya Properties Google Map"
                  />
                </div>

                {/* Footer Bar with Verified Place Link */}
                <div className="pt-1.5 px-1.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-[#7A6A4E] shrink-0">
                  <span className="truncate">
                    Whispering Wood by Nairuthya Properties
                  </span>
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1E460B] font-semibold hover:underline shrink-0 pl-2 inline-flex items-center gap-1"
                  >
                    <span>View Large Map</span>
                    <ExternalLink className="w-3 h-3" />
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
