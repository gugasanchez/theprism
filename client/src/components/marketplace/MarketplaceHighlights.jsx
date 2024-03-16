import React from 'react';
import { mockNFTs } from "../../utils/mockNFTs";
import NFTCard from './NFTCard';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const MarketplaceHighlights = () => {
  const navigate = useNavigate();
  const latestNFTs = [...mockNFTs].reverse().slice(0, 5);

  return (
    <div className="flex py-[6rem] gradient-bg-marketplacehl">
      <div className="flex flex-grow flex-col items-start justify-start sm:px-36 px-6">
        <h1 className="text-white text-3xl sm:text-5xl text-gradient">
          Latest NFT Collections
        </h1>
        {/* Flex container for the grid and button */}
        <div className="flex items-center justify-center w-full my-8">
          <div className="grid grid-cols-5 gap-4 justify-center items-center">
            {latestNFTs.map((nft) => (
              <NFTCard
                key={nft.id}
                nftItem={nft}
                title="Latest Collection"
                listings={[]}
              />
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 ml-4">
            <button 
              className="flex items-center justify-center bg-blue-500 text-white py-2 px-2 rounded-full cursor-pointer hover:bg-blue-700 transition duration-300 ease-in-out" 
              onClick={() => navigate('/marketplace')}
            >
              <FiArrowRight className="" />
            </button>
            <p className="text-center text-white text-sm">
              View All
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceHighlights;


/*
      <div className="flex space-between pt-[15rem] gradient-bg-welcome">
        <div className="flex flex-grow flex-row space-between items-start justify-around px-10">
*/