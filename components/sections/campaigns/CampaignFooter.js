import Container from '@/components/ui/Container';

/**
 * Isolated Campaign Footer
 * 
 * Strict Compliance Architecture:
 * - Official Earth Heritage ownership & management operational disclaimer
 * - Clean copyright row with verified corporate founding year (2026)
 * - Zero external navigation leaks
 */
export default function CampaignFooter() {
  return (
    <footer className="w-full bg-[#0E2413] text-[#859D8C] border-t border-[#1A4224] pt-8 pb-12 px-4 sm:px-8 mt-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Operational Transparency Disclaimer */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0B1D10] border border-[#16381F] text-xs text-[#859D8C] leading-relaxed flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-primary flex-shrink-0 mt-1.5" aria-hidden="true" />
          <p>
            <strong className="text-[#FAF7F2] font-medium">Ownership & Management Notice: </strong>
            Earth Heritage operates as a professional farm management company. Farmland ownership remains legally registered to the individual landowner. Earth Heritage coordinates agreed agricultural activities, cultivation, and ongoing property care without offering guaranteed yields or financial returns.
          </p>
        </div>

        {/* Copyright & Core Scope */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-center sm:text-left pt-2 border-t border-[#16381F]">
          <p>
            &copy; 2026 Earth Heritage Pvt. Ltd. All rights reserved.
          </p>
          <div className="text-[11px] text-[#6E8775] flex items-center gap-2">
            <span>Managed Farmland</span>
            <span aria-hidden="true">&bull;</span>
            <span>Land Stewardship</span>
            <span aria-hidden="true">&bull;</span>
            <span>Professional Farm Management</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
