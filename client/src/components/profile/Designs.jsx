import React, { useState } from 'react';
import NFTCard from "../marketplace/NFTCard";
import { mockNFTs } from "../../utils/mockNFTs";

const Designs = () => {
  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4 py-10">
        <h1 className="text-3xl font-bold text-white pb-4">My Designs (NFTs)</h1>
        <div className="flex flex-col justify-between items-center w-full blue-glassmorphism py-8 px-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-start">
          {mockNFTs.slice(0, 4).map((nft) => (
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
    </div>
  );
};

export default Designs;