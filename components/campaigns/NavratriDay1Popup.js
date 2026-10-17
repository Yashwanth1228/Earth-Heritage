'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

/**
 * Multi-Day Festival Campaign Promotional Popup
 * 
 * Schedules festival announcement posters automatically by calendar date
 * strictly in India Standard Time (Asia/Kolkata):
 * 
 * - 17 October 2026: Day 7 — Maa Kalaratri
 * - 18 October 2026: Day 8 — Maa Mahagauri (Image 1)
 * - 19 October 2026: Day 9 — Maa Siddhidatri (Image 2)
 * - 20 October 2026 onward: Expired, popup does not appear
 * 
 * Daily Dismissal:
 * - Each day maintains its own independent session dismissal key in sessionStorage
 *   so dismissing on 18 Oct does not suppress the new 19 Oct announcement.
 * 
 * Preview URLs:
 * - ?preview=navratri-day-8 (Forces Day 8 popup for testing)
 * - ?preview=navratri-day-9 (Forces Day 9 popup for testing)
 * - ?preview=navratri-day-7 (Forces Day 7 popup for testing)
 */
export const FESTIVAL_SCHEDULE = {
  '2026-10-17': {
    dayNumber: 7,
    key: 'day-7',
    storageKey: 'navratriDay7PopupClosed',
    title: 'Happy Navratri Day 7 — Maa Kalaratri — Earth Heritage',
    alt: 'Day 7 Happy Navratri — Maa Kalaratri — Earth Heritage — May Maa Kalaratri remove darkness and fear from our lives, blessing us with courage, protection, peace, and prosperity. Rooted in Nature, Blessed with Prosperity.',
    closeLabel: 'Close Happy Navratri Day 7 announcement',
    src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1792154626/earth-heritage/campaign/navratri-day-7-2026.jpg'
  },
  '2026-10-18': {
    dayNumber: 8,
    key: 'day-8',
    storageKey: 'navratriDay8PopupClosed',
    title: 'Happy Navratri Day 8 — Maa Mahagauri — Earth Heritage',
    alt: 'Day 8 Happy Navratri — Maa Mahagauri — Earth Heritage — May Maa Mahagauri bless our lives with purity, peace, happiness, divine grace, and everlasting prosperity. Rooted in Nature, Blessed with Prosperity.',
    closeLabel: 'Close Happy Navratri Day 8 announcement',
    src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1792233396/earth-heritage/campaign/navratri-day-8-2026.jpg'
  },
  '2026-10-19': {
    dayNumber: 9,
    key: 'day-9',
    storageKey: 'navratriDay9PopupClosed',
    title: 'Happy Navratri Day 9 — Maa Siddhidatri — Earth Heritage',
    alt: 'Day 9 Happy Navratri — Maa Siddhidatri — Earth Heritage — May Maa Siddhidatri bless our lives with wisdom, spiritual strength, fulfilment, and abundant prosperity. Rooted in Nature, Blessed with Prosperity.',
    closeLabel: 'Close Happy Navratri Day 9 announcement',
    src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1792233397/earth-heritage/campaign/navratri-day-9-2026.jpg'
  }
};

export default function NavratriPopup() {
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeButtonRef = useRef(null);
  const previousActiveElementRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Check date and session storage on client mount
  useEffect(() => {
    setMounted(true);

    const urlParams =
      typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : null;
    const previewParam = urlParams?.get('preview')?.toLowerCase();

    let selectedCampaign = null;
    let isPreview = false;

    // Check query param for explicit day previewing
    if (previewParam) {
      if (previewParam === 'navratri-day-9' || previewParam === 'day-9') {
        selectedCampaign = FESTIVAL_SCHEDULE['2026-10-19'];
        isPreview = true;
      } else if (previewParam === 'navratri-day-8' || previewParam === 'day-8') {
        selectedCampaign = FESTIVAL_SCHEDULE['2026-10-18'];
        isPreview = true;
      } else if (previewParam === 'navratri-day-7' || previewParam === 'day-7') {
        selectedCampaign = FESTIVAL_SCHEDULE['2026-10-17'];
        isPreview = true;
      } else if (
        previewParam === 'navratri' ||
        previewParam.startsWith('navratri-day-')
      ) {
        // Fallback for general preview or older day params
        const todayIST = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Asia/Kolkata',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).format(new Date());
        selectedCampaign = FESTIVAL_SCHEDULE[todayIST] || FESTIVAL_SCHEDULE['2026-10-18'];
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

      selectedCampaign = FESTIVAL_SCHEDULE[istDateString] || null;
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

    // Store current active element to restore focus after closing
    previousActiveElementRef.current = document.activeElement;

    // Restrained entrance timing (slight pause after initial page paint)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle Close
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

  // Scroll lock integration
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
