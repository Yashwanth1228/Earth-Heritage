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
 * - Renders ONLY verified fields (name, slug, location, status, heroImage/images, tagline/overview)
 * - Zero fake statistics, pricing, acreage, or investment returns
 * - High-end editorial typography (Cormorant Garamond luxury serif headings)
 * - Supports responsive variants: 'featured' | 'reversed' | 'standard'
 * - Graceful typography fallback if no image exists (no fake stock photos)
 * - Full reduced-motion and keyboard accessibility support
 */
export default function ProjectCard({
  project,
  variant = 'standard',
  priority = false,
  className
}) {
  if (!project) return null;

  const {
    name,
    slug,
    tagline,
    overview,
    description,
    location,
    status,
    heroImage,
    images = []
  } = project;

  const activeImage = heroImage || (images && images.length > 0 ? images[0] : null);
  const narrativeText = tagline || overview || description || null;

  const isFeatured = variant === 'featured';
  const isReversed = variant === 'reversed';
  const isHorizontal = isFeatured || isReversed;

  return (
    <article
      className={cn(
        'group relative rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] overflow-hidden shadow-sm hover:shadow-md hover:border-[#1E460B]/40 transition-all duration-300 focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2',
        isHorizontal ? 'w-full' : 'flex flex-col h-full',
        className
      )}
    >
      <div
        className={cn(
          isHorizontal ? 'grid grid-cols-1 lg:grid-cols-12 items-stretch h-full' : 'flex flex-col h-full'
        )}
      >
        {/* 1. Image Container */}
        <div
          className={cn(
            'relative overflow-hidden bg-[#FAF6F0]',
            isHorizontal
              ? cn(
                  'lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px]',
                  isReversed
                    ? 'order-1 lg:order-2 border-t lg:border-t-0 lg:border-l border-[#DCCDB7]/70'
                    : 'order-1 lg:order-1 border-b lg:border-b-0 lg:border-r border-[#DCCDB7]/70'
                )
              : 'w-full aspect-[16/10] border-b border-[#DCCDB7]/70'
          )}
        >
          {activeImage ? (
            <Image
              src={activeImage.src}
              alt={activeImage.alt || name}
              fill
              priority={priority}
              sizes={
                isHorizontal
                  ? '(max-width: 1024px) 100vw, 60vw'
                  : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          ) : (
            /* Editorial Typographic Treatment when no image exists */
            <div className="w-full h-full min-h-[240px] flex flex-col items-center justify-center p-8 bg-[#FAF7F2] text-center relative select-none">
              <LandContourPattern variant="biscuit-contours" className="opacity-30" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#5A685D] mb-2 relative z-10">
                Earth Heritage Initiative
              </span>
              <span className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal italic relative z-10 px-4">
                {name}
              </span>
            </div>
          )}
        </div>

        {/* 2. Content Container */}
        <div
          className={cn(
            'flex-1 flex flex-col justify-between space-y-6',
            isHorizontal
              ? cn(
                  'lg:col-span-5 p-6 sm:p-8 lg:p-10',
                  isReversed ? 'order-2 lg:order-1' : 'order-2 lg:order-2'
                )
              : 'p-6 sm:p-8'
          )}
        >
          <div className="space-y-4">
            {/* Metadata Badges (Status & Location) */}
            {(status || location) && (
              <div className="flex flex-wrap items-center gap-2.5">
                {status && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-[#EAD5B5]/70 border border-[#D5C09D] text-[#1E460B] shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                    {status}
                  </span>
                )}

                {location && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5A685D]">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" aria-hidden="true" />
                    <span>{location}</span>
                  </span>
                )}
              </div>
            )}

            {/* Project Title with Stretched Accessible Link */}
            <h3
              className={cn(
                'font-serif tracking-tight text-[#111613] font-normal leading-[1.15] group-hover:text-[#1E460B] transition-colors',
                isHorizontal ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl lg:text-3xl'
              )}
            >
              <Link
                href={`/projects/${slug}`}
                className="focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
              >
                {name}
              </Link>
            </h3>

            {/* Tagline or Overview Narrative (Omitted if unavailable) */}
            {narrativeText && (
              <p
                className={cn(
                  'font-sans text-[#38423A] font-normal leading-relaxed',
                  isHorizontal ? 'text-base sm:text-lg line-clamp-3' : 'text-sm sm:text-base line-clamp-2'
                )}
              >
                {narrativeText}
              </p>
            )}
          </div>

          {/* 3. Action Bar / Footer */}
          <div className="pt-4 border-t border-[#DCCDB7]/70 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase text-[#1E460B] group-hover:text-brand-dark transition-colors">
              <span>Explore Project</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none text-[#1E460B]"
                aria-hidden="true"
              />
            </span>
            <span className="text-[11px] font-mono text-[#7A8A7E] uppercase tracking-widest hidden sm:inline-block">
              Titled Farmland
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
