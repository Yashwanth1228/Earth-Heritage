import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Terms & Conditions | Earth Heritage Pvt. Ltd.',
  description: 'Terms & Conditions for Earth Heritage Pvt. Ltd.',
  alternates: {
    canonical: '/privacy-policy#terms'
  }
};

export default function TermsPage() {
  redirect('/privacy-policy#terms');
}
