/**
 * ROOM CARD COMPONENT
 * ==================
 * 
 * Individual room display card with image carousel, pricing, and features.
 */

import React, { useState } from 'react';
import { LazyImage } from '../UI/LazyImage';
import { Button } from '../UI/Button';
import { Tag } from '../UI/Tag';
import { WHATSAPP_URL } from '../../config/constants';
import { isURL } from '../../utils/helpers';

/**
 * Room card with image carousel and booking functionality
 * 
 * @param {string} title - Room title
 * @param {string} subtitle - Room description
 * @param {string} price - Current price
 * @param {string} oldPrice - Previous/crossed-out price
 * @param {Array} features - Array of room features
 * @param {Array} images - Array of room images
 * @param {string} slug - Unique room identifier
 * @param {function} onOpenStandalone - Handler for opening fullscreen view
 */
export function RoomCard({ 
  title, 
  subtitle, 
  price, 
  oldPrice, 
  features = [], 
  images = [], 
  slug, 
  onOpenStandalone 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Navigation functions for image carousel
  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  // Check if we have multiple images for carousel controls
  const hasMultipleImages = images.length > 1;

  // Get current image data
  const currentImage = images[currentImageIndex];
  const currentImageSrc = typeof currentImage === 'string' 
    ? (isURL(currentImage) ? currentImage : null) 
    : (currentImage?.src || null);
  const currentImageAlt = typeof currentImage === 'string' 
    ? (isURL(currentImage) ? title : currentImage) 
    : (currentImage?.alt || title);

  return (
    <div id={slug} className="rounded-2xl border bg-white shadow-sm overflow-hidden relative">
      {/* Anchor link for direct room navigation */}
      <a 
        href={`#${slug}`} 
        className="absolute z-30 top-3 right-3 text-gray-400 hover:text-[#0023eb] pointer-events-auto" 
        aria-label="Ссылка на эту комнату"
      >
        🔗
      </a>

      <div className="p-4">
        {/* Image carousel */}
        <div className="relative">
          <LazyImage 
            src={currentImageSrc} 
            alt={currentImageAlt} 
            label={title}
            ratio="aspect-[4/3]" 
            onClick={() => onOpenStandalone?.(slug, currentImageIndex)} 
          />

          {/* Carousel navigation arrows */}
          {hasMultipleImages && (
            <>
              <button 
                aria-label="Предыдущее фото" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  previousImage(); 
                }} 
                className="absolute left-2 top-1/2 -translate-y-1/2 px-2 py-1.5 rounded-2xl bg-[#0023eb] text-white hover:opacity-90"
              >
                ‹
              </button>
              <button 
                aria-label="Следующее фото" 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  nextImage(); 
                }} 
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1.5 rounded-2xl bg-[#0023eb] text-white hover:opacity-90"
              >
                ›
              </button>

              {/* Image indicators */}
              <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5 z-20">
                {images.map((_, index) => (
                  <button 
                    key={index} 
                    aria-label={`К изображению ${index + 1}`} 
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      setCurrentImageIndex(index); 
                    }} 
                    className={`w-2.5 h-2.5 rounded-full ${
                      index === currentImageIndex ? 'bg-[#0023eb]' : 'bg-gray-300'
                    } ring-1 ring-white/70`} 
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Room information */}
        <div className="mt-4">
          {/* Title and description */}
          <h3 className="text-lg 2xl:text-xl font-semibold text-center">
            {title}
          </h3>
          <p className="text-center text-gray-600 mt-1">
            {subtitle}
          </p>

          {/* Pricing */}
          <div className="mt-2 flex items-baseline justify-center gap-2">
            <div className="text-xl 2xl:text-2xl font-semibold">
              От {price}
            </div>
            {oldPrice && (
              <div className="text-gray-400 line-through text-sm">
                От {oldPrice}
              </div>
            )}
          </div>

          {/* Features tags */}
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {features.map((feature, index) => (
              <Tag key={index}>{feature}</Tag>
            ))}
          </div>

          {/* Booking button */}
          <div className="mt-4 flex flex-wrap gap-3 justify-center">
            <Button 
              href={WHATSAPP_URL} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              ЗАБРОНИРОВАТЬ!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}