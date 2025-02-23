import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { RadialBarChart, RadialBar } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const SellerAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    monthlySales: [],
    revenueBreakdown: [],
    topProducts: [],
    fulfillmentRate: 0,
  });

  useEffect(() => {
    // Simulating API data (Replace this with real API call)
    const fetchData = async () => {
      const data = {
        monthlySales: [
          { month: "Jan", Sales: 100 },
          { month: "Feb", Sales: 200 },
          { month: "Mar", Sales: 300 },
          { month: "Apr", Sales: 250 },
          { month: "May", Sales: 400 },
          { month: "Jun", Sales: 500 },
          { month: "Jul", Sales: 700 },
          { month: "Aug", Sales: 600 },
          { month: "Sep", Sales: 800 },
          { month: "Oct", Sales: 900 },
          { month: "Nov", Sales: 1000 },
          { month: "Dec", Sales: 1200 },
        ],
        revenueBreakdown: [
          { name: "Product A", value: 1500 },
          { name: "Product B", value: 1200 },
          { name: "Product C", value: 900 },
          { name: "Product D", value: 800 },
        ],
        topProducts: [
          { name: "Dapazee M 1000 XR", spent: 5000 },
          { name: "Metrose 500 SR", spent: 4000 },
          { name: "Glyzee 2", spent: 3000 },
        ],
        fulfillmentRate: 85,
      };
      setAnalyticsData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      {/* Line Chart for Sales Trends */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Monthly Sales Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={analyticsData.monthlySales}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Sales"
              stroke="#8884d8"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {/* Revenue Breakdown Pie Chart */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-3">Revenue Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={analyticsData.revenueBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {analyticsData.revenueBreakdown.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Order Fulfillment Rate */}
        <div className="bg-white p-4 rounded shadow flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-3">Order Fulfillment Rate</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="70%"
              outerRadius="100%"
              barSize={15}
              data={[
                {
                  name: "Fulfillment Rate",
                  value: analyticsData.fulfillmentRate,
                },
              ]}
            >
              <RadialBar
                minAngle={15}
                background
                clockWise
                dataKey="value"
                fill="#82ca9d"
              />
              <Legend />
            </RadialBarChart>
          </ResponsiveContainer>
          <p className="text-xl font-bold">{analyticsData.fulfillmentRate}%</p>
        </div>
      </div>

      {/* Top Customers */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">Top Products</h3>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Product Name</th>
              <th className="border border-gray-300 p-2">Total Spent (Rs)</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.topProducts.map((customer, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">{customer.name}</td>
                <td className="border border-gray-300 p-2">{customer.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellerAnalytics;
