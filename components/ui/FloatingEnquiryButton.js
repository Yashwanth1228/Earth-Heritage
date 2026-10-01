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
 * - Luxury Forest Green linear gradient (#0E2413 -> #184523 -> #113119) matching the project theme.
 *   Framed with Warm Honey Gold border (#F8C32C), luminous ivory typography (#FAF7F2),
 *   gold sparkle beacon, and dual expanding gold & emerald radiant rings.
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
        {/* 1. Ambient Breathing Radiant Aura (Warm Amber Timber Glow) */}
        {hasEntered && !reducedMotion && (
          <span
            className="absolute -inset-2 rounded-full bg-[#D4A373]/25 blur-xl pointer-events-none animate-enquire-aura -z-20"
            aria-hidden="true"
          />
        )}

        {/* 2. Primary Highly Visible Glowing Expanding Ring (Wave 1 - Warm Honey Gold #F8C32C) */}
        {hasEntered && !reducedMotion && (
          <span
            className="absolute -inset-1 rounded-full border-2 border-[#F8C32C] pointer-events-none animate-enquire-ring-1 pulse-child shadow-[0_0_22px_rgba(248,195,44,0.75)] -z-10"
            aria-hidden="true"
          />
        )}

        {/* 3. Secondary Visible Glowing Expanding Ring (Wave 2 - Warm Bronze Timber #D4A373) */}
        {hasEntered && !reducedMotion && (
          <span
            className="absolute -inset-1 rounded-full border-1.5 border-[#D4A373]/85 pointer-events-none animate-enquire-ring-2 pulse-child shadow-[0_0_26px_rgba(212,163,115,0.65)] -z-10"
            aria-hidden="true"
          />
        )}

        {/* 4. Luxury Handcrafted Wood Design Action Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleClick}
          tabIndex={isVisible ? 0 : -1}
          aria-label="Open Earth Heritage enquiry form"
          aria-hidden={!isVisible}
          style={{
            backgroundImage: "url('/images/wood-texture.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
          className={cn(
            'relative inline-flex items-center justify-center gap-2.5 select-none rounded-full overflow-hidden',
            'px-5 py-3 sm:px-7 sm:py-3.5',
            'bg-[#2B170B]',
            'border-2 border-[#E5B54F]',
            'shadow-[0_8px_30px_rgba(43,23,11,0.65),0_3px_10px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.35)]',
            'hover:shadow-[0_12px_40px_rgba(43,23,11,0.85),0_4px_14px_rgba(0,0,0,0.55),inset_0_1px_2px_rgba(255,255,255,0.50)]',
            'hover:scale-[1.05] active:scale-[0.97]',
            'transition-all duration-200 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5B54F] focus-visible:ring-offset-2',
            'cursor-pointer pointer-events-auto'
          )}
        >
          {/* Subtle Polished Wood Lacquer Warmth Overlay */}
          <span
            className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/40 pointer-events-none rounded-full"
            aria-hidden="true"
          />

          {/* Specular Light Reflection Shimmer Beam */}
          {!reducedMotion && (
            <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none" aria-hidden="true">
              <span className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-button-shimmer pointer-events-none" />
            </span>
          )}

          {/* Eye-catching Sparkle Beacon Badge */}
          <span
            className="relative z-10 flex items-center justify-center w-5 h-5 rounded-full bg-[#E5B54F] text-[#111613] text-[10px] font-bold shadow-sm flex-shrink-0"
            aria-hidden="true"
          >
            ✦
          </span>

          {/* Crisp, High-Contrast Typography in Ivory with subtle wood shadow */}
          <span className="relative z-10 font-sans font-bold text-xs sm:text-[13px] tracking-[0.16em] uppercase text-[#FFFDF9] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
            Enquire Now
          </span>

          {/* Directional Action Indicator Arrow */}
          <svg
            className="relative z-10 w-3.5 h-3.5 text-[#E5B54F] stroke-[2.8] transition-transform duration-200 group-hover:translate-x-0.5 flex-shrink-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]"
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
