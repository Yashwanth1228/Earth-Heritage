import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import { constructMetadata } from '@/lib/seo';
import { getProjectDetailSchema } from '@/lib/schema';
import ProjectDetailHero from '@/components/projects/ProjectDetailHero';
import ProjectDetailOverview from '@/components/projects/ProjectDetailOverview';
import ProjectDetailOwnership from '@/components/projects/ProjectDetailOwnership';
import ProjectDetailStewardship from '@/components/projects/ProjectDetailStewardship';
import ProjectDetailFeatures from '@/components/projects/ProjectDetailFeatures';
import ProjectDetailGallery from '@/components/projects/ProjectDetailGallery';
import ProjectDetailNavigation from '@/components/projects/ProjectDetailNavigation';
import ProjectDetailCta from '@/components/projects/ProjectDetailCta';

/**
 * Generate SEO metadata for dynamic project detail page
 * Derives exclusively from verified project data without invented claims
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams?.slug);

  if (!project) {
    return {
      title: 'Project Not Found | Earth Heritage'
    };
  }

  const projectDescription =
    project.shortDescription ||
    project.tagline ||
    project.overview ||
    project.description ||
    'An agricultural initiative managed with the Earth Heritage philosophy of titled ownership and active stewardship.';

  // If the project has a verified hero image, use it for OG/Twitter; otherwise omit image
  const heroImg =
    project.heroImage ||
    project.coverImage ||
    (Array.isArray(project.images) && project.images.length > 0 ? project.images[0] : null);
  const ogImage =
    heroImg && typeof heroImg.src === 'string' && heroImg.src.trim().length > 0
      ? heroImg.src
      : undefined;

  return {
    ...constructMetadata({
      title: project.name,
      description: projectDescription,
      canonicalUrl: `/projects/${project.slug}`,
      noIndex: !!project.isDemo,
      ...(ogImage ? { image: ogImage } : {})
    }),
    title: `${project.name} | Earth Heritage`
  };
}

/**
 * Generate static params for all confirmed projects
 */
export async function generateStaticParams() {
  const allProjects = getAllProjects();
  return allProjects.map((project) => ({
    slug: project.slug
  }));
}

/**
 * Dynamic Individual Project Detail Page (/projects/[slug])
 * 
 * Editorial Project Exhibition Architecture:
 * 1. Schema.org Place (omitted for concept/demo projects)
 * 2. ProjectDetailHero — Compact cinematic hero (CONCEPT PROJECT, 01, MANAGED FARMLAND, title, narrative, hero visual)
 * 3. ProjectDetailOverview — Visual Story ("An approach to managed farmland.")
 * 4. ProjectDetailOwnership — Dedicated Ownership + Management ("YOU OWN THE LAND. WE MANAGE THE FARM.")
 * 5. ProjectDetailStewardship — Agronomic Farm Care & Operational Oversight
 * 6. ProjectDetailFeatures — Numbered Editorial Attributes (01, 02, 03, 04...)
 * 7. ProjectDetailGallery — Curated Visual Gallery with varied proportions & concept captions
 * 8. ProjectDetailNavigation — Previous / Next Project & All Projects Traversal
 * 9. ProjectDetailCta — Consultation closer with pre-filled enquiry modal context
 */
export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams?.slug);

  // If no confirmed project matches the slug, return HTTP 404
  if (!project) {
    notFound();
  }

  const projectSchema = getProjectDetailSchema(project);

  return (
    <>
      {/* Project Detail Schema (Schema.org Place, null for demo projects) */}
      {projectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
      )}
      <div className="w-full bg-[#FAF6F0]">
        {/* 1. Project Hero */}
        <ProjectDetailHero project={project} />

        {/* 2. Visual Story / Overview ("An approach to managed farmland.") */}
        <ProjectDetailOverview project={project} />

        {/* 3. Ownership + Management ("YOU OWN THE LAND. WE MANAGE THE FARM.") */}
        <ProjectDetailOwnership project={project} />

        {/* 4. Stewardship / Farm Care (Disciplined Agricultural Care) */}
        <ProjectDetailStewardship project={project} />

        {/* 5. Numbered Project Features */}
        <ProjectDetailFeatures project={project} />

        {/* 6. Visual Documentation Gallery */}
        <ProjectDetailGallery project={project} />

        {/* 7. Adjacent Project Navigation */}
        <ProjectDetailNavigation currentSlug={project.slug} />

        {/* 8. Consultation CTA ("Own the land. Let us help care for the farm.") */}
        <ProjectDetailCta project={project} />
      </div>
    </>
  );
}
