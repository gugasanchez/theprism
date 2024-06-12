"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const faqData = [
  {
    question: "What is The Prism?",
    answer:
      "The Prism is a platform that combines art and blockchain to enable users to create hyper-personalized AI-generated art, mint it as a unique NFT, and connect with producers to bring the art to life as custom t-shirts.",
  },
  {
    question: "Who can use The Prism?",
    answer:
      "The Prism is designed for both artists who want to create and sell their AI-generated art as NFTs and common users who want to design their own t-shirts or use existing art from the marketplace.",
  },
  {
    question: "How does The Prism ensure the authenticity of the art?",
    answer:
      "The authenticity of the art is guaranteed by recording the AI-generated art on the blockchain using Cartesi, ensuring that each piece is unique and verifiable.",
  },
  {
    question: "How can I create and list my art on the marketplace?",
    answer:
      "Artists can use The Prism's AI tools to create their art, mint it as an NFT, and list it on the marketplace to earn royalties from t-shirt sales.",
  },
  {
    question: "What are the benefits of listing my art on The Prism?",
    answer:
      "By listing your art on The Prism, you can earn royalties each time your design is used to produce a t-shirt. The platform also provides a transparent and secure way to showcase and sell your digital art.",
  },
  {
    question: "How do royalties work for artists?",
    answer:
      "Artists receive royalties whenever a t-shirt with their design is sold. The royalties are distributed in stablecoins, ensuring a straightforward and reliable payment process.",
  },
  {
    question: "Can I use my own designs to create a t-shirt?",
    answer:
      "Yes, common users can create their own designs using The Prism's tools and have them printed on t-shirts, or they can choose from existing designs listed by artists on the marketplace.",
  },
  {
    question: "How do I purchase a t-shirt with a design from the marketplace?",
    answer:
      "Browse the marketplace, select the design you like, and follow the instructions to place an order. The t-shirt will be produced by a trusted producer and delivered to your address.",
  },
  {
    question: "How are payments handled for t-shirt orders?",
    answer:
      "Payments for t-shirt orders are made in stablecoins, covering the cost of production and delivery. This ensures a seamless and secure transaction process.",
  },
  {
    question: "What technology stack does The Prism use?",
    answer:
      "The Prism uses React for the frontend, Julia and Python for backend operations, and MongoDB for data storage. The platform also leverages Cartesi Rollups for blockchain interactions.",
  },
  {
    question: "How does The Prism ensure the security of transactions?",
    answer:
      "The Prism employs robust security measures, including smart contract security audits and blockchain integration with Cartesi Rollups, to ensure that all transactions are secure and verifiable.",
  },
  {
    question: "How can I get support if I encounter issues?",
    answer:
      "For support, you can visit the 'Support' section on The Prism's website, where you can find contact information and resources to help resolve any issues you may encounter.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index: number | React.SetStateAction<null>) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="flex flex-col items-center w-[90%] p-4">
      <h1 className="text-3xl sm:text-4xl text-gradient pt-10 pb-4">FAQ</h1>
      <div className="flex flex-col w-full pt-0">
        {faqData.map((faq, index) => (
          <div key={index} className="mb-4">
            <div
              className="p-4 blue-glassmorphism cursor-pointer font-bold flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <span>{faq.question}</span>
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            </div>
            {openIndex === index && <div className="p-4 white-glassmorphism">{faq.answer}</div>}
          </div>
        ))}
      </div>
      <h1 className="text-3xl sm:text-4xl text-gradient pt-10 pb-4">Quick Start Guide</h1>
      <div className="flex flex-row items-start pt-0">
        <div className="w-1/2 mb-4">
          <h2 className="text-2xl text-gradient mb-2">For Artists</h2>
          <ol className="list-decimal list-inside">
            <li className="mb-2">
              <strong>Sign Up:</strong> Create an account using a Web3 wallet (like MetaMask) or a social wallet (like
              Google).
            </li>
            <li className="mb-2">
              <strong>Create Art:</strong> Use the AI Art Generator to create your unique designs.
            </li>
            <li className="mb-2">
              <strong>Mint NFT:</strong> Mint your design as an NFT to ensure its authenticity.
            </li>
            <li className="mb-2">
              <strong>List on Marketplace:</strong> List your NFT on the marketplace to earn royalties.
            </li>
          </ol>
        </div>
        <div className="w-1/2 mb-4">
          <h2 className="text-2xl text-gradient mb-2">For Users</h2>
          <ol className="list-decimal list-inside">
            <li className="mb-2">
              <strong>Sign Up:</strong> Create an account using a Web3 wallet (like MetaMask) or a social wallet (like
              Google).
            </li>
            <li className="mb-2">
              <strong>Choose or Create Design:</strong> Browse the marketplace to select a design or use the AI Art
              Generator to create your own.
            </li>
            <li className="mb-2">
              <strong>Order T-Shirt:</strong> Place an order to have the design printed on a t-shirt. Ensure your
              delivery address is correctly filled out.
            </li>
            <li className="mb-2">
              <strong>Receive Product:</strong> Your t-shirt will be produced and delivered to your address.
            </li>
            <li className="mb-2">
              <strong>IMPORTANT:</strong> In the current version of The Prism, our management of t-shirts delivery is
              restricted to certain locations. We will keep in touch with you as soon as you order the t-shirts and
              refund you if not elegible to receive your product.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  return (
    <div className="flex justify-center items-center">
      <FAQ />
    </div>
  );
};

export default Profile;
