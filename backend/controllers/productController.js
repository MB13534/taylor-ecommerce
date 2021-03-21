import asyncHandler from "express-async-handler";

//models
//mongoose will call to fetch the products
import Product from "../models/productModel.js";

// @desc      Fetch all products
// @route     GET /api/products/
// @access    public
export const getProducts = asyncHandler(async (req, res) => {
  //calls to DB gives us everything as a promise, therefore make it async await
  const products = await Product.find({});
  //respond with all products
  res.json(products);
});

// @desc      Fetch single product
// @route     GET /api/products/:id
// @access    public
export const getProductById = asyncHandler(async (req, res) => {
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
});

// @desc      SETS INVENTORY TO ZERO, i dont want to remove anything from DB to not cause conflict with old orders
// @route     PATCH /api/products/:id
// @access    private/admin
export const productRemoveInventory = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  //check to see if the product exists
  if (product) {
    product.countInStock = 0;
    await product.save();
    res.json({ message: "Product inventory set to 0" });

    // await product.remove();
    // res.json({ message: "Product removed" });
  } else {
    //if the product is not found and the id is a correct format (just not in DB), respond with a not found error (404)
    res.status(404);
    throw new Error("Product not found");
  }
});
