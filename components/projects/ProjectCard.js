'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial ProjectCard Component
 * 
 * Strict Standards:
 * - Single accessible Link wrapping via stretched link pattern (no nested buttons/links)
 * - Displays project image, number, category, name, short description, and Explore action
 * - Subtle editorial indicator (CONCEPT PROJECT / PREVIEW) for demo items
 * - Zero fake statistics, pricing, acreage, or investment returns
 * - High-end editorial typography (Cormorant Garamond luxury serif headings)
 * - Supports responsive variants: 'featured' | 'standard'
 * - Graceful typography fallback if no image exists
 * - Full reduced-motion and keyboard accessibility support
 */
export default function ProjectCard({
  project,
  variant = 'standard',
  priority = false,
  index,
  className
}) {
  if (!project) return null;

  const {
    name,
    slug,
    number,
    category,
    shortDescription,
    tagline,
    overview,
    description,
    location,
    isDemo,
    coverImage,
    heroImage,
    images = []
  } = project;

  const activeImage = coverImage || heroImage || (images && images.length > 0 ? images[0] : null);
  const narrativeText = shortDescription || tagline || overview || description || null;
  const projectNumber = index || number || null;

  const isFeatured = variant === 'featured';

  // Variant: 'featured' (Large Editorial Exhibition Layout for Project 01)
  if (isFeatured) {
    return (
      <article
        className={cn(
          'group relative rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] overflow-hidden shadow-sm hover:shadow-md hover:border-[#1E460B]/40 transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 w-full',
          className
        )}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
          {/* 1. Large Image Occupying 7-8 columns */}
          <div className="lg:col-span-7 xl:col-span-8 relative overflow-hidden bg-[#FAF6F0] aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] xl:min-h-[500px] border-b lg:border-b-0 lg:border-r border-[#DCCDB7]/70">
            {activeImage ? (
              <Image
                src={activeImage.src}
                alt={activeImage.alt || name}
                fill
                priority={priority}
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 58vw, 66vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
              />
            ) : (
              <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center p-8 bg-[#FAF7F2] text-center relative select-none">
                <LandContourPattern variant="biscuit-contours" className="opacity-30" />
                <span className="font-mono text-xs tracking-widest uppercase text-[#5A685D] mb-2 relative z-10">
                  Earth Heritage Initiative
                </span>
                <span className="font-serif text-3xl text-[#111613] font-normal italic relative z-10 px-4">
                  {name}
                </span>
              </div>
            )}
          </div>

          {/* 2. Project Information Occupying 4-5 columns */}
          <div className="lg:col-span-5 xl:col-span-4 p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-between space-y-6 bg-[#FAF7F2]">
            <div className="space-y-4 sm:space-y-5">
              {/* Header: PROJECT PREVIEW + Number */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#DCCDB7]/70">
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  <span className="font-mono text-xs font-semibold tracking-widest text-[#1E460B] uppercase">
                    PROJECT PREVIEW
                  </span>
                </div>
                {projectNumber && (
                  <span className="font-mono text-sm sm:text-base font-bold tracking-widest text-[#1E460B]">
                    {projectNumber}
                  </span>
                )}
              </div>

              {/* Badges: Category & Concept Project */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#EAD5B5]/70 border border-[#D5C09D] text-[#1E460B] shadow-2xs">
                    {category}
                  </span>
                )}
                {isDemo && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium tracking-wider uppercase bg-[#FAF6F0] text-[#5A685D] border border-[#DCCDB7]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                    <span>Concept Project</span>
                  </span>
                )}
                {location && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5A685D]">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" aria-hidden="true" />
                    <span>{location}</span>
                  </span>
                )}
              </div>

              {/* Project Title with Stretched Link */}
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-[34px] xl:text-[38px] font-normal text-[#111613] leading-[1.14] tracking-tight group-hover:text-[#1E460B] transition-colors">
                <Link
                  href={`/projects/${slug}`}
                  className="focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
                >
                  {name}
                </Link>
              </h3>

              {/* Short Description */}
              {narrativeText && (
                <p className="font-sans text-sm sm:text-base lg:text-[17px] text-[#38423A] font-normal leading-relaxed line-clamp-4">
                  {narrativeText}
                </p>
              )}
            </div>

            {/* Prominent Explore Project CTA */}
            <div className="pt-6 border-t border-[#DCCDB7]/70 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1E460B] text-[#FAF6F0] font-sans font-semibold text-xs sm:text-sm tracking-wide group-hover:bg-brand-dark transition-all duration-200 shadow-xs">
                <span>Explore Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1 motion-reduce:transform-none text-[#FAF6F0]" aria-hidden="true" />
              </div>
              <span className="text-[11px] font-mono text-[#7A8A7E] uppercase tracking-widest hidden sm:inline-block">
                Titled Farmland
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Variant: 'standard' (Supporting Cards: Project 02, 03, etc.)
  return (
    <article
      className={cn(
        'group relative rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] overflow-hidden shadow-sm hover:shadow-md hover:border-[#1E460B]/40 transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2 flex flex-col h-full',
        className
      )}
    >
      {/* 1. Image on top */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#FAF6F0] border-b border-[#DCCDB7]/70">
        {activeImage ? (
          <Image
            src={activeImage.src}
            alt={activeImage.alt || name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        ) : (
          <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-6 bg-[#FAF7F2] text-center relative select-none">
            <LandContourPattern variant="biscuit-contours" className="opacity-30" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#5A685D] mb-1 relative z-10">
              Earth Heritage
            </span>
            <span className="font-serif text-xl text-[#111613] font-normal italic relative z-10 px-2">
              {name}
            </span>
          </div>
        )}
      </div>

      {/* 2. Content below */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 lg:p-8 space-y-6">
        <div className="space-y-3.5">
          {/* Project Number & Category Row */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {projectNumber && (
                <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#1E460B] uppercase">
                  {projectNumber}
                </span>
              )}
              {projectNumber && category && (
                <span className="text-[#DCCDB7]" aria-hidden="true">•</span>
              )}
              {category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-[#EAD5B5]/70 border border-[#D5C09D] text-[#1E460B] shadow-2xs">
                  {category}
                </span>
              )}
            </div>

            {isDemo && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium tracking-wider uppercase bg-[#FAF6F0] text-[#5A685D] border border-[#DCCDB7]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>Concept Project</span>
              </span>
            )}
          </div>

          {/* Project Title with Stretched Link */}
          <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] text-[#111613] font-normal leading-[1.2] tracking-tight group-hover:text-[#1E460B] transition-colors">
            <Link
              href={`/projects/${slug}`}
              className="focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
            >
              {name}
            </Link>
          </h3>

          {/* Short Description */}
          {narrativeText && (
            <p className="font-sans text-sm sm:text-base text-[#38423A] font-normal leading-relaxed line-clamp-3">
              {narrativeText}
            </p>
          )}
        </div>

        {/* Action Bar */}
        <div className="pt-4 border-t border-[#DCCDB7]/70 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase text-[#1E460B] group-hover:text-brand-dark transition-colors">
            <span>Explore Project</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none text-[#1E460B]"
              aria-hidden="true"
            />
          </span>
          {location && (
            <span className="inline-flex items-center gap-1 text-xs font-mono text-[#5A685D]">
              <MapPin className="w-3 h-3 text-brand-primary" aria-hidden="true" />
              <span>{location}</span>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
