import express from 'express'
const router = express.Router()
import { userRegistration } from '../controllers/userController.js'

// Register
router.post('/register', userRegistration)

export default router