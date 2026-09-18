import OriginalLandingPage from '@/components/sections/landing/OriginalLandingPage';

export const metadata = {
  title: 'Managed Farmland | Earth Heritage | Own a Piece of Earth. Build a Legacy.',
  description:
    'Managed farmland and professional farm management. You own the land, Earth Heritage manages the farm for long-term stewardship and generational legacy.',
  openGraph: {
    title: 'Earth Heritage | Own a Piece of Earth. Build a Legacy.',
    description: 'You own the land. We manage the farm. Professional farm management and managed farmland solutions.'
  },
  robots: {
    index: false,
    follow: false
  }
};

/**
 * Advertising Landing Page: Managed Farmland
 * Route: /lp/managed-farmland
 * 
 * Serves the preserved original Earth Heritage landing page experience:
 * 1. HeroSection — Multi-slide cinematic hero
 * 2. BrandStatement — Living Legacy editorial bridge
 * 3. ProblemSection — Landowner responsibility
 * 4. SolutionSection — "You own the land. We manage the farm."
 * 5. ManagementSection — "What We Manage" (01 to 06)
 * 6. HowItWorksSection — 4-step process
 * 7. PhilosophySection — "BACK TO ROOTS. FORWARD WITH PURPOSE."
 * 8. PrinciplesSection — 5 Guiding Principles
 * 9. FoundersSection — Leadership & Vision
 * 10. LocationMapSection — Location & Map
 * 11. FinalCtaSection — Meaningful Next Step
 */
export default function ManagedFarmlandCampaignPage() {
  return <OriginalLandingPage />;
}
