import { constructMetadata } from '@/lib/seo';
import AboutIntro from '@/components/sections/about/AboutIntro';
import FoundersSection from '@/components/sections/about/FoundersSection';
import OwnershipManagement from '@/components/sections/about/OwnershipManagement';
import GoalsSection from '@/components/sections/about/GoalsSection';
import VisionMission from '@/components/sections/about/VisionMission';
import FaqSection from '@/components/sections/about/FaqSection';

export const metadata = {
  ...constructMetadata({
    title: 'About',
    description:
      'Earth Heritage brings together land ownership, managed farmland, professional farm management and a deeper connection with nature — creating a more thoughtful way to own and care for land.',
    canonicalUrl: '/about'
  }),
  title: 'About Earth Heritage | Managed Farmland & Farm Management'
};

/**
 * Detailed Editorial About Page (/about)
 * 
 * Flow:
 * 1. AboutIntro — Centered Editorial Intro (ABOUT EARTH HERITAGE -> Centered Title -> Description -> Large Farmland Image)
 * 2. FoundersSection — 01 Leadership & Founders (Centered header, Two journeys. One vision. Sathish Agastya & Khushi Jain)
 * 3. OwnershipManagement — 02 Ownership & Management (Centered header, You own the land. We manage the farm. + 6 Areas)
 * 4. GoalsSection — 03 Our Goals (Centered header, Built around what matters. 5 Verified Goals)
 * 5. VisionMission — 04 Vision & Mission (Centered header, Distinct strategic statements)
 * 6. FaqSection — Frequently Asked Questions (Centered header, 6 verified questions with editorial accordion)
 */
export default function AboutPage() {
  return (
    <div className="w-full bg-[#FAF6F0]">
      <AboutIntro />
      <FoundersSection />
      <OwnershipManagement />
      <GoalsSection />
      <VisionMission />
      <FaqSection />
    </div>
  );
}
