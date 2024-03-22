import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../../images/logo.png"; // Adjust path as needed
import '@particle-network/connect-react-ui/dist/index.css';
import ConnectWalletButton from '../ConnectWalletButton'; // Adjust the import path based on your file structure

const NavBarItem = ({ title, classProps, onClick }) => (
  <div onClick={onClick} className={`mx-4 cursor-pointer ${classProps}`}>
    {title}
  </div>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Marketplace', path: '/marketplace' },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const logoClickHandler = () => {
    if (location.pathname !== '/') {
      return;
    }
    scrollToTop();
  };

  return (
    <nav className="flex w-full md:justify-center justify-between items-center p-4 navbar-fixed">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        {location.pathname === '/' ? (
          <a onClick={logoClickHandler} className="cursor-pointer">
            <img src={logo} alt="logo" className="w-32" />
          </a>
        ) : (
          <Link to="/">
            <img src={logo} alt="logo" className="w-32 cursor-pointer" />
          </Link>
        )}
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {navItems.map((item, index) => (
          <Link key={index} to={item.path} className="mx-4 cursor-pointer">
            {item.title}
          </Link>
        ))}
        <li className="mt-4">
          <ConnectWalletButton />
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu ? (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        ) : (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            {navItems.map((item, index) => (
              <NavBarItem key={index} title={item.title} classProps="my-2 text-lg" onClick={() => setToggleMenu(false)} />
            ))}
            <li className="text-xl w-full my-2">
              <ConnectWalletButton />
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
