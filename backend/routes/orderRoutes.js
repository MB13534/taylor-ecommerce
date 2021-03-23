import express from "express";

//controllers
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToShipped,
} from "../controllers/orderController.js";

//middleware, protects the route from unauthorized access
import { protect, admin } from "../middleware/authMiddleware.js";

//handles various incoming routes
const router = express.Router();

//if port 5000 receives a get request to '/api/orders', add the order
//the async handler will pass of errors to the master error handler
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
// gets logged in users orders
router.route("/myorders").get(protect, getMyOrders);
//the id route needs to be at the bottom
router.route("/:id").get(protect, getOrderById);
//pay
router.route("/:id/pay").put(protect, updateOrderToPaid);
//ship
router.route("/:id/ship").put(protect, admin, updateOrderToShipped);

export default router;
