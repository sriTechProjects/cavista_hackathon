import React from "react";
import  {FaStar} from '../../../utils/resource/IconsProvider.util'

const ProductRatings = ({rating}) => {
  return (
    <span className="flex items-center gap-x-2 w-fit py-1 px-3 rounded-md border border-gray-400 text-sm">
      <p className="font-semibold">{rating}</p>{" "}
      <FaStar className="text-yellow-500" />
    </span>
  );
};

export default ProductRatings;
