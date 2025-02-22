import React from "react";

//asstes import
import images from "../../../utils/resource/ImageProvider.util";

// import react icons
import {
  FaFacebookF,
  FaXTwitter,
  BsInstagram,
} from "../../../utils/resource/IconsProvider.util";

const FooterComponent = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-10 md:flex-row md:justify-between md:items-start w-full">
        <div>
          <img src={images.logo} alt="logo" className="w-[25vh]" />
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 w-full ml-20">
          {/* {<!-- column1 -->} */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-white font-medium text-[1.1rem] border-b-[3px] border-primary text-center w-fit py-2">
              Company
            </h2>
            <ul className="text-gray-300 mt-5 flex flex-col items-center md:items-start gap-3">
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a href="">Our Services</a>
              </li>
              <li>
                <a href="">Privacy Policy</a>
              </li>
              <li>
                <a href="">Affiliate Program</a>
              </li>
            </ul>
          </div>

          {/* {<!-- column2 -->} */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-white font-medium text-[1.1rem] border-b-[3px] border-primary text-center w-fit py-2">
              Help
            </h2>
            <ul className="text-gray-300 mt-5 flex flex-col gap-3 items-center md:items-start">
              <li>
                <a href="">FAQ</a>
              </li>
              <li>
                <a href="">Shipping</a>
              </li>
              <li>
                <a href="">Return Policy</a>
              </li>
              <li>
                <a href="">Order Status</a>
              </li>
              <li>
                <a href="">Payment Options</a>
              </li>
            </ul>
          </div>

          {/* { column3} */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-white font-medium text-[1.1rem] border-b-[3px] border-primary text-center w-fit py-2">
              Categories
            </h2>
            <ul className="text-gray-300 mt-5 flex flex-col gap-3 items-center md:items-start">
              <li>
                <a href="">Vegetables</a>
              </li>
              <li>
                <a href="">Fruits</a>
              </li>
              <li>
                <a href="">Groceries</a>
              </li>
            </ul>
          </div>

          {/* <{!-- column4 -->} */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-white font-medium text-[1.1rem] border-b-[3px] border-primary text-center w-fit py-2">
              Follow Us
            </h2>
            <div className="flex gap-3 mt-5 items-center md:items-start">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#a1a1a1] text-white">
                <FaFacebookF />
              </div>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#a1a1a1] text-white">
                <FaXTwitter />
              </div>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[#a1a1a1] text-white">
                <BsInstagram />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="divider"
        className="border-[#7e7e7ec9] border-b-[2px] w-full mt-[3rem]"
      ></div>

      <div className="flex mt-6 items-center justify-between md:justify-center md:gap-[3rem]">
        <span className="text-white flex items-center gap-2">
          <i className="fa-solid fa-phone"></i>
          <p>7739226540</p>
        </span>
        <span className="text-white flex items-center gap-2">
          <i className="fa-solid fa-envelope"></i>
          <p>saarthi@contact.in</p>
        </span>
        <span className="text-white flex items-center gap-2">
          <i className="fa-solid fa-copyright"></i>
          <p>Copyright 2024</p>
        </span>
      </div>
    </>
  );
};

export default FooterComponent;
