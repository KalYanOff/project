/**
 * FULLSCREEN VIEWER COMPONENT
 * ==========================
 * 
 * Standalone fullscreen image viewer with navigation and thumbnails.
 */

import React, { useState, useEffect } from 'react';
import { CONTAINER, WHATSAPP_URL } from '../../config/constants';
import { Button } from '../UI/Button';
import { placeholderDataURI, isURL, clamp } from '../../utils/helpers';

/**
 * Fullscreen image viewer with keyboard navigation
 * 
 * @param {string} slug - Unique identifier for the viewer context
 * @param {Array} images - Array of images to display
 * @param {number} index - Initial image index
 * @param {string} title - Viewer title
 * @param {function} onExit - Handler for exiting fullscreen mode
 * @param {function} onIndexChange - Handler for index changes
 */
export function FullscreenViewer({ 
  slug, 
  images = [], 
  index = 0, 
  title = "Просмотр", 
  onExit, 
  onIndexChange 
}) {
  const imageCount = Math.max(1, images.length);
  
  // Clamp index to valid range
  const clampIndex = (n) => clamp(n, 0, imageCount - 1);
  
  const [currentIndex, setCurrentIndex] = useState(clampIndex(index));
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Минимальное расстояние свайпа
  const minSwipeDistance = 50;

  // Update index when props change
  useEffect(() => {
    setCurrentIndex(clampIndex(index));
  }, [index, imageCount]);

  // Notify parent of index changes
  useEffect(() => {
    if (typeof onIndexChange === 'function') {
      onIndexChange(currentIndex);
    }
  }, [currentIndex, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onExit?.();
      if (e.key === 'ArrowRight') navigateNext();
      if (e.key === 'ArrowLeft') navigatePrevious();
    };

    window.addEventListener('keydown', handleKeyDown, { passive: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageCount]);

  // Navigation functions
  const navigatePrevious = () => {
    if (imageCount > 1) {
      setCurrentIndex((prev) => (prev - 1 + imageCount) % imageCount);
    }
  };

  const navigateNext = () => {
    if (imageCount > 1) {
      setCurrentIndex((prev) => (prev + 1) % imageCount);
    }
  };

  // Обработчики свайпа
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && imageCount > 1) {
      navigateNext();
    }
    if (isRightSwipe && imageCount > 1) {
      navigatePrevious();
    }
  };

  // Get current image data
  const currentImage = images[currentIndex];
  const currentLabel = typeof currentImage === 'string' && !isURL(currentImage) 
    ? currentImage 
    : `Фото ${currentIndex + 1}`;
  
  const currentSrc = typeof currentImage === 'string' 
    ? (isURL(currentImage) ? currentImage : null) 
    : (currentImage?.src || null);
  
  const currentAlt = typeof currentImage === 'string' 
    ? (isURL(currentImage) ? currentLabel : currentImage) 
    : (currentImage?.alt || currentLabel);

  const placeholderSrc = placeholderDataURI(2560, 1920, currentAlt);

  // Generate thumbnail data
  const thumbnails = images.map((img, idx) => {
    const label = typeof img === 'string' && !isURL(img) 
      ? img 
      : `Фото ${idx + 1}`;
    const src = typeof img === 'string' 
      ? (isURL(img) ? img : placeholderDataURI(320, 240, label)) 
      : (img?.src || placeholderDataURI(320, 240, label));
    
    return { src, alt: label };
  });

  return (
    <div className="min-h-screen w-full bg-black text-white fixed inset-0 z-50 overflow-y-auto">
      
      {/* Header with navigation and booking */}
      <div className={`${CONTAINER} py-3 flex items-center justify-between sticky top-0 bg-black/90 backdrop-blur-sm z-10`}>
        <a 
          href="#rooms" 
          onClick={(e) => { 
            e.preventDefault(); 
            onExit?.(); 
          }} 
          className="no-underline hover:text-gray-300"
        >
          ← Назад
        </a>
        <Button 
          href={WHATSAPP_URL} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          ЗАБРОНИРОВАТЬ!
        </Button>
      </div>

      {/* Main image display */}
      <div className={`${CONTAINER} relative py-4`}>
        <h1 className="sr-only">{title}</h1>
        
        <div 
          className="relative grid place-items-center"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ minHeight: '70vh' }}
        >
          <img 
            loading="lazy"
            decoding="async"
            src={currentSrc || placeholderSrc} 
            alt={currentAlt} 
            className="max-w-full object-contain" 
            style={{ maxHeight: '80vh' }} 
          />

          {/* Navigation arrows */}
          {imageCount > 1 && (
            <>
              <button 
                aria-label="Предыдущее" 
                onClick={navigatePrevious} 
                className="absolute left-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-2xl bg-[#0023eb] text-white hover:opacity-90"
              >
                ‹
              </button>
              <button 
                aria-label="Следующее" 
                onClick={navigateNext} 
                className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-2 rounded-2xl bg-[#0023eb] text-white hover:opacity-90"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Thumbnail navigation */}
        {imageCount > 1 && (
          <div className="mt-4 overflow-x-auto">
            <div className="flex gap-2 min-w-full">
              {thumbnails.map((thumbnail, thumbnailIndex) => (
                <button 
                  key={thumbnailIndex} 
                  onClick={() => setCurrentIndex(thumbnailIndex)} 
                  className={`shrink-0 rounded-xl border ${
                    thumbnailIndex === currentIndex 
                      ? 'ring-2 ring-[#0023eb] border-white' 
                      : 'border-gray-600'
                  } overflow-hidden`} 
                  aria-label={`Перейти к фото ${thumbnailIndex + 1}`}
                >
                  <img 
                    loading="lazy"
                    decoding="async"
                    src={thumbnail.src} 
                    alt={thumbnail.alt} 
                    className="w-24 h-16 object-cover" 
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}