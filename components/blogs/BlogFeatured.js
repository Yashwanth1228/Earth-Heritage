'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';

/**
 * Editorial Featured Article Showcase for /blogs
 * 
 * Composition:
 * - 12-column asymmetric editorial layout (7 cols large visual + 5 cols narrative)
 * - Authentic field note transparency badge
 * - Accessible stretched link pattern over the headline
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
    <article className="group relative rounded-3xl bg-white border border-[#E2D8C3] overflow-hidden shadow-[0_8px_30px_rgba(26,22,17,0.05)] hover:shadow-[0_14px_40px_rgba(21,52,28,0.08)] hover:border-[#1E460B]/40 transition-all duration-300 w-full focus-within:ring-2 focus-within:ring-[#15341C] focus-within:ring-offset-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch h-full">
        {/* 1. Large Visual Container (7 cols) */}
        <div className="relative lg:col-span-7 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-full min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] overflow-hidden bg-[#EDE5D5] border-b lg:border-b-0 lg:border-r border-[#E8DFC8]">
          {coverImage && coverImage.src && (
            <Image
              src={coverImage.src}
              alt={coverImage.alt || title}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40 pointer-events-none" />

          {/* Corner Badges */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-10 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>FEATURED PERSPECTIVE</span>
            </span>
          </div>

          {coverImage && coverImage.caption && (
            <div className="absolute bottom-3 left-4 right-4 z-10">
              <p className="text-[11px] font-mono text-white/90 tracking-wide line-clamp-1 drop-shadow-sm">
                {coverImage.caption}
              </p>
            </div>
          )}
        </div>

        {/* 2. Editorial Narrative Container (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Demo Transparency Tag */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              {category && (
                <span className="px-3 py-1 rounded-full bg-[#EDE5D5] text-[#15341C] border border-[#D5C6A6]/80 font-mono text-xs uppercase tracking-wider font-semibold">
                  {category}
                </span>
              )}

              {isDemo && (
                <span className="text-[10px] font-mono text-[#8C7A5A] uppercase tracking-wider">
                  [ Field Note ]
                </span>
              )}
            </div>

            {/* Display Headline with Accessible Stretched Link */}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-[32px] tracking-tight text-[#111613] font-normal leading-[1.18] group-hover:text-[#1E460B] transition-colors">
              <Link
                href={`/blogs/${slug}`}
                className="focus:outline-none after:absolute after:inset-0 after:rounded-3xl"
              >
                {title}
              </Link>
            </h2>

            {/* Excerpt Narrative */}
            {excerpt && (
              <p className="font-sans text-sm sm:text-base text-[#3C4A3E] font-normal leading-relaxed line-clamp-3">
                {excerpt}
              </p>
            )}

            {/* Publication Date & Reading Time */}
            <div className="flex items-center gap-4 text-xs font-mono text-[#7A6A4E] pt-1">
              {formattedDate && (
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
                  <span>{formattedDate}</span>
                </span>
              )}
              {readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
                  <span>{readingTime}</span>
                </span>
              )}
            </div>
          </div>

          {/* Action Bar */}
          <div className="pt-4 border-t border-[#F0E9DC] flex items-center justify-between pointer-events-none">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#15341C] group-hover:text-[#1E460B] transition-colors">
              <span>Read Perspective</span>
              <ArrowRight
                className="w-3.5 h-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                aria-hidden="true"
              />
            </span>

            {author && author.name && (
              <span className="text-[11px] font-mono text-[#8C7A5A] uppercase tracking-wider">
                By {author.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
