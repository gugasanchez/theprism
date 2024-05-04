"use client";

import React from "react";
import NFTGrid from "./_components/NFTGrid";

const Marketplace = () => {
  return (
    <div className="mx-auto w-[80%] pt-[120px] flex flex-col items-center justify-center">
      <h1 className="text-3xl sm:text-5xl">Choose a Design!</h1>
      <p className="text-lg sm:text-xl my-4 text-center">
        Select a design from the marketplace to produce your own t-shirt.
      </p>
      <NFTGrid />
    </div>
  );
};

export default Marketplace;
