'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { Play, ArrowRight, Film, Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * 05 — HomeStories: Dual Interactive Chronicles Carousel
 * 
 * Features:
 * - Row 1: Documentary Video Cards with interactive Previous/Next controls & 4-second auto-advance.
 * - Row 2: Field Photography Cards with interactive Previous/Next controls & 4-second auto-advance.
 * - Previous/Next controls accessible across all screen sizes (mobile header buttons + floating track arrows).
 * - 4-second auto-scroll delay with smooth programmatic scroll.
 * - Automatic pause on hover, touch, and modal open.
 * - Native touch swipe enabled with momentum and active index tracking.
 * - Clickable cards open an editorial story details modal.
 * - Warm biscuit background (#F0E0C6) maintaining the editorial color rhythm.
 */
export default function HomeStories() {
  const [videoIndex, setVideoIndex] = useState(0);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const videoTrackRef = useRef(null);

  const [imageIndex, setImageIndex] = useState(0);
  const [isImagePaused, setIsImagePaused] = useState(false);
  const imageTrackRef = useRef(null);

  const [selectedStory, setSelectedStory] = useState(null);

  // 6 Curated Video Chronicles (Documentaries & Field Filming)
  const videoStories = [
    {
      id: 'vid-1',
      title: 'Morning Light over the Valley',
      subtitle: 'Capturing seasonal transitions, topography, and living soil',
      tag: 'Documentary Film',
      src: '/images/gallery/hero-feature.jpg',
      alt: 'Misty agricultural valley and rolling green hills at golden sunrise'
    },
    {
      id: 'vid-2',
      title: 'The Quiet Sanctuary of the Land',
      subtitle: 'A cinematic perspective on managed acreage and open horizons',
      tag: 'Field Chronicle',
      src: '/images/managed-farmland/core-proposition.jpg',
      alt: 'Peaceful gravel farm pathway meandering through open fields and shade trees'
    },
    {
      id: 'vid-3',
      title: 'Hands-on Agronomic Stewardship',
      subtitle: 'Dedicated field specialists supervising daily agricultural care',
      tag: 'Farm Operations',
      src: '/images/farm-management/people-and-land.jpg',
      alt: 'Agricultural field specialists assessing healthy crops and soil structure'
    },
    {
      id: 'vid-4',
      title: 'Rhythms of the Plantation',
      subtitle: 'Documenting tree growth, canopy shade, and native biodiversity',
      tag: 'Agroforestry Film',
      src: '/images/gallery/nature-canopy.jpg',
      alt: 'Lush green tree canopy with sunlight filtering through native trees'
    },
    {
      id: 'vid-5',
      title: 'Water Flow & Natural Contours',
      subtitle: 'Topographic swales and watershed engineering in practice',
      tag: 'Land Stewardship',
      src: '/images/how-it-works/responsible-care-panorama.jpg',
      alt: 'Panoramic agricultural contours demonstrating sustainable watershed engineering'
    },
    {
      id: 'vid-6',
      title: 'From Sapling to Thriving Orchard',
      subtitle: 'Long-term organic cultivation records across managed acreage',
      tag: 'Orchard Film',
      src: '/images/landing/manage-03-cultivation.jpg',
      alt: 'Young fruit trees thriving along contoured agricultural ridges'
    }
  ];

  // 6 Curated Field Photography Chronicles (Authentic Estate Visuals)
  const imageStories = [
    {
      id: 'img-1',
      title: 'Cultivated Acreage & Boundary Trails',
      subtitle: 'Disciplined crop rows and thriving boundary agroforestry',
      tag: 'Estate Photography',
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Expansive managed agricultural estate with disciplined crop rows and fruit trees'
    },
    {
      id: 'img-2',
      title: 'Topographic Contours & Living Soil',
      subtitle: 'Preserving organic soil vitality across natural slopes',
      tag: 'Soil Vitality',
      src: '/images/farm-management/responsible-care.jpg',
      alt: 'Rolling green agricultural acreage with orderly contour furrows'
    },
    {
      id: 'img-3',
      title: 'Evening Gatherings Under the Stars',
      subtitle: 'Connecting landowners and families over farmland moments',
      tag: 'Community Life',
      src: '/images/gallery/experiences-gathering.jpg',
      alt: 'Warm twilight gathering under open timber farm pavilion with lantern light over fields'
    },
    {
      id: 'img-4',
      title: 'Scheduled Seasonal Planting Cycles',
      subtitle: 'Structured agricultural cycles aligned with rainfall and climate',
      tag: 'Seasonal Planting',
      src: '/images/landing/manage-02-crop.jpg',
      alt: 'Young vibrant crop seedlings planted in disciplined straight field rows'
    },
    {
      id: 'img-5',
      title: 'Organic Crop Canopy & Micro-Climate',
      subtitle: 'Multi-tier shade canopy providing ideal orchard humidity',
      tag: 'Canopy Structure',
      src: '/images/gallery/cultivation-detail.jpg',
      alt: 'Close-up detail of thriving organic plantation foliage and healthy leaves'
    },
    {
      id: 'img-6',
      title: 'Seasonal Harvest Handover Logistics',
      subtitle: 'Fresh produce gathered with systematic agricultural care',
      tag: 'Harvest Care',
      src: '/images/landing/manage-06-harvest.jpg',
      alt: 'Bountiful fresh seasonal harvest produce gathered with systematic agricultural care'
    }
  ];

  // Helper to scroll a track container to a specific card index
  const scrollTrackToIndex = (trackRef, idx) => {
    if (!trackRef.current) return;
    const container = trackRef.current;
    const cards = container.querySelectorAll('[data-card]');
    if (cards && cards[idx]) {
      const card = cards[idx];
      const paddingLeft = parseFloat(window.getComputedStyle(container).paddingLeft) || 0;
      const targetLeft = Math.max(0, card.offsetLeft - paddingLeft);
      container.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
  };

  // Video Navigation Handlers
  const handleNextVideo = useCallback(() => {
    setVideoIndex((prev) => {
      const next = (prev + 1) % videoStories.length;
      scrollTrackToIndex(videoTrackRef, next);
      return next;
    });
  }, [videoStories.length]);

  const handlePrevVideo = useCallback(() => {
    setVideoIndex((prev) => {
      const prevIdx = (prev - 1 + videoStories.length) % videoStories.length;
      scrollTrackToIndex(videoTrackRef, prevIdx);
      return prevIdx;
    });
  }, [videoStories.length]);

  // Image Navigation Handlers
  const handleNextImage = useCallback(() => {
    setImageIndex((prev) => {
      const next = (prev + 1) % imageStories.length;
      scrollTrackToIndex(imageTrackRef, next);
      return next;
    });
  }, [imageStories.length]);

  const handlePrevImage = useCallback(() => {
    setImageIndex((prev) => {
      const prevIdx = (prev - 1 + imageStories.length) % imageStories.length;
      scrollTrackToIndex(imageTrackRef, prevIdx);
      return prevIdx;
    });
  }, [imageStories.length]);

  // 4-Second Auto-Advance Timers
  useEffect(() => {
    if (isVideoPaused || selectedStory) return;
    const timer = setInterval(() => {
      handleNextVideo();
    }, 4000);
    return () => clearInterval(timer);
  }, [isVideoPaused, selectedStory, handleNextVideo]);

  useEffect(() => {
    if (isImagePaused || selectedStory) return;
    const timer = setInterval(() => {
      handleNextImage();
    }, 4000);
    return () => clearInterval(timer);
  }, [isImagePaused, selectedStory, handleNextImage]);

  // Sync scroll position with active index during touch swipe
  useEffect(() => {
    const attachSync = (trackRef, setIndex, total) => {
      const el = trackRef.current;
      if (!el) return () => {};
      let timeoutId;
      const onScroll = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const cards = el.querySelectorAll('[data-card]');
          if (!cards.length) return;
          const scrollPos = el.scrollLeft;
          const paddingLeft = parseFloat(window.getComputedStyle(el).paddingLeft) || 0;
          let closest = 0;
          let minDiff = Infinity;
          cards.forEach((card, i) => {
            if (i >= total) return;
            const diff = Math.abs(card.offsetLeft - paddingLeft - scrollPos);
            if (diff < minDiff) {
              minDiff = diff;
              closest = i;
            }
          });
          setIndex(closest);
        }, 80);
      };
      el.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        el.removeEventListener('scroll', onScroll);
        clearTimeout(timeoutId);
      };
    };

    const cleanupVid = attachSync(videoTrackRef, setVideoIndex, videoStories.length);
    const cleanupImg = attachSync(imageTrackRef, setImageIndex, imageStories.length);
    return () => {
      cleanupVid();
      cleanupImg();
    };
  }, [videoStories.length, imageStories.length]);

  return (
    <section
      id="field-stories"
      data-navbar-theme="light"
      className="relative w-full bg-[#F0E0C6] text-[#111613] py-24 sm:py-32 lg:py-36 border-b border-[#D5C09D] overflow-hidden"
      aria-label="Stories from the Ground"
    >
      <LandContourPattern variant="biscuit-topography" className="opacity-60 pointer-events-none" />

      <Container size="default" className="relative z-10 mb-10 sm:mb-14">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center md:items-end md:text-left md:flex-row justify-between gap-6">
          <div className="max-w-2xl space-y-3 sm:space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <MotionReveal delay={0.05}>
              <span className="inline-block text-[11px] sm:text-xs font-mono font-semibold tracking-[0.24em] text-[#8C7A5A] uppercase">
                Field Chronicles &amp; Visual Records
              </span>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111613] leading-[1.14]">
                Stories from the Ground
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="font-sans text-sm sm:text-base text-[#3C4A3E] leading-relaxed max-w-xl md:max-w-none mx-auto md:mx-0">
                Authentic visual moments capturing seasonal rhythms, living soil, and daily farm care across Earth Heritage estates. Use the previous and next controls or swipe to navigate.
              </p>
            </MotionReveal>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-4 shrink-0 mx-auto md:mx-0">
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#15341C] hover:text-[#1E460B] group transition-colors"
            >
              <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
                Explore Full Gallery
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>

      {/* DUAL INTERACTIVE CAROUSEL ROWS */}
      <div className="relative w-full space-y-10 sm:space-y-12 select-none">
        
        {/* =========================================================================
            ROW 1: DOCUMENTARY VIDEO CARDS (4s Auto-Advance with Prev/Next Controls)
            ========================================================================= */}
        <div className="relative w-full">
          {/* Row Sub-label & Navigation Controls */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-[#7A6A4E] font-semibold">
              <Film className="w-4 h-4 text-[#15341C]" aria-hidden="true" />
              <span>Video Chronicles</span>
              <span className="text-[#8C7A5A]/50 hidden sm:inline">&bull;</span>
              <span className="text-[11px] font-mono text-[#8C7A5A] font-bold">
                {String(videoIndex + 1).padStart(2, '0')} / {String(videoStories.length).padStart(2, '0')}
              </span>
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#8C7A5A]/80 uppercase hidden md:inline-block mr-1">
                4s Delay &bull; Hover to Pause
              </span>
              <button
                type="button"
                onClick={handlePrevVideo}
                aria-label="Previous video story"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D5C09D] bg-white/90 hover:bg-[#15341C] text-[#15341C] hover:text-[#FAF7F2] hover:border-[#15341C] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextVideo}
                aria-label="Next video story"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D5C09D] bg-white/90 hover:bg-[#15341C] text-[#15341C] hover:text-[#FAF7F2] hover:border-[#15341C] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Track Wrapper with Floating Side Arrows */}
          <div
            className="relative w-full group/video"
            onMouseEnter={() => setIsVideoPaused(true)}
            onMouseLeave={() => setIsVideoPaused(false)}
            onTouchStart={() => setIsVideoPaused(true)}
            onTouchEnd={() => setIsVideoPaused(false)}
          >
            {/* Floating Left Arrow (Desktop / Tablet) */}
            <button
              type="button"
              onClick={handlePrevVideo}
              aria-label="Previous video"
              className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#15341C] text-white border border-white/20 backdrop-blur-md items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-70 hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Floating Right Arrow (Desktop / Tablet) */}
            <button
              type="button"
              onClick={handleNextVideo}
              aria-label="Next video"
              className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#15341C] text-white border border-white/20 backdrop-blur-md items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-70 hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scrollable Track */}
            <div
              ref={videoTrackRef}
              className="flex overflow-x-auto no-scrollbar scroll-smooth gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 py-2"
            >
              {[...videoStories, ...videoStories].map((item, idx) => (
                <div
                  key={`vid-${item.id}-${idx}`}
                  data-card
                  onClick={() => setSelectedStory({ ...item, type: 'video' })}
                  className={cn(
                    'w-[300px] xs:w-[320px] sm:w-[340px] lg:w-[380px] shrink-0 cursor-pointer',
                    'aspect-[16/10] rounded-2xl overflow-hidden relative group',
                    'border border-[#D5C09D] bg-[#E4D1B5] shadow-[0_10px_30px_rgba(17,22,19,0.06)]',
                    'transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]'
                  )}
                  tabIndex={0}
                  role="button"
                  aria-label={`View video story: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedStory({ ...item, type: 'video' });
                    }
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" aria-hidden="true" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 z-10 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                      <Film className="w-3 h-3 text-[#F2CF84]" aria-hidden="true" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Center Video Play Badge */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center my-auto pointer-events-none">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#15341C] shadow-lg group-hover:scale-110 group-hover:bg-[#55C40D] group-hover:text-white transition-all duration-200">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 fill-current" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Bottom Caption Bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1">
                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#FAF7F2] tracking-tight leading-snug line-clamp-1 group-hover:text-[#F2CF84] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#D8E4DC] leading-relaxed line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =========================================================================
            ROW 2: FIELD PHOTOGRAPHY CARDS (4s Auto-Advance with Prev/Next Controls)
            ========================================================================= */}
        <div className="relative w-full">
          {/* Row Sub-label & Navigation Controls */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono tracking-wider uppercase text-[#7A6A4E] font-semibold">
              <Camera className="w-4 h-4 text-[#15341C]" aria-hidden="true" />
              <span>Estate Photography</span>
              <span className="text-[#8C7A5A]/50 hidden sm:inline">&bull;</span>
              <span className="text-[11px] font-mono text-[#8C7A5A] font-bold">
                {String(imageIndex + 1).padStart(2, '0')} / {String(imageStories.length).padStart(2, '0')}
              </span>
            </span>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#8C7A5A]/80 uppercase hidden md:inline-block mr-1">
                4s Delay &bull; Hover to Pause
              </span>
              <button
                type="button"
                onClick={handlePrevImage}
                aria-label="Previous photo story"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D5C09D] bg-white/90 hover:bg-[#15341C] text-[#15341C] hover:text-[#FAF7F2] hover:border-[#15341C] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                aria-label="Next photo story"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D5C09D] bg-white/90 hover:bg-[#15341C] text-[#15341C] hover:text-[#FAF7F2] hover:border-[#15341C] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Track Wrapper with Floating Side Arrows */}
          <div
            className="relative w-full group/image"
            onMouseEnter={() => setIsImagePaused(true)}
            onMouseLeave={() => setIsImagePaused(false)}
            onTouchStart={() => setIsImagePaused(true)}
            onTouchEnd={() => setIsImagePaused(false)}
          >
            {/* Floating Left Arrow (Desktop / Tablet) */}
            <button
              type="button"
              onClick={handlePrevImage}
              aria-label="Previous photo"
              className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#15341C] text-white border border-white/20 backdrop-blur-md items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-70 hover:opacity-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Floating Right Arrow (Desktop / Tablet) */}
            <button
              type="button"
              onClick={handleNextImage}
              aria-label="Next photo"
              className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#15341C] text-white border border-white/20 backdrop-blur-md items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer opacity-70 hover:opacity-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Scrollable Track */}
            <div
              ref={imageTrackRef}
              className="flex overflow-x-auto no-scrollbar scroll-smooth gap-6 sm:gap-8 px-4 sm:px-6 lg:px-8 py-2"
            >
              {[...imageStories, ...imageStories].map((item, idx) => (
                <div
                  key={`img-${item.id}-${idx}`}
                  data-card
                  onClick={() => setSelectedStory({ ...item, type: 'photo' })}
                  className={cn(
                    'w-[300px] xs:w-[320px] sm:w-[340px] lg:w-[380px] shrink-0 cursor-pointer',
                    'aspect-[16/10] rounded-2xl overflow-hidden relative group',
                    'border border-[#D5C09D] bg-[#E4D1B5] shadow-[0_10px_30px_rgba(17,22,19,0.06)]',
                    'transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]'
                  )}
                  tabIndex={0}
                  role="button"
                  aria-label={`View photo story: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedStory({ ...item, type: 'photo' });
                    }
                  }}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" aria-hidden="true" />

                  {/* Top Badge */}
                  <div className="absolute top-3.5 sm:top-4 left-3.5 sm:left-4 z-10 flex items-center gap-1.5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                      <Camera className="w-3 h-3 text-[#55c40d]" aria-hidden="true" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Bottom Caption Bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1">
                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#FAF7F2] tracking-tight leading-snug line-clamp-1 group-hover:text-[#F2CF84] transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#D8E4DC] leading-relaxed line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Subtle Note */}
      <Container size="default" className="relative z-10 mt-10 sm:mt-12 text-center">
        <p className="font-mono text-xs text-[#8C7A5A] tracking-wider uppercase">
          Continuous Live Chronicles &bull; All Visuals Captured on Location across Earth Heritage Estates
        </p>
      </Container>

      {/* =========================================================================
          INTERACTIVE STORY DETAILS / PREVIEW MODAL
          ========================================================================= */}
      {selectedStory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="story-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedStory(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-[#FAF7F2] border border-[#DDD3BF] shadow-2xl overflow-hidden text-[#111613] max-h-[90vh] flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image/Video Banner */}
            <div className="relative w-full h-60 sm:h-72 shrink-0 bg-[#EDE5D5]">
              <Image
                src={selectedStory.src}
                alt={selectedStory.alt}
                fill
                sizes="(max-width: 640px) 100vw, 700px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/40" />

              {/* Tag Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[11px] font-mono tracking-wider uppercase font-semibold">
                  {selectedStory.type === 'video' ? (
                    <Film className="w-3.5 h-3.5 text-[#F2CF84]" />
                  ) : (
                    <Camera className="w-3.5 h-3.5 text-[#55c40d]" />
                  )}
                  <span>{selectedStory.tag}</span>
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedStory(null)}
                aria-label="Close story preview"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div>
                <h3 id="story-modal-title" className="font-serif text-2xl sm:text-3xl font-normal text-[#111613] tracking-tight">
                  {selectedStory.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#4E5C50] leading-relaxed mt-1">
                  {selectedStory.subtitle}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#E8DFC8] space-y-2">
                <p className="font-sans text-xs sm:text-sm text-[#38423A] leading-relaxed">
                  Captured on location at Earth Heritage managed farmland acreage. Showcasing actual agrarian conditions, soil care, and seasonal stewardship.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/gallery"
                  onClick={() => setSelectedStory(null)}
                  className="flex-1 py-3 px-6 rounded-xl bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-center transition-colors shadow-sm"
                >
                  Explore in Gallery
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedStory(null)}
                  className="py-3 px-5 rounded-xl border border-[#D5C6A6] bg-white hover:bg-[#F5EEDB] text-[#15341C] text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-center transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
