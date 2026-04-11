import React from "react";
import { useSelector } from "react-redux";
import { useGetUserStatsQuery } from "../../../redux/features/stats/statsApi";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import UserStats from "./UserStats";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const UserDMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetUserStatsQuery();
  console.log(stats);
  if (isLoading) {
    return <h1 className="text-center text-gray-400 text-lg mt-20">Loading...</h1>;
  }
  if (error) {
    return <h1 className="text-center text-red-400 text-lg mt-20">{error}</h1>;
  }
  if (!stats) {
    return <h1 className="text-center text-gray-400 text-lg mt-20">No data found</h1>;
  }

  const data = {
    labels: ["Total Orders", "Total Spent", "Total Reviews"],
    datasets: [
      {
        label: "User Stats",
        data: [
          stats.message.totalPurchasedProducts,
          stats.message.totalPaymentAmount,
          stats.message.totalReviews,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const option = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
            label: function(tooltipItem) {
                return `${tooltipItem.label} : ${tooltipItem.raw}`;
            }
        }
      },
    },
  }
  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <div className="mb-4">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">User Dashboard</h1>
        <p className="text-base text-gray-400 mt-1">Hi, <span className="text-gray-700 font-semibold">{user?.username}</span>! Welcome to your dashboard</p>
      </div>
      <hr />
      <UserStats stats={stats} />
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-2 mt-4 max-w-[800px] mx-auto">
  <Bar data={data} options={option} />
</div>
    </div>
  );
};

export default UserDMain;