/**
 * GALLERY COMPONENT
 * ================
 * 
 * Photo gallery with expandable grid and fullscreen viewer.
 */

import React, { useState, useEffect } from 'react';
import { CONTAINER } from '../../config/constants';
import { SectionHeader } from '../UI/SectionHeader';
import { LazyImage } from '../UI/LazyImage';
import { Button } from '../UI/Button';
import { galleryImages } from '../../data/gallery';
import { isURL } from '../../utils/helpers';
import { debounce } from '../../utils/helpers';

/**
 * Hook to determine responsive grid columns based on screen size
 */
function useResponsiveColumns() {
  const [columns, setColumns] = useState(2);

  useEffect(() => {
    const calculateColumns = () => {
      const isXL = window.matchMedia('(min-width: 1280px)').matches;
      const isMD = window.matchMedia('(min-width: 768px)').matches;
      const isSM = window.matchMedia('(min-width: 640px)').matches;
      
      if (isXL) setColumns(6);
      else if (isMD) setColumns(4);
      else if (isSM) setColumns(3);
      else setColumns(2);
    };

    // Calculate initial columns
    calculateColumns();

    // Debounced resize handler to avoid excessive recalculation
    const debouncedCalculate = debounce(calculateColumns, 150);
    
    window.addEventListener('resize', debouncedCalculate, { passive: true });
    
    return () => window.removeEventListener('resize', debouncedCalculate);
  }, []);

  return columns;
}

/**
 * Main gallery component with expandable grid
 * 
 * @param {function} onOpenFullscreen - Handler for opening fullscreen gallery viewer
 */
export function Gallery({ onOpenFullscreen }) {
  const responsiveColumns = useResponsiveColumns();
  const [isExpanded, setIsExpanded] = useState(false);

  // Show limited images initially, all when expanded
  const visibleImages = isExpanded 
    ? galleryImages 
    : galleryImages.slice(0, responsiveColumns);

  return (
    <section id="gallery" className="bg-gray-50/50">
      <SectionHeader 
        title="Фото" 
        subtitle="Нажмите на фото, чтобы открыть в полноэкранном режиме." 
        titleClass="text-[#0073ff]" 
        subtitleClass="text-[#7a7a7a] text-xs" 
      />

      {/* Image grid */}
      <div className={`${CONTAINER} pb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4`}>
        {visibleImages.map((item, index) => {
          // Handle both string and object image formats
          const isStringItem = typeof item === "string";
          const imageSrc = isStringItem
            ? (isURL(item) ? item : undefined)
            : (item?.src || undefined);
          const imageLabel = isStringItem
            ? (isURL(item) ? `Фото ${index + 1}` : String(item))
            : (item?.alt || `Фото ${index + 1}`);

          return (
            <LazyImage
              key={index}
              src={imageSrc}
              label={imageLabel}
              alt={imageLabel}
              ratio="aspect-square"
              width={1200}
              height={1200}
              onClick={() => onOpenFullscreen?.(index)}
            />
          );
        })}
      </div>

      {/* Expand/collapse toggle */}
      <div className={`${CONTAINER} pb-10 flex justify-center`}>
        {!isExpanded ? (
          <Button 
            onClick={() => setIsExpanded(true)}
            noPulse
          >
            Показать ещё
          </Button>
        ) : (
          <Button 
            onClick={() => setIsExpanded(false)}
            noPulse
          >
            Показать меньше
          </Button>
        )}
      </div>
      
      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  );
}