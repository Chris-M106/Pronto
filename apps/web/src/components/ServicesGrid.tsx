import { Card, Badge, AnimatedFadeIn } from 'ui';

interface Service {
  id: string;
  name: string;
  price: number;
  icon: string;
  description: string;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Plumbing',
    price: 55,
    icon: '🔧',
    description: 'Leak repairs, pipe installation, fixture maintenance',
  },
  {
    id: '2',
    name: 'Electrical',
    price: 60,
    icon: '⚡',
    description: 'Wiring, outlet installation, circuit breaker repair',
  },
  {
    id: '3',
    name: 'Painting',
    price: 45,
    icon: '🎨',
    description: 'Interior, exterior, touch-ups, and full room painting',
  },
  {
    id: '4',
    name: 'HVAC',
    price: 70,
    icon: '❄️',
    description: 'AC repair, heating installation, maintenance',
  },
  {
    id: '5',
    name: 'Carpentry',
    price: 65,
    icon: '🪚',
    description: 'Shelving, doors, cabinets, and custom work',
  },
  {
    id: '6',
    name: 'Cleaning',
    price: 40,
    icon: '🧹',
    description: 'Deep cleaning, move-in/out, specialized services',
  },
];

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-light-bg">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Services We Cover
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            From quick fixes to major projects, we have verified professionals for every job.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <AnimatedFadeIn key={service.id} delay={idx * 100}>
              <Card hover className="h-full flex flex-col p-6">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-navy mb-2">
                  {service.name}
                </h3>
                <Badge variant="primary" className="w-fit mb-3">
                  €{service.price}/hour
                </Badge>
                <p className="text-text-light">{service.description}</p>
              </Card>
            </AnimatedFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
