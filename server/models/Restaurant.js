const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    orders: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    contact: {
      phoneNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    menu: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuItem",
      },
    ],
    backgroundImage: {
      type: String,
      contentType: String,
    },
    discountPercentage: {
      type: Number,
      validate: function (value) {
        return value >= 1 && value <= 100;
      },
      message: "Discount value should be more than 1% and less than 100%",
    },
    offerDaysLeft: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

module.exports = Restaurant;
