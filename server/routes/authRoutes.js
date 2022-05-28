const express = require("express");
const router = express.Router();
const controller = require("../controllers/authController");
const { addOwnAccToReq, checkIFEmailAlreadyUsed, checkIfAdmin, validateLogin, validateRegisterReq  } = require("../middleware/UserMiddleware")
const auth = require("../middleware/auth");


//REGISTER
// registerAdmin is just for development purposes
router.post("/registerAdmin", checkIFEmailAlreadyUsed, validateRegisterReq, controller.registerAdmin);

router.post("/register", auth, addOwnAccToReq, checkIfAdmin, checkIFEmailAlreadyUsed, validateRegisterReq, controller.registerUser )

//LOGIN
router.post("/login", validateLogin, controller.loginUser);

module.exports = router;
