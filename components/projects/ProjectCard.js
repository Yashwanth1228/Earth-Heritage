'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Reusable ProjectCard Component
 * 
 * Modular card architecture for Earth Heritage project listings.
 * Receives dynamic project data as props without hardcoded values.
 */
export default function ProjectCard({ project, className }) {
  if (!project) return null;

  const {
    name,
    slug,
    tagline,
    description,
    location,
    status,
    images = []
  } = project;

  const primaryImage = images && images.length > 0 ? images[0] : null;

  return (
    <article
      className={cn(
        'group flex flex-col bg-surface rounded-2xl sm:rounded-3xl border border-border/80 overflow-hidden shadow-sm hover:shadow-elevation transition-all duration-300 hover:border-[#2E6838]/40',
        className
      )}
    >
      {/* 1. Project Image Header */}
      <div className="relative w-full aspect-[16/10] bg-surface-subtle overflow-hidden">
        {primaryImage ? (
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt || name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#EAE3D2]/40 text-text-muted text-xs font-mono tracking-wider">
            EARTH HERITAGE
          </div>
        )}

        {/* Status Badge */}
        {status && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-surface/90 backdrop-blur-md text-brand-dark border border-border shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
              {status}
            </span>
          </div>
        )}
      </div>

      {/* 2. Content Details */}
      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Location if confirmed */}
          {location && (
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary">
              <MapPin className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
              <span>{location}</span>
            </div>
          )}

          {/* Project Name */}
          <h3 className="font-serif text-2xl sm:text-3xl text-text-primary font-normal tracking-tight group-hover:text-brand-dark transition-colors">
            {name}
          </h3>

          {/* Tagline / Description */}
          {(tagline || description) && (
            <p className="font-sans text-sm text-text-secondary line-clamp-3 leading-relaxed">
              {tagline || description}
            </p>
          )}
        </div>

        {/* Action Link */}
        <div className="pt-3 border-t border-border-subtle">
          <Link
            href={`/projects/${slug}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold text-brand-primary group-hover:text-brand-dark transition-colors"
          >
            <span>View Project</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
