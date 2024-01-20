const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/jwtAuthenticate");

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(authenticateToken, userController.updateUser)
  .delete(authenticateToken, userController.deleteUser);

module.exports = router;
