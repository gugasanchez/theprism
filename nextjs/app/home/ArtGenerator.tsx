import React, { useState } from "react";
import Image from "next/image";
import NFTFactoryJSON from "../../utils/NFTFactory.json";
import designApi, { Design } from "../../utils/designApi";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { useParticleProvider } from "@particle-network/connect-react-ui";
import { ethers } from "ethers";

const ArtGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [latestDesign, setLatestDesign] = useState<Design | null>(null);
  const ParticleProvider = useParticleProvider();

  const handleSubmit = async () => {
    setLoading(true); // Start loading
    setShowResult(true); // Immediately show result area
    try {
      // Create a new design with the provided prompt
      await designApi.createDesign(prompt);
      // After creating, fetch the latest design to update the UI
      const designs = await designApi.getDesigns();
      const newLatestDesign = designs[designs.length - 1];
      setLatestDesign(newLatestDesign);
    } catch (error) {
      console.error("Failed to create or fetch designs", error);
    }
    setLoading(false); // End loading
  };

  // Helper function to convert image data to base64 string
  const imageToBase64 = (imageData: number[]) => {
    return btoa(String.fromCharCode(...new Uint8Array(imageData)));
  };

  const handleGenerateNFT = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const imageUrl =
      "https://img.freepik.com/fotos-premium/uma-camisa-branca-com-fundo-preto-e-as-costas_653449-538.jpg";
    const NFTFactoryAddress = "0x869181609CD5A911aE43d695A03A38bba5F74A01";
    const customProvider = new ethers.providers.Web3Provider(ParticleProvider as ExternalProvider | JsonRpcFetchFunc);
    const signer = customProvider.getSigner();

    const NFTFactoryABI = NFTFactoryJSON.abi;

    const NFTFactoryContract = new ethers.Contract(NFTFactoryAddress, NFTFactoryABI, signer);

    const transaction = await NFTFactoryContract.mintTo(imageUrl);

    await transaction.wait();

    console.log("Generate NFT");
  };

  const LoadingPlaceholder = () => (
    <div className="animate-pulse flex flex-col items-center justify-center h-40 w-full blue-glassmorphism rounded-lg">
      <div className="text-lg text-gray-500">Your art is being created...</div>
    </div>
  );

  return (
    <div className="flex flex-col sm:min-w-[700px] items-center justify-center sm:px-5 px-2">
      <div className="blue-glassmorphism rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col p-5 w-full">
        <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
          <p className="font-medium my-0 break-words">AI Art Generator</p>
          <div className="flex flex-row items-center gap-1.5 w-full">
            <div className="flex border-2 border-base-300 blue-glassmorphism rounded-full text-accent w-full">
              <input
                className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                placeholder="Describe your art idea"
                onChange={e => setPrompt(e.target.value)}
                value={prompt}
              />
            </div>
            <button type="button" onClick={handleSubmit} className="btn btn-secondary btn-sm">
              Create Art ✨
            </button>
          </div>
        </div>
      </div>
      {showResult && (
        <div className="w-full mt-4 flex flex-col items-center gap-4">
          {loading ? (
            <LoadingPlaceholder />
          ) : latestDesign ? (
            <div className="flex flex-col items-center w-full blue-glassmorphism shadow-lg image-full">
              <div className="card-body p-6">
                <figure>
                  <Image
                    src={`data:image/jpeg;base64,${imageToBase64(latestDesign.image.data)}`}
                    alt="Generated Art"
                    width={200}
                    height={200}
                    objectFit="cover"
                  />
                </figure>
              </div>
            </div>
          ) : (
            <div>No art generated yet.</div>
          )}
          <div className="flex flex-col items-end justify-end">
            <button type="button" onClick={handleGenerateNFT} className="btn btn-secondary btn-sm shadow-xl">
              Save & Generate NFT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtGenerator;
