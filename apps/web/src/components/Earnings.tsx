import { FadeIn, HoverBtn, useInView } from 'ui';

const bars = [
  { d: 'Mon', v: 40, e: '€120', c: '#2D5BE3' },
  { d: 'Tue', v: 70, e: '€210', c: '#0ABFBC' },
  { d: 'Wed', v: 55, e: '€165', c: '#F59E0B' },
  { d: 'Thu', v: 90, e: '€270', c: '#10B981' },
  { d: 'Fri', v: 100, e: '€300', c: '#1E2B5E' },
];

const services: Array<[string, string, string, string, string]> = [
  ['Plumbing', '€95', '#EEF2FF', '#BFCFFF', '#2D5BE3'],
  ['Assembly', '€65', '#E6FAFA', '#A0E9E8', '#0ABFBC'],
  ['Garden', '€110', '#FFFBEB', '#FCD34D', '#F59E0B'],
];

const perks: Array<[string, string, string, string]> = [
  ['🚀', '#EEF2FF', 'Zero commission for 6 months', 'New providers keep 100% of earnings. No catches.'],
  ['⚡', '#E6FAFA', 'Instant payouts', 'Access your earnings same-day for a small convenience fee.'],
  ['🎯', '#FFFBEB', 'You set the prices', "Fixed rates, hourly, or quotes — charge what you're worth."],
  ['📊', '#ECFDF5', 'Annual tax summary', 'One-click earnings report at year end. Less paperwork.'],
];

export default function Earnings() {
  const [ref, vis] = useInView();

  return (
    <section style={{ padding: '6rem 5%', background: '#F7F8FF' }}>
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
          For providers
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
          Your skills. Your income.
        </h2>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <FadeIn delay={0.1} dir="left">
          <div ref={ref} style={{ background: '#fff', borderRadius: 20, border: '1px solid rgba(45,91,227,.1)', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <div
                  style={{
                    fontSize: '.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    color: '#6B7280',
                    marginBottom: '.2rem',
                  }}
                >
                  Monthly earnings
                </div>
                <div style={{ fontSize: '2.8rem', fontWeight: 900, letterSpacing: '-2px', color: '#111827' }}>€1,840</div>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.3rem',
                  background: '#ECFDF5',
                  color: '#10B981',
                  fontSize: '.75rem',
                  fontWeight: 700,
                  padding: '.3rem .7rem',
                  borderRadius: 6,
                }}
              >
                ↑ +24%
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '.5rem', height: 100, marginBottom: '1.2rem' }}>
              {bars.map((b, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
                  <div style={{ fontSize: '7px', color: '#6B7280', fontWeight: 600 }}>{b.e}</div>
                  <div
                    style={{
                      width: '100%',
                      borderRadius: '5px 5px 0 0',
                      background: b.c,
                      height: vis ? b.v : 0,
                      transition: `height .8s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.08}s`,
                    }}
                  />
                  <div style={{ fontSize: '9px', fontWeight: 700, color: '#6B7280' }}>{b.d}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '.6rem' }}>
              {services.map(([n, p, bg, bc, pc]) => (
                <div key={n} style={{ background: bg, border: `1px solid ${bc}`, borderRadius: 10, padding: '.85rem' }}>
                  <div style={{ fontSize: '.72rem', fontWeight: 700, color: '#111827', marginBottom: '.2rem' }}>{n}</div>
                  <div style={{ fontSize: '.85rem', fontWeight: 900, color: pc }}>{p}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.2} dir="right">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {perks.map(([ic, bg, h, p]) => (
              <div key={h} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1rem',
                    flexShrink: 0,
                  }}
                >
                  {ic}
                </div>
                <div>
                  <div style={{ fontSize: '.92rem', fontWeight: 800, color: '#111827', marginBottom: '.2rem' }}>{h}</div>
                  <div style={{ fontSize: '.8rem', color: '#6B7280', lineHeight: 1.6 }}>{p}</div>
                </div>
              </div>
            ))}
            <HoverBtn bg="#0ABFBC" color="#1E2B5E">Start earning on Pronto →</HoverBtn>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
