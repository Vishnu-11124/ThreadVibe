import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../orders/orders.model.js";
import Review from "../reviews/reviews.model.js";
import mongoose from "mongoose";

const getUserStats = asyncHandler(async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.userId);
  // console.log(userId)

  // Total payment
  const totalPaymentResult = await Order.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalPayment: { $sum: "$totalAmount" },
      },
    },
  ]);

  const totalPaymentAmount =
    totalPaymentResult.length > 0 ? totalPaymentResult[0].totalPayment : 0;

  // Total reviews
  const totalReviews = await Review.countDocuments({ userId });

  // Total purchased products (unique)
  const totalPurchasedProductsResult = await Order.distinct(
    "products.productId",
    { userId },
  );

  const totalPurchasedProducts = totalPurchasedProductsResult.length;

  res.status(200).json(
    new ApiResponse(200, "User stats fetched successfully", {
      totalPaymentAmount,
      totalReviews,
      totalPurchasedProducts,
    }),
  );
});

export { getUserStats };
