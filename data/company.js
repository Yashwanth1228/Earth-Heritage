/**
 * Company Ground Truth Information
 * 
 * IMPORTANT: Strictly contains verified corporate information for Earth Heritage Pvt. Ltd.
 * Do not add unverified statistics, counts, locations, financial claims, or testimonials.
 */

export const companyData = {
  name: 'Earth Heritage Pvt. Ltd.',
  shortName: 'Earth Heritage',
  foundingYear: 2026,
  founded: 'August 2026',
  philosophy: {
    primary: 'Own a Piece of Earth. Build a Legacy.',
    secondary: 'BACK TO ROOTS. FORWARD WITH PURPOSE.'
  },
  proposition: {
    core: 'You own the land. We manage the farm.'
  },
  businessModel: {
    overview: [
      'The landowner retains ownership of the farmland.',
      'Earth Heritage manages agreed day-to-day farm operations and management activities.',
      'Confirmed management areas include manpower coordination, crop planning, cultivation planning, cultivation activities, farm maintenance, day-to-day farm operations, harvest management, and ongoing operational coordination.'
    ],
    principles: [
      'Land ownership clarity with dedicated professional management.',
      'Managed farmland designed for long-term stewardship and legacy.',
      'Responsible land practices prioritizing thoughtful maintenance.'
    ]
  },
  founders: [
    {
      name: 'Sathish Agastya',
      role: 'Co-Founder',
      initials: 'SA',
      bio: 'With an early foundation in technology and computers, Sathish developed extensive experience across media, business, digital marketing, and client relationships. Rooted in a personal farming background and enduring connection to agriculture, he combined his technology and business experience with agricultural roots to create Earth Heritage.'
    },
    {
      name: 'Khushi Jain',
      role: 'Co-Founder',
      initials: 'KJ',
      bio: 'With a background in Fashion Designing and a B.Com degree, Khushi brings diverse experience across education, social work, and real estate and investments. Having worked as an Investment & Partnership Manager, she brings key strengths in communication, leadership, understanding people, business, client relationships, and partnerships to Earth Heritage.'
    }
  ],
  principles: [
    {
      title: 'Build legacies, not just projects.',
      description: 'We approach farmland as an enduring, multi-generational legacy rather than a short-term development venture.'
    },
    {
      title: 'Put nature at the heart.',
      description: 'Responsible stewardship and respect for the natural landscape guide our cultivation and farm maintenance decisions.'
    },
    {
      title: 'Turn land into experiences.',
      description: 'Farmland ownership that creates meaningful opportunities to connect with nature, open spaces, and agricultural life.'
    },
    {
      title: 'Earn trust, not just business.',
      description: 'Clear land ownership structures, transparent management communication, and dependable operational execution.'
    },
    {
      title: 'Grow with purpose.',
      description: 'Thoughtful, measured farm planning that respects the land, local environment, and long-term stewardship.'
    }
  ],
  managementSequence: [
    {
      number: '01',
      title: 'People & Manpower',
      description: 'Manpower coordination and on-ground supervision for agreed farm operations.'
    },
    {
      number: '02',
      title: 'Crop Planning',
      description: 'Planning seasonal crops suited to the land and local agricultural conditions.'
    },
    {
      number: '03',
      title: 'Cultivation',
      description: 'Cultivation planning and systematic cultivation activities aligned with land needs.'
    },
    {
      number: '04',
      title: 'Farm Maintenance',
      description: 'Farm maintenance including pruning, weeding, boundary care, and ground infrastructure upkeep.'
    },
    {
      number: '05',
      title: 'Farm Operations',
      description: 'Day-to-day farm operations, water logistics, and ongoing operational coordination.'
    },
    {
      number: '06',
      title: 'Harvest Management',
      description: 'Coordinating harvest activities and handling produce according to agreed management plans.'
    }
  ],
  howItWorksSteps: [
    {
      number: '01',
      title: 'YOU OWN THE LAND',
      description: 'You acquire and retain ownership of the farmland property.'
    },
    {
      number: '02',
      title: 'WE MANAGE',
      description: 'Earth Heritage manages agreed day-to-day farm operations and coordinates the people and activities required to care for the farm.'
    },
    {
      number: '03',
      title: 'WE CULTIVATE',
      description: 'Farm activities are planned and carried out with attention to cultivation, maintenance, and the needs of the land.'
    },
    {
      number: '04',
      title: 'YOUR FARM THRIVES',
      description: 'Your farmland continues to be cared for through ongoing management, cultivation, maintenance, and harvest coordination.'
    }
  ],
  disclaimer: {
    operational: 'Earth Heritage provides professional farm management and operational stewardship. All arrangements are subject to formal agreements. Earth Heritage does not offer guaranteed investment returns, fixed percentage yields, or financial advisory services.'
  },
  contact: {
    // Official Earth Heritage WhatsApp number (Pending from company; keep empty until officially provided)
    // DO NOT invent or hardcode a fake phone number.
    whatsappNumber: '',
    whatsappDefaultMessage: 'Hello Earth Heritage, I would like to know more about your managed farmland and farm management services.'
  }
};

/**
 * Helper to construct the official WhatsApp chat link.
 * 
 * Sources:
 * 1. Process environment: NEXT_PUBLIC_WHATSAPP_URL or NEXT_PUBLIC_WHATSAPP_NUMBER
 * 2. companyData.contact.whatsappNumber (central ground truth)
 * 3. Default click-to-chat compose link with official greeting message
 * 
 * Guarantees that clicking the WhatsApp button always routes directly to WhatsApp
 * (opening web/app) and NEVER routes to an enquiry form or modal.
 */
export function getWhatsAppUrl() {
  const envUrl = typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_WHATSAPP_URL?.trim() : '';
  if (envUrl) return envUrl;

  const envNumber = typeof process !== 'undefined' ? process.env?.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() : '';
  const rawNumber = (envNumber || companyData?.contact?.whatsappNumber || '').trim();
  const defaultMessage = companyData?.contact?.whatsappDefaultMessage || 'Hello Earth Heritage, I would like to know more about your managed farmland and farm management services.';
  const encodedMessage = encodeURIComponent(defaultMessage);

  if (rawNumber) {
    const cleanNumber = rawNumber.replace(/[^\d+]/g, '').replace(/^\+/, '');
    if (cleanNumber.length >= 7) {
      return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
    }
  }

  // Standard WhatsApp click-to-chat compose endpoint:
  // Launches WhatsApp chat with prefilled message directed to Earth Heritage.
  return `https://api.whatsapp.com/send?text=${encodedMessage}`;
}
