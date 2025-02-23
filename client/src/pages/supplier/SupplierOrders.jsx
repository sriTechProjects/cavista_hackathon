import { useState, useEffect } from "react";

import { ordersToDispatch } from "../../utils/resource/DataProvider.util";
import { IoSearch } from "../../utils/resource/IconsProvider.util";
import OrderDetails from "../../components/seller_components/seller_orders_components/OrderDetails";
import axios from "axios";

const ITEMS_PER_PAGE = 10;

const SupplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleDispatch = async (order) => {
    const emailApiUrl = "http://localhost:8000/api/send-email"; // Update with actual backend API
  
    try {
      const emailData = {
        from: "srivaths.iyer@gmail.com", // Update with sender's email
        to: "rohan.agrawal@mitaoe.ac.in", // Ensure order object includes clientEmail
        subject: "Order Dispatched",
        text: `Dear ${order.client}, your order (ID: ${order.order_id}) has been dispatched.`,
        html: `
          <div style="text-align: center;">
            <h2>Order Dispatched</h2>
            <p>Dear ${order.client}, your order has been dispatched successfully.</p>
            <p><strong>Order ID:</strong> ${order.order_id}</p>
            <p><strong>Location:</strong> ${order.location}</p>
            <p><strong>Amount:</strong> Rs ${order.amount}</p>
            <p><strong>Items:</strong> ${order.items.map((item) => item).join(", ")}</p>
            <img src="https://your-image-url.com/order-image.png" alt="Order Dispatched" width="300"/>
            <p>Thank you for choosing us!</p>
          </div>
        `,
        imagePath: "../../assets/Paracetamol.png", // If using local images (optional)
      };
  
      await axios.post(emailApiUrl, emailData);
      alert(`Dispatch email sent to ${order.client}`);
    } catch (error) {
      console.error("Failed to send email:", error);
      alert("Failed to send email. Please try again.");
    }
  };
  
  

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:8000/api/orderhistory"
        );
        // Filter out orders where the status is "Delivered"
        const filteredOrders = response.data.filter(
          (order) =>
            order.status !== "Delivered" &&
            order.client?.trim() && // Ensure client name is not empty
            order.location?.trim() && // Ensure location is not empty
            order.items &&
            order.items.length > 0 // Ensure there are items in the order
        );

        setOrders(filteredOrders);
      } catch (err) {
        setError("Failed to fetch orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedOrders = orders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
          </div>
        </header>

        <table className="w-full border-collapse">
          <thead className="bg-[#f7f7f7] text-primary-text uppercase text-sm">
            <tr>
              {[
                "#",
                "Client",
                "Location",
                "Items",
                "Amount(Rs)",
                "Date",
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
                key={order.order_id}
                className={"border-b transition text-sm"}
              >
                <td className="py-3 px-5 text-left">
                  {startIndex + index + 1}
                </td>
                <td className="py-3 px-5 text-left">{order.client}</td>
                <td className="py-3 px-5 text-left">{order.location}</td>

                <td className="py-3 px-5 text-left">
                  {order.items && order.items.length > 0 ? (
                    <>
                      {order.items
                        .map((item, index) => {
                          // Log each item with its order and index
                          console.log(
                            `Order ${order.order_id} - Item ${index + 1}:`,
                            item
                          );
                          return item || "Unnamed Item";
                        })
                        .slice(0, 3)
                        .join(", ")}
                      {order.items.length > 3 && " ..."}
                    </>
                  ) : (
                    <span className="text-gray-400">No Items</span>
                  )}
                </td>

                {/* <td className="py-3 px-5 text-center">{order.items.length}</td> */}
                <td className="py-3 px-5 text-center">{order.amount}</td>

                <td className="py-3 px-5 text-left">{order.date}</td>
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
                      onClick={() => handleDispatch(order)}
                    >
                      Dispatch
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

export default SupplierOrders;
