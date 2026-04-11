import React from 'react'

const UserStats = ({stats}) => {
    console.log(stats)
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Total Payments</h2>
            <p className="text-3xl font-extrabold text-gray-900">${stats.message.totalPaymentAmount}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Total Reviews</h2>
            <p className="text-3xl font-extrabold text-gray-900">${stats.message.totalReviews}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-2">Total Orders</h2>
            <p className="text-3xl font-extrabold text-gray-900">${stats.message.totalPurchasedProducts}</p>
        </div>
      </div>
    </div>
  )
}

export default UserStats