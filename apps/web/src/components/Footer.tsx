const links = ['About', 'How it works', 'Providers', 'Blog', 'Privacy', 'Terms', 'Contact'];

export default function Footer() {
  return (
    <footer style={{ background: '#1E2B5E', padding: '3.5rem 5% 2rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff' }}>
          Pronto<span style={{ color: '#0ABFBC' }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {links.map((l) => (
            <a
              key={l}
              href="#"
              style={{
                color: 'rgba(255,255,255,.35)',
                fontSize: '.82rem',
                textDecoration: 'none',
                transition: 'color .2s',
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,.07)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '.76rem',
          color: 'rgba(255,255,255,.2)',
          flexWrap: 'wrap',
          gap: '.5rem',
        }}
      >
        <span>© 2026 Pronto Technologies Lda. All rights reserved.</span>
        <span>Made with ❤️ in Tondela</span>
      </div>
    </footer>
  );
}
