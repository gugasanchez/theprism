import React from 'react';
import { FaTwitter, FaYoutube, FaGithub, FaGlobe } from 'react-icons/fa';
import logo from '../../../images/logo.png';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">

          <div className="w-[80%] flex sm:flex-row flex-col sm:justify-between sm:items-start my-4">
            <div className="flex flex-col justify-start items-start">
              <img src={logo} alt="logo" className="w-32" />

              <div className="flex flex-col justify-start items-start mt-5">
                <p className="text-white sm:w-[450px] text-sm text-justify">
                A unique marketplace blending digital art with custom merchandise. Create, mint, and list your NFTs, 
                then seamlessly connect with producers to bring your art to life on t-shirts.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-end items-end flex-1">
              <h2 className="text-white text-lg mr-2 cursor-pointer">Join our community!</h2>
              <div className="flex justify-center items-center space-x-4 mt-2 mr-2">
                <a href="https://twitter.com/theprism_ctsi" target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-white text-lg" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FaYoutube className="text-white text-lg" />
                </a>
                <a href="https://github.com/gugasanchez/theprism" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-white text-lg" />
                </a>
                <a href="https://rolluplab.io/" target="_blank" rel="noopener noreferrer">
                  <FaGlobe className="text-white text-lg" />
                </a>
              </div>
            </div>
          </div>

          <div className="sm:w-[80%] w-full h-[0.25px] bg-gray-400 mt-5" />

          <div className="sm:w-[80%] w-full flex justify-between items-center mt-3">
            <p className="text-white text-left text-xs">© 2024 The Prism</p>
            <p className="text-white text-right text-xs">All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
