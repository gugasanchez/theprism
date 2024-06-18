"use client";

import React, { useEffect, useState } from "react";
import NFTCard from "../../../components/NFTCard";
import NFTFactoryJSON from "../../../utils/NFTFactory.json";
import designApi, { Design } from "../../../utils/designApi";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { useParticleProvider } from "@particle-network/connect-react-ui";
import { ethers } from "ethers";

const Designs = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0); // Assuming 100 as an example balance
  const ParticleProvider = useParticleProvider();

  useEffect(() => {
    const fetchDesigns = async () => {
      setIsLoading(true); // Start loading
      try {
        const allDesigns = await designApi.getDesigns();
        const shuffled = allDesigns.sort(() => 0.5 - Math.random());
        setDesigns(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch designs:", error);
      }
      setIsLoading(false); // End loading
    };

    fetchDesigns();
  }, []);

  const LoadingPlaceholder = () => (
    <div className="animate-pulse flex flex-wrap justify-center items-center gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="w-[14rem] h-[22rem] my-5 mx-5 rounded-2xl bg-gray-300">
          <div className="h-64 bg-gray-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  const withdrawRoyalties = async () => {
    console.log("Withdrawing royalties...");

    const customProvider = new ethers.providers.Web3Provider(ParticleProvider as ExternalProvider | JsonRpcFetchFunc);
    const signer = customProvider.getSigner();

    const NFTFactoryAddress = "0x869181609CD5A911aE43d695A03A38bba5F74A01";

    const NFTFactoryAbi = NFTFactoryJSON.abi;

    const NFTFactoryContract = new ethers.Contract(NFTFactoryAddress, NFTFactoryAbi, signer);

    const tx_2 = await NFTFactoryContract.withdrawUSDT();

    await tx_2.wait();

    setBalance(0);
  };

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4 py-10">
        <h1 className="text-3xl sm:text-4xl text-gradient pb-4">My Designs (NFTs)</h1>
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <div className="justify-between items-center flex flex-grow flex-col p-8 gap-4 blue-glassmorphism rounded-3xl shadow-md shadow-secondary border border-base-300 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-start">
              {designs.map(design => (
                <NFTCard
                  key={design._id}
                  nftItem={{
                    id: design._id,
                    image: `data:image/jpeg;base64,${Buffer.from(design.image.data).toString("base64")}`,
                    name: design.prompt,
                    likes: 10,
                  }}
                  title="Design Collection"
                  listings={[]}
                />
              ))}
            </div>
            <div className="mt-8 w-full flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-white mb-4 shadow-md">Royalty Balance: {balance} USDT</h2>{" "}
              <button
                onClick={withdrawRoyalties}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Withdraw Royalties
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Designs;
