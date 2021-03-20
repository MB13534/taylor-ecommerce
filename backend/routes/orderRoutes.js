import express from "express";

//controllers
import { addOrderItems } from "../controllers/orderController.js";

//middleware, protects the route from unauthorized access
import { protect } from "../middleware/authMiddleware.js";

//handles various incoming routes
const router = express.Router();

//if port 5000 receives a get request to '/api/orders', add the order
//the async handler will pass of errors to the master error handler
router.route("/").post(protect, addOrderItems);

export default router;
