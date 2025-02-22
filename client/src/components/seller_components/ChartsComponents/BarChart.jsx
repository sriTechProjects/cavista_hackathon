import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [selectedYear, setSelectedYear] = useState("");

  // Sample data for Revenue and Orders
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Product Consumed",
        data: [
          1500, 2200, 1800, 2500, 3200, 2700, 2900, 3100, 2800, 3500,
          4000, 3800,
        ],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderRadius: 4,
      },
      {
        label: "Stock Reordering",
        data: [
          1000, 1300, 1190, 1590, 1670, 3960, 2255, 3380, 1075, 1930, 5200,
          2610,
        ],
        backgroundColor: "rgba(255, 99, 132, 0.7)", 
        borderRadius: 4,
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
      },
    },
    scales: {
      x: {
        grid: {
          drawOnChartArea: false, 
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.3)", 
        },
      },
    },
  };

  return (
    <div className="barchartDiv w-2/3 bg-white p-4 rounded-md shadow-sm border">
      <header className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-primary-txt">Annual Sales</h2>
        <select
          className="border py-2 px-3 text-[0.8rem] outline-none rounded-md text-[#8b8b8b]"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select year</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
      </header>
      <main>
        <Bar data={data} options={options} />
      </main>
    </div>
  );
};

export default BarChart;
