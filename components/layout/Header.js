'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/layout/Navigation';
import MobileMenu from '@/components/layout/MobileMenu';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { gsap, ScrollTrigger, isReducedMotion } from '@/lib/gsap';
import { useEnquiry } from '@/context/EnquiryContext';

/**
 * Refined Floating Pill Navigation Header
 * 
 * 1. Hidden at top of hero on landing page (/)
 * 2. Reveals smoothly with subtle fade + upward movement once scrolled past hero
 * 3. Compact, elegant floating pill geometry (rounded-full)
 * 4. Respects prefers-reduced-motion
 */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const activeDarkElements = useRef(new Set());
  const pathname = usePathname();
  const isLanding = pathname === '/lp/managed-farmland';
  const isIsolatedCampaign = pathname?.startsWith('/lp') && pathname !== '/lp/managed-farmland';
  const { openEnquiryModal } = useEnquiry();

  // Coordinate entrance and exit on landing page
  useEffect(() => {
    if (isIsolatedCampaign) return;

    // For non-landing pages, navbar is always visible as a floating pill
    if (!isLanding) {
      setIsVisible(true);
      return;
    }

    // On landing page (/), check scroll position against hero
    const checkScroll = () => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        // Reveal once user has meaningfully scrolled past ~80% of hero
        setIsVisible(rect.bottom < window.innerHeight * 0.25);
      } else {
        setIsVisible(window.scrollY > 450);
      }
    };

    checkScroll();

    // GSAP ScrollTrigger to coordinate entrance and exit
    const ctx = gsap.context(() => {
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        ScrollTrigger.create({
          trigger: heroEl,
          start: '80% top',
          onEnter: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false),
          onEnterBack: () => setIsVisible(true),
          invalidateOnRefresh: true
        });
      } else {
        ScrollTrigger.create({
          start: 450,
          onEnter: () => setIsVisible(true),
          onLeaveBack: () => setIsVisible(false)
        });
      }
    });

    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [isLanding, isIsolatedCampaign, pathname]);

  // Contextual background observer: dynamically detects when dark CTA or footer enters navbar region
  useEffect(() => {
    if (isIsolatedCampaign) return;

    const currentDarkElements = activeDarkElements.current;
    currentDarkElements.clear();
    const darkEls = document.querySelectorAll('[data-navbar-theme="dark"]');

    if (darkEls.length === 0) {
      setIsDarkTheme(false);
      return;
    }

    // IntersectionObserver tracks when any dark section covers the top navbar strip
    // Root margin focuses strictly on the visual band where the floating pill sits (-20px to -85%)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentDarkElements.add(entry.target);
          } else {
            currentDarkElements.delete(entry.target);
          }
        });
        setIsDarkTheme(currentDarkElements.size > 0);
      },
      {
        root: null,
        rootMargin: '-20px 0px -85% 0px',
        threshold: 0
      }
    );

    darkEls.forEach((el) => observer.observe(el));

    // Immediate initial check for instant rendering (e.g. scroll restoration on page refresh)
    let isDark = false;
    darkEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 20) {
        isDark = true;
        currentDarkElements.add(el);
      }
    });
    setIsDarkTheme(isDark);

    return () => {
      observer.disconnect();
      currentDarkElements.clear();
    };
  }, [isIsolatedCampaign, pathname]);

  const reducedMotion = typeof window !== 'undefined' && isReducedMotion();

  if (isIsolatedCampaign) {
    return null;
  }

  return (
    <header
      className={cn(
        'fixed top-4 sm:top-6 left-0 right-0 z-40 flex justify-center pointer-events-none transition-all',
        isVisible ? 'pointer-events-auto' : 'pointer-events-none'
      )}
      aria-label="Earth Heritage Corporate Navigation"
    >
      <div
        className={cn(
          'w-[94vw] md:w-[92vw] lg:w-[90vw] max-w-[1400px] rounded-full mx-auto',
          'px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5',
          'flex items-center justify-between',
          // Seamless 300ms CSS transitions for background, border, shadow
          'transition-[background-color,border-color,box-shadow,opacity,transform] duration-300 ease-out',
          isDarkTheme
            ? 'bg-[#0e2114]/92 backdrop-blur-md border border-[#235832]/80 shadow-[0_16px_40px_rgba(0,0,0,0.4)]'
            : 'bg-surface/95 backdrop-blur-md border border-border/90 shadow-[0_12px_36px_rgba(26,22,17,0.08)]',
          isVisible
            ? 'opacity-100 translate-y-0 visible'
            : reducedMotion
            ? 'opacity-0 invisible'
            : 'opacity-0 translate-y-3 invisible pointer-events-none'
        )}
      >
        {/* Official Earth Heritage Logo with 300ms cross-fade between dark and light variants */}
        <div className="flex-shrink-0">
          <Logo
            variant={isDarkTheme ? 'light' : 'dark'}
            size="navbar"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <Navigation className="mx-3 xl:mx-5" isInverse={isDarkTheme} />

        {/* Primary Header CTA */}
        <div className="hidden lg:flex items-center">
          <button
            type="button"
            onClick={(e) => openEnquiryModal('General Enquiry', e.currentTarget)}
            className={cn(
              'inline-flex items-center justify-center font-sans font-semibold select-none rounded-full',
              'px-4.5 xl:px-5 py-2 text-xs xl:text-[13px] tracking-wide text-[#FAF6F0]',
              'bg-[linear-gradient(135deg,#163A20_0%,#24552A_50%,#1E460B_100%)]',
              'transition-all duration-250 ease-out',
              isDarkTheme
                ? 'border border-[#468F55]/70 shadow-[0_2px_12px_rgba(85,196,13,0.22)] hover:border-[#55c40d]'
                : 'border border-[#2E6838]/50 shadow-[0_2px_8px_rgba(22,58,32,0.18)] hover:border-[#3E824A]/80',
              'hover:bg-[linear-gradient(135deg,#1C4627_0%,#2B6132_50%,#24540E_100%)]',
              'hover:shadow-[0_4px_14px_rgba(22,58,32,0.26)]',
              'hover:scale-[1.02] active:scale-[0.99]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2'
            )}
          >
            Talk to Us
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className={cn(
              'p-1.5 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
              isDarkTheme
                ? 'text-[#FAF7F2] hover:bg-white/10'
                : 'text-text-primary hover:bg-surface-subtle'
            )}
            aria-label="Open mobile navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
