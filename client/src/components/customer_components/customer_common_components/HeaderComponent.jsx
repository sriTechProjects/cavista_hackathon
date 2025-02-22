import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../../contexts/UserContext";

// Assets import
import images from "../../../utils/resource/ImageProvider.util";

// React icons import
import {
  FaStore,
  FaBasketShopping,
  RxHamburgerMenu,
  RxCross1,
  FaUser,
} from "../../../utils/resource/IconsProvider.util";

import {
  HeaderNavIcons,
  SolidButton,
} from "../../../utils/resource/ComponentsProvider.util";

import { formAvatar } from "../../../utils/validator/helper";

const HeaderComponent = ({ toggleBasket }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setUser(null); // Clear user from context
    setIsDropdownOpen(false);
    navigate("/auth/signin");
  };

  return (
    <>
      <Link to="/">
        <img src={images.logo} alt="saarthi logo" className="w-[25vh]" />
      </Link>
      <div>
        <div className="items-center justify-between gap-8 hidden md:flex">
          <HeaderNavIcons
            icon={<FaStore />}
            item="Become a seller"
            indicator={false}
            indicatorValue={0}
          />
          <button onClick={toggleBasket}>
            <HeaderNavIcons
              icon={<FaBasketShopping />}
              item="Basket"
              indicator={true}
              indicatorValue={2}
            />
          </button>

          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full border flex items-center justify-center font-normal">
                  {formAvatar(user.name)}
                </span>
                <span>{user.name}</span>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md border">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <SolidButton
              containsIcon={true}
              icon={<FaUser />}
              onClick={() => navigate("/auth/signin")}
              text="Login"
            />
          )}
        </div>

        <button onClick={toggleMenu} className="flex md:hidden text-3xl text-[#333]">
          <RxHamburgerMenu />
        </button>
      </div>

      {isMenuOpen && (
        <div className="w-screen h-screen bg-[#000] absolute top-0 left-0 flex text-white p-10 justify-center items-center">
          <button className="absolute top-10 right-12" onClick={toggleMenu}>
            <RxCross1 className="text-white text-2xl" />
          </button>
          <div className="flex flex-col gap-20 w-full">
            <a href="#" className="w-full text-center font-semibold text-xl flex items-center gap-6 justify-center">
              <FaStore className="text-[1.1rem]" /> Become a Seller
            </a>
            <a href="#" className="w-full text-center font-semibold text-xl flex items-center gap-6 justify-center">
              <FaBasketShopping className="text-xl" /> Visit Basket
            </a>
            {user ? (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 bg-[#fff] text-[#333] py-4 px-10 rounded-lg font-bold text-[1.09rem] cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/auth/signin")}
                className="flex items-center justify-center gap-3 bg-[#fff] text-[#333] py-4 px-10 rounded-lg font-bold text-[1.09rem] cursor-pointer"
              >
                <FaUser /> Login
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderComponent;
