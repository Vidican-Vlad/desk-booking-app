const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");

//REGISTER
router.post("/register", controller.registerUser);

//LOGIN
router.post("/login", controller.loginUser);

module.exports = router;
