import { useState } from 'react';
import { useInView, HoverBtn, KPI } from 'ui';

const pros = [
  {
    init: 'JM',
    c: '#2D5BE3',
    bg: '#EEF2FF',
    name: 'João Mendes',
    meta: 'Plumbing · 1.2km',
    price: '€55/h',
    tag: 'Available now',
    tagC: '#34d399',
    tagBg: 'rgba(16,185,129,.15)',
  },
  {
    init: 'CS',
    c: '#F59E0B',
    bg: '#FFFBEB',
    name: 'Carlos Silva',
    meta: 'Electrical · 2.8km',
    price: '€70/h',
    tag: 'Top rated',
    tagC: '#F59E0B',
    tagBg: 'rgba(245,158,11,.15)',
  },
  {
    init: 'AR',
    c: '#0ABFBC',
    bg: '#E6FAFA',
    name: 'Ana Rodrigues',
    meta: 'Painting · 0.9km',
    price: '€45/h',
    tag: 'New pro',
    tagC: '#93B4FF',
    tagBg: 'rgba(45,91,227,.2)',
  },
];

export default function Hero() {
  const [ref, vis] = useInView({ threshold: 0.01 });
  const [hovCard, setHovCard] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      style={{
        background: '#1E2B5E',
        minHeight: '100vh',
        padding: '7rem 5% 5rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -180,
          right: -180,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'rgba(45,91,227,.18)',
          pointerEvents: 'none',
          animation: 'blob1 8s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -120,
          left: '28%',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'rgba(10,191,188,.12)',
          pointerEvents: 'none',
          animation: 'blob2 10s ease-in-out infinite alternate',
        }}
      />
      <style>{`@keyframes blob1{from{transform:scale(1) translate(0,0)}to{transform:scale(1.12) translate(-30px,20px)}}@keyframes blob2{from{transform:scale(1) translate(0,0)}to{transform:scale(1.1) translate(20px,-30px)}}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.7)}}`}</style>

      <div>
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all .6s .1s',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.5rem',
              background: 'rgba(45,91,227,.25)',
              border: '1px solid rgba(45,91,227,.5)',
              color: '#93B4FF',
              fontSize: '.72rem',
              fontWeight: 700,
              padding: '.4rem 1rem',
              borderRadius: '6px',
              marginBottom: '1.6rem',
              textTransform: 'uppercase',
              letterSpacing: '.5px',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#93B4FF',
                display: 'inline-block',
                animation: 'pulse 2s infinite',
              }}
            />
            Live in Lisbon &amp; Porto
          </div>
        </div>
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(28px)',
            transition: 'all .7s .2s',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.8rem,5vw,5rem)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.06,
              letterSpacing: '-2.5px',
              marginBottom: '1.2rem',
            }}
          >
            Your neighbourhood,
            <br />
            <span style={{ color: '#0ABFBC' }}>handled.</span>
          </h1>
        </div>
        <div
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(20px)',
            transition: 'all .65s .35s',
          }}
        >
          <p
            style={{
              fontSize: '1rem',
              color: 'rgba(255,255,255,.5)',
              lineHeight: 1.8,
              maxWidth: 440,
              marginBottom: '2rem',
            }}
          >
            Vetted local tradespeople, transparent pricing, and full payment protection — every single time.
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '.8rem',
            flexWrap: 'wrap',
            opacity: vis ? 1 : 0,
            transform: vis ? 'none' : 'translateY(16px)',
            transition: 'all .65s .45s',
          }}
        >
          <HoverBtn bg="#0ABFBC" color="#1E2B5E">Find a pro now</HoverBtn>
          <HoverBtn bg="rgba(255,255,255,.08)" color="#fff" border="1.5px solid rgba(255,255,255,.2)">
            Start earning
          </HoverBtn>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '3rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(255,255,255,.1)',
            opacity: vis ? 1 : 0,
            transition: 'opacity .8s .6s',
          }}
        >
          <KPI val={2400} suffix="+" label="Verified pros" active={vis} />
          <KPI val={98} suffix="%" label="Fill rate" active={vis} />
          <KPI val={49} suffix="★" label="Avg rating" active={vis} />
        </div>
      </div>

      <div
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateX(32px)',
          transition: 'all .75s .3s',
          background: 'rgba(255,255,255,.06)',
          border: '1px solid rgba(255,255,255,.1)',
          borderRadius: 20,
          padding: '1.8rem',
          backdropFilter: 'blur(20px)',
        }}
      >
        <div
          style={{
            fontSize: '.68rem',
            textTransform: 'uppercase',
            letterSpacing: 1,
            color: 'rgba(255,255,255,.35)',
            marginBottom: '1rem',
          }}
        >
          Find a service near you
        </div>
        <div style={{ display: 'flex', gap: '.6rem', marginBottom: '1rem' }}>
          <input
            readOnly
            placeholder="e.g. fix leaking tap…"
            style={{
              flex: 1,
              background: 'rgba(255,255,255,.08)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 8,
              padding: '.65rem 1rem',
              color: 'rgba(255,255,255,.7)',
              fontSize: '.8rem',
              fontFamily: 'Inter,system-ui,sans-serif',
            }}
          />
          <button
            style={{
              background: '#0ABFBC',
              color: '#1E2B5E',
              border: 'none',
              borderRadius: 8,
              padding: '.65rem 1rem',
              fontWeight: 700,
              fontSize: '.8rem',
              cursor: 'pointer',
            }}
          >
            Search
          </button>
        </div>
        <div style={{ display: 'flex', gap: '.4rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
          {['All', 'Plumbing', 'Electrical', 'Painting', 'Garden'].map((c, i) => (
            <div
              key={c}
              style={{
                padding: '.28rem .7rem',
                borderRadius: 6,
                fontSize: '.68rem',
                fontWeight: 600,
                cursor: 'pointer',
                background: i === 0 ? 'rgba(45,91,227,.4)' : 'rgba(255,255,255,.07)',
                border: `1px solid ${i === 0 ? 'rgba(45,91,227,.6)' : 'rgba(255,255,255,.1)'}`,
                color: i === 0 ? '#93B4FF' : 'rgba(255,255,255,.5)',
              }}
            >
              {c}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
          {pros.map((p, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovCard(i)}
              onMouseLeave={() => setHovCard(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.8rem',
                background: hovCard === i ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.08)',
                borderRadius: 12,
                padding: '.8rem',
                transition: 'background .2s',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: p.bg,
                  color: p.c,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '.78rem',
                  flexShrink: 0,
                }}
              >
                {p.init}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '.8rem', fontWeight: 700, color: 'rgba(255,255,255,.9)' }}>{p.name}</div>
                <div style={{ fontSize: '.68rem', color: 'rgba(255,255,255,.35)', marginTop: 2 }}>{p.meta}</div>
                <div
                  style={{
                    fontSize: '.62rem',
                    fontWeight: 700,
                    padding: '2px 7px',
                    borderRadius: 4,
                    background: p.tagBg,
                    color: p.tagC,
                    display: 'inline-block',
                    marginTop: 4,
                  }}
                >
                  {p.tag}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '.82rem', fontWeight: 800, color: '#0ABFBC' }}>{p.price}</div>
                <div style={{ fontSize: '.62rem', color: '#F59E0B' }}>★★★★★</div>
              </div>
            </div>
          ))}
        </div>
        <button
          style={{
            width: '100%',
            background: '#2D5BE3',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '.75rem',
            fontWeight: 700,
            fontSize: '.82rem',
            marginTop: '1rem',
            cursor: 'pointer',
          }}
        >
          Book instantly →
        </button>
      </div>
    </section>
  );
}
