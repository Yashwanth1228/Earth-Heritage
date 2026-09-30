import { constructMetadata } from '@/lib/seo';
import GalleryClientView from '@/components/sections/gallery/GalleryClientView';

export const metadata = {
  ...constructMetadata({
    title: 'Gallery',
    description:
      'Explore the visual exhibition of Earth Heritage — land, nature, cultivation, farm care, and quiet moments of connection across managed agricultural landscapes.',
    canonicalUrl: '/gallery'
  }),
  title: 'Gallery | Earth Heritage'
};

/**
 * Dedicated Gallery Exhibition Page (/gallery)
 * 
 * Sequential Architecture:
 * 1. GalleryIntro — Section 1: Editorial Introduction (Eyebrow, Display Heading, Description)
 * 2. GalleryExhibition — Section 2: Interactive Photographic Exhibition Grid with Equal-Size Cards & Category Filtering
 * 3. GalleryPhilosophy — Section 3: Brand Philosophy Panorama ("BACK TO ROOTS. FORWARD WITH PURPOSE.")
 * 4. GalleryLightbox — Fullscreen Accessible Photographic Lightbox with Keyboard Controls & Scroll Lock
 */
export default function GalleryPage() {
  return <GalleryClientView />;
}
