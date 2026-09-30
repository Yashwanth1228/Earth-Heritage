'use client';

import Image from 'next/image';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { cn } from '@/lib/utils';

/**
 * Editorial Image Slot Component
 * 
 * Renders an optimized Image component when a valid src is provided.
 * When real project photography is pending, it displays an editorial,
 * brand-consistent placeholder canvas with Earth Heritage topographic contours,
 * restrained typography, and a clear slot label.
 */
export default function EditorialImageSlot({
  src,
  alt = 'Nairuthya Whispering Wood',
  slotLabel = 'Project Photography Slot',
  caption,
  className,
  aspectRatio = 'aspect-[16/10]',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  overlay = true,
  variant = 'dark',
  children
}) {
  const hasValidImage = typeof src === 'string' && src.trim().length > 0;
  const isNeutral = variant === 'neutral';

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-xl sm:rounded-2xl border',
        isNeutral ? 'border-[#DCCDB7] bg-[#EFE7DA]' : 'border-[#D5C09D]/80 bg-[#102B17]',
        aspectRatio,
        className
      )}
    >
      {hasValidImage ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          {overlay && (
            <div
              className={cn(
                'absolute inset-0 pointer-events-none',
                isNeutral
                  ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent'
                  : 'bg-gradient-to-t from-[#08170D]/85 via-[#08170D]/30 to-transparent'
              )}
              aria-hidden="true"
            />
          )}
        </>
      ) : isNeutral ? (
        /* Warm Neutral Editorial Placeholder Canvas */
        <div className="relative w-full h-full flex flex-col justify-between p-4 sm:p-5 bg-gradient-to-b from-[#FBF8F3] via-[#F3ECE0] to-[#E9DFC8] select-none text-[#111613] overflow-hidden">
          {/* Subtle Topographic Contours */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <LandContourPattern variant="biscuit-topography" />
          </div>

          {/* Top Slot Metadata Pill */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 border border-[#D5C09D] text-[10px] font-mono tracking-widest text-[#1E460B] uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{slotLabel}</span>
            </div>
            <span className="text-[10px] font-mono text-[#7A6A4E] uppercase tracking-wider hidden sm:inline-block">
              Earth Heritage
            </span>
          </div>

          {/* Center Brand Identity Watermark */}
          <div className="relative z-10 my-auto text-center py-2 space-y-0.5">
            <span className="block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#7A6A4E] font-medium">
              Honnasandra &bull; Nelamangala
            </span>
            <h4 className="font-serif text-base sm:text-lg font-medium text-[#111613] tracking-tight line-clamp-1">
              {alt}
            </h4>
          </div>

          {/* Bottom Caption Bar */}
          {caption && (
            <div className="relative z-10 pt-1.5 border-t border-[#D5C09D]/60">
              <p className="font-mono text-[10px] text-[#5A685D] truncate">
                {caption}
              </p>
            </div>
          )}

          {children}
        </div>
      ) : (
        /* Dark Forest Editorial Placeholder Canvas */
        <div className="relative w-full h-full flex flex-col justify-between p-5 sm:p-6 bg-gradient-to-b from-[#13331C] via-[#0F2816] to-[#0A1A0E] select-none text-[#FAF7F2] overflow-hidden">
          {/* Background Topographic Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-25">
            <LandContourPattern variant="biscuit-contours" />
          </div>

          {/* Top Slot Metadata Pill */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] sm:text-[11px] font-mono tracking-widest text-[#F8C32C] uppercase shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#55C40D]" aria-hidden="true" />
              <span>{slotLabel}</span>
            </div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden sm:inline-block">
              Earth Heritage
            </span>
          </div>

          {/* Center Brand Identity Watermark */}
          <div className="relative z-10 my-auto text-center py-3 space-y-1">
            <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-[#C6923C] font-semibold">
              Honnasandra &bull; Nelamangala
            </span>
            <h4 className="font-serif text-lg sm:text-xl font-normal text-[#FAF7F2] tracking-tight">
              {alt}
            </h4>
          </div>

          {/* Bottom Caption Bar */}
          {caption && (
            <div className="relative z-10 pt-1.5 border-t border-white/10">
              <p className="font-mono text-[10px] sm:text-[11px] text-white/60">
                {caption}
              </p>
            </div>
          )}

          {children}
        </div>
      )}
    </div>
  );
}
