import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ModalProvider } from '@particle-network/connect-react-ui';
import { WalletEntryPosition } from '@particle-network/auth';
import { Ethereum, EthereumSepolia } from '@particle-network/chains';
import { evmWallets } from '@particle-network/connect';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <ModalProvider
      options={{
        projectId: import.meta.env.VITE_PARTICLE_PROJECT_ID,
        clientKey: import.meta.env.VITE_PARTICLE_CLIENT_KEY,
        appId: import.meta.env.VITE_PARTICLE_APP_ID,  
        chains: [
          Ethereum,
          EthereumSepolia,
        ],
        particleWalletEntry: {
          displayWalletEntry: true,
          defaultWalletEntryPosition: WalletEntryPosition.BR,
          supportChains:[
            Ethereum,
            EthereumSepolia  
          ],
          customStyle: {},
        },
        wallets: evmWallets({
          projectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
          showQrModal: false
       }),
      }}
      theme={'auto'}
      language={'en'}
      walletSort={['Particle Auth', 'Wallet']}
      particleAuthSort={[
          'email',
          'phone',
          'google',
          'apple',
          'facebook'
      ]}
    >
      <App />
    </ModalProvider>
  </React.StrictMode>,
);