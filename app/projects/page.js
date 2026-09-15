import { constructMetadata } from '@/lib/seo';
import ProjectsHero from '@/components/sections/projects/ProjectsHero';
import ProjectsPortfolio from '@/components/sections/projects/ProjectsPortfolio';
import ProjectsCta from '@/components/sections/projects/ProjectsCta';

export const metadata = {
  ...constructMetadata({
    title: 'Projects',
    description:
      'Explore the managed farmland projects, agricultural estates, and land initiatives developed with the Earth Heritage philosophy of responsible stewardship and titled ownership.',
    canonicalUrl: '/projects'
  }),
  title: 'Projects | Earth Heritage'
};

/**
 * Dedicated Projects Listing Page (/projects)
 * 
 * Sequential Architecture:
 * 1. ProjectsHero — Editorial introduction ("Places with purpose. Land with a story.")
 * 2. ProjectsPortfolio — Clean portfolio catalog / graceful taking-shape state
 * 3. ProjectsCta — Conversational closing section with "Talk to Us" enquiry action
 */
export default function ProjectsPage() {
  return (
    <div className="w-full bg-[#F0E0C6]">
      <ProjectsHero />
      <ProjectsPortfolio />
      <ProjectsCta />
    </div>
  );
}
