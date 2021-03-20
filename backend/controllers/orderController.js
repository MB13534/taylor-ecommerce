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
