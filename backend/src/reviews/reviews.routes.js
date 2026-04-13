import express from "express"
import { postReview, totalReview, userReview } from "../controllers/reviewController.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

// post a new review
router.post("/post-review", verifyToken , postReview)

// total review
router.get("/total-review", totalReview)

// userReview
router.get("/user-reviews", verifyToken, userReview)

export default router