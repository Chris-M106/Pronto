import React from 'react';
import { useInView } from '../hooks/useInView';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  dir?: Direction;
  className?: string;
}

const transforms: Record<Direction, string> = {
  up: 'translateY(32px)',
  down: 'translateY(-32px)',
  left: 'translateX(-32px)',
  right: 'translateX(32px)',
  none: 'none',
};

export default function FadeIn({ children, delay = 0, dir = 'up', className = '' }: FadeInProps) {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: vis ? 'none' : transforms[dir],
        opacity: vis ? 1 : 0,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.22,1,.36,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
