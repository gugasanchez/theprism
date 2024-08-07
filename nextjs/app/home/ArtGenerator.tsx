import React, { useState } from "react";
import Image from "next/image";
import { Design } from "../../utils/designApi";
import SepoliaJSON from "../../utils/sepolia.json";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { useParticleProvider } from "@particle-network/connect-react-ui";
import axios from "axios";
import { ethers } from "ethers";

const ArtGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const ParticleProvider = useParticleProvider();
  const [imageData, setImageData] = useState<Design["image"] | null>(null);
  const [ipfsUri, setIpfsUri] = useState<string | null>(null);
  const [hex, setHex] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    setShowResult(true);
    setLoading(true);
    console.log("Generating image with prompt: ", prompt);
    try {
      const response = await axios.post("/api/generateImage", { prompt });
      const { uri, json, hex, design } = response.data;
      setImageData(design.image);
      setIpfsUri(uri);
      setHex(hex);
      console.log("IPFS URI: " + uri);
      console.log("JSON: " + json);
      console.log("HEX: " + hex);
      console.log("Design: ", design);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNFT = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!hex) {
      console.error("Hex data is not set");
      return;
    }

    const customProvider = new ethers.providers.Web3Provider(ParticleProvider as ExternalProvider | JsonRpcFetchFunc);
    const signer = customProvider.getSigner();
    const msgSenderAddress = await signer.getAddress();

    const createDesignPayload = {
      method: "create_design",
      prompt: prompt,
      userAddress: msgSenderAddress,
      uri: ipfsUri,
    };

    console.log("JSON:", createDesignPayload);

    const payloadBytes = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(JSON.stringify(createDesignPayload)));

    console.log("createOrderPayload:", payloadBytes);

    const appContractAddress = "0x92Df6c726f8963D564c316b5b91f0A07ED443Ba7";

    const InputBoxAddress = "0x59b22D57D4f067708AB0c00552767405926dc768";
    const InputBoxABI = SepoliaJSON.contracts.InputBox.abi;

    const InputBoxContract = new ethers.Contract(InputBoxAddress, InputBoxABI, signer);

    const transaction = await InputBoxContract.addInput(appContractAddress, payloadBytes);

    await transaction.wait();
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
            <button type="button" onClick={handleGenerateImage} className="btn btn-secondary btn-sm">
              {loading ? "Generating..." : "Create Art ✨"}
            </button>
          </div>
        </div>
      </div>
      {showResult && (
        <div className="w-full mt-4 flex flex-col items-center gap-4">
          {loading ? (
            <LoadingPlaceholder />
          ) : imageData ? (
            <div className="flex flex-col items-center w-full blue-glassmorphism shadow-lg image-full">
              <div className="card-body m-6 w-full max-w-[300px] h-[300px] relative">
                {" "}
                {/* Adjusted container size */}
                <Image
                  src={`data:image/jpeg;base64,${Buffer.from(imageData.data).toString("base64")}`}
                  alt="Generated"
                  layout="fill"
                  objectFit="contain"
                />
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
