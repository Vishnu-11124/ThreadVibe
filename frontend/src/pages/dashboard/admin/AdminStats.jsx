import React from "react";

const AdminStats = ({ stats }) => {
  console.log(stats?.data);

  return (
    <div>
      <div className="grid">
        <div>
          <h2>Total Earning</h2>
          <p>{stats?.data?.totalRevenue}</p>
        </div>
        <div>
          <h2>Total Orders</h2>
          <p>{stats?.data?.totalOrders}</p>
        </div>
        <div>
          <h2>Total Users</h2>
          <p>{stats?.data?.totalUsers}</p>
        </div>
        <div>
          <h2>Total Products</h2>
          <p>{stats?.data?.totalProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
