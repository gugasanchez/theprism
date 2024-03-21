import React from 'react';
import { ethers } from 'ethers';

const ConnectWalletButton = () => {
    // Function to handle connecting to MetaMask

    // Define your styles object here
const styles = {
    button: {
        backgroundColor: '#4E46E5', // Button color
        color: 'white', // Text color
        padding: '10px 20px', // Padding inside the button
        border: 'none', // No border
        borderRadius: '20px', // Rounded corners
        fontSize: '16px', // Text size
        fontWeight: 'bold', // Text weight
        cursor: 'pointer', // Cursor on hover
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)', // Optional: shadow effect
        outline: 'none', // Remove outline on focus
        transition: 'background-color 0.3s', // Smooth background color transition
    }
};
    const connectWalletHandler = async () => {
        // Check if MetaMask is installed
        if (window.ethereum) {
            try {
                // Request account access
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                console.log("Account:", await signer.getAddress());
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
        }
    };

    return (
        <button onClick={connectWalletHandler} style={styles.button}>Connect Wallet</button>
    );
};

export default ConnectWalletButton;
