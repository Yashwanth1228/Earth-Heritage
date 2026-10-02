import { constructMetadata } from '@/lib/seo';
import { getProjectsCollectionSchema } from '@/lib/schema';
import { getAllProjects } from '@/data/projects';
import ProjectsHero from '@/components/sections/projects/ProjectsHero';
import ProjectsPortfolio from '@/components/sections/projects/ProjectsPortfolio';
import ProjectsCta from '@/components/sections/projects/ProjectsCta';

export const metadata = {
  ...constructMetadata({
    title: 'Projects | Earth Heritage Pvt. Ltd.',
    description:
      'Explore Earth Heritage managed farmland projects, developed with purpose and cared for through thoughtful farm management.',
    canonicalUrl: '/projects',
    exactTitle: true
  }),
  title: 'Projects | Earth Heritage Pvt. Ltd.'
};

/**
 * Dedicated Projects Listing Page (/projects)
 * 
 * Sequential Architecture:
 * 1. JSON-LD CollectionPage Structured Data
 * 2. ProjectsHero — Intentional early-stage corporate introduction ("The first chapters are taking shape.")
 * 3. ProjectsPortfolio — Monumental editorial "PROJECTS · 2026 / COMING SOON" exhibition
 * 4. ProjectsCta — Conversational closing section with "Talk to Us" enquiry action
 */
export default async function ProjectsPage({ searchParams }) {
  const resolvedParams = await searchParams;
  const initialStatus = resolvedParams?.status || 'all';
  const allProjects = getAllProjects();
  // Filter out demo/concept entries so only real confirmed projects appear publicly
  const confirmedProjects = (allProjects || []).filter((p) => p && !p.isDemo);
  const collectionSchema = getProjectsCollectionSchema(confirmedProjects);

  return (
    <>
      {/* CollectionPage Schema for /projects */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="w-full bg-[#FAF6F0]">
        <ProjectsHero />
        <ProjectsPortfolio projects={confirmedProjects} initialStatus={initialStatus} />
        <ProjectsCta />
      </div>
    </>
  );
}

