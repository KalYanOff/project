/**
 * SECTION HEADER COMPONENT
 * =======================
 * 
 * Standardized header for main page sections with overline, title, and subtitle.
 */

import React from 'react';
import { CONTAINER } from '../../config/constants';

/**
 * Section header with consistent styling
 * 
 * @param {string} id - HTML id for the header
 * @param {string} overline - Small text above title  
 * @param {string} title - Main heading text
 * @param {string} subtitle - Descriptive text below title
 * @param {string} titleClass - Additional classes for title
 * @param {string} subtitleClass - Additional classes for subtitle
 */
export function SectionHeader({ 
  id, 
  overline, 
  title, 
  subtitle, 
  titleClass = "", 
  subtitleClass = "" 
}) {
  return (
    <header id={id} className={`${CONTAINER} pt-8 pb-4 text-center`}>
      {overline && (
        <p className="uppercase tracking-widest text-xs text-gray-500 mb-2">
          {overline}
        </p>
      )}
      <h2 className={`text-2xl sm:text-3xl 2xl:text-4xl font-semibold ${titleClass}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-2 ${subtitleClass}`}>
          {subtitle}
        </p>
      )}
    </header>
  );
}