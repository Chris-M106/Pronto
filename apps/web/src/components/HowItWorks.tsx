import { FadeIn } from 'ui';

interface Step {
  n: number;
  nc: string;
  fc: string;
  border?: string;
  title: string;
  desc: string;
}

const custSteps: Step[] = [
  { n: 1, nc: '#1E2B5E', fc: '#fff', title: 'Describe your task', desc: 'Type what you need or pick a category. Add a photo if it helps. Takes 60 seconds.' },
  { n: 2, nc: '#EEF2FF', fc: '#2D5BE3', border: '#BFCFFF', title: 'Pick your pro', desc: 'Browse verified providers nearby. Ratings, past work, and price upfront — no surprises.' },
  { n: 3, nc: '#E6FAFA', fc: '#0ABFBC', border: '#A0E9E8', title: 'Sit back & pay safely', desc: 'Funds held securely until you confirm the job is done. Rate your experience after.' },
];

const provSteps: Step[] = [
  { n: 1, nc: '#0ABFBC', fc: '#1E2B5E', title: 'Build your profile', desc: 'Set up services, pricing, and availability in under 10 minutes. Get ID-verified and go live.' },
  { n: 2, nc: '#FFFBEB', fc: '#F59E0B', border: '#FCD34D', title: 'Accept jobs near you', desc: "Get notified of local jobs. Accept, decline, or quote — you're always in control." },
  { n: 3, nc: '#1E2B5E', fc: '#fff', title: 'Complete & get paid', desc: 'Upload a completion photo, mark the job done. Payout in 48h or instantly for a small fee.' },
];

interface StepColProps {
  pill: string;
  pillBg: string;
  pillColor: string;
  pillBorder?: string;
  steps: Step[];
}

function StepCol({ pill, pillBg, pillColor, pillBorder, steps }: StepColProps) {
  return (
    <div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          borderRadius: 50,
          padding: '.42rem 1.1rem',
          fontSize: '.78rem',
          fontWeight: 700,
          marginBottom: '1.8rem',
          background: pillBg,
          color: pillColor,
          border: pillBorder || 'none',
        }}
      >
        {pill}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: '1.1rem', paddingBottom: i < steps.length - 1 ? '2rem' : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: s.nc,
                  color: s.fc,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '.88rem',
                  border: s.border ? `1.5px solid ${s.border}` : 'none',
                  flexShrink: 0,
                }}
              >
                {s.n}
              </div>
              {i < steps.length - 1 && (
                <div style={{ width: 2, flex: 1, background: '#E5E7EB', marginTop: 6, opacity: 0.5 }} />
              )}
            </div>
            <div style={{ paddingTop: '.45rem' }}>
              <div style={{ fontSize: '.96rem', fontWeight: 800, color: '#111827', marginBottom: '.3rem' }}>{s.title}</div>
              <div style={{ fontSize: '.83rem', color: '#6B7280', lineHeight: 1.7 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorks() {
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
          How it works
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h2
          style={{
            fontSize: 'clamp(1.9rem,3.5vw,3rem)',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            color: '#111827',
            marginBottom: '3rem',
          }}
        >
          Simple for everyone.
        </h2>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem' }}>
        <FadeIn delay={0.1} dir="left">
          <StepCol pill="For customers · Get it done in 3 steps" pillBg="#1E2B5E" pillColor="#fff" steps={custSteps} />
        </FadeIn>
        <FadeIn delay={0.2} dir="right">
          <StepCol
            pill="For providers · Start earning fast"
            pillBg="#E6FAFA"
            pillColor="#0ABFBC"
            pillBorder="1.5px solid #A0E9E8"
            steps={provSteps}
          />
        </FadeIn>
      </div>
    </section>
  );
}
