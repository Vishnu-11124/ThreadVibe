import express from 'express'
import { checkoutSession, confirmPayment, getUserOrders } from '../controllers/ordersController.js'
import  verifyToken  from '../middleware/verifyToken.js'
import { isAdmin } from '../middleware/admin.middleware.js'
const router = express.Router()



// checkout session
router.post('/create-checkout-session', checkoutSession)

// confirm payment
router.post('/confirm-payment', confirmPayment)

// get orders by user id
router.get('/user/:userId', verifyToken, isAdmin, getUserOrders )

export default router