import React from "react";
import '@particle-network/connect-react-ui/dist/index.css';
import ConnectWalletButton from '../ConnectWalletButton'; // Adjust the import path based on your file structure

const Hero = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="flex flex-col max-w-[600px] items-start justify-start">
        <h1 className="text-3xl sm:text-5xl text-white text-gradient">
          Create your unique art. <br /> Make it your own t-shirt.
        </h1>
        <p className="text-left mt-5 text-white font-light text-lg">
          Make your ideas the art you always dreamed about with our AI tool. <br />
          Then, easily bring those designs to life through expert producers.
        </p>
        <div className="mt-4">
            <ConnectWalletButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;
