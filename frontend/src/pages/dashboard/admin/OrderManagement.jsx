import React, { useState } from "react";
import {
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
} from "../../../redux/features/orders/orderApi";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const OrderManagement = () => {
  const { data, isLoading, isError } = useGetAllOrdersQuery();
  console.log(data?.data);
  const orders = data?.data?.orders || [];
  const totalOrders = data?.data?.totalOrders || 0;

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isMOdelOpen, setIsMOdelOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();

  const handleEditOrder = (order) => {
    setIsMOdelOpen(true);
    setSelectedOrder(order);
  };

  const handleCloseModel = () => {
    setIsMOdelOpen(false);
    setSelectedOrder(null);
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id).unwrap();
      Toastify({
        text: "Order deleted successfully!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#22c55e" },
      }).showToast();
    } catch (error) {
      Toastify({
        text: "Failed to delete order!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: { background: "#22c55e" },
      }).showToast();
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Failed to load orders.</p>;
  }
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">
          Order Management
        </h2>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow">
          <h3 className="text-sm text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-2xl shadow">
          <h3 className="text-sm text-yellow-600">Pending</h3>
          <p className="text-2xl font-bold text-yellow-700">
            {orders.filter((order) => order.orderStatus === "pending").length}
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl shadow">
          <h3 className="text-sm text-blue-600">Processing</h3>
          <p className="text-2xl font-bold text-blue-700">
            {
              orders.filter((order) => order.orderStatus === "processing")
                .length
            }
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-2xl shadow">
          <h3 className="text-sm text-purple-600">Shipped</h3>
          <p className="text-2xl font-bold text-purple-700">
            {orders.filter((order) => order.orderStatus === "shipped").length}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-2xl shadow">
          <h3 className="text-sm text-green-600">Delivered</h3>
          <p className="text-2xl font-bold text-green-700">
            {orders.filter((order) => order.orderStatus === "delivered").length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Details</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map((order, index) => (
                <tr key={order?._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3">{index + 1}</td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    {order?._id}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {order?.userId?.email}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                    ${order?.orderStatus === "pending" && "bg-yellow-100 text-yellow-700"}
                    ${order?.orderStatus === "processing" && "bg-blue-100 text-blue-700"}
                    ${order?.orderStatus === "shipped" && "bg-purple-100 text-purple-700"}
                    ${order?.orderStatus === "delivered" && "bg-green-100 text-green-700"}
                  `}
                    >
                      {order?.orderStatus}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <button className="px-3 py-1 text-xs bg-indigo-500 text-white rounded-lg hover:bg-indigo-600">
                      View
                    </button>
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {new Date(order?.updatedAt).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditOrder(order)}
                      className="px-3 py-1 text-xs bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteOrder(order?._id)}
                      className="px-3 py-1 text-xs bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
