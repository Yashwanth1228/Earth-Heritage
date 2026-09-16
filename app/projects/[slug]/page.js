import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import { constructMetadata } from '@/lib/seo';
import { getProjectDetailSchema } from '@/lib/schema';
import ProjectDetailHero from '@/components/projects/ProjectDetailHero';
import ProjectDetailOverview from '@/components/projects/ProjectDetailOverview';
import ProjectDetailStewardship from '@/components/projects/ProjectDetailStewardship';
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
    project.tagline ||
    project.overview ||
    project.description ||
    'An agricultural initiative managed with the Earth Heritage philosophy of titled ownership and active stewardship.';

  // If the project has a verified hero image, use it for OG/Twitter; otherwise omit image
  const heroImg =
    project.heroImage ||
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
      ...(ogImage ? { image: ogImage } : {})
    }),
    title: `${project.name} | Earth Heritage`
  };
}

/**
 * Generate static params for all confirmed projects
 * When projects array is empty, Next.js safely produces 0 dynamic paths at build time
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
 * Modular Architectural Foundation:
 * 1. JSON-LD Place Structured Data (rendered server-side only for confirmed projects)
 * 2. ProjectDetailHero — Light (#FAF6F0) starting foundation, verified metadata, landscape framing
 * 3. ProjectDetailOverview — Warm biscuit (#F0E0C6) alternating narrative and confirmed features
 * 4. ProjectDetailStewardship — Light (#FAF6F0) operational farm management specifics
 * 5. ProjectDetailGallery — Curated field & land photography vignettes
 * 6. ProjectDetailNavigation — Dynamic Previous / Next project traversal
 * 7. ProjectDetailCta — Conversational consultation closer with pre-filled enquiry modal context
 * 
 * Note on Data Integrity:
 * Automatically invokes notFound() when the requested slug is unconfirmed.
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
      {/* Project Detail Schema (Schema.org Place) */}
      {projectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
      )}
      <div className="w-full bg-[#FAF6F0]">
        {/* 1. Project Hero (Starts Light #FAF6F0) */}
        <ProjectDetailHero project={project} />

        {/* 2. Editorial Land Overview & Features (Warm Biscuit #F0E0C6) */}
        <ProjectDetailOverview project={project} />

        {/* 3. Operational Stewardship & Farm Management (Light #FAF6F0) */}
        <ProjectDetailStewardship project={project} />

        {/* 4. Visual Documentation Gallery */}
        <ProjectDetailGallery project={project} />

        {/* 5. Adjacent Project Navigation */}
        <ProjectDetailNavigation currentSlug={project.slug} />

        {/* 6. Consultation CTA (Deep Green #102B17 with data-navbar-theme="dark") */}
        <ProjectDetailCta project={project} />
      </div>
    </>
  );
}

