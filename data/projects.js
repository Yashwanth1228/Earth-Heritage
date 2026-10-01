/**
 * Earth Heritage — Centralized Project Data Source
 * 
 * Single source of truth for Earth Heritage projects, managed land initiatives,
 * and dynamic project detail pages (/projects/[slug]).
 * 
 * Project Schema Architecture (for future verified projects):
 * {
 *   id: string,               // Unique project identifier (e.g. 'eh-estates-01')
 *   slug: string,             // URL slug (e.g. 'green-valley-estate')
 *   name: string,             // Confirmed official project name
 *   tagline?: string,         // Short descriptive tagline
 *   description?: string,     // In-depth editorial project narrative
 *   overview?: string,        // Comprehensive land & terroir story
 *   stewardshipApproach?: string, // Verified agricultural & operational farm management approach
 *   location?: string,        // Confirmed geographic region / district
 *   status?: string,          // 'In Planning' | 'Under Development' | 'Active Stewardship'
 *   heroImage?: {             // Primary hero landscape visual
 *     src: string,
 *     alt: string
 *   },
 *   images?: Array<{          // Primary image list
 *     src: string,
 *     alt: string,
 *     caption?: string
 *   }>,
 *   gallery?: Array<{         // Curated field & land photography
 *     src: string,
 *     alt: string,
 *     caption?: string
 *   }>,
 *   features?: string[],      // Confirmed operational/land features
 *   enquiryInterest?: string  // Pre-filled interest for global enquiry modal
 * }
 * 
 * NOTE:
 * Do NOT invent fake project names, acreage, returns, or testimonials.
 * When real projects are officially confirmed, add them directly to this array.
 */

