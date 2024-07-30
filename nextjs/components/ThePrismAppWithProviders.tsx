"use client";

import { useEffect } from "react";
import { GraphQLProvider } from "./GraphQL";
import { WalletEntryPosition } from "@particle-network/auth";
import { EthereumSepolia } from "@particle-network/chains";
import { evmWallets } from "@particle-network/connect";
import { ModalProvider } from "@particle-network/connect-react-ui";
import { Toaster } from "react-hot-toast";
import { WagmiConfig } from "wagmi";
import { Footer } from "~~/components/Footer";
import { Header } from "~~/components/Header";
import { ProgressBar } from "~~/components/scaffold-eth/ProgressBar";
import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { wagmiConfig } from "~~/services/web3/wagmiConfig";

const ThePrismApp = ({ children }: { children: React.ReactNode }) => {
  const price = useNativeCurrencyPrice();
  const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);

  useEffect(() => {
    if (price > 0) {
      setNativeCurrencyPrice(price);
    }
  }, [setNativeCurrencyPrice, price]);

  return (
    <>
      <div className="flex flex-col min-h-screen gradient-bg-welcome">
        <Header />
        <main className="relative flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export const ThePrismAppWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ProgressBar />
      <ModalProvider
        options={{
          projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID as string,
          clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY as string,
          appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID as string,
          chains: [EthereumSepolia],
          particleWalletEntry: {
            displayWalletEntry: true,
            defaultWalletEntryPosition: WalletEntryPosition.BR,
            supportChains: [EthereumSepolia],
            customStyle: {},
          },
          wallets: evmWallets({
            projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,
            showQrModal: false,
          }),
        }}
        theme={"auto"}
        language={"en"}
        walletSort={["Particle Auth", "Wallet"]}
        particleAuthSort={["email", "phone", "google", "apple", "facebook"]}
      >
        <GraphQLProvider>
          <ThePrismApp>{children}</ThePrismApp>
        </GraphQLProvider>
      </ModalProvider>
    </WagmiConfig>
  );
};
