const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");
const { validateUUID } = require("../middlewares/validateUUID.mw");

router.get("/", restaurantController.getAllRestaurants);
router.get("/:id", validateUUID, restaurantController.getRestaurantById);
router.post("/:id/reservation", validateUUID, restaurantController.placeReservation);

module.exports = router;