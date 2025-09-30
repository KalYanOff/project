/**
 * WHY CHOOSE US COMPONENT
 * ======================
 * 
 * Expandable section showing guesthouse features and benefits.
 */

import React, { useState } from 'react';
import { CONTAINER } from '../../config/constants';
import { IconImage } from '../UI/LazyImage';
import { features } from '../../data/features';

/**
 * Expandable "Why Choose Us" section
 * 
 * @param {boolean} embedded - Whether this is embedded in another section
 */
export function WhyChooseUs({ embedded = false }) {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle expansion state
  const toggleOpen = () => setIsOpen(!isOpen);

  // Wrapper component varies based on embedding
  const Wrapper = ({ children }) => {
    if (embedded) {
      return (
        <div id="why" className="bg-white mt-4">
          {children}
        </div>
      );
    }
    
    return (
      <section id="why" className="bg-white">
        <div className={`${CONTAINER} pt-8`}>
          {children}
        </div>
      </section>
    );
  };

  return (
    <Wrapper>
      {/* Toggle button */}
      <button 
        type="button" 
        className="w-full flex items-center justify-center rounded-2xl border bg-white px-4 py-4 mt-6 mb-4 relative" 
        onClick={toggleOpen} 
        aria-expanded={isOpen} 
        aria-controls="why-panel"
      >
        <span className="text-center text-xl sm:text-2xl font-semibold">
          Почему Вы должны выбрать именно нас?
        </span>
        <span className="absolute right-4 text-gray-500 hidden sm:block">
          {isOpen ? "–" : "+"}
        </span>
      </button>

      {/* Expandable content */}
      <div id="why-panel" hidden={!isOpen} className="pt-4 pb-6">
        <div className={`${embedded ? '' : CONTAINER} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}>
          {features.map((feature, index) => (
            <div key={index} className="rounded-2xl border p-4 bg-white h-full">
              <div className="flex items-center gap-3">
                <IconImage src={feature.icon} alt={feature.title} />
                <div>
                  <h3 className="font-semibold text-left">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mt-1 text-left">{feature.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Wrapper>
  );
}