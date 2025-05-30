const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { validateUUID } = require("../middlewares/validateUUID.mw");

router.get("/", reservationController.getAllReservations);
router.post("/:id/cancel", validateUUID, reservationController.cancelReservation);
router.delete("/:id", validateUUID, reservationController.deleteReservation);

module.exports = router;