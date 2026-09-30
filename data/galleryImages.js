/**
 * Centralized Exhibition Gallery Images Architecture (/gallery)
 * 
 * Curated authentic photographic collection from Nairuthya Whispering Wood:
 * - LAND
 * - NATURE
 * - CULTIVATION
 * - FARM LIFE
 * - EXPERIENCES
 */

export const galleryCategories = [
  { id: 'ALL', label: 'All' },
  { id: 'LAND', label: 'Land' },
  { id: 'NATURE', label: 'Nature' },
  { id: 'CULTIVATION', label: 'Cultivation' },
  { id: 'FARM LIFE', label: 'Farm Life' },
  { id: 'EXPERIENCES', label: 'Experiences' }
];

export const galleryImages = [
  {
    id: 'gal-real-01',
    src: '/images/gallery/nairuthya-01-entrance.jpg',
    alt: 'Nairuthya Whispering Wood — Grand Stone Steps & Temple Pergola',
    title: 'Grand Stone Steps & Temple Pergola',
    description: 'Master-crafted stone stairway leading up to the pergola shrine, framed by mature trees and landscaped terraces.',
    category: 'LAND',
    aspect: 'aspect-[16/10]',
    span: 'col-span-1',
    width: 1100,
    height: 485
  },
  {
    id: 'gal-real-02',
    src: '/images/gallery/nairuthya-02-stone-terraces.jpg',
    alt: 'Nairuthya Whispering Wood — Stone Terraces & Boundary Landscaping',
    title: 'Stone Terracing & Themed Landscaping',
    description: 'Naturally contoured dry-stone retaining walls with vibrant flowering beds, solar street lighting, and native tree groves.',
    category: 'NATURE',
    aspect: 'aspect-[16/10]',
    span: 'col-span-1',
    width: 1024,
    height: 460
  },
  {
    id: 'gal-real-03',
    src: '/images/gallery/nairuthya-03-plots-irrigation.jpg',
    alt: 'Nairuthya Whispering Wood — Drip-Irrigated Farmland Plots & Internal Roads',
    title: 'Drip-Irrigated Farmland Plots',
    description: 'Nutrient-rich red soil plots demarcated with precast concrete fencing, active drip irrigation lines, and internal concrete avenues.',
    category: 'CULTIVATION',
    aspect: 'aspect-[16/10]',
    span: 'col-span-1',
    width: 1024,
    height: 460
  },
  {
    id: 'gal-real-04',
    src: '/images/gallery/nairuthya-04-children-play.jpg',
    alt: "Nairuthya Whispering Wood — Children's Outdoor Play Park & Adventure Amenities",
    title: "Children's Outdoor Play Park",
    description: 'Dedicated outdoor recreation zone featuring swings, slides, seesaws, spring riders, safety sand bed, and perimeter fencing.',
    category: 'EXPERIENCES',
    aspect: 'aspect-[16/10]',
    span: 'col-span-1',
    width: 1024,
    height: 460
  },
  {
    id: 'gal-real-05',
    src: '/images/gallery/nairuthya-05-elevated-vista.jpg',
    alt: 'Nairuthya Whispering Wood — Elevated Farmland Vista & 30-ft Road Network',
    title: 'Elevated Farmland Vista & Roads',
    description: 'Panoramic view overlooking the master-planned layout, wide internal roadways, titled plot boundaries, and surrounding rural countryside.',
    category: 'LAND',
    aspect: 'aspect-[16/10]',
    span: 'col-span-1',
    width: 1024,
    height: 460
  },
  {
    id: 'gal-real-06',
    src: '/images/gallery/nairuthya-06-outdoor-fitness.jpg',
    alt: 'Nairuthya Whispering Wood — Outdoor Recreation & Fitness Zone',
    title: 'Outdoor Recreation & Fitness Zone',
    description: "Open-air wellness and children's activity area set against stone-lined agrarian corridors and bamboo plantation borders.",
    category: 'FARM LIFE',
    aspect: 'aspect-[16/10]',
    span: 'col-span-1',
    width: 1024,
    height: 460
  }
];
