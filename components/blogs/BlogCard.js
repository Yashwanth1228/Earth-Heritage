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
 * - Equal sizing across all cards in the 3-column row
 * - Image at top with consistent aspect ratio
 * - Title below image
 * - 2 lines description with ellipsis (line-clamp-2)
 * - Clear "Read More" action linking to /blogs/[slug]
 * - Accessible stretched link wrapping the card
 */
export default function BlogCard({
  blog,
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
    author,
    isDemo
  } = blog;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    : null;

  return (
    <article
      className={cn(
        'group relative rounded-3xl bg-white border border-[#D5C09D] overflow-hidden shadow-sm hover:shadow-md hover:border-[#1E460B]/50 transition-all duration-300 flex flex-col h-full focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2',
        className
      )}
    >
      {/* 1. Image Container (Equal 16:10 Aspect Ratio) */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#FAF6F0] border-b border-[#DCCDB7]/70">
        {coverImage && coverImage.src ? (
          <Image
            src={coverImage.src}
            alt={coverImage.alt || title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
          />
        ) : (
          /* Editorial Typographic Treatment when no authentic photo exists */
          <div className="w-full h-full min-h-[200px] flex flex-col items-center justify-center p-6 bg-[#FAF7F2] text-center relative select-none">
            <LandContourPattern variant="biscuit-contours" className="opacity-30" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-[#5A685D] mb-2 relative z-10">
              Earth Heritage Journal
            </span>
            <span className="font-serif text-lg sm:text-xl text-[#111613] font-normal italic relative z-10 px-4 line-clamp-2">
              {title}
            </span>
          </div>
        )}
      </div>

      {/* 2. Content Details */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata Bar (Category, Date, Reading Time) */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#5A685D]">
            {category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-[#EAD5B5]/70 border border-[#D5C09D] text-[#1E460B] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                {category}
              </span>
            )}

            {isDemo && (
              <span className="text-[10px] font-mono text-[#8C7A5A] uppercase tracking-wider">
                [ Field Note ]
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

          {/* Article Title with Accessible Stretched Link */}
          <h3 className="font-serif text-xl sm:text-2xl tracking-tight text-[#111613] font-normal leading-[1.25] group-hover:text-[#1E460B] transition-colors line-clamp-2">
            <Link
              href={`/blogs/${slug}`}
              className="focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
            >
              {title}
            </Link>
          </h3>

          {/* 2 Lines Description with ellipsis */}
          {excerpt && (
            <p className="font-sans text-sm sm:text-base text-[#38423A] font-normal leading-relaxed line-clamp-2">
              {excerpt}
            </p>
          )}
        </div>

        {/* 3. Read More Action Bar */}
        <div className="pt-4 border-t border-[#DCCDB7]/70 flex items-center justify-between gap-3 pointer-events-none">
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase text-[#1E460B] group-hover:text-brand-dark transition-colors whitespace-nowrap shrink-0">
            <span>Read More</span>
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none text-[#1E460B]"
              aria-hidden="true"
            />
          </span>

          {author && author.name && (
            <span className="text-[11px] font-mono text-[#7A8A7E] uppercase tracking-wider truncate max-w-[130px] text-right hidden sm:inline-block">
              {author.name}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
