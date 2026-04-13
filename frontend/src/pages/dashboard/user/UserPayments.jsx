import React from 'react'
import { useGetOrdersByUserIdQuery } from '../../../redux/features/orders/orderApi'

const statusStyles = {
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
};

const UserPayments = () => {
    const {data: orders, error, isLoading} = useGetOrdersByUserIdQuery()
    if(isLoading) return <p className="text-center text-gray-400 text-lg mt-20">Loading...</p>
    if(error) return <p className="text-center text-red-400 text-lg mt-20">No orders found</p>
    const orderData = orders?.data  
    const totalPayment = orderData.reduce((total, order) => total + order.totalAmount, 0)
    console.log(orderData)
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="mb-4">
        <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Payment Details</h3>
      </div>
      <hr className="border-gray-100 mb-6" />

      {/* Total Spent */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 uppercase tracking-widest font-medium mb-1">Total Spent</p>
        <span className="text-2xl font-extrabold text-gray-900">${totalPayment ? totalPayment : 0}</span>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-4">
        {orderData.map((order, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Order Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
              <span className="text-sm font-bold text-gray-900">Order #{index + 1}</span>
            </div>

            {/* Products */}
            <ul className="divide-y divide-gray-50">
              {order.products.map((item, i) => (
                <li key={i} className="flex items-center justify-between px-5 py-2.5">
                  <span className="text-sm text-gray-600">{item.productId?.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-400">x{item.quantity}</span>
                    <span className="text-sm font-semibold text-gray-900">${item.productId?.price * item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Order Footer */}
            <div className="flex items-center gap-6 px-5 py-3 border-t border-gray-50 bg-gray-50">
                <p className="text-xs text-gray-400 font-medium">Status : <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[order?.orderStatus] || "bg-gray-100 text-gray-600"}`}>
                  {order?.orderStatus}
                </span></p>
                <p className="text-xs text-gray-400 font-medium">Date : <span className="text-xs text-gray-500 font-semibold">{new Date(order?.createdAt).toLocaleDateString()}</span></p>
                <p className="text-xs text-gray-400 font-medium ml-auto">Total Amount : <span className="text-sm font-extrabold text-gray-900">${order?.totalAmount}</span></p>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default UserPayments