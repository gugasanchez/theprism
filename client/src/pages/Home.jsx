import React from 'react';
import Hero from '../components/hero/Hero';
import ArtGenerator from '../components/hero/ArtGenerator';
import Pitch from '../components/Pitch';
import MarketplaceHighlights from '../components/marketplace/MarketplaceHighlights';

const Home = () => {
  return (
    <>
      <div className="flex flex-grow flex-row space-between items-start justify-center gap-20 p-4 pt-[10rem] gradient-bg-welcome">
        <Hero />
        <ArtGenerator />
      </div>
      <Pitch />
      <MarketplaceHighlights />
    </>
  );
};

export default Home;
