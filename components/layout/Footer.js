'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { companyData } from '@/data/company';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * Premium Corporate Footer for Earth Heritage Pvt. Ltd.
 * 
 * Aesthetic Direction:
 * EARTH + LAND + ROOTS + LEGACY + PREMIUM CORPORATE BRAND
 * 
 * Key Features:
 * 1. Deep Earth Green palette (#102B17 base, #0E2514 / #0A1A0E depth)
 * 2. Organic SVG transitional boundary bridging the preceding section
 * 3. Large-scale original topographic and root background artwork
 * 4. Refined top brand banner with prominent Earth Heritage logo & proposition pill
 * 5. Clean, structured navigation hierarchy (Explore, Learn, Connect)
 * 6. Verified legal & copyright compliance (zero invented contact claims)
 * 7. Fully accessible and responsive with zero horizontal overflow
 */
export default function Footer() {
  const currentYear = companyData.foundingYear || 2026;
  const { openEnquiryModal } = useEnquiry();

  return (
    <footer
      data-navbar-theme="dark"
      className="relative w-full bg-[#102B17] text-[#FAF7F2] overflow-hidden select-none mt-auto"
      aria-label="Earth Heritage Corporate Footer"
    >
      {/* ============================================================== */}
      {/* 1. ORGANIC TRANSITION BOUNDARY INTO FOOTER                     */}
      {/* ============================================================== */}
      <div
        className="w-full overflow-hidden leading-none select-none pointer-events-none -mt-px"
        aria-hidden="true"
      >
        <svg
          className="w-full h-10 sm:h-14 lg:h-18 text-[#102B17] block"
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C380,55 760,10 1100,45 C1280,60 1380,25 1440,15 L1440,60 L0,60 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 2. LARGE-SCALE ORIGINAL DECORATIVE BACKGROUND ARTWORK          */}
      {/* ============================================================== */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {/* Soft Tonal Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#102B17] via-[#0E2514] to-[#0A1A0E] opacity-95" />

        {/* Large Topographic Elevation Contours & Root Splines */}
        <svg
          className="absolute inset-0 w-full h-full object-cover opacity-35"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Sweeping Horizon Contours */}
          <path
            d="M-80 160 C320 90, 720 280, 1520 120"
            stroke="#215730"
            strokeWidth="1.8"
          />
          <path
            d="M-100 280 C280 200, 820 420, 1540 230"
            stroke="#215730"
            strokeWidth="1.5"
          />
          <path
            d="M-60 420 C360 330, 780 560, 1500 370"
            stroke="#215730"
            strokeWidth="2"
          />
          <path
            d="M-120 580 C240 480, 890 710, 1560 520"
            stroke="#215730"
            strokeWidth="1.6"
          />

          {/* Abstract Deep Root Structures (Bottom-Left to Center) */}
          <path
            d="M-40 880 C120 740, 240 680, 420 710 C560 730, 680 620, 740 510"
            stroke="#276939"
            strokeWidth="2.2"
          />
          <path
            d="M110 880 C220 790, 310 760, 460 790 C580 810, 670 730, 710 660"
            stroke="#215730"
            strokeWidth="1.5"
          />
          <path
            d="M260 880 C360 820, 440 800, 560 830 C640 850, 720 790, 760 740"
            stroke="#1B4727"
            strokeWidth="1.4"
          />

          {/* Large Concentric Survey Contour Loops */}
          <ellipse
            cx="720"
            cy="360"
            rx="580"
            ry="260"
            stroke="#215730"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />
          <ellipse
            cx="720"
            cy="360"
            rx="420"
            ry="180"
            stroke="#276939"
            strokeWidth="1.4"
          />

          {/* Oversized Organic Earth Mass Silhouette (Right Edge) */}
          <path
            d="M1180 200 C1320 180, 1500 320, 1500 540 C1500 760, 1280 840, 1140 780 C1040 730, 1080 480, 1180 200 Z"
            fill="#153E20"
            opacity="0.30"
          />

          {/* Top Left Organic Silhouette */}
          <path
            d="M-80 60 C80 20, 240 160, 210 320 C180 440, 40 480, -60 440 C-140 410, -180 180, -80 60 Z"
            fill="#153E20"
            opacity="0.25"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 3. MAIN FOOTER CONTENT CONTAINER                              */}
      {/* ============================================================== */}
      <div className="relative z-10 pt-8 sm:pt-12 pb-14 sm:pb-18">
        <Container size="wide">
          {/* Top Brand Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-12 sm:pb-14 border-b border-[#1E4D2A]">
            <div className="flex items-center gap-4 sm:gap-5">
              <Logo
                variant="light"
                size="lg"
                className="h-[56px] w-[50px] sm:h-[64px] sm:w-[57px]"
                priority
              />
              <div className="space-y-1">
                <span className="font-mono text-[11px] uppercase tracking-widest text-brand-primary font-semibold block">
                  Managed Farmland &bull; Professional Farm Management
                </span>
                <p className="font-sans text-xl sm:text-2xl font-medium text-[#FAF7F2] tracking-tight">
                  Earth Heritage Pvt. Ltd.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14361D] border border-[#235832] text-xs font-mono text-[#C4D1C7]">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
              <span>You own the land. We manage the farm.</span>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* B. STRUCTURED CORPORATE NAVIGATION                         */}
          {/* ---------------------------------------------------------- */}
          <div className="pt-12 sm:pt-14 pb-12 sm:pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 border-b border-[#1E4D2A]">
            {/* Column 1: Company Profile & Positioning (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-primary font-semibold">
                  Corporate Stewardship
                </span>
                <h3 className="font-sans text-xl sm:text-2xl font-medium tracking-tight text-[#FAF7F2]">
                  Earth Heritage Pvt. Ltd.
                </h3>
              </div>

              <p className="font-sans text-sm text-[#C4D1C7] leading-relaxed max-w-md">
                Earth Heritage brings together land ownership, professional farm management, nature, responsible stewardship, meaningful experiences, and long-term legacy.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#859D8C]">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#13351C] border border-[#1E4D2B]">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  Founded 2026
                </span>
                <span>You own the land. We manage the farm.</span>
              </div>
            </div>

            {/* Column 2: EXPLORE (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#FAF7F2] font-bold pb-1 border-b border-[#1E4D2A]/60">
                Explore
              </h4>
              <ul className="space-y-2.5" role="list">
                {[
                  { title: 'Home', path: '#hero' },
                  { title: 'About Earth Heritage', path: '#statement' },
                  { title: 'Managed Farmland', path: '#solution' },
                  { title: 'Farm Management', path: '#management-sequence' },
                  { title: 'How It Works', path: '#how-it-works' },
                  { title: 'Guiding Principles', path: '#principles' }
                ].map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="font-sans text-sm text-[#C4D1C7] hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                    >
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: LEARN (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#FAF7F2] font-bold pb-1 border-b border-[#1E4D2A]/60">
                Learn
              </h4>
              <ul className="space-y-2.5" role="list">
                {[
                  { title: 'Brand Philosophy', path: '#philosophy' },
                  { title: 'Operational Depth', path: '#management-sequence' },
                  { title: 'Land Care Reality', path: '#responsibility' },
                  { title: 'Leadership & Vision', path: '#founders' }
                ].map((item) => (
                  <li key={item.title}>
                    <Link
                      href={item.path}
                      className="font-sans text-sm text-[#C4D1C7] hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                    >
                      <span>{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: CONNECT (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#FAF7F2] font-bold pb-1 border-b border-[#1E4D2A]/60">
                Connect
              </h4>
              <ul className="space-y-2.5" role="list">
                {[
                  { title: 'Begin a Conversation', interest: 'General Enquiry' },
                  { title: 'Talk to Earth Heritage', interest: 'General Enquiry' },
                  { title: 'Farm Management Inquiry', interest: 'Farm Management' }
                ].map((item) => (
                  <li key={item.title}>
                    <button
                      type="button"
                      onClick={(e) => openEnquiryModal(item.interest, e.currentTarget)}
                      className="font-sans text-sm text-[#C4D1C7] hover:text-white hover:translate-x-1 transition-all duration-150 inline-flex items-center gap-1.5 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm text-left"
                    >
                      <span>{item.title}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-2 text-xs font-sans text-[#859D8C] leading-relaxed">
                Inquiries are handled directly for farmland ownership and management conversations.
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* C. OPERATIONAL DISCLAIMER & LEGAL / COPYRIGHT ROW          */}
          {/* ---------------------------------------------------------- */}
          <div className="pt-8 space-y-6">
            {/* Operational Transparency Notice */}
            <div className="p-4 rounded-xl bg-[#0E2413]/70 border border-[#1A4224] text-xs text-[#859D8C] leading-relaxed flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0 mt-1.5" />
              <p>
                <strong className="text-[#FAF7F2] font-medium">Ownership & Management Notice: </strong>
                Earth Heritage operates as a professional farm management company. Farmland ownership remains legally registered to the individual landowner. Earth Heritage provides structured agricultural management, maintenance, and operational coordination without offering guaranteed yields or financial returns.
              </p>
            </div>

            {/* Copyright and Operational Scope Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#183C20] text-xs text-[#859D8C]">
              <p className="font-sans">
                &copy; {currentYear} {companyData.name}. All rights reserved.
              </p>

              <div className="flex items-center gap-4 text-xs text-[#859D8C] font-mono">
                <span>Managed Farmland</span>
                <span className="text-[#1E4D2B]">&bull;</span>
                <span>Land Stewardship</span>
                <span className="text-[#1E4D2B]">&bull;</span>
                <span>Professional Farm Management</span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
