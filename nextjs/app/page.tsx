"use client";

import ActionSections from "./home/ActionSections";
import MainContent from "./home/MainContent";
import MarketplaceHighlights from "./home/MarketplaceHighlights";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow">
        <MainContent />
        <ActionSections />
        <MarketplaceHighlights />
      </div>
    </>
  );
};

export default Home;
