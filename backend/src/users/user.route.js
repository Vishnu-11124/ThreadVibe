import express from 'express'
const router = express.Router()
import { deleteUser, getAllUsers, loginUser, logoutUser, updateUserProfile, updateUserRole, userRegistration } from '../controllers/userController.js'
import verifyToken from '../middleware/verifyToken.js'

// Register
router.post('/register', userRegistration)

// Login
router.post('/login', loginUser)

// all users
router.get("/users", verifyToken, getAllUsers)

// Delete user
router.delete('/users/:id', verifyToken, deleteUser)

// Update user role
router.put('/users/:userId', verifyToken, updateUserRole)

// update user profile
router.patch('/editprofile', verifyToken, updateUserProfile)

// Logout
router.post('/logout', verifyToken, logoutUser)

export default router