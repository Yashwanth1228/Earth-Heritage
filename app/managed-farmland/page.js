import { constructMetadata } from '@/lib/seo';
import ManagedFarmlandIntro from '@/components/sections/managed-farmland/ManagedFarmlandIntro';
import CoreProposition from '@/components/sections/managed-farmland/CoreProposition';
import ManagementAreas from '@/components/sections/managed-farmland/ManagementAreas';
import WhyManagedFarmland from '@/components/sections/managed-farmland/WhyManagedFarmland';
import HowModelWorks from '@/components/sections/managed-farmland/HowModelWorks';
import ManagedFarmlandProjects from '@/components/sections/managed-farmland/ManagedFarmlandProjects';
import ManagedFarmlandFaq from '@/components/sections/managed-farmland/ManagedFarmlandFaq';

export const metadata = constructMetadata({
  title: 'Managed Farmland in Bangalore',
  description:
    'Explore managed farmland with Earth Heritage in the Bangalore region. Retain land ownership while agreed farm activities are coordinated with care.',
  canonicalUrl: '/managed-farmland'
});

/**
 * Dedicated Managed Farmland Page (/managed-farmland)
 * 
 * Sequential Architecture:
 * 1. ManagedFarmlandIntro — Section 1: Editorial Intro (Eyebrow, Display Heading, Description, Large Farmland Image)
 * 2. CoreProposition — Section 2: Core Proposition ("YOU OWN THE LAND. WE MANAGE THE FARM.")
 * 3. ManagementAreas — Section 3: What Does Earth Heritage Manage? (6 Management Responsibilities visual sequence)
 * 4. WhyManagedFarmland — Section 4: Why Managed Farmland? (Visual split between Ownership and Management)
 * 5. HowModelWorks — Section 5: How The Model Works (6-step editorial timeline/connector process)
 * 6. ManagedFarmlandProjects — Section 6: Managed Farmland in Practice (Nairuthya Whispering Wood & Coconut Garden)
 * 7. ManagedFarmlandFaq — Section 7: Frequently Asked Questions (8 verified questions accordion)
 */
export default function ManagedFarmlandPage() {
  return (
    <div className="w-full bg-[#FAF6F0]">
      <ManagedFarmlandIntro />
      <CoreProposition />
      <ManagementAreas />
      <WhyManagedFarmland />
      <HowModelWorks />
      <ManagedFarmlandProjects />
      <ManagedFarmlandFaq />
    </div>
  );
}
