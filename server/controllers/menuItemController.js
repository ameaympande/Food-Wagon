const asyncHandler = require("express-async-handler");
const MenuItem = require("../models/MenuItem");
const mongoose = require("mongoose");

// @desc Get  Menu Items
// @route GET /menuitem
// @access Private

const getAllMenuItem = asyncHandler(async (req, res) => {
  const menuitem = await MenuItem.find().lean().exec();

  if (!menuitem.length) {
    return res.status(400).json({ message: "No Items found." });
  }

  res.json(menuitem);
});

// @desc Create New Menu Items
// @route POST /menuitem
// @access Private

const createNewMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const duplicateItem = await MenuItem.findOne({ name }).lean().exec();

  if (duplicateItem) {
    return res
      .status(400)
      .json({ message: "This menu item is already exist." });
  }

  const newMenuItem = new MenuItem({
    name,
    description,
    price,
    category,
  });

  const savedMenuItem = await newMenuItem.save();

  res.json({ message: `${savedMenuItem.name} is added successfully.` });
});

// @desc Update Menu Items
// @route PATCH /menuitem
// @access Private

const updateMenuItem = asyncHandler(async (req, res) => {
  const { id, name, description, price, category } = req.body;

  if (!id || !name || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }

  const menuitem = await MenuItem.findById(id).exec();

  if (!menuitem) {
    res.status(400).json({ message: "Menu Item is not found." });
  }

  const duplicateMenuItem = await MenuItem.findOne({ name }).lean().exec();

  if (duplicateMenuItem && duplicateMenuItem?._id.toString() !== id) {
    return res.status(400).json({ message: "Duplicate Item." });
  }

  if (name) {
    menuitem.name = name;
  }

  if (description) {
    menuitem.description = description;
  }

  if (price) {
    menuitem.price = price;
  }

  if (category) {
    menuitem.category = category;
  }

  const updatedMenuItem = await menuitem.save();

  res
    .status(200)
    .json({ message: `Menu item ${updatedMenuItem.name} updated.` });
});

const deleteMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ message: "Menu Id required." });
  }
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid Menu Item ID." });
  }

  const menuitem = await MenuItem.findById(id).exec();

  if (!menuitem) {
    return res.status(400).json({ message: "Menu item not found." });
  }

  const message = `${menuitem.name} deleted.`;
  await menuitem.deleteOne();

  res.json({ message: message });
});

module.exports = {
  getAllMenuItem,
  createNewMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
