const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const auth = require("../middleware/auth");


// GET ALL USERS
router.get("/users", auth, controller.getAllUsers);

module.exports = router;
