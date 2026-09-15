'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

/**
 * Exhibition Lightbox Modal
 * 
 * Features:
 * - Immersive photographic gallery backdrop (#090D0A solid dark tone)
 * - Accessible keyboard navigation: Esc (close), ArrowLeft (previous), ArrowRight (next)
 * - Lenis scroll-lock integration with layout shift prevention
 * - Responsive Next.js Image with object-contain to preserve full aspect ratio
 * - Visual index counter, category badge, and editorial title
 */
export default function GalleryLightbox({
  isOpen,
  images = [],
  currentIndex = 0,
  onClose,
  onNext,
  onPrev
}) {
  const currentImage = images[currentIndex] || null;

  // 1. Lock and unlock scroll with Lenis synchronization
  useEffect(() => {
    if (isOpen) {
      lockScroll();
      return () => {
        unlockScroll();
      };
    }
  }, [isOpen]);

  // 2. Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  const total = images.length;
  const counterText = `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-label="Image preview exhibition modal"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#090D0A] text-[#FAF6F0] animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* TOP BAR */}
      <div className="relative z-10 flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b border-white/10 bg-[#090D0A]/90 backdrop-blur-sm select-none">
        {/* Counter and Category */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="font-mono text-xs sm:text-sm tracking-widest text-[#55C40D] font-semibold">
            {counterText}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/30" aria-hidden="true" />
          <span className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] sm:text-xs font-mono tracking-wider uppercase text-[#E4D1B5]">
            {currentImage.category}
          </span>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close exhibition view (Escape)"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white/90 hover:text-white transition-colors duration-200 focus:outline-hidden focus:ring-2 focus:ring-[#55C40D]"
        >
          <span className="font-mono text-xs hidden sm:inline tracking-wider uppercase">Close</span>
          <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-90 duration-300" />
        </button>
      </div>

      {/* CENTER STAGE: IMAGE & SIDE NAV BUTTONS */}
      <div className="relative flex-1 min-h-0 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden select-none">
        {/* Previous Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous photograph"
            className="absolute left-3 sm:left-6 lg:left-8 z-20 p-2.5 sm:p-3.5 rounded-full bg-[#111613]/90 hover:bg-[#1E460B] border border-white/25 text-white transition-colors duration-200 shadow-xl focus:outline-hidden focus:ring-2 focus:ring-[#55C40D]"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Main Image Stage */}
        <div
          className="relative w-full h-[55vh] sm:h-[68vh] lg:h-[74vh] max-w-6xl flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            key={currentImage.id}
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-contain"
          />
        </div>

        {/* Next Button */}
        {total > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next photograph"
            className="absolute right-3 sm:right-6 lg:right-8 z-20 p-2.5 sm:p-3.5 rounded-full bg-[#111613]/90 hover:bg-[#1E460B] border border-white/25 text-white transition-colors duration-200 shadow-xl focus:outline-hidden focus:ring-2 focus:ring-[#55C40D]"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      {/* BOTTOM CAPTION BAR */}
      <div className="relative z-10 px-4 sm:px-8 py-4 sm:py-5 border-t border-white/10 bg-[#090D0A]/95 backdrop-blur-sm text-center select-none">
        <div className="max-w-3xl mx-auto">
          <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-white font-normal tracking-tight">
            {currentImage.title}
          </h3>
          <p className="mt-1 font-sans text-xs sm:text-sm text-white/70 line-clamp-2 max-w-2xl mx-auto">
            {currentImage.alt}
          </p>
        </div>
      </div>
    </aside>
  );
}
