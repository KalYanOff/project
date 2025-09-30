/**
 * HERO SECTION COMPONENT
 * =====================
 * 
 * Main landing section with title, description, and call-to-action buttons.
 */

import React from 'react';
import { CONTAINER, WHATSAPP_URL, PHONE_TEL, MAPS_URL } from '../../config/constants';
import { Button } from '../UI/Button';
import { WhyChooseUs } from './WhyChooseUs';

/**
 * Hero section with main headline and action buttons
 */
export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50/30 to-white">
      <div className={`${CONTAINER} py-8 sm:py-12`}>
        <div className="grid gap-6">
          <div className="text-center">
            
            {/* Main headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl font-semibold leading-tight text-[#0073ff]">
              Гостевой дом «Дельфин» — доступный семейный отдых всего в минуте от теплого моря!
            </h1>
            
            {/* Subheadline */}
            <p className="mt-3 2xl:text-lg text-[#7a7a7a]">
              Отдыхайте выгодно у самого берега — до моря всего 50 метров!
            </p>

            {/* Embedded "Why Choose Us" section */}
            <WhyChooseUs embedded />

            {/* Action buttons */}
            <div className="mt-12 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[520px]">
              
              {/* Primary WhatsApp button */}
              <Button 
                href={WHATSAPP_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="whatsapp" 
                className="col-span-2 w-full text-lg py-3"
              >
                Связаться в WhatsApp
              </Button>

              {/* Secondary action buttons */}
              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                href={`tel:${PHONE_TEL}`} 
                className="no-pulse w-full"
                noPulse
              >
                ПОЗВОНИТЬ СЕЙЧАС
              </Button>
              
              <Button 
                href={MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                variant="outline"
                className="no-pulse w-full !text-[#0023eb]"
                noPulse
              >
                Как доехать
              </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Section divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </section>
  );
}