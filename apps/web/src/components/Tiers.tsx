import { FadeIn } from 'ui';

const tiers = [
  { badge: 'New', bc: 'rgba(255,255,255,.1)', bct: 'rgba(255,255,255,.5)', card: 'rgba(255,255,255,.04)', border: 'rgba(255,255,255,.08)', title: 'Getting started', desc: 'Just joined. ID-verified and ready to build reputation.', perks: ['ID verified', '0–9 jobs', 'Reduced commission'], pc: 'rgba(255,255,255,.3)' },
  { badge: 'Trusted', bc: 'rgba(45,91,227,.3)', bct: '#93B4FF', card: 'rgba(45,91,227,.12)', border: 'rgba(45,91,227,.3)', title: 'Proven performer', desc: '10+ jobs, 4.5★+. Consistently reliable.', perks: ['Everything in New', 'Priority placement', 'Trusted badge'], pc: '#93B4FF' },
  { badge: 'Pro', bc: 'rgba(10,191,188,.2)', bct: '#0ABFBC', card: 'rgba(10,191,188,.1)', border: 'rgba(10,191,188,.3)', title: 'Top of platform', desc: '50+ jobs, 4.8★+. The standard customers rely on.', perks: ['Everything in Trusted', 'Featured listing', 'Advanced analytics'], pc: '#0ABFBC' },
  { badge: 'Elite', bc: 'rgba(245,158,11,.2)', bct: '#F59E0B', card: 'rgba(245,158,11,.1)', border: 'rgba(245,158,11,.3)', title: 'Best in class', desc: '200+ jobs, 4.9★+. Dedicated account manager.', perks: ['Everything in Pro', '0% commission', 'Account manager'], pc: '#F59E0B' },
];

export default function Tiers() {
  return (
    <section style={{ padding: '6rem 5%', background: '#1E2B5E' }}>
      <FadeIn>
        <div
          style={{
            fontSize: '.7rem',
            fontWeight: 800,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: '#93B4FF',
            marginBottom: '.8rem',
          }}
        >
          Provider trust tiers
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2
          style={{
            fontSize: 'clamp(1.9rem,3.5vw,3rem)',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            color: '#fff',
            marginBottom: '.8rem',
          }}
        >
          A reputation you can see.
        </h2>
      </FadeIn>
      <FadeIn delay={0.15}>
        <p
          style={{
            fontSize: '1rem',
            color: 'rgba(255,255,255,.4)',
            lineHeight: 1.75,
            maxWidth: 520,
            marginBottom: '2.5rem',
          }}
        >
          Every provider earns their tier through completed jobs and consistent ratings.
        </p>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem' }}>
        {tiers.map((t, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: '1.6rem' }}>
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '.65rem',
                  fontWeight: 800,
                  padding: '.25rem .7rem',
                  borderRadius: 4,
                  background: t.bc,
                  color: t.bct,
                  marginBottom: '.9rem',
                  letterSpacing: '.5px',
                  textTransform: 'uppercase',
                }}
              >
                {t.badge}
              </div>
              <div style={{ fontSize: '.92rem', fontWeight: 800, color: '#fff', marginBottom: '.3rem' }}>{t.title}</div>
              <div style={{ fontSize: '.78rem', color: 'rgba(255,255,255,.4)', lineHeight: 1.6, marginBottom: '.9rem' }}>{t.desc}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                {t.perks.map((p) => (
                  <div
                    key={p}
                    style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', gap: '.5rem' }}
                  >
                    <span style={{ color: t.pc, fontWeight: 900, fontSize: '.65rem' }}>✓</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
