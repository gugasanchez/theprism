import React from 'react';
import NFTCard from './NFTCard'; // Adjust the import path as needed

// Mock data for NFTs
const mockNFTs = [
  {
    id: '1',
    image: 'https://img.freepik.com/fotos-premium/uma-camisa-branca-com-fundo-preto-e-as-costas_653449-538.jpg',
    name: 'NFT #1',
    likes: 100,
    price: '0.5',
    isListed: true,
  },
  {
    id: '2',
    image: 'https://img.freepik.com/fotos-premium/uma-camisa-branca-com-fundo-preto-e-as-costas_653449-538.jpg',
    name: 'NFT #2',
    likes: 150,
    price: '0.8',
    isListed: true,
  },
  {
    id: '3',
    image: 'https://img.freepik.com/fotos-premium/uma-camisa-branca-com-fundo-preto-e-as-costas_653449-538.jpg',
    name: 'NFT #3',
    likes: 200,
    price: '1.2',
    isListed: false,
  },
  {
    id: '4',
    image: 'https://img.freepik.com/fotos-premium/uma-camisa-branca-com-fundo-preto-e-as-costas_653449-538.jpg',
    name: 'NFT #4',
    likes: 250,
    price: '0.9',
    isListed: true,
  },
  {
    id: '5',
    image: 'https://img.freepik.com/fotos-premium/uma-camisa-branca-com-fundo-preto-e-as-costas_653449-538.jpg',
    name: 'NFT #5',
    likes: 300,
    price: '1.5',
    isListed: false,
  },
  {
    id: '6',
    image: 'https://img.freepik.com/fotos-premium/uma-camisa-branca-com-fundo-preto-e-as-costas_653449-538.jpg',
    name: 'NFT #6',
    likes: 350,
    price: '2.0',
    isListed: true,
  }
];

const NFTGrid = () => {
  return (
    // Use mx-auto to center the grid and justify-center to center grid items within the grid
    <div className="mx-auto max-w-7xl p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-start">
        {mockNFTs.map((nft) => (
          <NFTCard
            key={nft.id}
            nftItem={nft}
            title="Mock Collection"
            listings={[]}
          />
        ))}
      </div>
    </div>
  );
};

export default NFTGrid;
