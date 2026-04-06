import express from 'express'
import { checkoutSession, confirmPayment, getAllOrders, getOrderById, getUserOrders } from '../controllers/ordersController.js'
import  verifyToken  from '../middleware/verifyToken.js'
import { isAdmin } from '../middleware/admin.middleware.js'
const router = express.Router()



// checkout session
router.post('/create-checkout-session', checkoutSession)

// confirm payment
router.post('/confirm-payment', confirmPayment)

// get orders by user id
router.get('/user/:userId', verifyToken, isAdmin, getUserOrders )

// get order by order id
router.get('/order/:orderId', verifyToken, getOrderById )

//get all orders
router.get('/all', verifyToken, isAdmin, getAllOrders)

export default router