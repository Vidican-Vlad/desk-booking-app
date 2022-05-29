const express = require("express");
const router = express.Router();
const controller = require("../controllers/officeController.js");
const { addOwnAccToReq, checkIfAdmin, addUsertoReq, checkIfInitialPass } = require("../middleware/UserMiddleware")
const { validateOfficeCreation, validateFloorCreation, addOfficeToRequest, isDeskAssignable, addDeskToReq, removeDeskFromUser, isDeskBookable, validateBookReq, addFloorToReq, addBookingToReq } =  require("../middleware/OfficeMiddleware")
const auth = require("../middleware/auth");


router.post("/", auth, checkIfInitialPass, addOwnAccToReq, checkIfAdmin, validateOfficeCreation, controller.createOffice);
router.post("/:officeID/floor", auth, checkIfInitialPass, addOwnAccToReq, checkIfAdmin, addOfficeToRequest, validateFloorCreation, controller.createFloor);
router.get("/", auth, checkIfInitialPass,  controller.getAllOffices);
router.get("/:officeID",auth, checkIfInitialPass, addOfficeToRequest, controller.getSpecificOffice);
router.put("/desk/:deskID/assign", auth, checkIfInitialPass, addOwnAccToReq, addUsertoReq, checkIfAdmin, addDeskToReq, isDeskAssignable, controller.assignDesk );
router.put("/desk/:deskID/makeBookable", auth, checkIfInitialPass,  addOwnAccToReq, checkIfAdmin, addDeskToReq, removeDeskFromUser, controller.makeDeskBookable);
router.put("/desk/:deskID/makeAssignable", auth, checkIfInitialPass, addOwnAccToReq, checkIfAdmin, addDeskToReq, controller.makeDeskAssignable);
router.put("/desk/:deskID/unassign", auth, checkIfInitialPass, addOwnAccToReq, checkIfAdmin, addDeskToReq, removeDeskFromUser, controller.unassignDesk);
router.post("/desk/:deskID/book", auth, checkIfInitialPass, addOwnAccToReq, addDeskToReq, isDeskBookable, validateBookReq, controller.bookDesk);
router.delete("/booking/:bookingID", auth, checkIfInitialPass, addOwnAccToReq, addBookingToReq, controller.cancelBooking )
router.get("/floor/:floorID", auth, checkIfInitialPass, addFloorToReq, controller.getFloor );
module.exports = router;
