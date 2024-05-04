"use client";

import React, { useEffect, useState } from "react";
import NFTCard from "../../../components/NFTCard";
import designApi, { Design } from "../../../utils/designApi";

const NFTGrid = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDesigns = async () => {
      setIsLoading(true); // Start loading
      try {
        const fetchedDesigns = await designApi.getDesigns();
        setDesigns(fetchedDesigns);
      } catch (error) {
        console.error("Failed to fetch designs:", error);
      }
      setIsLoading(false); // End loading
    };

    fetchDesigns();
  }, []);

  const imageToBase64 = (imageData: number[]) => {
    return btoa(String.fromCharCode(...new Uint8Array(imageData)));
  };

  const LoadingPlaceholder = () => (
    <div className="animate-pulse flex flex-wrap justify-center items-center gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="w-[14rem] h-[22rem] my-5 mx-5 rounded-2xl bg-gray-300">
          <div className="h-64 bg-gray-300 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col justify-between items-center w-full py-4 px-2">
      {isLoading ? (
        <LoadingPlaceholder />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center items-start">
          {designs.map(design => (
            <NFTCard
              key={design._id}
              nftItem={{
                id: design._id,
                image: `data:image/jpeg;base64,${imageToBase64(design.image.data)}`,
                name: design.prompt,
                likes: 10,
              }}
              title="Design Collection"
              listings={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NFTGrid;
