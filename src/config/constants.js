/**
 * WEBSITE CONFIGURATION
 * =====================
 * 
 * This file contains all the main configuration settings for the website.
 * Update these values to customize the site for your guesthouse.
 */

// ====== CONTACT INFORMATION ======
export const PHONE_TEL = "+79181929931";
export const WHATSAPP_URL = "https://wa.me/79181929931?text=Здравствуйте!%20Мы%20нашли%20вас%20на%20сайте%20delfinstay.ru!";
export const MAPS_URL = "https://yandex.ru/maps/-/CCURU2uFHA";

// ====== LOGO CONFIGURATION ======
/**
 * LOGO SETUP INSTRUCTIONS:
 * 1. Place your logo file in the /public/img/ folder
 * 2. Update LOGO_SRC below with the correct path
 * 3. Recommended logo size: 220x220 pixels
 * 4. Supported formats: PNG, JPG, SVG
 */
export const LOGO_SRC = "/img/logo.png"; // UPDATE THIS PATH TO YOUR LOGO

// ====== LAYOUT CONSTANTS ======
export const CONTAINER = "max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8";

// ====== COLOR SCHEME ======
export const COLORS = {
  primary: '#0023eb',      // Main blue color
  primaryLight: '#0073ff', // Lighter blue for headings
  secondary: '#7a7a7a',    // Gray text color
  whatsapp: '#059669',     // WhatsApp green
  success: '#10b981',      // Success green
  warning: '#f59e0b',      // Warning amber
  error: '#ef4444'         // Error red
};

// ====== RESPONSIVE BREAKPOINTS ======
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px', 
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};