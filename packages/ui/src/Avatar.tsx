import React from 'react';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm',
  lg: 'w-16 h-16 text-base',
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, initials, size = 'md', ...props }, ref) => {
    return (
      <div ref={ref} className={`flex-shrink-0 ${sizeStyles[size]}`}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className={`${sizeStyles[size]} rounded-full object-cover`}
            {...props}
          />
        ) : (
          <div className={`${sizeStyles[size]} rounded-full bg-blue text-white flex items-center justify-center font-semibold`}>
            {initials}
          </div>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
export default Avatar;
