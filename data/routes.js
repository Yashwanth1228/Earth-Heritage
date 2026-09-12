/**
 * Website Routes Architecture
 * 
 * Central routing configuration reflecting planned website architecture.
 * Used for navigation, sitemaps, footers, and internal linking.
 */

export const siteRoutes = {
  main: [
    {
      title: 'Home',
      path: '/',
      description: 'Main corporate landing experience'
    },
    {
      title: 'About',
      path: '/about',
      description: 'Company story, vision, mission, and philosophy'
    },
    {
      title: 'Managed Farmland',
      path: '/managed-farmland',
      description: 'Managed farmland ownership and long-term stewardship'
    },
    {
      title: 'Farm Management',
      path: '/farm-management',
      description: 'Professional farm management and operational services'
    },
    {
      title: 'How It Works',
      path: '/how-it-works',
      description: 'The ownership and professional management process'
    },
    {
      title: 'Projects',
      path: '/projects',
      description: 'Earth Heritage properties and managed land initiatives'
    },
    {
      title: 'Sustainability',
      path: '/sustainability',
      description: 'Responsible land practices and ecological maintenance'
    },
    {
      title: 'Insights',
      path: '/insights',
      description: 'Perspectives and educational resources on land stewardship'
    },
    {
      title: 'Contact',
      path: '/contact',
      description: 'Inquire and connect with Earth Heritage'
    }
  ],
  legal: [
    {
      title: 'Privacy Policy',
      path: '/privacy-policy'
    },
    {
      title: 'Terms & Conditions',
      path: '/terms-and-conditions'
    },
    {
      title: 'Disclaimer',
      path: '/disclaimer'
    }
  ]
};

export const headerNavRoutes = [
  { title: 'About', path: '/about' },
  { title: 'Managed Farmland', path: '/managed-farmland' },
  { title: 'Farm Management', path: '/farm-management' },
  { title: 'How It Works', path: '/how-it-works' },
  { title: 'Projects', path: '/projects' },
  { title: 'Sustainability', path: '/sustainability' },
  { title: 'Insights', path: '/insights' }
];

export const footerNavGroups = [
  {
    title: 'Offerings',
    links: [
      { title: 'Managed Farmland', path: '/managed-farmland' },
      { title: 'Farm Management', path: '/farm-management' },
      { title: 'How It Works', path: '/how-it-works' },
      { title: 'Projects', path: '/projects' }
    ]
  },
  {
    title: 'Company',
    links: [
      { title: 'About Earth Heritage', path: '/about' },
      { title: 'Sustainability', path: '/sustainability' },
      { title: 'Insights', path: '/insights' },
      { title: 'Contact', path: '/contact' }
    ]
  },
  {
    title: 'Legal & Compliance',
    links: [
      { title: 'Privacy Policy', path: '/privacy-policy' },
      { title: 'Terms & Conditions', path: '/terms-and-conditions' },
      { title: 'Disclaimer', path: '/disclaimer' }
    ]
  }
];
