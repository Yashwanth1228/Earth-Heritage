'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import MotionReveal from '@/components/animations/MotionReveal';
import { Star, ExternalLink, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

const OFFICIAL_LISTING_URL = 'https://maps.app.goo.gl/dcX65yXieR8G1tKs8';

// Exact organic hand-torn SVG paths matching the FAQ "Frequently Addressed Enquiries" section
const SAGE_TOP_DECKLE =
  "M0,50 L0,10.8 L8,11.7 L16,11.1 L24,13.3 L32,14.4 L40,13 L48,15.3 L56,14.8 L64,16.6 L72,14.8 L80,17.8 L88,16.3 L96,16.7 L104,17.8 L112,16.9 L120,18.9 L128,19.7 L136,19.9 L144,19.2 L152,18 L160,19.8 L168,19.3 L176,17.7 L184,18 L192,17.2 L200,16.8 L208,19.7 L216,17.7 L224,16.8 L232,19.3 L240,19.1 L248,19.3 L256,18.4 L264,19.2 L272,18.7 L280,18.5 L288,16.2 L296,16.7 L304,17.6 L312,18.6 L320,18.2 L328,17.2 L336,17.2 L344,17.6 L352,15.3 L360,17.2 L368,16.6 L376,16.9 L384,16.5 L392,16.4 L400,16.2 L408,16.4 L416,18.5 L424,18.4 L432,18.3 L440,17.3 L448,17.7 L456,16.7 L464,17.7 L472,19 L480,19.9 L488,17.5 L496,16.8 L504,18.9 L512,18.2 L520,19.3 L528,18.4 L536,17.6 L544,17.6 L552,16.5 L560,17.2 L568,16.6 L576,18.1 L584,15 L592,17.7 L600,14.1 L608,15.8 L616,15.4 L624,13.1 L632,14.3 L640,14.7 L648,13.1 L656,12 L664,10.2 L672,12.1 L680,10.4 L688,10.5 L696,8.2 L704,7.5 L712,10.1 L720,6.5 L728,8.5 L736,7 L744,4.9 L752,8 L760,6.4 L768,5.2 L776,3.8 L784,6.2 L792,5.3 L800,4.7 L808,4.5 L816,6.6 L824,5 L832,6.3 L840,3.7 L848,6.2 L856,5.9 L864,5.1 L872,6.3 L880,8.3 L888,8.5 L896,6.5 L904,8 L912,8.4 L920,8.4 L928,9.7 L936,9.7 L944,9.8 L952,11.3 L960,10.1 L968,12 L976,14.2 L984,14.6 L992,12.8 L1000,16.2 L1008,14 L1016,13.7 L1024,15.1 L1032,16.7 L1040,16 L1048,16 L1056,17.1 L1064,17.6 L1072,16.7 L1080,16.6 L1088,16.4 L1096,18.6 L1104,16.7 L1112,17.5 L1120,19.7 L1128,18.8 L1136,18.8 L1144,18 L1152,17.4 L1160,18.4 L1168,18.6 L1176,17.7 L1184,17.7 L1192,19.5 L1200,17.5 L1208,18.3 L1216,18.6 L1224,18.5 L1232,18.2 L1240,17.6 L1248,18.7 L1256,15.4 L1264,17.9 L1272,16 L1280,18.5 L1288,17.6 L1296,15.6 L1304,18.4 L1312,18.1 L1320,18.7 L1328,16.7 L1336,17.4 L1344,16.5 L1352,18.1 L1360,16.8 L1368,17.2 L1376,17.2 L1384,17.9 L1392,18.8 L1400,18.7 L1408,18.4 L1416,19.3 L1424,17.2 L1432,19.8 L1440,19.8 L1440,50 Z";

const SAGE_TOP_PAPER =
  "M0,50 L0,23.6 L8,23.3 L16,25.5 L24,25.1 L32,24.8 L40,23.3 L48,23.1 L56,23.3 L64,24.3 L72,22.7 L80,23.8 L88,23.3 L96,25.2 L104,24.3 L112,25.1 L120,21.9 L128,23 L136,24.3 L144,24.6 L152,24.7 L160,22.5 L168,24.5 L176,24.1 L184,24.6 L192,22.9 L200,22.5 L208,21.6 L216,24.9 L224,24.9 L232,21.9 L240,24.8 L248,22.2 L256,23.5 L264,24.1 L272,23 L280,24.2 L288,24.2 L296,24.9 L304,25.4 L312,22.9 L320,25.9 L328,25.1 L336,25.2 L344,24 L352,24.5 L360,25.4 L368,24 L376,25.2 L384,24.9 L392,23.7 L400,24.9 L408,21.7 L416,24.7 L424,21.7 L432,20.8 L440,21.4 L448,20.6 L456,20 L464,22.4 L472,19.5 L480,20.9 L488,18.5 L496,20 L504,18.1 L512,18.4 L520,16.5 L528,16.6 L536,16.6 L544,14.3 L552,14.5 L560,14.8 L568,14.8 L576,13.3 L584,14.4 L592,12.7 L600,11.1 L608,13.5 L616,12.9 L624,12.9 L632,10.1 L640,9.9 L648,9.8 L656,9.3 L664,12.4 L672,10.2 L680,12.6 L688,11.2 L696,12.1 L704,10.8 L712,11.3 L720,13.5 L728,12.4 L736,14.1 L744,12.1 L752,15.2 L760,13.9 L768,16.5 L776,17.2 L784,15.7 L792,17.4 L800,16.3 L808,17.2 L816,19.7 L824,20.6 L832,19.9 L840,21.2 L848,21.1 L856,21.5 L864,19.9 L872,22.8 L880,23.6 L888,24 L896,23.3 L904,23.8 L912,24.5 L920,24.3 L928,23.8 L936,22.9 L944,23.6 L952,25 L960,24.1 L968,26.2 L976,25.2 L984,26.1 L992,23.1 L1000,26.1 L1008,23.4 L1016,22.8 L1024,25.7 L1032,24.6 L1040,23.4 L1048,25.5 L1056,24.1 L1064,22.8 L1072,23.5 L1080,23.5 L1088,22.7 L1096,24.7 L1104,24.4 L1112,24.5 L1120,23.8 L1128,24.7 L1136,22.7 L1144,22.1 L1152,22.4 L1160,22.4 L1168,24.6 L1176,22.5 L1184,24.9 L1192,22.2 L1200,22.9 L1208,24.6 L1216,23.5 L1224,25 L1232,23.1 L1240,22.7 L1248,23.2 L1256,25.1 L1264,24.7 L1272,25.9 L1280,25 L1288,24.1 L1296,23.9 L1304,24.3 L1312,25.5 L1320,25.8 L1328,24.3 L1336,23.5 L1344,25.7 L1352,23 L1360,22.9 L1368,21.8 L1376,21.7 L1384,21.7 L1392,22.5 L1400,22 L1408,21.4 L1416,22.1 L1424,21.8 L1432,20 L1440,18.9 L1440,50 Z";

const SAGE_BOTTOM_DECKLE =
  "M0,0 L0,17.7 L8,20.5 L16,19.7 L24,21.6 L32,19.7 L40,20.8 L48,21.6 L56,22.3 L64,21.1 L72,22.5 L80,22.7 L88,25.5 L96,25.6 L104,25.9 L112,24.9 L120,25.4 L128,26.1 L136,27.7 L144,26.6 L152,28.2 L160,28.2 L168,27.1 L176,30.1 L184,27.8 L192,28.4 L200,29.8 L208,31.4 L216,32 L224,28.7 L232,30.1 L240,32.2 L248,31.8 L256,28.9 L264,30.6 L272,30.1 L280,29.1 L288,28.7 L296,28.5 L304,28.9 L312,31.6 L320,28.8 L328,29.8 L336,30.2 L344,28.8 L352,29.9 L360,29.6 L368,30.1 L376,30.5 L384,27.9 L392,30.8 L400,29.9 L408,29.9 L416,28.7 L424,29.3 L432,30.3 L440,29 L448,30.4 L456,30.4 L464,29.4 L472,31 L480,28.1 L488,28 L496,29 L504,28.5 L512,29.6 L520,29.3 L528,29.3 L536,28.7 L544,29.9 L552,31.9 L560,30 L568,32.1 L576,30.7 L584,31.6 L592,30.2 L600,30.7 L608,31.2 L616,29.3 L624,29.7 L632,30.4 L640,30.6 L648,29.2 L656,30.4 L664,28.8 L672,27.1 L680,26 L688,28.7 L696,28.5 L704,25.4 L712,24.9 L720,24.3 L728,23.3 L736,25.8 L744,23 L752,24.7 L760,22.6 L768,22.8 L776,20.7 L784,20.4 L792,21.7 L800,19.8 L808,20.6 L816,17.8 L824,20 L832,17.9 L840,19.6 L848,16.1 L856,17.2 L864,18.2 L872,16.4 L880,16.7 L888,18.5 L896,15.4 L904,17.7 L912,18.6 L920,18.2 L928,18.3 L936,16.4 L944,19.2 L952,19.9 L960,20.3 L968,19.8 L976,20.4 L984,21.3 L992,21.3 L1000,21.1 L1008,20.6 L1016,21.6 L1024,23.4 L1032,23.1 L1040,22.1 L1048,25.2 L1056,23.1 L1064,24.2 L1072,24.3 L1080,25.7 L1088,25.6 L1096,25.6 L1104,28.5 L1112,27.8 L1120,26.9 L1128,29.5 L1136,28.6 L1144,29.7 L1152,30.1 L1160,29.5 L1168,28.3 L1176,31.7 L1184,32 L1192,31.4 L1200,28.9 L1208,30.5 L1216,29.8 L1224,30.1 L1232,30 L1240,32 L1248,29.9 L1256,28.5 L1264,29.2 L1272,29.7 L1280,31.2 L1288,29.8 L1296,31.1 L1304,28.9 L1312,28.3 L1320,28.6 L1328,30.3 L1336,29.8 L1344,30.8 L1352,29.9 L1360,28.8 L1368,28.7 L1376,29.1 L1384,30.3 L1392,30.6 L1400,29.4 L1408,28.7 L1416,27.7 L1424,28.7 L1432,29 L1440,28.2 L1440,0 Z";

const SAGE_BOTTOM_PAPER =
  "M0,0 L0,21.3 L8,23.4 L16,22.4 L24,22.1 L32,22.5 L40,23.7 L48,22.4 L56,23.8 L64,25.5 L72,23.7 L80,25.5 L88,25.8 L96,23.9 L104,25.4 L112,26 L120,24.5 L128,25.1 L136,24.2 L144,23.6 L152,22.7 L160,25.3 L168,22.7 L176,23 L184,24 L192,23.4 L200,24.3 L208,21.7 L216,23.6 L224,24.4 L232,23.5 L240,21.4 L248,21.5 L256,23.9 L264,21.7 L272,23.9 L280,24.3 L288,22.6 L296,22.7 L304,22.7 L312,22 L320,22.7 L328,24 L336,24.7 L344,25.5 L352,22.6 L360,25.2 L368,25.3 L376,23.5 L384,24.9 L392,23.6 L400,24.4 L408,25.1 L416,25.2 L424,23.3 L432,23.8 L440,24.5 L448,25.1 L456,25.8 L464,23 L472,24.1 L480,22 L488,22.1 L496,21.9 L504,24.5 L512,23.2 L520,23.3 L528,20.6 L536,20.8 L544,19.5 L552,18.9 L560,20 L568,18.8 L576,17.5 L584,18.6 L592,19.4 L600,17.7 L608,14.9 L616,15.7 L624,14.3 L632,13.9 L640,12.9 L648,12.3 L656,13.6 L664,12.6 L672,13.2 L680,12.1 L688,12.7 L696,11.7 L704,10.9 L712,11.3 L720,12.6 L728,11.6 L736,10 L744,10.6 L752,12.1 L760,10.1 L768,10.5 L776,10.4 L784,13.2 L792,10.4 L800,11.5 L808,13.7 L816,11.6 L824,13.2 L832,12.9 L840,15.5 L848,13.4 L856,15.8 L864,16.5 L872,16.9 L880,16.6 L888,19.4 L896,18.2 L904,20.2 L912,18.5 L920,18.5 L928,21 L936,22.3 L944,22.7 L952,20.4 L960,21.6 L968,21.7 L976,23.2 L984,24.8 L992,24 L1000,23.8 L1008,22.9 L1016,23.8 L1024,23.8 L1032,24.2 L1040,22.8 L1048,24.5 L1056,23.3 L1064,26 L1072,24 L1080,25.2 L1088,24.2 L1096,23.8 L1104,24.4 L1112,22.5 L1120,25.4 L1128,22.4 L1136,22.6 L1144,23.3 L1152,24.3 L1160,22.3 L1168,22.7 L1176,24.6 L1184,23.3 L1192,21.4 L1200,24.8 L1208,23.5 L1216,24.6 L1224,22.8 L1232,24.5 L1240,23.1 L1248,23.8 L1256,24.1 L1264,21.9 L1272,22 L1280,23.8 L1288,22.5 L1296,22.5 L1304,25.1 L1312,22.8 L1320,23 L1328,25.7 L1336,24.1 L1344,25.1 L1352,23.7 L1360,24.3 L1368,23.1 L1376,23.8 L1384,24.8 L1392,25.3 L1400,24 L1408,23.5 L1416,22.7 L1424,25.7 L1432,25.4 L1440,23.7 L1440,0 Z";

/**
 * Three manually managed customer review cards.
 * Preserves exact reviewer names, ratings, and original review text.
 */
const REVIEWS = [
  {
    id: 'review-1',
    reviewer: 'catch me if you can',
    rating: 5,
    text: `Just sharing the experience of the project called nairuthya whispering wood by Earth Heritage Managed Farmland
They have developed a very good project near banglore it's completely a weekend gateway
I truly recommend this project`
  },
  {
    id: 'review-2',
    reviewer: 'Pooja H',
    rating: 5,
    text: `we have recently purchased one of their project to mentioned this everything went so smoothly, and we have got immediate registration also. Thank you Earth heritage to making things easier`
  },
  {
    id: 'review-3',
    reviewer: 'venkivenki',
    rating: 5,
    text: `I have visited there projects with my family, all of there projects are well developed and we'll maintained farmlands , i really liked it and spend my whole day in the farmland and i recommend Earth Heritage Managed Farmlands and the sales team has supported us. Thank you`
  }
];

/**
 * Resolves avatar background color based on first letter
 * Matches Google profile avatar style (e.g. orange for "Venkivenki")
 */
function getAvatarBgColor(reviewer) {
  const initial = (reviewer || '').trim().charAt(0).toUpperCase();
  switch (initial) {
    case 'V':
      return 'bg-[#E84518]'; // Google Vibrant Orange (matches user reference)
    case 'P':
      return 'bg-[#8E24AA]'; // Google Purple
    case 'C':
      return 'bg-[#1A73E8]'; // Google Blue
    default:
      return 'bg-[#E84518]';
  }
}

/**
 * Official Google Multi-Color "G" Icon SVG
 */
function GoogleGIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

/**
 * Five-Star Rating Component
 */
function FiveStarRating({ size = 'w-4 h-4' }) {
  return (
    <div className="flex items-center gap-1" aria-label="5 out of 5 stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(size, 'fill-[#FBBC04] text-[#FBBC04]')}
        />
      ))}
    </div>
  );
}

