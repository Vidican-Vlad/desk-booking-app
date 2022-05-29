const Desk = require("../models/Desk");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

const getOwnAccount = async (req, res) => {
	try {
		const user = await User.findById(req.auth._id);
		if (!user) return res.status(400).json({ msg: "account was not found" });
		if (user.desk != null) {
			const desk = await Desk.findOne({ Owner: user._id })
				.select("Name OfficeID FloorID")
				.populate("OfficeID")
				.populate("FloorID", ["Name"]);
			//console.log(desk);
			if (!desk) {
				user.desk = null;
				await user.save();
				return res.status(200).json(user);
			}
			const result = { ...user.toObject(), desk };
			return res.status(200).json(result);
		}
		return res.status(200).json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports = {
	getAllUsers,
	getOwnAccount,
};
