import { constructMetadata } from '@/lib/seo';
import ManagedFarmlandIntro from '@/components/sections/managed-farmland/ManagedFarmlandIntro';
import CoreProposition from '@/components/sections/managed-farmland/CoreProposition';
import ManagementAreas from '@/components/sections/managed-farmland/ManagementAreas';
import WhyManagedFarmland from '@/components/sections/managed-farmland/WhyManagedFarmland';
import HowModelWorks from '@/components/sections/managed-farmland/HowModelWorks';
import ManagedFarmlandFaq from '@/components/sections/managed-farmland/ManagedFarmlandFaq';

export const metadata = {
  ...constructMetadata({
    title: 'Managed Farmland',
    description:
      'Discover managed farmland with Earth Heritage, where landowners retain ownership while agreed farm activities are professionally coordinated and managed with care.',
    canonicalUrl: '/managed-farmland'
  }),
  title: 'Managed Farmland | Earth Heritage'
};

/**
 * Dedicated Managed Farmland Page (/managed-farmland)
 * 
 * Sequential Architecture:
 * 1. ManagedFarmlandIntro — Section 1: Editorial Intro (Eyebrow, Display Heading, Description, Large Farmland Image)
 * 2. CoreProposition — Section 2: Core Proposition ("YOU OWN THE LAND. WE MANAGE THE FARM.")
 * 3. ManagementAreas — Section 3: What Does Earth Heritage Manage? (6 Management Responsibilities visual sequence)
 * 4. WhyManagedFarmland — Section 4: Why Managed Farmland? (Visual split between Ownership and Management)
 * 5. HowModelWorks — Section 5: How The Model Works (6-step editorial timeline/connector process)
 * 6. ManagedFarmlandFaq — Section 6: Frequently Asked Questions (8 verified questions accordion)
 */
export default function ManagedFarmlandPage() {
  return (
    <div className="w-full bg-[#FAF6F0]">
      <ManagedFarmlandIntro />
      <CoreProposition />
      <ManagementAreas />
      <WhyManagedFarmland />
      <HowModelWorks />
      <ManagedFarmlandFaq />
    </div>
  );
}
