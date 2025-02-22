import React from "react";
import { MdEmail } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import OrderItem from "./OrderItem";

const OrderDetails = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative bg-[#f9f9f9] p-4 rounded-md w-[65%]">
        <button className="absolute top-3 right-5 outline-none border-none" onClick={onClose}>
          <IoMdClose className="text-2xl" />
        </button>
        <h1 className="text-xl font-semibold text-primary-txt mb-3">
          Order Details
        </h1>
        <main className="w-full flex gap-x-4">
          <div className="left w-2/3 rounded-md ">
            <div className="upper px-3 py-3 rounded-md bg-white flex flex-col gap-y-2">
              <header className="flex justify-between items-center">
                <h3 className="text-sm font-medium">
                  <span className="text-sky">Order Id:</span> #23432
                </h3>
                <button className="flex items-center gap-x-1 border border-[#ccc] p-2 text-xs rounded-md text-[#8b8b8b]">
                  <MdEmail className="text-sm" /> Message Customer
                </button>
              </header>
              <main className="rounded-md mt-3 flex flex-col border">
                <OrderItem />
                <OrderItem />
                <OrderItem />
              </main>
            </div>
          </div>
          <div className="right w-1/3 border rounded-md p-3 bg-white">
            <h2 className="text-sm font-medium text-sky">Track Order</h2>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OrderDetails;
