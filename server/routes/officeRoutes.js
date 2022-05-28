const express = require("express");
const router = express.Router();
const controller = require("../controllers/officeController.js");
const { addOwnAccToReq, checkIfAdmin } = require("../middleware/UserMiddleware")
const { validateOfficeCreation, validateFloorCreation, addOfficeToRequest } =  require("../middleware/OfficeMiddleware")
const auth = require("../middleware/auth");


router.post("/", auth, addOwnAccToReq, checkIfAdmin, validateOfficeCreation, controller.createOffice);
router.post("/:officeID/floor", auth, addOwnAccToReq, checkIfAdmin, addOfficeToRequest, validateFloorCreation, controller.createFloor);
router.get("/", auth,  controller.getAllOffices);
router.get("/:officeID",auth, addOfficeToRequest, controller.getSpecificOffice);
module.exports = router;
