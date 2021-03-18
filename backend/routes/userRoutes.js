import express from "express";

//controllers
import { authUser } from "../controllers/userController.js";

//handles various incoming routes
const router = express.Router();

//if port 5000 receives a get request to '/api/users'
//the async handler will pass of errors to the master error handler
router.post("/login", authUser);

export default router;
