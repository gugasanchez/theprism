![The Prism Banner](https://github.com/gugasanchez/theprism/assets/62973287/ac16ce4e-cced-4a22-8570-f42ae4346cba)

# [The Prism](https://the-prism-eth-samba.vercel.app/) ▲

Unleash your creativity with The Prism, a cutting-edge platform where art meets blockchain to make your designs wearable. Dive into a world where AI-generated images become tangible and every creation is a unique fashion statement.

## ✨ Features Overview

- **🎨 Creative Design Production**: Harness the power of self-trained models based on open-source stable-diffusion ML running in a RISC-V architecture inside the Cartesi Machine to turn your inspirations into unique digital masterpieces, blockchain-ready.

- **🔐 Proof of Inspiration and Unique Art**: Utilize the Cartesi Machine to generate verifiably unique art. The process ensures that each artwork is authentic and proves the Cartesi "superpower" given to dApps.

- **🔗 Blockchain-Powered Logic**: All blockchain operations, including minting NFTs, receiving royalties, and making transactions, are powered by Cartesi technology, ensuring transparency and security.

- **💸 Royalties and Transactions**: Artists earn royalties automatically with every sale. The earnings and transactions are securely handled by Cartesi rollups on the blockchain.

- **🛍️ Marketplace for Exclusive Designs**: A dedicated space for designers to showcase and sell their one-of-a-kind pieces to customers seeking truly unique, blockchain-authenticated art and design.

- **🔗 Particle Connect Service**: Enables users to use not only Web 3.0 wallets (like Metamask) but also Social Wallets (like Google), through Particle technology, facilitating mass adoption of our dApp by simplifying the login and wallet management process.

## 🏗️ System Architecture
![the-prism-architecture](https://github.com/user-attachments/assets/0714b44f-2c69-48a6-8876-0a5b4bf6406d)

<p align="center">
  <i>Explore the foundational structure and detailed components that drive our platform, alongside the workflow process that ensures seamless operation.</i>
</p>

## 🤖 Stable Diffusion Implementation on Cartesi Machine

### Stable Diffusion for Art Generation

Harnessing the power of Stable Diffusion, our platform generates unique digital masterpieces based on user prompts. Here's how the process unfolds:

- **📝 Prompt Submission**: Users input their design idea into our system using the Art Generation Prompt. This user-friendly interface allows for the seamless creation of personalized designs.

- **🔍 Why Stable Diffusion**: We chose Stable Diffusion due to its robust capabilities in generating high-quality, detailed images. It excels in creating art that meets the aesthetic and technical requirements of digital and physical merchandise.

- **💻 C++ Implementation**: The Stable Diffusion model runs as a C++ program within our platform. This choice ensures optimal performance and integration with our backend systems, as less performing languages couldn't even handle the art generation process on-chain due to its complexity.

- **🔗 Interacting with the Cartesi Machine**: The core of our platform's computing power is the Cartesi Machine. By running the Stable Diffusion model within a RISC-V architecture, the Cartesi Machine ensures that each generated piece of art is verifiably unique and secure. This interaction demonstrates the "superpower" of Cartesi, enhancing the capabilities of decentralized applications.

- **🛠️ Technologies Utilized**: Our implementation relies on a suite of cutting-edge technologies to maintain performance and scalability:
  - **Docker**: Containerization with Docker ensures that our applications run smoothly across different environments. It provides consistency and reliability in the deployment of the Stable Diffusion model.
  - **RISC-V Architecture**: By leveraging the RISC-V architecture within the Cartesi Machine, we ensure that our computations are efficient and secure, taking full advantage of open-source hardware innovations.
  - **Blockchain Integration**: All operations related to art generation, minting NFTs, and handling transactions are securely managed on the blockchain, powered by Cartesi technology. This integration guarantees transparency and trust throughout the creative process.
 
**Note: even though the image generation process works as mentioned above, a so complex computation is made on-chain, that images can take longer than 10 hours to be created. Considering this, in order to provide a better UX to our users, the standart way to generate the AI designs on The Prism Frontend uses a Stable Diffusion API, that can provide the image in seconds. During this process, many relevant data about the image is stored on the blockchain, so that it has a proof of authenticity.**

## 🛠️ Services Stack

Our platform leverages a cutting-edge stack of technologies and services designed to enhance user experience, ensure security, and foster innovation. Here's a look at the key services in our stack and how we use them:

- **🖱 Particle Connect**: Simplifies the user experience by offering social login capabilities. This service allows users to benefit from blockchain technology without needing in-depth knowledge of how wallets or blockchain work.
   - [🔎 Explore the Code](./packages/nextjs/components/ThePrismAppWithProviders.tsx)

- **👩‍💻 Scaffold Eth 2**: A comprehensive toolkit for Ethereum developers, Scaffold-ETH 2 helps us rapidly deploy Solidity smart contracts and launch a DApp with a React frontend. It includes Hardhat for smart contract development and Next.js for building user-friendly interfaces, streamlining our development process.

- **🌄 Stable Diffusion**: Utilizes C++, Docker, and RISC-V architecture within the Cartesi Machine to power our image generation model. This combination ensures high performance and verifiability of unique art creations from user prompts.
   - [🔎 Explore the Code](./packages/backend/design_diffusion/src/design/design.service.ts)

- **🔗 Cartesi dApp**: The core of our decentralized application is built on Cartesi technology, using Python for smart contract interactions and the Python Wallet for managing transactions. This setup provides a robust and secure environment for all blockchain operations.
   - [🔎 Explore the Code](./packages/hardhat/contracts/DesignFunctions.sol)

- **💻 Cartesi Frontend Integration**: Seamlessly integrates the Cartesi technology with our frontend, ensuring a smooth user experience. This integration handles everything from user interactions to backend processes, leveraging the full power of Cartesi’s capabilities.
   - [🔎 Explore the Code](./packages/nextjs/components/ThePrismAppWithProviders.tsx)
 

## 📒 Contracts

### NFT Factory Contract

- **Address:** [0x869181609CD5A911aE43d695A03A38bba5F74A01](https://sepolia.scrollscan.com/address/0x869181609CD5A911aE43d695A03A38bba5F74A01)
- **Purpose:** NFT Factory contract used to deploy an ERC721 Contract for each user and manage these contracts. Here we can take a look in all NFT contracts deployed and all purchases made in each of them.

### CustomTShirtNFT 

- **Address** (example deployed to an user): [0xb3f28ad65855aa0cd7949adb477e13085348f625](https://sepolia.scrollscan.com/address/0xb3f28ad65855aa0cd7949adb477e13085348f625)
- **Purpose:** Each user will have him own CustomTShirtNFT contract. When you create a new T-shirt design and save it, a new NFT will be minted to your address. The NFT Factory is used to call functions in these contracts.

### USDT Contract

- **Address:** [0x9c4BD6453BdbA9E58F4A881A2C6BB0683EdcA0B9](https://sepolia.scrollscan.com/address/0x9c4BD6453BdbA9E58F4A881A2C6BB0683EdcA0B9)
- **Purpose:** Simulate an stablecoin to make payments when an user buy a T-Shirt.

## 📚 Resources

- **[The Prism](https://the-prism-eth-samba.vercel.app/)**: Discover the full capabilities of The Prism Platform, explore our features, and learn how we're changing the game in digital-to-physical art conversion.

- **[Our Pitch Deck](https://www.canva.com/design/DAGASoj2moo/k05LvPOLeTAI26mbPsUXWQ/edit?utm_content=DAGASoj2moo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)**: Dive deeper into our business model, technology, and the market opportunity with our comprehensive pitch deck. Understand our vision, strategy, and how we plan to grow.

- **[Our Demo](https://www.youtube.com/watch?v=c19WSWHkE6w)**: Experience The Prism Platform in action. Our demo provides a hands-on look at how users can create, mint, and translate digital art into physical products seamlessly.

- **[Our Backend](https://the-prism-backend.vercel.app/designs)**: The Prism Backend stores and manages base64 encoded images, designed for easy frontend integration.

### Conclusion
Our project is at the forefront of combining machine learning with fashion design, creating a unique platform for personalized apparel. As we continue to develop and refine our technology, we aim to offer users an unparalleled ability to bring their creative visions to life, whether through owning a unique piece of wearable art or by stepping into the role of a designer in the digital marketplace.
Our team would like to thank Cartesi for providing the opportunity of taking part of the SeedGrants program. We hope this is the beggining of a very succesful partnership.

## 📁 Researches & Data

- [Forbes | The Hyper-Personalization trend](https://www.forbes.com/sites/eladnatanson/2023/06/01/hyper-personalization-is-already-here---its-future-is-even-more-cutting-edge/?sh=414917c55cc2)
- [Forbes | E-commerce 3.0](https://www.forbes.com/sites/onmarketing/2023/08/23/e-commerce-30-the-future-of-retail-is-hyper-personalized/?sh=43c9ce693d30)
- [The Guardian | AI & Fashion Billionaire Market](https://www.theguardian.com/fashion/2024/feb/08/ai-london-fashion-week)

## 👥 Team Prism
- [@ryanviana](https://www.github.com/ryanviana)
- [@pjvperes](https://www.github.com/pjvperes)
- [@gugasanchez](https://www.github.com/gugasanchez)

---

© 2024 The Prism. A new spectrum of digital art and fashion.


