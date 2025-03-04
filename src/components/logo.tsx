
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  textClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  hideText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  textClassName,
  size = 'md', 
  hideText = false 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-2 duration-300",
        className
      )}
    >
      <div className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-md", 
        sizeClasses[size]
      )}>
        <span className="absolute inset-0 bg-gradient-to-br from-hotel-400 to-hotel-700"></span>
        <span className="relative text-white font-semibold">C</span>
      </div>
      
      {!hideText && (
        <span className={cn(
          "font-medium tracking-tight transition-colors",
          textSizeClasses[size],
          textClassName
        )}>
          Cozy<span className="font-light text-hotel-600">HotelHub</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
