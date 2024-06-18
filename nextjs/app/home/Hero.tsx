"use client";

import React from "react";
import { ConnectButton } from "@particle-network/connect-react-ui";
import "@particle-network/connect-react-ui/dist/index.css";

const Hero: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center px-4">
      <div className="flex flex-col max-w-[600px] items-start justify-start gap-2">
        <h1 className="text-3xl sm:text-5xl text-gradient">
          Create your unique art. <br /> Make it your own t-shirt.
        </h1>
        <p className="text-left font-light text-lg my-0">
          Make your ideas the art you always dreamed about with our AI tool. <br />
          Then, easily bring those designs to life through expert producers.
        </p>
        <div className="mt-4">
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;
