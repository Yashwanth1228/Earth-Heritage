'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import LandContourPattern from '@/components/ui/LandContourPattern';
import { ArrowRight, Camera, Calendar, Clock, MapPin, X, Sparkles, Check } from 'lucide-react';
import { useEnquiry } from '@/context/EnquiryContext';
import { cn } from '@/lib/utils';

/**
 * 06 — HomeEvents: Equal-Sized Image Moments Marquee with Event Details Modal
 * 
 * Features:
 * - 100% Image Moments (No videos, no video tags or play symbols).
 * - Equal-size card dimensions (aspect-[16/10], w-[280px] sm:w-[340px] lg:w-[380px]) matching Stories cards.
 * - Continuous infinite circular loop scrolling LEFT TO RIGHT (LTR Stepped).
 * - 2-second stay on each card with smooth transition.
 * - Interactive: Clicking any event card opens an elegant Event Details modal on-page.
 * - Warm ivory / off-white background (#FAF7F2), alternating harmoniously with Warm Biscuit.
 */
export default function HomeEvents() {
  const { openEnquiryModal } = useEnquiry();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventMoments = [
    {
      id: 'event-img-1',
      title: 'Guided Estate Walkthroughs',
      subtitle: 'Walk the topography, water channels, and living soil with our senior agronomy team.',
      tag: 'Estate Walk',
      timing: 'Saturdays & Sundays by Appointment',
      location: 'Earth Heritage Estate Sites, Bengaluru Region',
      details: 'A comprehensive 2-hour guided walkthrough across our active managed acreage. Inspect boundary contours, swales, living soil biology, and converse directly with our resident farm managers.',
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Landowners and farm team walking through orderly agricultural acreage'
    },
    {
      id: 'event-img-2',
      title: 'Seasonal Harvest Celebration',
      subtitle: 'Experience crop gathering, fresh produce sorting, and field dining with families.',
      tag: 'Community Gathering',
      timing: 'Quarterly Seasonal Milestone',
      location: 'Central Pavilion & Active Harvest Blocks',
      details: 'Celebrate the seasonal crop yield with fellow landowners and agrarian specialists. Hands-on harvesting of seasonal organic crops followed by an open-air community lunch under the timber pavilion.',
      src: '/images/gallery/experiences-gathering.jpg',
      alt: 'Families and landowners gathered under open timber pavilion in evening light'
    },
    {
      id: 'event-img-3',
      title: 'Agroforestry & Living Soil Workshop',
      subtitle: 'Hands-on understanding of organic cultivation, composting, and orchard care.',
      tag: 'Agronomy Masterclass',
      timing: 'Monthly Weekend Sessions',
      location: 'Agronomy Training Grounds',
      details: 'An immersive field workshop led by our agricultural directors covering microbial soil nourishment, natural mulching techniques, tree canopy pruning, and sustainable drip irrigation management.',
      src: '/images/farm-management/people-and-land.jpg',
      alt: 'Agricultural team and landowners inspecting healthy crops and soil structure'
    },
    {
      id: 'event-img-4',
      title: 'Canopy Dawn Trail & Birding',
      subtitle: 'Early morning guided naturalist walk observing indigenous flora and regional bird species.',
      tag: 'Nature Walk',
      timing: 'Early Mornings (6:30 AM - 8:30 AM)',
      location: 'Canopy Trails & Riparian Corridors',
      details: 'Experience the waking sounds and morning mist of the estate canopy. Guided by experienced regional naturalists documenting native tree species, bird life, and ecological preservation corridors.',
      src: '/images/gallery/nature-canopy.jpg',
      alt: 'Sunlight shining through lush native tree canopy along farmland trail'
    },
    {
      id: 'event-img-5',
      title: 'Landowner Seasonal Forum',
      subtitle: 'Quarterly plantation review, watershed progress, and community dialogue.',
      tag: 'Estate Forum',
      timing: 'Bi-annual Owner Assemblies',
      location: 'Estate Assembly Hall & Online Broadcast',
      details: 'An informative review session presenting agricultural yields, soil vitality reports, upcoming seasonal crop selections, and infrastructure maintenance schedules for registered owners.',
      src: '/images/how-it-works/responsible-care-panorama.jpg',
      alt: 'Panoramic vista of managed acreage during an afternoon farm forum'
    },
    {
      id: 'event-img-6',
      title: 'Planting Day Stewardship',
      subtitle: 'Participating in seasonal sapling planting and precision drip line layout.',
      tag: 'Field Stewardship',
      timing: 'Monsoon & Pre-Winter Cycles',
      location: 'Active Planting Furrows',
      details: 'Put your hands in living soil alongside our farm specialists. Plant fruit trees, learn organic nourishment cycles, and take pride in the growing roots of your estate acreage.',
      src: '/images/landing/manage-02-crop.jpg',
      alt: 'Orderly rows of newly planted crop seedlings in freshly prepared soil'
    }
  ];

  return (
    <section
      id="community-events"
      data-navbar-theme="light"
      className="relative w-full bg-[#FAF7F2] text-[#111613] py-24 sm:py-32 lg:py-36 border-b border-[#E8DFC8] overflow-hidden"
      aria-label="Moments and Community Events"
    >
      <LandContourPattern variant="biscuit-organic-flow" className="opacity-50 pointer-events-none" />

      <Container size="default" className="relative z-10 mb-10 sm:mb-16">
        {/* Section Header (Centered on mobile, split on desktop) */}
        <div className="flex flex-col items-center text-center md:items-end md:text-left md:flex-row justify-between gap-6">
          <div className="max-w-2xl space-y-3 sm:space-y-4 text-center md:text-left flex flex-col items-center md:items-start">
            <MotionReveal delay={0.05}>
              <span className="inline-block text-[11px] sm:text-xs font-mono font-semibold tracking-[0.24em] text-[#8C7A5A] uppercase">
                Moments &amp; Community Gatherings
              </span>
            </MotionReveal>

            <MotionReveal delay={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-[#111613] leading-[1.14]">
                Moments on the Land
              </h2>
            </MotionReveal>

            <MotionReveal delay={0.25}>
              <p className="font-sans text-sm sm:text-base text-[#3C4A3E] leading-relaxed max-w-xl md:max-w-none mx-auto md:mx-0">
                Bringing people, land, and community together through authentic agricultural experiences, guided estate walks, and seasonal harvest rituals. Click any card to explore event details.
              </p>
            </MotionReveal>
          </div>

          <MotionReveal delay={0.3}>
            <Link
              href="/events"
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase text-[#15341C] hover:text-[#1E460B] group transition-colors shrink-0 mx-auto md:mx-0"
            >
              <span className="border-b border-[#15341C]/40 pb-0.5 group-hover:border-[#1E460B]">
                View All Events
              </span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </MotionReveal>
        </div>
      </Container>

      {/* CONTINUOUS INFINITE CIRCULAR MARQUEE (SCROLLS LEFT TO RIGHT WITH 2S CARD STAY, CENTERED ON MOBILE) */}
      <div className="relative w-full pause-marquee-hover select-none">
        
        {/* Row Sub-label (Centered on mobile) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-3 flex items-center justify-center sm:justify-between">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-mono tracking-wider sm:tracking-[0.2em] uppercase text-[#7A6A4E] font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#15341C]" aria-hidden="true" />
            <span>Community Events &bull; Left to Right</span>
          </span>
          <span className="text-[10px] font-mono text-[#8C7A5A]/80 uppercase hidden sm:inline-block">
            2s Card Stay &bull; Click to View Details
          </span>
        </div>

        {/* Marquee Track: Duplicated sets seamlessly looping -50% to 0% with 2-second hold (Centered offset on mobile) */}
        <div className="relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee-stepped-ltr pl-[calc((100vw-300px)/2)] sm:pl-0">
            
            {/* Set 1 */}
            <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8">
              {eventMoments.map((item, idx) => (
                <button
                  type="button"
                  key={`event-set1-${item.id}-${idx}`}
                  onClick={() => setSelectedEvent(item)}
                  aria-label={`View details for ${item.title}`}
                  className={cn(
                    'w-[300px] xs:w-[320px] sm:w-[340px] lg:w-[380px] shrink-0 text-left',
                    'aspect-[16/10] rounded-2xl overflow-hidden relative group cursor-pointer',
                    'border border-[#E0D5C1] bg-[#EDE5D5] shadow-[0_10px_30px_rgba(17,22,19,0.06)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]'
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" aria-hidden="true" />

                  {/* Top Badge: Image Moment tag (Centered on mobile, left on desktop) */}
                  <div className="absolute top-3.5 sm:top-4 inset-x-0 sm:inset-x-auto sm:left-4 z-10 flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                      <Camera className="w-3 h-3 text-[#55c40d]" aria-hidden="true" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Top Right: "Details" subtle hint */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#15341C] text-[10px] font-mono font-semibold uppercase tracking-wider shadow-xs">
                      View Details &rarr;
                    </span>
                  </div>

                  {/* Bottom Caption Bar (Centered on mobile, left on desktop) */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#FAF7F2] tracking-tight leading-snug line-clamp-1 group-hover:text-[#F2CF84] transition-colors w-full">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#D8E4DC] leading-relaxed line-clamp-1 w-full">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Set 2 (Identical duplicate for seamless continuous circular wrap) */}
            <div className="flex shrink-0 items-center gap-6 sm:gap-8 pr-6 sm:pr-8" aria-hidden="true">
              {eventMoments.map((item, idx) => (
                <button
                  type="button"
                  key={`event-set2-${item.id}-${idx}`}
                  onClick={() => setSelectedEvent(item)}
                  aria-label={`View details for ${item.title}`}
                  className={cn(
                    'w-[300px] xs:w-[320px] sm:w-[340px] lg:w-[380px] shrink-0 text-left',
                    'aspect-[16/10] rounded-2xl overflow-hidden relative group cursor-pointer',
                    'border border-[#E0D5C1] bg-[#EDE5D5] shadow-[0_10px_30px_rgba(17,22,19,0.06)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15341C]'
                  )}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 340px, 380px"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none" aria-hidden="true" />

                  {/* Top Badge: Image Moment tag (Centered on mobile, left on desktop) */}
                  <div className="absolute top-3.5 sm:top-4 inset-x-0 sm:inset-x-auto sm:left-4 z-10 flex justify-center sm:justify-start">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[10px] font-mono tracking-wider uppercase font-semibold">
                      <Camera className="w-3 h-3 text-[#55c40d]" aria-hidden="true" />
                      <span>{item.tag}</span>
                    </span>
                  </div>

                  {/* Top Right: "Details" subtle hint */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#15341C] text-[10px] font-mono font-semibold uppercase tracking-wider shadow-xs">
                      View Details &rarr;
                    </span>
                  </div>

                  {/* Bottom Caption Bar (Centered on mobile, left on desktop) */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent space-y-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                    <h3 className="font-serif text-base sm:text-lg font-normal text-[#FAF7F2] tracking-tight leading-snug line-clamp-1 group-hover:text-[#F2CF84] transition-colors w-full">
                      {item.title}
                    </h3>
                    <p className="font-sans text-xs text-[#D8E4DC] leading-relaxed line-clamp-1 w-full">
                      {item.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Note */}
      <Container size="default" className="relative z-10 mt-10 text-center">
        <p className="font-mono text-xs text-[#8C7A5A] tracking-wider uppercase">
          Open to Registered Landowners &amp; Prospective Buyers by Appointment
        </p>
      </Container>

      {/* =========================================================================
          INTERACTIVE EVENT DETAILS MODAL
          ========================================================================= */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelectedEvent(null)}
        >
          <div
            className="relative w-full max-w-xl rounded-2xl bg-[#FAF7F2] border border-[#DDD3BF] shadow-2xl overflow-hidden text-[#111613] max-h-[90vh] flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Image Banner */}
            <div className="relative w-full h-52 sm:h-64 shrink-0 bg-[#EDE5D5]">
              <Image
                src={selectedEvent.src}
                alt={selectedEvent.alt}
                fill
                sizes="(max-width: 640px) 100vw, 600px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-transparent to-black/40" />

              {/* Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#FAF7F2] text-[11px] font-mono tracking-wider uppercase font-semibold">
                  <Camera className="w-3 h-3 text-[#55c40d]" aria-hidden="true" />
                  <span>{selectedEvent.tag}</span>
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                aria-label="Close event details"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-5 overflow-y-auto">
              <div className="space-y-2">
                <h3 id="event-modal-title" className="font-serif text-2xl sm:text-3xl font-normal text-[#111613] tracking-tight">
                  {selectedEvent.title}
                </h3>
                <p className="font-sans text-sm text-[#4E5C50] leading-relaxed">
                  {selectedEvent.subtitle}
                </p>
              </div>

              {/* Info Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E8DFC8]">
                  <Clock className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-[#8C7A5A] font-semibold">
                      Schedule &amp; Timing
                    </span>
                    <span className="font-sans text-xs font-medium text-[#111613]">
                      {selectedEvent.timing}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#E8DFC8]">
                  <MapPin className="w-4 h-4 text-[#15341C] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-[#8C7A5A] font-semibold">
                      Location
                    </span>
                    <span className="font-sans text-xs font-medium text-[#111613]">
                      {selectedEvent.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Detailed Narrative */}
              <div className="pt-2 border-t border-[#E8DFC8]/60">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[#8C7A5A] font-semibold mb-1.5">
                  About this Experience
                </h4>
                <p className="font-sans text-sm text-[#38423A] leading-relaxed">
                  {selectedEvent.details}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const evt = selectedEvent;
                    setSelectedEvent(null);
                    openEnquiryModal(`Event Attendance: ${evt.title}`);
                  }}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-[#15341C] hover:bg-[#1E460B] text-[#FAF7F2] text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] shadow-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Schedule Attendance / Enquire</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  href="/events"
                  onClick={() => setSelectedEvent(null)}
                  className="py-3.5 px-5 rounded-xl border border-[#D5C6A6] bg-white hover:bg-[#F5EEDB] text-[#15341C] text-xs sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-center transition-colors"
                >
                  All Events Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
