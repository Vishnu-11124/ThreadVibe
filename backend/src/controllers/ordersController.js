import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Product from "../products/products.model.js";
import Order from "../orders/orders.model.js";
import Stripe from 'stripe';
import mongoose from "mongoose";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



const checkoutSession = asyncHandler(async (req, res) => {
  const { products, userId } = req.body;

  if (!products || !Array.isArray(products) || products.length === 0) {
    throw new ApiError(400, "Products are required");
  }

  const dbProducts = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.productId);

      if (!product) {
        throw new ApiError(404, "Product not found");
      }

      return {
        name: product.name,
        price: product.price,
        image: product.images?.[0] || "",
        quantity: item.quantity || 1,
      };
    })
  );

  const lineItems = dbProducts.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.name,
        images: [product.image],
      },
      unit_amount: Math.round(product.price * 100),
    },
    quantity: product.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",

    metadata: {
      userId: userId,
      products: JSON.stringify(products),
    },

    success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:5173/shop`,


  });

  res.status(200).json(
    new ApiResponse(true, "Checkout session created", {
      url: session.url,
    })
  );
});


const confirmPayment = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) {
    throw new ApiError(400, "Session ID is required");
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "payment_intent"],
  });

  if (session.payment_status !== "paid") {
    throw new ApiError(400, "Payment not completed");
  }

  const paymentIntentId = session.payment_intent.id;

  let order = await Order.findOne({ orderId: paymentIntentId });

  if (!order) {
    const originalProducts = JSON.parse(session.metadata.products);

    const lineItems = originalProducts.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
    }));

    const amount = session.amount_total
      ? session.amount_total / 100
      : 0;

    order = new Order({
      orderId: paymentIntentId,
      totalAmount: amount,
      products: lineItems,
      userId: session.metadata.userId,
      orderStatus: "processing",
    });
  } else {
    order.orderStatus = "processing";
  }

  await order.save();

  res.status(200).json(
    new ApiResponse(true, "Payment confirmed", {
      orderId: order._id,
      status: order.orderStatus,
    })
  );
});

const getUserOrders = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid User ID");
  }

  const orders = await Order.find({ userId })
  .populate("userId", "name email")
  .populate("products.productId", "name price")
  .sort({ createdAt: -1 });


  res.status(200).json(
    new ApiResponse(true, "Orders retrieved successfully", orders)
  );
});

const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  if (!orderId) {
    throw new ApiError(400, "Order ID is required");
  }

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(400, "Invalid Order ID");
  }

  const order = await Order.findById(orderId)
    .populate("userId", "name email")
    .populate("products.productId", "name price");

    console.log(order)

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // 🔥 SECURITY CHECK
  const orderUserId = order.userId._id
  ? order.userId._id.toString()
  : order.userId.toString();

  console.log(orderUserId)
  console.log(req.user)

if (
  orderUserId !== req.user.userId.toString() &&
  req.user.role !== "admin"
) {
  throw new ApiError(403, "Not authorized to view this order");
}


  res.status(200).json(
    new ApiResponse(true, "Order retrieved successfully", order)
  );
});

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("userId", "name email")
    .populate("products.productId", "name price")
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(true, "Orders fetched successfully", {
      totalOrders: orders.length,
      orders
    })
  );
});


export { checkoutSession, confirmPayment, getUserOrders, getOrderById, getAllOrders };
