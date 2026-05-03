interface NavProps {
  scrolled: boolean;
}

export default function Nav({ scrolled }: NavProps) {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 5%',
        background: scrolled ? 'rgba(247,248,255,0.97)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(45,91,227,.1)' : 'none',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        transition: 'all .35s ease',
      }}
    >
      <div
        style={{
          fontSize: '1.5rem',
          fontWeight: 900,
          color: scrolled ? '#1E2B5E' : '#fff',
          letterSpacing: '-1px',
          transition: 'color .35s',
        }}
      >
        Pronto<span style={{ color: '#0ABFBC' }}>.</span>
      </div>
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        {['Services', 'How it works', 'Providers'].map((l) => (
          <a
            key={l}
            href="#"
            style={{
              color: scrolled ? '#6B7280' : 'rgba(255,255,255,.7)',
              fontSize: '.875rem',
              fontWeight: 500,
              textDecoration: 'none',
              transition: 'color .2s',
            }}
          >
            {l}
          </a>
        ))}
        <a
          href="#"
          style={{
            border: '1.5px solid rgba(45,91,227,.5)',
            color: '#2D5BE3',
            padding: '.45rem 1.1rem',
            borderRadius: '8px',
            fontSize: '.82rem',
            fontWeight: 700,
            textDecoration: 'none',
            background: '#EEF2FF',
          }}
        >
          Become a pro
        </a>
        <a
          href="#"
          style={{
            background: '#2D5BE3',
            color: '#fff',
            padding: '.5rem 1.2rem',
            borderRadius: '8px',
            fontSize: '.82rem',
            fontWeight: 700,
            textDecoration: 'none',
          }}
        >
          Book a service
        </a>
      </div>
    </nav>
  );
}
