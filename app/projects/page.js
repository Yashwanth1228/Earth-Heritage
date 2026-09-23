import { constructMetadata } from '@/lib/seo';
import { getProjectsCollectionSchema } from '@/lib/schema';
import { getAllProjects } from '@/data/projects';
import ProjectsHero from '@/components/sections/projects/ProjectsHero';
import ProjectsPortfolio from '@/components/sections/projects/ProjectsPortfolio';
import ProjectsCta from '@/components/sections/projects/ProjectsCta';

export const metadata = {
  ...constructMetadata({
    title: 'Our Projects',
    description:
      'Earth Heritage is preparing its first managed farmland developments. Details will be shared as each project takes shape.',
    canonicalUrl: '/projects'
  }),
  title: 'Our Projects | Earth Heritage'
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
export default function ProjectsPage() {
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
        <ProjectsPortfolio projects={confirmedProjects} />
        <ProjectsCta />
      </div>
    </>
  );
}

