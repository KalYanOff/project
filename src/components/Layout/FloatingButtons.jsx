/**
 * FLOATING BUTTONS COMPONENT
 * =========================
 * 
 * Floating action buttons for WhatsApp and scroll-to-top functionality.
 */

import React from 'react';
import { WHATSAPP_URL } from '../../config/constants';

/**
 * Floating buttons for quick access to key actions
 * 
 * @param {boolean} showScrollToTop - Whether to show the scroll-to-top button
 */
export function FloatingButtons({ showScrollToTop = false }) {

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating WhatsApp button */}
      <a 
        href={WHATSAPP_URL} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label="WhatsApp — Спросить или забронировать" 
        className="fixed bottom-5 right-5 z-50 flex items-center gap-3"
      >
        {/* Desktop tooltip */}
        <div className="hidden sm:block select-none pointer-events-none">
          <div className="whitespace-nowrap px-3 py-1.5 rounded-2xl bg-white border text-sm shadow-sm leading-none">
            Спросить или забронировать
          </div>
        </div>

        {/* WhatsApp icon button */}
        <div className="wa-fab w-14 h-14 rounded-full bg-emerald-600 text-white grid place-items-center shadow-lg btn-pulse-strong">
          <svg 
            viewBox="0 0 24 24" 
            className="w-8 h-8" 
            aria-hidden="true" 
            preserveAspectRatio="xMidYMid meet"
          >
            <path 
              fill="currentColor" 
              d="M20.52 3.51A11.78 11.78 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.11 1.59 5.87L0 24l6.26-1.64A11.9 11.9 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.28-6.22-3.48-8.49zM12 22c-1.86 0-3.63-.49-5.2-1.42l-.37-.22-3.7.97.99-3.62-.24-.37A9.93 9.93 0 1 1 12 22zm5.47-7.24c-.3-.15-1.76-.87-2.04-.97-.28-.1-.49-.15-.69.16-.2.29-.79.97-.97 1.17-.18.2-.36.22-.65.08-.29-.15-1.23-.45-2.35-1.49-.86-.76-1.44-1.7-1.61-2s0-.44.14-.57c.14-.14.29-.36.43-.54.14-.18.18-.31.27-.51.09-.2.04-.38-.03-.54-.07-.15-.69-1.67-.94-2.3-.24-.59-.49-.51-.69-.52l-.59-.01c-.2 0-.54.08-.82.38-.28.3-1.08 1.06-1.08 2.59s1.11 3 1.27 3.21c.16.2 2.19 3.33 5.33 4.66.74.32 1.33.51 1.77.65.74.24 1.4.2 1.92.12.59-.09 1.81-.73 2.06-1.45.25-.72.25-1.34.17-1.45-.08-.11-.27-.18-.57-.33z"
            />
          </svg>
        </div>
      </a>

      {/* Scroll to top button */}
      {showScrollToTop && (
        <button 
          onClick={scrollToTop}
          aria-label="Вверх" 
          className="fixed bottom-5 right-20 z-50 w-12 h-12 rounded-full bg-[#0023eb] text-white shadow-lg hover:opacity-90"
        >
          ↑
        </button>
      )}
    </>
  );
}