import express from 'express'
import { checkoutSession } from '../controllers/ordersController'
const router = express.Router()

// checkout session
router.post('/create-checkout-session', checkoutSession)

export default router