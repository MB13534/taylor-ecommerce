import express from "express";
import asyncHandler from "express-async-handler";

//mongoose will call to fetch the products
import Product from "../models/productModel.js";

//handles various incoming routes
const router = express.Router();

// @desc      Fetch all products
// @route     GET /api/products/
// @access    public
//if port 5000 receives a get request to '/api/products', respond with all products
//the async handler will pass of errors to the master error handler
router.get(
  "/",
  asyncHandler(async (req, res) => {
    //empty object gives us everything as a promise, therefore make it async await
    const products = await Product.find({});

    //respond with all products
    res.json(products);
  })
);

// @desc      Fetch single product
// @route     GET /api/products/:id
// @access    public
//if port 5000 receives a get request to '//id', respond with that single product
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    //check to see if the product exists
    if (product) {
      //respond with product
      res.json(product);
    } else {
      //if the product is not found and the id is a correct format (just not in DB), respond with a not found error (404)
      res.status(404);
      throw new Error("Product not found");
    }
  })
);

export default router;
