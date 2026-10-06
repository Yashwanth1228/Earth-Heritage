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
 * Styled directly after the master reference (Nairuthya Whispering Wood):
 * - Rich Earth Heritage deep forest green banner (#173822 -> #1E462B -> #14321E)
 * - Flowing champagne-gold topographical contour lines watermark
 * - Left column: "Nearby Attractions" in high-contrast white serif with compact sprout bullet list (single line)
 * - Right column: "Route Map" in matching white serif with illustrated white vector road network showing the nearby attractions
 * - Destination marker: "COCONUT GARDEN" with white pill badge and pin pole
 */
export default function CoconutNearby({ project }) {
  const attractions = project?.nearbyAttractions || [
    'Bidadi Town Center',
    'Bengaluru / Kengeri (NH 275)',
    'Wonderla Amusement Park',
    'Eagleton Golf Resort',
    'Harohalli Industrial Area',
    'Janapada Loka Folk Museum',
    'Ramadevara Betta Sanctuary'
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

                {/* Compact Sprout Bullet List (Single Line items strictly preserved) */}
                <div className="space-y-2.5 sm:space-y-3 pt-1">
                  {attractions.map((item, idx) => (
                    <MotionReveal key={idx} delay={0.05 * (idx + 1)}>
                      <div className="flex items-center gap-2.5 sm:gap-3 text-white/95">
                        <SproutIcon className="w-4 h-4 text-white/90 shrink-0" />
                        <span className="font-serif text-[14px] sm:text-[15.5px] lg:text-[16px] tracking-tight font-normal leading-tight whitespace-nowrap">
                          {item}
                        </span>
                      </div>
                    </MotionReveal>
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN — Regional Attractions Illustrated Composition */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-3">
                <MotionReveal delay={0.1}>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal text-white tracking-tight leading-snug">
                    Regional Map
                  </h3>
                </MotionReveal>

                {/* Illustrated Regional Composition Canvas */}
                <div className="relative w-full h-[240px] sm:h-[280px] lg:h-[300px] rounded-xl overflow-hidden">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 540 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="Illustrative regional attractions overview around Coconut Garden"
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

                    {/* Concentric Locality Proximity Arcs (Abstract regional vicinity ripples) */}
                    <ellipse
                      cx="270"
                      cy="136"
                      rx="105"
                      ry="58"
                      stroke="rgba(238,223,198,0.14)"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <ellipse
                      cx="270"
                      cy="136"
                      rx="205"
                      ry="96"
                      stroke="rgba(238,223,198,0.08)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />

                    {/* Abstract Constellation Links (Connecting Regional Attractions to Locality Network) */}
                    {/* Wonderla to Bidadi */}
                    <path
                      d="M 115 74 Q 90 98 83 122"
                      stroke="rgba(238,223,198,0.3)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    {/* Bidadi to Coconut Garden */}
                    <path
                      d="M 146 136 Q 172 136 198 136"
                      stroke="rgba(238,223,198,0.4)"
                      strokeWidth="1.4"
                      strokeDasharray="3 3"
                    />
                    {/* Coconut Garden to Eagleton */}
                    <path
                      d="M 330 122 Q 380 95 420 74"
                      stroke="rgba(238,223,198,0.3)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    {/* Coconut Garden to Harohalli Industrial Area */}
                    <path
                      d="M 342 136 Q 354 136 366 136"
                      stroke="rgba(238,223,198,0.4)"
                      strokeWidth="1.4"
                      strokeDasharray="3 3"
                    />
                    {/* Coconut Garden to Ramanagara & Ramadevara Betta */}
                    <path
                      d="M 330 148 Q 375 178 410 206"
                      stroke="rgba(238,223,198,0.3)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    {/* Bidadi to Janapada Loka */}
                    <path
                      d="M 83 148 Q 88 178 100 206"
                      stroke="rgba(238,223,198,0.3)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                    {/* Janapada Loka to Ramanagara */}
                    <path
                      d="M 160 223 Q 235 240 310 223"
                      stroke="rgba(238,223,198,0.2)"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />

                    {/* Node 1: Wonderla Amusement Park (Top-Left) */}
                    <g>
                      <rect
                        x="30"
                        y="44"
                        width="170"
                        height="26"
                        rx="4"
                        fill="rgba(255,255,255,0.12)"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <circle cx="115" cy="74" r="3" fill="#EEDFC6" />
                      <circle cx="115" cy="74" r="6" fill="none" stroke="rgba(238,223,198,0.4)" />
                      <line x1="115" y1="70" x2="115" y2="74" stroke="#EEDFC6" strokeWidth="1" />
                      <text
                        x="115"
                        y="60"
                        textAnchor="middle"
                        fill="white"
                        fontSize="8.5"
                        fontWeight="500"
                        fontFamily="sans-serif"
                        letterSpacing="0.02em"
                      >
                        Wonderla Amusement Park
                      </text>
                    </g>

                    {/* Node 2: Eagleton Golf Resort (Top-Right) */}
                    <g>
                      <rect
                        x="345"
                        y="44"
                        width="150"
                        height="26"
                        rx="4"
                        fill="rgba(255,255,255,0.12)"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <circle cx="420" cy="74" r="3" fill="#EEDFC6" />
                      <circle cx="420" cy="74" r="6" fill="none" stroke="rgba(238,223,198,0.4)" />
                      <line x1="420" y1="70" x2="420" y2="74" stroke="#EEDFC6" strokeWidth="1" />
                      <text
                        x="420"
                        y="60"
                        textAnchor="middle"
                        fill="white"
                        fontSize="8.5"
                        fontWeight="500"
                        fontFamily="sans-serif"
                        letterSpacing="0.02em"
                      >
                        Eagleton Golf Resort
                      </text>
                    </g>

                    {/* Node 3: Bidadi Town Center (Center-Left) */}
                    <g>
                      <rect
                        x="20"
                        y="122"
                        width="126"
                        height="26"
                        rx="4"
                        fill="rgba(255,255,255,0.15)"
                        stroke="rgba(255,255,255,0.3)"
                        strokeWidth="1"
                      />
                      <circle cx="83" cy="148" r="3" fill="#EEDFC6" />
                      <circle cx="83" cy="148" r="6" fill="none" stroke="rgba(238,223,198,0.4)" />
                      <text
                        x="83"
                        y="138"
                        textAnchor="middle"
                        fill="white"
                        fontSize="9"
                        fontWeight="600"
                        fontFamily="sans-serif"
                        letterSpacing="0.02em"
                      >
                        Bidadi Town Center
                      </text>
                    </g>

                    {/* Node 4: Janapada Loka (Bottom-Left) */}
                    <g>
                      <rect
                        x="40"
                        y="210"
                        width="120"
                        height="26"
                        rx="4"
                        fill="rgba(255,255,255,0.12)"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <circle cx="100" cy="206" r="3" fill="#EEDFC6" />
                      <circle cx="100" cy="206" r="6" fill="none" stroke="rgba(238,223,198,0.4)" />
                      <line x1="100" y1="206" x2="100" y2="210" stroke="#EEDFC6" strokeWidth="1" />
                      <text
                        x="100"
                        y="226"
                        textAnchor="middle"
                        fill="white"
                        fontSize="8.5"
                        fontWeight="500"
                        fontFamily="sans-serif"
                        letterSpacing="0.02em"
                      >
                        Janapada Loka
                      </text>
                    </g>

                    {/* Node 5: Ramanagara & Ramadevara Betta (Bottom-Right) */}
                    <g>
                      <rect
                        x="310"
                        y="210"
                        width="200"
                        height="26"
                        rx="4"
                        fill="rgba(255,255,255,0.12)"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <circle cx="410" cy="206" r="3" fill="#EEDFC6" />
                      <circle cx="410" cy="206" r="6" fill="none" stroke="rgba(238,223,198,0.4)" />
                      <line x1="410" y1="206" x2="410" y2="210" stroke="#EEDFC6" strokeWidth="1" />
                      <text
                        x="410"
                        y="226"
                        textAnchor="middle"
                        fill="white"
                        fontSize="8.5"
                        fontWeight="500"
                        fontFamily="sans-serif"
                        letterSpacing="0.02em"
                      >
                        Ramanagara &amp; Ramadevara Betta
                      </text>
                    </g>

                    {/* Node: Harohalli Industrial Area (Center-Right) */}
                    <g>
                      <rect
                        x="366"
                        y="123"
                        width="150"
                        height="26"
                        rx="4"
                        fill="rgba(255,255,255,0.12)"
                        stroke="rgba(255,255,255,0.25)"
                        strokeWidth="1"
                      />
                      <circle cx="441" cy="149" r="3" fill="#EEDFC6" />
                      <circle cx="441" cy="149" r="6" fill="none" stroke="rgba(238,223,198,0.4)" />
                      <text
                        x="441"
                        y="139"
                        textAnchor="middle"
                        fill="white"
                        fontSize="8.5"
                        fontWeight="500"
                        fontFamily="sans-serif"
                        letterSpacing="0.02em"
                      >
                        Harohalli Industrial Area
                      </text>
                    </g>

                    {/* PROJECT LOCATION: COCONUT GARDEN (Central Focal Badge) */}
                    <g transform="translate(198, 122)">
                      {/* Outer subtle halo ring */}
                      <rect
                        x="-5"
                        y="-5"
                        width="154"
                        height="38"
                        rx="6"
                        fill="rgba(238,223,198,0.08)"
                        stroke="rgba(238,223,198,0.22)"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                      />
                      {/* Crisp white badge matching Nairuthya Whispering Wood style */}
                      <rect
                        x="0"
                        y="0"
                        width="144"
                        height="28"
                        rx="4"
                        fill="rgba(255,255,255,0.95)"
                        stroke="rgba(255,255,255,0.5)"
                        strokeWidth="1"
                      />
                      <circle cx="16" cy="14" r="3.5" fill="#14321D" />
                      <text
                        x="76"
                        y="18"
                        textAnchor="middle"
                        fill="#14321D"
                        fontSize="9.5"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                        letterSpacing="0.06em"
                      >
                        COCONUT GARDEN
                      </text>
                      {/* Editorial sub-tag under the badge */}
                      <text
                        x="72"
                        y="42"
                        textAnchor="middle"
                        fill="#EEDFC6"
                        fontSize="7.5"
                        fontFamily="sans-serif"
                        letterSpacing="0.1em"
                        opacity="0.9"
                      >
                        PROJECT LOCATION
                      </text>
                    </g>

                    {/* Editorial Disclaimer at bottom */}
                    <text
                      x="270"
                      y="270"
                      textAnchor="middle"
                      fill="#EEDFC6"
                      fontSize="7.5"
                      fontFamily="sans-serif"
                      letterSpacing="0.08em"
                      opacity="0.6"
                    >
                      Illustrative Regional Composition • Not to Scale
                    </text>
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
