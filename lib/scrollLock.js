/**
 * Unified Scroll Lock Manager
 * 
 * Accurately pauses Lenis smooth scrolling and locks native page scrolling
 * when modals/drawers are open, preserving the scroll position and
 * preventing layout shift caused by scrollbar width.
 */

let isLocked = false;
let savedScrollY = 0;

export function lockScroll() {
  if (typeof window === 'undefined') return;
  if (isLocked) return;
  isLocked = true;

  // Capture current scroll position before altering overflow
  savedScrollY = window.scrollY || document.documentElement.scrollTop || 0;

  // 1. Pause Lenis smooth scrolling immediately
  if (window.__lenis && typeof window.__lenis.stop === 'function') {
    window.__lenis.stop();
  }

  // 2. Prevent layout shift by compensating for scrollbar disappearance
  const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
  if (scrollBarWidth > 0) {
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  }

  // 3. Lock native body and html scrolling
  document.documentElement.classList.add('lenis-stopped');
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflow = 'hidden';
}

export function unlockScroll() {
  if (typeof window === 'undefined') return;
  if (!isLocked) return;
  isLocked = false;

  // 1. Restore native styles and padding
  document.documentElement.classList.remove('lenis-stopped');
  document.body.style.overflow = '';
  document.documentElement.style.overflow = '';
  document.body.style.paddingRight = '';

  // 2. Restore exact previous scroll position
  window.scrollTo(0, savedScrollY);

  // 3. Resume Lenis smooth scrolling and synchronize virtual scroll offset
  if (window.__lenis && typeof window.__lenis.start === 'function') {
    if (typeof window.__lenis.scrollTo === 'function') {
      window.__lenis.scrollTo(savedScrollY, { immediate: true });
    }
    window.__lenis.start();
  }
}
