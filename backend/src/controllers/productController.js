import Product from "../products/products.model.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"
import asyncHandler from "../middleware/asyncHandler.js"
import Review from "../reviews/reviews.model.js"

// create a product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    type,
    price,
    oldPrice,
    sizes,
    colors,
    images,
  } = req.body;

  // ✅ Improved validation
  if (
    !name ||
    !description ||
    !brand ||
    !category ||
    !type ||
    price === undefined ||
    !images ||
    images.length === 0
  ) {
    throw new ApiError(400, "All required fields must be provided");
  }

  // ✅ Create product
  const product = new Product({
    name,
    description,
    brand,
    category,
    type,
    price,
    oldPrice,
    sizes,
    colors,
    images,
  });

  const savedProduct = await product.save();
  // calculate review
  const review = await Review.find({ productId: savedProduct._id });
  if(review.length > 0){
    const totalRating = review.reduce((acc, curr) => acc + curr.rating, 0);
    const averageRating = totalRating / review.length;
    savedProduct.rating = averageRating;
    await savedProduct.save();
  }


  // ✅ Response
  return res.status(201).json(
    new ApiResponse(201, savedProduct, "Product created successfully")
  );
});


export { createProduct }