export const projects = [
  {
    id: 'nairuthya-whispering-wood',
    slug: 'nairuthya-whispering-wood',
    name: 'Nairuthya Whispering Wood',
    seoTitle: 'Nairuthya Whispering Wood | Managed Farmland in Nelamangala',
    seoDescription:
      'Explore Nairuthya Whispering Wood, an 8-acre managed farmland project in Honnasandra, Nelamangala, with 25 premium plots, plantations and farm-focused amenities.',
    h1: 'Nairuthya Whispering Wood — Managed Farmland in Honnasandra, Nelamangala',
    number: '01',
    category: 'Managed Farmland',
    tagline: '8-Acre Managed Farmland in Honnasandra, Nelamangala',
    shortDescription:
      'Explore Nairuthya Whispering Wood, an 8-acre managed farmland project in Honnasandra, Nelamangala, with 25 premium plots, plantations and farm-focused amenities.',
    overview:
      'Nairuthya Whispering Wood is an 8-acre managed farmland project situated in Honnasandra, Nelamangala. The project brings together direct titled land ownership with disciplined agricultural development and long-term professional farm management by Earth Heritage.\n\nComprising a boutique enclave of 25 premium plots starting from 6,000 sq.ft at ₹1,699/sq.ft, the estate is planted with valuable timber species including Mahogany, Teak Wood, and Red Sandal, alongside perennial Coconut, Areca Nut, and seasonal fruit varieties.',
    stewardshipApproach:
      'Earth Heritage acquired the estate land, undertakes complete on-ground farm development, sells titled plots to individual buyers, and continues managing all daily farm operations, irrigation networks, and plantation care.',
    location: 'Honnasandra · Nelamangala · Bengaluru',
    locationDetails: {
      village: 'Honnasandra',
      taluk: 'Nelamangala',
      district: 'Bengaluru Rural',
      state: 'Karnataka',
      distanceBengaluru: 'Approximately 35 km',
      distanceNelamangala: 'Approximately 8 km',
      mapQuery: 'Whispering Wood by Nairuthya Properties',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.00800222693!2d77.33212307359022!3d13.03516221348457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae310049c2514b%3A0x31df4bed6b535bbd!2sWhispering%20Wood%20by%20Nairuthya%20Properties!5e0!3m2!1sen!2sin!4v1790763247598!5m2!1sen!2sin',
      mapShareUrl:
        'https://www.google.com/maps/place/Whispering+Wood+by+Nairuthya+Properties/@13.0351622,77.332123,17z'
    },
    status: 'new',
    isDemo: false,
    featured: true,
    heroImage: {
      src: '/images/projects/nairuthya-whispering-wood-hero.jpg',
      alt: 'Nairuthya Whispering Wood farmland landscape in Honnasandra'
    },
    coverImage: {
      src: '/images/projects/nairuthya-whispering-wood-hero.jpg',
      alt: 'Nairuthya Whispering Wood 8-acre managed farmland layout plan in Honnasandra'
    },
    locationMapImage: {
      src: null,
      alt: 'Nairuthya Whispering Wood — Regional Location & Route Map'
    },
    snapshot: {
      totalArea: '8 Acres',
      totalPlots: '25 Premium Plots',
      minPlotSize: '6,000 sq.ft Minimum Plot',
      pricePerSqFt: '₹1,699 / sq.ft',
      distBengaluru: 'Approximately 35 km',
      distNelamangala: 'Approximately 8 km'
    },
    aboutModel: {
      eyebrow: 'LAND DEVELOPMENT & STEWARDSHIP MODEL',
      title: 'Acquired, Developed, and Professionally Managed by Earth Heritage',
      points: [
        {
          num: '01',
          title: 'Direct Land Acquisition',
          description: 'Earth Heritage has purchased and secured the project land under thorough legal due diligence.'
        },
        {
          num: '02',
          title: 'Comprehensive Farm Development',
          description: 'Earth Heritage develops the complete agricultural layout including 30-ft internal roads, drainage, boundary fencing, entrance arch, and water supply.'
        },
        {
          num: '03',
          title: 'Individual Titled Plot Ownership',
          description: 'Farmland plots starting from 6,000 sq.ft are sold directly to buyers with registered, individual legal title deeds.'
        },
        {
          num: '04',
          title: 'Sustained Operational Farm Management',
          description: 'Earth Heritage continues managing the farmland post-purchase, coordinating agrarian manpower, cultivation, maintenance, irrigation, and day-to-day operations.'
        }
      ]
    },
    plantations: [
      {
        id: 'mahogany',
        name: 'Mahogany',
        botanical: 'Swietenia macrophylla',
        category: 'Hardwood Timber',
        description:
          'A deep-rooting timber species that develops an expansive green canopy, enriches topsoil structure, and establishes an enduring long-term green asset.',
        image: {
          src: '/images/plantations/mahogany.jpg',
          alt: 'Mahogany plantation at Nairuthya Whispering Wood',
          caption: 'Mahogany Hardwood Timber'
        }
      },
      {
        id: 'teak-wood',
        name: 'Teak Wood',
        botanical: 'Tectona grandis',
        category: 'Valuable Timber',
        description:
          'World-renowned for structural durability, dense grain, and natural weather resistance, cultivated along dedicated farm corridors.',
        image: {
          src: '/images/plantations/teak-wood.jpg',
          alt: 'Teak wood cultivation at Nairuthya Whispering Wood',
          caption: 'Teak Wood Cultivation'
        }
      },
      {
        id: 'coconut',
        name: 'Coconut',
        botanical: 'Cocos nucifera',
        category: 'Perennial Palm',
        description:
          'An iconic perennial palm of Karnataka’s agrarian landscape, providing continuous perimeter shade, soil stabilization, and seasonal yield.',
        image: {
          src: '/images/plantations/coconut.jpg',
          alt: 'Coconut palms at Nairuthya Whispering Wood',
          caption: 'Coconut Palm Grove'
        }
      },
      {
        id: 'areca-nut',
        name: 'Areca Nut',
        botanical: 'Areca catechu',
        category: 'Commercial Plantation',
        description:
          'A high-yielding regional commercial plantation crop deeply rooted in Nelamangala’s farming tradition, cared for with systematic micro-irrigation.',
        image: {
          src: '/images/plantations/areca-nut.jpg',
          alt: 'Areca nut plantation at Nairuthya Whispering Wood',
          caption: 'Areca Nut Plantation'
        }
      },
      {
        id: 'red-sandal',
        name: 'Red Sandal',
        botanical: 'Pterocarpus santalinus',
        category: 'Indigenous Hardwood',
        description:
          'A slow-growing, precious indigenous hardwood species celebrated for its dense, rich heartwood, cultivated under structured agricultural care.',
        image: {
          src: '/images/plantations/red-sandal.jpg',
          alt: 'Red sandal cultivation at Nairuthya Whispering Wood',
          caption: 'Red Sandal Hardwood'
        }
      },
      {
        id: 'seasonal-fruits',
        name: 'Seasonal Fruits',
        botanical: 'Curated Local Varieties',
        category: 'Orchard & Biodiversity',
        description:
          '2–3 varieties of seasonal fruits suited to local soil and climatic conditions, introducing ecological biodiversity and fresh seasonal harvests.',
        image: {
          src: '/images/plantations/seasonal-fruits.jpg',
          alt: 'Seasonal fruit orchard at Nairuthya Whispering Wood',
          caption: 'Seasonal Fruit Orchard'
        }
      }
    ],
    amenities: {
      experience: [
        {
          id: 'pond-area',
          title: 'Pond Area',
          category: 'Water & Habitat',
          description: 'A dedicated pond area within the project.',
          image: { src: '/images/amenities/pond-area.jpg', alt: 'Pond Area at Nairuthya Whispering Wood' }
        },
        {
          id: 'yoga-meditation',
          title: 'Yoga & Meditation Area',
          category: 'Mindfulness & Wellness',
          description: 'A designated space for yoga and meditation.',
          image: { src: '/images/amenities/yoga-meditation.jpg', alt: 'Yoga & Meditation Area at Nairuthya Whispering Wood' }
        },
        {
          id: 'viewpoint',
          title: 'Viewpoint',
          category: 'Scenic Vista',
          description: 'An elevated viewpoint overlooking the farmland and surrounding landscape.',
          image: { src: '/images/amenities/viewpoint.jpg', alt: 'Viewpoint at Nairuthya Whispering Wood' }
        },
        {
          id: 'garden-area',
          title: 'Garden Area',
          category: 'Flora & Landscaping',
          description: 'A planned garden area within the project.',
          image: { src: '/images/amenities/garden-area.jpg', alt: 'Garden Area at Nairuthya Whispering Wood' }
        },
        {
          id: 'jogging-track',
          title: 'Jogging Track',
          category: 'Active Lifestyle',
          description: 'A dedicated perimeter track for walking and jogging within the farmland.',
          image: { src: '/images/amenities/jogging-track.jpg', alt: 'Jogging Track at Nairuthya Whispering Wood' }
        },
        {
          id: 'play-area',
          title: "Children's Play Area",
          category: 'Family & Play',
          description: 'A dedicated outdoor play area for children within natural surroundings.',
          image: { src: '/images/amenities/children-play-area.jpg', alt: "Children's Play Area at Nairuthya Whispering Wood" }
        },
        {
          id: 'multi-play-court',
          title: 'Multi-Play Court Area',
          category: 'Sports & Leisure',
          description: 'A versatile outdoor court area for sports and community recreation.',
          image: { src: '/images/amenities/multi-court.jpg', alt: 'Multi-Play Court Area at Nairuthya Whispering Wood' }
        }
      ],
      infrastructure: [
        { name: 'Solar Lights', note: 'Energy-efficient illumination along main internal roads and common areas.' },
        { name: 'Grand Entrance Arch', note: 'A distinct, welcoming architectural gateway marking the private estate entrance.' },
        { name: '30-ft Double Road', note: 'Wide central arterial road ensuring seamless vehicular circulation across the farm.' },
        { name: 'Concrete Road', note: 'Durable, all-weather internal road network designed for year-round reliability.' },
        { name: 'Individual Plot Fencing', note: 'Clear legal demarcation with perimeter wire/pole fencing for every single plot.' },
        { name: 'Drainage', note: 'Systematic rainwater run-off and storm water drainage channels preventing waterlogging.' },
        { name: 'Drip Irrigation', note: 'Water-efficient sub-surface and surface drip systems for all timber and crop trees.' },
        { name: 'CCTV Surveillance', note: 'Round-the-clock perimeter monitoring covering key access points and pathways.' },
        { name: 'Water Supply', note: 'Dedicated agrarian water distribution with storage infrastructure serving all plots.' },
        { name: 'Security Guard', note: 'Stationed on-ground security personnel monitoring estate access and property safety.' }
      ]
    },
    managementProcess: [
      {
        step: '01',
        action: 'OWN',
        title: 'Titled Land Ownership',
        description: 'You acquire and retain direct, registered legal ownership of your individual farmland plot with clear title deeds.'
      },
      {
        step: '02',
        action: 'DEVELOP',
        title: 'Planned Infrastructure',
        description: 'Earth Heritage develops the complete agricultural layout—30-ft concrete roads, boundary fencing, drainage, and irrigation.'
      },
      {
        step: '03',
        action: 'CULTIVATE',
        title: 'Active Plantation Planting',
        description: 'Systematic planting and cultivation of high-value timber, coconut, areca nut, and curated seasonal fruit varieties.'
      },
      {
        step: '04',
        action: 'MANAGE',
        title: 'Day-to-Day Operations',
        description: 'Earth Heritage coordinates on-ground agrarian manpower, pruning, soil health management, and irrigation scheduling.'
      },
      {
        step: '05',
        action: 'CONTINUE',
        title: 'Generational Stewardship',
        description: 'Your farmland matures under continuous professional care, creating an enduring living legacy for your family.'
      }
    ],
    nearbyPlaces: [
      {
        id: 'nelamangala-town',
        name: 'Nelamangala Town',
        distance: 'Approx. 8 km',
        note: 'Nearest taluk center with essential civic infrastructure'
      },
      {
        id: 'bengaluru-city',
        name: 'Bengaluru (Yeshwanthpur)',
        distance: 'Approx. 35 km',
        note: 'Direct highway connectivity via elevated corridor'
      },
      {
        id: 'tumkur-road',
        name: 'Tumkur Road (NH 48)',
        distance: 'Direct Access',
        note: 'Primary 6-lane regional expressway corridor'
      },
      {
        id: 'strr-corridor',
        name: 'STRR (Satellite Town Ring Road)',
        distance: 'Orbital Corridor',
        note: 'Fast orbital ring road connecting satellite towns'
      },
      {
        id: 'shivagange',
        name: 'Shivagange Heritage Hill & Temple',
        distance: 'Approx. 22 km',
        note: 'Historic monolithic hill and heritage temple destination'
      },
      {
        id: 'hesaraghatta',
        name: 'Hesaraghatta Lake & Grasslands',
        distance: 'Approx. 24 km',
        note: 'Scenic pastoral grasslands and protected lakebed'
      }
    ],
    gallery: [
      { id: 'nairuthya-gal-1', src: '/images/gallery/nairuthya-01-entrance.jpg', alt: 'Nairuthya Whispering Wood — Grand Stone Steps & Temple Pergola', caption: 'Grand Stone Steps & Temple Pergola' },
      { id: 'nairuthya-gal-2', src: '/images/gallery/nairuthya-02-stone-terraces.jpg', alt: 'Nairuthya Whispering Wood — Stone Terraces & Boundary Landscaping', caption: 'Stone Terraces & Boundary Landscaping' },
      { id: 'nairuthya-gal-3', src: '/images/gallery/nairuthya-03-plots-irrigation.jpg', alt: 'Nairuthya Whispering Wood — Drip-Irrigated Farmland Plots & Internal Roads', caption: 'Drip-Irrigated Farmland Plots & Roads' },
      { id: 'nairuthya-gal-4', src: '/images/gallery/nairuthya-04-children-play.jpg', alt: "Nairuthya Whispering Wood — Children's Outdoor Play Park", caption: "Children's Outdoor Play Area" },
      { id: 'nairuthya-gal-5', src: '/images/gallery/nairuthya-05-elevated-vista.jpg', alt: 'Nairuthya Whispering Wood — Elevated Farmland Vista & 30-ft Road Network', caption: 'Elevated Farmland Vista & 30-ft Roads' },
      { id: 'nairuthya-gal-6', src: '/images/gallery/nairuthya-06-outdoor-fitness.jpg', alt: 'Nairuthya Whispering Wood — Outdoor Recreation & Fitness Zone', caption: 'Outdoor Recreation & Fitness Zone' }
    ],
    faqs: [
      {
        question: 'Where is Nairuthya Whispering Wood located?',
        answer: 'Nairuthya Whispering Wood is situated in Honnasandra, Nelamangala Taluk, Bengaluru Rural District, Karnataka. It is approximately 8 km from Nelamangala town and approximately 35 km from Bengaluru.'
      },
      {
        question: 'What is the total project size?',
        answer: 'The total project area is 8 acres of master-planned, developing agricultural farmland in Honnasandra, Nelamangala.'
      },
      {
        question: 'How many plots are there in the project?',
        answer: 'The project comprises a planned layout of 25 premium farmland plots.'
      },
      {
        question: 'What is the minimum plot size available?',
        answer: 'The minimum individual farmland plot size is 6,000 sq.ft, providing generous acreage for personal enjoyment and cultivation.'
      },
      {
        question: 'What is the current price per sq.ft?',
        answer: 'The farmland plots are currently priced at ₹1,699 per sq.ft.'
      },
      {
        question: 'What plantations are planned and grown on the land?',
        answer: 'Confirmed plantations cultivated across the estate include Mahogany, Teak Wood, Coconut, Areca Nut, Red Sandal, and 2 to 3 varieties of seasonal fruits suited to the local soil and climate.'
      },
      {
        question: 'What amenities and infrastructure are provided?',
        answer: 'Experience amenities include a Children’s Play Area, Pond Area, Yoga & Meditation Area, Viewpoint, Garden Area, Jogging Track, and Multi-Play Court Area. Infrastructure includes Solar Lights, Grand Entrance Arch, 30-ft Double Road, Concrete Roads, Individual Plot Fencing, Drainage, Drip Irrigation, CCTV Surveillance, Water Supply, and Security Guard.'
      },
      {
        question: 'How does Earth Heritage manage the farmland after purchase?',
        answer: 'Earth Heritage acquires the project land, develops the agricultural layout, and sells individual titled plots to buyers. Following your purchase, Earth Heritage continues to handle all agreed day-to-day farm management—including manpower coordination, irrigation, plantation maintenance, and operational supervision—while you retain full legal ownership of your plot.'
      }
    ],
    enquiryInterest: 'Nairuthya Whispering Wood'
  },
  {
    id: 'coconut-garden',
    slug: 'coconut-garden',
    name: 'Coconut Garden',
    seoTitle: 'Coconut Garden | Premium Farm Plots in Bidadi',
    seoDescription:
      'Explore Coconut Garden, an ongoing 6-acre premium farm plots project in Bidadi with 6,000 sq.ft minimum plot sizes, 25+ plantation trees, and peaceful natural surroundings.',
    h1: 'Coconut Garden — Premium Farm Plots in Bidadi',
    number: '02',
    category: 'Premium Farm Plots',
    tagline: '6-Acre Premium Farm Plots in Bidadi',
    shortDescription:
      'An ongoing 6-acre premium farm plots project in Bidadi offering 6,000 sq.ft minimum plot sizes at ₹749/sq.ft, surrounded by nature and 25+ plantation trees.',
    overview:
      'Coconut Garden is an ongoing 6-acre premium farm plots project located in Bidadi. Set in a green and peaceful environment surrounded by nature, the project offers minimum plot sizes of 6,000 sq.ft priced at ₹749/sq.ft.\n\nThe estate features 25+ plantation trees per plot, making it ideal for weekend homes and presenting an excellent investment opportunity in managed rural land.',
    stewardshipApproach:
      'Focused on active on-ground agricultural stewardship, estate infrastructure maintenance, and preservation of the peaceful natural environment across the 6-acre project.',
    location: 'Bidadi',
    locationDetails: {
      village: null,
      taluk: 'Bidadi',
      district: 'Ramanagara',
      state: 'Karnataka',
      distanceBengaluru: null,
      distanceBidadi: null,
      mapQuery: 'Destiny coconut Garden by Destiny Promoters',
      mapEmbedUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.091233352843!2d77.39462277358344!3d12.672078021377338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5b0056537b67%3A0x776326ca88bf971c!2sDestiny%20coconut%20Garden%20by%20Destiny%20Promoters!5e1!3m2!1sen!2sin!4v1790853482568!5m2!1sen!2sin',
      mapShareUrl:
        'https://www.google.com/maps/place/Destiny+coconut+Garden+by+Destiny+Promoters/@12.672078,77.3946228,17z',
      mapEmbedCode:
        '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2965.091233352843!2d77.39462277358344!3d12.672078021377338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae5b0056537b67%3A0x776326ca88bf971c!2sDestiny%20coconut%20Garden%20by%20Destiny%20Promoters!5e1!3m2!1sen!2sin!4v1790853482568!5m2!1sen!2sin" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
    },
    status: 'Ongoing',
    isDemo: false,
    featured: false,
    heroImage: {
      src: '/images/projects/coconut-garden-hero.jpg',
      alt: 'Coconut Garden premium farm plots in Bidadi'
    },
    coverImage: {
      src: '/images/projects/coconut-garden/internal-road-layout.jpg',
      alt: 'Coconut Garden 6-acre farm plots layout and internal road in Bidadi'
    },
    locationMapImage: {
      src: null,
      alt: 'Coconut Garden — Location Map in Bidadi'
    },
    images: [
      {
        src: '/images/projects/coconut-garden/entrance-gate.jpg',
        alt: 'Grand entrance gate and perimeter wall at Coconut Garden in Bidadi'
      },
      {
        src: '/images/projects/coconut-garden/internal-road-layout.jpg',
        alt: 'Wide internal road and demarcated farm plot boundaries at Coconut Garden'
      },
      {
        src: '/images/projects/coconut-garden/plot-demarcation-10.jpg',
        alt: 'Demarcated farm plot with established coconut trees and irrigation hookup'
      },
      {
        src: '/images/projects/coconut-garden/farm-landscape-groves.jpg',
        alt: 'Cultivated farm plots with rows of coconut trees and open countryside'
      },
      {
        src: '/images/projects/coconut-garden/boundary-plantation-wall.png',
        alt: 'Precast concrete compound wall with verdant plantation tree line'
      }
    ],
    gallery: [
      {
        id: 'cg-gallery-01',
        title: 'Grand Entrance & Approach',
        caption: 'Grand Entrance Gateway & Boundary Access',
        alt: 'Grand entrance gate and perimeter wall at Coconut Garden in Bidadi',
        src: '/images/projects/coconut-garden/entrance-gate.jpg'
      },
      {
        id: 'cg-gallery-02',
        title: 'Internal Road & Layout',
        caption: 'Wide Internal Roads & Demarcated Plots',
        alt: 'Wide internal road and demarcated farm plot boundaries at Coconut Garden',
        src: '/images/projects/coconut-garden/internal-road-layout.jpg'
      },
      {
        id: 'cg-gallery-03',
        title: 'Farm Plot Demarcation',
        caption: 'Individual Plot Demarcation & Mature Trees',
        alt: 'Demarcated farm plot with established coconut trees and irrigation hookup',
        src: '/images/projects/coconut-garden/plot-demarcation-10.jpg'
      },
      {
        id: 'cg-gallery-04',
        title: 'Cultivated Farm Land & Groves',
        caption: 'Lush Coconut Palm Groves & Open Farmland',
        alt: 'Cultivated farm plots with rows of coconut trees and open countryside',
        src: '/images/projects/coconut-garden/farm-landscape-groves.jpg'
      },
      {
        id: 'cg-gallery-05',
        title: 'Perimeter Boundary Wall',
        caption: 'Compound Wall & Plantation Green Cover',
        alt: 'Precast concrete compound wall with verdant plantation tree line',
        src: '/images/projects/coconut-garden/boundary-plantation-wall.png'
      }
    ],
    snapshot: {
      totalArea: '6 Acres',
      totalPlots: null,
      minPlotSize: '6,000 Sq. Ft.',
      pricePerSqFt: '₹749 per Sq. Ft.',
      plantation: '25+ Plantation Trees',
      plantationCount: '25+ Plantation Trees',
      distBengaluru: null,
      distBidadi: null
    },
    highlights: [
      'Premium Farm Land',
      'Ideal for Weekend Homes',
      'Green & Peaceful Environment',
      'Excellent Investment Opportunity',
      'Surrounded by Nature'
    ],
    features: [
      'Grand Entrance',
      'Solar Street Lights',
      '24/7 Security',
      'CCTV Surveillance'
    ],
    amenities: {
      experience: [
        {
          id: 'camping-area',
          title: 'Camping Area',
          category: 'Outdoor Recreation',
          description: 'Designated outdoor camping spaces immersed in the quiet countryside landscape.',
          image: {
            src: '/images/amenities/camping-area.jpg',
            alt: 'Camping Area at Coconut Garden in Bidadi'
          }
        },
        {
          id: 'cottages',
          title: 'Cottages',
          category: 'Farm Retreat',
          description: 'Peaceful farm cottage retreats designed for comfortable weekend stays surrounded by nature.',
          image: {
            src: '/images/amenities/cottages.jpg',
            alt: 'Cottages at Coconut Garden in Bidadi'
          }
        },
        {
          id: 'club-house',
          title: 'Club House',
          category: 'Social & Hospitality',
          description: 'Community gathering space for relaxation, social interaction, and countryside hospitality.',
          image: {
            src: '/images/amenities/club-house.jpg',
            alt: 'Club House at Coconut Garden in Bidadi'
          }
        },
        {
          id: 'indoor-games',
          title: 'Indoor Games',
          category: 'Leisure & Sports',
          description: 'Recreational indoor games facility providing leisure activities for all age groups.',
          image: {
            src: '/images/amenities/indoor-games.jpg',
            alt: 'Indoor Games at Coconut Garden in Bidadi'
          }
        },
        {
          id: 'swimming-pool',
          title: 'Swimming Pool',
          category: 'Recreation & Wellness',
          description: 'Recreational swimming pool thoughtfully integrated into the green agricultural estate landscape.',
          image: {
            src: '/images/amenities/swimming-pool.jpg',
            alt: 'Swimming Pool at Coconut Garden in Bidadi'
          }
        },
        {
          id: 'kids-play-area',
          title: 'Kids Play Area',
          category: 'Family & Children',
          description: 'Dedicated open-air play zone for children amidst clean rural surroundings.',
          image: {
            src: '/images/amenities/children-play-area.jpg',
            alt: 'Kids Play Area at Coconut Garden in Bidadi'
          }
        }
      ],
      infrastructure: [
        { name: 'Grand Entrance', note: 'Secure and architecturally distinguished estate entrance portal.' },
        { name: 'Solar Street Lights', note: 'Eco-friendly solar illumination across all internal estate roadways.' },
        { name: '24/7 Security', note: 'Continuous round-the-clock on-ground security personnel safeguarding the estate.' },
        { name: 'CCTV Surveillance', note: 'Round-the-clock perimeter and internal lane security camera surveillance.' }
      ]
    },
    plantations: [
      {
        id: 'plantation-trees',
        name: 'Plantation Trees',
        botanical: '25+ Trees per Plot',
        category: 'Agronomic Green Canopy',
        description:
          'Each farm plot is cultivated with 25+ established plantation trees, nurturing long-term soil vitality and creating a lush green environment.',
        image: {
          src: null,
          alt: '25+ plantation trees at Coconut Garden in Bidadi',
          caption: '25+ Plantation Trees'
        }
      }
    ],
    enquiryInterest: 'Coconut Garden'
  },
  {
    id: 'demo-concept-01',
    slug: 'managed-farmland-concept-i',
    name: 'Managed Farmland — Concept I',
    number: '02',
    category: 'Managed Farmland',
    shortDescription:
      'A concept exploration of the Earth Heritage managed farmland approach, where land ownership remains with the landowner while agreed farm operations are professionally managed.',
    tagline: 'A concept exploration of the Earth Heritage managed farmland approach.',
    overview:
      'A concept exploration of the Earth Heritage managed farmland approach, where land ownership remains with the landowner while agreed farm operations are professionally managed.\n\nThis initiative illustrates how disciplined agronomic stewardship, clear boundary demarcation, and long-term soil health management provide peace of mind for land stewardship.',
    stewardshipApproach:
      'Earth Heritage coordinates on-ground agricultural manpower, seasonal crop planning, irrigation maintenance, and ongoing farm operations. Landowners retain titled ownership while the farm thrives through active care.',
    location: null,
    status: 'Concept Preview',
    isDemo: true,
    imageIsTemporary: true,
    featured: false,
    coverImage: {
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Managed Farmland — Concept I agricultural landscape'
    },
    heroImage: {
      src: '/images/managed-farmland/intro-farmland.jpg',
      alt: 'Managed Farmland — Concept I agricultural landscape'
    },
    images: [
      {
        src: '/images/managed-farmland/intro-farmland.jpg',
        alt: 'Managed Farmland — Concept I agricultural landscape'
      }
    ],
    features: [
      'Titled Land Ownership Retention',
      'Structured Farm Operations Coordination',
      'Soil Enrichment & Water Conservation',
      'Regular Agricultural Updates'
    ],
    enquiryInterest: 'Managed Farmland — Concept I'
  },
  {
    id: 'demo-concept-02',
    slug: 'managed-farmland-concept-ii',
    name: 'Managed Farmland — Concept II',
    number: '02',
    category: 'Farm Management',
    shortDescription:
      'A concept project illustrating how land ownership and ongoing farm care can come together through coordinated farm management, cultivation, maintenance, and harvest activities.',
    tagline: 'Coordinated farm management, cultivation, maintenance, and harvest care.',
    overview:
      'A concept project illustrating how land ownership and ongoing farm care can come together through coordinated farm management, cultivation, maintenance, and harvest activities.\n\nDemonstrating hands-on operational systems designed for sustainable agroforestry and responsible land stewardship.',
    stewardshipApproach:
      'Focused on comprehensive farm management workflows: skilled manpower allocation, precision pruning, organic soil nourishment, and coordinated harvest handling.',
    location: null,
    status: 'Concept Preview',
    isDemo: true,
    imageIsTemporary: true,
    featured: false,
    coverImage: {
      src: '/images/farm-management/responsible-care.jpg',
      alt: 'Managed Farmland — Concept II farm care landscape'
    },
    heroImage: {
      src: '/images/farm-management/responsible-care.jpg',
      alt: 'Managed Farmland — Concept II farm care landscape'
    },
    images: [
      {
        src: '/images/farm-management/responsible-care.jpg',
        alt: 'Managed Farmland — Concept II farm care landscape'
      }
    ],
    features: [
      'Comprehensive Cultivation Planning',
      'Daily On-Ground Operational Care',
      'Eco-Friendly Farm Maintenance',
      'Harvest Coordination & Logistics'
    ],
    enquiryInterest: 'Managed Farmland — Concept II'
  },
  {
    id: 'demo-concept-03',
    slug: 'land-and-legacy-concept-iii',
    name: 'Land & Legacy — Concept III',
    number: '03',
    category: 'Land & Legacy',
    shortDescription:
      'A conceptual expression of the Earth Heritage philosophy of bringing together land, nature, ownership, ongoing care, and a long-term sense of purpose.',
    tagline: 'Bringing together land, nature, ownership, and enduring purpose.',
    overview:
      'A conceptual expression of the Earth Heritage philosophy of bringing together land, nature, ownership, ongoing care, and a long-term sense of purpose.\n\nEnvisioned as an enduring ecological sanctuary where native canopy preservation harmonizes with mindful agrarian practices.',
    stewardshipApproach:
      'Guided by the philosophy of "Back to Roots, Forward with Purpose." Prioritizing biodiversity enhancement, water catchment protection, and legacy-oriented tree care.',
    location: null,
    status: 'Concept Preview',
    isDemo: true,
    imageIsTemporary: true,
    featured: false,
    coverImage: {
      src: '/images/managed-farmland/nature-responsibility.jpg',
      alt: 'Land & Legacy — Concept III agroforestry landscape'
    },
    heroImage: {
      src: '/images/managed-farmland/nature-responsibility.jpg',
      alt: 'Land & Legacy — Concept III agroforestry landscape'
    },
    images: [
      {
        src: '/images/managed-farmland/nature-responsibility.jpg',
        alt: 'Land & Legacy — Concept III agroforestry landscape'
      }
    ],
    features: [
      'Native Canopy Preservation',
      'Ecological Habitat Harmony',
      'Generational Land Legacy',
      'Transparent Operational Governance'
    ],
    enquiryInterest: 'Land & Legacy — Concept III'
  }
];

