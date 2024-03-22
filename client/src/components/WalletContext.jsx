// WalletContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const checkIfWalletIsConnected = async () => {
            if (window.ethereum) {
                try {
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const accounts = await provider.listAccounts();
                    if (accounts.length > 0) {
                        setIsConnected(true);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        checkIfWalletIsConnected();
    }, []);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                setIsConnected(true);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        }
    };

    return (
        <WalletContext.Provider value={{ isConnected, connectWallet }}>
            {children}
        </WalletContext.Provider>
    );
};
