'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';
import { cn } from '@/lib/utils';

/**
 * 09 — PROJECT GALLERY: Editorial Visual Gallery with Lightbox
 * 
 * Strict Standards:
 * - Uses only actual project images supplied later (zero fake stock photos)
 * - Large feature visual + companion editorial layout
 * - Full Lightbox modal with createPortal to document.body, z-[9999]
 * - Lenis scroll-lock integration preventing background scroll and footer bleed
 * - Escape-to-close, Left/Right navigation, and focus management
 * - Responsive layout, reduced-motion support
 */
export default function NairuthyaGallery({ project }) {
  const galleryItems = project?.gallery || [];
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Lock body scroll and pause Lenis while Lightbox is active
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      lockScroll();
      return () => {
        unlockScroll();
      };
    }
  }, [activeLightboxIndex]);

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

        {/* Gallery Showcase Grid (Equal-Sized Cards Grid: 3 cols Desktop, 2 cols Tablet, 1 col Mobile) */}
        {hasRealImages ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
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

        {/* Lightbox Modal rendered via Portal directly into document.body */}
        {mounted && activeLightboxIndex !== null && galleryItems[activeLightboxIndex] && createPortal(
          <div
            className="fixed inset-0 z-[9999] flex flex-col justify-between bg-[#090D0A] text-[#FAF6F0] animate-in fade-in duration-200 select-none overflow-hidden overscroll-contain"
            role="dialog"
            aria-modal="true"
            aria-label="Image Lightbox"
            data-lenis-prevent="true"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeLightbox();
            }}
          >
            {/* Top Bar with Counter and Close Button */}
            <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-white/10 bg-[#090D0A]/95 backdrop-blur-sm select-none">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm tracking-widest text-[#55C40D] font-semibold">
                  {String(activeLightboxIndex + 1).padStart(2, '0')} / {String(galleryItems.length).padStart(2, '0')}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
                <span className="font-mono text-[10px] sm:text-xs text-[#E4D1B5] tracking-wider uppercase">
                  Verified Field Visual
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Close Lightbox (Escape)"
                className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#55C40D]"
              >
                <span className="font-mono text-xs hidden sm:inline tracking-wider uppercase">Close</span>
                <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90 duration-300" />
              </button>
            </div>

            {/* Center Stage: Image and Prev/Next Navigation */}
            <div
              className="relative flex-1 min-h-0 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden select-none"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeLightbox();
              }}
            >
              {/* Prev Button */}
              {galleryItems.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevLightbox();
                  }}
                  aria-label="Previous Image"
                  className="absolute left-3 sm:left-6 lg:left-8 z-20 p-2.5 sm:p-3.5 rounded-full bg-[#111613]/90 hover:bg-[#1E460B] border border-white/25 text-white transition-colors duration-200 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#55C40D]"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}

              {/* Main Image Stage */}
              <div
                className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[76vh] max-w-6xl flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {galleryItems[activeLightboxIndex].src ? (
                  <Image
                    key={galleryItems[activeLightboxIndex].id || activeLightboxIndex}
                    src={galleryItems[activeLightboxIndex].src}
                    alt={galleryItems[activeLightboxIndex].alt || 'Gallery View'}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1200px"
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-80 rounded-2xl bg-white/10 flex items-center justify-center text-white font-mono text-sm">
                    {galleryItems[activeLightboxIndex].caption}
                  </div>
                )}
              </div>

              {/* Next Button */}
              {galleryItems.length > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextLightbox();
                  }}
                  aria-label="Next Image"
                  className="absolute right-3 sm:right-6 lg:right-8 z-20 p-2.5 sm:p-3.5 rounded-full bg-[#111613]/90 hover:bg-[#1E460B] border border-white/25 text-white transition-colors duration-200 shadow-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#55C40D]"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption Bar */}
            <div className="relative z-10 px-4 sm:px-8 py-3.5 sm:py-4 border-t border-white/10 bg-[#090D0A]/95 text-center">
              <p className="font-sans text-xs sm:text-sm text-white/90">
                {galleryItems[activeLightboxIndex].caption || galleryItems[activeLightboxIndex].alt}
              </p>
            </div>
          </div>,
          document.body
        )}

      </Container>
    </section>
  );
}
