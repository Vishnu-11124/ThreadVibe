import React from 'react'
import { X, ShoppingBag, Minus, Plus, Trash2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import OrderSummary from './OrderSummary'
import { updateQuantity, removeFromCart } from '../../redux/features/cart/cartSlice'
// 👇 adjust these import paths to match your actual redux slice
// import { removeFromCart, incrementQuantity, decrementQuantity } from '../../redux/cartSlice'

const CartModel = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch()
  
  const handleQuantity = (type, _id) => {
    const payload = {
      _id,
      type
    }
    dispatch(updateQuantity(payload))
  }

  const handleRemove = (e, _id) => {
    e.preventDefault()
    dispatch(removeFromCart(_id))
  }
  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-40' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl flex flex-col
          transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-bold text-gray-800">Shopping Cart</h2>
            {products.length > 0 && (
              <span className="bg-purple-100 text-purple-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                {products.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <ShoppingBag className="w-9 h-9 text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <button
                onClick={onClose}
                className="text-sm text-purple-600 hover:underline font-medium"
              >
                Continue Shopping →
              </button>
            </div>
          ) : (
            products.map((product, index) => (
              <div
                key={index}
                className="flex gap-4 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h5>
                  <p className="text-purple-600 font-bold text-sm mt-0.5">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>

                  {/* Quantity + Remove */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                      <button
                      onClick={() => handleQuantity("decrement", product._id)}
                        // onClick={() => dispatch(decrementQuantity(product.id))}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-gray-600 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold text-gray-800">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantity("increment", product._id)}
                        // onClick={() => dispatch(incrementQuantity(product.id))}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white text-gray-600 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                    onClick={(e) => handleRemove(e, product._id)}
                    //   onClick={() => dispatch(removeFromCart(product.id))}
                      className="text-red-400 hover:text-blue-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Footer */}
        {products.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4">
            <OrderSummary />
          </div>
        )}
      </div>
    </>
  )
}

export default CartModel