import Link from 'next/link';
import Container from '@/components/ui/Container';
import { constructMetadata } from '@/lib/seo';
import { ArrowRight, Calendar } from 'lucide-react';

export const metadata = {
  ...constructMetadata({
    title: 'Events & Farm Gatherings',
    description:
      'Learn about scheduled community farm visits, seasonal harvest walks, and private land tours organized by Earth Heritage Pvt Ltd.',
    canonicalUrl: '/events'
  }),
  title: 'Events | Earth Heritage'
};

/**
 * Clean architectural route for /events
 * Adheres strictly to the brand guidelines: zero fake events, dates, or speakers.
 */
export default function EventsPage() {
  return (
    <div className="w-full bg-[#FAF6F0] min-h-[75vh] flex flex-col justify-center py-24 sm:py-32 lg:py-36">
      <Container size="default">
        {/* Editorial Header */}
        <div className="max-w-3xl mx-auto text-center space-y-6 relative">
          {/* Subtle Organic Arc Behind Title */}
          <div className="absolute left-1/2 -top-6 -translate-x-1/2 w-[320px] sm:w-[480px] lg:w-[600px] h-[140px] sm:h-[180px] pointer-events-none -z-10 select-none overflow-hidden opacity-10">
            <svg viewBox="0 0 720 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path d="M40,210 C180,60 540,60 680,210" stroke="#1E460B" strokeWidth="2" strokeLinecap="round" />
              <path d="M100,230 C220,110 500,110 620,230" stroke="#1E460B" strokeWidth="1.5" strokeDasharray="10 8" />
            </svg>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAD5B5]/50 border border-[#D5C09D]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" aria-hidden="true" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#5A4D3A] font-semibold">
              Earth Heritage Gatherings
            </span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#111613] tracking-tight leading-[1.1]">
            Gatherings, land visits, and farm tours.
          </h1>

          <p className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl mx-auto">
            Experiences designed to connect landowners and families with the authentic reality of agricultural land stewardship and harvest cycles.
          </p>
        </div>

        {/* Graceful Architecture State Card */}
        <div className="mt-12 sm:mt-16 max-w-2xl mx-auto rounded-3xl bg-[#FAF7F2] border border-[#D5C09D]/80 p-8 sm:p-12 text-center shadow-[0_12px_36px_rgba(26,22,17,0.06)]">
          <div className="w-12 h-12 rounded-2xl bg-[#EAD5B5]/40 border border-[#D5C09D]/80 flex items-center justify-center mx-auto mb-6 text-brand-secondary">
            <Calendar className="w-5 h-5 text-brand-secondary" aria-hidden="true" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-[#111613] font-medium mb-3">
            Upcoming schedules will be announced here.
          </h2>

          <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed mb-8">
            Seasonal harvest walks, guided estate visits, and private landowner tours will be published as official dates are confirmed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/managed-farmland"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-brand-primary text-brand-secondary hover:bg-brand-primary-hover text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            >
              <span>Explore Managed Farmland</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>

            <Link
              href="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#EAD5B5]/40 border border-[#D5C09D]/80 text-[#111613] hover:bg-[#EAD5B5]/70 text-xs font-semibold uppercase tracking-wider transition-all duration-200"
            >
              <span>See How It Works</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
