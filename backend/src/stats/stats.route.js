import express from 'express'
import { getAdminStats, getUserStats } from '../controllers/statsController.js'
import verifyToken from '../middleware/verifyToken.js'
import { isAdmin } from '../middleware/admin.middleware.js'

const router = express.Router()

// user stats 
router.get('/user-stats',verifyToken, getUserStats)

// admin stats
router.get('/admin-stats', verifyToken, isAdmin, getAdminStats )

export default router