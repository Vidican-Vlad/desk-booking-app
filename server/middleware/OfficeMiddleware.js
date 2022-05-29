const Floor = require("../models/Floor");
const Desk = require("../models/Desk");
const isStringInvalid = require("./isStringInvalid");
const Office = require("../models/Office");
const User = require("../models/User");
const moment = require("moment");
const Booking = require("../models/Booking");
moment().format();

const validateOfficeCreation = (req, res, next) => {
	try {
		const { Address, Name, Telephone } = req.body;
		if (
			isStringInvalid(Address) ||
			isStringInvalid(Name) ||
			isStringInvalid(Telephone)
		)
			return res
				.status(400)
				.json({ msg: "missing information from request body" });
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};
const addDeskToReq = async (req, res, next) => {
	try {
		if (!req.params.deskID)
			return res.status(400).json({ msg: "deskID missing from request" });
		const desk = await Desk.findById(req.params.deskID);
		if (!desk) return res.status(400).json({ msg: "desk was not found in DB" });
		req.desk = desk;
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const isDeskAssignable = async (req, res, next) => {
	try {
		if (req.desk.Bookable)
			return res
				.status(400)
				.json({ msg: "this desk can't be permanently assigned" });
		if (req.desk.Owner != null)
			return res
				.status(400)
				.json({
					msg: "this desk was already asigned to someone, pleasue unasign it",
				});
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const removeDeskFromUser = async (req, res, next) => {
	try {
		if (req.desk.owner != null) {
			const user = await User.findById(desk.Owner);
			if (user) {
				user.Desk = null;
				await user.save();
			}
		}
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const isDeskBookable = (req, res, next) => {
	try {
		if (!req.desk.Bookable)
			return res
				.status(400)
				.json({ msg: "These type of desk can't be booked" });
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const addBookingToReq = async (req, res, next) => {
	try {
		if (!req.params.bookingID)
			return res.status(400).json({ msg: "missing booking ID from request" });
		const booking = await Booking.findById(req.params.bookingID);
		if (!booking)
			return res.status(400).json({ msg: "booking was not found in DB" });
		req.booking = booking;
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const validateFloorCreation = (req, res, next) => {
	try {
		//image is sent as a based64 String
		const { Name, Image, Desks } = req.body;
		//console.log(typeof Desks);
		if (
			isStringInvalid(Name) ||
			isStringInvalid(Image) ||
			typeof Desks != "object" ||
			Object.keys(Desks).length === 0
		)
			return res
				.status(400)
				.json({ msg: "missing information from request body" });
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const addOfficeToRequest = async (req, res, next) => {
	try {
		if (!req.params.officeID)
			return res
				.status(400)
				.json({ msg: "office id  was missing from request" });
		const office = await Office.findById(req.params.officeID);
		if (!office)
			return res.status(400).json({ msg: "office was not found in database" });
		req.office = office;
		next();
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const addFloorToReq = async (req, res, next) => {
	try {
		if (!req.params.floorID)
			return res.status(400).json({ msg: "missing floor Id from request" });
		const floor = await Floor.findById(req.params.floorID);
		if (!floor)
			return res.status(400).json({ msg: "floor was not found in database" });
		req.floor = floor;
		next();
	} catch (errr) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const validateBookReq = async (req, res, next) => {
	try {
		const { date } = req.body;
		if (!date) return res.status(400).json({ msg: "missing or invalid date" });
		let d1 = moment();
		let d2 = moment(date);

		if (getHourDifference(d1, d2) < 24)
			return res
				.status(400)
				.json({
					msg: "booking must be done with atleast a full day in advance",
				});
		const bookings = await Booking.find({ desk: req.desk._id });
		if (!bookings) next();
		else {
			for (let i = 0; i < bookings.length; i += 1) {
				d1 = moment(bookings[i].Date);
				if (d1.isSame(d2, "day"))
					return res
						.status(400)
						.json({ msg: "desk is already booked for this day" });
			}
			next();
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

function getHourDifference(d1, d2) {
	const diffInMilliseconds = d2 - d1;
	const diffInHours = diffInMilliseconds / 1000 / 60 / 60;
	//console.log(diffInHours);
	return diffInHours;
}

module.exports = {
	addBookingToReq,
	validateOfficeCreation,
	validateFloorCreation,
	addOfficeToRequest,
	addDeskToReq,
	isDeskAssignable,
	removeDeskFromUser,
	isDeskBookable,
	validateBookReq,
	addFloorToReq,
};
