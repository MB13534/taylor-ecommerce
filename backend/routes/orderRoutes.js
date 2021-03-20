import express from "express";

//controllers
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js";

//middleware, protects the route from unauthorized access
import { protect } from "../middleware/authMiddleware.js";

//handles various incoming routes
const router = express.Router();

//if port 5000 receives a get request to '/api/orders', add the order
//the async handler will pass of errors to the master error handler
router.route("/").post(protect, addOrderItems);
//the id route needs to be at the bottom
router.route("/:id").get(protect, getOrderById);
//pay
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
