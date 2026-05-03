import { useCounter } from '../hooks/useCounter';

interface KPIProps {
  val: number;
  suffix?: string;
  label: string;
  active: boolean;
}

export default function KPI({ val, suffix = '', label, active }: KPIProps) {
  const num = useCounter(val, 1600, active);
  return (
    <div>
      <div style={{ fontSize: '1.9rem', fontWeight: 900, color: '#fff', letterSpacing: '-1px' }}>
        {num}
        {suffix}
      </div>
      <div
        style={{
          fontSize: '.65rem',
          textTransform: 'uppercase',
          letterSpacing: '.8px',
          color: 'rgba(255,255,255,.35)',
          marginTop: '.1rem',
        }}
      >
        {label}
      </div>
    </div>
  );
}
