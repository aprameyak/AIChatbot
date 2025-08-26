import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ size = 64, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="32" cy="32" r="30" fill="#6366f1" stroke="#4f46e5" strokeWidth="2"/>
      
      {/* Chat bubble */}
      <path d="M20 24C20 21.7909 21.7909 20 24 20H36C38.2091 20 40 21.7909 40 24V32C40 34.2091 38.2091 36 36 36H28L24 40V36H24C21.7909 36 20 34.2091 20 32V24Z" fill="white"/>
      
      {/* AI brain/circuit pattern */}
      <circle cx="28" cy="28" r="2" fill="#6366f1"/>
      <circle cx="36" cy="28" r="2" fill="#6366f1"/>
      <circle cx="32" cy="32" r="2" fill="#6366f1"/>
      
      {/* Connecting lines */}
      <path d="M30 28L34 28" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 30L32 30" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M32 30L36 30" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round"/>
      
      {/* Sparkle effect */}
      <path d="M44 16L45.5 17.5L47 16L45.5 14.5L44 16Z" fill="#fbbf24"/>
      <path d="M16 44L17.5 45.5L19 44L17.5 42.5L16 44Z" fill="#fbbf24"/>
      <path d="M48 48L49.5 49.5L51 48L49.5 46.5L48 48Z" fill="#fbbf24"/>
    </svg>
  );
};
