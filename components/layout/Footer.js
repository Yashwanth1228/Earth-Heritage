'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { companyData } from '@/data/company';
import { useEnquiry } from '@/context/EnquiryContext';
import FooterLandscapeBackground from '@/components/layout/FooterLandscapeBackground';
import { Instagram, Linkedin, Youtube, Twitter, Facebook } from 'lucide-react';

/**
 * Premium Corporate Footer for Earth Heritage Private Limited
 * 
 * Aesthetic Direction:
 * EARTH + LAND + ROOTS + LEGACY + PREMIUM CORPORATE BRAND
 * 
 * Features:
 * 1. Deep Earth Green palette (#102B17 base)
 * 2. Compact organic transitional top boundary
 * 3. Illustrated Earth Heritage landscape background
 * 4. Prominent brand logo & full company name (Earth Heritage Private Limited)
 * 5. Clean, structured navigation hierarchy (Quick Links, Learn, Connect)
 * 6. Social media connection symbols
 * 7. White, font-medium legal policy links & copyright
 * 8. Snug top padding with no awkward dividing line below the company name
 */
export default function Footer() {
  const pathname = usePathname();
  const { openEnquiryModal } = useEnquiry();
  const isIsolatedCampaign = pathname?.startsWith('/lp') && pathname !== '/lp/managed-farmland';

  if (isIsolatedCampaign) {
    return null;
  }

  const currentYear = companyData.foundingYear || 2026;

  return (
    <footer
      data-navbar-theme="dark"
      className="relative w-full bg-[#102B17] text-[#FAF7F2] overflow-hidden select-none mt-auto"
      aria-label="Earth Heritage Corporate Footer"
    >
      {/* ============================================================== */}
      {/* 1. COMPACT ORGANIC TRANSITION BOUNDARY INTO FOOTER             */}
      {/* ============================================================== */}
      <div
        className="w-full overflow-hidden leading-none select-none pointer-events-none -mt-px"
        aria-hidden="true"
      >
        <svg
          className="w-full h-5 sm:h-7 lg:h-9 text-[#102B17] block"
          viewBox="0 0 1440 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C380,25 760,5 1100,20 C1280,28 1380,12 1440,8 L1440,30 L0,30 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* ============================================================== */}
      {/* 2. BESPOKE ILLUSTRATED EARTH HERITAGE LANDSCAPE BACKGROUND     */}
      {/* ============================================================== */}
      <FooterLandscapeBackground />

      {/* ============================================================== */}
      {/* 3. MAIN FOOTER CONTENT CONTAINER (REDUCED TOP PADDING)         */}
      {/* ============================================================== */}
      <div className="relative z-10 pt-2 sm:pt-4 pb-10 sm:pb-14">
        <Container size="wide">
          {/* Top Brand Banner: Logo + Brand Name with Private Limited below */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <Logo
                variant="light"
                size="lg"
                className="h-[52px] w-[46px] sm:h-[60px] sm:w-[54px]"
                priority
              />
              <div className="flex flex-col justify-center">
                <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-tight">
                  Earth Heritage
                </h2>
                <span className="font-sans text-xs sm:text-sm text-[#C4D1C7] font-normal tracking-wide mt-0.5">
                  Private Limited
                </span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* B. STRUCTURED CORPORATE NAVIGATION                         */}
          {/* ---------------------------------------------------------- */}
          <div className="pt-4 sm:pt-6 pb-10 sm:pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 border-b border-[#1E4D2A]">
            {/* Column 1: Company Profile & Social Links (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <p className="font-sans text-sm sm:text-[15px] text-[#C4D1C7] leading-relaxed max-w-md">
                Earth Heritage brings together land ownership, professional farm management, nature, responsible stewardship, meaningful experiences, and long-term legacy.
              </p>

              {/* Social Media Link Symbols */}
              <div className="pt-1 flex items-center gap-3" aria-label="Social media links">
                {[
                  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com' },
                  { icon: Twitter, label: 'X (Twitter)', href: 'https://x.com' },
                  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#13351C] border border-[#1E4D2B] text-[#C4D1C7] hover:text-white hover:border-brand-primary hover:bg-[#1A4224] hover:scale-105 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  >
                    <social.icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: QUICK LINKS (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-widest text-[#FAF7F2] font-bold pb-1 border-b border-[#1E4D2A]/60">
                Quick Links
              </h4>
              <ul className="space-y-2.5" role="list">
                {[
                  { title: 'Home', path: '/' },
                  { title: 'About Us', path: '/about' },
                  { title: 'Managed Farmland', path: '/managed-farmland' },
                  { title: 'Farm Management', path: '/farm-management' },
                  { title: 'How It Works', path: '/how-it-works' },
                  { title: 'Projects', path: '/projects' }
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
                  { title: 'Brand Philosophy', path: '/about#philosophy' },
                  { title: 'Operational Scope', path: '/managed-farmland' },
                  { title: 'How It Works', path: '/how-it-works' },
                  { title: 'Leadership & Story', path: '/about#founders' }
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
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* C. COPYRIGHT & PRIVACY / TERMS POLICY ROW (WHITE, MEDIUM)  */}
          {/* ---------------------------------------------------------- */}
          <div className="pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-white">
              <p className="font-sans tracking-wide">
                &copy; {currentYear} Earth Heritage Private Limited. All rights reserved.
              </p>

              {/* Privacy Policy and Legal Links (White, font-medium) */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-white font-sans">
                <Link href="/privacy-policy" className="hover:text-brand-primary transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-white/60" aria-hidden="true">&bull;</span>
                <Link href="/terms" className="hover:text-brand-primary transition-colors">
                  Terms of Service
                </Link>
                <span className="text-white/60" aria-hidden="true">&bull;</span>
                <Link href="/disclaimer" className="hover:text-brand-primary transition-colors">
                  Legal Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
