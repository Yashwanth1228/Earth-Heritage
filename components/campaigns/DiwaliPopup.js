'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

/**
 * Dedicated Two-Day Diwali Festival Campaign Promotional Popup
 * 
 * Display Schedule (strictly Asia/Kolkata Indian Standard Time):
 * - 8 November 2026: Day 1 — Happy Deepavali (/images/diwali-2026-day1.jpg)
 * - 9 November 2026: Day 2 — Happy Diwali (/images/diwali-2026-day2.jpg)
 * - 10 November 2026 onwards: Expired; neither poster appears automatically.
 * 
 * Independent Daily Session Dismissal:
 * - Day 1 uses sessionStorage key: 'diwaliDay1PopupClosed'
 * - Day 2 uses sessionStorage key: 'diwaliDay2PopupClosed'
 * - Dismissing on Day 1 will never suppress the Day 2 announcement.
 * 
 * Preview Query Parameters:
 * - ?preview=diwali-day1 (Forces Day 1 poster for testing, bypasses date & session checks)
 * - ?preview=diwali-day2 (Forces Day 2 poster for testing, bypasses date & session checks)
 */
export const DIWALI_SCHEDULE = {
  '2026-11-08': {
    dayNumber: 1,
    key: 'diwali-day1',
    storageKey: 'diwaliDay1PopupClosed',
    title: 'Happy Deepavali — Earth Heritage',
    alt: 'Happy Deepavali — Earth Heritage — May this Deepavali bring new beginnings, bright opportunities and a greener, happier tomorrow for you and your family.',
    closeLabel: 'Close Happy Deepavali Day 1 announcement',
    src: '/images/diwali-2026-day1.jpg'
  },
  '2026-11-09': {
    dayNumber: 2,
    key: 'diwali-day2',
    storageKey: 'diwaliDay2PopupClosed',
    title: 'Happy Diwali — Earth Heritage',
    alt: 'Happy Diwali — Earth Heritage — May this Diwali bring new beginnings, bright opportunities and a greener, happier tomorrow for you and your family.',
    closeLabel: 'Close Happy Diwali Day 2 announcement',
    src: '/images/diwali-2026-day2.jpg'
  }
};

export default function DiwaliPopup() {
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef(null);
  const previousActiveElementRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Evaluate date, preview param, and session dismissal on mount
  useEffect(() => {
    setMounted(true);

    const urlParams =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : null;
    const previewParam = urlParams?.get('preview')?.toLowerCase();

    let selectedCampaign = null;
    let isPreview = false;

    // Check query param for explicit preview mode
    if (previewParam) {
      if (previewParam === 'diwali-day1') {
        selectedCampaign = DIWALI_SCHEDULE['2026-11-08'];
        isPreview = true;
      } else if (previewParam === 'diwali-day2') {
        selectedCampaign = DIWALI_SCHEDULE['2026-11-09'];
        isPreview = true;
      }
    }

    // When not in preview mode, resolve schedule strictly by Asia/Kolkata calendar date
    if (!isPreview) {
      const istDateString = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(new Date());

      selectedCampaign = DIWALI_SCHEDULE[istDateString] || null;
    }

    if (!selectedCampaign) {
      return;
    }

    setActiveCampaign(selectedCampaign);

    // Independent daily session dismissal check
    try {
      if (
        !isPreview &&
        sessionStorage.getItem(selectedCampaign.storageKey) === 'true'
      ) {
        return;
      }
    } catch {
      // Ignore storage access errors in private/restricted environments
    }

    // Save current active element to restore focus after closing
    previousActiveElementRef.current = document.activeElement;

    // Restrained entrance timing (slight pause after initial page paint)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle Close & Session Dismissal
  const closePopup = useCallback(() => {
    setIsOpen(false);
    if (activeCampaign?.storageKey) {
      try {
        sessionStorage.setItem(activeCampaign.storageKey, 'true');
      } catch {
        // Ignore storage access errors
      }
    }

    // Restore focus to previously focused element
    if (
      previousActiveElementRef.current &&
      typeof previousActiveElementRef.current.focus === 'function'
    ) {
      previousActiveElementRef.current.focus();
    }
  }, [activeCampaign]);

  // Scroll lock integration (pauses Lenis and locks native body scroll)
  useEffect(() => {
    if (isOpen) {
      lockScroll();
      return () => {
        unlockScroll();
      };
    }
  }, [isOpen]);

  // Keyboard navigation (Escape key & focus trap)
  useEffect(() => {
    if (!isOpen) return;

    // Focus close button on open
    const focusTimer = setTimeout(() => {
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }, 100);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closePopup();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [isOpen, closePopup]);

  if (!mounted || !activeCampaign) return null;

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden overscroll-contain"
              role="dialog"
              aria-modal="true"
              aria-label={activeCampaign.title}
              data-lenis-prevent="true"
            >
              {/* Subtle dark translucent backdrop — clicking outside closes the modal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 0.3,
                  ease: 'easeOut'
                }}
                onClick={closePopup}
                className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"
                aria-hidden="true"
              />

              {/* Centered Poster Container — Clicking inside does NOT close */}
              <motion.div
                initial={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.96 }
                }
                animate={{ opacity: 1, scale: 1 }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.96 }
                }
                transition={{
                  duration: shouldReduceMotion ? 0.15 : 0.32,
                  ease: [0.25, 1, 0.5, 1]
                }}
                className="relative z-10 flex flex-col items-center justify-center select-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Poster Frame */}
                <div
                  className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-[#15341C] flex items-center justify-center"
                  style={{
                    aspectRatio: '1 / 1',
                    maxHeight: 'min(86vh, 760px)',
                    maxWidth: 'min(88vw, 86vh, 760px)',
                    width: 'min(88vw, 86vh, 760px)',
                    height: 'auto'
                  }}
                >
                  <Image
                    src={activeCampaign.src}
                    alt={activeCampaign.alt}
                    width={1024}
                    height={1024}
                    priority
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 760px"
                    className="w-full h-full object-contain"
                  />

                  {/* Clearly visible close button pinned to top right corner */}
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closePopup}
                    aria-label={activeCampaign.closeLabel}
                    className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#102B17]/90 hover:bg-[#1E460B] active:scale-95 text-white/95 hover:text-white border border-white/40 shadow-lg flex items-center justify-center cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#55C40D]"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

