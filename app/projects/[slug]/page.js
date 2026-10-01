import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import { constructMetadata } from '@/lib/seo';
import { getProjectDetailSchema, getBreadcrumbSchema } from '@/lib/schema';
import ProjectDetailHero from '@/components/projects/ProjectDetailHero';
import ProjectDetailOverview from '@/components/projects/ProjectDetailOverview';
import ProjectDetailOwnership from '@/components/projects/ProjectDetailOwnership';
import ProjectDetailStewardship from '@/components/projects/ProjectDetailStewardship';
import ProjectDetailFeatures from '@/components/projects/ProjectDetailFeatures';
import ProjectDetailGallery from '@/components/projects/ProjectDetailGallery';
import ProjectDetailNavigation from '@/components/projects/ProjectDetailNavigation';
import ProjectDetailCta from '@/components/projects/ProjectDetailCta';

// Nairuthya Whispering Wood — Bespoke Real Project Components (12-Section Architecture)
import NairuthyaHero from '@/components/projects/nairuthya/NairuthyaHero';
import NairuthyaSnapshot from '@/components/projects/nairuthya/NairuthyaSnapshot';
import NairuthyaPlantations from '@/components/projects/nairuthya/NairuthyaPlantations';
import NairuthyaAmenities from '@/components/projects/nairuthya/NairuthyaAmenities';
import NairuthyaLocation from '@/components/projects/nairuthya/NairuthyaLocation';
import NairuthyaNearby from '@/components/projects/nairuthya/NairuthyaNearby';
import NairuthyaGallery from '@/components/projects/nairuthya/NairuthyaGallery';

// Coconut Garden — Bespoke Real Project Components (Matching Master Reference Architecture)
import CoconutHero from '@/components/projects/coconut/CoconutHero';
import CoconutSnapshot from '@/components/projects/coconut/CoconutSnapshot';
import CoconutPlantations from '@/components/projects/coconut/CoconutPlantations';
import CoconutAmenities from '@/components/projects/coconut/CoconutAmenities';
import CoconutLocation from '@/components/projects/coconut/CoconutLocation';
import CoconutNearby from '@/components/projects/coconut/CoconutNearby';
import CoconutGallery from '@/components/projects/coconut/CoconutGallery';

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

  const projectTitle = project.seoTitle || project.name;
  const projectDescription =
    project.seoDescription ||
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

  return constructMetadata({
    title: projectTitle,
    description: projectDescription,
    canonicalUrl: `/projects/${project.slug}`,
    noIndex: !!project.isDemo,
    exactTitle: !!project.seoTitle,
    ...(ogImage ? { image: ogImage } : {})
  });
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
 * For 'nairuthya-whispering-wood', renders the 12-section real project presentation:
 * 1. PROJECT HERO
 * 2. PROJECT SNAPSHOT
 * 3. ABOUT THE PROJECT
 * 4. FARM & PLANTATIONS
 * 5. AMENITIES
 * 6. FARM DEVELOPMENT & MANAGEMENT
 * 7. LOCATION & CONNECTIVITY
 * 8. NEARBY PLACES / THINGS TO EXPLORE
 * 9. PROJECT GALLERY
 * 10. AVAILABLE PLOTS / ENQUIRY
 * 11. PROJECT FAQ
 * 12. FINAL CTA
 * 
 * For concept/demo projects, falls back to the existing concept project structure.
 */
export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams?.slug);

  // If no confirmed project matches the slug, return HTTP 404
  if (!project) {
    notFound();
  }

  const projectSchema = getProjectDetailSchema(project);
  const isNairuthya = project.slug === 'nairuthya-whispering-wood';
  const isCoconutGarden = project.slug === 'coconut-garden';
  const breadcrumbSchema = !project.isDemo
    ? getBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: project.name, path: `/projects/${project.slug}` }
      ])
    : null;

  return (
    <>
      {/* Project Detail Schema (Schema.org Place, null for demo projects) */}
      {projectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
      )}
      {/* Breadcrumb Schema (Schema.org BreadcrumbList) */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <div className="w-full bg-[#FAF6F0] overflow-x-hidden">
        {isNairuthya ? (
          <>
            {/* 1. PROJECT HERO */}
            <NairuthyaHero project={project} />

            {/* 2. PROJECT SNAPSHOT */}
            <NairuthyaSnapshot project={project} />

            {/* 3. FARM & PLANTATIONS */}
            <NairuthyaPlantations project={project} />

            {/* 4. AMENITIES */}
            <NairuthyaAmenities project={project} />

            {/* 5. LOCATION & CONNECTIVITY */}
            <NairuthyaLocation project={project} />

            {/* 6. NEARBY PLACES / THINGS TO EXPLORE */}
            <NairuthyaNearby project={project} />

            {/* 7. PROJECT GALLERY */}
            <NairuthyaGallery project={project} />
          </>
        ) : isCoconutGarden ? (
          <>
            {/* 1. PROJECT HERO */}
            <CoconutHero project={project} />

            {/* 2. PROJECT SNAPSHOT */}
            <CoconutSnapshot project={project} />

            {/* 3. FARM & PLANTATIONS */}
            <CoconutPlantations project={project} />

            {/* 4. AMENITIES */}
            <CoconutAmenities project={project} />

            {/* 5. LOCATION & CONNECTIVITY */}
            <CoconutLocation project={project} />

            {/* 6. NEARBY PLACES / PROJECT HIGHLIGHTS */}
            <CoconutNearby project={project} />

            {/* 7. PROJECT GALLERY */}
            <CoconutGallery project={project} />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
}
