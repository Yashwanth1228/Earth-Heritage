'use client';

import { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useEnquiry } from '@/context/EnquiryContext';
import { useFloatingControls } from '@/hooks/useFloatingControls';
import { isReducedMotion } from '@/lib/gsap';
import { cn } from '@/lib/utils';

/**
 * Floating "Enquire Now" Conversion Action Button
 * 
 * High-Visibility Magnetic Aesthetic:
 * - Brown to Biscuit linear gradient (#4A2A12 -> #7A4B20 -> #B88E3E -> #F0E0C6)
 *   representing fertile earth soil flowing into luminous project biscuit (#f0e0c6).
 *   High-contrast obsidian typography (#111613) and glowing dark gold & biscuit rings.
 * - Dynamic Pop-Up Animation: Energy-infused heartbeat pop every ~2 seconds.
 * - Dual Visible Expanding Radar Rings: Concentric glowing waves ripple outward,
 *   immediately catching the eye from anywhere on the landing page.
 * - Shimmer Beam: Specular light reflection sweeps across the button face in sync with pulse.
 * - Ambient Aura: Soft breathing green aura behind the pill.
 * - Strict Action: Clicking opens the unified EnquiryModal with "General Enquiry" preselected.
 * - Footer & Contact Auto-Hide: Gracefully hides when entering contact/footer area so on-page forms are never covered.
 * - Home Page Smart Scroll: Auto-hides on scroll-down so it never covers headings, lists, images, or FAQ while reading.
 * - Respects prefers-reduced-motion.
 */
