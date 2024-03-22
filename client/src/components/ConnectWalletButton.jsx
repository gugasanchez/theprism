import React from 'react';
import { useWallet } from './WalletContext'; // Adjust the import path to where you have your WalletContext

const ConnectWalletButton = () => {
    const { isConnected, connectWallet } = useWallet();

    const styles = {
        button: {
            backgroundColor: '#4E46E5',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '20px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            outline: 'none',
            transition: 'background-color 0.3s',
        }
    };

    return !isConnected ? (
        <button onClick={connectWallet} style={styles.button}>Connect Wallet</button>
    ) : null;
};

export default ConnectWalletButton;
