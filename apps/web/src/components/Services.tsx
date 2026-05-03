import { useState } from 'react';
import { FadeIn } from 'ui';

const svcs = [
  { icon: '🔧', name: 'Plumbing', count: '320 pros', bg: '#EEF2FF' },
  { icon: '⚡', name: 'Electrical', count: '210 pros', bg: '#FFFBEB' },
  { icon: '🎨', name: 'Painting', count: '185 pros', bg: '#E6FAFA' },
  { icon: '🌿', name: 'Gardening', count: '140 pros', bg: '#ECFDF5' },
  { icon: '🪑', name: 'Assembly', count: '260 pros', bg: '#FFF1F3' },
  { icon: '🚿', name: 'Bathroom', count: '90 pros', bg: '#EEF0FF' },
  { icon: '🪟', name: 'Windows', count: '75 pros', bg: '#FFFBEB' },
  { icon: '📦', name: 'Moving', count: '110 pros', bg: '#EEF2FF' },
];

export default function Services() {
  const [hov, setHov] = useState<number | null>(null);
  return (
    <section style={{ padding: '6rem 5%', background: '#fff' }}>
      <FadeIn>
        <div
          style={{
            fontSize: '.7rem',
            fontWeight: 800,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: '#2D5BE3',
            marginBottom: '.8rem',
          }}
        >
          Services
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2
          style={{
            fontSize: 'clamp(1.9rem,3.5vw,3rem)',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            color: '#111827',
            marginBottom: '2.5rem',
          }}
        >
          Whatever the job — we&apos;ve got a pro.
        </h2>
      </FadeIn>
      <FadeIn delay={0.15}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
          {svcs.map((s, i) => (
            <div
              key={i}
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                background: s.bg,
                borderRadius: 16,
                padding: '1.4rem 1rem',
                textAlign: 'center',
                cursor: 'pointer',
                border: `1.5px solid ${hov === i ? '#BFCFFF' : 'transparent'}`,
                transform: hov === i ? 'translateY(-6px)' : 'none',
                boxShadow: hov === i ? '0 16px 40px rgba(45,91,227,.1)' : 'none',
                transition: 'all .25s cubic-bezier(.22,1,.36,1)',
              }}
            >
              <div style={{ fontSize: '1.6rem', marginBottom: '.6rem' }}>{s.icon}</div>
              <div style={{ fontSize: '.87rem', fontWeight: 700, color: '#111827', marginBottom: '.25rem' }}>{s.name}</div>
              <div style={{ fontSize: '.7rem', color: '#6B7280' }}>{s.count}</div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
