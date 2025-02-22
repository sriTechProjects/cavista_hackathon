import React from "react";

const CartItem = ({index, img, name, price, actualPrice, quantity }) => {
  return (
    <div key={index} className="flex items-center gap-3 border-b pb-3">
      <img src={img} alt={name} className="w-14 h-14 rounded-md" />
      <div className="flex-1">
        <p className="text-sm font-semibold">{name}</p>
        <p className="text-sm text-gray-500">
          <span className="text-primary font-semibold">{price}</span>{" "}
          <span className="line-through text-gray-400">{actualPrice}</span>
        </p>
        <div className="flex items-center gap-2 mt-1">
          <button className="px-2 bg-gray-200 rounded">-</button>
          <span>{quantity}</span>
          <button className="px-2 bg-gray-200 rounded">+</button>
          <button className="ml-auto text-red-500 text-sm">Remove</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
