"use client";

import ArtGenerator from "./ArtGenerator";
import Hero from "./Hero";

const MainContent = () => {
  return (
    <div className="flex flex-grow flex-col items-center w-full pt-32 pb-20 gradient-bg-welcome">
      <div className="flex sm:flex-row flex-col sm:items-start items-center sm:justify-start justify-start">
        <Hero />
        <ArtGenerator />
      </div>
    </div>
  );
};

export default MainContent;
