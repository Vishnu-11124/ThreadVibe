import express from 'express'
const router = express.Router()
import { deleteUser, getAllUsers, loginUser, logoutUser, updateUserProfile, updateUserRole, userRegistration } from '../controllers/userController.js'
import verifyToken from '../middleware/verifyToken.js'
import { isAdmin } from '../middleware/admin.middleware.js'

// Register
router.post('/register', userRegistration)

// Login
router.post('/login', loginUser)

// all users
router.get("/users", verifyToken, isAdmin, getAllUsers)

// Delete user
router.delete('/users/:id', verifyToken, isAdmin, deleteUser)

// Update user role
router.put('/users/:userId', verifyToken, isAdmin, updateUserRole)

// update user profile
router.patch('/editprofile', verifyToken, updateUserProfile)

// Logout
router.post('/logout', verifyToken, logoutUser)

export default router