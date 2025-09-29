/**
 * FOOTER COMPONENT
 * ===============
 * 
 * Site footer with copyright and contact links.
 */

import React from 'react';
import { CONTAINER, WHATSAPP_URL, PHONE_TEL, MAPS_URL } from '../../config/constants';

/**
 * Site footer with links and copyright
 */
export function Footer() {
  return (
    <footer id="page-footer" className="border-t">
      <div className={`${CONTAINER} py-6 flex flex-col sm:flex-row items-center justify-between gap-2`}>
        
        {/* Copyright */}
        <p className="text-sm text-gray-600">
          © Гостевой дом «Дельфин». Все права защищены.
        </p>

        {/* Contact links */}
        <div className="flex gap-3 text-sm">
          <a 
            className="underline" 
            href={WHATSAPP_URL} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
          <a className="underline" href={`tel:${PHONE_TEL}`}>
            Позвонить
          </a>
          <a 
            className="underline" 
            href={MAPS_URL} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Как доехать
          </a>
        </div>
      </div>
    </footer>
  );
}