import React from 'react';
import NFTCard from './NFTCard';
import { mockNFTs } from "../../utils/mockNFTs";

const NFTGrid = () => {
  return (
    <div className="mx-auto w-[90%] pt-[120px] flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white pb-4">Choose a Design!</h1>
      <div className="flex flex-col justify-between items-center w-full blue-glassmorphism py-8 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-start">
          {mockNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              nftItem={nft}
              title="Mock Collection"
              listings={[]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NFTGrid;
