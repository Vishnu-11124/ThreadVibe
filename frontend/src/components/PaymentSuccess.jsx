import React, { useEffect, useState } from 'react';
import { getBaseURL } from '../utils/baseURL';

const PaymentSuccess = () => {
  const [order, setOrder] = useState(null);
  // console.log("id",order.message.orderId)

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
          setOrder(data); // adjust if needed
        })
        .catch((err) => console.log(err));
    }
  }, []);

  if (!order) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  const currentStep = statusSteps.indexOf(order.message.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h1>

      <p className="text-gray-600 mb-6">
        Order ID: <span className="font-semibold">{order.message.orderId}</span>
      </p>

      {/* Status Tracker */}
      <div className="flex justify-between items-center mt-10">
        {statusSteps.map((step, index) => (
          <div key={step} className="flex-1 text-center">
            <div
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center 
              ${index <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </div>
            <p className="mt-2 text-sm capitalize">{step}</p>

            {index !== statusSteps.length - 1 && (
              <div
                className={`h-1 mt-2 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-300'
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default PaymentSuccess;
