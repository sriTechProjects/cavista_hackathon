import { useState, useEffect } from "react";
import OrderStatsCards from "../../components/seller_components/seller_orders_components/OrderStatsCards";
import { orders } from "../../utils/resource/DataProvider.util";
import { IoSearch, BiExport } from "../../utils/resource/IconsProvider.util";
import OrderDetails from "../../components/seller_components/seller_orders_components/OrderDetails";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-success-op text-success border border-success";
    case "Shipped":
      return "bg-sky-op text-sky border border-sky";
    case "Processing":
      return "bg-rose-op text-rose border border-rose";
    default:
      return "bg-star-op text-star border border-star";
  }
};

const getPaymentColor = (payment) => {
  return payment === "Paid"
    ? "bg-success-op text-success border border-success"
    : "bg-danger-op text-danger border border-danger";
};
const SellerOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  
    useEffect(() => {
      const fetchOrders = async () => {
        try {
          setLoading(true);
          const response = await axios.get("http://localhost:8000/api/orderhistory");
          setOrders(response.data);
        } catch (err) {
          setError("Failed to fetch orders. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchOrders();
    }, []);

    const toggleRowSelection = (id) => {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    };
  
    const isRowSelected = (id) => selectedRows.includes(id);
  
    return (
      <>
        <div className="order-cards-div w-full rounded-md py-2 flex justify-between gap-x-4">
          <OrderStatsCards
            isIncrease={true}
            title={"Total Orders"}
            description={15}
            value={16.8}
          />
          <OrderStatsCards
            isIncrease={false}
            title={"Cancel Orders"}
            description={20}
            value={8.5}
          />
          <OrderStatsCards
            isIncrease={false}
            title={"Pending Payments"}
            description={5}
            value={3.4}
          />
          <OrderStatsCards
            isIncrease={true}
            title={"Return Orders"}
            description={130}
            value={9.0}
          />
        </div>
  
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
                        e.target.checked ? orders.map((order) => order.id) : []
                      )
                    }
                    checked={selectedRows.length === orders.length}
                  />
                </th>
                {[
                  "#",
                  "Items",
                  "Date",
                  "Amount(Rs.)",
                  "Payment",
                  "Status",
                  "Action",
                ].map((heading, index) => (
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
                    {order.items.slice(0, 3).join(", ")}
                    {order.items.length > 3 ? " ..." : ""}
                  </td>
                  <td className="py-3 px-5 text-center">{order.date}</td>
                  <td className="py-3 px-5 text-center">{order.amount}</td>
                  <td className="py-3 px-5 text-center">
                    <p
                      className={`rounded-full p-1 ${getPaymentColor(
                        order.payment_status
                      )}`}
                    >
                      {order.payment_status}
                    </p>
                  </td>
                  <td className="py-3 px-5 text-center">
                    <p
                      className={`rounded-full p-1 ${getStatusColor(
                        order.order_status
                      )}`}
                    >
                      {order.order_status}
                    </p>
                  </td>
                  <td className="text-center text-xs">
                    <button
                      className="border border-[#ccc] px-3 py-2 rounded-md font-medium text-primary-txt hover:bg-primary-btn hover:text-white transition-all ease"
                      onClick={() => {
                        
                      }}
                    >
                      Details
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
}

export default SellerOrderHistory
