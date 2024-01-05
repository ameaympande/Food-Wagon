const express = require("express");
const router = express.Router();
const menuItemController = require("../controllers/menuItemController");

router
  .route("/")
  .get(menuItemController.getAllMenuItem)
  .post(menuItemController.createNewMenuItem)
  .patch(menuItemController.updateMenuItem)
  .delete(menuItemController.deleteMenuItem);

module.exports = router;
