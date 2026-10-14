'use client';

import Logo from '@/components/ui/Logo';
import { useEnquiry } from '@/context/EnquiryContext';

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

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (variant === 'organic-scrapbook' || variant === 'light-architectural') {
    return (
      <header className="w-full bg-[#F3EDE2]/95 backdrop-blur-md text-[#2C382E] border-b border-[#DFD7C7] py-3.5 px-4 sm:px-8 sticky top-0 z-40 shadow-[0_2px_15px_rgba(80,70,50,0.04)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo with gentle botanical leaf touch */}
          <div className="flex items-center gap-3">
            <Logo variant="dark" size="sm" asLink={false} />
            <span className="hidden sm:inline-block h-4 w-px bg-[#D6CDBC]" aria-hidden="true" />
            <div className="hidden sm:flex flex-col">
              <span className="text-[12px] font-serif font-medium tracking-wide text-[#263828]">
                Nairuthya Whispering Wood
              </span>
              <span className="text-[10px] font-sans text-[#786E5E]">
                8-Acre Managed Farmland &bull; Honnasandra
              </span>
            </div>
          </div>

          {/* Centered Soft Paper Navigation Pills (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-[#EAE2D3]/70 px-2 py-1 rounded-full border border-[#DCD3C2] text-xs font-sans text-[#4A554A]">
            <button
              type="button"
              onClick={() => scrollToSection('hero')}
              className="px-3.5 py-1.5 rounded-full bg-[#BDCABA]/70 text-[#243525] font-medium transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('stewardship')}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/50 transition-colors cursor-pointer"
            >
              Our Stewardship
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('holdings')}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/50 transition-colors cursor-pointer"
            >
              Farmland Plots
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('perspectives')}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/50 transition-colors cursor-pointer"
            >
              Sanctuary
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('location')}
              className="px-3.5 py-1.5 rounded-full hover:bg-white/50 transition-colors cursor-pointer"
            >
              Location
            </button>
          </nav>

          {/* Right Action: Dark Olive Scrapbook Pill Button */}
          <div className="flex items-center gap-3">
            <button
              id="header-inquire-cta"
              type="button"
              onClick={() => scrollToSection('enquiry-form')}
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-medium tracking-wide bg-[#263828] text-white hover:bg-[#1E2E20] active:scale-[0.98] transition-all duration-200 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#263828]"
            >
              <span>Book a Walkthrough &rarr;</span>
            </button>
          </div>

        </div>
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
