'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';

/**
 * Editorial Gallery Section for Project Detail
 * 
 * Strict Standards:
 * - Uses existing project gallery data if available
 * - If insufficient gallery images exist, gracefully falls back to curated temporary concept imagery
 * - Clearly discloses that imagery is for concept demonstration (zero false project claims)
 * - Varied proportions (large editorial feature + companion visuals)
 * - Subtle hover zoom, rounded geometry, and accessible image interaction
 */
export default function ProjectDetailGallery({ project }) {
  if (!project) return null;

  const { name, isDemo } = project;

  // Fallback curated temporary demonstration images from existing repository assets
  const fallbackGallery = [
    {
      src: project.coverImage?.src || project.heroImage?.src || '/images/managed-farmland/intro-farmland.jpg',
      alt: `${name} — Farmland landscape overview`,
      caption: 'Agricultural Landscape & Plantation Layout (Concept Demo Visual)',
      isLead: true
    },
    {
      src: '/images/managed-farmland/core-proposition.jpg',
      alt: `${name} — Canopy & field boundaries`,
      caption: 'Agroforestry Canopy & Boundary Demarcation (Concept Demo Visual)',
      isLead: false
    },
    {
      src: '/images/managed-farmland/nature-responsibility.jpg',
      alt: `${name} — Agronomic field operations`,
      caption: 'Natural Ecological Flora & Field Stewardship (Concept Demo Visual)',
      isLead: false
    }
  ];

  const galleryItems =
    Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery
      : fallbackGallery;

  return (
    <section
      id="project-gallery"
      data-navbar-theme="light"
      className="relative py-16 sm:py-24 bg-[#F7F3EB] text-[#111613] border-b border-[#DCCDB7]/70 overflow-hidden"
      aria-label="Project Visual Gallery"
    >
      {/* Background Topographic Ambience */}
      <LandContourPattern variant="biscuit-topography" className="opacity-30" />

      <Container size="default" className="relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/80 border border-[#D5C09D] text-xs font-mono font-semibold tracking-widest text-[#1E460B] uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>VISUAL PERSPECTIVES</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#111613] font-normal tracking-tight">
              Landscapes &amp; Agronomic Environment
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-base sm:text-lg text-[#38423A] font-normal leading-relaxed">
              Curated visual perspectives illustrating the terrain character, natural canopy, and farm management environment envisioned for {name}.
            </p>
          </MotionReveal>

          {isDemo && (
            <MotionReveal delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#DCCDB7] text-[11px] font-mono text-[#5A685D]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
                <span>Temporary Concept Photography — Confirmed imagery will be added as projects are launched.</span>
              </div>
            </MotionReveal>
          )}
        </div>

        {/* Varied Editorial Photo Showcase (12 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Lead Image: 8 cols */}
          {galleryItems[0] && (
            <MotionReveal delay={0.1} className="lg:col-span-8">
              <figure className="group relative rounded-3xl overflow-hidden border border-[#D5C09D] bg-[#FAF7F2] shadow-sm flex flex-col h-full">
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#FAF6F0]">
                  <Image
                    src={galleryItems[0].src}
                    alt={galleryItems[0].alt || name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                {galleryItems[0].caption && (
                  <figcaption className="p-4 text-xs font-mono text-[#5A685D] bg-[#FAF7F2] border-t border-[#DCCDB7]">
                    {galleryItems[0].caption}
                  </figcaption>
                )}
              </figure>
            </MotionReveal>
          )}

          {/* Companion Images: 4 cols stacked */}
          <div className="lg:col-span-4 flex flex-col gap-6 sm:gap-8">
            {galleryItems.slice(1, 3).map((item, idx) => (
              <MotionReveal key={idx} delay={0.15 * (idx + 1)} className="flex-1">
                <figure className="group relative rounded-3xl overflow-hidden border border-[#D5C09D] bg-[#FAF7F2] shadow-sm flex flex-col h-full">
                  <div className="relative w-full aspect-[16/10] lg:aspect-[4/3] overflow-hidden bg-[#FAF6F0]">
                    <Image
                      src={item.src}
                      alt={item.alt || name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                  {item.caption && (
                    <figcaption className="p-3.5 text-xs font-mono text-[#5A685D] bg-[#FAF7F2] border-t border-[#DCCDB7]">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              </MotionReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
