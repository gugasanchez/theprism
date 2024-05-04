"use client";

import { CubeIcon, GlobeAltIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const ActionSections = () => {
  return (
    <div className="flex-grow w-full gradient-bg-pitch px-8">
      <div className="flex flex-1 flex-col justify-start items-center mx-auto mt-24">
        <h1 className="text-3xl sm:text-5xl py-2 text-center text-gradient ">
          Revolutionizing Digital
          <br />
          Art and Fashion
        </h1>
        <p className="text-center my-2 font-light sm:w-1/2 w-full text-lg px-4">
          Dive into the future where creativity meets blockchain. Generate and turn your AI-powered art into NFTs, then
          wear your innovation with custom-designed t-shirts.
        </p>
      </div>
      <div className="flex justify-center items-center gap-12 flex-col sm:flex-row mt-6">
        <div className="flex flex-col white-glassmorphism px-10 py-10 text-center items-center max-w-sm rounded-3xl">
          <GlobeAltIcon className="h-8 w-8 fill-secondary" />
          <p>Harness AI to create art validated on-chain, setting a new standard for digital creativity.</p>
        </div>
        <div className="flex flex-col white-glassmorphism px-10 py-10 text-center items-center max-w-sm rounded-3xl">
          <ShieldCheckIcon className="h-8 w-8 fill-secondary" />
          <p>
            Secure your art as NFTs with transparent ownership and royalties, fostering a fair ecosystem for creators.
          </p>
        </div>
        <div className="flex flex-col white-glassmorphism px-10 py-10 text-center items-center max-w-sm rounded-3xl">
          <CubeIcon className="h-8 w-8 fill-secondary" />
          <p>Transform digital creations into tangible fashion, bringing the virtual closer to the physical world.</p>
        </div>
      </div>
    </div>
  );
};

export default ActionSections;
