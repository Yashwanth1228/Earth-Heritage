'use client';

import { useState, useCallback } from 'react';
import GalleryIntro from './GalleryIntro';
import GalleryFeatureImage from './GalleryFeatureImage';
import GalleryExhibition from './GalleryExhibition';
import GalleryPhilosophy from './GalleryPhilosophy';
import GalleryLightbox from './GalleryLightbox';
import { galleryImages } from '@/data/galleryImages';

/**
 * Gallery Client Controller & View
 * 
 * Orchestrates:
 * - Feature opening photograph
 * - Interactive exhibition grid with category filtering and equal-sized cards
 * - Fullscreen accessible lightbox with keyboard controls and Lenis scroll-locking
 * - Brand philosophy statement
 */
export default function GalleryClientView() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentList, setCurrentList] = useState(galleryImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelectImage = useCallback((image, list = galleryImages) => {
    const listToUse = list.length > 0 ? list : galleryImages;
    const foundIndex = listToUse.findIndex((item) => item.id === image.id);
    const indexToSet = foundIndex >= 0 ? foundIndex : 0;

    setCurrentList(listToUse);
    setCurrentIndex(indexToSet);
    setIsLightboxOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % currentList.length);
  }, [currentList.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
  }, [currentList.length]);

  return (
    <div className="w-full bg-[#F0E0C6] selection:bg-[#1E460B] selection:text-white">
      {/* 1. Page Editorial Introduction */}
      <GalleryIntro />

      {/* 2. Opening Feature Photograph */}
      <GalleryFeatureImage
        onSelectImage={(feature) => handleSelectImage(feature, [feature])}
      />

      {/* 3. Interactive Photographic Exhibition Grid */}
      <GalleryExhibition
        onSelectImage={(item, filteredList) => handleSelectImage(item, filteredList)}
      />

      {/* 4. Brand Philosophy Panorama */}
      <GalleryPhilosophy />

      {/* Accessible Fullscreen Lightbox Modal */}
      <GalleryLightbox
        isOpen={isLightboxOpen}
        images={currentList}
        currentIndex={currentIndex}
        onClose={handleClose}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
