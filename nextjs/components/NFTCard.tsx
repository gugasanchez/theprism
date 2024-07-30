"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import USDTJson from "../utils/USDT.json";
import SepoliaJSON from "../utils/sepolia.json";
import { ExternalProvider, JsonRpcFetchFunc } from "@ethersproject/providers";
import { useParticleProvider } from "@particle-network/connect-react-ui";
import { ethers } from "ethers";
import { HeartIcon } from "@heroicons/react/24/outline";

const style = {
  wrapper: `bg-[#273359] flex-auto w-[14rem] h-[22rem] my-5 mx-5 rounded-2xl overflow-hidden relative group shadow-xl`,
  imgContainer: `relative h-2/3 w-full overflow-hidden flex justify-center items-center`,
  nftImg: `w-full h-full object-cover transition-transform duration-300 ease-in-out`,
  details: `p-3`,
  info: `flex justify-between drop-shadow-xl`,
  infoLeft: `flex-0.6 flex-wrap`,
  collectionName: `font-semibold text-sm`,
  assetName: `font-light text-sm mt-1`,
  infoRight: `flex-0.4 text-right`,
  priceTag: `font-semibold text-sm`,
  priceValue: `flex items-center text-xl font-bold mt-2`,
  ethLogo: `h-5 mr-2`,
  likes: `text-[#8a939b] flex items-center w-full justify-start font-normal mt-1`,
  likeIcon: `text-md w-4 mr-2`,
  orderTab: `absolute bottom-0 left-0 right-0 top-auto bg-[#202225] py-5 px-2 rounded-b-2xl transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out flex flex-col justify-center items-center`,
  sizeLabel: `mr-2 self-center`,
  sizeWrapper: `flex items-center justify-center mb-5`,
  sizeSelect: `inline-block blue-glassmorphism py-1 px-3 rounded text-center cursor-pointer`,
  orderButton: `bg-blue-500 text-white py-2 px-4 rounded w-full text-lg font-medium cursor-pointer`,
  modal: `fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-10 shadow-xl`,
  modalContent: `blue-glassmorphism rounded-3xl shadow-md shadow-secondary border border-base-300 max-w-lg w-full p-6 relative`,
  closeModalButton: `blue-glassmorphism p-2 rounded-full absolute top-4 right-2 mt-2 mr-2`,
  confirmOrderButton: `bg-blue-500 text-white py-2 px-4 rounded w-full cursor-pointer`,
  addressHeader: `mt-1 mb-4 text-lg`, // New style for the header text
};

interface NFTItem {
  id: string;
  image: string;
  name: string;
  likes?: number;
}

interface Listing {
  asset: {
    id: string;
  };
  buyoutCurrencyValuePerToken: {
    displayValue: string;
  };
}

interface NFTCardProps {
  nftItem: NFTItem;
  title: string;
  listings: Listing[];
  index: number; // Add index to the props
}

