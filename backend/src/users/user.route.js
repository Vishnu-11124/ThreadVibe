import express from 'express'
const router = express.Router()
import { loginUser, userRegistration } from '../controllers/userController.js'

// Register
router.post('/register', userRegistration)

// Login
router.post('/login', loginUser)

export default router