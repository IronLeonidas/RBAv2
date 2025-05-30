const express = require("express");
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth.mw');
const authenticationController = require("../controllers/authenticationController");

router.post("/login", authenticationController.login);

router.post("/register", authenticationController.register);

router.post("/refresh-token", authenticationController.refreshToken);

router.post("/logout", authenticateToken, authenticationController.logout);

module.exports = router;