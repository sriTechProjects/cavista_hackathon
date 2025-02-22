import React from "react";

const ProductCategoryCardComponent = ({title, image}) => {
  return (
    <div class="flex flex-col items-center justify-center gap-2 min-w-[8rem] min-h-[8.4rem] rounded-lg bg-[#ececec68] transition-all duration-300 ease-in-out cursor-pointer text-center shadow-sm hover:bg-gradient-to-r from-[#abecd6] to-[#fbed96] hover:shadow-md">
      <div class="w-[3.5rem] flex justify-center">
        <img
          src={image}
          alt="fruit icon"
          class="w-full"
        />
      </div>
      <div>
        <h3 class="text-sm font-semibold text-[#4d4d4d] mt-1">
          <a href="/category/Vegetables">{title}</a>
        </h3>
      </div>
    </div>
  );
};

export default ProductCategoryCardComponent;
