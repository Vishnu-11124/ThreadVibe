import express from "express"
import { postReview } from "../controllers/reviewController.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

// post a new review
router.post("/post-review", verifyToken , postReview)

export default router