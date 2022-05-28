const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
	try {
		const user = await User.create({
			email: req.body.email.trim().toLowerCase(),
			firstName: req.body.firstName.trim(),
			lastName: req.body.lastName.trim(),
			admin: req.body.admin,
			password: await hashPass(req.body.password.trim()),
		});

		return res.status(200).json(user);
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const registerAdmin = async (req, res) => {
	try {
		const user = await User.create({
			email: req.body.email.trim().toLowerCase(),
			firstName: req.body.firstName.trim(),
			lastName: req.body.lastName.trim(),
			admin: true,
			password: await hashPass(req.body.password.trim()),
		});

		const token = generateToken(user._id);
		res.status(200).json({ token: token });
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const loginUser = async (req, res) => {
	try {
		const token = generateToken(req.user._id);
		res.status(200).json({ token: token, isAdmin: req.user.admin });
	} catch (err) {
		res.status(500).json(err);
	}
};

async function hashPass(pass) {
	const hashedPass = await bcrypt.hash(pass, 10);
	return hashedPass;
}
function generateToken(id) {
	const token = jwt.sign({ _id: id }, process.env.AUTH_TOKEN_SECRET);
	return token;
}

module.exports = {
	registerUser,
	registerAdmin,
	loginUser,
};
