import Head from 'next/head';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Hero from '../components/Hero';
import Ribbon from '../components/Ribbon';
import Services from '../components/Services';
import HowItWorks from '../components/HowItWorks';
import Features from '../components/Features';
import Tiers from '../components/Tiers';
import Earnings from '../components/Earnings';
import Estimator from '../components/Estimator';
import Reviews from '../components/Reviews';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      <Head>
        <title>Pronto — Your neighbourhood, handled.</title>
        <meta
          name="description"
          content="Vetted local tradespeople, transparent pricing, and full payment protection. Live in Lisbon and Porto."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
      </Head>
      <div style={{ fontFamily: 'Inter,system-ui,sans-serif', overflowX: 'hidden' }}>
        <Nav scrolled={scrolled} />
        <Hero />
        <Ribbon />
        <Services />
        <HowItWorks />
        <Features />
        <Tiers />
        <Earnings />
        <Estimator />
        <Reviews />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