const NFTCard: React.FC<NFTCardProps> = ({ nftItem, title, listings, index }) => {
  const [isListed, setIsListed] = useState(false);
  const [price, setPrice] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showApproveTransaction, setShowApproveTransaction] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [estimatedPrice, setEstimatedPrice] = useState("");

  const router = useRouter();
  const ParticleProvider = useParticleProvider();

  useEffect(() => {
    const listing = listings.find(listing => listing.asset.id === nftItem.id);
    if (listing) {
      setIsListed(true);
      setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
    }
  }, [listings, nftItem.id]);

  const toggleModal = () => setShowModal(!showModal);

  const handleEstimatePrice = async (selectedDesignIndex: number) => {
    console.log(selectedDesignIndex);

    const designId = selectedDesignIndex - 1;

    const createOrderPayload = {
      method: "create_order",
      design_id: designId,
      manufacturerAddress: "0xd76A0AaC5B0f1148158c847a47356F43e8cCaE2C",
    };

    console.log("JSON:", createOrderPayload);

    const payloadBytes = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(JSON.stringify(createOrderPayload)));
    const appContractAddress = "0x92Df6c726f8963D564c316b5b91f0A07ED443Ba7";

    const InputBoxAddress = "0x59b22D57D4f067708AB0c00552767405926dc768";
    const InputBoxABI = SepoliaJSON.contracts.InputBox.abi;

    const customProvider = new ethers.providers.Web3Provider(ParticleProvider as ExternalProvider | JsonRpcFetchFunc);
    const signer = customProvider.getSigner();

    const InputBoxContract = new ethers.Contract(InputBoxAddress, InputBoxABI, signer);

    const transaction = await InputBoxContract.addInput(appContractAddress, payloadBytes);

    await transaction.wait();

    const estimated = "40 USDT";
    setEstimatedPrice(estimated);
    setShowApproveTransaction(true);
    setShowConfirmOrder(false);
  };

  const handleApproveTransaction = async () => {
    const usdtAddress = "0xD1A65309dF5AA03b7De9A95D1b6C8496Aff94Aa1";
    const ERC20PortalContractAddress = "0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB";
    const price = 40;

    const customProvider = new ethers.providers.Web3Provider(ParticleProvider as ExternalProvider | JsonRpcFetchFunc);
    const signer = customProvider.getSigner();

    const USDTAbi = USDTJson.abi;

    const USDTContract = new ethers.Contract(usdtAddress, USDTAbi, signer);

    const amount = ethers.BigNumber.from(price).mul(ethers.BigNumber.from(10).pow(18));

    const tx_1 = await USDTContract.approve(ERC20PortalContractAddress, amount);
    await tx_1.wait();

    setShowApproveTransaction(false);
    setShowConfirmOrder(true);
  };

  const handleConfirmOrder = async () => {
    try {
      if (ParticleProvider) {
        const appContractAddress = "0x92Df6c726f8963D564c316b5b91f0A07ED443Ba7";
        const ERC20PortalAddress = "0x9C21AEb2093C32DDbC53eEF24B873BDCd1aDa1DB";
        const USDTAddress = "0xD1A65309dF5AA03b7De9A95D1b6C8496Aff94Aa1";
        const price = 40;

        const customProvider = new ethers.providers.Web3Provider(
          ParticleProvider as ExternalProvider | JsonRpcFetchFunc,
        );
        const signer = customProvider.getSigner();

        const ERC20PortalAbi = SepoliaJSON.contracts.ERC20Portal.abi;

        const ERC20PortalContract = new ethers.Contract(ERC20PortalAddress, ERC20PortalAbi, signer);

        const amount = ethers.BigNumber.from(price).mul(ethers.BigNumber.from(10).pow(18));

        const tx_2 = await ERC20PortalContract.depositERC20Tokens(USDTAddress, appContractAddress, amount, "0x");
        await tx_2.wait();
        router.push("/orders");
      }
    } catch (e) {
      console.log(`${e}`);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.imgContainer}>
        <Image src={nftItem.image} alt={nftItem.name} layout="fill" objectFit="cover" className={style.nftImg} />
      </div>
      <div className={style.details}>
        <div className={style.info}>
          <div className={style.infoLeft}>
            <div className={style.collectionName}>{title}</div>
            <div className={style.likes}>
              <HeartIcon className={style.likeIcon} />
              {nftItem.likes}
            </div>
            <div className={style.assetName}>{nftItem.name}</div>
          </div>
          {isListed && (
            <div className={style.infoRight}>
              <div className={style.priceTag}>Price</div>
              <div className={style.priceValue}>
                <Image
                  src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                  alt="ETH Logo"
                  layout="fill"
                  objectFit="cover"
                  className={style.ethLogo}
                />
                {price}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={style.orderTab}>
        <div className={style.sizeWrapper}>
          <label className={style.sizeLabel}>Size:</label>
          <select className={style.sizeSelect}>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        </div>
        <button className={style.orderButton} onClick={toggleModal}>
          Order Now
        </button>
      </div>
      {showModal && (
        <div className={style.modal} onClick={toggleModal}>
          <div className={style.modalContent} onClick={e => e.stopPropagation()}>
            <button className={style.closeModalButton} onClick={toggleModal}>
              X
            </button>
            <div className={style.addressHeader}>
              NOTE: Your t-shirt will be sent to your registered address. If you wish to change, change your address in
              the &quot;Profile&quot; tab.
            </div>
            {!showApproveTransaction && !showConfirmOrder && (
              <button className={style.confirmOrderButton} onClick={() => handleEstimatePrice(index)}>
                Estimate Price
              </button>
            )}
            {showApproveTransaction && (
              <>
                <div>Estimated Price: {estimatedPrice}</div>
                <button className={style.confirmOrderButton} onClick={handleApproveTransaction}>
                  Approve Transaction
                </button>
              </>
            )}
            {showConfirmOrder && (
              <>
                <div>Estimated Price: {estimatedPrice}</div>
                <button className={style.confirmOrderButton} onClick={handleConfirmOrder}>
                  Confirm Order
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTCard;
