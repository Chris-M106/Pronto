import { useState, CSSProperties } from 'react';
import { FadeIn } from 'ui';

const estRanges: Record<string, Record<string, string>> = {
  Plumbing: { Small: '€35–€65', Medium: '€80–€140', Large: '€160–€280', 'Full day': '€300–€450' },
  Electrical: { Small: '€50–€85', Medium: '€100–€180', Large: '€200–€350', 'Full day': '€380–€550' },
  Painting: { Small: '€40–€70', Medium: '€90–€160', Large: '€180–€320', 'Full day': '€350–€500' },
  Gardening: { Small: '€30–€55', Medium: '€70–€120', Large: '€130–€220', 'Full day': '€250–€380' },
  Assembly: { Small: '€25–€50', Medium: '€60–€110', Large: '€120–€200', 'Full day': '€220–€320' },
  'Moving help': { Small: '€45–€75', Medium: '€100–€170', Large: '€180–€300', 'Full day': '€320–€480' },
};

const urgMult: Record<string, number> = { Flexible: 1, Soon: 1.15, 'Right now': 1.3 };

export default function Estimator() {
  const [svc, setSvc] = useState('Plumbing');
  const [size, setSize] = useState('Small');
  const [urg, setUrg] = useState('Flexible');

  const base = (estRanges[svc] || {})[size] || '€45–€90';
  const m = urgMult[urg] || 1;
  let out = base;
  if (m !== 1) {
    const ns = (base.match(/\d+/g) || []).map(Number);
    out = `€${Math.round((ns[0] * m) / 5) * 5}–€${Math.round((ns[1] * m) / 5) * 5}`;
  }

  const sel: CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,.07)',
    border: '1px solid rgba(255,255,255,.12)',
    borderRadius: 8,
    padding: '.7rem 1rem',
    color: 'rgba(255,255,255,.8)',
    fontSize: '.85rem',
    fontFamily: 'Inter,system-ui,sans-serif',
    cursor: 'pointer',
  };
  const lbl: CSSProperties = {
    fontSize: '.7rem',
    textTransform: 'uppercase',
    letterSpacing: '.8px',
    color: 'rgba(255,255,255,.35)',
    display: 'block',
    marginBottom: '.5rem',
  };

  return (
    <section style={{ background: '#1E2B5E', padding: '4rem 5%' }}>
      <FadeIn>
        <div
          style={{
            background: 'rgba(255,255,255,.05)',
            border: '1px solid rgba(255,255,255,.1)',
            borderRadius: 24,
            padding: '3rem',
            maxWidth: 820,
            margin: '0 auto',
          }}
        >
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px', marginBottom: '.5rem' }}>
            Get an instant price estimate
          </div>
          <div style={{ fontSize: '.88rem', color: 'rgba(255,255,255,.4)', marginBottom: '2rem' }}>
            No commitment. Just a quick idea of what your job might cost.
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={lbl}>Service</label>
              <select style={sel} value={svc} onChange={(e) => setSvc(e.target.value)}>
                {Object.keys(estRanges).map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={lbl}>Job size</label>
              <select style={sel} value={size} onChange={(e) => setSize(e.target.value)}>
                {['Small', 'Medium', 'Large', 'Full day'].map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={lbl}>Urgency</label>
              <select style={sel} value={urg} onChange={(e) => setUrg(e.target.value)}>
                {['Flexible', 'Soon', 'Right now'].map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </div>
          </div>
          <div
            style={{
              background: 'rgba(45,91,227,.2)',
              border: '1px solid rgba(45,91,227,.4)',
              borderRadius: 12,
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: '.7rem',
                  color: 'rgba(255,255,255,.35)',
                  textTransform: 'uppercase',
                  letterSpacing: '.8px',
                  marginBottom: '.3rem',
                }}
              >
                Estimated range
              </div>
              <div
                style={{
                  fontSize: '2.2rem',
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '-1px',
                  transition: 'all .25s',
                }}
              >
                {out}
              </div>
            </div>
            <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.4)', maxWidth: 240, lineHeight: 1.6 }}>
              Based on similar jobs in Lisbon. Final price agreed before booking.
            </div>
          </div>
          <button
            style={{
              background: '#0ABFBC',
              color: '#1E2B5E',
              border: 'none',
              borderRadius: 8,
              padding: '.85rem 1.8rem',
              fontWeight: 800,
              fontSize: '.88rem',
              cursor: 'pointer',
              marginTop: '1.2rem',
              fontFamily: 'Inter,system-ui,sans-serif',
            }}
          >
            Find pros in this range →
          </button>
        </div>
      </FadeIn>
    </section>
  );
}
