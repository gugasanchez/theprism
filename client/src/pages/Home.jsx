import React from 'react';
import Hero from '../components/hero/Hero';
import ArtGenerator from '../components/hero/ArtGenerator';
import Pitch from '../components/Pitch';
import MarketplaceHighlights from '../components/marketplace/MarketplaceHighlights';

const Home = () => {
  return (
    <>
      <div className="flex space-between pt-[15rem] gradient-bg-welcome">
        <div className="flex flex-grow flex-row space-between items-start justify-around px-10">
          <Hero />
          <ArtGenerator />
        </div>
      </div>
      <Pitch />
      <MarketplaceHighlights />
    </>
  );
};

export default Home;
