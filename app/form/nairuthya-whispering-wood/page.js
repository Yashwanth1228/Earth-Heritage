import NairuthyaLeadCaptureForm from '@/components/sections/campaigns/NairuthyaLeadCaptureForm';

export const metadata = {
  title: 'Site Visit Enquiry | Nairuthya Whispering Wood | Earth Heritage',
  description:
    'Enquire about Nairuthya Whispering Wood managed farmland by Earth Heritage and schedule a site visit.',
  robots: {
    index: false,
    follow: false
  },
  openGraph: {
    title: 'Site Visit Enquiry | Nairuthya Whispering Wood | Earth Heritage',
    description:
      'Enquire about Nairuthya Whispering Wood managed farmland by Earth Heritage and schedule a site visit.',
    images: [
      {
        url: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'Nairuthya Whispering Wood Site Visit Enquiry'
      }
    ],
    locale: 'en_IN',
    type: 'website'
  }
};

/**
 * Dedicated Public Form Route: Nairuthya Whispering Wood
 * Path: /form/nairuthya-whispering-wood
 *
 * Strict Compliance:
 * - Submits directly to POST /api/nairuthya-enquiries via submitNairuthyaEnquiry.
 * - Redirects to /lp/nairuthya-whispering-wood ONLY upon confirmed database insertion.
 * - Displays clear error states upon submission failure without redirecting.
 * - ZERO analytics/tracking scripts (No Meta Pixel, No GTM, No GA).
 */
export default function NairuthyaFormPage() {
  return <NairuthyaLeadCaptureForm />;
}
