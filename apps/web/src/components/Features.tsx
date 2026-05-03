import { useState } from 'react';
import { FadeIn } from 'ui';

const feats = [
  { ico: '🔒', title: 'Escrow payments', desc: 'Money held securely and released only when you confirm the job is done.', pill: 'Zero financial risk', bg: '#EEF2FF', bc: '#BFCFFF', pc: '#1d3d9f', pb: '#BFCFFF' },
  { ico: '🪪', title: 'ID & background checks', desc: 'Every provider passes ID verification. Background-checked pros get a special badge.', pill: 'Powered by Veriff', bg: '#E6FAFA', bc: '#A0E9E8', pc: '#065b5a', pb: '#A0E9E8' },
  { ico: '📍', title: 'Live job tracking', desc: 'Know exactly when your pro is on the way. Real-time map, ETA updates, arrival alerts.', pill: 'On the day', bg: '#FFFBEB', bc: '#FCD34D', pc: '#78450a', pb: '#FCD34D' },
  { ico: '💬', title: 'In-app messaging', desc: 'Chat with your provider directly. No personal numbers shared — privacy protected.', pill: 'Encrypted', bg: '#ECFDF5', bc: '#6EE7B7', pc: '#064e3b', pb: '#6EE7B7' },
  { ico: '⭐', title: 'Blind reviews', desc: 'Both sides review before seeing ratings — honest, unbiased feedback every time.', pill: 'Verified only', bg: '#FFF1F3', bc: '#FDA4AF', pc: '#881337', pb: '#FDA4AF' },
  { ico: '↩', title: 'Pronto Guarantee', desc: 'Provider no-show? Replacement or full refund within 2 hours. Always.', pill: 'Our promise', bg: '#EEF0FF', bc: '#C7CEFF', pc: '#2d31a6', pb: '#C7CEFF' },
];

export default function Features() {
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
          Features
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
          Built around trust.
        </h2>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.1rem' }}>
        {feats.map((f, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <div
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                background: f.bg,
                border: `1.5px solid ${f.bc}`,
                borderRadius: 16,
                padding: '1.8rem',
                cursor: 'default',
                transform: hov === i ? 'translateY(-6px) scale(1.01)' : 'none',
                boxShadow: hov === i ? `0 20px 50px ${f.bc}88` : 'none',
                transition: 'all .25s cubic-bezier(.22,1,.36,1)',
                height: '100%',
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{f.ico}</div>
              <div style={{ fontSize: '.95rem', fontWeight: 800, color: '#111827', marginBottom: '.4rem' }}>{f.title}</div>
              <div style={{ fontSize: '.82rem', color: '#6B7280', lineHeight: 1.65, marginBottom: '.8rem' }}>{f.desc}</div>
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '.65rem',
                  fontWeight: 700,
                  padding: '.2rem .6rem',
                  borderRadius: 4,
                  background: f.pb,
                  color: f.pc,
                }}
              >
                {f.pill}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
