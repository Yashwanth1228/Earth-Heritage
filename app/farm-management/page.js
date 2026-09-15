import { constructMetadata } from '@/lib/seo';
import FarmManagementIntro from '@/components/sections/farm-management/FarmManagementIntro';
import ManagementActivities from '@/components/sections/farm-management/ManagementActivities';
import ManagementCycle from '@/components/sections/farm-management/ManagementCycle';
import PeopleAndLand from '@/components/sections/farm-management/PeopleAndLand';
import ResponsibleCare from '@/components/sections/farm-management/ResponsibleCare';
import ManagementFlow from '@/components/sections/farm-management/ManagementFlow';
import OwnershipReminder from '@/components/sections/farm-management/OwnershipReminder';
import FarmManagementCta from '@/components/sections/farm-management/FarmManagementCta';

export const metadata = {
  ...constructMetadata({
    title: 'Farm Management Services',
    description:
      'Explore how Earth Heritage approaches farm management through coordinated planning, manpower, cultivation, maintenance, farm operations and harvest management.',
    canonicalUrl: '/farm-management'
  }),
  title: 'Farm Management Services | Earth Heritage'
};

/**
 * Dedicated Farm Management Page (/farm-management)
 * 
 * Sequential Architecture:
 * 1. FarmManagementIntro — Section 1: Editorial Intro (Eyebrow, Display Heading, Description, Large Farmland Image)
 * 2. ManagementActivities — Section 2: What Farm Management Involves (Editorial narrative + 6-activity vertical sequence)
 * 3. ManagementCycle — Section 3: The Management Cycle (Continuous 7-stage stewardship cycle)
 * 4. PeopleAndLand — Section 4: People + Land (Collaborative stewardship, field teams & photography)
 * 5. ResponsibleCare — Section 5: Responsible Farm Care (Soil vitality, natural cycles, panoramic visual)
 * 6. ManagementFlow — Section 6: How the Activities Connect (Interconnected operational chain)
 * 7. OwnershipReminder — Section 7: Ownership + Management Reminder ("You own the land. We manage the farm.")
 * 8. FarmManagementCta — Section 8: Final Enquiry CTA ("Let's talk about your farmland.")
 */
export default function FarmManagementPage() {
  return (
    <div className="w-full bg-[#FAF6F0]">
      <FarmManagementIntro />
      <ManagementActivities />
      <ManagementCycle />
      <PeopleAndLand />
      <ResponsibleCare />
      <ManagementFlow />
      <OwnershipReminder />
      <FarmManagementCta />
    </div>
  );
}
