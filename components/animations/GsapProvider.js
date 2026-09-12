'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

/**
 * GsapProvider utility component to handle lifecycle and ScrollTrigger refresh
 */
export default function GsapProvider({ children }) {
  useEffect(() => {
    // Refresh ScrollTrigger after initial mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}
