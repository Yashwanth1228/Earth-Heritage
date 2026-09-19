import { constructMetadata } from '@/lib/seo';
import { getEventsCollectionSchema } from '@/lib/schema';
import { getAllEvents } from '@/data/events';
import EventsHeader from '@/components/events/EventsHeader';
import EventsList from '@/components/events/EventsList';
import EventsClosingCta from '@/components/events/EventsClosingCta';

export const metadata = {
  ...constructMetadata({
    title: 'Events & Experiences',
    description:
      'Where people, land and community come together. Explore scheduled estate walkthroughs, seasonal harvest celebrations, and agronomy workshops by Earth Heritage.',
    canonicalUrl: '/events'
  }),
  title: 'Events & Experiences | Earth Heritage'
};

/**
 * Direct Editorial Events List Hub (/events)
 * 
 * Layout Hierarchy:
 * 1. JSON-LD CollectionPage Structured Data
 * 2. EventsHeader: Compact, refined title with botanical accent (low vertical footprint)
 * 3. EventsList: Direct display of event cards with title, timing/category badges, theme, narrative, highlights, and attendance actions
 * 4. EventsClosingCta: Restrained corporate invitation to schedule estate visits
 */
export default function EventsPage() {
  const allEvents = getAllEvents();
  const collectionSchema = getEventsCollectionSchema(allEvents);

  return (
    <>
      {/* CollectionPage Schema for /events */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <div className="w-full bg-[#FAF7F2] min-h-screen">
        {/* Compact Refined Header */}
        <EventsHeader />

        {/* Direct List of Events */}
        <EventsList events={allEvents} />

        {/* Closing CTA */}
        <EventsClosingCta title="Stay connected with Earth Heritage." />
      </div>
    </>
  );
}
