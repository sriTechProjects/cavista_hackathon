import React from "react";
import { ProductRatings } from "../../../utils/resource/ComponentsProvider.util";

const RecommendedProducts = ({product}) => {
  return (
    <div
      key={product.id}
      className="min-w-[250px] bg-white rounded-lg shadow-md overflow-hidden p-3 flex flex-col gap-y-1"
    >
      <img
        src={product.img}
        alt={product.title}
        className="w-full h-32 object-cover rounded-md"
      />
      <span className="flex items-start justify-between mt-2">
        <h3 className="text-md font-semibold">{product.title}</h3>
        <ProductRatings rating={product.rating} />
      </span>
      <div className="items-center flex gap-x-2">
        <p className="text-base font-semibold text-primary">{product.price}</p>
        <p className="text-sm text-gray-400 line-through">Rs. 90</p>
      </div>
      <button className="mt-2 bg-primary hover:bg-primary-hover text-sm font-semibold text-white py-2 px-4 rounded-md w-full transition">
        Add to Cart
      </button>
    </div>
  );
};

export default RecommendedProducts;
