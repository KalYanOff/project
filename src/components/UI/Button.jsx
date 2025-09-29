/**
 * BUTTON COMPONENT
 * ===============
 * 
 * Reusable button component with different variants and hover effects.
 * Supports both regular buttons and links.
 */

import React from 'react';
import { COLORS } from '../../config/constants';

// Base button styles
const buttonStyles = {
  base: `btn inline-flex items-center justify-center text-center rounded-2xl px-4 py-2 text-white shadow-sm transition hover:opacity-90 hover:-translate-y-[1px] active:translate-y-[1px] btn-pulse-strong`,
  primary: `bg-[${COLORS.primary}]`,
  whatsapp: `bg-emerald-600`,
  outline: `!bg-white !text-[${COLORS.primary}] border border-[${COLORS.primary}] hover:!text-[${COLORS.primary}]`
};

/**
 * Button component that can render as button or link
 * 
 * @param {string} href - If provided, renders as link
 * @param {function} onClick - Click handler
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional CSS classes
 * @param {string} variant - Button style variant (primary, whatsapp, outline)
 * @param {string} target - Link target (_blank for external links)
 * @param {string} rel - Link rel attribute
 * @param {string} ariaLabel - Accessibility label
 */
export function Button({ 
  href, 
  onClick, 
  children, 
  className = "", 
  variant = "primary", 
  target, 
  rel, 
  ariaLabel,
  noPulse = false
}) {
  // Determine which styles to apply based on variant
  const variantStyle = buttonStyles[variant] || buttonStyles.primary;
  const finalClassName = `${buttonStyles.base} ${variantStyle} ${className} ${noPulse ? 'no-pulse' : ''}`;

  // Render as link if href provided
  if (href) {
    return (
      <a 
        href={href} 
        onClick={onClick} 
        className={finalClassName} 
        target={target} 
        rel={rel} 
        aria-label={ariaLabel}
      >
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button 
      type="button" 
      onClick={onClick} 
      className={finalClassName} 
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}