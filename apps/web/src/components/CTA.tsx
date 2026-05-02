import { Button } from 'ui';

export default function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-navy via-blue to-teal">
      <div className="container-tight text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          Ready to Get Started?
        </h2>

        <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Join thousands of customers and providers already using Pronto.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-blue hover:bg-light-bg sm:min-w-max"
          >
            Find Services Now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10 sm:min-w-max"
          >
            Apply as Provider
          </Button>
        </div>

        <p className="text-blue-100 mt-8">
          No credit card required. Start for free.
        </p>
      </div>
    </section>
  );
}
