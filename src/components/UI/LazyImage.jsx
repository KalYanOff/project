/**
 * LAZY IMAGE COMPONENT
 * ===================
 * 
 * Image component with lazy loading, placeholder support, and click handling.
 * Automatically generates placeholder when no image is provided.
 */

import React from 'react';
import { placeholderDataURI } from '../../utils/helpers';

/**
 * Lazy-loaded image with placeholder support
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility  
 * @param {string} label - Label for placeholder generation
 * @param {string} ratio - CSS aspect ratio class
 * @param {number} width - Image width for placeholder
 * @param {number} height - Image height for placeholder
 * @param {function} onClick - Click handler
 */
export function LazyImage({ 
  src, 
  alt, 
  label = "Фото", 
  ratio = "aspect-[4/3]", 
  width = 1600, 
  height = 1200, 
  onClick 
}) {
  // Generate placeholder if no source provided
  const placeholderSrc = placeholderDataURI(width, height, label);
  const effectiveSrc = src || placeholderSrc;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full ${ratio} overflow-hidden rounded-xl border border-gray-300 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500`}
      aria-label={alt || label}
    >
      <img
        loading="lazy"
        decoding="async"
        src={effectiveSrc}
        alt={alt || label}
        className="w-full h-full object-cover pointer-events-none"
        width={width}
        height={height}
      />
    </button>
  );
}

/**
 * Simple icon image component
 */
export function IconImage({ src, alt, className = "w-12 h-12 rounded-xl" }) {
  return (
    <img
      src={src}
      alt={alt}
      width={50}
      height={50}
      className={className}
    />
  );
}