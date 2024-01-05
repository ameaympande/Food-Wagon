const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const mongoose = require("mongoose");
const isValidEmail = require("../helper/isValidEmail");

// @desc Get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).select("-password");

  if (!users?.length) {
    return res.status(400).json({ message: "No users found." });
  }

  res.json(users);
});

// @desc Create new users
// @route POST /users
// @access Private

const createNewUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, address } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !phoneNumber ||
    !address
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existingUser = await User.findOne({ email }).lean().exec();

  if (existingUser) {
    return res.status(400).json({ message: "This email id is already exist." });
  }

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ message: "Please enter correct Email address." });
  }

  const hashedPwd = await bcrypt.hash(password, 10);

  const userObj = {
    firstName,
    lastName,
    email,
    password: hashedPwd,
    phoneNumber,
    address,
  };

  const user = await User.create(userObj);

  if (user) {
    return res.status(201).json({
      message: `User with name ${
        firstName + " " + lastName
      } has been created successfully.`,
    });
  } else {
    res.status(400).json({ message: "Invalid user data received." });
  }
});

// @desc Update  users
// @route PATCH /users
// @access Private

const updateUser = asyncHandler(async (req, res) => {
  const { id, email, firstName, lastName, password, phoneNumber, address } =
    req.body;

  if (!id || !email) {
    return res.status(400).json({ message: "User ID or Email are required." });
  }

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User does not exist." });
  }

  const duplicateUser = await User.findOne({ email }).lean().exec();

  if (duplicateUser && duplicateUser?._id?.toString() !== id) {
    return res.status(400).json({ message: "Duplicate email." });
  }

  user.email = email;

  if (firstName) {
    user.firstName = firstName;
  }
  if (lastName) {
    user.lastName = lastName;
  }
  if (phoneNumber) {
    user.phoneNumber = phoneNumber;
  }
  if (address) {
    user.address = address;
  }

  if (password) {
    const hashedPwd = await bcrypt.hash(password, 10);
    user.password = hashedPwd;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    message: `${updatedUser.firstName} ${updatedUser.lastName} updated.`,
  });
});

// @desc Delete a users
// @route Delete /users
// @access Private

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "User Id is required." });
  }

  const user = await User.findById(id).exec();

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const message = `${user.firstName} ${user.lastName} deleted.`;
  await user.deleteOne();

  res.status(200).json({
    message: message,
  });
});

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
};
