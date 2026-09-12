import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register GSAP plugins safely on client
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/**
 * Helper to safely check if client prefers reduced motion
 */
export function isReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
