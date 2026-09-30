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
 * 06 — NEARBY ATTRACTIONS & ROUTE MAP BANNER
 * 
 * Original Earth Heritage composition inspired by the reference layout:
 * - Rich Earth Heritage deep forest green banner (#173822 -> #1E462B -> #14321E)
 * - Flowing champagne-gold topographical contour lines watermark
 * - Left column: "Nearby Attractions" in high-contrast white serif with compact sprout bullet list
 * - Right column: "Route Map" in matching white serif with illustrated white vector road network
 * - Destination marker: "WHISPERING WOOD" (without any repetitive location text)
 * - Removed extra action buttons for a cleaner, editorial presentation
 */
export default function NairuthyaNearby({ project }) {
  const attractions = [
    'Nelamangala Town (Approx. 8 km)',
    'Bengaluru / Yeshwanthpur (Approx. 35 km)',
    'Tumkur Road (NH 48 Expressway)',
    'STRR (Satellite Town Ring Road)',
    'Shivagange Heritage Hill & Temple (~22 km)',
    'Hesaraghatta Lake & Grasslands (~24 km)'
  ];

  return (
    <section
      id="nearby-places"
      className="relative bg-[#FAF7F2] py-8 sm:py-10 lg:py-12 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Nearby Attractions and Route Map"
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
              
              {/* LEFT COLUMN — Nearby Attractions */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4 sm:space-y-5">
                <MotionReveal delay={0.05}>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-white tracking-tight leading-snug">
                    Nearby Attractions
                  </h3>
                </MotionReveal>

                {/* Compact Sprout Bullet List */}
                <div className="space-y-2.5 sm:space-y-3 pt-1">
                  {attractions.map((item, idx) => (
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

                    {/* Main Highway Route Trunk (Tumkur Road NH 48 Axis) */}
                    <path
                      d="M 40 250 L 110 220 L 190 200 L 260 170 L 330 130 L 410 120 L 440 60"
                      stroke="white"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Branch 1: STRR Ring Corridor */}
                    <path
                      d="M 190 200 L 250 240 L 330 260"
                      stroke="white"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 3"
                    />

                    {/* Branch 2: Towards Shivagange */}
                    <path
                      d="M 260 170 L 220 120 L 150 90"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Branch 3: Towards Nelamangala town center */}
                    <path
                      d="M 330 130 L 380 180 L 450 200"
                      stroke="white"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Milestone Junction Nodes (White Dots) */}
                    <circle cx="110" cy="220" r="3.5" fill="white" />
                    <circle cx="190" cy="200" r="4.5" fill="white" />
                    <circle cx="260" cy="170" r="4" fill="white" />
                    <circle cx="330" cy="130" r="4.5" fill="white" />
                    <circle cx="410" cy="120" r="3.5" fill="white" />

                    {/* Road Text Annotations (Crisp White Labels) */}
                    <text
                      x="40"
                      y="266"
                      fill="white"
                      fontSize="9"
                      fontFamily="sans-serif"
                      opacity="0.9"
                    >
                      Towards Bengaluru (NH 48)
                    </text>

                    <text
                      x="145"
                      y="190"
                      fill="white"
                      fontSize="8.5"
                      fontFamily="sans-serif"
                      opacity="0.85"
                    >
                      STRR Interchange
                    </text>

                    <text
                      x="90"
                      y="95"
                      fill="white"
                      fontSize="8.5"
                      fontFamily="sans-serif"
                      opacity="0.8"
                    >
                      Shivagange Hills
                    </text>

                    <text
                      x="345"
                      y="145"
                      fill="white"
                      fontSize="8.5"
                      fontFamily="sans-serif"
                      opacity="0.9"
                    >
                      Nelamangala Taluk (~8 km)
                    </text>

                    <text
                      x="260"
                      y="255"
                      fill="white"
                      fontSize="8"
                      fontFamily="sans-serif"
                      opacity="0.75"
                    >
                      STRR Orbital Road
                    </text>

                    {/* Destination Marker Flag / Badge */}
                    <g transform="translate(370, 26)">
                      <rect
                        x="0"
                        y="0"
                        width="144"
                        height="28"
                        rx="4"
                        fill="rgba(255,255,255,0.95)"
                        stroke="rgba(255,255,255,0.4)"
                        strokeWidth="1"
                      />
                      <text
                        x="72"
                        y="18"
                        textAnchor="middle"
                        fill="#14321D"
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        letterSpacing="0.06em"
                      >
                        WHISPERING WOOD
                      </text>

                      {/* Pin pole down to road */}
                      <circle cx="72" cy="28" r="3" fill="white" />
                      <line
                        x1="72"
                        y1="28"
                        x2="72"
                        y2="34"
                        stroke="white"
                        strokeWidth="2"
                      />
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
