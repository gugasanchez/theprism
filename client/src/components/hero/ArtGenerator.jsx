import React, { useState } from 'react';
import Art from "../../utils/dog_and_cat.png";

const ArtGenerator = () => {
  const [showResult, setShowResult] = useState(false);
  const [art, setArt] = useState(false);
  const [showLoadingText, setShowLoadingText] = useState(true); // State to manage loading text visibility

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
    setShowLoadingText(true); // Show loading text initially
    setArt(!art);
    setTimeout(() => {
      setShowLoadingText(false);
    }, 3000);
  };

  const handleGenerateNFT = (e) => {
    e.preventDefault();
    console.log("Generate NFT");
  };

  return (
    <>
      <div className="flex flex-col sm:min-w-[700px]">
        <div className="flex flex-1 flex-row justify-center items-center p-5 gap-4 blue-glassmorphism">
          <input
            placeholder="Describe your art idea"
            type="text"
            className="w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
          />
          { art ? (
            <button
              type="button"
              className="text-white w-60 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              Regenerate Art
            </button>
            ) : (
              <button
              type="button"
              onClick={handleSubmit}
              className="text-white w-40 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Create Art
              </button>
          )}
        </div>
        {showResult && (
          <div className="w-full mt-4 flex flex-col justify-start items-center gap-4">
            <div className="p-5 w-full flex flex-col justify-start items-center min-h-[300px] blue-glassmorphism">
              {/* Show loading text or the image based on `showLoadingText` state */}
              {showLoadingText ? (
                <p className="text-white font-light text-sm">
                  Your art is being created...
                </p>
              ) : (
                <img src={Art} alt="Your art is being created..." style={{ width: '400px' }} />
              )}
            </div>
            <div className="flex w-full justify-end px-5">
              <button
                type="button"
                onClick={handleGenerateNFT}
                className="bg-[#2952e3] py-2 px-6 text-md rounded-full text-white cursor-pointer hover:bg-[#2546bd]"
              >
                Save & Generate NFT
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ArtGenerator;