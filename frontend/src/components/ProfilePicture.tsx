import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProfilePictureProps {
  src: string;
  alt: string;
  fallback?: string;
  isRevealed: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12', 
  lg: 'w-16 h-16',
  xl: 'w-20 h-20'
};

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src,
  alt,
  fallback,
  isRevealed,
  className,
  size = 'md'
}) => {
  return (
    <div className={cn("relative", className)}>
      <Avatar className={cn(sizeClasses[size], "transition-all duration-500")}>
        <AvatarImage 
          src={src} 
          alt={alt}
          className={cn(
            "transition-all duration-500",
            !isRevealed && "blur-xl"
          )}
        />
        <AvatarFallback className={cn(
          !isRevealed && "blur-xl"
        )}>
          {fallback || alt?.[0] || '?'}
        </AvatarFallback>
      </Avatar>
      
      {/* Mystical overlay when blurred */}
      {!isRevealed && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-sm flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-gradient-accent animate-pulse" />
        </div>
      )}
    </div>
  );
};