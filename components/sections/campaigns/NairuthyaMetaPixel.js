'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export const NAIRUTHYA_META_PIXEL_ID = '1136200858753693';

/**
 * Meta Pixel Integration for Nairuthya Whispering Wood Campaign Landing Page
 * Scoped strictly to route: /lp/nairuthya-whispering-wood
 *
 * Implements:
 * 1. Base Meta Pixel initialization and initial PageView.
 * 2. Client-side navigation PageView dispatch without double-firing on initial load.
 * 3. Passive, throttled scroll depth milestone tracking (25%, 50%, 75%, 90%).
 * 4. Tab visibility-aware active engagement duration tracking (15s, 30s, 60s, 120s).
 * 5. Strict noscript fallback.
 * 6. Zero PII transmission.
 */
export default function NairuthyaMetaPixel() {
  useEffect(() => {
    // 1. Handle client-side navigation (SPA re-entry) without duplicate PageView on initial mount
    if (typeof window !== 'undefined') {
      if (window._nairuthyaPixelLoaded && typeof window.fbq === 'function') {
        window.fbq('track', 'PageView');
      } else {
        window._nairuthyaPixelLoaded = true;
      }
    }

    // 2. Tab visibility-aware active engagement duration tracking
    // Pauses counting whenever tab is hidden or backgrounded
    const firedTimeMilestones = new Set();
    const timeMilestones = [15, 30, 60, 120];
    let activeSeconds = 0;

    const timerInterval = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') {
        return;
      }

      activeSeconds += 1;

      for (const seconds of timeMilestones) {
        if (activeSeconds >= seconds && !firedTimeMilestones.has(seconds)) {
          firedTimeMilestones.add(seconds);
          if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
            window.fbq('trackCustom', 'ActiveTimeOnPage', {
              seconds,
              milestone: `${seconds}s`,
              page: 'Nairuthya Whispering Wood Campaign'
            });
          }
        }
      }
    }, 1000);

    // 3. Scroll depth milestones tracking (25%, 50%, 75%, 90%)
    // Throttled via requestAnimationFrame, fires each milestone at most once per visit
    const firedScrollMilestones = new Set();
    const scrollMilestones = [25, 50, 75, 90];
    let ticking = false;

    const checkScrollDepth = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') {
        ticking = false;
        return;
      }

      const doc = document.documentElement;
      const winHeight = window.innerHeight;
      const docHeight = doc.scrollHeight;
      const scrollable = docHeight - winHeight;

      if (scrollable > 0) {
        const scrollTop = window.scrollY || doc.scrollTop || 0;
        const percent = Math.min(100, Math.round((scrollTop / scrollable) * 100));

        for (const milestone of scrollMilestones) {
          if (percent >= milestone && !firedScrollMilestones.has(milestone)) {
            firedScrollMilestones.add(milestone);
            if (typeof window.fbq === 'function') {
              window.fbq('trackCustom', 'ScrollDepth', {
                percent: milestone,
                milestone: `${milestone}%`,
                page: 'Nairuthya Whispering Wood Campaign'
              });
            }
          }
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(checkScrollDepth);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Check initial position on mount (e.g. if loaded at anchor)
    onScroll();

    // Cleanup listeners and timers when leaving the landing page
    return () => {
      clearInterval(timerInterval);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Manager-provided Meta Pixel script loaded with Next.js Script afterInteractive */}
      <Script
        id="meta-pixel-nairuthya"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${NAIRUTHYA_META_PIXEL_ID}');
            fbq('track', 'PageView');
          `
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${NAIRUTHYA_META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
