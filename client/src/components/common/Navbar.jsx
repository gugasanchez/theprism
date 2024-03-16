import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../../images/logo.png";

const NavBarItem = ({ title, path, classprops }) => (
  path ? (
    <Link to={path} className={`mx-4 cursor-pointer ${classprops}`}>{title}</Link>
  ) : (
    <div className={`mx-4 cursor-pointer ${classprops}`}>{title}</div>
  )
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [accountDropdown, setAccountDropdown] = React.useState(false);
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

  const handleAccountClick = () => {
    setAccountDropdown(!accountDropdown);
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
            <img src={logo} alt="logo" className="w-32" />
          </Link>
        )}
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        { /* Home and Marketplace */}
        {navItems.map((item, index) => (
          <NavBarItem key={item.title} title={item.title} path={item.path} />
        ))}
        {/* Account item and dropdown */}
        <div className="relative mx-4 cursor-pointer" onClick={handleAccountClick}>
          <div>Account</div>
          {accountDropdown && (
            <div className="absolute left-0 mt-2 py-2 bg-white shadow-lg rounded-md text-black w-40">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
              <Link to="/orders" className="block px-4 py-2 hover:bg-gray-200">Orders</Link>
              <button className="block px-4 py-2 w-full text-left hover:bg-gray-200">Log Out</button>
            </div>
          )}
        </div>
        {/* Login button */}
        <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
      </ul>
      <div className="flex relative">
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)} />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 right-0 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {navItems.filter(item => item.title !== 'Account').map((item) => (
              <NavBarItem key={item.title} title={item.title} path={item.path} classprops="my-2 text-lg" />
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
