import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Cinematic Image Slot Component
 * 
 * Designed to provide a premium, editorial visual placeholder for development
 * and seamlessly accept authentic Earth Heritage high-resolution photography
 * without altering any layout or responsive code.
 * 
 * TODO: Replace default slot treatments with authentic Earth Heritage photography when delivered.
 */
export default function CinematicImageSlot({
  src,
  alt = 'Earth Heritage Landscape',
  slotType = 'landscape', // 'hero' | 'landscape' | 'editorial' | 'portrait' | 'philosophy'
  aspectRatio = '16/9',
  priority = false,
  className,
  overlay = true,
  overlayClassName,
  children
}) {
  const aspectStyles = {
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '1/1': 'aspect-square',
    '4/5': 'aspect-[4/5]',
    '21/9': 'aspect-[21/9]',
    full: 'h-full w-full'
  };

  // Curated, architectural tone treatments for different slot types
  const slotAtmospheres = {
    hero: 'from-[#111713] via-[#1A251E] to-[#121814]',
    landscape: 'from-[#1B241D] via-[#243027] to-[#171F19]',
    editorial: 'from-[#EFEFEA] via-[#E4E6E1] to-[#D9DCD5]',
    portrait: 'from-[#161D18] via-[#202A23] to-[#141B16]',
    philosophy: 'from-[#0A0E0B] via-[#121814] to-[#0A0E0B]'
  };

  const isDarkSlot = slotType === 'hero' || slotType === 'landscape' || slotType === 'portrait' || slotType === 'philosophy';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-md transition-all duration-300',
        aspectStyles[aspectRatio] || 'aspect-[16/9]',
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 50vw"
          className="object-cover object-center"
        />
      ) : (
        /* Architectural editorial gradient composition representing natural topography */
        <div
          className={cn(
            'absolute inset-0 w-full h-full bg-gradient-to-br transition-opacity',
            slotAtmospheres[slotType] || slotAtmospheres.landscape
          )}
        >
          {/* Subtle natural contour and depth rings */}
          <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
            <svg
              className="w-full h-full"
              viewBox="0 0 800 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M-50 450 C 200 380, 450 550, 850 420"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                className={isDarkSlot ? 'text-white/40' : 'text-black/30'}
              />
              <path
                d="M-20 280 C 250 200, 520 360, 850 240"
                stroke="currentColor"
                strokeWidth="1.5"
                className={isDarkSlot ? 'text-brand-primary/30' : 'text-brand-deep/25'}
              />
              <path
                d="M0 120 C 300 80, 500 180, 850 100"
                stroke="currentColor"
                strokeWidth="1"
                className={isDarkSlot ? 'text-white/20' : 'text-black/20'}
              />
            </svg>
          </div>

          {/* Minimalist architectural coordinate stamp */}
          <div
            className={cn(
              'absolute bottom-4 left-4 sm:bottom-6 sm:left-6 font-mono text-[10px] tracking-widest uppercase opacity-40 select-none',
              isDarkSlot ? 'text-white' : 'text-black'
            )}
            aria-hidden="true"
          >
            Earth Heritage // Land Archive
          </div>
        </div>
      )}

      {/* Readability Overlay */}
      {overlay && (
        <div
          className={cn(
            'absolute inset-0 pointer-events-none transition-opacity duration-200',
            overlayClassName
          )}
          aria-hidden="true"
        />
      )}

      {/* Optional Inset Content */}
      {children && <div className="relative z-10 w-full h-full">{children}</div>}
    </div>
  );
}
