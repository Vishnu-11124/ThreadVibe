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

// get all products
const getAllProducts = asyncHandler(async (req, res) => {
  const {
    category,
    color,
    minPrice,
    maxPrice,
    page = 1,
    limit = 10,
  } = req.query;

  let filter = {};

  // ✅ Category filter
  if (category && category !== "all") {
    filter.category = category;
  }

  // ✅ Color filter (array field)
  if (color && color !== "all") {
    filter.colors = color;
  }

  // ✅ Price filter
  if (minPrice && maxPrice) {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) && !isNaN(max)) {
      filter.price = { $gte: min, $lte: max };
    }
  }

  // ✅ Pagination
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  // ✅ Total count
  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limitNum);

  // ✅ Fetch products
  const products = await Product.find(filter)
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 });

  // ✅ Response
  return res.status(200).json(
    new ApiResponse(
      200,
      { products, totalPages, totalProducts },
      "Successfully fetched products"
    )
  );
});


// get single products
const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  const review = await Review.find({ productId: product._id });

  if(!review){
    throw new ApiError(404, "No reviews found");
  }


  res.status(200).json( new ApiResponse(200, {product, review}, "Product fetched successfully"))
})


export { createProduct, getAllProducts, getSingleProduct }