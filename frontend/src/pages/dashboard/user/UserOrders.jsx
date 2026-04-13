import { useGetOrdersByUserIdQuery } from "../../../redux/features/orders/orderApi";
import { Link } from "react-router-dom";

const statusStyles = {
  pending:    "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped:    "bg-purple-100 text-purple-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
};

const UserOrders = () => {
   
const { data: orders, error, isLoading } = useGetOrdersByUserIdQuery();
    if (isLoading) return <p className="text-center text-gray-400 text-lg mt-20">Loading...</p>;
if (error) {
  return <p className="text-center text-red-400 text-lg mt-20">Error : {error.message}</p>
}
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Orders</h1>
      </div>

      <div className="flex flex-col gap-6">
        {orders?.data?.map((order, index) => (
          <div key={index} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

            {/* Order Title Bar */}
            <div className="px-6 py-3 border-b border-gray-50">
              <span className="text-sm font-bold text-gray-900">Order #{index + 1}</span>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-3 divide-x divide-gray-50">

              {/* Left — Products */}
              <div className="col-span-2 px-6 py-4">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Products</p>
                <ul className="flex flex-col gap-3">
                  {order.products.map((item, i) => (
                    <li key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span className="text-sm text-gray-700">{item.productId?.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-400">x{item.quantity}</span>
                        <span className="text-sm font-semibold text-gray-900">${item.productId?.price * item.quantity}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — Order Summary */}
              <div className="col-span-1 px-6 py-4 flex flex-col gap-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Order Info</p>
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="text-xs font-mono text-gray-600 truncate">{order._id}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Date</p>
                  <p className="text-xs font-semibold text-gray-700">{new Date(order?.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${statusStyles[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Total</p>
                  <p className="text-sm font-extrabold text-gray-900">${order.totalAmount}</p>
                </div>
                <Link to={`/orders/${order?._id}`} className="mt-auto text-xs font-semibold text-center bg-gray-900 text-white rounded-lg px-4 py-1.5 hover:bg-gray-700 transition-all duration-200">
                  View Order
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserOrders