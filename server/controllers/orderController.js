const asyncHandler = require("express-async-handler");
const Order = require("../models/Order");
const User = require("../models/User");

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

const createNewOrder = asyncHandler(async (req, res) => {
  const { customerId, restaurantId, items } = req.body;

  if (!items.length)
    res
      .status(400)
      .json({ message: "Please add at least 1 item to place an order." });

  if (!customerId) {
    res.status(404).json({ message: "Customer not found." });
  }

  if (!restaurantId) {
    res.status(400).json({
      message: "Restaurant id is incorrect.",
    });
  }

  const user = await User.findById(customerId).lean().exec();

  if (!user) {
    res.status(404).json({ message: "Customer not found." });
  }

  const orderObj = {
    customerId,
    orderStatus: "Accepted",
    restaurantId,
    items,
  };

  const order = await Order.create(orderObj);

  if (order) {
    return res.status(201).json({
      message: `Order with ${order._id} has been placed sucessfully.`,
      order: order,
    });
  } else {
    res.status(400).json({
      message: "Error while creating an order.",
    });
  }
});

// @desc Delete Order
// @route DELETE /order
// @access Private

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: "Order Id is required." });
  }

  const order = await Order.findById(id).exec();

  if (!order) {
    res.status(404).json({ message: "Order not found." });
  }

  const message = `Order with id ${order._id} has been deleted.`;
  await order.deleteOne();

  res.status(200).json({ message: message });
});

module.exports = {
  getAllOrders,
  createNewOrder,
  deleteOrder,
};
