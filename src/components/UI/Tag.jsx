/**
 * TAG COMPONENT
 * ============
 * 
 * Small label/badge component for displaying features and categories.
 */

import React from 'react';

/**
 * Small tag/badge for labels and features
 * 
 * @param {React.ReactNode} children - Tag content
 * @param {string} className - Additional CSS classes
 */
export function Tag({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-gray-700 bg-white ${className}`}>
      {children}
    </span>
  );
}