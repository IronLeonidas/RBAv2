const express = require("express");
const router = express.Router();
const authRouter = require("./authenticationRouter");
const restaurantRouter = require("./restaurantRouter");
const reservationRouter = require("./reservationRouter");
const { authenticateToken } = require("../middlewares/auth.mw");

router.use("/authentication", authRouter);
router.use("/restaurants", authenticateToken, restaurantRouter);
router.use("/reservations", authenticateToken, reservationRouter);

module.exports = router;