'use client';

/**
 * FooterLandscapeBackground — Final Refined Earth Heritage Landscape Artwork
 * 
 * Hierarchy & Protection Architecture:
 * - CONTENT FIRST, LANDSCAPE SECOND
 * - TOP 30–35% (y = 0 to 260): Pristine, clean deep green breathing zone for navbar & top brand banner.
 * - MIDDLE 30–40% (y = 260 to 520): Subtle distant mountain ridges & 3 sparse birds at low contrast (10–14%).
 *     Strictly content-safe behind Explore, Learn, Connect, and Company bio.
 * - LOWER 30–35% (y = 520 to 850): Expressive landscape with framing trees at outer edges,
 *     flowering prairie grasses, roots, and the working tractor.
 * - TRACTOR POSITIONING:
 *     Desktop: Placed in the genuinely EMPTY open corridor at x = 410, y = 524:
 *     - 33px below Column 1 pill (ends at y=493)
 *     - 25px above grid border line (at y=586)
 *     - 56px above Notice Box (at y=618)
 *     - 142px to the left of Explore column (starts at x=610)
 *     Sits naturally on a subtle two-track dirt farm road.
 *     Mobile: Placed in the genuinely EMPTY bottom foreground at x = 75, y = 1626:
 *     - Below copyright row (ends at y=1619)
 *     - Completely outside and clear of all headings, links, and notice box
 *     - Safely away from the bottom-right floating WhatsApp button
 * - Scale: Small & elegant (~5% of desktop width, ~58px wide).
 * - Accessibility: aria-hidden="true", pointer-events-none.
 */
