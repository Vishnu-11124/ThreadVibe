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
console.log(orders)
  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Orders</h1>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
           <thead>
             <tr className="border-b border-gray-100 text-gray-400 uppercase tracking-widest text-xs">
                <th className="px-6 py-4 text-left font-medium">#</th>
                <th className="px-6 py-4 text-left font-medium">Order ID</th>
                <th className="px-6 py-4 text-left font-medium">Date</th>
                <th className="px-6 py-4 text-left font-medium">Status</th>
                <th className="px-6 py-4 text-left font-medium">Total Amount</th>
                <th className="px-6 py-4 text-left font-medium">View Order</th>
            </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
            {
                orders?.data?.map((order, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-400">{index + 1}</td>
                        <td className="px-6 py-4 text-gray-600 font-mono text-xs">{order._id}</td>
                        <td className="px-6 py-4 text-gray-600">{new Date(order?.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles[order.orderStatus] || "bg-gray-100 text-gray-600"}`}>
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">${order.totalAmount}</td>
                        <td className="px-6 py-4">
                          <Link to={`/orders/${order?._id}`} className="text-sm font-medium bg-green-600 text-white border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-green-700 hover:text-white transition-all duration-200">View Order</Link>
                        </td>
                    </tr>
                ))
                    
            }
           </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserOrders