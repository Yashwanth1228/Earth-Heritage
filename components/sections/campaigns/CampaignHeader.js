'use client';

import Logo from '@/components/ui/Logo';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * Isolated Campaign Header
 * 
 * Strict Conversion Architecture:
 * - Official Earth Heritage brand logo (non-link to prevent accidental funnel drop-off)
 * - Focused "Enquire Now" conversion CTA opening the global modal
 * - Zero multi-page navigation links (no About, Projects, Gallery, etc.)
 */
export default function CampaignHeader({ campaignInterest = 'Managed Farmland' }) {
  const { openEnquiryModal } = useEnquiry();

  return (
    <header className="w-full bg-[#102B17] text-[#FAF7F2] border-b border-[#1E4D2A] py-3 sm:py-3.5 px-4 sm:px-8 sticky top-0 z-40 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo without external link */}
        <div className="flex items-center gap-3">
          <Logo variant="light" size="md" asLink={false} />
          <span className="hidden md:inline-block h-4 w-px bg-[#235832]" aria-hidden="true" />
          <span className="hidden md:inline-block text-[11px] font-mono uppercase tracking-widest text-[#B88E3E]">
            Managed Farmland
          </span>
        </div>

        {/* Focused Campaign Action */}
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
