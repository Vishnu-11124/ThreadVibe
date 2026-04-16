import React from "react";
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminStatsChart = ({ stats }) => {
  // ✅ Loading state
  if (!stats || !stats.data) {
    return (
      <div className="p-6">
        <p className="text-gray-500 text-sm">Loading stats...</p>
      </div>
    );
  }

  const {
    totalOrders,
    totalProducts,
    totalUsers,
    totalRevenue,
    monthlyRevenue,
  } = stats.data;

  // ✅ PIE CHART DATA
  const pieData = {
    labels: ["Orders", "Products", "Users", "Revenue"],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          Number(totalOrders) || 0,
          Number(totalProducts) || 0,
          Number(totalUsers) || 0,
          Number(totalRevenue) || 0,
        ],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(251, 146, 60, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ],
        hoverBackgroundColor: [
          "#6366f1",
          "#fb923c",
          "#22c55e",
          "#ec4899",
        ],
        borderWidth: 0,
      },
    ],
  };

  // ✅ LINE CHART DATA (FIXED KEY: revenue)
  const revenueData = new Array(12).fill(0);

  monthlyRevenue?.forEach((entry) => {
    const monthIndex = (entry.month || 1) - 1;
    revenueData[monthIndex] = Number(entry.revenue) || 0; // ✅ FIX
  });

  const lineData = {
    labels: [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December",
    ],
    datasets: [
      {
        label: "Monthly Revenue",
        data: revenueData,
        fill: true,
        backgroundColor: "rgba(99, 102, 241, 0.08)",
        borderColor: "#6366f1",
        pointBackgroundColor: "#6366f1",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  // ✅ Common options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h2 className="text-lg font-extrabold text-gray-900 tracking-tight mb-6">
        Admin Stats Overview
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* PIE CHART */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Distribution
          </p>
          <div className="h-64">
            <Pie data={pieData} options={options} />
          </div>
        </div>

        {/* LINE CHART */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
            Monthly Revenue
          </p>
          <div className="h-64">
            <Line data={lineData} options={options} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminStatsChart;
