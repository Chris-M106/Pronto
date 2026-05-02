import { Card, AnimatedFadeIn } from 'ui';

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: 'Real-time Tracking',
    description: 'Track your service provider in real-time and get live updates on job progress.',
    icon: '📍',
  },
  {
    title: 'Verified Providers',
    description: 'All providers are vetted, background-checked, and rated by real customers.',
    icon: '✅',
  },
  {
    title: 'Secure Payments',
    description: 'Pay securely through our platform with buyer protection guarantees.',
    icon: '🔒',
  },
  {
    title: 'Detailed Reviews',
    description: "Read detailed reviews and ratings from customers who've already used the service.",
    icon: '⭐',
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-light-bg">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Why Choose Pronto?
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            We're committed to making home services simple, safe, and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, idx) => (
            <AnimatedFadeIn key={feature.title} delay={idx * 150}>
              <Card hover className="p-8 flex gap-6">
                <div className="text-4xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-2xl font-bold text-navy mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-text-light">{feature.description}</p>
                </div>
              </Card>
            </AnimatedFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
