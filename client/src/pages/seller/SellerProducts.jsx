import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { products } from "../../utils/resource/DataProvider.util";
import { RiDeleteBin7Line } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";
import AddNewProductForm from "../../components/seller_components/seller_product_components/AddNewProductForm";

const ITEMS_PER_PAGE = 10;
const getStatustColor = (status) => {
  return status === "Available"
    ? "bg-success-op text-success border border-success"
    : "bg-danger-op text-danger border border-danger";
};


const SellerProducts = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="relative w-full border rounded-md shadow-sm bg-white mt-2">
      {/* Header with Search Bar */}
      <header className="py-3 px-5 flex justify-between items-center border-b">
        <h3 className="text-lg font-medium text-primary-text">Product List</h3>
        <div className="flex items-center gap-x-3">
          <div className="searchbar border px-3 py-2 rounded-md flex items-center gap-x-2">
            <IoSearch className="text-[#8b8b8b]" />
            <input
              type="text"
              placeholder="Search"
              className="w-40 outline-none bg-transparent text-sm"
            />
          </div>

          <button
            className="text-sm bg-primary-txt px-3 py-2 rounded-md text-white flex items-center gap-x-2"
            onClick={() => {
              setIsFormOpen(!isFormOpen);
            }}
          >
            <IoAdd className="text-lg" />
            <p>Add Product</p>
          </button>
        </div>
      </header>

      
      <table className="w-full border-collapse">
       
        <thead className="bg-[#f7f7f7] text-primary-text uppercase text-sm">
          <tr>
            {[
              "#",
              "Name",
              "Category",
              "Sub Category",
              "Count",
              "Status",
              "Actions",
            ].map((heading, index) => (
              <th
                key={index}
                className="px-5 py-3 text-center font-medium text-sm"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        
        <tbody>
          {displayedProducts.map((product, index) => (
            <tr key={product.id} className="border-b transition text-sm">
              <td className="py-3 px-5 text-center">
                {startIndex + index + 1}
              </td>
              <td className="py-3 px-5 text-center">{product.name}</td>
              <td className="py-3 px-5 text-center">{product.category}</td>
              <td className="py-3 px-5 text-center">{product.subCategory}</td>
              <td className="py-3 px-5 text-center">{product.count}</td>
              <td className="py-3 px-5 text-center flex justify-center">
                <p
                  className={`w-fit rounded-full px-2  py-1 ${getStatustColor(
                    product.status
                  )}`}
                >
                  {product.status}
                </p>
              </td>
              <td className="py-2 px-5 text-center space-x-2">
                <button className="border p-2 rounded-md">
                  <RiDeleteBin7Line />
                </button>
                <button className="border p-2 rounded-md">
                  <FaRegStar />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="flex justify-between items-center p-4 border-t">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary-btn text-white rounded-md disabled:bg-primary-bg disabled:text-primary-txt"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary-btn text-white rounded-md disabled:bg-primary-bg disabled:text-primary-txt"
        >
          Next
        </button>
      </div>

      {isFormOpen ? (
        <AddNewProductForm
          onClose={() => {
            setIsFormOpen(false);
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default SellerProducts;
