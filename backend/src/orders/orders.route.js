import express from 'express'
import { checkoutSession, confirmPayment } from '../controllers/ordersController'
const router = express.Router()

// checkout session
router.post('/create-checkout-session', checkoutSession)

// confirm payment
router.post('/confirm-payment', confirmPayment)

export default router