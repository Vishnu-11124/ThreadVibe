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
        required: true
    },
    brand: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      default: "printed",
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
      default: 0,
    },

    sizes: [
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    ],
    colors: [
        {
            type: String,
        }
    ],
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