export default function FooterLandscapeBackground() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none"
      aria-hidden="true"
    >
      {/* 1. Deep Earthy Green Atmospheric Gradient Base (Blends seamlessly from Final CTA) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#102B17] via-[#0B1E11] to-[#040C06]" />

      {/* ============================================================== */}
      {/* 2. DESKTOP PANORAMIC COMPOSITION (sm:block, hidden on mobile)  */}
      {/* ============================================================== */}
      <svg
        className="hidden sm:block absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 1440 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Subtle Mid-Sky Atmospheric Wash (Only begins below navbar zone) */}
          <linearGradient id="dMidSkyWash" x1="0" y1="180" x2="0" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1A4524" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#1A4524" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#102E18" stopOpacity="0.02" />
          </linearGradient>

          {/* Lower Tree Canopy Gradients (Restrained, low-contrast) */}
          <linearGradient id="dLowerTreeLeft" x1="0" y1="460" x2="160" y2="780" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2E733E" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#205830" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#143A1E" stopOpacity="0.36" />
          </linearGradient>

          <linearGradient id="dLowerTreeRight" x1="1440" y1="460" x2="1280" y2="780" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2E733E" stopOpacity="0.32" />
            <stop offset="60%" stopColor="#205830" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#143A1E" stopOpacity="0.36" />
          </linearGradient>

          {/* Distant Ridge Gradients */}
          <linearGradient id="dDistantRidge" x1="0" y1="260" x2="0" y2="460" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#163C1F" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0B1E10" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="dMidRidge" x1="0" y1="410" x2="0" y2="640" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#183E21" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#08170C" stopOpacity="0.22" />
          </linearGradient>

          <linearGradient id="dLowerTerrace" x1="0" y1="550" x2="0" y2="850" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1B4726" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#061208" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* A. TOP 30-35% ZONE (y = 0 to 260)                             */}
        {/* PROTECTED QUIET ZONE FOR NAVBAR & TOP BRAND BANNER            */}
        {/* Pure clean dark green. Zero artwork entering navbar           */}
        {/* ------------------------------------------------------------- */}
        <rect x="0" y="160" width="1440" height="240" fill="url(#dMidSkyWash)" />

        {/* Distant Sparse Birds (Only 3 subtle birds in open sky gap, y=205-225) */}
        <g className="motion-safe:animate-pulse" style={{ animationDuration: '9s' }} opacity="0.22" fill="#4AA063">
          <path d="M725 210 C731 202, 741 202, 747 212 C753 202, 763 202, 769 210 C761 208, 753 216, 747 215 C741 216, 733 208, 725 210 Z" />
          <path d="M690 222 C695 215, 703 215, 708 224 C713 215, 721 215, 726 222 C720 220, 714 227, 708 226 C703 227, 697 220, 690 222 Z" />
          <path d="M780 220 C785 213, 793 213, 798 222 C803 213, 811 213, 816 220 C810 218, 804 225, 798 224 C793 225, 787 218, 780 220 Z" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* B. MIDDLE 30-40% ZONE (y = 260 to 520)                        */}
        {/* GENTLE DISTANT LANDSCAPE AT LOW CONTRAST (10-14%)             */}
        {/* Protected content-safe zone behind Explore / Learn / Connect  */}
        {/* ------------------------------------------------------------- */}
        {/* Distant Horizon Ridge 1 */}
        <path
          d="M-50 310 C180 265, 420 330, 680 285 C940 240, 1180 320, 1500 275 L1500 850 L-50 850 Z"
          fill="url(#dDistantRidge)"
        />
        <path
          d="M-50 310 C180 265, 420 330, 680 285 C940 240, 1180 320, 1500 275"
          stroke="#265F35"
          strokeWidth="1.0"
          opacity="0.14"
        />

        {/* Micro-Silhouettes of Distant Ridge Crest Trees (Very soft) */}
        <g opacity="0.12" fill="#1C4B25">
          <path d="M220 280 C225 272, 234 272, 238 280 C243 270, 254 270, 260 280 L260 288 L220 288 Z" />
          <path d="M670 278 C676 269, 686 269, 692 279 C698 268, 710 268, 716 278 L716 286 L670 286 Z" />
          <path d="M1170 302 C1176 292, 1186 292, 1192 303 C1198 292, 1210 292, 1216 302 L1216 312 L1170 312 Z" />
        </g>

        {/* Mid-Distance Rolling Farm Ridge 2 */}
        <path
          d="M-60 435 C200 380, 480 455, 760 400 C1020 350, 1260 435, 1520 385 L1520 850 L-60 850 Z"
          fill="url(#dMidRidge)"
        />
        <path
          d="M-60 435 C200 380, 480 455, 760 400 C1020 350, 1260 435, 1520 385"
          stroke="#2D6E3E"
          strokeWidth="1.2"
          opacity="0.16"
        />

        {/* Very Faint Contour Lines in Mid Zone (Non-competing, ultra-low contrast) */}
        <g opacity="0.10" stroke="#2B6B3C" strokeLinecap="round">
          <path d="M-20 460 C180 410, 420 450, 660 420" strokeWidth="1.0" strokeDasharray="5 7" />
          <path d="M1480 410 C1360 385, 1220 405, 1100 390" strokeWidth="1.0" strokeDasharray="5 7" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* C. LOWER 30-35% ZONE (y = 520 to 850)                         */}
        {/* EXPRESSIVE LANDSCAPE: LOWER TREES, FARMLAND, TRACTOR & ROOTS  */}
        {/* ------------------------------------------------------------- */}
        <path
          d="M-60 565 C200 520, 480 580, 780 535 C1060 485, 1300 560, 1520 520 L1520 850 L-60 850 Z"
          fill="url(#dLowerTerrace)"
        />
        <path
          d="M-60 565 C200 520, 480 580, 780 535 C1060 485, 1300 560, 1520 520"
          stroke="#347E47"
          strokeWidth="1.5"
          opacity="0.22"
        />

        {/* Agricultural Furrows in Lower Terrace (Safely below column content) */}
        <g opacity="0.18" stroke="#3A8A50" strokeLinecap="round">
          <path d="M-40 635 C160 590, 440 630, 720 595 C920 568, 1120 580, 1340 555" strokeWidth="1.4" strokeDasharray="7 9" />
          <path d="M-50 705 C150 655, 460 690, 760 650 C980 615, 1180 625, 1420 590" strokeWidth="1.6" strokeDasharray="9 11" />
          <path d="M-60 775 C160 715, 480 750, 800 700 C1040 658, 1240 670, 1480 630" strokeWidth="1.8" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* D. LOWER FRAMING TREES (CANOPIES AT OUTER EDGES BELOW NAVBAR)  */}
        {/* Canopies start at mid-height (y ≈ 450) and stay on flanks     */}
        {/* ------------------------------------------------------------- */}
        {/* Left Framing Tree (Restricted to far left x = -30 to 140, y = 450 to 850) */}
        <g opacity="0.30">
          <path
            d="M-20 850 C15 760, 25 650, 28 560 C32 500, 42 465, 48 435"
            stroke="#174323"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M26 575 C50 535, 85 500, 112 465"
            stroke="#174323"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M-50 540 C-60 465, -5 420, 45 420 C85 420, 115 448, 130 488 C158 498, 170 535, 158 570 C170 610, 145 645, 105 650 C72 655, 20 642, -2 620 C-38 625, -50 590, -50 540 Z"
            fill="url(#dLowerTreeLeft)"
          />
          <circle cx="45" cy="475" r="32" fill="#266336" opacity="0.30" />
        </g>

        {/* Right Framing Tree (Restricted to far right x = 1350 to 1480, y = 450 to 850) */}
        <g opacity="0.30">
          <path
            d="M1460 850 C1425 760, 1415 650, 1412 560 C1408 500, 1398 465, 1392 435"
            stroke="#174323"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1414 575 C1390 535, 1355 500, 1328 465"
            stroke="#174323"
            strokeWidth="4.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M1490 540 C1500 465, 1445 420, 1395 420 C1355 420, 1325 448, 1310 488 C1282 498, 1270 535, 1282 570 C1270 610, 1295 645, 1335 650 C1368 655, 1420 642, 1442 620 C1478 625, 1490 590, 1490 540 Z"
            fill="url(#dLowerTreeRight)"
          />
          <circle cx="1395" cy="475" r="32" fill="#266336" opacity="0.30" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* E. SUBTLE CURVED DIRT FARM ROAD / FIELD PATH                  */}
        {/* Gently leads toward the tractor without crossing any text    */}
        {/* Runs along y = 544 to 550 in the open corridor                */}
        {/* ------------------------------------------------------------- */}
        <g opacity="0.20">
          {/* Dual Dirt Tire Tracks */}
          <path
            d="M 210 550 C 270 546, 330 543, 410 542"
            stroke="#38854D"
            strokeWidth="1.1"
            strokeDasharray="4 5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 210 556 C 270 552, 330 549, 410 548"
            stroke="#38854D"
            strokeWidth="1.1"
            strokeDasharray="4 5"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* F. RECOGNIZABLE WORKING TRACTOR IN GENUINELY EMPTY VISUAL AREA*/}
        {/* Positioned at x=410, y=524 in the open 93px vertical corridor */}
        {/* - 33px below Column 1 pill (ends at y=493)                    */}
        {/* - 25px above grid border line (at y=586)                      */}
        {/* - 56px above Notice Box (at y=618)                            */}
        {/* - 142px to the left of Explore column (starts at x=610)       */}
        {/* Zero overlap with any heading, paragraph, link, or notice     */}
        {/* Scale: ~72px wide = ~5.0% of desktop width                    */}
        {/* ------------------------------------------------------------- */}
        <g transform="translate(410, 524) scale(0.75)" opacity="0.38">
          {/* Ground furrow shadow beneath wheels */}
          <path d="M-6 44 C-6 41, 16 38, 44 38 C72 38, 96 41, 96 44 C96 47, 72 50, 44 50 C16 50, -6 47, -6 44 Z" fill="#030C05" opacity="0.65" />

          {/* Trailing Tillage Furrow Lines (Turned earth) */}
          <g opacity="0.65" stroke="#4AA063" strokeWidth="1.8" strokeLinecap="round">
            <path d="M-4 42 C-16 43, -28 42, -42 44" strokeDasharray="4 4" />
            <path d="M-2 46 C-14 47, -26 46, -40 48" strokeDasharray="4 4" />
          </g>

          {/* 3-Point Disk Harrow Hitch */}
          <g stroke="#3A8A50" strokeWidth="2.2" strokeLinecap="round" fill="none">
            <path d="M12 34 L-4 38 L-14 37" />
            <line x1="-10" y1="37" x2="-12" y2="43" strokeWidth="2.4" stroke="#4AA063" />
            <line x1="-3" y1="38" x2="-5" y2="44" strokeWidth="2.4" stroke="#4AA063" />
          </g>

          {/* Large Rear Knobby Drive Tire */}
          <circle cx="20" cy="32" r="17" fill="#0B1C0E" stroke="#3E8E54" strokeWidth="2.2" />
          <circle cx="20" cy="32" r="10" fill="#184021" stroke="#4AA063" strokeWidth="1.5" />
          <circle cx="20" cy="32" r="4" fill="#051207" />
          {/* Deep Knobby Chevron Cleats */}
          <g stroke="#4AA063" strokeWidth="2.2" strokeLinecap="round">
            <line x1="20" y1="15" x2="20" y2="20" />
            <line x1="20" y1="44" x2="20" y2="49" />
            <line x1="3" y1="32" x2="8" y2="32" />
            <line x1="32" y1="32" x2="37" y2="32" />
            <line x1="8" y1="20" x2="12" y2="24" />
            <line x1="28" y1="40" x2="32" y2="44" />
            <line x1="8" y1="44" x2="12" y2="40" />
            <line x1="28" y1="24" x2="32" y2="20" />
          </g>

          {/* Front Steer Tire */}
          <circle cx="64" cy="38" r="10" fill="#0B1C0E" stroke="#3E8E54" strokeWidth="1.8" />
          <circle cx="64" cy="38" r="5.5" fill="#184021" stroke="#4AA063" strokeWidth="1.2" />
          <g stroke="#4AA063" strokeWidth="1.8" strokeLinecap="round">
            <line x1="64" y1="28" x2="64" y2="32" />
            <line x1="64" y1="44" x2="64" y2="48" />
            <line x1="54" y1="38" x2="58" y2="38" />
            <line x1="70" y1="38" x2="74" y2="38" />
          </g>

          {/* Tractor Chassis & Sloped Bonnet */}
          <path d="M18 24 L34 24 L38 14 L68 14 L74 26 L68 38 L34 38 Z" fill="#245D33" stroke="#3E8E54" strokeWidth="1.4" />
          <line x1="40" y1="19" x2="66" y2="19" stroke="#4AA063" strokeWidth="1.4" />
          <line x1="71" y1="18" x2="71" y2="24" stroke="#4AA063" strokeWidth="1.5" strokeLinecap="round" />

          {/* ROPS Canopy & Operator Seat */}
          <path d="M20 3 L46 3 L44 7 L22 7 Z" fill="#327A45" stroke="#4AA063" strokeWidth="1.4" />
          <path d="M22 7 L18 24 M44 7 L40 24" stroke="#3E8E54" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M38 18 L38 11 L32 8" stroke="#4AA063" strokeWidth="1.6" strokeLinecap="round" fill="none" />
          <path d="M24 20 C27 20, 29 18, 29 14" stroke="#4AA063" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Vertical Exhaust Stack */}
          <line x1="60" y1="14" x2="60" y2="3" stroke="#4AA063" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M60 3 Q63 1 66 2" stroke="#4AA063" strokeWidth="1.4" fill="none" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* G. FOREGROUND WILD GRASSES, LEAVES & ROOTS (y = 740 to 850)   */}
        {/* Concentrated along the bottom edge to ground the composition  */}
        {/* ------------------------------------------------------------- */}
        {/* Bottom Grasses Left */}
        <g opacity="0.36" stroke="#38854D" strokeLinecap="round">
          <path d="M15 850 C28 790, 45 730, 75 685" strokeWidth="2.4" />
          <path d="M40 850 C52 798, 72 748, 110 705" strokeWidth="2.2" />
          <path d="M70 850 C82 805, 102 762, 138 725" strokeWidth="2.0" />
          <path d="M110 850 C122 812, 142 778, 175 750" strokeWidth="1.8" />
        </g>

        {/* Botanical Leaves Left */}
        <g opacity="0.36" fill="#2E733E">
          <path d="M50 760 C65 738, 98 732, 115 750 C102 768, 72 778, 50 760 Z" />
          <path d="M90 715 C110 692, 142 692, 155 715 C138 732, 108 732, 90 715 Z" />
        </g>

        {/* Bottom Grasses Right */}
        <g opacity="0.36" stroke="#38854D" strokeLinecap="round">
          <path d="M1425 850 C1412 790, 1395 730, 1365 685" strokeWidth="2.4" />
          <path d="M1400 850 C1388 798, 1368 748, 1330 705" strokeWidth="2.2" />
          <path d="M1370 850 C1358 805, 1338 762, 1302 725" strokeWidth="2.0" />
          <path d="M1330 850 C1318 812, 1298 778, 1265 750" strokeWidth="1.8" />
        </g>

        {/* Botanical Leaves Right */}
        <g opacity="0.36" fill="#2E733E">
          <path d="M1390 760 C1375 738, 1342 732, 1325 750 C1338 768, 1368 778, 1390 760 Z" />
          <path d="M1350 715 C1330 692, 1298 692, 1285 715 C1302 732, 1332 732, 1350 715 Z" />
        </g>

        {/* Deep Soil Roots along Bottom Border (Heritage Symbolism) */}
        <g opacity="0.30" stroke="#22542E" strokeLinecap="round">
          <path d="M-20 835 C40 810, 110 802, 170 820 C230 838, 290 812, 350 795" strokeWidth="2.6" />
          <path d="M1460 835 C1400 810, 1330 802, 1270 820 C1210 838, 1150 812, 1090 795" strokeWidth="2.6" />
        </g>
      </svg>


      {/* ============================================================== */}
      {/* 3. MOBILE DEDICATED VERTICAL COMPOSITION (block sm:hidden)     */}
      {/* 390x1675 tall canvas with quiet top & bottom foreground tractor*/}
      {/* ============================================================== */}
      <svg
        className="block sm:hidden absolute inset-0 w-full h-full object-cover"
        viewBox="0 0 390 1675"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="mLowerTerrace" x1="0" y1="1300" x2="0" y2="1675" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1B4624" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#051007" stopOpacity="0.38" />
          </linearGradient>
        </defs>

        {/* TOP 30% (y = 0 to 450): CLEAN DEEP GREEN NAVBAR ZONE (Zero artwork) */}

        {/* MIDDLE 35% (y = 450 to 900): SUBTLE DISTANT HILLS BEHIND BIO (Ultra low contrast 10%) */}
        <path
          d="M-20 520 C60 480, 160 540, 260 490 C330 460, 375 490, 410 480 L410 1675 L-20 1675 Z"
          fill="#13331A"
          opacity="0.10"
        />

        {/* Sparse Birds over Mid Distance */}
        <g opacity="0.18" fill="#4AA063">
          <path d="M160 470 C165 463, 173 463, 178 471 C183 463, 191 463, 196 470 C190 468, 184 475, 178 474 C173 475, 167 468, 160 470 Z" />
          <path d="M205 482 C209 476, 215 476, 219 483 C223 476, 229 476, 233 482 C228 480, 223 486, 219 485 C215 486, 210 480, 205 482 Z" />
        </g>

        {/* LOWER FOREGROUND TERRACE (y = 1550 to 1675): Clean, below all links and notice box */}
        <path
          d="M-20 1560 C80 1530, 200 1570, 310 1540 C365 1525, 390 1535, 410 1535 L410 1675 L-20 1675 Z"
          fill="url(#mLowerTerrace)"
        />

        {/* Lower Left Subtle Trunk Silhouette (Tucked in far corner) */}
        <g opacity="0.22">
          <path d="M-10 1675 C5 1630, 10 1590, 12 1550" stroke="#174323" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Mobile Farm Road Leading to Tractor in Bottom Foreground */}
        <g opacity="0.20">
          <path
            d="M 15 1642 C 35 1640, 55 1639, 75 1638"
            stroke="#38854D"
            strokeWidth="1.0"
            strokeDasharray="3 4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 15 1647 C 35 1645, 55 1644, 75 1643"
            stroke="#38854D"
            strokeWidth="1.0"
            strokeDasharray="3 4"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Mobile Working Tractor in GENUINE EMPTY BOTTOM FOREGROUND (y=1626) */}
        {/* Safely below copyRow (ends at y=1619) and away from floating WhatsApp (bottom-right) */}
        <g transform="translate(75, 1626) scale(0.65)" opacity="0.34">
          <path d="M-4 42 C-4 39, 16 37, 42 37 C68 37, 88 39, 88 42 C88 45, 68 47, 42 47 C16 47, -4 45, -4 42 Z" fill="#030C05" opacity="0.65" />
          {/* Harrow */}
          <path d="M10 34 L-4 38 L-12 37" stroke="#3A8A50" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <line x1="-9" y1="37" x2="-11" y2="43" stroke="#4AA063" strokeWidth="2.2" />

          {/* Rear Tire */}
          <circle cx="18" cy="32" r="16" fill="#0B1C0E" stroke="#3E8E54" strokeWidth="2.0" />
          <circle cx="18" cy="32" r="9" fill="#184021" stroke="#4AA063" strokeWidth="1.4" />
          <g stroke="#4AA063" strokeWidth="2.0" strokeLinecap="round">
            <line x1="18" y1="16" x2="18" y2="21" />
            <line x1="18" y1="43" x2="18" y2="48" />
            <line x1="2" y1="32" x2="7" y2="32" />
            <line x1="29" y1="32" x2="34" y2="32" />
          </g>

          {/* Front Tire */}
          <circle cx="58" cy="37" r="9" fill="#0B1C0E" stroke="#3E8E54" strokeWidth="1.6" />
          <circle cx="58" cy="37" r="5" fill="#184021" stroke="#4AA063" strokeWidth="1.2" />

          {/* Bonnet */}
          <path d="M16 24 L30 24 L34 15 L60 15 L66 26 L60 37 L30 37 Z" fill="#245D33" stroke="#3E8E54" strokeWidth="1.2" />
          {/* ROPS */}
          <path d="M18 4 L40 4 L38 8 L20 8 Z" fill="#327A45" stroke="#4AA063" strokeWidth="1.2" />
          <path d="M20 8 L16 24 M38 8 L34 24" stroke="#3E8E54" strokeWidth="2.0" strokeLinecap="round" />
          {/* Exhaust */}
          <line x1="54" y1="15" x2="54" y2="4" stroke="#4AA063" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* Mobile Grasses & Roots along bottom (y=1640 to 1675) */}
        <g opacity="0.30" stroke="#38854D" strokeLinecap="round">
          <path d="M15 1675 C25 1640, 35 1615, 52 1595" strokeWidth="1.8" />
          <path d="M375 1675 C365 1640, 355 1615, 338 1595" strokeWidth="1.8" />
        </g>

        {/* Roots */}
        <g opacity="0.22" stroke="#22542E" strokeWidth="1.8" strokeLinecap="round">
          <path d="M-20 1665 C35 1650, 95 1645, 145 1660" />
          <path d="M410 1665 C355 1650, 295 1645, 245 1660" />
        </g>
      </svg>
    </div>
  );
}
