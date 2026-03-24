import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    oldPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    sizes: [
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    ],

    // ✅ Simple color array (hex values)
    colors: {
      type: [String],
      required: true,
    },

    // ✅ Simple rating
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    images: {
      type: [String],
      validate: [
        (val) => val.length > 0,
        "At least one image is required",
      ],
    },
  },
  { timestamps: true }
);

// 🔍 Search support
// productSchema.index({ name: "text", description: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
