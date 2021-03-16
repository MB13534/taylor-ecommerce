import express from "express";
import dotenv from "dotenv";
//allows you to change colors of output to terminal
import colors from "colors";

import productRoutes from "./routes/productRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();

//anything that comes to the route will be linked to productRoutes
app.use("/api/products", productRoutes);

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
