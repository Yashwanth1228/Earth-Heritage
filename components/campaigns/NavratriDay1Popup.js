'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { lockScroll, unlockScroll } from '@/lib/scrollLock';

/**
 * Day 1 Navratri Campaign Promotional Popup
 * 
 * - Active Date: October 11, 2026 only (visitor's local calendar date)
 * - Session Management: Closed once per session via sessionStorage ('navratriDay1PopupClosed')
 * - Testing/Preview: Supports query param `?preview=navratri-day-1`
 * - Aspect Ratio: Exact 1024:1015 uncropped original campaign poster
 * - Accessibility: Accessible dialog semantics, Escape key listener, backdrop click, focus management
 * - Scroll Lock: Pauses Lenis and locks native body scrolling while open
 */
export default function NavratriDay1Popup() {
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
    const isPreview = urlParams?.get('preview') === 'navratri-day-1';

    try {
      if (sessionStorage.getItem('navratriDay1PopupClosed') === 'true' && !isPreview) {
        return;
      }
    } catch {
      // Ignore storage access errors in private/restricted environments
    }

    const now = new Date();
    // Active strictly during October 11, 2026 (from 12:00 AM to 11:59:59 PM local time)
    // Month is 0-indexed in JavaScript Date (0 = Jan, 9 = Oct)
    const isCampaignActive =
      now.getFullYear() === 2026 && now.getMonth() === 9 && now.getDate() === 11;

    if (isCampaignActive || isPreview) {
      // Store current active element to restore focus after closing
      previousActiveElementRef.current = document.activeElement;

      // Restrained entrance timing (slight pause after initial page paint)
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, []);

  // Handle Close
  const closePopup = useCallback(() => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('navratriDay1PopupClosed', 'true');
    } catch {
      // Ignore storage access errors
    }

    // Restore focus to previously focused element
    if (
      previousActiveElementRef.current &&
      typeof previousActiveElementRef.current.focus === 'function'
    ) {
      previousActiveElementRef.current.focus();
    }
  }, []);

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

  if (!mounted) return null;

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-hidden overscroll-contain"
              role="dialog"
              aria-modal="true"
              aria-label="Happy Navratri Day 1 — Earth Heritage"
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
                    aspectRatio: '1024 / 1015',
                    maxHeight: 'min(86vh, 760px)',
                    maxWidth: 'min(88vw, calc(86vh * (1024 / 1015)), 760px)',
                    width: 'auto',
                    height: 'auto'
                  }}
                >
                  <Image
                    src="https://res.cloudinary.com/yffbj6hj/image/upload/v1791637214/earth-heritage/campaign/navratri-day-1-2026.jpg"
                    alt="Day 1 Happy Navratri — Earth Heritage — May the divine energy of Maa Durga bring prosperity to every field and every farmer's dream. Rooted in Nature, Blessed with Prosperity."
                    width={1024}
                    height={1015}
                    priority
                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 70vw, 760px"
                    className="w-full h-full object-contain"
                  />

                  {/* Clearly visible close button pinned to top right corner */}
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closePopup}
                    aria-label="Close Happy Navratri Day 1 announcement"
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
