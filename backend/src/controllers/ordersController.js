import asyncHandler from "../middleware/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Product from "../products/products.model.js";

const checkoutSession = asyncHandler(async (req, res) => {
  const { products } = req.body;

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
        image: product.images[0],
        quantity: item.quantity,
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
      userId: req.user._id.toString(),
      products: JSON.stringify(products),
    },

    success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cancel`,
  });

  res.status(200).json(
    new ApiResponse(true, "Checkout session created", {
      sessionId: session.id,
    })
  );
});

export { checkoutSession };
