import React, { useEffect, useRef, useState } from 'react';

interface AnimatedFadeInProps {
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
}

const AnimatedFadeIn: React.FC<AnimatedFadeInProps> = ({
  children,
  duration = 600,
  delay = 0,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-opacity transition-transform ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionProperty: 'opacity, transform',
        transitionTimingFunction: 'ease-out',
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedFadeIn;
