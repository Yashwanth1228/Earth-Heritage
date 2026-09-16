'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial Hero Section for Dynamic Project Detail (/projects/[slug])
 * 
 * Strict Standards:
 * - Begins with approved light ivory background (#FAF6F0)
 * - Renders ONLY verified project fields passed from data/projects.js
 * - Zero fake statistics, pricing, acreage, or investment returns
 * - Graceful omission of any unsupplied fields
 */
export default function ProjectDetailHero({ project }) {
  if (!project) return null;

  const {
    name,
    tagline,
    location,
    status,
    heroImage,
    images = []
  } = project;

  // Derive primary landscape image from heroImage or first image in images array
  const activeHeroImage = heroImage || (images && images.length > 0 ? images[0] : null);

  return (
    <section
      id="project-hero"
      data-navbar-theme="light"
      className="relative bg-[#FAF6F0] text-[#111613] pt-28 sm:pt-36 pb-14 sm:pb-20 border-b border-[#DCCDB7] overflow-hidden"
      aria-label={`${name} — Project Overview`}
    >
      {/* Signature Earth Heritage Contour Motifs */}
      <LandContourPattern variant="biscuit-contours" className="opacity-80" />

      <Container size="default" className="relative z-10">
        {/* 1. Subtle Back Navigation */}
        <div className="mb-8 sm:mb-10">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-medium text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
            aria-label="Return to Earth Heritage Projects catalog"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Projects</span>
          </Link>
        </div>

        {/* 2. Project Header Metadata */}
        <div className="max-w-4xl space-y-4 sm:space-y-6">
          {/* Status & Location Pill Badges */}
          <MotionReveal delay={0.05}>
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/70 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>EARTH HERITAGE INITIATIVE</span>
              </div>

              {status && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-surface/90 text-[#1E460B] border border-[#D5C09D] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
                  {status}
                </span>
              )}

              {location && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-text-secondary bg-[#FAF7F2] border border-[#D5C09D]/60 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary" aria-hidden="true" />
                  <span>{location}</span>
                </span>
              )}
            </div>
          </MotionReveal>

          {/* Project Title (Cormorant Garamond Luxury Serif) */}
          <MotionReveal delay={0.15}>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal tracking-tight text-[#111613] leading-[1.12]">
              {name}
            </h1>
          </MotionReveal>

          {/* Project Tagline (if supplied) */}
          {tagline && (
            <MotionReveal delay={0.25}>
              <p className="font-sans text-base sm:text-lg md:text-xl text-[#38423A] font-normal leading-relaxed max-w-2xl">
                {tagline}
              </p>
            </MotionReveal>
          )}
        </div>

        {/* 3. Authentic Hero Landscape Image (rendered ONLY if verified photography exists) */}
        {activeHeroImage && (
          <MotionReveal delay={0.35} className="mt-10 sm:mt-14">
            <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-3xl overflow-hidden shadow-sm border border-[#D5C09D]/80 bg-[#EAE3D2]/40">
              <Image
                src={activeHeroImage.src}
                alt={activeHeroImage.alt || name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1400px) 92vw, 1400px"
                className="object-cover object-center"
              />
            </div>
          </MotionReveal>
        )}
      </Container>
    </section>
  );
}
