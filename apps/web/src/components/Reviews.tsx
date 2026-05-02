import { Card, Avatar, AnimatedFadeIn } from 'ui';

interface Review {
  name: string;
  role: string;
  content: string;
  rating: number;
  initials: string;
}

const reviews: Review[] = [
  {
    name: 'Maria Silva',
    role: 'Homeowner',
    content: 'Found a plumber within 2 hours. Fixed my leak for €180. Great experience, would definitely use again!',
    rating: 5,
    initials: 'MS',
  },
  {
    name: 'João Costa',
    role: 'Service Provider',
    content: 'As a painter, Pronto has been a game changer. Steady bookings and fair rates. Earning €1,200/month consistently.',
    rating: 5,
    initials: 'JC',
  },
  {
    name: 'Ana Santos',
    role: 'Homeowner',
    content: 'Transparent pricing, professional electrician, and instant confirmation. This is how home services should work!',
    rating: 5,
    initials: 'AS',
  },
];

function StarRating({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-amber">
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container-tight">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-navy mb-4">
            Loved by Customers & Providers
          </h2>
          <p className="text-xl text-text-light max-w-2xl mx-auto">
            Real reviews from real people using Pronto every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <AnimatedFadeIn key={review.name} delay={idx * 150}>
              <Card hover className="p-6 flex flex-col">
                <StarRating rating={review.rating} className="mb-4" />

                <p className="text-text-dark mb-6 flex-1 leading-relaxed">
                  "{review.content}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Avatar initials={review.initials} size="md" alt={review.name} />
                  <div>
                    <div className="font-semibold text-text-dark">
                      {review.name}
                    </div>
                    <div className="text-sm text-text-light">{review.role}</div>
                  </div>
                </div>
              </Card>
            </AnimatedFadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
