'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial Featured Article Showcase for /blogs
 * 
 * Strict Standards:
 * - Full-width 12-column horizontal composition
 * - Cormorant Garamond display typography
 * - Single accessible stretched link over article title
 * - Omission safe: renders null if blog is absent
 */
export default function BlogFeatured({ blog, priority = true }) {
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

  return (
    <article className="group relative rounded-3xl bg-[#FAF7F2] border border-[#D5C09D] overflow-hidden shadow-sm hover:shadow-md hover:border-[#1E460B]/40 transition-all duration-300 w-full focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
        {/* 1. Large Cinematic Visual Container (7 cols) */}
        <div className="relative lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden bg-[#FAF6F0] border-b lg:border-b-0 lg:border-r border-[#DCCDB7]/70">
          {coverImage && coverImage.src ? (
            <Image
              src={coverImage.src}
              alt={coverImage.alt || title}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          ) : (
            /* Editorial Typographic Treatment when no authentic photo exists */
            <div className="w-full h-full min-h-[280px] flex flex-col items-center justify-center p-8 bg-[#FAF7F2] text-center relative select-none">
              <LandContourPattern variant="biscuit-contours" className="opacity-30" />
              <span className="font-mono text-[11px] tracking-widest uppercase text-[#5A685D] mb-2 relative z-10">
                Earth Heritage Featured Perspective
              </span>
              <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111613] font-normal italic relative z-10 px-6">
                {title}
              </span>
            </div>
          )}
        </div>

        {/* 2. Editorial Narrative Container (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Featured Eyebrow & Metadata */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#5A685D]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-[#EAD5B5]/80 border border-[#D5C09D] text-[#1E460B] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>FEATURED PERSPECTIVE</span>
              </span>

              {category && (
                <span className="font-mono text-xs uppercase tracking-wider text-[#1E460B] font-medium">
                  {category}
                </span>
              )}
            </div>

            {/* Display Headline with Accessible Stretched Link */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] tracking-tight text-[#111613] font-normal leading-[1.15] group-hover:text-[#1E460B] transition-colors">
              <Link
                href={`/blogs/${slug}`}
                className="focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
              >
                {title}
              </Link>
            </h2>

            {/* Excerpt Narrative */}
            {excerpt && (
              <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed line-clamp-3">
                {excerpt}
              </p>
            )}

            {/* Publication Date & Reading Time */}
            <div className="flex items-center gap-4 text-xs font-mono text-[#5A685D] pt-1">
              {formattedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#1E460B]" aria-hidden="true" />
                  <span>{formattedDate}</span>
                </span>
              )}
              {readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#1E460B]" aria-hidden="true" />
                  <span>{readingTime}</span>
                </span>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-[#DCCDB7]/70 flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase text-[#1E460B] group-hover:text-brand-dark transition-colors">
              <span>Read Full Perspective</span>
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5 motion-reduce:transform-none text-[#1E460B]"
                aria-hidden="true"
              />
            </span>

            {author && author.name && (
              <span className="text-[11px] font-mono text-[#7A8A7E] uppercase tracking-wider">
                By {author.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
