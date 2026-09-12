import HeroSection from '@/components/sections/landing/HeroSection';
import BrandStatement from '@/components/sections/landing/BrandStatement';
import ProblemSection from '@/components/sections/landing/ProblemSection';
import SolutionSection from '@/components/sections/landing/SolutionSection';
import ManagementSection from '@/components/sections/landing/ManagementSection';
import HowItWorksSection from '@/components/sections/landing/HowItWorksSection';
import PhilosophySection from '@/components/sections/landing/PhilosophySection';
import PrinciplesSection from '@/components/sections/landing/PrinciplesSection';
import FoundersSection from '@/components/sections/landing/FoundersSection';
import FinalCtaSection from '@/components/sections/landing/FinalCtaSection';

export const metadata = {
  title: 'Earth Heritage | Own a Piece of Earth. Build a Legacy.',
  description: 'Managed farmland and professional farm management. You own the land, Earth Heritage manages the farm for long-term stewardship and generational legacy.',
  openGraph: {
    title: 'Earth Heritage | Own a Piece of Earth. Build a Legacy.',
    description: 'You own the land. We manage the farm. Professional farm management and managed farmland solutions.'
  }
};

/**
 * Earth Heritage Corporate Landing Page Experience (/)
 * 
 * Progression:
 * 1. HeroSection — The Signature Moment
 * 2. BrandStatement — Editorial Emotional Bridge
 * 3. ProblemSection — The Ownership Reality
 * 4. SolutionSection — The Core Proposition ("You own the land. We manage the farm.")
 * 5. ManagementSection — "What We Manage" (01 to 06 Operational Sequence)
 * 6. HowItWorksSection — 4-Step Process (Own -> Manage -> Cultivate -> Thrive)
 * 7. PhilosophySection — Visual Pause ("BACK TO ROOTS. FORWARD WITH PURPOSE.")
 * 8. PrinciplesSection — Why Earth Heritage (5 Guiding Principles)
 * 9. FoundersSection — Leadership & Vision (Sathish Agastya & Khushi Jain)
 * 10. FinalCtaSection — Meaningful Next Step
 */
export default function LandingPage() {
  return (
    <div className="w-full">
      <HeroSection />
      <BrandStatement />
      <ProblemSection />
      <SolutionSection />
      <ManagementSection />
      <HowItWorksSection />
      <PhilosophySection />
      <PrinciplesSection />
      <FoundersSection />
      <FinalCtaSection />
    </div>
  );
}
