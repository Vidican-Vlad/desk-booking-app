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

const getUserById = async (req, res) => {
	try {
		const user = await User.findById(req.auth._id);
		return res.status(200).json(user);
	} catch (err) {
		console.log(err);
		return res.status(500).json(err);
	}
};

module.exports = {
	getAllUsers,
	getUserById,
};
