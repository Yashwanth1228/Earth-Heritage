'use client';

import { useState, useCallback } from 'react';
import GalleryIntro from './GalleryIntro';
import GalleryExhibition from './GalleryExhibition';
import GalleryLightbox from './GalleryLightbox';
import { galleryImages } from '@/data/galleryImages';

/**
 * Gallery Client Controller & View
 * 
 * Orchestrates:
 * - Editorial intro without deprecated descriptions
 * - Interactive exhibition grid categorized by project (shows project cover images first, clicking opens that project's gallery)
 * - Fullscreen accessible lightbox with keyboard controls and Lenis scroll-locking
 */
export default function GalleryClientView() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentList, setCurrentList] = useState(galleryImages);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSelectImage = useCallback((image, list = galleryImages) => {
    const listToUse = list && list.length > 0 ? list : galleryImages;
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
    <div className="w-full bg-[#FAF6F0] selection:bg-[#1E460B] selection:text-white">
      {/* 1. Page Editorial Introduction */}
      <GalleryIntro />

      {/* 2. Interactive Photographic Exhibition Grid with Project Categorization */}
      <GalleryExhibition
        selectedProjectId={selectedProjectId}
        onSelectProject={setSelectedProjectId}
        onSelectImage={handleSelectImage}
      />

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
