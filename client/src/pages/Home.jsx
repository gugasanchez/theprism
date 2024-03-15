import React from 'react';
import Hero from '../components/hero/Hero';
import ArtGenerator from '../components/hero/ArtGenerator';
import Pitch from '../components/Pitch';
import MarketplaceHighlights from '../components/marketplace/MarketplaceHighlights';

const Home = () => {
  return (
    <>
      <div className='flex flex-row'>
        <Hero />
        <ArtGenerator />
      </div>
      <Pitch />
      <MarketplaceHighlights />
    </>
  );
};

export default Home;
