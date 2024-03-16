import React from 'react';
import NFTCard from './NFTCard';
import { mockNFTs } from "../../utils/mockNFTs";

const NFTGrid = () => {
  return (
    // Use mx-auto to center the grid and justify-center to center grid items within the grid
    <div className="mx-auto w-[90%] pt-[120px] flex flex-col items-center justify-center">
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
  );
};

export default NFTGrid;
