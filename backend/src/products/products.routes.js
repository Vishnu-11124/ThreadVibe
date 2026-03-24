import express from "express";
import { createProduct, getAllProducts, getSingleProduct } from "../controllers/productController.js";

const router = express.Router();

// post a product
router.post("/create-product", createProduct)

// get all products
router.get("/", getAllProducts)

// get single product
router.get('/:id', getSingleProduct)



export default router;