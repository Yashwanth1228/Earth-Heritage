'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * Shared hook to coordinate the visibility of floating viewport controls
 * (Floating Enquiry Now button and Floating WhatsApp button)
 * 
 * Rules:
 * - Hidden while the hero section is visible.
 * - Appears after the user has scrolled beyond the hero (~80-100% of hero).
 * - Smoothly hides when returning to the hero.
 * - Floating Enquiry Now button hides when the footer's enquiry/contact area enters the viewport.
 * - WhatsApp button remains available at bottom-right unless scrolled out.
 */
export function useFloatingControls() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isNearFooter, setIsNearFooter] = useState(false);
  const pathname = usePathname();

  const isLanding = pathname === '/' || pathname === '/home';

  useEffect(() => {
    // Initial check on mount or route transition
    const evaluateInitialState = () => {
      const heroEl = document.getElementById('hero');
      const footerEl = document.querySelector('footer');

      if (!isLanding || !heroEl) {
        setIsPastHero(window.scrollY > 350);
      } else {
        const rect = heroEl.getBoundingClientRect();
        setIsPastHero(rect.bottom < window.innerHeight * 0.25);
      }

      if (footerEl) {
        const fRect = footerEl.getBoundingClientRect();
        setIsNearFooter(fRect.top < window.innerHeight - 50);
      } else {
        setIsNearFooter(false);
      }
    };

    evaluateInitialState();

    const ctx = gsap.context(() => {
      const heroEl = document.getElementById('hero');
      const footerEl = document.querySelector('footer');

      if (heroEl) {
        ScrollTrigger.create({
          trigger: heroEl,
          start: '80% top',
          onEnter: () => setIsPastHero(true),
          onLeaveBack: () => setIsPastHero(false),
          invalidateOnRefresh: true
        });
      }

      if (footerEl) {
        ScrollTrigger.create({
          trigger: footerEl,
          start: 'top bottom-=50',
          onEnter: () => setIsNearFooter(true),
          onLeaveBack: () => setIsNearFooter(false),
          invalidateOnRefresh: true
        });
      }
    });

    window.addEventListener('resize', evaluateInitialState, { passive: true });

    return () => {
      ctx.revert();
      window.removeEventListener('resize', evaluateInitialState);
    };
  }, [isLanding, pathname]);

  return { isPastHero, isNearFooter };
}
