import { useState } from 'react';
import { FadeIn } from 'ui';

const revs = [
  {
    init: 'SF',
    bg: '#BFCFFF',
    tc: '#1d3d9f',
    card: '#EEF2FF',
    bc: '#BFCFFF',
    sc: '#2D5BE3',
    name: 'Sofia F., 34',
    role: 'Customer · Lisbon',
    q: '"Booked a plumber at 8am, at my door by 10. The escrow payment gave me real confidence — only released the money once the job was perfect."',
  },
  {
    init: 'RC',
    bg: '#A0E9E8',
    tc: '#065b5a',
    card: '#E6FAFA',
    bc: '#A0E9E8',
    sc: '#0ABFBC',
    name: 'Rui C., 41',
    role: 'Electrician · Porto',
    q: '"In my first week I earned €620. Zero-commission period sealed it. Calendar full for three weeks without spending a cent on ads."',
  },
  {
    init: 'MB',
    bg: '#FCD34D',
    tc: '#78450a',
    card: '#FFFBEB',
    bc: '#FCD34D',
    sc: '#F59E0B',
    name: 'Miguel B., 52',
    role: 'Property manager · Lisbon',
    q: '"Managing 12 rentals used to mean endless calls. Pronto cut my admin time in half. The job photos alone are worth it for peace of mind."',
  },
];

export default function Reviews() {
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
          Reviews
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
          Real people. Real jobs.
        </h2>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.1rem' }}>
        {revs.map((r, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              onMouseEnter={() => setHov(i)}
              onMouseLeave={() => setHov(null)}
              style={{
                background: r.card,
                border: `1.5px solid ${r.bc}`,
                borderRadius: 18,
                padding: '1.8rem',
                transform: hov === i ? 'translateY(-6px)' : 'none',
                boxShadow: hov === i ? `0 20px 50px ${r.bc}99` : 'none',
                transition: 'all .25s cubic-bezier(.22,1,.36,1)',
              }}
            >
              <div style={{ color: r.sc, fontSize: '.9rem', marginBottom: '.9rem' }}>★★★★★</div>
              <p style={{ fontSize: '.88rem', lineHeight: 1.72, color: '#111827', marginBottom: '1.1rem' }}>{r.q}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.8rem' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: r.bg,
                    color: r.tc,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '.75rem',
                  }}
                >
                  {r.init}
                </div>
                <div>
                  <div style={{ fontSize: '.84rem', fontWeight: 800, color: '#111827' }}>{r.name}</div>
                  <div style={{ fontSize: '.72rem', color: '#6B7280' }}>{r.role}</div>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
