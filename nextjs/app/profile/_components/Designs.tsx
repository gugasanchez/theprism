"use client";

import React, { useEffect, useState } from "react";
import NFTCard from "../../../components/NFTCard";
import SepoliaJSON from "../../../utils/sepolia.json";
import designApi, { Design } from "../../../utils/designApi";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { useParticleProvider } from "@particle-network/connect-react-ui";
import { BigNumber, ethers } from "ethers";
import { useVouchersQuery } from "../../../src/generated/graphql";

type Voucher = {
  id: string;
  index: number;
  destination: string;
  input: any; // {index: number; epoch: {index: number; }}
  payload: string;
  proof: any;
  executed: any;
};

const Designs = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState(0); // Assuming 100 as an example balance
  const ParticleProvider = useParticleProvider();

  const [result, reexecuteQuery] = useVouchersQuery();
  const { data, fetching, error } = result;
  const [voucherToExecute, setVoucherToExecute] = React.useState<any>();

  useEffect(() => {
    const fetchDesigns = async () => {
      setIsLoading(true); // Start loading
      try {
        const allDesigns = await designApi.getDesigns();
        const shuffled = allDesigns.sort(() => 0.5 - Math.random());
        setDesigns(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch designs:", error);
      }
      setIsLoading(false); // End loading
    };

    fetchDesigns();
  }, []);

  useEffect(() => {
    if (!fetching && data && data.vouchers) {
      getUserVoucher();
    }
  }, [fetching, data]);

  const getUserVoucher = async () => {
    const USDTAddress = "0xD1A65309dF5AA03b7De9A95D1b6C8496Aff94Aa1";
    const customProvider = new ethers.providers.Web3Provider(
      ParticleProvider as ExternalProvider | JsonRpcFetchFunc
    );
    const signer = customProvider.getSigner();
    const userAddress = (await signer.getAddress()).toLowerCase().slice(2); // Remove '0x' and convert to lowercase

    try {
      if (data && data.vouchers.edges.length > 0) {
        const voucher = data.vouchers.edges.find(
          ({ node }: any) =>
            node.destination.toLowerCase() === USDTAddress.toLowerCase() &&
            node.payload.toLowerCase().includes(userAddress)
        );

        if (voucher) {
          setVoucherToExecute(voucher.node);
        } else {
          console.error("Voucher not found");
        }
      }
    } catch (error) {
      console.error("Error fetching voucher:", error);
    }
  };

  const withdrawRoyalties = async (voucher: Voucher) => {
    console.log("Trying to execute voucher...");

    const CartesiDAPPAddress = SepoliaJSON.contracts.ApplicationFactory.address;
    const CartesiDAPPABI = SepoliaJSON.contracts.ApplicationFactory.abi;

    try {
      const customProvider = new ethers.providers.Web3Provider(
        ParticleProvider as ExternalProvider | JsonRpcFetchFunc
      );
      const signer = customProvider.getSigner();
      const CartesiDAPPContract = new ethers.Contract(CartesiDAPPAddress, CartesiDAPPABI, signer);

      const transaction = await CartesiDAPPContract.executeVoucher(voucher.destination, voucher.payload, voucher.proof);
      await transaction.wait();

      console.log("Voucher executed successfully.");
      setBalance(0);
    } catch (error) {
      console.error("Error executing voucher:", error);
    }
  };

  const askForWithdraw = async () => {
    console.log("Withdrawing royalties...");

    const createWithdrawPayload = {
      method: "erc20_withdraw",
    };

    const payloadBytes = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(JSON.stringify(createWithdrawPayload)));

    const appContractAddress = "0x92Df6c726f8963D564c316b5b91f0A07ED443Ba7";
    const InputBoxAddress = "0x59b22D57D4f067708AB0c00552767405926dc768";

    const customProvider = new ethers.providers.Web3Provider(
      ParticleProvider as ExternalProvider | JsonRpcFetchFunc
    );
    const signer = customProvider.getSigner();

    const InputBoxABI = SepoliaJSON.contracts.InputBox.abi;

    const InputBoxContract = new ethers.Contract(InputBoxAddress, InputBoxABI, signer);

    const transaction = await InputBoxContract.addInput(appContractAddress, payloadBytes);

    await transaction.wait();

    setBalance(0);
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
    <div className="flex flex-col flex-1 items-center">
      <div className="flex flex-col items-start sm:w-[70%] w-full sm:px-0 px-4 py-10">
        <h1 className="text-3xl sm:text-4xl text-gradient pb-4">My Designs (NFTs)</h1>
        {isLoading ? (
          <LoadingPlaceholder />
        ) : (
          <div className="justify-between items-center flex flex-grow flex-col p-8 gap-4 blue-glassmorphism rounded-3xl shadow-md shadow-secondary border border-base-300 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-center items-start">
              {designs.map((design, index) => (
                <NFTCard
                  key={design._id}
                  index={index}
                  nftItem={{
                    id: design._id,
                    image: `data:image/jpeg;base64,${Buffer.from(design.image.data).toString("base64")}`,
                    name: design.prompt,
                    likes: 10,
                  }}
                  title="Design Collection"
                  listings={[]}
                />
              ))}
            </div>
            <div className="mt-8 w-full flex flex-col items-center justify-center">
              <h2 className="text-2xl font-semibold text-white mb-4 shadow-md">Withdraw your royalties.</h2>
              <p className="text-sm text-gray-400 mb-4">After requesting the withdrawal, you must wait 7 days for it to be approved and you can press the Withdraw Royalties button.</p>
              <div className="flex space-x-4">
                <button
                  onClick={askForWithdraw}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Ask for Withdraw Royalties
                </button>
                <button
                  onClick={() => withdrawRoyalties(voucherToExecute)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Withdraw Royalties
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Designs;
