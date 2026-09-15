'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { galleryImages } from '@/data/galleryImages';
import { galleryData } from '@/data/galleryData';

/**
 * Section 2 — Exhibition Feature Image for /gallery
 * 
 * Large opening feature photograph establishing the exhibition scale
 * with generous whitespace and editorial badge.
 */
export default function GalleryFeatureImage({ onSelectImage }) {
  const feature = galleryImages[0];
  const { badge, title, subtext } = galleryData.featureCaption;

  return (
    <section
      id="gallery-feature"
      className="relative bg-[#F0E0C6] pb-12 sm:pb-16 lg:pb-20 border-b border-[#DCCDB7]"
      aria-label="Exhibition Opening Feature"
    >
      <Container size="default">
        <MotionReveal delay={0.2} className="max-w-6xl mx-auto">
          <div
            onClick={() => onSelectImage && onSelectImage(feature)}
            className="group relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D5C09D] shadow-[0_20px_50px_rgba(17,22,19,0.09)] bg-[#E4D1B5] cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label={`View full image: ${feature.title}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectImage && onSelectImage(feature);
              }
            }}
          >
            <Image
              src={feature.src}
              alt={feature.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 94vw, 1200px"
              className="object-cover object-center transform group-hover:scale-[1.015] transition-transform duration-700 ease-out"
            />
            
            {/* Subtle atmospheric vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

            {/* Top Exhibition Badge */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1 rounded-full bg-[#111613]/75 backdrop-blur-md border border-white/20 text-[11px] font-mono tracking-widest text-[#FAF6F0] uppercase pointer-events-none">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#55C40D] mr-2" />
              {badge}
            </div>

            {/* Bottom Editorial Caption */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 pointer-events-none">
              <div>
                <span className="font-mono text-xs text-[#FAF6F0]/80 tracking-wider uppercase block">
                  {subtext}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl text-white font-normal tracking-tight mt-1 drop-shadow-xs">
                  {title}
                </h2>
              </div>
              <span className="text-white/80 font-mono text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Click to Expand</span>
                <span aria-hidden="true">↗</span>
              </span>
            </div>
          </div>
        </MotionReveal>
      </Container>
    </section>
  );
}
