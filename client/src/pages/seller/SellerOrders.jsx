import { useState } from "react";

import { ordersToPlace } from "../../utils/resource/DataProvider.util";
import { IoSearch, BiExport } from "../../utils/resource/IconsProvider.util";
import OrderDetails from "../../components/seller_components/seller_orders_components/OrderDetails";

const ITEMS_PER_PAGE = 10;

const SellerOrders = () => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const totalPages = Math.ceil(ordersToPlace.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedOrders = ordersToPlace.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const isRowSelected = (id) => selectedRows.includes(id);

  return (
    <>
      <div className="relative w-full border rounded-md shadow-sm bg-white mt-2">
        <header className="py-3 px-5 flex justify-between items-center border-b">
          <h3 className="text-lg font-medium text-primary-text">Order List</h3>
          <div className="flex items-center gap-x-3">
            <div className="searchbar border px-3 py-2 rounded-md flex items-center gap-x-2">
              <IoSearch className="text-[#8b8b8b]" />
              <input
                type="text"
                placeholder="Search"
                className="w-40 outline-none bg-transparent text-sm"
              />
            </div>

            {selectedRows.length > 0 ? (
              <button className="text-sm bg-primary-txt px-3 py-2 rounded-md text-white flex items-center gap-x-2">
                <BiExport className="text-lg" />
                <p>Export</p>
              </button>
            ) : (
              <button
                className="text-sm bg-primary-btn-hover px-3 py-2 rounded-md text-white flex items-center gap-x-2"
                disabled
              >
                <BiExport className="text-lg" />
                <p>Export</p>
              </button>
            )}
          </div>
        </header>

        <table className="w-full border-collapse">
          <thead className="bg-[#f7f7f7] text-primary-text uppercase text-sm">
            <tr>
              <th className="px-5 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedRows(
                      e.target.checked
                        ? ordersToPlace.map((order) => order.id)
                        : []
                    )
                  }
                  checked={selectedRows.length === ordersToPlace.length}
                />
              </th>
              {["#", "Items", "Amount(Rs)", "Action"].map((heading, index) => (
                <th
                  key={index}
                  className="px-5 py-3 text-left font-medium text-sm"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {displayedOrders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b transition text-sm ${
                  isRowSelected(order.id) ? "bg-gray-100" : ""
                }`}
              >
                <td className="py-3 px-5 text-left">
                  <input
                    type="checkbox"
                    onChange={() => toggleRowSelection(order.id)}
                    checked={isRowSelected(order.id)}
                  />
                </td>
                <td className="py-3 px-5 text-left">
                  {startIndex + index + 1}
                </td>
                <td className="py-3 px-5 text-left">
                  {order.items.slice(0, 6).join(", ")}
                  {order.items.length > 6 ? " ..." : ""}
                </td>

                {/* <td className="py-3 px-5 text-center">{order.items.length}</td> */}
                <td className="py-3 px-5 text-center">{order.amount}</td>

                <td className="text-center text-xs">
                  <div className="flex justify-center items-center gap-x-1 h-full">
                    <button
                      className="border border-[#ccc] px-3 py-2 rounded-md font-medium text-primary-txt hover:bg-primary-btn hover:text-white transition-all ease"
                      onClick={() => {}}
                    >
                      Details
                    </button>
                    <button
                      className="border border-[#ccc] px-3 py-2 rounded-md font-medium text-primary-txt hover:bg-primary-btn hover:text-white transition-all ease"
                      onClick={() => {}}
                    >
                      Place order
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* pagination footer */}
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

        {isDetailOpen && (
          <OrderDetails
            onClose={() => {
              setIsDetailOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default SellerOrders;
