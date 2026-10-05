/**
 * Centralized Project-Categorized Exhibition Gallery Architecture (/gallery)
 * 
 * Curated authentic photographic collections organized by real Earth Heritage projects:
 * 1. Nairuthya Whispering Wood (Honnasandra, Nelamangala)
 * 2. Coconut Garden (Bidadi)
 */

export const galleryProjects = [
  {
    id: 'nairuthya-whispering-wood',
    slug: 'nairuthya-whispering-wood',
    name: 'Nairuthya Whispering Wood',
    location: 'Honnasandra, Nelamangala',
    tagline: '8-Acre Managed Farmland Estate',
    category: 'Managed Farmland',
    number: '01',
    coverImage: {
      src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood-hero.jpg',
      alt: 'Nairuthya Whispering Wood — Farmland Landscape & Entrance Portal'
    },
    images: [
      {
        id: 'nww-gal-01',
        projectId: 'nairuthya-whispering-wood',
        projectName: 'Nairuthya Whispering Wood',
        src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200708/earth-heritage/projects/nairuthya-whispering-wood-hero.jpg',
        alt: 'Nairuthya Whispering Wood — Grand Stone Steps & Temple Pergola',
        title: 'Grand Stone Steps & Temple Pergola',
        description:
          'Master-crafted stone stairway leading up to the pergola shrine, framed by mature trees and landscaped terraces.',
        category: 'Land'
      },
      {
        id: 'nww-gal-02',
        projectId: 'nairuthya-whispering-wood',
        projectName: 'Nairuthya Whispering Wood',
        src: '/images/gallery/nairuthya-02-stone-terraces.jpg',
        alt: 'Nairuthya Whispering Wood — Stone Terraces & Boundary Landscaping',
        title: 'Stone Terracing & Themed Landscaping',
        description:
          'Naturally contoured dry-stone retaining walls with vibrant flowering beds, solar street lighting, and native tree groves.',
        category: 'Nature'
      },
      {
        id: 'nww-gal-03',
        projectId: 'nairuthya-whispering-wood',
        projectName: 'Nairuthya Whispering Wood',
        src: '/images/gallery/nairuthya-03-plots-irrigation.jpg',
        alt: 'Nairuthya Whispering Wood — Drip-Irrigated Farmland Plots & Internal Roads',
        title: 'Drip-Irrigated Farmland Plots',
        description:
          'Nutrient-rich red soil plots demarcated with precast concrete fencing, active drip irrigation lines, and internal concrete avenues.',
        category: 'Cultivation'
      },
      {
        id: 'nww-gal-04',
        projectId: 'nairuthya-whispering-wood',
        projectName: 'Nairuthya Whispering Wood',
        src: '/images/gallery/nairuthya-04-children-play.jpg',
        alt: "Nairuthya Whispering Wood — Children's Outdoor Play Park & Adventure Amenities",
        title: "Children's Outdoor Play Park",
        description:
          'Dedicated outdoor recreation zone featuring swings, slides, seesaws, spring riders, safety sand bed, and perimeter fencing.',
        category: 'Experiences'
      },
      {
        id: 'nww-gal-05',
        projectId: 'nairuthya-whispering-wood',
        projectName: 'Nairuthya Whispering Wood',
        src: '/images/gallery/nairuthya-05-elevated-vista.jpg',
        alt: 'Nairuthya Whispering Wood — Elevated Farmland Vista & 30-ft Road Network',
        title: 'Elevated Farmland Vista & Roads',
        description:
          'Panoramic view overlooking the master-planned layout, wide internal roadways, titled plot boundaries, and surrounding rural countryside.',
        category: 'Land'
      },
      {
        id: 'nww-gal-06',
        projectId: 'nairuthya-whispering-wood',
        projectName: 'Nairuthya Whispering Wood',
        src: '/images/gallery/nairuthya-06-outdoor-fitness.jpg',
        alt: 'Nairuthya Whispering Wood — Outdoor Recreation & Fitness Zone',
        title: 'Outdoor Recreation & Fitness Zone',
        description:
          "Open-air wellness and activity area set against stone-lined agrarian corridors and bamboo plantation borders.",
        category: 'Farm Life'
      },
      {
        id: 'nww-gal-07',
        projectId: 'nairuthya-whispering-wood',
        projectName: 'Nairuthya Whispering Wood',
        src: '/images/projects/nairuthya-whispering-wood-hero.jpg',
        alt: 'Nairuthya Whispering Wood — Entrance Portal & Farm Landscape',
        title: 'Entrance Portal & Farm Corridor',
        description:
          'Main landscaped approach featuring traditional stone masonry, flowering shrubs, and estate boundary trees.',
        category: 'Land'
      }
    ]
  },
  {
    id: 'coconut-garden',
    slug: 'coconut-garden',
    name: 'Coconut Garden',
    location: 'Bidadi',
    tagline: '6-Acre Premium Farm Plots',
    category: 'Premium Farm Plots',
    number: '02',
    coverImage: {
      src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201949/earth-heritage/projects/coconut-garden-hero.jpg',
      alt: 'Coconut Garden — Premium Farm Plots in Bidadi'
    },
    images: [
      {
        id: 'cg-gal-01',
        projectId: 'coconut-garden',
        projectName: 'Coconut Garden',
        src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201948/earth-heritage/projects/coconut-garden/entrance-gate.jpg',
        alt: 'Coconut Garden — Grand Entrance Gate & Perimeter Wall',
        title: 'Grand Entrance Gate & Boundary Access',
        description:
          'Distinguished security entrance portal with gated security access and boundary perimeter walls at Coconut Garden in Bidadi.',
        category: 'Infrastructure'
      },
      {
        id: 'cg-gal-02',
        projectId: 'coconut-garden',
        projectName: 'Coconut Garden',
        src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791200705/earth-heritage/projects/coconut-garden/internal-road-layout.jpg',
        alt: 'Coconut Garden — Wide Internal Road & Demarcated Plots',
        title: 'Internal Road & Layout Network',
        description:
          'Wide internal access avenues and demarcated farm plot boundaries bordered with mature coconut palm groves.',
        category: 'Layout'
      },
      {
        id: 'cg-gal-03',
        projectId: 'coconut-garden',
        projectName: 'Coconut Garden',
        src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791203228/earth-heritage/projects/coconut-garden/plot-demarcation-10.jpg',
        alt: 'Coconut Garden — Plot Demarcation & Established Trees',
        title: 'Individual Plot Demarcation',
        description:
          'Demarcated farm plots with established coconut trees, fertile red soil, and individual agricultural irrigation hookups.',
        category: 'Cultivation'
      },
      {
        id: 'cg-gal-04',
        projectId: 'coconut-garden',
        projectName: 'Coconut Garden',
        src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791203230/earth-heritage/projects/coconut-garden/farm-landscape-groves.jpg',
        alt: 'Coconut Garden — Cultivated Farm Land & Groves',
        title: 'Cultivated Farm Land & Coconut Groves',
        description:
          'Flourishing farm plots with orderly rows of coconut trees and open peaceful countryside surroundings.',
        category: 'Nature'
      },
      {
        id: 'cg-gal-05',
        projectId: 'coconut-garden',
        projectName: 'Coconut Garden',
        src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791203224/earth-heritage/projects/coconut-garden/boundary-plantation-wall.png',
        alt: 'Coconut Garden — Perimeter Compound Wall & Plantation Line',
        title: 'Compound Wall & Plantation Green Cover',
        description:
          'Precast concrete compound wall with verdant plantation tree line for estate security and privacy.',
        category: 'Infrastructure'
      },
      {
        id: 'cg-gal-06',
        projectId: 'coconut-garden',
        projectName: 'Coconut Garden',
        src: 'https://res.cloudinary.com/yffbj6hj/image/upload/v1791201949/earth-heritage/projects/coconut-garden-hero.jpg',
        alt: 'Coconut Garden — Open Farmland Plot Vista in Bidadi',
        title: 'Open Farmland Plot Vista',
        description:
          'Expansive countryside vista showcasing fertile soil, perimeter tree canopy, and peaceful rural setting.',
        category: 'Land'
      }
    ]
  }
];

export const galleryCategories = [
  { id: 'ALL', label: 'All Projects' },
  ...galleryProjects.map((p) => ({ id: p.id, label: p.name }))
];

export const galleryImages = galleryProjects.flatMap((p) => p.images);
