const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const signupController = require("../controllers/signupController");

router.post("/login", authController.login);
router.post("/signup", signupController.signup);

module.exports = router;
