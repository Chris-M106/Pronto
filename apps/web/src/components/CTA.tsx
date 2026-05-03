import { FadeIn, HoverBtn } from 'ui';

const stats: Array<[string, string]> = [
  ['2,400+', 'Active providers'],
  ['18k+', 'Jobs completed'],
  ['€1.2M', 'Paid to providers'],
  ['4.9★', 'App store rating'],
];

export default function CTA() {
  return (
    <section
      style={{
        background: '#2D5BE3',
        padding: '6rem 5%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}
    >
      <FadeIn dir="left">
        <h2
          style={{
            fontSize: 'clamp(2rem,4vw,3.2rem)',
            fontWeight: 900,
            color: '#fff',
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          Stop waiting.
          <br />
          Start Pronto.
        </h2>
        <p style={{ color: 'rgba(255,255,255,.65)', fontSize: '1rem', lineHeight: 1.75, marginBottom: '2rem' }}>
          Join thousands already on the platform. Download the app or use on web.
        </p>
        <div style={{ display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
          <HoverBtn bg="#fff" color="#2D5BE3">Download on iOS</HoverBtn>
          <HoverBtn bg="transparent" color="#fff" border="1.5px solid rgba(255,255,255,.4)">
            Get on Android
          </HoverBtn>
          <HoverBtn bg="transparent" color="#fff" border="1.5px solid rgba(255,255,255,.4)">
            Use on web
          </HoverBtn>
        </div>
      </FadeIn>
      <FadeIn dir="right" delay={0.1}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {stats.map(([v, l]) => (
            <div
              key={l}
              style={{
                background: 'rgba(255,255,255,.1)',
                border: '1px solid rgba(255,255,255,.15)',
                borderRadius: 16,
                padding: '1.5rem 2rem',
                textAlign: 'center',
                minWidth: 130,
              }}
            >
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>{v}</div>
              <div
                style={{
                  fontSize: '.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '.8px',
                  color: 'rgba(255,255,255,.45)',
                  marginTop: '.3rem',
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
