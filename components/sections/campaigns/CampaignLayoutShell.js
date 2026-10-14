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
 * 
 * For /lp/nairuthya-whispering-wood, it renders the bespoke light-architectural
 * header and suppresses CampaignFooter so the authentic global corporate footer renders.
 */
export default function CampaignLayoutShell({ children }) {
  const pathname = usePathname();
  const isOriginalLanding = pathname === '/lp/managed-farmland';

  if (isOriginalLanding) {
    return children;
  }

  const isNairuthyaCampaign = pathname === '/lp/nairuthya-whispering-wood';

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-text-primary antialiased">
      <CampaignHeader
        campaignInterest={isNairuthyaCampaign ? 'Nairuthya Whispering Wood' : 'Land Ownership'}
        variant={isNairuthyaCampaign ? 'organic-scrapbook' : 'dark'}
      />
      <div className="flex-1 w-full">
        {children}
      </div>
      {isNairuthyaCampaign ? null : <CampaignFooter />}
    </div>
  );
}
