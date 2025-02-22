import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutChart = () => {
  const [selectedYear, setSelectedYear] = useState("");

  // Sample Product Sales Data
  const data = {
    labels: ["Product A", "Product B", "Product C", "Product D", "Product E"],
    datasets: [
      {
        label: "Sales (Units)",
        data: [120, 90, 60, 150, 80],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",  
          "rgba(54, 162, 235, 0.7)",  
          "rgba(255, 206, 86, 0.7)",  
          "rgba(75, 192, 192, 0.7)", 
          "rgba(153, 102, 255, 0.7)",
        ],
        borderWidth: 1,
        borderRadius: 5,
        hoverOffset: 10,
        spacing: 5
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Product Sales Distribution",
        font: { size: 16 },
      },
    },
    cutout: "50%", // This makes it a doughnut chart by adding a hole in the center
  };

  return (
    <div className="w-1/3 bg-white p-4 rounded-md shadow-sm border">
      <header className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-medium text-primary-txt">Product Sales</h2>
        <div className="flex gap-3">
          {/* Year Dropdown */}
          <select
            className="border py-2 px-3 text-[0.8rem] outline-none rounded-md text-[#8b8b8b]"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {[2020, 2021, 2022, 2023, 2024].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </header>
      <main className="flex justify-center items-center">
        <Doughnut data={data} options={options} />
      </main>
    </div>
  );
};

export default DoughnutChart;
