// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import { WalletProvider } from './components/WalletContext'; // Adjust the import path based on your file structure

const App = () => {
  return (
    <WalletProvider>
      <div className="min-h-screen">
        <div className="gradient-bg-welcome">
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/orders" element={<Orders status="Proposal" />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
          </Router>
        </div>
      </div>
    </WalletProvider>
  );
};

export default App;
