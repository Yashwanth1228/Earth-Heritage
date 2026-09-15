'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { galleryCategories, galleryImages } from '@/data/galleryImages';
import { Maximize2 } from 'lucide-react';

/**
 * Section 3 — Interactive Exhibition Grid with Category Filtering
 * 
 * Filter options: ALL | LAND | NATURE | CULTIVATION | FARM LIFE | EXPERIENCES
 * Asymmetric editorial rhythm with hover reveals and full keyboard accessibility.
 */
export default function GalleryExhibition({ onSelectImage }) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Exclude feature hero image from main grid if activeCategory is ALL so it isn't duplicated
  // (Feature image is already prominently highlighted at the top).
  // When a specific category (e.g., LAND) is chosen, all matching items are shown.
  const exhibitionItems = useMemo(() => {
    if (activeCategory === 'ALL') {
      return galleryImages.filter((img) => !img.isFeature);
    }
    return galleryImages.filter((img) => img.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="exhibition-grid"
      className="relative bg-[#FAF6F0] py-16 sm:py-24 lg:py-28 overflow-hidden"
      aria-label="Photographic Exhibition Grid"
    >
      {/* Background Subtle Organic Topography */}
      <LandContourPattern variant="biscuit-topography" className="opacity-70" />

      <Container size="default" className="relative z-10">
        
        {/* 1. Category Filter Navigation Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 sm:pb-14 border-b border-[#E4D1B5]">
          <div>
            <span className="font-mono text-xs font-semibold text-[#1E460B] tracking-widest uppercase block mb-1">
              Curated Series
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#111613] font-normal tracking-tight">
              Exhibition Catalog
            </h2>
          </div>

          {/* Interactive Filter Pills */}
          <nav
            aria-label="Gallery category filters"
            className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none"
          >
            {galleryCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'ALL'
                  ? galleryImages.filter((img) => !img.isFeature).length
                  : galleryImages.filter((img) => img.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  aria-pressed={isActive}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all duration-300 shrink-0 select-none focus:outline-hidden focus:ring-2 focus:ring-[#1E460B] ${
                    isActive
                      ? 'bg-[#1E460B] text-[#FAF6F0] shadow-sm'
                      : 'bg-[#EBDDC8]/70 hover:bg-[#DECAB0] text-[#2B352E]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-[#5A655D]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* 2. Standardized Equal-Size Exhibition Grid */}
        <div className="mt-10 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {exhibitionItems.map((item, index) => {
            return (
              <MotionReveal
                key={item.id}
                delay={(index % 3) * 0.08}
                className="col-span-1"
              >
                <article
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectImage && onSelectImage(item, exhibitionItems)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectImage && onSelectImage(item, exhibitionItems);
                    }
                  }}
                  aria-label={`View photograph: ${item.title}`}
                  className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#E4D1B5] border border-[#D5C09D] shadow-[0_8px_30px_rgba(17,22,19,0.06)] hover:shadow-[0_16px_40px_rgba(17,22,19,0.12)] cursor-pointer transition-all duration-500"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay for Editorial Depth & Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F0C]/80 via-[#0B0F0C]/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Category Stamp (Top Left) */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#111613]/70 backdrop-blur-md border border-white/20 text-[10px] font-mono tracking-widest text-[#E4D1B5] uppercase">
                    {item.category}
                  </div>

                  {/* Expand Indicator (Top Right) */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>

                  {/* Caption Overlay (Bottom) */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-lg sm:text-xl font-normal tracking-tight text-[#FAF6F0] leading-snug drop-shadow-xs">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#FAF6F0]/75 line-clamp-1 mt-1 font-light">
                      {item.alt}
                    </p>
                  </div>
                </article>
              </MotionReveal>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
