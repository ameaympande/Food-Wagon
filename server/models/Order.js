const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
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
          type: mongoose.Schema.Types.ObjectId,
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
