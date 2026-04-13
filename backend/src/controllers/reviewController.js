import Review from "../reviews/reviews.model.js";
import Product from "../products/products.model.js"; // 👈 import product model
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";

const postReview = asyncHandler(async (req, res) => {
  const { comment, rating, productId } = req.body;

  const userId = req.user?.userId;

  if (!userId) {
    throw new ApiError(400, "UserId not found");
  }

  // 🔒 Validation
  if (!comment || !rating || !productId) {
    throw new ApiError(400, "All fields are required");
  }

  if (rating < 1 || rating > 5) {
    throw new ApiError(400, "Rating must be between 1 and 5");
  }

  // ✅ Check product
  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // 🔍 Check existing review
  let review = await Review.findOne({ productId, userId });

  if (review) {
    // ✏️ UPDATE review
    review.comment = comment;
    review.rating = rating;

    await review.save();
  } else {
    // 🆕 CREATE review
    review = await Review.create({
      comment,
      rating,
      productId,
      userId
    });
  }

  // ⭐ Recalculate rating
  const reviews = await Review.find({ productId });

  const avgRating =
    reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length;

  product.rating = avgRating;
  await product.save();

  return res.status(200).json(
    new ApiResponse(200, review, "Review saved successfully")
  );
});


// total review
const totalReview = asyncHandler(async (req, res) => {
    const totalReview = await Review.countDocuments({})
    res.status(200).json(new ApiResponse(200, totalReview, "Total review fetched successfully"))
})

// get review by userId
const userReview = asyncHandler(async (req, res) => {
    const { userId } = req.user

    if(!userId) {
        throw new ApiError(400,"UserId not found")
    }

const review = await Review.find({ userId }).populate("productId", "name images").sort({ createdAt: -1 })
    if(review.length === 0) {
        throw new ApiError(404, "No review found")
    }
    
    res.status(200).json(new ApiResponse(200, review, "Review fetched successfully"))
})

export { postReview, totalReview, userReview };
