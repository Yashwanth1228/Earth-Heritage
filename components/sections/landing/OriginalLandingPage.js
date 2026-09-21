import ManagedFarmlandHero from '@/components/sections/landing/ManagedFarmlandHero';
import BrandStatement from '@/components/sections/landing/BrandStatement';
import ProblemSection from '@/components/sections/landing/ProblemSection';
import SolutionSection from '@/components/sections/landing/SolutionSection';
import ManagementSection from '@/components/sections/landing/ManagementSection';
import HowItWorksSection from '@/components/sections/landing/HowItWorksSection';
import PhilosophySection from '@/components/sections/landing/PhilosophySection';
import PrinciplesSection from '@/components/sections/landing/PrinciplesSection';
import FoundersSection from '@/components/sections/landing/FoundersSection';
import LocationMapSection from '@/components/sections/landing/LocationMapSection';
import FinalCtaSection from '@/components/sections/landing/FinalCtaSection';

/**
 * Original Earth Heritage Landing Page Experience
 * 
 * Preserved source of truth representing the complete cinematic landing page:
 * 1. ManagedFarmlandHero — Dedicated Art-Directed Hero for /lp/managed-farmland
 * 2. BrandStatement — Editorial Emotional Bridge ("A Living Legacy")
 * 3. ProblemSection — The Ownership Reality
 * 4. SolutionSection — The Core Proposition ("You own the land. We manage the farm.")
 * 5. ManagementSection — "What We Manage" (01 to 06 Operational Sequence)
 * 6. HowItWorksSection — 4-Step Process (Own -> Manage -> Cultivate -> Thrive)
 * 7. PhilosophySection — Visual Pause ("BACK TO ROOTS. FORWARD WITH PURPOSE.")
 * 8. PrinciplesSection — Why Earth Heritage (5 Guiding Principles)
 * 9. FoundersSection — Leadership & Vision (Sathish Agastya & Khushi Jain)
 * 10. LocationMapSection — Google Maps Location ("Come closer to where it begins.")
 * 11. FinalCtaSection — Meaningful Next Step ("Have farmland that deserves to be cared for?")
 */
export default function OriginalLandingPage() {
  return (
    <div className="w-full">
      <ManagedFarmlandHero />
      <BrandStatement />
      <ProblemSection />
      <SolutionSection />
      <ManagementSection />
      <HowItWorksSection />
      <PhilosophySection />
      <PrinciplesSection />
      <FoundersSection />
      <LocationMapSection />
      <FinalCtaSection />
    </div>
  );
}
