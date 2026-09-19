'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial Article Hero Section for /blogs/[slug]
 * 
 * Strict Standards:
 * - Begins with approved light ivory background (#FAF6F0)
 * - Uses generous max-w-6xl width to distribute horizontal space evenly
 * - Renders single-line title on desktop screens (lg:whitespace-nowrap)
 * - Renders verified fields passed from data/blogs.js
 * - Cover image aligns evenly with the header container width
 */
export default function BlogDetailHero({ blog }) {
  if (!blog) return null;

  const {
    title,
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
    <header
      id="article-hero"
      data-navbar-theme="light"
      className="relative bg-[#FAF6F0] text-[#111613] pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-[#DCCDB7] overflow-hidden"
      aria-label={title}
    >
      {/* Signature Earth Heritage Contour Motifs */}
      <LandContourPattern variant="biscuit-contours" className="opacity-95 pointer-events-none" />
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-70 pointer-events-none" />

      <Container size="default" className="relative z-10">
        {/* 1. Subtle Back Navigation */}
        <div className="mb-6 sm:mb-8 max-w-6xl mx-auto">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
            aria-label="Return to Earth Heritage Journal index"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Journal</span>
          </Link>
        </div>

        {/* 2. Article Header Content — Wide Balanced Container */}
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Category & Meta Row */}
          <MotionReveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-[#5A685D]">
              {category && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                  <span>{category}</span>
                </span>
              )}

              {isDemo && (
                <span className="text-[11px] font-mono text-[#8C7A5A] uppercase tracking-wider">
                  [ Field Note ]
                </span>
              )}

              {formattedDate && (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                  <Calendar className="w-3.5 h-3.5 text-[#1E460B]" aria-hidden="true" />
                  <span>{formattedDate}</span>
                </span>
              )}

              {readingTime && (
                <span className="inline-flex items-center gap-1.5 font-mono text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#1E460B]" aria-hidden="true" />
                  <span>{readingTime}</span>
                </span>
              )}
            </div>
          </MotionReveal>

          {/* Article Display Headline — Single Line on Desktop */}
          <MotionReveal delay={0.15}>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-[38px] 2xl:text-[42px] font-normal tracking-tight text-[#111613] leading-tight break-words lg:whitespace-nowrap">
              {title}
            </h1>
          </MotionReveal>

          {/* Lead Statement / Excerpt */}
          {excerpt && (
            <MotionReveal delay={0.25}>
              <p className="font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-light leading-relaxed max-w-5xl">
                {excerpt}
              </p>
            </MotionReveal>
          )}

          {/* Author Attribution Card */}
          {author && author.name && (
            <MotionReveal delay={0.3}>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] flex items-center justify-center text-[#1E460B] font-mono text-xs font-semibold">
                  <User className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <span className="block font-sans text-sm font-semibold text-[#111613]">
                    {author.name}
                  </span>
                  {author.role && (
                    <span className="block font-mono text-xs text-[#5A685D]">
                      {author.role}
                    </span>
                  )}
                </div>
              </div>
            </MotionReveal>
          )}
        </div>

        {/* 3. Cover Visual Container — Matches max-w-6xl Width Evenly */}
        {coverImage && coverImage.src && (
          <MotionReveal delay={0.35} className="mt-10 sm:mt-14 max-w-6xl mx-auto">
            <figure className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-sm border border-[#D5C09D]/80 bg-[#EAE3D2]/40">
              <Image
                src={coverImage.src}
                alt={coverImage.alt || title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 95vw, 1152px"
                className="object-cover object-center"
              />
              {coverImage.caption && (
                <figcaption className="absolute bottom-0 inset-x-0 p-3.5 sm:p-4 bg-[#111613]/75 backdrop-blur-xs text-[#FAF6F0] text-xs font-mono">
                  {coverImage.caption}
                </figcaption>
              )}
            </figure>
          </MotionReveal>
        )}
      </Container>
    </header>
  );
}
