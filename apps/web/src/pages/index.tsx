import Head from 'next/head';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import PricingTiers from '../components/PricingTiers';
import EarningsChart from '../components/EarningsChart';
import Reviews from '../components/Reviews';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pronto - Home Services Marketplace</title>
        <meta
          name="description"
          content="Find trusted service providers for plumbing, electrical, painting, and more. Book online, pay securely."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>

      <main className="overflow-x-hidden">
        <Navigation />
        <Hero />
        <ServicesGrid />
        <HowItWorks />
        <Features />
        <PricingTiers />
        <EarningsChart />
        <Reviews />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
