'use client';

import { cn } from '@/lib/utils';

/**
 * LandContourPattern — Original Earth Heritage Large-Scale Organic Background Language
 * 
 * Inspired by:
 * - Large flowing land elevation contours & ridge lines
 * - Oversized abstract botanical & leaf silhouettes
 * - Architectural root branching networks
 * - Topographic parcel elevation curves
 * 
 * Visual Balance:
 * - 3–8 large, art-directed decorative forms per section
 * - Muted Earth Heritage palette: #1E460B, #5E7748, #D5C09D, #F8EEDC
 * - Clearly visible (lines 10-14% opacity, filled forms 12-18% opacity)
 * - Layered behind content (z-0), non-interactive, zero layout shift
 */
export default function LandContourPattern({
  variant = 'biscuit-contours',
  className
}) {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden select-none z-0',
        className
      )}
      aria-hidden="true"
    >
      {/* 1. BrandStatement: Large Flowing Contours & Oversized Leaf Silhouette */}
      {variant === 'biscuit-contours' && (
        <svg
          viewBox="0 0 1440 850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Large Abstract Botanical / Leaf Silhouette (Top-Left, ~550px) */}
          <path
            d="M-80,-60 C120,-30 320,80 380,240 C430,370 340,490 220,530 C100,570 -40,510 -90,400 Z"
            fill="#5E7748"
            fillOpacity="0.14"
          />

          {/* Large Warm Earth Organic Pod Form (Bottom-Right, ~600px) */}
          <path
            d="M1100,450 C1250,420 1420,490 1520,620 C1590,720 1550,860 1420,910 C1290,950 1140,890 1060,780 C990,680 1010,470 1100,450 Z"
            fill="#D5C09D"
            fillOpacity="0.18"
          />

          {/* Large Sweeping Land Elevation Contours (Spanning Width) */}
          <path
            d="M-50,180 C320,90 680,270 1060,160 C1280,100 1420,200 1520,180"
            stroke="#1E460B"
            strokeOpacity="0.13"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M-50,300 C340,210 710,380 1100,280 C1320,220 1440,320 1520,300"
            stroke="#1E460B"
            strokeOpacity="0.11"
            strokeWidth="1.5"
            strokeDasharray="12 10"
          />
          <path
            d="M-50,440 C300,360 670,510 1040,410 C1270,350 1410,450 1520,430"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="2.2"
          />
          <path
            d="M-50,590 C360,510 730,660 1120,560 C1340,500 1450,600 1520,580"
            stroke="#1E460B"
            strokeOpacity="0.10"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />
          <path
            d="M-50,730 C330,650 700,800 1080,700 C1310,640 1430,730 1520,720"
            stroke="#1E460B"
            strokeOpacity="0.11"
            strokeWidth="1.8"
          />
        </svg>
      )}

      {/* 2. ProblemSection: Large Topographic Elevation Loops & Corner Organic Shape */}
      {variant === 'biscuit-topography' && (
        <svg
          viewBox="0 0 1440 850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Large Abstract Botanical Curve in Top-Right Corner (~520px) */}
          <path
            d="M1080,-80 C1220,-30 1380,60 1460,180 C1540,300 1520,440 1410,500 C1300,550 1170,490 1100,380 C1040,280 1010,120 1080,-80 Z"
            fill="#5E7748"
            fillOpacity="0.14"
          />

          {/* Broad Terraced Contour Silhouette along Lower Margin */}
          <path
            d="M-100,680 C80,620 320,670 480,780 C600,860 620,980 480,1020 C320,1060 -40,980 -120,860 Z"
            fill="#D5C09D"
            fillOpacity="0.17"
          />

          {/* Oversized Concentric Topographic Elevation Loops (Left Margin) */}
          <ellipse
            cx="220"
            cy="520"
            rx="240"
            ry="160"
            transform="rotate(-15 220 520)"
            stroke="#1E460B"
            strokeOpacity="0.14"
            strokeWidth="1.8"
          />
          <ellipse
            cx="220"
            cy="520"
            rx="400"
            ry="270"
            transform="rotate(-15 220 520)"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="1.5"
            strokeDasharray="10 8"
          />
          <ellipse
            cx="220"
            cy="520"
            rx="580"
            ry="390"
            transform="rotate(-15 220 520)"
            stroke="#1E460B"
            strokeOpacity="0.13"
            strokeWidth="2"
          />
          <ellipse
            cx="220"
            cy="520"
            rx="760"
            ry="510"
            transform="rotate(-15 220 520)"
            stroke="#1E460B"
            strokeOpacity="0.10"
            strokeWidth="1.5"
          />

          {/* Diagonal Survey Index Ray */}
          <path
            d="M-50,750 L950,100"
            stroke="#1E460B"
            strokeOpacity="0.09"
            strokeWidth="1.2"
            strokeDasharray="4 6"
          />
        </svg>
      )}

      {/* 3. SolutionSection: Rich Agricultural Furrows & Dual Organic Shapes */}
      {variant === 'biscuit-cultivation' && (
        <svg
          viewBox="0 0 1440 850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Large Abstract Organic Silhouette in Bottom-Left (~580px) */}
          <path
            d="M-60,420 C80,360 260,420 360,540 C440,640 420,780 310,850 C200,920 40,880 -40,780 Z"
            fill="#5E7748"
            fillOpacity="0.15"
          />

          {/* Large Warm Beige Form in Upper-Right Margin (~500px) */}
          <path
            d="M1150,-40 C1280,20 1420,110 1490,240 C1560,370 1520,500 1390,540 C1260,580 1140,510 1080,390 C1030,280 1060,90 1150,-40 Z"
            fill="#D5C09D"
            fillOpacity="0.18"
          />

          {/* Broad Sweeping Cultivation Furrows */}
          <path
            d="M-60,140 Q360,260 820,170 T1520,220"
            stroke="#1E460B"
            strokeOpacity="0.14"
            strokeWidth="2.2"
          />
          <path
            d="M-60,260 Q360,380 820,290 T1520,340"
            stroke="#1E460B"
            strokeOpacity="0.11"
            strokeWidth="1.5"
            strokeDasharray="14 8"
          />
          <path
            d="M-60,380 Q360,500 820,410 T1520,460"
            stroke="#1E460B"
            strokeOpacity="0.13"
            strokeWidth="2"
          />
          <path
            d="M-60,500 Q360,620 820,530 T1520,580"
            stroke="#1E460B"
            strokeOpacity="0.10"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />
          <path
            d="M-60,640 Q360,760 820,670 T1520,720"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="2"
          />
        </svg>
      )}

      {/* 4. ManagementSection: Organic Horizon Curves & Large Botanical Silhouettes */}
      {variant === 'biscuit-organic-flow' && (
        <svg
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Large Abstract Leaf Silhouette (Top-Left behind sticky image, ~560px) */}
          <path
            d="M-80,-50 C120,-10 290,90 350,230 C410,360 360,490 230,550 C100,600 -40,540 -90,430 Z"
            fill="#5E7748"
            fillOpacity="0.14"
          />

          {/* Large Organic Land Mass in Bottom-Right (~620px) */}
          <path
            d="M1040,490 C1200,440 1380,510 1480,630 C1560,740 1540,880 1410,930 C1280,980 1120,920 1030,810 C960,700 970,510 1040,490 Z"
            fill="#D5C09D"
            fillOpacity="0.17"
          />

          {/* Sweeping Horizon Curves */}
          <path
            d="M-50,120 C420,240 880,30 1500,210"
            stroke="#1E460B"
            strokeOpacity="0.13"
            strokeWidth="2.2"
          />
          <path
            d="M-50,270 C440,390 910,180 1500,350"
            stroke="#1E460B"
            strokeOpacity="0.10"
            strokeWidth="1.5"
            strokeDasharray="10 10"
          />
          <path
            d="M-50,430 C480,550 940,330 1500,500"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="2"
          />
          <path
            d="M-50,600 C520,720 980,500 1500,670"
            stroke="#1E460B"
            strokeOpacity="0.10"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
          <path
            d="M-50,760 C550,870 1010,660 1500,820"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="2"
          />
        </svg>
      )}

      {/* 5. HowItWorksSection: Horizontal Landscape Flow Pathways */}
      {variant === 'biscuit-journey' && (
        <svg
          viewBox="0 0 1440 750"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Organic Growth Silhouette (Bottom-Left, ~500px) */}
          <path
            d="M-60,340 C90,300 240,370 320,480 C390,580 370,710 260,770 C150,830 0,790 -60,690 Z"
            fill="#5E7748"
            fillOpacity="0.14"
          />

          {/* Warm Beige Form in Top-Right (~480px) */}
          <path
            d="M1180,-60 C1290,0 1400,90 1470,200 C1530,300 1500,420 1390,460 C1280,500 1170,440 1110,340 C1060,240 1100,90 1180,-60 Z"
            fill="#D5C09D"
            fillOpacity="0.17"
          />

          {/* Horizontal Trajectory Contours */}
          <path
            d="M-50,190 C340,110 700,240 1080,160 C1290,120 1410,200 1500,180"
            stroke="#1E460B"
            strokeOpacity="0.13"
            strokeWidth="2"
          />
          <path
            d="M-50,330 C360,250 720,380 1110,300 C1320,260 1430,340 1500,320"
            stroke="#1E460B"
            strokeOpacity="0.11"
            strokeWidth="1.5"
            strokeDasharray="12 8"
          />
          <path
            d="M-50,480 C320,400 680,540 1060,450 C1270,410 1400,490 1500,470"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="2"
          />
        </svg>
      )}

      {/* 6. PrinciplesSection: Architectural Root Branching & Grounding Forms */}
      {variant === 'biscuit-roots' && (
        <svg
          viewBox="0 0 1440 850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Large Organic Soil/Seedbed Silhouette (Bottom-Left, ~600px) */}
          <path
            d="M-100,380 C80,310 280,370 390,500 C480,610 460,760 340,840 C220,910 20,870 -70,760 Z"
            fill="#D5C09D"
            fillOpacity="0.18"
          />

          {/* Large Abstract Sprout Form in Top-Right (~500px) */}
          <path
            d="M1100,-70 C1240,-20 1390,70 1460,200 C1530,320 1500,450 1380,500 C1260,540 1140,480 1080,360 C1030,260 1040,100 1100,-70 Z"
            fill="#5E7748"
            fillOpacity="0.14"
          />

          {/* Architectural Root Branching Lines (Right Margin flowing down behind principles) */}
          <path
            d="M1250,50 C1200,260 1110,420 1010,580 C910,720 740,840 540,940"
            stroke="#1E460B"
            strokeOpacity="0.14"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <path
            d="M1110,420 C1190,520 1290,610 1400,680"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="1.8"
          />
          <path
            d="M1010,580 C960,690 850,790 710,880"
            stroke="#1E460B"
            strokeOpacity="0.11"
            strokeWidth="1.5"
            strokeDasharray="8 8"
          />
          <path
            d="M1340,120 C1290,340 1200,490 1090,640 C980,780 840,880 660,960"
            stroke="#1E460B"
            strokeOpacity="0.10"
            strokeWidth="1.8"
          />

          {/* Sweeping Ground Contours */}
          <path
            d="M-50,220 C340,140 700,280 1080,200 C1290,160 1420,240 1500,220"
            stroke="#1E460B"
            strokeOpacity="0.11"
            strokeWidth="1.6"
          />
          <path
            d="M-50,620 C360,540 720,680 1100,600 C1310,560 1440,640 1500,620"
            stroke="#1E460B"
            strokeOpacity="0.10"
            strokeWidth="1.5"
            strokeDasharray="10 8"
          />
        </svg>
      )}

      {/* 7. FoundersSection: Architectural Land Survey Curves & Framing Forms */}
      {variant === 'biscuit-architectural' && (
        <svg
          viewBox="0 0 1440 850"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
          preserveAspectRatio="none"
        >
          {/* Large Abstract Organic Form (Top-Left, ~500px) */}
          <path
            d="M-70,-40 C100,-10 260,70 330,190 C390,300 350,430 240,480 C120,530 -20,480 -80,380 Z"
            fill="#5E7748"
            fillOpacity="0.13"
          />

          {/* Warm Earthy Silhouette (Bottom-Right, ~520px) */}
          <path
            d="M1120,440 C1260,390 1420,460 1510,570 C1590,680 1560,820 1440,870 C1310,920 1160,860 1080,750 C1010,640 1020,470 1120,440 Z"
            fill="#D5C09D"
            fillOpacity="0.17"
          />

          {/* Broad Survey Contours Framing Founder Cards */}
          <path
            d="M-50,150 C320,80 670,220 1040,150 C1260,110 1400,180 1500,160"
            stroke="#1E460B"
            strokeOpacity="0.13"
            strokeWidth="2"
          />
          <path
            d="M-50,320 C360,240 710,380 1080,300 C1300,260 1420,330 1500,310"
            stroke="#1E460B"
            strokeOpacity="0.10"
            strokeWidth="1.5"
            strokeDasharray="10 10"
          />
          <path
            d="M-50,510 C340,430 690,570 1060,490 C1280,450 1410,520 1500,500"
            stroke="#1E460B"
            strokeOpacity="0.12"
            strokeWidth="1.8"
          />
          <path
            d="M-50,710 C380,630 730,770 1100,690 C1320,650 1440,720 1500,700"
            stroke="#1E460B"
            strokeOpacity="0.11"
            strokeWidth="1.5"
            strokeDasharray="6 8"
          />
        </svg>
      )}
    </div>
  );
}
