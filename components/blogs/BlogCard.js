'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial BlogCard Component
 * 
 * Strict Standards:
 * - Single accessible Link wrapping via stretched link pattern (no nested buttons/links)
 * - Renders ONLY verified fields (title, slug, excerpt, category, date, readingTime, coverImage, author)
 * - Zero fake statistics, quotes, or marketing claims
 * - High-end editorial typography (Cormorant Garamond luxury serif headings)
 * - Graceful typography fallback if no image exists (no fake stock photos)
 * - Full reduced-motion and keyboard accessibility support
 */
export default function BlogCard({
  blog,
  variant = 'standard',
  priority = false,
  className
}) {
  if (!blog) return null;

  const {
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    readingTime,
    coverImage,
    author
  } = blog;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  const isCompact = variant === 'compact';

  return (
    <article
      className={cn(
        'group relative rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] overflow-hidden shadow-sm hover:shadow-md hover:border-[#1E460B]/40 transition-all duration-300 flex flex-col h-full focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2',
        className
      )}
    >
      {/* 1. Image / Typographic Header Container */}
      <div
        className={cn(
          'relative w-full overflow-hidden bg-[#FAF6F0] border-b border-[#DCCDB7]/70',
          isCompact ? 'aspect-[16/9]' : 'aspect-[16/10]'
        )}
      >
        {coverImage && coverImage.src ? (
          <Image
            src={coverImage.src}
            alt={coverImage.alt || title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        ) : (
          /* Editorial Typographic Treatment when no authentic photo exists */
          <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-8 bg-[#FAF7F2] text-center relative select-none">
            <LandContourPattern variant="biscuit-contours" className="opacity-30" />
            <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#5A685D] mb-2 relative z-10">
              Earth Heritage Journal
            </span>
            <span className="font-serif text-xl sm:text-2xl text-[#111613] font-normal italic relative z-10 px-4 line-clamp-2">
              {title}
            </span>
          </div>
        )}
      </div>

      {/* 2. Content Details */}
      <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3.5">
          {/* Metadata Bar (Category, Date, Reading Time) */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#5A685D]">
            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-[#EAD5B5]/70 border border-[#D5C09D] text-[#1E460B] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                {category}
              </span>
            )}

            {formattedDate && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                <Calendar className="w-3 h-3 text-[#1E460B]" aria-hidden="true" />
                <span>{formattedDate}</span>
              </span>
            )}

            {readingTime && (
              <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                <Clock className="w-3 h-3 text-[#1E460B]" aria-hidden="true" />
                <span>{readingTime}</span>
              </span>
            )}
          </div>

          {/* Article Title with Stretched Accessible Link */}
          <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] tracking-tight text-[#111613] font-normal leading-[1.2] group-hover:text-[#1E460B] transition-colors">
            <Link
              href={`/blogs/${slug}`}
              className="focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
            >
              {title}
            </Link>
          </h3>

          {/* Excerpt Narrative */}
          {excerpt && (
            <p className="font-sans text-sm sm:text-base text-[#38423A] font-normal leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          )}
        </div>

        {/* 3. Action & Author Bar */}
        <div className="pt-4 border-t border-[#DCCDB7]/70 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase text-[#1E460B] group-hover:text-brand-dark transition-colors">
            <span>Read Perspective</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none text-[#1E460B]"
              aria-hidden="true"
            />
          </span>

          {author && author.name && (
            <span className="text-[11px] font-mono text-[#7A8A7E] uppercase tracking-wider hidden sm:inline-block">
              {author.name}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
