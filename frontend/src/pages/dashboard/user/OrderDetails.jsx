import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetOrderByIdQuery } from '../../../redux/features/orders/orderApi'
import { Link } from 'react-router-dom'

const OrderDetails = () => {
    
    const {orderId} = useParams()
    const {data: order, error, isLoading} = useGetOrderByIdQuery(orderId)
    if(isLoading) return <p className="text-center text-gray-400 text-lg mt-20">Loading...</p>
    if(error) return <p className="text-center text-red-400 text-lg mt-20">Error : {error.message}</p>
     const statusSteps = ["pending", "processing", "shipped", "completed"];
       const currentStep = statusSteps.indexOf(order.data.orderStatus);
       console.log("data",order?.data?.orderStatus)

  return (
    <div className="h-screen overflow-auto bg-gray-200 flex items-center justify-center px-4 py-6">
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-2xl text-center">

        {/* Header */}
        <div className="mb-4">
          <h1 className="text-3xl font-extrabold text-green-500 mb-3">
            Payment Successful 🎉
          </h1>
          <div className="inline-block bg-gray-50 rounded-xl px-4 py-2 mb-2">
            <p className="text-sm text-gray-400">Order ID: <span className="font-mono font-semibold text-gray-700">{orderId}</span></p>
          </div>
          <p className="text-sm text-gray-400">Order Status: <span className="font-semibold text-gray-700 capitalize">{order?.data?.orderStatus}</span></p>
        </div>

        {/* Status Tracker */}
        <div className="relative flex justify-between items-start mt-10 mb-12">
          {statusSteps.map((step, index) => (
            <div key={step} className="flex-1 flex flex-col items-center relative">

              {/* Connector line */}
              {index !== statusSteps.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 ${index < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
              )}

              {/* Step circle */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold z-10 relative
                ${index <= currentStep ? 'bg-green-500 text-white shadow-md shadow-green-100' : 'bg-gray-100 text-gray-400'}`}>
                {index < currentStep ? '✓' : index + 1}
              </div>

              <p className={`mt-3 text-xs font-semibold capitalize tracking-wide ${index <= currentStep ? 'text-green-500' : 'text-gray-400'}`}>
                {step}
              </p>
            </div>
          ))}
        </div>

        {/* Back button */}
        <div>
          <Link to="/dashboard/orders" className="inline-block text-sm font-semibold text-white bg-gray-900 rounded-xl px-6 py-2.5">
            ← Back to Orders
          </Link>
        </div>

      </div>
    </div>
  )
}

export default OrderDetails