/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: []
  },
  async redirects() {
    return [
      { source: '/managed-farmland', destination: '/#solution', permanent: false },
      { source: '/farm-management', destination: '/#management-sequence', permanent: false },
      { source: '/how-it-works', destination: '/#how-it-works', permanent: false },
      { source: '/projects', destination: '/#solution', permanent: false },
      { source: '/sustainability', destination: '/#principles', permanent: false },
      { source: '/insights', destination: '/#philosophy', permanent: false },
      { source: '/contact', destination: '/#contact-cta', permanent: false }
    ];
  }
};

export default nextConfig;
