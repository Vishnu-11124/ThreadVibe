import express from "express";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

// post a product
router.post("/create-product", createProduct)



export default router;