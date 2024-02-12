const asyncHandler = require("express-async-handler");
const MenuItem = require("../models/MenuItem");
const mongoose = require("mongoose");

// @desc Get  Menu Items
// @route GET /menuitem
// @access Private

const getAllMenuItem = asyncHandler(async (req, res) => {
  const menuitem = await MenuItem.find().sort({ createdAt: -1 }).lean().exec();

  if (!menuitem.length) {
    return res.status(400).json({ message: "No Items found." });
  }

  res.json(menuitem);
});

// @desc Create New Menu Items
// @route POST /menuitem
// @access Private

const createNewMenuItem = asyncHandler(async (req, res) => {
  const { name, description, price, category, restaurantId, backgroundImage } =
    req.body;

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
    backgroundImage,
  });

  if (req.file) {
    const backgroundImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    newMenuItem.backgroundImage = backgroundImage;
  }

  if (restaurantId) {
    newMenuItem.restaurantId = restaurantId;
  }

  const savedMenuItem = await newMenuItem.save();

  res.json({ message: `${savedMenuItem.name} is added successfully.` });
});

// @desc Update Menu Items
// @route PATCH /menuitem
// @access Private

const updateMenuItem = asyncHandler(async (req, res) => {
  let { id, name, description, price, category, backgroundImage } = req.body;

  if (!id || !name || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid menu item ID." });
  }

  try {
    let menuitem = await MenuItem.findById(id);

    if (!menuitem) {
      return res.status(404).json({ message: "Menu item not found." });
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

    if (backgroundImage) {
      menuitem.backgroundImage = backgroundImage;
    }

    if (req.file) {
      const backgroundImageData = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };

      menuitem.backgroundImage = backgroundImageData;
    }

    const updatedMenuItem = await menuitem.save();

    res
      .status(200)
      .json({ message: `Menu item ${updatedMenuItem.name} updated.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
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
