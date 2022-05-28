const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const auth = require("../middleware/auth");
const {
	addOwnAccToReq,
	checkIfAdmin,
} = require("../middleware/UserMiddleware");

// GET ALL USERS
router.get(
	"/users",
	auth,
	addOwnAccToReq,
	checkIfAdmin,
	controller.getAllUsers,
);

// GET USER BY ID
router.get("/getUser", auth, controller.getOwnAccount);

module.exports = router;
