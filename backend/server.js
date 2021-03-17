import express from "express";
import dotenv from "dotenv";
//allows you to change colors of output to terminal
import colors from "colors";

import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

//middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();

//anything that comes to the route will be linked to productRoutes
app.use("/api/products", productRoutes);

//if the route was not found, respond with a 404 not found
app.use(notFound);

//overwriting the default error handler
app.use(errorHandler);

//if port 5000 receives a get request to '/', respond with
app.get("/", (req, res) => {
  res.send("API IS RUNNING");
});

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
