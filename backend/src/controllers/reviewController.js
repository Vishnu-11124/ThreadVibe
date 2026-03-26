import Review from "../reviews/reviews.model.js";
import Product from "../products/products.model.js"; // 👈 import product model
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";

const postReview = asyncHandler(async (req, res) => {
    const { comment, rating, productId } = req.body;

    // ✅ Get user from auth middleware (IMPORTANT)
    const userId = req.user?.userId

    if(!userId) {
        throw new ApiError(400,"UserId not found")
    }

    // 🔒 Validation
    if (!comment || !rating || !productId) {
        throw new ApiError(400, "All fields are required");
    }

    if (rating < 1 || rating > 5) {
        throw new ApiError(400, "Rating must be between 1 and 5");
    }

    // ✅ Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        throw new ApiError(404, "Product not found");
    }

    // 🚫 Prevent duplicate review
    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
        throw new ApiError(400, "You have already reviewed this product");
    }

    // ✅ Create review
    const review = await Review.create({
        comment,
        rating,
        productId,
        userId
    });

    // ⭐ Update product rating
    const reviews = await Review.find({ productId });

    const avgRating =
        reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

    product.rating = avgRating;
    await product.save();

    return res.status(201).json(
        new ApiResponse(201, review, "Review posted successfully")
    );
});

export { postReview };
