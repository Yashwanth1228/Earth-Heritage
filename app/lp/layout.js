import CampaignLayoutShell from '@/components/sections/campaigns/CampaignLayoutShell';

export const metadata = {
  title: {
    template: '%s | Earth Heritage',
    default: 'Earth Heritage Campaign'
  }
};

/**
 * Isolated Campaign Layout (/lp/...)
 * 
 * Provides an isolated, distraction-free shell for advertising and campaign landing pages.
 * Delegated to CampaignLayoutShell to pass through preserved original landing pages
 * while isolating new campaign landing pages.
 */
export default function CampaignLayout({ children }) {
  return <CampaignLayoutShell>{children}</CampaignLayoutShell>;
}
