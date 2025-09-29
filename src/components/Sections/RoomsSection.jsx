/**
 * ROOMS SECTION COMPONENT
 * ======================
 * 
 * Displays room categories with filtering and grid layout.
 */

import React from 'react';
import { CONTAINER } from '../../config/constants';
import { RoomCard } from '../Rooms/RoomCard';
import { getRoomsByCategory } from '../../data/rooms';

/**
 * Rooms section with category navigation and room grid
 * 
 * @param {function} onOpenStandalone - Handler for opening fullscreen room view
 */
export function RoomsSection({ onOpenStandalone }) {
  const standardRooms = getRoomsByCategory('standard');
  const economyRooms = getRoomsByCategory('economy');

  return (
    <section id="rooms" className="bg-white">
      
      {/* Category navigation */}
      <div className={`${CONTAINER} pt-8 pb-8`}>
        <div className="flex gap-2 justify-center">
          <a 
            href="#rooms-standart" 
            className="btn inline-flex items-center justify-center text-center rounded-2xl px-4 py-2 text-white bg-[#0023eb] shadow-sm transition hover:opacity-90 hover:-translate-y-[1px] active:translate-y-[1px] no-pulse"
          >
            Стандарт
          </a>
          <a 
            href="#rooms-econom" 
            className="btn inline-flex items-center justify-center text-center rounded-2xl px-4 py-2 bg-white text-[#0023eb] border border-[#0023eb] hover:opacity-90 no-pulse"
          >
            Эконом
          </a>
        </div>
      </div>

      <div className={`${CONTAINER} pb-12`}>
        
        {/* Standard rooms section */}
        <h3 id="rooms-standart" className="text-2xl sm:text-3xl 2xl:text-4xl font-semibold text-center mb-4 text-[#0073ff]">
          Стандарт
        </h3>
        <p className="text-[#7a7a7a] text-center max-w-3xl mx-auto mb-6">
          Уютные комнаты с современными удобствами — идеальный выбор для комфортного отдыха у моря.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {standardRooms.map((room) => (
            <RoomCard 
              key={room.slug} 
              {...room} 
              onOpenStandalone={onOpenStandalone} 
            />
          ))}
        </div>
        
        <p className="text-xs text-[#7a7a7a] text-center mt-3">
          Все наши комнаты оформлены в индивидуальном дизайне для вашего комфорта. 
          При бронировании выбранный интерьер не гарантируется, но мы всегда стараемся учитывать ваши пожелания!
        </p>

        {/* Economy rooms section */}
        <h3 id="rooms-econom" className="text-2xl sm:text-3xl 2xl:text-4xl font-semibold text-center mt-10 mb-4 text-[#0073ff]">
          Эконом
        </h3>
        <p className="text-[#7a7a7a] text-center max-w-3xl mx-auto mb-6">
          Практичные уютные комнаты для 2–4 человек. Комфортный отдых по доступной цене!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {economyRooms.map((room) => (
            <RoomCard 
              key={room.slug} 
              {...room} 
              onOpenStandalone={onOpenStandalone} 
            />
          ))}
        </div>
        
        <p className="text-xs text-[#7a7a7a] text-center mt-3">
          Все наши комнаты оформлены в индивидуальном дизайне для вашего комфорта. 
          При бронировании выбранный интерьер не гарантируется, но мы всегда стараемся учитывать ваши пожелания!
        </p>
      </div>
      
      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  );
}