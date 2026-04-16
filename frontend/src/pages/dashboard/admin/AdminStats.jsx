import React from "react";

const AdminStats = ({ stats }) => {
  console.log(stats?.data);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Total Earning</h2>
          <p className="text-3xl font-extrabold text-gray-900">${stats?.data?.totalRevenue}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Total Orders</h2>
          <p className="text-3xl font-extrabold text-gray-900">{stats?.data?.totalOrders}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Total Users</h2>
          <p className="text-3xl font-extrabold text-gray-900">{stats?.data?.totalUsers}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Total Products</h2>
          <p className="text-3xl font-extrabold text-gray-900">{stats?.data?.totalProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;