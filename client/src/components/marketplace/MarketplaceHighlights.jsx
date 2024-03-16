import React from 'react';
import { mockNFTs } from "../../utils/mockNFTs";
import NFTCard from './NFTCard';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MarketplaceHighlights = () => {
  const navigate = useNavigate();
  const latestNFTs = [...mockNFTs].reverse().slice(0, 4);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gradient-bg-marketplacehl">
      <h1 className="text-white text-3xl sm:text-5xl py-2 text-center text-gradient">
        Latest NFT Collections
      </h1>
      {/* Flex container for the grid and button */}
      <div className="flex items-center justify-center w-full my-8">
        <div className="grid grid-cols-4 gap-4 justify-center items-center">
          {latestNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              nftItem={nft}
              title="Latest Collection"
              listings={[]}
            />
          ))}
        </div>
        <button 
          className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-full cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out ml-4" 
          onClick={() => navigate('/marketplace')}
        >
          View All <FiArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default MarketplaceHighlights;