/**
 * Retrieve all confirmed projects
 * @returns {Array} Array of project objects
 */
export function getAllProjects() {
  return projects;
}

/**
 * Find a project by its URL slug
 * @param {string} slug 
 * @returns {Object|undefined} Matching project or undefined
 */
export function getProjectBySlug(slug) {
  if (!slug) return undefined;
  return projects.find((project) => project.slug === slug);
}

/**
 * Retrieve adjacent (previous and next) confirmed projects for navigation
 * @param {string} slug 
 * @returns {{ prev: Object|null, next: Object|null }}
 */
export function getAdjacentProjects(slug) {
  if (!slug || projects.length <= 1) return { prev: null, next: null };
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) return { prev: null, next: null };
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;
  return { prev, next };
}

/**
 * Canonical Project Status Categories Enum
 * 1. New
 * 2. Upcoming
 * 3. Ongoing
 * 4. Completed
 */
export const PROJECT_STATUS_CATEGORIES = [
  {
    key: 'new',
    label: 'New',
    description: 'Newly introduced farmland development',
    emptyMessage: 'No new projects listed at this time.'
  },
  {
    key: 'upcoming',
    label: 'Upcoming',
    description: 'In planning and preparation',
    emptyMessage: 'No upcoming projects announced yet.'
  },
  {
    key: 'ongoing',
    label: 'Ongoing',
    description: 'Active development and stewardship',
    emptyMessage: 'No ongoing projects currently listed.'
  },
  {
    key: 'completed',
    label: 'Completed',
    description: 'Fully developed and handed over',
    emptyMessage: 'No completed projects currently listed.'
  }
];

/**
 * Retrieve non-demo projects dynamically grouped by status enum
 * @param {string} statusKey - 'new' | 'upcoming' | 'ongoing' | 'completed'
 * @returns {Array} Projects matching the status
 */
export function getProjectsByStatus(statusKey) {
  if (!statusKey) return [];
  const normalizedKey = String(statusKey).trim().toLowerCase();
  return projects.filter(
    (project) =>
      !project.isDemo &&
      String(project.status || '').trim().toLowerCase() === normalizedKey
  );
}

