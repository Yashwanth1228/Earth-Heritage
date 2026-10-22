import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/data/projects';
import NairuthyaCampaignClient from '@/components/sections/campaigns/NairuthyaCampaignClient';
import NairuthyaMetaPixel from '@/components/sections/campaigns/NairuthyaMetaPixel';

export const metadata = {
  title: 'Nairuthya Whispering Wood | Managed Farmland in Nelamangala | Earth Heritage',
  description:
    'Explore Nairuthya Whispering Wood by Earth Heritage: an 8-acre managed farmland enclave in Honnasandra, Nelamangala with titled plot ownership, timber plantations, and comprehensive farm management.',
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    title: 'Nairuthya Whispering Wood | Managed Farmland | Earth Heritage',
    description:
      '8-acre managed farmland enclave in Honnasandra, Nelamangala (~35 km from Bengaluru). Titled plot ownership, timber plantations, and professional farm care.',
  images: [
    {
      url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood/hero.jpg',
      width: 1200,
      height: 630,
      alt: 'Nairuthya Whispering Wood farmland landscape in Honnasandra'
    }
  ],
  locale: 'en_IN',
  type: 'website'
}
};

/**
 * Dedicated Google Ads Campaign Landing Page: Nairuthya Whispering Wood
 * Route: /lp/nairuthya-whispering-wood
 * 
 * Strict Advertising Standards:
 * - Content renders immediately; zero automatic popups or modal overlays.
 * - Embedded enquiry form with direct API submission to Supabase + Resend notification.
 * - All primary CTAs (including header CTA) smoothly scroll to #enquiry-form anchor.
 * - Isolated from main corporate navigation and festival popups.
 * - Displays verified project highlights, genuine photography, plantations, amenities, location, and FAQs.
 * - Complies with advertising truth-in-advertising guidelines (no unverified pricing or plot counts).
 */
export default function NairuthyaWhisperingWoodCampaignPage() {
  const project = getProjectBySlug('nairuthya-whispering-wood');

  if (!project) {
    notFound();
  }

  // Filter out pricing and plot-availability FAQs until officially verified for ad creative
  const verifiedFaqs = (project.faqs || []).filter(
    (item) =>
      !item.question.toLowerCase().includes('price') &&
      !item.question.toLowerCase().includes('available') &&
      !item.answer.toLowerCase().includes('₹')
  );

  const campaignProject = {
    ...project,
    faqs: verifiedFaqs
  };

  return (
    <>
      <NairuthyaMetaPixel />
      <NairuthyaCampaignClient project={campaignProject} />
    </>
  );
}

