const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");

// @desc Get All Orders
// @route GET /order
// @access Private

const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().lean().exec();

  if (!orders.length) {
    return res.status(400).json({ message: "No orders found." });
  }

  res.json(orders);
});

// @desc Create New Order
// @route POST /order
// @access Private

module.exports = {
  getAllOrders,
};
