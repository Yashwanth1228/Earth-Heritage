'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { companyData } from '@/data/company';
import FooterLandscapeBackground from '@/components/layout/FooterLandscapeBackground';
import FooterGrassBoundary from '@/components/layout/FooterGrassBoundary';
import { Instagram, Linkedin, Youtube, Facebook, MapPin, Phone, Mail } from 'lucide-react';

/**
 * Premium Corporate Footer for Earth Heritage Private Limited
 * 
 * Aesthetic Direction:
 * EARTH + LAND + ROOTS + LEGACY + PREMIUM CORPORATE BRAND
 * 
 * Features:
 * 1. Deep Earth Green palette (#102B17 base)
 * 2. Organic meadow grass silhouette boundary into footer
 * 3. Illustrated Earth Heritage landscape background
 * 4. Prominent brand logo & full company name (Earth Heritage Pvt. Ltd.)
 * 5. Clean, structured navigation hierarchy (Quick Links, Learn, Connect with Address, Phone, Email)
 * 6. Official social media connection symbols
 * 7. Prominent, comfortable legal policy link & copyright with WhatsApp button clearance
 * 8. Snug top padding with natural agrarian grass border
 */
export default function Footer() {
  const pathname = usePathname();
  const isIsolatedCampaign = pathname?.startsWith('/lp') && pathname !== '/lp/managed-farmland';

  if (isIsolatedCampaign) {
    return null;
  }

  const currentYear = companyData.foundingYear || 2026;

  return (
    <footer
      data-navbar-theme="light"
      className="relative w-full select-none mt-auto"
      aria-label="Earth Heritage Corporate Footer"
    >
      {/* ============================================================== */}
      {/* 1. ORGANIC MEADOW GRASS SILHOUETTE TRANSITION INTO FOOTER      */}
      {/* ============================================================== */}
      <FooterGrassBoundary />

      {/* ============================================================== */}
      {/* 2. SOLID FOOTER BODY (#102B17) WITH LANDSCAPE BACKGROUND       */}
      {/* ============================================================== */}
      <div className="relative w-full bg-[#102B17] text-[#FAF7F2] overflow-hidden">
        <FooterLandscapeBackground />

        {/* 3. MAIN FOOTER CONTENT CONTAINER */}
        <div className="relative z-10 pt-2 sm:pt-4 pb-10 sm:pb-14">
        <Container size="wide">
          {/* Top Brand Banner: Logo + Brand Name with "Back to Roots" tagline below */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 sm:pb-6">
            <div className="flex items-center gap-4 sm:gap-5">
              <Logo
                variant="light"
                size="lg"
                className="h-[52px] w-[46px] sm:h-[60px] sm:w-[54px]"
                priority
              />
              <div className="flex flex-col justify-center">
                <h2 className="font-sans text-xl sm:text-2xl lg:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-tight flex items-baseline flex-wrap gap-x-2">
                  <span>Earth Heritage</span>
                  <span className="text-sm sm:text-base lg:text-lg font-normal text-[#C4D1C7] tracking-normal">
                    Pvt. Ltd.
                  </span>
                </h2>
                <span className="font-sans text-xs sm:text-sm text-[#C4D1C7] font-normal tracking-wide mt-0.5">
                  Back to Roots
                </span>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* B. STRUCTURED CORPORATE NAVIGATION                         */}
          {/* ---------------------------------------------------------- */}
          <div className="pt-4 sm:pt-6 pb-10 sm:pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 border-b border-[#1E4D2A]">
            {/* Column 1: Company Profile & Social Links (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <p className="font-sans text-sm sm:text-[15px] text-[#C4D1C7] leading-relaxed max-w-md">
                Earth Heritage brings together land ownership, professional farm management, nature, responsible stewardship, meaningful experiences, and long-term legacy.
              </p>

              {/* Social Media Link Symbols */}
              <div className="pt-1 flex items-center gap-3" aria-label="Social media links">
                {[
                  {
                    icon: Instagram,
                    label: 'Instagram',
                    href: 'https://www.instagram.com/earthheritages?stkn=eWI5NnZ2OTdqM3Jt&utm_source=qr'
                  },
                  {
                    icon: Linkedin,
                    label: 'LinkedIn',
                    href: 'https://www.linkedin.com/company/earthheritage/'
                  },
                  {
                    icon: Facebook,
                    label: 'Facebook',
                    href: 'https://www.facebook.com/share/1FEyYWmhmn/'
                  },
                  {
                    icon: Youtube,
                    label: 'YouTube',
                    href: 'https://youtube.com/@earthheritage?si=gqlnshFzsb2mNeC8'
                  }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#13351C] border border-[#1E4D2B] text-[#C4D1C7] hover:bg-[#55C40D] hover:border-[#55C40D] hover:text-[#0E2413] hover:scale-110 shadow-xs hover:shadow-[0_4px_14px_rgba(85,196,13,0.35)] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  >
                    <social.icon className="w-4 h-4" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: QUICK LINKS (2 cols) */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-mono text-[15px] sm:text-base uppercase tracking-wider text-[#FAF7F2] font-bold pb-1.5 border-b border-[#1E4D2A]/80">
                Quick Links
              </h4>
              <ul className="space-y-2.5" role="list">
                {[
                  { title: 'Home', path: '/' },
                  { title: 'About Us', path: '/about' },
                  { title: 'Managed Farmland', path: '/managed-farmland' },
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

            {/* Column 3: EXPLORE (2 cols) — Gallery, Blogs, Events */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-mono text-[15px] sm:text-base uppercase tracking-wider text-[#FAF7F2] font-bold pb-1.5 border-b border-[#1E4D2A]/80">
                Explore
              </h4>
              <ul className="space-y-2.5" role="list">
                {[
                  { title: 'Gallery', path: '/gallery' },
                  { title: 'Blogs', path: '/blogs' },
                  { title: 'Events', path: '/events' }
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

            {/* Column 4: CONNECT (4 cols) — Address, Phone, Email */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="font-mono text-[15px] sm:text-base uppercase tracking-wider text-[#FAF7F2] font-bold pb-1.5 border-b border-[#1E4D2A]/80">
                Connect
              </h4>
              <ul className="space-y-3 font-sans text-sm text-[#C4D1C7]" role="list">
                <li className="flex items-start gap-2.5 leading-relaxed">
                  <MapPin className="w-4 h-4 text-[#7BD43E] shrink-0 mt-1" aria-hidden="true" />
                  <address className="not-italic text-[#C4D1C7]">
                    No. 4, 5, 6, BBMP Khata, Samruddi No. 3, No. 565/769, Gidadakonenahalli Main Road, Nagarbhavi, Bengaluru, Karnataka 560091
                  </address>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#7BD43E] shrink-0" aria-hidden="true" />
                  <a href="tel:+919902096969" className="hover:text-white transition-colors">
                    +91 99020 96969
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#7BD43E] shrink-0" aria-hidden="true" />
                  <a href="mailto:earthheritageit@gmail.com" className="hover:text-white transition-colors break-all">
                    earthheritageit@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          {/* C. COPYRIGHT & PRIVACY POLICY ROW (LARGER FONT & CLEARANCE)*/}
          {/* ---------------------------------------------------------- */}
          <div className="pt-8 pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm sm:text-base font-medium text-white pr-20 sm:pr-24 lg:pr-28">
              <p className="font-sans tracking-wide">
                &copy; {currentYear} Earth Heritage Private Limited. All rights reserved.
              </p>

              {/* Privacy Policy Legal Link (Enlarged font, clear of floating WhatsApp button) */}
              <div className="flex items-center">
                <Link
                  href="/privacy-policy"
                  className="hover:text-brand-primary transition-colors underline underline-offset-4 decoration-white/40 hover:decoration-brand-primary"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
      </div>
    </footer>
  );
}
