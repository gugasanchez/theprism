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

## 🛠️ Services Stack

Our platform leverages a cutting-edge stack of technologies and services designed to enhance user experience, ensure security, and foster innovation. Here's a look at the key services in our stack and how we use them:

- **🖱 Particle Connect**: Simplifies the user experience by offering social login capabilities. This service allows users to benefit from blockchain technology without needing in-depth knowledge of how wallets or blockchain work.
   - [🔎 Explore the Code](./nextjs/components/ThePrismAppWithProviders.tsx)

- **👩‍💻 Scaffold Eth 2**: A comprehensive toolkit for Ethereum developers, Scaffold-ETH 2 helps us rapidly deploy Solidity smart contracts and launch a DApp with a React frontend. It includes Hardhat for smart contract development and Next.js for building user-friendly interfaces, streamlining our development process.

- **🌄 Stable Diffusion**: Utilizes C++, Docker, and RISC-V architecture within the Cartesi Machine to power our image generation model. This combination ensures high performance and verifiability of unique art creations from user prompts.
   - [🔎 Explore the Code](./the_prism_diffusion)

- **🔗 Cartesi dApp**: The core of our decentralized application is built on Cartesi technology, using Python for smart contract interactions and the Python Wallet for managing transactions. This setup provides a robust and secure environment for all blockchain operations. Additionally, Python offers a wide range of libraries that are extremely useful for our application.
   - [🔎 Explore the Code](./the_prism_dapp/dapp.py)

- **💻 Cartesi Frontend Integration**: Seamlessly integrates the Cartesi technology with our frontend, ensuring a smooth user experience. This integration handles everything from user interactions to backend processes, leveraging the full power of Cartesi’s capabilities.
   - [🔎 Explore the Code](./nextjs)
 

## 📒 Contracts

### Design NFT

- **Address** (example deployed to an user): [0x4C17C1E23e37868cFf4cA260Ed6d39E347636207](https://sepolia.scrollscan.com/address/0x4C17C1E23e37868cFf4cA260Ed6d39E347636207)
- **Purpose:** Contract used to mint Design NFT to creator. In our application we are emitting a voucher for it and we will allow execute it soon.

### USDT Contract

- **Address:** [0xD1A65309dF5AA03b7De9A95D1b6C8496Aff94Aa1](https://sepolia.scrollscan.com/address/0xD1A65309dF5AA03b7De9A95D1b6C8496Aff94Aa1)
- **Purpose:** Simulate an stablecoin to make payments when an user buy a T-Shirt.

## 📚 Resources

- **[The Prism](https://the-prism-eth-samba.vercel.app/)**: Discover the full capabilities of The Prism Platform, explore our features, and learn how we're changing the game in digital-to-physical art conversion.

- **[Our Pitch Deck](https://www.canva.com/design/DAGASoj2moo/k05LvPOLeTAI26mbPsUXWQ/edit?utm_content=DAGASoj2moo&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)**: Dive deeper into our business model, technology, and the market opportunity with our comprehensive pitch deck. Understand our vision, strategy, and how we plan to grow.

- **[Our Demo](https://www.youtube.com/watch?v=c19WSWHkE6w)**: Experience The Prism Platform in action. Our demo provides a hands-on look at how users can create, mint, and translate digital art into physical products seamlessly.

- **[Our Backend](https://the-prism-backend.vercel.app/designs)**: The Prism Backend stores and manages base64 encoded images, designed for easy frontend integration.

Aqui está a seção de "Setup and Installation Guides" para seu README.md:

## Setup and Installation Guides

### Frontend Setup

1. **Accessing the Application:**
   - Visit [The Prism Frontend](https://the-prism-eth-samba.vercel.app/) to use the application. The frontend is deployed and available at this domain.

2. **Running the Frontend Locally:**
   - Clone the repository:
     ```bash
     git clone https://github.com/gugasanchez/theprism.git
     cd theprism
     cd nextjs
     ```
   - Install the dependencies:
     ```bash
     yarn install
     ```
   - Start the development server:
     ```bash
     yarn start
     ```
   - Open your browser and navigate to `http://localhost:3000` to see the application running locally.

### Backend Setup

1. **Accessing the Backend:**
   - The backend is continuously running and can be accessed at [The Prism Backend](https://theprism.fly.dev/graphql).

2. **Running the Backend Locally:**
   - Navigate to the backend directory:
     ```bash
     git clone https://github.com/gugasanchez/theprism-backend.git
     cd the_prism_dapp
     ```
   - Install the dependencies:
     ```bash
     cartesi build
     ```
   - Start the backend server:
     ```bash
     cartesi run
     ```
   - Watch the backend running in the displayed port.

### Implementing Stable Diffusion in C++

To generate images using the Stable Diffusion model implemented in C++, follow these steps:

1. **Prepare the Environment:**
   - Ensure Docker is installed and running on your machine.
   - Navigate to the repository containing the Stable Diffusion C++ implementation:
     ```bash
     cd the_prism_diffusion
     ```

2. **Build the Docker Image:**
   - Build the Docker image to create a containerized environment for running Stable Diffusion:
     ```bash
     docker build -t the_prism_diffusion .
     ```

3. **Running Stable Diffusion:**
   - Start the Docker container:
     ```bash
     docker run -it the_prism_diffusion
     ```

4. **Generate an Image:**
   - Send a JSON request containing the prompt and other parameters to the Cartesi Machine:
     ```json
     {
       "prompt": "A beautiful landscape painting",
       "parameters": {
         "width": 512,
         "height": 512,
         "steps": 50
       }
     }
     ```
   - The Cartesi Machine processes the request and generates the command to run Stable Diffusion with the provided data.
   - The Stable Diffusion model generates the image.
   - The generated image is transformed into Base64 and then into hexadecimal format.
   - A report containing the hexadecimal data of the image is generated.

5. **Access the Generated Image:**
   - The user can access the image through the generated report, for example by decoding the hexadecimal to a string and then converting the Base64 string to a PNG image.

**Note:** The on-chain image generation can be time-consuming (over 10 hours). For a better user experience, the standard method uses a Stable Diffusion API to generate images in seconds while storing relevant data on the blockchain for authenticity proof.

---

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


