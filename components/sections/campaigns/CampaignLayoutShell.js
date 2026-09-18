'use client';

import { usePathname } from 'next/navigation';
import CampaignHeader from '@/components/sections/campaigns/CampaignHeader';
import CampaignFooter from '@/components/sections/campaigns/CampaignFooter';

/**
 * Campaign Layout Shell
 * 
 * Selectively renders the isolated campaign header and footer for dedicated
 * advertising campaigns (such as /lp/land-ownership).
 * 
 * For /lp/managed-farmland (the preserved original landing page), it passes
 * through children cleanly so the original corporate header, footer, and
 * floating controls (configured in RootLayout) provide the complete original experience.
 */
export default function CampaignLayoutShell({ children }) {
  const pathname = usePathname();
  const isOriginalLanding = pathname === '/lp/managed-farmland';

  if (isOriginalLanding) {
    return children;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-text-primary antialiased">
      <CampaignHeader campaignInterest="Land Ownership" />
      <div className="flex-1 w-full">
        {children}
      </div>
      <CampaignFooter />
    </div>
  );
}
