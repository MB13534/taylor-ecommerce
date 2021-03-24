import asyncHandler from "express-async-handler";

//models
//mongoose will call to fetch the products
import Product from "../models/productModel.js";

// @desc      Fetch all products
// @route     GET /api/products/
// @access    public
export const getProducts = asyncHandler(async (req, res) => {
  let filter = req.query.filter.toLowerCase();
  if (filter === "title") {
    filter = "name";
  } else if (filter === "gender") {
    filter = "sex";
  }
  //this is how many products we want to appear on one page
  // const pageSize = 50;
  const pageSize = Number(req.query.pageSize);
  //how to pickup the page number
  const page = Number(req.query.pageNumber) || 1;
  //checking to see if the body has a query string (the user searched in the bar)
  //if there is, instead of returning all the products, we will narrow it down
  const keyword = req.query.keyword
    ? {
        [filter]: {
          $regex: req.query.keyword,
          //'i' is case insensitive
          $options: "i",
        },
      }
    : {};

  //count method lets us count the methods
  const count = await Product.countDocuments({ ...keyword });
  //calls to DB gives us everything as a promise, therefore make it async await
  //it will either be empty or it will have the keyword in it
  //the limit says how many products to return, the skip will skip that first portion if it has moved on in pages
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  //respond with all products, the current page, and the total page count
  res.json({ count, products, page, pages: Math.ceil(count / pageSize) });
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

// @desc      DELETE a product
// @route     DELETE /api/products/:id
// @access    private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  //check to see if the product exists
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    //if the product is not found and the id is a correct format (just not in DB), respond with a not found error (404)
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc      Create a product
// @route     POST /api/products
// @access    private/admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: "Name",
    nwt: false,
    brand: "Brand",
    price: 0,
    size: "Size",
    description: "Description",
    sex: "Sex",
    category: "Category",
    subCategory: "Sub Category",
    color: "Color",
    subColor: "subColor",
    countInStock: 0,
    images: [],
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc      Update a product
// @route     Put /api/products/:id
// @access    private/admin
export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    nwt,
    brand,
    price,
    size,
    description,
    sex,
    category,
    subCategory,
    color,
    subColor,
    countInStock,
    images,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.nwt = nwt;
    product.brand = brand;
    product.price = price;
    product.size = size;
    product.description = description;
    product.sex = sex;
    product.category = category;
    product.subCategory = subCategory;
    product.color = color;
    product.subColor = subColor;
    product.countInStock = countInStock;
    product.images = images;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc      get a specific product
// @route     GET /api/products/featured
// @access    public
export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ price: -1 }).limit(10);
  res.json(products);
});
