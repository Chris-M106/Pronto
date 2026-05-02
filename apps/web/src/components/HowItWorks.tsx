import { Card, AnimatedFadeIn } from 'ui';

interface Step {
  number: number;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Book',
    description: 'Search for services, select a provider, and book a time slot that works for you.',
  },
  {
    number: 2,
    title: 'Accept',
    description: 'Your provider confirms the booking and prepares for the job.',
  },
  {
    number: 3,
    title: 'Complete',
    description: 'Service provider arrives and completes the work on time.',
  },
  {
    number: 4,
    title: 'Review',
    description: 'Rate your experience and provider reviews improve their rating.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            How It Works
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Simple, transparent, and hassle-free from start to finish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <AnimatedFadeIn key={step.number} delay={idx * 150}>
              <Card className="relative p-6 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-gradient-navy-blue text-white flex items-center justify-center font-bold text-2xl mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-text-light">{step.description}</p>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-1 bg-blue/20"></div>
                )}
              </Card>
            </AnimatedFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
