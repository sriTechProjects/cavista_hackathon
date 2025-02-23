import { useState, useEffect } from "react";
import axios from "axios";

import { IoSearch, BiExport } from "../../utils/resource/IconsProvider.util";
// import OrderDetails from "../../components/seller_components/seller_orders_components/OrderDetails";

const SellerOrders = () => {
  const [order, setOrder] = useState({
    itemNames: "",
    totalCost: 0,
    products: [],
  });
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/restock");
        const products = response.data.products;
        const totalCost = response.data.total_cost;
        const itemNames = products.map((p) => p.product_name).join(", ");
        setOrder({ products, totalCost, itemNames });
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading orders...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="relative w-full border rounded-lg shadow-md bg-white mt-4 p-6">
      <header className="py-4 px-6 flex justify-between items-center border-b">
        <h3 className="text-xl font-semibold text-primary-text">
          Order Summary
        </h3>
      </header>

      <table className="w-full border-collapse mt-4">
        <thead className="bg-gray-200 text-primary-text uppercase text-sm">
          <tr>
            <th className="px-6 py-4 text-left font-medium">Item Names</th>
            <th className="px-6 py-4 text-left font-medium">Total Cost</th>
            <th className="px-6 py-4 text-center font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b bg-white hover:bg-gray-100 transition text-sm">
            <td className="py-4 px-6 text-left font-medium text-gray-800">
              {order.itemNames}
            </td>
            <td className="py-4 px-6 text-left font-medium text-gray-800">
              ₹{order.totalCost}
            </td>
            <td className="text-center">
              <div className="flex justify-center items-center gap-x-2">
                <button
                  className="border border-gray-300 px-4 py-2 rounded-lg font-medium text-primary-txt hover:bg-primary-btn hover:text-white transition-all ease-in-out duration-200"
                  onClick={() => setIsDetailOpen(true)}
                >
                  Details
                </button>
                <button
                  className="border border-gray-300 px-4 py-2 rounded-lg font-medium text-primary-txt hover:bg-primary-btn hover:text-white transition-all ease-in-out duration-200"
                  onClick={() => {}}
                >
                  Place Order
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* {isDetailOpen && <OrderDetails onClose={() => setIsDetailOpen(false)} />} */}
    </div>
  );
};

export default SellerOrders;
