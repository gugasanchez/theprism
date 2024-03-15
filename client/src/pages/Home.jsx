import React from 'react';
import Hero from '../components/Hero';
import Pitch from '../components/Pitch';
import MarketplaceHighlights from '../components/MarketplaceHighlights';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Hero />
      <Pitch />
      <MarketplaceHighlights />
      <Footer />
    </>
  );
};

export default Home;
