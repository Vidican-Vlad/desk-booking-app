const express = require("express");
const router = express.Router();
const controller = require("../controllers/officeController.js");
const { addOwnAccToReq, checkIfAdmin, addUsertoReq } = require("../middleware/UserMiddleware")
const { validateOfficeCreation, validateFloorCreation, addOfficeToRequest, isDeskAssignable, addDeskToReq, removeDeskFromUser, isDeskBookable, validateBookReq, addFloorToReq } =  require("../middleware/OfficeMiddleware")
const auth = require("../middleware/auth");


router.post("/", auth, addOwnAccToReq, checkIfAdmin, validateOfficeCreation, controller.createOffice);
router.post("/:officeID/floor", auth, addOwnAccToReq, checkIfAdmin, addOfficeToRequest, validateFloorCreation, controller.createFloor);
router.get("/", auth,  controller.getAllOffices);
router.get("/:officeID",auth, addOfficeToRequest, controller.getSpecificOffice);
router.put("/desk/:deskID/assign", auth, addOwnAccToReq, addUsertoReq, checkIfAdmin, addDeskToReq, isDeskAssignable, controller.assignDesk );
router.put("/desk/:deskID/makeBookable", auth, addOwnAccToReq, checkIfAdmin, addDeskToReq, removeDeskFromUser, controller.makeDeskBookable);
router.put("/desk/:deskID/makeAssignable", auth, addOwnAccToReq, checkIfAdmin, addDeskToReq, controller.makeDeskAssignable);
router.put("/desk/:deskID/unassign", auth, addOwnAccToReq, checkIfAdmin, addDeskToReq, removeDeskFromUser, controller.unassignDesk);
router.post("/desk/:deskID/book", auth, addOwnAccToReq, addDeskToReq, isDeskBookable, validateBookReq, controller.bookDesk);
router.get("/officeID/floor/:floorID", auth, addFloorToReq, )
module.exports = router;
