import React from "react";
import { AiOutlineCloudSync } from 'react-icons/ai';
import { MdOutlineVerifiedUser } from 'react-icons/md';
import { FaTshirt } from 'react-icons/fa';

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-col justify-center items-center white-glassmorphism py-8 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="flex flex-col flex-1 items-center gap-2 mt-2">
      <h3 className="mt-2 text-white text-lg text-center">{title}</h3>
      <p className="mt-1 mx-0 text-white text-sm w-[80%] text-center">
        {subtitle}
      </p>
    </div>
  </div>
);

const Pitch = () => (
  <div className="flex w-full justify-center pt-[4rem] items-center gradient-bg-pitch">
    <div className="flex w-[95%] flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex flex-1 flex-col justify-start items-center mx-auto">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-center text-gradient ">
          Revolutionizing Digital
          <br />
          Art and Fashion
        </h1>
        <p className="text-center my-2 text-white font-light sm:w-1/2 w-full text-md px-4">
          Dive into the future where creativity meets blockchain. Generate and turn your AI-powered art into NFTs, 
          then wear your innovation with custom-designed t-shirts. Embrace the synergy of digital artistry and 
          tangible fashion on the Cartesi blockchain.
        </p>

      </div>

      <div className="flex-1 flex flex-row justify-center mt-5">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Innovative Art Creation"
          icon={<AiOutlineCloudSync fontSize={21} className="text-white" />}
          subtitle="Harness AI to create art directly on-chain with Cartesi, setting a new standard for digital creativity."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Ownership & Royalties"
          icon={<MdOutlineVerifiedUser fontSize={21} className="text-white" />}
          subtitle="Secure your art as NFTs with transparent ownership and royalties, fostering a fair ecosystem for creators."
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Wearable Art"
          icon={<FaTshirt fontSize={21} className="text-white" />}
          subtitle="Transform digital creations into tangible fashion, bringing the virtual closer to the physical world."
        />
      </div>
    </div>
  </div>
);

export default Pitch;
