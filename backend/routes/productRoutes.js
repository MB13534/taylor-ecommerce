import express from "express";

//controllers
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";

//handles various incoming routes
const router = express.Router();

//if port 5000 receives a get request to '/api/products', respond with all products
//the async handler will pass of errors to the master error handler
router.route("/").get(getProducts);

//if port 5000 receives a get request to '/api/products/:id', respond with that single product
router.route("/:id").get(getProductById);

export default router;
