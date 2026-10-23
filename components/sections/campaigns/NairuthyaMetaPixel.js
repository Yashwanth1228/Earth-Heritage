'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';

export const NAIRUTHYA_META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

const CAMPAIGN_ROUTE = '/lp/nairuthya-whispering-wood';

/**
 * Meta Pixel Integration for Nairuthya Whispering Wood Campaign Landing Page
 * Scoped strictly to route: /lp/nairuthya-whispering-wood
 *
 * Implements:
 * 1. Base Meta Pixel initialization using NEXT_PUBLIC_META_PIXEL_ID.
 * 2. Route-verified PageView tracking: sends PageView only when window.location matches
 *    the campaign route, eliminating stale URLs during client-side navigation.
 * 3. Deduplicated PageView dispatch: fires exactly once per campaign visit across direct loads,
 *    SPA navigations, and dev React StrictMode.
 * 4. Passive, throttled scroll depth milestone tracking (25%, 50%, 75%, 90%) with pre-readiness safety.
 * 5. Tab visibility-aware active engagement duration tracking (15s, 30s, 60s, 120s).
 * 6. Complete animation-frame and unmount cleanup to avoid memory leaks or orphan events.
 * 7. Graceful degradation when Pixel ID environment variable is missing.
 * 8. Strict noscript fallback.
 * 9. Zero PII transmission.
 */
export default function NairuthyaMetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const pageViewSentRef = useRef(false);
  const checkScrollRef = useRef(null);
  const triggerPageViewRef = useRef(null);

  useEffect(() => {
    // If Pixel ID is not configured, do not attach listeners or timers
    if (!pixelId) {
      return;
    }

    let isMounted = true;
    let rafId = null;

    // Helper: Verify browser is currently on the campaign landing route
    const isCurrentRouteCampaign = () => {
      if (typeof window === 'undefined') return false;
      const currentPath = window.location.pathname.replace(/\/$/, '');
      return currentPath === CAMPAIGN_ROUTE;
    };

    // Helper: Safely queue PageView event once the campaign route is active and fbq is ready
    const triggerPageView = () => {
      if (!isMounted || pageViewSentRef.current) {
        return false;
      }
      if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
        return false;
      }
      if (!isCurrentRouteCampaign()) {
        return false;
      }

      try {
        window.fbq('track', 'PageView');
        pageViewSentRef.current = true;
        return true;
      } catch {
        return false;
      }
    };

    triggerPageViewRef.current = triggerPageView;

    // 1. Initial PageView dispatch:
    // Attempts to trigger immediately; if fbq is not ready or route transition is in-flight,
    // subsequent checks in onReady and timerInterval ensure it is not lost.
    triggerPageView();

    // Helper: Safely queue custom event only if fbq is ready and component is mounted
    const safeTrackCustom = (eventName, params) => {
      if (!isMounted) return false;
      if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
        try {
          window.fbq('trackCustom', eventName, params);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    };

    // 2. Tab visibility-aware active engagement duration tracking
    // Pauses counting whenever tab is hidden or backgrounded
    const firedTimeMilestones = new Set();
    const timeMilestones = [15, 30, 60, 120];
    let activeSeconds = 0;

    // 3. Scroll depth milestones tracking (25%, 50%, 75%, 90%)
    // Throttled via requestAnimationFrame, fires each milestone at most once per visit
    const firedScrollMilestones = new Set();
    const scrollMilestones = [25, 50, 75, 90];

    const checkScrollDepth = () => {
      rafId = null;
      if (!isMounted || typeof window === 'undefined' || typeof document === 'undefined') {
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
            const sent = safeTrackCustom('ScrollDepth', {
              percent: milestone,
              milestone: `${milestone}%`,
              page: 'Nairuthya Whispering Wood Campaign'
            });
            // Mark milestone fired only after it has been successfully queued in fbq
            if (sent) {
              firedScrollMilestones.add(milestone);
            }
          }
        }
      }
    };

    checkScrollRef.current = checkScrollDepth;

    const onScroll = () => {
      if (!isMounted) return;
      if (rafId === null) {
        rafId = window.requestAnimationFrame(checkScrollDepth);
      }
    };

    const timerInterval = setInterval(() => {
      if (!isMounted || typeof document === 'undefined') {
        return;
      }

      // Ensure PageView was dispatched if component mounted before fbq was ready
      if (!pageViewSentRef.current) {
        triggerPageView();
      }

      // Active duration counting paused when tab is hidden
      if (document.visibilityState !== 'visible') {
        return;
      }

      activeSeconds += 1;

      for (const seconds of timeMilestones) {
        if (activeSeconds >= seconds && !firedTimeMilestones.has(seconds)) {
          const sent = safeTrackCustom('ActiveTimeOnPage', {
            seconds,
            milestone: `${seconds}s`,
            page: 'Nairuthya Whispering Wood Campaign'
          });
          // Mark milestone fired only after it has been successfully queued in fbq
          if (sent) {
            firedTimeMilestones.add(seconds);
          }
        }
      }

      // Check if any scroll milestones were reached before fbq was ready
      if (firedScrollMilestones.size < scrollMilestones.length && typeof window.fbq === 'function') {
        checkScrollDepth();
      }
    }, 1000);

    window.addEventListener('scroll', onScroll, { passive: true });
    // Check initial position on mount (e.g. if loaded at anchor)
    onScroll();

    // Cleanup listeners, timers, and animation frames on unmount
    return () => {
      isMounted = false;
      checkScrollRef.current = null;
      triggerPageViewRef.current = null;
      clearInterval(timerInterval);
      window.removeEventListener('scroll', onScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
  }, [pixelId]);

  // Safely render nothing if Pixel ID is missing or empty
  if (!pixelId) {
    return null;
  }

  return (
    <>
      {/* Base Meta Pixel script initialization (without premature PageView) */}
      <Script
        id="meta-pixel-nairuthya"
        strategy="afterInteractive"
        onReady={() => {
          // Trigger PageView if fbq became ready on script load
          if (typeof triggerPageViewRef.current === 'function') {
            triggerPageViewRef.current();
          }
          // Check scroll depth if user scrolled before script finished loading
          if (typeof checkScrollRef.current === 'function') {
            checkScrollRef.current();
          }
        }}
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
            fbq('init', '${pixelId}');
          `
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
