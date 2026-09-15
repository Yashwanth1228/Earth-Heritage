import { constructMetadata } from '@/lib/seo';
import ManagedFarmlandIntro from '@/components/sections/managed-farmland/ManagedFarmlandIntro';
import CoreProposition from '@/components/sections/managed-farmland/CoreProposition';
import ManagementAreas from '@/components/sections/managed-farmland/ManagementAreas';
import WhyManagedFarmland from '@/components/sections/managed-farmland/WhyManagedFarmland';
import HowModelWorks from '@/components/sections/managed-farmland/HowModelWorks';
import ManagementInPractice from '@/components/sections/managed-farmland/ManagementInPractice';
import NatureResponsibility from '@/components/sections/managed-farmland/NatureResponsibility';
import WhoIsItFor from '@/components/sections/managed-farmland/WhoIsItFor';
import ManagedFarmlandFaq from '@/components/sections/managed-farmland/ManagedFarmlandFaq';
import ManagedFarmlandCta from '@/components/sections/managed-farmland/ManagedFarmlandCta';

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
 * 6. ManagementInPractice — Section 6: What Management Means in Practice (7 operational highlights)
 * 7. NatureResponsibility — Section 7: Land, Nature & Responsibility ("BACK TO ROOTS. FORWARD WITH PURPOSE.")
 * 8. WhoIsItFor — Section 8: Who Is Managed Farmland For? (5 landowner profiles)
 * 9. ManagedFarmlandFaq — Section 9: Frequently Asked Questions (8 verified questions accordion)
 * 10. ManagedFarmlandCta — Section 10: Final Closing Enquiry CTA ("Your land deserves thoughtful care.")
 */
export default function ManagedFarmlandPage() {
  return (
    <div className="w-full bg-[#FAF6F0]">
      <ManagedFarmlandIntro />
      <CoreProposition />
      <ManagementAreas />
      <WhyManagedFarmland />
      <HowModelWorks />
      <ManagementInPractice />
      <NatureResponsibility />
      <WhoIsItFor />
      <ManagedFarmlandFaq />
      <ManagedFarmlandCta />
    </div>
  );
}
