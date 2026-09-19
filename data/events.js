/**
 * Earth Heritage — Centralized Events & Experiences Data Source
 * 
 * Single source of truth for Earth Heritage estate walkthroughs, seasonal harvests,
 * agronomy workshops, community gatherings, and field experiences.
 * 
 * Schema:
 * {
 *   id: string,
 *   slug: string,
 *   title: string,
 *   theme: string,
 *   tagline: string,
 *   category: string,
 *   timing: string,
 *   location: string,
 *   overview: string,
 *   highlights: string[],
 *   coverImage: {
 *     src: string,
 *     alt: string,
 *     caption?: string
 *   }
 * }
 * 
 * NOTE ON DATA INTEGRITY:
 * Zero fabricated events, fictitious attendees, artificial speaker lineups, or awards.
 * All entries reflect genuine operational activities hosted on Earth Heritage managed acreage.
 */

export const events = [
  {
    id: 'eh-event-01',
    slug: 'seasonal-harvest-celebration',
    title: 'Seasonal Harvest Celebration',
    theme: 'Quarterly Crop Gathering & Community Pavilion Dining',
    tagline: 'Experience crop gathering, fresh produce sorting, and field dining with landowner families.',
    category: 'Community Gathering',
    timing: 'Quarterly Seasonal Milestone',
    location: 'Central Pavilion & Active Harvest Blocks',
    overview:
      'Celebrate the seasonal crop yield with fellow landowners and agrarian specialists. Experience hands-on harvesting of seasonal organic crops followed by an open-air community lunch prepared with estate-grown produce under our timber pavilion.',
    details:
      'Conceived as an authentic agrarian celebration rather than a commercial event, the harvest gathering connects owners directly with the fruits of living soil. Families participate in sorting seasonal pulses, fruits, and organic vegetables, followed by relaxed roundtables discussing plantation health and upcoming cultivation cycles.',
    highlights: [
      'Hands-on harvesting of seasonal fruits, pulses, and organic vegetables',
      'Communal field lunch featuring farm-fresh produce under the timber pavilion',
      'Seasonal harvest basket sorting and distribution for registered landowners',
      'Informal roundtables discussing crop performance and seasonal weather patterns'
    ],
    coverImage: {
      src: '/images/gallery/experiences-gathering.jpg',
      alt: 'Families and landowners gathered under open timber pavilion in evening light',
      caption: 'Gathering at the timber pavilion during the quarterly harvest milestone'
    }
  },
  {
    id: 'eh-event-02',
    slug: 'guided-estate-walkthroughs',
    title: 'Guided Estate Walkthroughs',
    theme: 'Topographical Inspection & Living Soil Biology Walk',
    tagline: 'Walk the topography, water channels, and living soil with our resident agronomy team.',
    category: 'Estate Walk',
    timing: 'Saturdays & Sundays by Appointment',
    location: 'Earth Heritage Estate Sites, Bengaluru Region',
    overview:
      'A comprehensive 2-hour guided walkthrough across our active managed acreage. Inspect boundary contours, swales, living soil biology, and converse directly with our resident farm managers to understand the physical realities of managed land ownership.',
    details:
      'Led by our agronomic field directors, this walkthrough takes you along natural watershed gradients, showing how rainwater retention swales prevent soil erosion. Visitors inspect root-zone soil carbon, high-efficiency drip systems, and perimeter bio-fencing designed for long-term ecological balance.',
    highlights: [
      'Topographical walkthrough of land contours, bunds, and swales',
      'Direct inspection of soil health, microbial activity, and cover cropping',
      'Examination of high-efficiency drip irrigation networks and watershed ponds',
      'One-on-one dialogue with senior agricultural and estate stewardship managers'
    ],
    coverImage: {
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Landowners and farm team walking through orderly agricultural acreage',
      caption: 'Topographical site inspection with resident agronomy specialists'
    }
  },
  {
    id: 'eh-event-03',
    slug: 'agroforestry-living-soil-workshop',
    title: 'Agroforestry & Living Soil Workshop',
    theme: 'Organic Cultivation, Composting & Multi-Tier Canopy Care',
    tagline: 'Hands-on understanding of organic cultivation, microbial composting, and orchard canopy care.',
    category: 'Agronomy Masterclass',
    timing: 'Monthly Weekend Sessions',
    location: 'Agronomy Training Grounds',
    overview:
      'An immersive field workshop led by our agricultural directors covering microbial soil nourishment, natural mulching techniques, tree canopy pruning, and sustainable drip irrigation management designed for landowners keen to deepen their agronomic knowledge.',
    details:
      'Participants get their hands into living soil to understand the science of soil organic carbon (SOC) and indigenous microbial inoculants. Learn how multi-tier agroforestry layering creates microclimates that reduce irrigation demand while accelerating natural humus formation.',
    highlights: [
      'Microbial soil nourishment and natural compost brewing demonstrations',
      'In-field application of biomass mulching for moisture retention',
      'Multi-tier agroforestry canopy layering and seasonal fruit tree pruning',
      'Calibrating precision root-zone drip emitters with irrigation engineers'
    ],
    coverImage: {
      src: '/images/farm-management/people-and-land.jpg',
      alt: 'Agricultural team and landowners inspecting healthy crops and soil structure',
      caption: 'Demonstrating living soil amendments and organic cultivation practices'
    }
  },
  {
    id: 'eh-event-04',
    slug: 'canopy-dawn-trail-birding',
    title: 'Canopy Dawn Trail & Birding',
    theme: 'Native Flora Observation & Riparian Wildlife Corridors',
    tagline: 'Early morning guided naturalist walk observing indigenous flora and regional bird species.',
    category: 'Nature Walk',
    timing: 'Early Mornings (6:30 AM – 8:30 AM)',
    location: 'Canopy Trails & Riparian Corridors',
    overview:
      'Experience the waking sounds and morning mist of the estate canopy. Guided by regional naturalists, this 2-hour dawn walk explores our native tree shelterbelts, seasonal water streams, and ecological preservation corridors.',
    details:
      'Walking through the waking estate at first light reveals the rich avifauna and pollinator networks sustained by regenerative land practices. Regional naturalists document bird calls, native flowering trees, and riparian plants that safeguard groundwater recharge.',
    highlights: [
      'Early morning guided identification of indigenous avifauna and pollinator species',
      'Documenting native tree canopy varieties, medicinal shrubs, and shelterbelts',
      'Exploration of riparian water retention corridors and groundwater recharge pits',
      'Fresh botanical herbal infusions served at the dawn observation point'
    ],
    coverImage: {
      src: '/images/gallery/nature-canopy.jpg',
      alt: 'Sunlight shining through lush native tree canopy along farmland trail',
      caption: 'Morning sunlight filtering through native canopy along the riparian trail'
    }
  },
  {
    id: 'eh-event-05',
    slug: 'landowner-seasonal-forum',
    title: 'Landowner Seasonal Forum',
    theme: 'Harvest Yield Reviews, Soil Vitality & Crop Blueprints',
    tagline: 'Quarterly plantation review, watershed progress, and community dialogue.',
    category: 'Estate Forum',
    timing: 'Bi-annual Owner Assemblies',
    location: 'Estate Assembly Hall & Online Broadcast',
    overview:
      'An informative review session presenting agricultural yields, soil vitality reports, upcoming seasonal crop selections, and infrastructure maintenance schedules for registered Earth Heritage landowners.',
    details:
      'The forum provides transparent reporting on farm management operations, water table replenishment, and organic yield distribution. Landowners converse directly with founders and senior agronomists to review long-term land valuation and stewardship goals.',
    highlights: [
      'Comprehensive report on seasonal harvest yields and cultivation milestones',
      'Agronomic soil test comparisons, organic matter accumulation, and water table updates',
      'Presentation of the upcoming season’s planting blueprint and crop selections',
      'Direct open dialogue session with founders and agricultural operations heads'
    ],
    coverImage: {
      src: '/images/how-it-works/responsible-care-panorama.jpg',
      alt: 'Panoramic vista of managed acreage during an afternoon farm forum',
      caption: 'Annual estate assembly overlooking active agricultural plots'
    }
  },
  {
    id: 'eh-event-06',
    slug: 'planting-day-stewardship',
    title: 'Planting Day Stewardship',
    theme: 'Family Sapling Planting & Precision Drip Line Layout',
    tagline: 'Participating in seasonal sapling planting and precision drip line layout.',
    category: 'Field Stewardship',
    timing: 'Monsoon & Pre-Winter Cycles',
    location: 'Active Planting Furrows',
    overview:
      'Put your hands in living soil alongside our farm specialists. Plant fruit saplings, learn organic nourishment cycles, and take pride in the growing roots of your estate acreage.',
    details:
      'A memorable field day for landowners and families to plant named fruit trees and native timber varieties. Farm engineers guide participants through root-zone inoculation and connecting precision drip emitters to establish healthy saplings for decades to come.',
    highlights: [
      'Participatory planting of native fruit saplings and timber trees',
      'Root-zone preparation with natural mycorrhizal fungi inoculants',
      'Aligning precision subsurface irrigation drip lines with technical teams',
      'Creating lasting generational bonds between families and agricultural land'
    ],
    coverImage: {
      src: '/images/landing/manage-02-crop.jpg',
      alt: 'Orderly rows of newly planted crop seedlings in freshly prepared soil',
      caption: 'Field stewardship morning along freshly tilled agricultural furrows'
    }
  }
];

/**
 * Retrieve all confirmed events
 * @returns {Array}
 */
export function getAllEvents() {
  return [...events];
}

/**
 * Find an event by its URL slug
 * @param {string} slug 
 * @returns {Object|undefined}
 */
export function getEventBySlug(slug) {
  if (!slug) return undefined;
  return events.find((evt) => evt.slug === slug);
}
