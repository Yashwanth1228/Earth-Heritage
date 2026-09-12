'use client';

import { useState, useEffect } from 'react';
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
  const pathname = usePathname();
  const { openEnquiryModal } = useEnquiry();

  const isLanding = pathname === '/' || pathname === '/home';

  useEffect(() => {
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
  }, [isLanding, pathname]);

  const reducedMotion = typeof window !== 'undefined' && isReducedMotion();

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
          'bg-surface/95 backdrop-blur-md',
          'border border-border/90 shadow-[0_12px_36px_rgba(26,22,17,0.08)]',
          'px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5',
          'flex items-center justify-between',
          'transition-all duration-500 ease-corporate-smooth',
          isVisible
            ? 'opacity-100 translate-y-0 visible'
            : reducedMotion
            ? 'opacity-0 invisible'
            : 'opacity-0 translate-y-3 invisible pointer-events-none'
        )}
      >
        {/* Official Earth Heritage Logo */}
        <div className="flex-shrink-0">
          <Logo
            variant="dark"
            size="navbar"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <Navigation className="mx-3 xl:mx-5" />

        {/* Primary Header CTA */}
        <div className="hidden lg:flex items-center">
          <button
            type="button"
            onClick={(e) => openEnquiryModal('General Enquiry', e.currentTarget)}
            className={cn(
              'inline-flex items-center justify-center font-sans font-semibold select-none rounded-full',
              'px-4.5 xl:px-5 py-2 text-xs xl:text-[13px] tracking-wide text-[#FAF6F0]',
              'bg-[linear-gradient(135deg,#163A20_0%,#24552A_50%,#1E460B_100%)]',
              'border border-[#2E6838]/50 shadow-[0_2px_8px_rgba(22,58,32,0.18)]',
              'transition-all duration-250 ease-out',
              'hover:bg-[linear-gradient(135deg,#1C4627_0%,#2B6132_50%,#24540E_100%)]',
              'hover:border-[#3E824A]/80 hover:shadow-[0_4px_14px_rgba(22,58,32,0.26)]',
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
            className="p-1.5 rounded-full text-text-primary hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary transition-colors"
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
