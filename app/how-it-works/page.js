import { constructMetadata } from '@/lib/seo';
import HowItWorksIntro from '@/components/sections/how-it-works/HowItWorksIntro';
import ProcessJourney from '@/components/sections/how-it-works/ProcessJourney';
import OwnershipReminder from '@/components/sections/how-it-works/OwnershipReminder';
import ResponsibleCare from '@/components/sections/how-it-works/ResponsibleCare';
import HowItWorksFaq from '@/components/sections/how-it-works/HowItWorksFaq';
import HowItWorksCta from '@/components/sections/how-it-works/HowItWorksCta';

export const metadata = {
  ...constructMetadata({
    title: 'How It Works',
    description:
      'Explore the six-stage process of Earth Heritage managed farmland — from understanding the land and farm planning to field operations, ongoing cultivation, and harvest coordination.',
    canonicalUrl: '/how-it-works'
  }),
  title: 'How It Works | Earth Heritage'
};

/**
 * Dedicated How It Works Page (/how-it-works)
 * 
 * Sequential Architecture:
 * 1. HowItWorksIntro — Section 1: Editorial Introduction (White Background)
 * 2. ProcessJourney — Section 2: Six-Stage Centerpiece (Warm Biscuit Background)
 * 3. OwnershipReminder — Section 3: Two-Column Split Reminder (White Background)
 * 4. ResponsibleCare — Section 4: Brand Philosophy Panorama ("BACK TO ROOTS. FORWARD WITH PURPOSE.")
 * 5. HowItWorksFaq — Section 5: Six Verified FAQs (Warm Biscuit Background)
 * 6. HowItWorksCta — Section 6: Final Closing CTA (White Background)
 */
export default function HowItWorksPage() {
  return (
    <div className="w-full bg-[#FAF6F0]">
      <HowItWorksIntro />
      <ProcessJourney />
      <OwnershipReminder />
      <ResponsibleCare />
      <HowItWorksFaq />
      <HowItWorksCta />
    </div>
  );
}
