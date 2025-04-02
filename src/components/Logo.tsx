
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const Logo = ({ className, size = 'medium' }: LogoProps) => {
  const sizeClasses = {
    small: 'h-6 w-auto',
    medium: 'h-8 w-auto',
    large: 'h-12 w-auto'
  };

  return (
    <img 
      src="/lovable-uploads/459f1cf5-4a7c-47e3-9a28-4bc7a10675f1.png" 
      alt="rplus logo" 
      className={cn(sizeClasses[size], className)}
    />
  );
};

export default Logo;
