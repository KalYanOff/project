/**
 * NAVIGATION COMPONENT
 * ===================
 * 
 * Main site navigation with logo, booking button, and mobile menu.
 */

import React, { useState } from 'react';
import { CONTAINER, LOGO_SRC, WHATSAPP_URL } from '../../config/constants';
import { Button } from '../UI/Button';
import { placeholderDataURI } from '../../utils/helpers';

/**
 * Main navigation header
 */
export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation link styling
  const linkClassName = "no-underline hover:text-[#0023eb] transition-colors";

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Close mobile menu when link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="z-50 bg-white border-b" role="navigation" aria-label="Главная навигация">
      {/* Main navigation bar */}
      <div className={`${CONTAINER} h-[116px] grid grid-cols-3 items-center`}>
        
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 no-underline">
          <img 
            src={LOGO_SRC || placeholderDataURI(220, 220, 'Логотип')} 
            alt="Логотип" 
            className="w-[100px] h-[100px] aspect-square object-contain rounded-xl p-1 shrink-0"
          />
        </a>

        {/* Center booking button */}
        <div className="flex justify-center">
          <Button 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-pulse-strong"
          >
            ЗАБРОНИРОВАТЬ
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex justify-end">
          <button 
            onClick={toggleMenu} 
            aria-label="Открыть меню" 
            className="w-10 h-10 relative inline-flex items-center justify-center rounded-2xl border hover:bg-gray-50"
          >
            <span className="sr-only">Меню</span>
            
            {/* Hamburger icon with animation */}
            <span className={`absolute left-1/2 -translate-x-1/2 block w-6 h-0.5 bg-gray-900 rounded transition-transform duration-200 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
            <span className={`absolute left-1/2 -translate-x-1/2 block w-6 h-0.5 bg-gray-900 rounded transition-all duration-200 ${isMenuOpen ? 'opacity-0' : 'opacity-100 translate-y-0'}`}></span>
            <span className={`absolute left-1/2 -translate-x-1/2 block w-6 h-0.5 bg-gray-900 rounded transition-transform duration-200 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className={`${CONTAINER} pb-4 grid gap-2`}>
          <a href="#why" className={`${linkClassName} py-2`} onClick={closeMenu}>
            ПОЧЕМУ МЫ?
          </a>
          <a href="#rooms" className={`${linkClassName} py-2`} onClick={closeMenu}>
            КОМНАТЫ
          </a>
          <a href="#gallery" className={`${linkClassName} py-2`} onClick={closeMenu}>
            ФОТО
          </a>
          <a href="#faq" className={`${linkClassName} py-2`} onClick={closeMenu}>
            FAQ
          </a>
        </div>
      )}
    </nav>
  );
}