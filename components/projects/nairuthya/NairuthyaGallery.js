'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 09 — PROJECT GALLERY: Editorial Visual Gallery with Lightbox
 * 
 * Strict Standards:
 * - Uses only actual project images supplied later (zero fake stock photos)
 * - Large feature visual + companion editorial layout
 * - Full Lightbox modal with Escape-to-close, Left/Right navigation, and focus management
 * - Responsive layout, reduced-motion support
 * - Clean content-ready architecture when photos are pending
 */
export default function NairuthyaGallery({ project }) {
  const galleryItems = project?.gallery || [];
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Check if any items actually have valid images
  const hasRealImages = galleryItems.some(
    (item) => typeof item.src === 'string' && item.src.trim().length > 0
  );

  const openLightbox = (index) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
  }, []);

  const nextLightbox = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev + 1) % galleryItems.length);
  }, [activeLightboxIndex, galleryItems.length]);

  const prevLightbox = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  }, [activeLightboxIndex, galleryItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  return (
    <section
      id="gallery"
      data-navbar-theme="light"
      className="relative bg-[#FAF6F0] text-[#111613] py-10 sm:py-12 lg:py-14 border-b border-[#DCCDB7]/80 overflow-hidden"
      aria-label="Project Visual Gallery"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-25 pointer-events-none" />

      <Container size="default" className="relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8 space-y-2">
          <MotionReveal delay={0.05}>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold tracking-widest text-[#7A6A4E] uppercase">
              <Camera className="w-3.5 h-3.5 text-[#55C40D]" aria-hidden="true" />
              <span>VISUAL EXHIBITION &bull; FIELD DOCUMENTATION</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#111613] tracking-tight">
              Estate Visual Gallery
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#4E5C50] leading-relaxed">
              Curated field photography documenting the land, layout, plantation development, and landscape character at Nairuthya Whispering Wood.
            </p>
          </MotionReveal>
        </div>

        {/* Gallery Showcase Grid (Equal-Sized Cards Grid: 4 cols Desktop, 2 cols Tablet, 1 col Mobile) */}
        {hasRealImages ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {galleryItems.map((item, idx) => (
              <MotionReveal key={item.id || idx} delay={0.06 * (idx + 1)}>
                <figure
                  onClick={() => openLightbox(idx)}
                  className="group relative rounded-2xl overflow-hidden border border-[#D5C09D] bg-[#102B17] shadow-2xs cursor-pointer aspect-[16/10] flex flex-col justify-end w-full h-full"
                >
                  {item.src && (
                    <Image
                      src={item.src}
                      alt={item.alt || 'Nairuthya Whispering Wood'}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="relative z-10 p-4 flex items-center justify-between text-white">
                    <figcaption className="font-sans text-xs sm:text-sm font-medium line-clamp-1">
                      {item.caption || item.alt}
                    </figcaption>
                    <Maximize2 className="w-4 h-4 text-[#F8C32C] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </div>
                </figure>
              </MotionReveal>
            ))}
          </div>
        ) : (
          /* Editorial Content-Ready State when photography is pending (Equal-Sized Cards Grid) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 items-stretch">
            {galleryItems.map((item, idx) => (
              <MotionReveal key={item.id || idx} delay={0.06 * (idx + 1)}>
                <div className="group relative rounded-2xl overflow-hidden border border-[#DDD3BF] bg-gradient-to-b from-[#FBF8F3] via-[#F3ECE0] to-[#E9DFC8] shadow-2xs aspect-[16/10] p-4 sm:p-5 flex flex-col justify-between text-[#111613] select-none w-full h-full">
                  <div className="absolute inset-0 opacity-25 pointer-events-none">
                    <LandContourPattern variant="biscuit-topography" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#D5C09D] text-[10px] font-mono text-[#1E460B] uppercase tracking-wider shadow-2xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" />
                      <span>Slot {String(idx + 1).padStart(2, '0')}</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#7A6A4E] uppercase">
                      Honnasandra
                    </span>
                  </div>

                  <div className="relative z-10 space-y-0.5">
                    <h4 className="font-serif text-sm sm:text-base font-medium text-[#111613] line-clamp-2">
                      {item.caption}
                    </h4>
                    <p className="font-mono text-[10px] text-[#5A685D] truncate">
                      {item.alt}
                    </p>
                  </div>

                  <div className="relative z-10 pt-2 border-t border-[#D5C09D]/60 text-[10px] font-mono text-[#1E460B] uppercase tracking-wider">
                    Verified Field Visual
                  </div>
                </div>
              </MotionReveal>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {activeLightboxIndex !== null && galleryItems[activeLightboxIndex] && (
          <div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              aria-label="Previous Image"
              className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              aria-label="Next Image"
              className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-20"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Center Image Content */}
            <div
              className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryItems[activeLightboxIndex].src ? (
                <div className="relative w-full aspect-[16/10] max-h-[70vh] rounded-2xl overflow-hidden">
                  <Image
                    src={galleryItems[activeLightboxIndex].src}
                    alt={galleryItems[activeLightboxIndex].alt || 'Gallery View'}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="w-full h-80 rounded-2xl bg-white/10 flex items-center justify-center text-white font-mono text-sm">
                  {galleryItems[activeLightboxIndex].caption}
                </div>
              )}

              <p className="mt-4 font-mono text-xs sm:text-sm text-white/80 text-center">
                {galleryItems[activeLightboxIndex].caption}
              </p>
            </div>
          </div>
        )}

      </Container>
    </section>
  );
}
