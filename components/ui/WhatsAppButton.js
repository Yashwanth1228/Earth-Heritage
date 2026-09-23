'use client';

import { useRef, useState, useEffect } from 'react';
import { getWhatsAppUrl } from '@/data/company';
import { useFloatingControls } from '@/hooks/useFloatingControls';
import { isReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Floating WhatsApp Contact Action Button
 * 
 * Features:
 * - Authentic WhatsApp visual mark: official white speech-bubble phone mark on WhatsApp green (#25D366).
 * - Fixed position: bottom-right (Desktop: ~58px, Mobile: ~52px).
 * - STAGE 1 (Entry): Hidden during hero; dynamically enters once scrolled beyond hero
 *   (scale: 0.75 -> 1.04 -> 1, translateY: 20px -> 0, opacity: 0 -> 1 in 450ms).
 * - STAGE 2 (Recurring ~2s Attention Cycle with 400ms Stagger):
 *   Begins after entrance completes (~500ms rest delay).
 *   Subtle breathing pulse (scale 1 -> 1.025 -> 1 over ~520ms, pause ~1.48s, repeats every ~2s)
 *   accompanied by a delicate expanding/fading soft ring.
 *   Staggered 400ms after Enquire Now so the controls breathe organically.
 * - STRICT ISOLATION: Always opens WhatsApp click-to-chat (web or native app in new tab/window).
 *   Never routes to or opens the enquiry modal.
 * - Hover & Click: Hover scales to 1.05 and pauses the pulse cycle; click has tactile press feedback (scale 0.96).
 * - Scroll Back to Hero: Immediately cancels attention breathing and smoothly retreats.
 * - Respects prefers-reduced-motion.
 */
export default function WhatsAppButton({ className }) {
  const buttonRef = useRef(null);
  const { isPastHero } = useFloatingControls();
  const whatsappUrl = getWhatsAppUrl();

  // Hide when mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleToggle = (e) => {
      setIsMobileMenuOpen(!!e.detail?.isOpen);
    };
    window.addEventListener('mobile-menu-toggle', handleToggle);
    return () => window.removeEventListener('mobile-menu-toggle', handleToggle);
  }, []);

  const isVisible = isPastHero && !isMobileMenuOpen;
  const reducedMotion = typeof window !== 'undefined' && isReducedMotion();

  // Attention breathing state: activates after entrance settles (~500ms delay)
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    let timer;
    if (isVisible) {
      // Short delay after entrance completes before starting recurring ~2s cycle
      timer = setTimeout(() => {
        setHasEntered(true);
      }, 500);
    } else {
      setHasEntered(false);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Pause breathing if browser tab is switched away, resume on return
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setHasEntered(false);
      } else if (isVisible) {
        setTimeout(() => setHasEntered(true), 500);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [isVisible]);

  const iconContent = (
    <svg
      className="w-7 h-7 sm:w-8 sm:h-8 fill-white transition-transform duration-200"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01zm-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.182 8.182 0 0 1 2.41 5.83c0 4.55-3.7 8.25-8.24 8.25zm4.53-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.09-.39-.14-.56.12-.17.25-.64.81-.78.97-.15.17-.29.19-.54.07-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.26-.42.08-.17.04-.31-.02-.44-.07-.13-.56-1.34-.77-1.84-.2-.48-.4-.42-.55-.43h-.47c-.17 0-.44.06-.68.32-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.02 2.6.13.17 1.78 2.72 4.31 3.82.6.26 1.07.42 1.45.54.61.19 1.16.17 1.6.1.49-.07 1.48-.6 1.69-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.18-.47-.3z" />
    </svg>
  );

  if (isMobileMenuOpen) return null;

  return (
    <div
      data-floating-action="whatsapp"
      className={cn(
        // Outer Positioning & Entrance/Exit Container (Fixed Bottom-Right)
        'fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40',
        'pointer-events-none select-none',
        reducedMotion
          ? isVisible
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
          : isVisible
          ? 'opacity-100 translate-y-0 scale-100 visible pointer-events-auto transition-all duration-450 ease-[cubic-bezier(0.34,1.25,0.64,1)] delay-100'
          : 'opacity-0 translate-y-5 scale-75 invisible pointer-events-none transition-all duration-300 ease-in delay-0',
        className
      )}
    >
      {/* Inner Attention Pulse Wrapper: Handles subtle secondary breathing & hover pause */}
      <div
        className={cn(
          'relative inline-flex items-center justify-center',
          hasEntered && !reducedMotion && 'animate-whatsapp-pop pause-pulse-on-hover'
        )}
      >
        {/* Visible Glowing Expanding Ring Wave */}
        {hasEntered && !reducedMotion && (
          <span
            className="absolute -inset-1 rounded-full border-2 border-[#25D366] pointer-events-none animate-whatsapp-ring-wave pulse-child shadow-[0_0_16px_rgba(37,211,102,0.65)] -z-10"
            aria-hidden="true"
          />
        )}

        {/* WhatsApp Action Button: Strictly routes to WhatsApp click-to-chat */}
        <a
          ref={buttonRef}
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isVisible ? 0 : -1}
          aria-label="Contact Earth Heritage on WhatsApp"
          aria-hidden={!isVisible}
          className={cn(
            'relative w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full',
            'flex items-center justify-center select-none',
            'bg-[#25D366] hover:bg-[#20BA5A]',
            'text-white',
            'shadow-[0_6px_20px_rgba(37,211,102,0.38)] hover:shadow-[0_8px_26px_rgba(37,211,102,0.50)]',
            'hover:scale-105 active:scale-[0.96]',
            'transition-all duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2',
            'cursor-pointer pointer-events-auto'
          )}
        >
          {iconContent}
        </a>
      </div>
    </div>
  );
}
