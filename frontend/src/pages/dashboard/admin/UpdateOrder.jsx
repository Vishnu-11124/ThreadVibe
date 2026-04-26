import React, { useState } from 'react'
import { useUpdateOrderStatusMutation } from '../../../redux/features/orders/orderApi'

const UpdateOrder = ({ order, closeModel }) => {

  const [currentStatus, setCurrentStatus] = useState(
    order?.orderStatus?.toLowerCase() || "pending"
  )

  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation()

  const handleOrderStatus = async () => {
    try {
      await updateOrderStatus({
        id: order?._id,
        status: currentStatus
      }).unwrap()
      closeModel()
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 w-full max-w-md mx-4">

        <h2 className="text-lg font-medium text-gray-900 mb-5">
          Update order status
        </h2>

        <div className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              Email address
            </label>
            <input
              type="text"
              value={order?.userId?.email || ""}
              readOnly
              className="w-full bg-gray-50 border border-gray-200 text-gray-500 px-3 py-2 rounded-lg text-sm cursor-default focus:outline-none"
            />
          </div>

          {/* Order ID */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              Order ID
            </label>
            <input
              type="text"
              value={order?._id || ""}
              readOnly
              className="w-full bg-gray-50 border border-gray-200 text-gray-500 px-3 py-2 rounded-lg text-sm font-mono cursor-default focus:outline-none"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1.5">
              Order status
            </label>
            <select
              name="status"
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value)}
              className="w-full border border-gray-200 px-3 py-2 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 justify-end pt-1">
            <button
              onClick={closeModel}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleOrderStatus}
              disabled={isLoading}
              className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Updating..." : "Update"}
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default UpdateOrder