export default function FloatingEnquiryButton({ className }) {
  const buttonRef = useRef(null);
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/home';
  const { openEnquiryModal } = useEnquiry();
  const { isPastHero, isNearFooter } = useFloatingControls();

  // Scroll direction awareness for home page to prevent covering editorial content while reading
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    if (!isHome) return;

    let pauseTimer;
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (Math.abs(delta) > 10) {
        if (delta > 0 && currentY > 400) {
          setIsScrollingDown(true);
        } else if (delta < 0) {
          setIsScrollingDown(false);
        }
        lastScrollY.current = currentY;
      }

      // When scroll pauses for 600ms, reveal smoothly
      clearTimeout(pauseTimer);
      pauseTimer = setTimeout(() => {
        setIsScrollingDown(false);
      }, 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(pauseTimer);
    };
  }, [isHome]);

  // Hide when mobile menu drawer is open so drawer bottom content is not obscured
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleToggle = (e) => {
      setIsMobileMenuOpen(!!e.detail?.isOpen);
    };
    window.addEventListener('mobile-menu-toggle', handleToggle);
    return () => window.removeEventListener('mobile-menu-toggle', handleToggle);
  }, []);

  // Visible once past hero, UNLESS entering the footer/contact zone, scrolling down on Home, or mobile menu is open
  const isVisible = isPastHero && !isNearFooter && !(isHome && isScrollingDown) && !isMobileMenuOpen;
  const reducedMotion = typeof window !== 'undefined' && isReducedMotion();

  // Attention breathing state: activated after entrance completes (~500ms delay)
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    let timer;
    if (isVisible) {
      // Short delay after entrance completes before starting recurring ~2s cycle
      timer = setTimeout(() => {
        setHasEntered(true);
      }, 500);
    } else {
      // Stop and reset attention pulse immediately upon exit
      setHasEntered(false);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

  // Pause breathing if browser tab is switched away, resume cleanly on return
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

  const handleClick = (e) => {
    openEnquiryModal('General Enquiry', e.currentTarget);
  };

  if (isMobileMenuOpen) return null;

  return (
    <div
      data-floating-action="enquiry"
      className={cn(
        // Outer Positioning & Entrance/Exit Container (Horizontally Centered at Bottom)
        'fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40',
        'pointer-events-none select-none',
        reducedMotion
          ? isVisible
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
          : isVisible
          ? 'opacity-100 translate-y-0 scale-100 visible pointer-events-auto transition-all duration-400 ease-corporate-smooth delay-0'
          : 'opacity-0 translate-y-6 scale-[0.94] invisible pointer-events-none transition-all duration-300 ease-in delay-0',
        className
      )}
    >
      {/* Inner Attention Pulse Wrapper: Handles energetic pop-up & hover pause */}
      <div
        className={cn(
          'relative inline-flex items-center justify-center group',
          hasEntered && !reducedMotion && 'animate-enquire-pop pause-pulse-on-hover'
        )}
      >
        {/* 1. Ambient Breathing Radiant Aura (Warm Earth Halo) */}
        {hasEntered && !reducedMotion && (
          <span
            className="absolute -inset-2 rounded-full bg-[#B88E3E]/25 blur-xl pointer-events-none animate-enquire-aura -z-20"
            aria-hidden="true"
          />
        )}

        {/* 2. Primary Highly Visible Glowing Expanding Ring (Wave 1 - Warm Earth Dark Gold #B88E3E) */}
        {hasEntered && !reducedMotion && (
          <span
            className="absolute -inset-1 rounded-full border-2 border-[#B88E3E] pointer-events-none animate-enquire-ring-1 pulse-child shadow-[0_0_22px_rgba(184,142,62,0.85),inset_0_0_8px_rgba(240,224,198,0.50)] -z-10"
            aria-hidden="true"
          />
        )}

        {/* 3. Secondary Visible Glowing Expanding Ring (Wave 2 - Luminous Biscuit #F0E0C6) */}
        {hasEntered && !reducedMotion && (
          <span
            className="absolute -inset-1 rounded-full border-1.5 border-[#F0E0C6]/90 pointer-events-none animate-enquire-ring-2 pulse-child shadow-[0_0_28px_rgba(240,224,198,0.65)] -z-10"
            aria-hidden="true"
          />
        )}

        {/* 4. The Vibrant, High-Conversion Action Button: Brown to Biscuit Gradient */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
          tabIndex={isVisible ? 0 : -1}
          aria-label="Open Earth Heritage enquiry form"
          aria-hidden={!isVisible}
          className={cn(
            'relative inline-flex items-center justify-center gap-2.5 select-none rounded-full overflow-hidden',
            'px-5 py-3 sm:px-7 sm:py-3.5',
            'bg-[linear-gradient(135deg,#4A2A12_0%,#7A4B20_30%,#B88E3E_65%,#F0E0C6_100%)]',
            'hover:bg-[linear-gradient(135deg,#593318_0%,#8C5627_30%,#C89D4B_65%,#FAF2E3_100%)]',
            'border-2 border-[#F0E0C6]/90',
            'shadow-[0_8px_30px_rgba(58,32,13,0.40),0_3px_8px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.75)]',
            'hover:shadow-[0_12px_40px_rgba(58,32,13,0.55),0_4px_12px_rgba(0,0,0,0.30),inset_0_1px_1px_rgba(255,255,255,0.90)]',
            'hover:scale-[1.05] active:scale-[0.97]',
            'transition-all duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B88E3E] focus-visible:ring-offset-2',
            'cursor-pointer pointer-events-auto'
          )}
        >
          {/* Specular Light Reflection Shimmer Beam */}
          {!reducedMotion && (
            <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" aria-hidden="true">
              <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/55 to-transparent animate-button-shimmer pointer-events-none" />
            </span>
          )}

          {/* Eye-catching Sparkle Beacon Badge */}
          <span
            className="flex items-center justify-center w-5 h-5 rounded-full bg-[#111613] text-[#F0E0C6] text-[10px] font-bold shadow-sm flex-shrink-0"
            aria-hidden="true"
          >
            ✦
          </span>

          {/* Crisp, High-Contrast Typography in Obsidian with Specular Drop Shadow */}
          <span className="font-sans font-extrabold text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#111613] drop-shadow-[0_1px_0_rgba(255,255,255,0.55)]">
            Enquire Now
          </span>

          {/* Directional Action Indicator Arrow */}
          <svg
            className="w-3.5 h-3.5 text-[#111613] stroke-[2.8] transition-transform duration-200 group-hover:translate-x-0.5 flex-shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
