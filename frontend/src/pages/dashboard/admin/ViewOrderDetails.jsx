import React from 'react'

const ViewOrderDetails = ({order, closeModel}) => {
    const OrderDetail = order?.products
    const userDetails = order?.userId
    console.log(order?.products)
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-xl">

        <div className='flex justify-between items-center px-5 py-4 border-b border-gray-100'>
          <h2 className="text-base font-semibold text-gray-800">Order Details</h2>
          <span 
            onClick={closeModel} 
            className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xs cursor-pointer hover:bg-gray-200 transition-colors"
          >✕</span>
        </div>

        <div className='flex divide-x divide-gray-100'>

          {/* product details */}
          <div className="flex-1 p-5">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Product Details</h2>
            <div className="flex flex-col gap-2.5">
              {
                OrderDetail?.map((item) => (
                  <div key={item?._id} className="bg-gray-50 rounded-xl px-3 py-2.5">
                    <p className="text-sm font-medium text-gray-800 mb-1.5">{item?.productId?.name}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-gray-500">Qty: {item?.quantity}</p>
                      <p className="text-sm font-semibold text-gray-800">${item?.productId?.price}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>

          <div className="flex-1 p-5 flex flex-col gap-5">
            {/* user details */}
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">User Details</h2>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-xs font-semibold shrink-0">
                  {userDetails?.email?.[0]?.toUpperCase()}
                </div>
                <p className="text-sm text-gray-600">{userDetails?.email}</p>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* order details */}
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Order Details</h2>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Order Date</p>
                  <p className="text-sm text-gray-700">{new Date(order?.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500">Order Status</p>
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700">{order?.orderStatus}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 mt-1">
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="text-base font-semibold text-gray-800">${order?.totalAmount}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ViewOrderDetails