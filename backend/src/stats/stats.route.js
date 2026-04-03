import express from 'express'
import { getUserStats } from '../controllers/statsController.js'
import verifyToken from '../middleware/verifyToken.js'

const router = express.Router()

// user stats by email
router.get('/user-stats',verifyToken, getUserStats)


export default router