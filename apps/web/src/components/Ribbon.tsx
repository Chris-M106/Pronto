const items = [
  '🔒 Escrow payments',
  '✓ ID-verified providers',
  '↩ Pronto Guarantee',
  '📍 Real-time tracking',
  '⭐ Blind reviews',
];

export default function Ribbon() {
  return (
    <div
      style={{
        background: '#2D5BE3',
        padding: '1rem 5%',
        display: 'flex',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {items.map((i) => (
        <div key={i} style={{ color: 'rgba(255,255,255,.8)', fontSize: '.8rem', fontWeight: 500 }}>
          {i}
        </div>
      ))}
    </div>
  );
}
