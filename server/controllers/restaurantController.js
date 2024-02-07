const asyncHandler = require("express-async-handler");
const Restaurant = require("../models/Restaurant");
const isValidEmail = require("../helper/isValidEmail");
const MenuItem = require("../models/MenuItem");
const mongoose = require("mongoose");

// @desc Get all Restaurant
// @route GET /restaurants
// @access Private

const getRestaurant = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find()
    .populate("menu")
    .sort({ createdAt: -1 })
    .exec();

  if (!restaurants.length) {
    return res.status(400).json({ message: "No restaurant found near you." });
  }

  res.json({ count: restaurants.length, data: restaurants });
});

// @desc Create New Restaurant
// @route POST /restaurants
// @access Private

const createRestaurant = asyncHandler(async (req, res) => {
  const {
    name,
    address: { street, city, state, postalCode, country },
    contact: { phoneNumber, email },
    menu,
    discountPercentage,
    offerDaysLeft,
    backgroundImage,
  } = req.body;

  if (
    !name ||
    !street ||
    !city ||
    !state ||
    !postalCode ||
    !country ||
    !phoneNumber ||
    !email ||
    !menu
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const duplicateRestaurant = await Restaurant.findOne({ name }).lean().exec();

  if (duplicateRestaurant) {
    return res.status(400).json({ message: "Restaurant already exists." });
  }

  const menuItems = [];

  for (const menuItemData of menu) {
    const {
      id: menuItemId,
      name: itemName,
      description,
      price,
      category,
    } = menuItemData;

    if (menuItemId) {
      const existingMenuItem = await MenuItem.findById(menuItemId).exec();

      if (existingMenuItem) {
        menuItems.push(existingMenuItem._id);
      }
    } else {
      let existingMenuItem = await MenuItem.findOne({ name: itemName }).exec();

      if (!existingMenuItem) {
        const newMenuItem = new MenuItem({
          name: itemName,
          description,
          price,
          category,
        });

        existingMenuItem = await newMenuItem.save();
      }

      menuItems.push(existingMenuItem._id);
    }
  }

  const newRestaurant = new Restaurant({
    name,
    address: {
      street,
      city,
      state,
      postalCode,
      country,
    },
    contact: {
      phoneNumber,
      email,
    },
    menu: menuItems,
    discountPercentage,
    offerDaysLeft,
    backgroundImage,
  });

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ message: "Please enter a correct Email address." });
  }

  if (req.file) {
    const backgroundImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    newRestaurant.backgroundImage = backgroundImage;
  }

  const savedRestaurant = await newRestaurant.save();

  res
    .status(201)
    .json({ message: `${savedRestaurant.name} has been created.` });
});

// @desc Update Restaurant
// @route PATCH /restaurants
// @access Private

const updateRestaurant = asyncHandler(async (req, res) => {
  const {
    id,
    name,
    address: { street, city, state, postalCode, country },
    contact: { phoneNumber, email },
    menu,
  } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Restaurant ID is required." });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid Restaurant ID." });
  }

  const existingRestaurant = await Restaurant.findById(id)
    .populate("menu")
    .exec();

  if (!existingRestaurant) {
    return res.status(404).json({ message: "Restaurant not found." });
  }

  existingRestaurant.name = name || existingRestaurant.name;
  existingRestaurant.address.street =
    street || existingRestaurant.address.street;
  existingRestaurant.address.city = city || existingRestaurant.address.city;
  existingRestaurant.address.state = state || existingRestaurant.address.state;
  existingRestaurant.address.postalCode =
    postalCode || existingRestaurant.address.postalCode;
  existingRestaurant.address.country =
    country || existingRestaurant.address.country;
  existingRestaurant.contact.phoneNumber =
    phoneNumber || existingRestaurant.contact.phoneNumber;
  existingRestaurant.contact.email = email || existingRestaurant.contact.email;

  if (menu && menu.length > 0) {
    for (const menuItemData of menu) {
      const {
        id: menuItemId,
        itemName,
        description,
        price,
        category,
      } = menuItemData;

      if (menuItemId) {
        if (!mongoose.isValidObjectId(menuItemId)) {
          return res.status(400).json({ message: "Invalid menu ID." });
        }

        const existingMenuItem = await MenuItem.findById(menuItemId).exec();

        if (existingMenuItem) {
          existingMenuItem.name = itemName || existingMenuItem.name;
          existingMenuItem.description =
            description || existingMenuItem.description;
          existingMenuItem.price = price || existingMenuItem.price;
          existingMenuItem.category = category || existingMenuItem.category;

          await existingMenuItem.save();

          if (
            !existingRestaurant.menu.some((menuItem) =>
              menuItem.equals(existingMenuItem._id)
            )
          ) {
            existingRestaurant.menu.push(existingMenuItem._id);
          }
        }
      } else {
        const newMenuItem = new MenuItem({
          name: itemName,
          description,
          price,
          category,
        });

        const savedMenuItem = await newMenuItem.save();

        if (
          !existingRestaurant.menu.some((menuItem) =>
            menuItem.equals(savedMenuItem._id)
          )
        ) {
          existingRestaurant.menu.push(savedMenuItem._id);
        }
      }
    }
  }
  if (req.file) {
    const backgroundImage = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    existingRestaurant.backgroundImage = backgroundImage;
  }

  const updatedRestaurant = await existingRestaurant.save();

  res.json({ message: `${updatedRestaurant.name} has been updated.` });
});

// @desc Delete Restaurant
// @route DELETE /restaurants
// @access Private

const deleteRestaurant = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Restaurant ID is required." });
  }

  const restaurant = await Restaurant.findById(id).exec();

  if (!restaurant) {
    return res.status(400).json({ message: "Restaurant does not exist." });
  }

  if (restaurant?.orders?.length >= 1) {
    return res
      .status(400)
      .json({ message: "Restaurant cannot delete it has open orders." });
  }

  const message = `${restaurant.name} deleted.`;
  await restaurant.deleteOne();

  res.status(200).json({
    message: message,
  });
});

const removeMenuItem = asyncHandler(async (req, res) => {
  const { restaurantId, menuId } = req.body;

  if (!restaurantId)
    return res.status(400).json({ message: "Restaurant Id required." });
  if (!menuId) return res.status(400).json({ message: "Menu Id required." });

  const restaurant = await Restaurant.findById(restaurantId).exec();

  if (!restaurant) {
    return res.status(400).json({ message: "Restaurant not found." });
  }

  const removedMenuItem = restaurant.menu.pull(menuId);

  await restaurant.save();

  res.json({
    message: `${removedMenuItem.name} has been removed from the restaurant menu.`,
  });
});

module.exports = {
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  removeMenuItem,
};
