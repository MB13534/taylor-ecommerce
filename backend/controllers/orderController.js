import asyncHandler from "express-async-handler";

//models
//mongoose will call to fetch the products
import Order from "../models/orderModel.js";

// @desc      Create all products
// @route     post /api/orders/
// @access    provate
export const addOrderItems = asyncHandler(async (req, res) => {
  //deconstruct the order from the body of the response
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  //check to make sure there are order items
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    //actually save the order that we just created
    const createdOrder = await order.save();
    //201 means something was created
    res.status(201).json(createdOrder);
  }
});

// @desc      Get order by id
// @route     GET /api/orders/:id
// @access    private
export const getOrderById = asyncHandler(async (req, res) => {
  //in addition to the order, we also want some user information that is associated with the order
  const order = await await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc      update order to paid
// @route     GET /api/orders/:id/pay
// @access    private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  //find order by id
  const order = await Order.findById(req.params.id);

  //if the order exists, set it to paid, timestamp it, and give the result from paypal
  if (order) {
    //update the properties of the order
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    //save the updated order
    const updatedOrder = await order.save();
    //send to the user what is sent back from updating the order
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc      get logged in user orders
// @route     GET /api/orders/myorders
// @access    private
export const getMyOrders = asyncHandler(async (req, res) => {
  //find order by logged in user
  const orders = await Order.find({ user: req.user._id });

  res.json(orders);
});

// @desc      get all orders
// @route     GET /api/orders
// @access    private/admin
export const getOrders = asyncHandler(async (req, res) => {
  //find all orders
  const orders = await Order.find({}).populate("user", "id name");

  res.json(orders);
});

// @desc      update order to shipped
// @route     GET /api/orders/:id/ship
// @access    private/admin
export const updateOrderToShipped = asyncHandler(async (req, res) => {
  //find order by id
  const order = await Order.findById(req.params.id);

  //if the order exists, set it to shipped, timestamp it, and give the result from paypal
  if (order) {
    //update the properties of the order
    order.isShipped = true;
    order.shippedAt = Date.now();
    //save the updated order
    const updatedOrder = await order.save();
    //send to the user what is sent back from updating the order
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});
