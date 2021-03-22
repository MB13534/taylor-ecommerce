import express from "express";
import dotenv from "dotenv";
import path from "path";
//allows you to change colors of output to terminal
import colors from "colors";

//routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

import connectDB from "./config/db.js";

//middleware
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
connectDB();
const app = express();

//this will allow us to accept json data in the body
app.use(express.json());

//anything that comes to the route will be linked to productRoutes
app.use("/api/products", productRoutes);

//anything that comes to the route will be linked to userRoutes
app.use("/api/users", userRoutes);

//anything that comes to the route will be linked to orderRoutes
app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

//we need to make the uploads folder static so the files are accessible on deploy
//use path module to point to current directory (__dirname is only available with common JS modules, not ES6)
//we can mimic this syntax by using path.resolve()
//it just takes us to the folder and makes it static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//special route to access the paypal client id
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
