import { Card, Button, Badge, AnimatedFadeIn } from 'ui';

interface PricingTier {
  title: string;
  subtitle: string;
  highlights: string[];
  cta: string;
  icon: string;
}

const tiers: PricingTier[] = [
  {
    title: 'For Customers',
    subtitle: 'Fair pricing for peace of mind',
    highlights: [
      'Average €45-70/hour rates',
      'No hidden fees or surprise charges',
      'Upfront pricing quotes',
      'Cancellation protection',
      'Money-back guarantee if unsatisfied',
    ],
    cta: 'Find Services',
    icon: '👤',
  },
  {
    title: 'For Providers',
    subtitle: 'Earn up to €1,500/month',
    highlights: [
      'Keep 85% of earnings',
      'Flexible scheduling',
      'Free equipment insurance',
      'Dedicated support team',
      'Profile boost options',
    ],
    cta: 'Become a Provider',
    icon: '🔨',
  },
];

export default function PricingTiers() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Fair rates for everyone. No surprises, no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier, idx) => (
            <AnimatedFadeIn key={tier.title} delay={idx * 200}>
              <Card
                hover
                className={`p-8 flex flex-col h-full border-2 ${
                  idx === 1 ? 'border-blue' : 'border-border'
                }`}
              >
                <div className="text-5xl mb-4">{tier.icon}</div>
                <h3 className="text-3xl font-bold text-navy mb-2">
                  {tier.title}
                </h3>
                <p className="text-text-light mb-6">{tier.subtitle}</p>

                {idx === 1 && (
                  <Badge variant="secondary" className="w-fit mb-4">
                    Most Popular
                  </Badge>
                )}

                <ul className="space-y-3 mb-8 flex-1">
                  {tier.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3">
                      <span className="text-teal font-bold mt-1">✓</span>
                      <span className="text-text-dark">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={idx === 1 ? 'secondary' : 'primary'}
                  size="lg"
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Card>
            </AnimatedFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
