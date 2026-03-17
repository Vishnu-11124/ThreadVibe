import express from 'express'
const router = express.Router()
import { deleteUser, getAllUsers, loginUser, logoutUser, userRegistration } from '../controllers/userController.js'
import verifyToken from '../middleware/verifyToken.js'

// Register
router.post('/register', userRegistration)

// Login
router.post('/login', loginUser)

// all users
router.get("/users", verifyToken, getAllUsers)

// Delete user
router.delete('/users/:id', verifyToken, deleteUser)

// Logout
router.post('/logout', verifyToken, logoutUser)

export default router