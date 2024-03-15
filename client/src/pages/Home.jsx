import React from 'react';
import Hero from '../components/hero/Hero';
import ArtGenerator from '../components/hero/ArtGenerator';
import Pitch from '../components/Pitch';
import MarketplaceHighlights from '../components/marketplace/MarketplaceHighlights';

const Home = () => {
  return (
    <>
      <div className="w-full h-[500px] flex md:justify-center justify-between items-center flex-row gradient-bg-welcome">
        <Hero />
        <ArtGenerator />
      </div>
      <Pitch />
      <MarketplaceHighlights />
    </>
  );
};

export default Home;
