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
      { source: '/sustainability', destination: '/#principles', permanent: false },
      { source: '/insights', destination: '/#philosophy', permanent: false },
      { source: '/contact', destination: '/#contact-cta', permanent: false }
    ];
  }
};

export default nextConfig;
