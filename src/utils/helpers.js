/**
 * UTILITY FUNCTIONS
 * ================
 * 
 * Common helper functions used throughout the application.
 */

/**
 * Checks if a string is a URL (starts with http/https or is a relative path)
 */
export const isURL = (s) => typeof s === "string" && /^(https?:|\/)/.test(s);

/**
 * Generates a placeholder SVG data URI for images
 * Useful for development and when actual images are not yet available
 * 
 * @param {number} w - Width of placeholder
 * @param {number} h - Height of placeholder  
 * @param {string} label - Text to display in placeholder
 * @returns {string} Data URI for SVG placeholder
 */
export function placeholderDataURI(w = 800, h = 600, label = "Фото") {
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>` +
    `<rect width='100%' height='100%' fill='%23e5e7eb'/>` +
    `<text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='24' fill='%239ca3af' font-family='Roboto, system-ui, -apple-system, Segoe UI, Helvetica, Arial'>${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/**
 * Clamps a number between min and max values
 */
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

/**
 * Debounce function to limit how often a function can be called
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}