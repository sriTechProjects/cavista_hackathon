import React from "react";
import {
  FaShoppingCart,
  FaBolt,
  FaStore,
  FaLocationDot,
  FaClock,
} from "../../utils/resource/IconsProvider.util";

import { ProductRatings } from "../../utils/resource/ComponentsProvider.util";
import RecommendedProducts from "../../components/customer_components/customer_common_components/RecommendedProducts";

const CustomerProductPage = () => {
  const recommendedProducts = [
    {
      id: 1,
      img: "https://imgs.search.brave.com/_4sKfyMOjKVAOQJ2p0eAJltX-qSviaK0lhCUooOYQKw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aW1hZ2VzLmV4cHJl/c3MuY28udWsvaW1n/L2R5bmFtaWMvMTQv/NTkweC9zZWNvbmRh/cnkvYmFuYW5hcy01/OTI5NzA5LmpwZz9y/PTE3Mzg1MTExNzEz/OTA",
      title: "Fresh Bananas",
      price: "Rs. 80",
      rating: 4.8,
    },
    {
      id: 2,
      img: "https://imgs.search.brave.com/E4B3F1kqjhub03Tnmzg7vrlOIJbuj9sfy1n1lD8HEFg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/NTA5OTg2OS9waG90/by9zaXgtYXBwbGVz/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1LeDlqTnZFRVQ1/RVJyN29ITkZNeHJv/VGM1NEsxTmdrN1Ix/Qlc5SUNYMlBVPQ",
      title: "Red Apples",
      price: "Rs. 80",
      rating: 4.8,
    },
    {
      id: 3,
      img: "https://imgs.search.brave.com/Wim1vOJq_-t7HGc0xKxH52MndHQYQrQhdl1L85Hois8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAyLzc5LzYwLzY5/LzM2MF9GXzI3OTYw/Njk5OV80Zkl0anYx/UkdqN29ndWp6UVNa/cUI5aGZrYnl6eEo0/ci5qcGc",
      title: "Juicy Oranges",
      price: "Rs. 80",
      rating: 4.8,
    },
    {
      id: 4,
      img: "https://imgs.search.brave.com/EHArHypwlGrB5iYPJUV-IUMLvdZOA-ZWrpdRG_yVVYY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTEz/Mjk0MjYzMS9waG90/by93aGl0ZS1ncmFw/ZS5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9VVZSUUw0a25Q/ZTh0SmE1aXJSdDN5/ZGF0Y1VrUThCSklK/WUtKejlJSDdYZz0",
      title: "Green Grapes",
      price: "Rs. 80",
      rating: 4.8,
    },
  ];

  return (
    <>
      {/* Product Section */}
      <div className="py-5 px-[7vw] flex flex-col gap-y-4 lg:flex-row lg:gap-x-8">
        {/* Image Section */}
        <div className="image-container lg:px-4 w-full lg:w-1/2 flex flex-col gap-3">
          <div className="upper w-full h-[55vh] bg-white rounded-md shadow-sm overflow-hidden">
            <img
              src="https://img.livestrong.com/-/clsd/getty/82965f93904649bba70ac8577b9335b5.jpg"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="lower flex gap-x-3">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white w-1/3 h-32 rounded-md shadow-sm overflow-hidden"
                >
                  <img
                    src="https://img.livestrong.com/-/clsd/getty/82965f93904649bba70ac8577b9335b5.jpg"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Description Section */}
        <div className="description-container px-7 py-8 bg-white w-full lg:w-1/2 rounded-md shadow-sm flex flex-col gap-y-4">
          <h1 className="font-bold text-3xl text-primary-txt">
            Black Grapes (Kala Jamoon)
          </h1>
          <p className="text-sm text-[#666]">
            Fresh black grapes packed with antioxidants. Great for snacks,
            juices, and desserts. Order now for same-day delivery!
          </p>

          {/* Rating */}
          <ProductRatings rating="4.5" />

          {/* Price & Quantity */}
          <div className="flex justify-between items-center">
            <div className="items-center gap-x-2">
              <p className="text-2xl font-semibold text-primary">
                Rs. 71{" "}
                <span className="text-xs text-[#8b8b8b] font-normal ml-2">
                  ( including all taxes )
                </span>
              </p>
              <p className="text-sm text-gray-400 line-through">Rs. 90</p>
            </div>

            <div>
              <h3 className="text-[0.9rem] font-medium text-primary text-right mb-2">
                Quantity
              </h3>
              <select name="" id="" className="text-sm border p-1 rounded-md outline-none">
                <option value="">
                  Select qty
                </option>
                <option value="">50g</option>
                <option value="">100g</option>
                <option value="">200g</option>
                <option value="">500g</option>
                <option value="">1kg</option>
              </select>
            </div>
          </div>

          <hr />

          <div>
            <h3 className="text-primary font-medium mb-2">Details</h3>
            <div className="py-3 flex flex-col gap-y-4 md:flex-row md:items-center">
              {/* shop name */}
              <div className="flex md:w-1/3 items-center gap-x-4">
                <div className="border border-[#8b8b8b] p-4 md:p-3 text-xl md:text-lg text-[#8b8b8b] rounded-md">
                  <FaStore />
                </div>
                <div>
                  <p className="text-[0.8rem] md:text-xs font-semibold text-primary-txt">
                    Shop Name
                  </p>
                  <p className="text-[1rem] md:text-sm font-medium text-[#8b8b8b]">
                    Vegies World
                  </p>
                </div>
              </div>

              {/* location */}
              <div className="flex md:w-1/3 items-center gap-x-4">
                <div className="border border-[#8b8b8b] p-4 md:p-3 text-xl md:text-lg text-[#8b8b8b] rounded-md">
                  <FaLocationDot />
                </div>
                <div>
                  <p className="text-[0.8rem] md:text-xs font-semibold text-primary-txt">
                    Location
                  </p>
                  <p className="text-[1rem] md:text-sm font-medium text-[#8b8b8b]">
                    Alandi, Pune
                  </p>
                </div>
              </div>

              {/* delivery time */}
              <div className="flex md:w-1/3 items-center gap-x-4">
                <div className="border border-[#8b8b8b] p-4 md:p-3 text-xl md:text-lg text-[#8b8b8b] rounded-md">
                  <FaClock />
                </div>
                <div>
                  <p className="text-[0.8rem] md:text-xs font-semibold text-primary-txt">
                    Delivery Time
                  </p>
                  <p className="text-[1rem] md:text-sm font-medium text-[#8b8b8b]">8min</p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-y-4">
            <button className="text-primary-txt border border-[#333] py-3 px-6 rounded-md flex items-center justify-center gap-2 transition">
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="bg-primary hover:bg-primary-hover text-white py-3 px-6 rounded-md flex items-center justify-center gap-2 transition">
              <FaBolt /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="px-[7vw] py-8">
        <h2 className="text-3xl font-semibold mb-3 text-primary-txt">
          Recommended Products
        </h2>
        <div className="flex overflow-x-auto gap-4 py-3 scrollbar-hide">
          {recommendedProducts.map((product) => (
            <RecommendedProducts product={product}/>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerProductPage;
