import express from "express";
import { createProduct, deleteProduct, getAllProducts, getSingleProduct, relatedProducts, updateProduct } from "../controllers/productController.js";
import verifyToken from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/admin.middleware.js";
import  upload  from "../middleware/upload.js";


const router = express.Router();

// post a product
router.post("/create-product", verifyToken, isAdmin, upload.array("images", 3), createProduct)

// get all products
router.get("/", getAllProducts)

// get single product
router.get('/:id', getSingleProduct)

// update product
router.patch(
  "/update-product/:id",
  verifyToken,
  isAdmin,
  upload.array("images",3), // 🔥 REQUIRED
  updateProduct
);


// deleteProduct
router.delete("/:id", verifyToken, isAdmin, deleteProduct)

// related products
router.get("/related/:id", relatedProducts)

export default router;