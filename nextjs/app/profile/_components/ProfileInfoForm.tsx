"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import SepoliaJSON from "../../../utils/sepolia.json";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { useParticleProvider } from "@particle-network/connect-react-ui";

const ProfileInfoForm = () => {
  const ParticleProvider = useParticleProvider();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [walletAddress, setWalletAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("1234 Main St, Anytown, USA");

  useEffect(() => {
    const fetchWalletAddress = async () => {
      const customProvider = new ethers.providers.Web3Provider(ParticleProvider as ExternalProvider | JsonRpcFetchFunc);
      const signer = customProvider.getSigner();
      const msgSenderAddress = await signer.getAddress();
      setWalletAddress(msgSenderAddress);
    };

    fetchWalletAddress();
  }, [ParticleProvider]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const customProvider = new ethers.providers.Web3Provider(ParticleProvider as ExternalProvider | JsonRpcFetchFunc);
    const signer = customProvider.getSigner();
    const msgSenderAddress = await signer.getAddress();

    const createUserPayload = {
      "method": "create_user",
      name: name,
      userAddress: msgSenderAddress,
      email: email,
    };

    console.log("JSON:", createUserPayload);

    const payloadBytes = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(JSON.stringify(createUserPayload)));

    console.log("createOrderPayload:", payloadBytes);

    const appContractAddress = "0x92Df6c726f8963D564c316b5b91f0A07ED443Ba7";

    const InputBoxAddress = "0x59b22D57D4f067708AB0c00552767405926dc768";
    const InputBoxABI = SepoliaJSON.contracts.InputBox.abi;

    const InputBoxContract = new ethers.Contract(InputBoxAddress, InputBoxABI, signer);

    const transaction = await InputBoxContract.addInput(appContractAddress, payloadBytes);

    await transaction.wait();
    setEditMode(false);
  };

  const EditButton = () => (
    <button type="button" onClick={() => setEditMode(true)} className="btn btn-sm mt-2">
      Edit ✏️
    </button>
  );

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4">
        <h1 className="text-3xl sm:text-4xl text-gradient pt-10 pb-4">Account</h1>
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-grow flex-col justify-start items-start p-8 gap-4 blue-glassmorphism rounded-3xl shadow-md shadow-secondary border border-base-300 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
              {editMode ? (
                <>
                  <div>
                    <label className="text-md font-bold">Name</label>
                    <div className="flex border-2 border-base-300 rounded-full text-accent w-full">
                      <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-md font-bold">Email</label>
                    <div className="flex border-2 border-base-300 rounded-full text-accent w-full">
                      <input
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-md font-bold">Wallet Address</label>
                    <div className="flex border-2 border-base-300 rounded-full text-accent w-full">
                      <input
                        value={walletAddress}
                        readOnly
                        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-md font-bold">Delivery Address</label>
                    <div className="flex border-2 border-base-300 rounded-full text-accent w-full">
                      <textarea
                        value={deliveryAddress}
                        onChange={e => setDeliveryAddress(e.target.value)}
                        className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 py-1 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <button type="submit" className="btn btn-secondary btn-sm">
                      Create User / Update Account 💾
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-1">
                  <label className="text-md font-bold">Name</label>
                  <div className="flex flex-row items-center input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400 min-h-10">{`${name}`}</div>
                  <label className="text-md font-bold mt-2">Email</label>
                  <div className="flex flex-row items-center input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400 min-h-10">{`${email}`}</div>
                  <label className="text-md font-bold mt-2">Wallet Address</label>
                  <div className="flex flex-row items-center input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400 min-h-10">{`${walletAddress}`}</div>
                  <label className="text-md font-bold mt-2">Delivery Address</label>
                  <div className="flex flex-row items-center input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400 min-h-10">{`${deliveryAddress}`}</div>
                  {!editMode && <EditButton />}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoForm;
