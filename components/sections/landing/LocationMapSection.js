'use client';

import Container from '@/components/ui/Container';
import LandContourPattern from '@/components/ui/LandContourPattern';
import MotionReveal from '@/components/animations/MotionReveal';
import { MapPin, ExternalLink } from 'lucide-react';

/**
 * LocationMapSection — Official Earth Heritage Google Maps Showcase
 * 
 * Features:
 * - Direct official Google Maps embed for Earth Heritage Private Limited
 * - Fully interactive (zoom, pan, map controls, view larger map)
 * - Responsive container: ~500px desktop, ~420px tablet, ~350px mobile
 * - Grounded in Earth Heritage warm ivory visual identity with subtle organic contours
 * - Strictly displays verified corporate title without unverified street/postal data
 * - Transitions seamlessly into the final conversion CTA ("Have farmland that deserves to be cared for?")
 */
export default function LocationMapSection() {
  return (
    <section
      id="location"
      data-navbar-theme="light"
      className="relative w-full bg-[#FAF7F2] text-[#152B1B] py-16 sm:py-20 lg:py-24 border-b border-[#E8E1D5] overflow-hidden"
      aria-label="Earth Heritage Location and Office Map"
    >
      {/* Subtle Organic Background Contours */}
      <LandContourPattern variant="biscuit-contours" className="opacity-70" />

      <Container size="wide" className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto flex flex-col space-y-8 sm:space-y-10">
          
          {/* Section Header: Eyebrow & Editorial Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
            <MotionReveal>
              <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-[#EDE7DD] border border-[#D5C9B8] text-[#152B1B] text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] shadow-xs">
                <span className="text-[#8F7441] text-xs select-none" aria-hidden="true">✦</span>
                <span>FIND EARTH HERITAGE</span>
              </div>
            </MotionReveal>

            <MotionReveal delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-normal tracking-tight text-[#152B1B] leading-[1.12]">
                Come closer to where it begins.
              </h2>
            </MotionReveal>
          </div>

          {/* Responsive Editorial Map Panel */}
          <MotionReveal delay={0.2} className="w-full">
            <div className="w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-[#DDD4C5] bg-white shadow-[0_12px_36px_rgba(21,43,27,0.06)] hover:shadow-[0_16px_44px_rgba(21,43,27,0.09)] transition-shadow duration-300">
              
              {/* Interactive Google Maps Iframe Container */}
              <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px] xl:h-[500px] bg-[#EFECE6]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.0269684361006!2d77.49423207358898!3d12.970126114913551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d56f1c4cc8d%3A0x3806e5fa4984ee8!2sEarth%20Heritage%20Private%20Limited!5e0!3m2!1sen!2sin!4v1789637384205!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Earth Heritage Private Limited location on Google Maps"
                  className="w-full h-full block"
                />
              </div>

              {/* Information Bar Below Map */}
              <div className="p-4 sm:p-5 md:p-6 bg-[#F8F5EE] border-t border-[#E8E1D5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#152B1B] text-[#EDE7DD] flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-4.5 h-4.5 text-[#D4AF37]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-sans text-sm sm:text-base font-medium text-[#152B1B] tracking-tight">
                      Earth Heritage Private Limited
                    </h3>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Earth+Heritage+Private+Limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#152B1B] hover:text-[#2D5A3A] transition-colors py-2 px-4 rounded-full border border-[#D5C9B8] bg-white/80 hover:bg-white shadow-xs"
                  aria-label="Open Earth Heritage Private Limited location in Google Maps"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#8F7441]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </MotionReveal>

        </div>
      </Container>
    </section>
  );
}
