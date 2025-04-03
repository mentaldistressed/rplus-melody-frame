
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
    <img 
      // src="/lovable-uploads/459f1cf5-4a7c-47e3-9a28-4bc7a10675f1.png" 
      src="/lovable-uploads/rplus-logo.png"
      alt="rplus logo" 
      className={cn(sizeClasses[size], className, "object-contain")}
    />
  );
};

export default Logo;
