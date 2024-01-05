const mongoose = require("mongoose");

const orderSchema = mongooes.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.objectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.objectId,
      ref: "Restaurant",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },
    items: [
      {
        MenuItemId: {
          type: mongoose.Schema.Types.objectId,
          ref: "MenuItem",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
