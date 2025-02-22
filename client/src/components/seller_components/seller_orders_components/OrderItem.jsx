import React from "react";

const OrderItem = () => {
  return (
    <>
      <div className="flex gap-x-2 items-center justify-between p-2 rounded-md">
        <div className="flex">
          <img
            src="https://m.media-amazon.com/images/I/61Y1PZx5CZL.jpg"
            alt=""
            className="w-[4vw] h-[4vw] shadow-sm rounded-md"
          />
          <div className="mt-1">
            <h1 className="text-sm">Basmati Rice</h1>
            <p className="text-xs font-medium text-[#8b8b8b]">Qty: 2</p>
          </div>
        </div>
        <div>
          <p className="text-lg font-medium text-primary-txt mr-1">Rs. 430</p>
        </div>
      </div>
      <hr />
    </>
  );
};

export default OrderItem;
