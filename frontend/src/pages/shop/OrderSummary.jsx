import React from 'react'
import { Trash2, ShoppingBag, Tag, Receipt, ChevronRight } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
// import { clearCart } from '../../redux/cartSlice' // adjust path to your slice
import { clearCart } from '../../redux/features/cart/cartSlice' // adjust path to your slice

import { stripePromise } from '../../utils/stripe'; // adjust path if needed

import { getBaseURL } from '../../utils/baseURL'

const OrderSummary = (e) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  // console.log(user)
  const products = useSelector((state) => state.cart.products)
  // console.log(products)
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector((store) => store.cart)

  // Payment integration
  const makePayment = async (e) => {
  try {
    const body = {
      products: products.map(item => ({
        productId: item._id,
        quantity: item.quantity || 1
      })),
      userId: user?._id
    };
    console.log("body",body)


    const response = await fetch(
      `${getBaseURL()}/api/orders/create-checkout-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      }
    );

    console.log("response",response)

    const session = await response.json();
    console.log("session",session)

    if (!response.ok) {
      console.error(session);
      return;
    }

    // ✅ NEW Stripe redirect
    window.location.href = session.message.url;

  } catch (error) {
    console.error("Payment error:", error);
  }
};



  return (
    <div className="space-y-3">

      {/* Title */}
      <div className="flex items-center gap-2 mb-1">
        <Receipt className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Order Summary</h3>
      </div>

      {/* Breakdown */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-2.5">

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-gray-500">
            <Tag className="w-3.5 h-3.5" />
            Items ({selectedItems})
          </span>
          <span className="font-medium text-gray-700">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            Tax {taxRate !== undefined && (
              <span className="text-xs text-gray-400">({(taxRate * 100).toFixed(0)}%)</span>
            )}
          </span>
          <span className="font-medium text-gray-700">${tax.toFixed(2)}</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="text-green-500 font-semibold text-xs">FREE</span>
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-gray-200 pt-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-800">Grand Total</span>
            <span className="text-lg font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              ${grandTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">

        {/* Checkout Button */}
        <button
         onClick={(e) => {
          e.preventDefault()
          makePayment()
         }}
         className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl
          bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
          text-white font-semibold text-sm
          hover:shadow-lg hover:shadow-pink-200 hover:scale-[1.02]
          active:scale-[0.98] transition-all duration-200">
          <ShoppingBag className="w-4 h-4" />
          <span>Proceed to Checkout</span>
          <ChevronRight className="w-4 h-4 ml-auto" />
        </button>

        {/* Clear Cart Button */}
        <button
          onClick={() => dispatch(clearCart())}
          // onClick={() => dispatch(clearCart())}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
            border border-red-200 text-red-400
            hover:bg-red-50 hover:text-red-500 hover:border-red-300
            active:scale-[0.98] transition-all duration-200 text-sm font-medium">
          <Trash2 className="w-4 h-4" />
          <span>Clear Cart</span>
        </button>

      </div>
    </div>
  )
}

export default OrderSummary