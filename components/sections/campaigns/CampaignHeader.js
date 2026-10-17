'use client';

import { useState } from 'react';
import Image from 'next/image';
import Logo from '@/components/ui/Logo';
import { useEnquiry } from '@/context/EnquiryContext';
import { Menu, X, Phone, Compass, MapPin, Image as ImageIcon, Trees, Sparkles, Home, Star } from 'lucide-react';

/**
 * Isolated Campaign Header
 * 
 * Supports:
 * - 'organic-scrapbook': Handcrafted warm paper aesthetic matching the botanical journal reference
 * - 'dark': Classic dark campaign header
 */
export default function CampaignHeader({
  campaignInterest = 'Managed Farmland',
  variant = 'organic-scrapbook'
}) {
  const { openEnquiryModal } = useEnquiry();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero', icon: Home },
    { label: 'Our Stewardship', id: 'stewardship', icon: Compass },
    { label: 'Plantations', id: 'plantations', icon: Trees },
    { label: 'Amenities', id: 'amenities', icon: Sparkles },
    { label: 'Gallery', id: 'gallery', icon: ImageIcon },
    { label: 'Location', id: 'location', icon: MapPin },
    { label: 'Reviews', id: 'reviews', icon: Star },
  ];

  if (variant === 'organic-scrapbook' || variant === 'light-architectural') {
    return (
      <header className="w-full bg-[#F3EDE2]/95 backdrop-blur-md text-[#2C382E] border-b border-[#DFD7C7] py-3 sm:py-3.5 px-4 sm:px-8 sticky top-0 z-50 shadow-[0_2px_15px_rgba(80,70,50,0.04)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo & Project Brand */}
          <div className="flex items-center gap-3 sm:gap-3.5">
            <Logo variant="dark" size="md" asLink={false} />
            <span className="hidden sm:inline-block h-6 sm:h-7 w-px bg-[#D6CDBC]" aria-hidden="true" />
            <div className="hidden sm:flex items-center">
              <Image
                src="/images/campaign/nairuthya_logo.png"
                alt="Nairuthya Whispering Wood"
                width={150}
                height={42}
                className="h-7 sm:h-8 w-auto object-contain drop-shadow-xs"
                priority
              />
            </div>
          </div>

          {/* Centered Soft Paper Navigation Pills (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#EAE2D3]/70 px-2 py-1 rounded-full border border-[#DCD3C2] text-xs font-sans text-[#4A554A]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="px-3.5 py-1.5 rounded-full hover:bg-white/50 active:bg-white/70 text-[#243525] font-medium transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Walkthrough CTA and Mobile/Tablet Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="header-inquire-cta"
              type="button"
              onClick={() => scrollToSection('enquiry-form')}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wide bg-[#263828] text-white hover:bg-[#1E2E20] active:scale-[0.98] transition-all duration-200 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263828]"
            >
              <span>Book Visit</span>
              <span className="hidden sm:inline">&rarr;</span>
            </button>

            {/* Mobile & Tablet Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full bg-[#EAE2D3]/90 hover:bg-[#E2D8C6] border border-[#DCD3C2] text-[#263828] transition-colors cursor-pointer"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-[#263828]" />
              ) : (
                <Menu className="w-5 h-5 text-[#263828]" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile & Tablet Navigation Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-[#DFD7C7] mt-3 pt-3 pb-3 px-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 bg-[#F3EDE2]/98 backdrop-blur-md rounded-b-2xl shadow-lg">
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/60 hover:bg-white text-left text-xs font-medium text-[#263828] border border-[#E3DACB] transition-colors cursor-pointer"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-[#558A55] shrink-0" />
                    <span className="truncate">{link.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[#DFD7C7]/70 flex flex-col gap-2">
              <a
                href="tel:+919902096969"
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-[#DDD3C2] text-xs font-medium text-[#1E2E20] hover:bg-[#FAF8F3] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#263828]" />
                <span>Call Now: +91 99020 96969</span>
              </a>
            </div>
          </div>
        )}
      </header>
    );
  }

  return (
    <header className="w-full bg-[#102B17] text-[#FAF7F2] border-b border-[#1E4D2A] py-3 sm:py-3.5 px-4 sm:px-8 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo variant="light" size="md" asLink={false} />
          <span className="hidden md:inline-block h-4 w-px bg-[#235832]" aria-hidden="true" />
          <span className="hidden md:inline-block text-[11px] font-mono uppercase tracking-widest text-[#B88E3E]">
            Managed Farmland
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => openEnquiryModal(campaignInterest, e.currentTarget)}
            className="inline-flex items-center justify-center px-4 sm:px-6 py-2 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#F7F4EC] text-[#152B1B] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E]"
          >
            <span>Enquire Now</span>
          </button>
        </div>
      </div>
    </header>
  );
}
