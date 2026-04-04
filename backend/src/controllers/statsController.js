import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../orders/orders.model.js";
import Product from "../products/products.model.js";
import User from "../users/user.model.js";
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

const getAdminStats = asyncHandler(async (req, res) => {

  const totalOrders = await Order.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalReviews = await Review.countDocuments();
  const totalUsers = await User.countDocuments();

  // Total Revenue
  const totalRevenueResult = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$totalAmount" },
      },
    },
  ]);

  const totalRevenue =
    totalRevenueResult.length > 0
      ? totalRevenueResult[0].totalRevenue
      : 0;

  // Monthly Revenue
  const monthlyRevenueResult = await Order.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        monthlyRevenue: { $sum: "$totalAmount" },
      },
    },
    {
      $sort: { "_id": 1 },
    },
  ]);

  const monthlyRevenue = monthlyRevenueResult.map((item) => ({
    month: item._id,
    revenue: item.monthlyRevenue,
  }));

  res.status(200).json(
    new ApiResponse(200, "Admin stats fetched successfully", {
      totalOrders,
      totalProducts,
      totalReviews,
      totalUsers,
      totalRevenue,
      monthlyRevenue,
    })
  );
});


export { getUserStats, getAdminStats };
