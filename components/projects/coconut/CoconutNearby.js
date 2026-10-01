'use client';

import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';

/**
 * Botanical two-leaf sprout icon in crisp white
 */
function SproutIcon({ className = 'w-4 h-4 text-white shrink-0' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22v-9" strokeWidth="2.4" />
      <path
        d="M12 13C8.5 13 5.5 10 5.5 6c3 0 6.5 3 6.5 7Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
      <path
        d="M12 11c3 0 6.5-3 6.5-7-3 0-6.5 3-6.5 7Z"
        fill="currentColor"
        fillOpacity="0.85"
      />
    </svg>
  );
}

/**
 * 06 — PROJECT HIGHLIGHTS & DESTINATION ROUTE BANNER
 * 
 * Styled directly after the master reference (Nairuthya Whispering Wood):
 * - Rich Earth Heritage deep forest green banner (#173822 -> #1E462B -> #14321E)
 * - Flowing champagne-gold topographical contour lines watermark
 * - Left column: "Project Highlights" in high-contrast white serif with compact sprout bullet list
 * - Right column: "Route Map" destination canvas illustrating the Bidadi connectivity network
 * - Destination marker: "DESTINY COCONUT GARDEN"
 */
export default function CoconutNearby({ project }) {
  const highlights = project?.highlights || [
    'Premium Farm Land',
    'Ideal for Weekend Homes',
    'Green & Peaceful Environment',
    'Excellent Investment Opportunity',
    'Surrounded by Nature'
  ];

  return (
    <section
      id="nearby-places"
      className="relative bg-[#FAF7F2] py-8 sm:py-10 lg:py-12 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Project Highlights and Destination Map"
    >
      <Container size="default" className="relative z-10 max-w-6xl px-3 sm:px-6 lg:px-8">
        
        {/* Main Banner in Earth Heritage Deep Forest Green */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-r from-[#173822] via-[#1E462B] to-[#14321E] text-white shadow-lg border border-[#2A5734]/40">
          
          {/* Topographical Contour Lines Background Watermark in Warm Champagne */}
          <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 500"
              fill="none"
              stroke="#EEDFC6"
              strokeWidth="1.2"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M -50 80 Q 200 40 450 120 T 950 100 T 1250 160" />
              <path d="M -50 140 Q 250 110 500 180 T 1000 160 T 1250 230" />
              <path d="M -50 210 Q 300 180 580 250 T 1050 230 T 1250 310" />
              <path d="M -50 280 Q 350 250 640 320 T 1100 300 T 1250 390" />
              <path d="M -50 360 Q 400 330 700 400 T 1150 380 T 1250 470" />
              <path d="M -50 440 Q 450 410 760 480 T 1200 450 T 1250 540" />
            </svg>
          </div>

          {/* Banner Content: 2-Column Grid */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* LEFT COLUMN — Project Highlights */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-5">
                <MotionReveal delay={0.05}>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-white tracking-tight leading-snug">
                    Project Highlights
                  </h3>
                </MotionReveal>

                {/* Compact Sprout Bullet List */}
                <div className="space-y-2.5 sm:space-y-3 pt-1">
                  {highlights.map((item, idx) => (
                    <MotionReveal key={idx} delay={0.05 * (idx + 1)}>
                      <div className="flex items-center gap-2.5 sm:gap-3 text-white/95">
                        <SproutIcon className="w-4 h-4 text-white/90 shrink-0" />
                        <span className="font-serif text-[14px] sm:text-[15.5px] lg:text-[16px] tracking-tight font-normal leading-tight">
                          {item}
                        </span>
                      </div>
                    </MotionReveal>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN — Route Map (Illustrated White Line Vector Map) */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
                <MotionReveal delay={0.1}>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-white tracking-tight leading-snug">
                    Route Map
                  </h3>
                </MotionReveal>

                {/* Vector Route Map Canvas */}
                <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[300px] rounded-xl overflow-hidden">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 540 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background contour accents */}
                    <path
                      d="M 20 60 Q 180 30 320 70 T 520 60"
                      stroke="rgba(238,223,198,0.12)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 10 140 Q 200 110 360 150 T 530 140"
                      stroke="rgba(238,223,198,0.12)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 30 220 Q 220 190 380 230 T 520 220"
                      stroke="rgba(238,223,198,0.12)"
                      strokeWidth="1"
                    />

                    {/* Main Highway Route Trunk (Bengaluru - Mysuru Expressway Corridor) */}
                    <path
                      d="M 40 250 L 120 220 L 210 190 L 300 160 L 380 120 L 460 70"
                      stroke="white"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Regional Route Link */}
                    <path
                      d="M 210 190 L 270 230 L 350 250"
                      stroke="white"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      strokeLinecap="round"
                    />

                    {/* Destination Approach Branch */}
                    <path
                      d="M 300 160 L 330 110 L 370 100"
                      stroke="#55C40D"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                    />

                    {/* Origin Node — Greater Bengaluru */}
                    <circle cx="40" cy="250" r="5" fill="#FAF6F0" />
                    <text x="52" y="254" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="sans-serif">
                      Bengaluru
                    </text>

                    {/* Regional Node — Bidadi Town */}
                    <circle cx="210" cy="190" r="4.5" fill="#FAF6F0" />
                    <text x="175" y="175" fill="rgba(255,255,255,0.85)" fontSize="11" fontFamily="sans-serif">
                      Bidadi
                    </text>

                    {/* Destination Marker Pill — DESTINY COCONUT GARDEN */}
                    <g transform="translate(370, 75)">
                      <rect
                        x="-10"
                        y="-12"
                        width="168"
                        height="44"
                        rx="8"
                        fill="#0A1E11"
                        stroke="#55C40D"
                        strokeWidth="1.2"
                      />
                      <circle cx="4" cy="10" r="5" fill="#55C40D" />
                      <text x="16" y="7" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif" letterSpacing="0.05em">
                        COCONUT GARDEN
                      </text>
                      <text x="16" y="21" fill="#C4D1C7" fontSize="9" fontFamily="sans-serif">
                        6 Acres &bull; Premium Farm Plots
                      </text>
                    </g>
                  </svg>
                </div>
              </div>

            </div>
          </div>

        </div>

      </Container>
    </section>
  );
}
