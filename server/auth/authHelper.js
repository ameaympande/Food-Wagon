const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).lean().exec();

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  if (!user) {
    return res
      .status(404)
      .json({ error: "User not found, please create a new account." });
  }

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });

  res.json({
    data: { message: "Login success", token: token, userId: user._id },
  });
});

module.exports = {
  login,
};
