![The Prism Banner](https://github.com/gugasanchez/theprism/assets/62973287/ac16ce4e-cced-4a22-8570-f42ae4346cba)

# Welcome to The Prism 

Unleash your creativity with The Prism, a cutting-edge platform where art meets blockchain to make your designs wearable. Dive into a world where AI-generated images become tangible and every creation is a unique fashion statement.

## 🛠️ Features

- **AI-Powered Design**: Turn your inspirations into digital art, authenticated and minted on-chain using Cartesi Rollups.
- **Seamless Transition to Tangibles**: Easily convert your digital art into custom-made t-shirts through our network of quality producers.
- **Web3 Wallet Integration**: Simple login using Metamask and Web3 wallet of your preference.
- **Ownership and Royalties**: Mint your art as NFTs and get rewarded for your creativity through a transparent royalty system.

## 🏗️ System Architecture
<p float="left">
  <img src="https://github.com/gugasanchez/theprism/assets/62973287/659ae2a4-095c-42d1-bbac-f07d4656c6dc" width="150" />
  <img src="https://github.com/gugasanchez/theprism/assets/62973287/6617f73f-f89b-4ef4-bc57-37dcb0234939" width="150" /> 
  <img src="https://github.com/gugasanchez/theprism/assets/62973287/bf7928ea-cd22-4f87-b5b5-7f16874fae40" width="150" />
</p>

## 📌 Run The Prism Locally

### Prerequisites
- Node.js installed (preferably the latest stable version)
- Git installed on your machine

### Installation
```
git clone https://github.com/gugasanchez/theprism.git
cd theprism
```

### Setting up the Frontend
```
cd client
npm install
npm run codegen
npm run dev
```
The frontend should now be running on `http://localhost:5173` (or another port specified in the console output).

### Setting up the Backend

```
cd the_prism_dapp
sunodo build
sunodo run
```

#### ⚠ 1. Remember to deploy an ERC-20 Contract locally if you want to sign a Metamask transaction to buy a t-shirt ("Confirm order" button).

#### ⚠ 2. The code within the_prism_diffusion directory is intended for research and development purposes, aimed at continuing the effort to execute Stable Diffusion on Cartesi. We have made significant progress in running it with Docker, but we are currently encountering a cache issue when downloading the Stable Diffusion 1.5 model.

#### Therefore, please do not attempt to run this directory; it is meant to be finalized in the continuation of the development process. 

## 🤖 Stable Diffusion <> The Prism

### How It Works Now
Currently, our system operates by taking a user's design prompt through our frontend interface. The core of our process involves the Stable Diffusion model, which utilizes a pre-prepared t-shirt image as a base. With the right parameters set for the Stable Diffusion model, it generates a new t-shirt overlaying the base image with a print that visualizes the user's design idea. This innovative approach allows for quick and customized design generation directly influenced by user input.

#### Steps:
1. User enters a design prompt on the frontend.
2. The Stable Diffusion model uses a base t-shirt image and parameters to generate a design.
3. A t-shirt image featuring the prompt's design idea is created and displayed to the user.

### Future Vision

#### Creating a Unique Design
1. **Idea Generation:** Users will prompt a design idea through our enhanced interface.
2. **Design Creation:** A model trained with knowledge about manufacturer parameters will generate an image suitable for production.
3. **Originality Check:** We will compare the generated design against similar prompts and images. If it surpasses a certain originality threshold, it will be merged with pre-established t-shirt models for user review.
4. **NFT Creation:** Original designs will qualify for NFT creation, allowing users to claim ownership and sell their designs in a marketplace. Users will also have the option to specify the quantity of NFTs produced.

#### Just Buying a High Personalized T-Shirt
- This process mirrors the unique design creation but omits the similarity check. Users can directly purchase the personalized t-shirt without the design being linked to an NFT.

#### Enhanced User Experience
- For both processes, we plan to implement a frontend console similar to Fooocus, providing users with extensive configuration options beyond simple prompt entry. This will enable the production of highly detailed and personalized designs.

### Conclusion
Our project is at the forefront of combining machine learning with fashion design, creating a unique platform for personalized apparel. As we continue to develop and refine our technology, we aim to offer users an unparalleled ability to bring their creative visions to life, whether through owning a unique piece of wearable art or by stepping into the role of a designer in the digital marketplace.

## Pitch Slides
- [The Prism | Pitch | Cartesi Hackathon.pdf](https://github.com/gugasanchez/theprism/files/14706864/The.Prism.Pitch.Cartesi.Hackathon.pdf)


## 📁 Resources

- [Forbes | The Hyper-Personalization trend](https://www.forbes.com/sites/eladnatanson/2023/06/01/hyper-personalization-is-already-here---its-future-is-even-more-cutting-edge/?sh=414917c55cc2)
- [Forbes | E-commerce 3.0](https://www.forbes.com/sites/onmarketing/2023/08/23/e-commerce-30-the-future-of-retail-is-hyper-personalized/?sh=43c9ce693d30)

## 👥 Team Prism

- [@ryanviana](https://www.github.com/ryanviana)
- [@pjvperes](https://www.github.com/pjvperes)
- [@gugasanchez](https://www.github.com/gugasanchez)

---

🐦 [**Follow us on X**](https://twitter.com/theprism_ctsi)


© 2024 The Prism. A new spectrum of digital art and fashion.


