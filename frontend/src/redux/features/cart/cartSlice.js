import { createSlice } from "@reduxjs/toolkit"

const initialState = { 
    products: [],
    selectedItems: 0,
    totalPrice: 0,
    tax: 0,
    taxRate: 0.05,
    grandTotal: 0
}

const recalculate = (state) => {
    state.selectedItems = state.products.reduce((total, p) => total + p.quantity, 0)
    state.totalPrice    = state.products.reduce((total, p) => total + p.price * p.quantity, 0)
    state.tax           = state.totalPrice * state.taxRate
    state.grandTotal    = state.totalPrice + state.tax
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const isExist = state.products.find((p) => p._id === action.payload._id)
            if (!isExist) {
                state.products.push({ ...action.payload, quantity: 1 })
            } else {
                console.log('Item already added..')
            }
            recalculate(state)
        },

        updateQuantity: (state, action) => {
            const { _id, type } = action.payload  // ✅ destructure payload correctly
            const product = state.products.find((p) => p._id === _id)  // ✅ find only matched product
            if (product) {
                if (type === 'increment') {
                    product.quantity += 1
                } else if (type === 'decrement' && product.quantity > 1) {
                    product.quantity -= 1
                }
            }
            recalculate(state)
        },

        removeFromCart: (state, action) => {
            state.products = state.products.filter((p) => p._id !== action.payload)  // ✅ payload is the _id directly
            recalculate(state)
        },

        clearCart: (state) => {
            state.products = []
            recalculate(state)
        }
    },
})

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer