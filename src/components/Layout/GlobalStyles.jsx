/**
 * GLOBAL STYLES COMPONENT
 * ======================
 * 
 * Global CSS styles and font imports for the entire application.
 */

import React from 'react';

/**
 * Global styles including fonts and animations
 */
export function GlobalStyles() {
  return (
    <style>{`
      /* Font imports */
      @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Slab:wght@500;600;700&display=swap');
      
      /* Base font families */
      html, body { 
        font-family: 'Roboto', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; 
      }
      
      /* Heading and button fonts */
      h1, h2, h3, h4, h5, h6, .btn { 
        font-family: 'Roboto Slab', 'Roboto', system-ui, -apple-system, Segoe UI, Helvetica, Arial; 
        font-weight: 600; 
      }
      
      /* Button pulse animation */
      @keyframes btnPulse { 
        0%, 100% { 
          transform: scale(1); 
          box-shadow: 0 0 0 rgba(0,35,235,0); 
        } 
        50% { 
          transform: scale(1.045); 
          box-shadow: 0 8px 24px rgba(0,35,235,0.28); 
        } 
      }
      
      /* Animation classes */
      .btn-pulse-strong { 
        animation: btnPulse 1.8s ease-in-out infinite; 
      }
      
      .no-pulse { 
        animation: none !important; 
      }
      
      /* Remove shadows from "Why Choose Us" section */
      #why [class*="shadow"], 
      #why .shadow, 
      #why .shadow-sm, 
      #why .shadow-md, 
      #why .shadow-lg { 
        box-shadow: none !important; 
      }
      
      /* WhatsApp floating button styles */
      .wa-fab { 
        line-height: 0; 
      }
      
      .wa-fab svg { 
        display: block; 
        overflow: visible; 
      }
    `}</style>
  );
}