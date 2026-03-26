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
    type,
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

  // ✅ Type filter (FIXED)
  if (type && type !== "all") {
    filter.type = type;
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

  const totalProducts = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalProducts / limitNum);

  const products = await Product.find(filter)
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 });

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

  // ✅ Get product
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ✅ Get reviews
  const reviews = await Review.find({ productId: product._id });

  // ✅ Response
  return res.status(200).json(
    new ApiResponse(
      200,
      { product, reviews },
      "Product fetched successfully"
    )
  );
});


// update product
const updateProduct = asyncHandler(async (req, res) => {
  
  const { id } = req.params;

  // ✅ Check if product exists
  const existingProduct = await Product.findById(id);

  if (!existingProduct) {
    throw new ApiError(404, "Product not found");
  }

  // ✅ Update product
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $set: req.body },
    {
      new: true, // return updated document
      runValidators: true, // apply schema validation
    },
  );

  // ✅ Response
  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

// delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new ApiError(404, "Product not found");
  }
  
  await Review.deleteMany({productId: deleteProduct._id})

  return res.status(200).json(
    new ApiResponse(200, deletedProduct, "Product deleted successfully")
  );
});

// related products
const relatedProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // ✅ Get current product
  const product = await Product.findById(id);
  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // ✅ Fetch related products
  const relatedProducts = await Product.find({
    category: product.category,
    _id: { $ne: product._id },
  })
    .limit(4) // you can adjust (3–6 is common)
    .sort({ createdAt: -1 }) // latest first

  // ✅ Response
  return res.status(200).json(
    new ApiResponse(
      200,
      relatedProducts,
      "Related products fetched successfully"
    )
  );
});




export { createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct, relatedProducts }