export default function NairuthyaReviews({ className, id = 'reviews' }) {
  return (
    <section
      id={id}
      className={cn(
        'relative w-full py-10 sm:py-14 text-[#172719] shadow-md scroll-mt-16 z-10',
        className
      )}
      style={{
        backgroundImage: "url('/images/campaign/paper_subtle_sage.jpg')",
        backgroundRepeat: 'repeat',
        backgroundSize: '1024px 1024px',
        backgroundColor: '#B5C4B0'
      }}
      aria-label="Customer Reviews"
    >
      {/* ORGANIC NATURAL TORN PAPER TOP DIVIDER (Matching FAQ section) */}
      <div className="absolute -top-7 sm:-top-9 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
          {/* White deckle paper fiber under-layer */}
          <path
            d={SAGE_TOP_DECKLE}
            fill="#FAF6EE"
            style={{ filter: 'drop-shadow(0 -3px 4px rgba(30,25,15,0.18))' }}
          />
          {/* Sage Green Paper Rip Layer */}
          <path
            d={SAGE_TOP_PAPER}
            fill="#B5C4B0"
          />
        </svg>
      </div>

      {/* Top-Left Botanical Leaf Accent */}
      <div className="absolute top-6 -left-8 w-40 h-40 pointer-events-none opacity-65 hidden lg:block -rotate-45 z-0">
        <Image
          src="https://res.cloudinary.com/yffbj6hj/image/upload/v1792156448/earth-heritage/campaign/botanical-leaves.png"
          alt="Botanical Leaf Foliage"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      {/* Bottom-Right Botanical Ink Branch Accent */}
      <div className="absolute bottom-6 -right-6 w-44 h-44 pointer-events-none opacity-70 hidden lg:block rotate-12 z-0">
        <Image
          src="https://res.cloudinary.com/yffbj6hj/image/upload/v1792156454/earth-heritage/campaign/botanical-ink-branch.png"
          alt="Botanical Ink Illustration"
          width={220}
          height={220}
          className="object-contain transform scale-x-[-1]"
        />
      </div>

      <Container size="default" className="relative z-10 max-w-6xl px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2">
          <MotionReveal delay={0.05} direction="down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#9EB09A] text-xs font-mono font-medium text-[#1E2E20] shadow-2xs">
              <GoogleGIcon className="w-3.5 h-3.5" />
              <span>CUSTOMER EXPERIENCES</span>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[#172719] tracking-tight leading-tight">
              Customer <span className="italic font-light text-[#243B27]">Experiences</span> &bull; Earth Heritage
            </h2>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <p className="font-sans text-xs sm:text-sm text-[#364937] leading-relaxed max-w-xl mx-auto">
              Real impressions and reflections shared by landowners, partners, and visitors who have walked our managed farmlands.
            </p>
          </MotionReveal>
        </div>

        {/* 3 Review Cards Grid: Animated Left, Center Up, and Right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-6 lg:gap-8 items-stretch">
          {REVIEWS.map((review, idx) => {
            const initial = review.reviewer.trim().charAt(0).toUpperCase();
            const avatarBg = getAvatarBgColor(review.reviewer);
            const cardDirection = idx === 0 ? 'left' : idx === 2 ? 'right' : 'up';

            return (
              <MotionReveal
                key={review.id}
                delay={0.1 * (idx + 1)}
                direction={cardDirection}
                className="h-full"
              >
                <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white/95 border border-[#9EB09A] hover:border-[#7D9379] hover:shadow-xs transition-all duration-300">
                  <div className="space-y-4">
                    {/* Top row: 5 Stars and subtle quote icon */}
                    <div className="flex items-center justify-between gap-2">
                      <FiveStarRating size="w-4 h-4" />
                      <Quote className="w-4 h-4 text-[#C9A86A]/60 rotate-180" aria-hidden="true" />
                    </div>

                    {/* Review Text with preserved formatting & line breaks */}
                    <p className="font-sans text-xs sm:text-sm text-[#2D3A2F] leading-relaxed whitespace-pre-line">
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  {/* Reviewer Profile Section: Avatar Circle on left, Name on right */}
                  <div className="pt-4 mt-5 border-t border-[#E2EBE0] flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Circular Avatar with First Letter (Matches Google Profile Image Style) */}
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center font-sans font-medium text-white text-base shrink-0 shadow-2xs select-none',
                          avatarBg
                        )}
                        aria-hidden="true"
                      >
                        {initial}
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-sans text-sm sm:text-base font-semibold text-[#111613] leading-tight truncate">
                          {review.reviewer}
                        </h4>
                        <span className="text-[11px] font-sans text-[#5E6B5D] block mt-0.5">
                          5.0 Star Rating
                        </span>
                      </div>
                    </div>

                    <GoogleGIcon className="w-4 h-4 shrink-0 opacity-70" />
                  </div>
                </div>
              </MotionReveal>
            );
          })}
        </div>

        {/* Bottom Restrained Attribution & Read Google Reviews Button */}
        <MotionReveal delay={0.35}>
          <div className="mt-10 sm:mt-12 text-center flex flex-col items-center justify-center space-y-3">
            <a
              href={OFFICIAL_LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#172719] hover:bg-[#0E1A10] active:scale-[0.98] text-white font-sans text-xs sm:text-sm font-medium tracking-wide shadow-xs transition-all cursor-pointer"
            >
              <GoogleGIcon className="w-4 h-4" />
              <span>Read Google Reviews</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C9A86A]" />
            </a>

            <p className="text-[11px] font-sans text-[#364937] max-w-md mx-auto">
              Visit Earth Heritage Private Limited on Google Maps to explore our location and community feedback.
            </p>
          </div>
        </MotionReveal>
      </Container>

      {/* ORGANIC NATURAL TORN PAPER BOTTOM DIVIDER (Matching FAQ section) */}
      <div className="absolute -bottom-7 sm:-bottom-9 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none">
        <svg viewBox="0 0 1440 50" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
          {/* White deckle paper fiber under-layer */}
          <path
            d={SAGE_BOTTOM_DECKLE}
            fill="#FAF6EE"
            style={{ filter: 'drop-shadow(0 3px 4px rgba(30,25,15,0.18))' }}
          />
          {/* Sage Green Paper Rip Layer */}
          <path
            d={SAGE_BOTTOM_PAPER}
            fill="#B5C4B0"
          />
        </svg>
      </div>
    </section>
  );
}
