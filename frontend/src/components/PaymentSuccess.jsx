import React, { useEffect, useState } from 'react';
import { getBaseURL } from '../utils/baseURL';

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);

  const statusSteps = ["pending", "processing", "shipped", "completed"];

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get('session_id');

    console.log("Session ID:", sessionId);

    if (sessionId) {
      fetch(`${getBaseURL()}/api/orders/confirm-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to confirm payment");
          return res.json();
        })
        .then((data) => {
          console.log("API Response:", data);
          setOrder(data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (!order) {
    return <div className="h-screen flex items-center justify-center text-gray-400 text-lg">Loading...</div>;
  }

  const currentStep = statusSteps.indexOf(order.message.status);

  return (
    <div className="h-screen overflow-auto bg-gray-50 flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-2xl text-center">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-green-500 mb-3">
            Payment Successful 🎉
          </h1>
          <div className="inline-block bg-gray-50 rounded-xl px-4 py-2">
            <p className="text-sm text-gray-400">Order ID: <span className="font-mono font-semibold text-gray-700">{order.message.orderId}</span></p>
          </div>
        </div>

        {/* Status Tracker */}
        <div className="relative flex justify-between items-start mt-10 mb-6">
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

      </div>
    </div>
  );
};

export default PaymentSuccess;