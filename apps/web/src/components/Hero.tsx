import { Button } from 'ui';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy via-blue to-teal">
      <div className="container-tight text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Home Services,{' '}
          <span className="text-amber">Made Simple</span>
        </h1>

        <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Connect with verified service providers for plumbing, electrical work, painting, and more. Book online, pay securely, and get it done.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-blue hover:bg-light-bg"
          >
            Find Services
          </Button>
          <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
            Become a Provider
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber">2,500+</div>
            <div className="text-blue-100 mt-2">Verified Providers</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber">15K+</div>
            <div className="text-blue-100 mt-2">Completed Jobs</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-amber">4.9★</div>
            <div className="text-blue-100 mt-2">Avg Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}
