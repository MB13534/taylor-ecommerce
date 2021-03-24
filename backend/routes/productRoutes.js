import express from "express";

//controllers
import {
  getProducts,
  getProductById,
  productRemoveInventory,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
} from "../controllers/productController.js";

//middleware
import { protect, admin } from "../middleware/authMiddleware.js";

//handles various incoming routes
const router = express.Router();

//if port 5000 receives a get request to '/api/products', respond with all products
//the async handler will pass of errors to the master error handler
router.route("/").get(getProducts).post(protect, admin, createProduct);

router.get("/featured", getFeaturedProducts);

//if port 5000 receives a get request to '/api/products/:id', respond with that single product
router
  .route("/:id")
  .get(getProductById)
  .patch(protect, admin, productRemoveInventory)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
