import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const SellerChart = ({ stats }) => {
  const data = {
    labels: ["Listings", "Sold", "Active"],
    datasets: [
      {
        label: "Seller Stats",
        data: [
          stats.totalListings,
          stats.totalSold,
          stats.activeListings,
        ],
        backgroundColor: ["#007bff", "#28a745", "#ffc107"],
      },
    ],
  };

  return <Bar data={data} />;
};

export default SellerChart;