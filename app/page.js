import HomeHero from '@/components/sections/home/HomeHero';
import HomeAbout from '@/components/sections/home/HomeAbout';
import HomeManagedFarmland from '@/components/sections/home/HomeManagedFarmland';
import HomeHowItWorks from '@/components/sections/home/HomeHowItWorks';
import HomeStories from '@/components/sections/home/HomeStories';
import HomeEvents from '@/components/sections/home/HomeEvents';
import HomeFaq from '@/components/sections/home/HomeFaq';
import HomeContactLocation from '@/components/sections/home/HomeContactLocation';

export const metadata = {
  title: 'Earth Heritage | Own a Piece of Earth. Build a Legacy.',
  description:
    'Earth Heritage brings together land ownership and dedicated agricultural management. Own a piece of earth and build a generational legacy with professional farm care.',
  openGraph: {
    title: 'Earth Heritage | Own a Piece of Earth. Build a Legacy.',
    description:
      'You own the land. We manage the farm. Professional farm management and managed farmland solutions designed for long-term stewardship.',
    url: 'https://earthheritage.in'
  }
};

/**
 * Earth Heritage Main Corporate Home Page (/)
 * 
 * Distinctive 8-Section Brand Homepage & Corporate Overview:
 * 01. HomeHero — Asymmetric editorial hero with large typography & framed landscape visual
 * 02. HomeAbout — Editorial company introduction ("Living Legacy", vision, story CTA)
 * 03. HomeManagedFarmland — Core offering overview with 6 confirmed operational scopes
 * 04. HomeHowItWorks — 5-phase visual sequence (OWN -> MANAGE -> CULTIVATE -> CARE -> CONTINUE)
 * 05. HomeStories — Authentic visual storytelling, field perspectives & documentary preview
 * 06. HomeEvents — Community moments, harvest walks, and estate visits linking to /events
 * 07. HomeFaq — 5 essential first-visit questions with smooth accessible accordion
 * 08. HomeContactLocation — Editorial split: Direct on-page enquiry form + official Google Maps embed
 */
export default function HomePage() {
  return (
    <div className="w-full">
      <HomeHero />
      <HomeAbout />
      <HomeManagedFarmland />
      <HomeHowItWorks />
      <HomeStories />
      <HomeEvents />
      <HomeFaq />
      <HomeContactLocation />
    </div>
  );
}
