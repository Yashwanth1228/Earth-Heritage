import { constructMetadata } from '@/lib/seo';
import { getProjectsCollectionSchema } from '@/lib/schema';
import { getAllProjects } from '@/data/projects';
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
 * 1. JSON-LD CollectionPage Structured Data
 * 2. ProjectsHero — Editorial introduction ("Places with purpose. Land with a story.")
 * 3. ProjectsPortfolio — Clean portfolio catalog / graceful taking-shape state
 * 4. ProjectsCta — Conversational closing section with "Talk to Us" enquiry action
 */
export default function ProjectsPage() {
  const allProjects = getAllProjects();
  const collectionSchema = getProjectsCollectionSchema(allProjects);

  return (
    <>
      {/* CollectionPage Schema for /projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="w-full bg-[#FAF6F0]">
        <ProjectsHero />
        <ProjectsPortfolio projects={allProjects} />
        <ProjectsCta />
      </div>
    </>
  );
}

