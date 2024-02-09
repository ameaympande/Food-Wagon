const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

router
  .route("/")
  .get(restaurantController.getRestaurant)
  .post(restaurantController.createRestaurant)
  .patch(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant);

router.get("/:id", restaurantController.getRestaurant);

router.route("/menuitem").delete(restaurantController.removeMenuItem);

module.exports = router;
