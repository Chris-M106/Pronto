import React, { useState } from 'react';

interface HoverBtnProps {
  children: React.ReactNode;
  bg: string;
  color: string;
  border?: string;
  onClick?: () => void;
}

export default function HoverBtn({ children, bg, color, border, onClick }: HoverBtnProps) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={onClick}
      style={{
        background: bg,
        color,
        border: border || 'none',
        padding: '.85rem 1.7rem',
        borderRadius: 8,
        fontWeight: 800,
        fontSize: '.9rem',
        cursor: 'pointer',
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov ? '0 12px 30px rgba(0,0,0,.25)' : 'none',
        transition: 'all .2s',
        fontFamily: 'Inter,system-ui,sans-serif',
      }}
    >
      {children}
    </button>
  );
}
