import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import { getProjectBySlug, getAllProjects } from '@/data/projects';
import { constructMetadata } from '@/lib/seo';

/**
 * Generate metadata for dynamic project page
 */
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams?.slug);

  if (!project) {
    return {
      title: 'Project Not Found | Earth Heritage'
    };
  }

  return {
    ...constructMetadata({
      title: project.name,
      description: project.tagline || project.description,
      canonicalUrl: `/projects/${project.slug}`
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
 * Ready architecture for future confirmed Earth Heritage projects.
 * Automatically invokes notFound() when the requested slug is not confirmed.
 */
export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams?.slug);

  // If no confirmed project matches the slug, render 404
  if (!project) {
    notFound();
  }

  const {
    name,
    tagline,
    description,
    location,
    status,
    images = [],
    features = []
  } = project;

  const primaryImage = images.length > 0 ? images[0] : null;

  return (
    <main className="w-full bg-[#F0E0C6] min-h-screen pt-28 sm:pt-36 pb-20">
      <Container size="default">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-text-secondary hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="max-w-4xl mb-12 space-y-4">
          {/* Status & Location */}
          <div className="flex flex-wrap items-center gap-3">
            {status && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-surface/90 text-brand-dark border border-border">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                {status}
              </span>
            )}
            {location && (
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary">
                <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                {location}
              </span>
            )}
          </div>

          {/* Project Title */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-text-primary font-normal tracking-tight">
            {name}
          </h1>

          {/* Tagline */}
          {tagline && (
            <p className="font-sans text-lg sm:text-xl text-text-secondary max-w-2xl leading-relaxed">
              {tagline}
            </p>
          )}
        </div>

        {/* Primary Image if present */}
        {primaryImage && (
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-sm border border-border">
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt || name}
              fill
              priority
              className="object-cover"
            />
          </div>
        )}

        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 bg-surface/90 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-border mb-12">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl text-text-primary">
              About the Initiative
            </h2>
            <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <div className="lg:col-span-1 p-6 rounded-2xl bg-surface-subtle border border-border-subtle space-y-4">
              <h3 className="font-sans font-semibold text-sm text-text-primary uppercase tracking-wider">
                Confirmed Features
              </h3>
              <ul className="space-y-3">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}
