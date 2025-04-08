
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ className, size = 'medium' }: LogoProps) => {
  const sizeClasses = {
    small: 'h-8 w-auto max-w-full',
    medium: 'h-16 w-auto max-w-full',
    large: 'w-full h-full max-w-full max-h-full'
  };

  return (
    <div className={cn("relative overflow-hidden rounded-full group", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/10 to-gray-700/20 opacity-0 group-hover:opacity-30 transition-opacity duration-700 z-10 backdrop-blur-[2px]"></div>
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-10 rounded-full"></div>
      <img 
        src="/assets/rplus-logo.png"
        alt="rplus logo" 
        className={cn(
          sizeClasses[size], 
          "object-contain transform transition-all duration-700 hover:scale-105",
          "animate-gentle-float hover:animate-none"
        )}
      />
    </div>
  );
};

export default Logo;
