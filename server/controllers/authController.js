const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("../config/nodemailer")

const registerUser = async (req, res) => {
	try {
		let user = await User.create({
			email: req.body.email.trim().toLowerCase(),
			firstName: req.body.firstName.trim(),
			lastName: req.body.lastName.trim(),
			admin: req.body.admin,
			password: await hashPass(req.body.password.trim()),
		});
		await nodemailer.sendWelcomeEmail(user.email, user.firstName,req.body.password.trim());

		return res.status(200).json(user);
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
};

const generatePassResetKey = async (req, res) =>{
	try {
		const key = generateResetToken();
		const user = req.auth;
		user.resetKey = key;
		await Promise.all([ nodemailer.sendResetToken(user.email, user.firstName, key), user.save() ]);
		return res.status(200).json({msg: "reset token was genereated and sent to the user"});
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
}

const changePassword = async (req, res) =>{
	try {
		const user = req.auth;
		user.initialPassword = false;
		user.password = hashPass(req.body.password);
		await user.save();
		return res.status(200).json({msg: "passwrod was changed"})
		
	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
}

const registerAdmin = async (req, res) => {
	try {
		const user = await User.create({
			email: req.body.email.trim().toLowerCase(),
			firstName: req.body.firstName.trim(),
			lastName: req.body.lastName.trim(),
			admin: true,
			password: await hashPass(req.body.password.trim()),
			initialPassword: false
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
		//console.log(req.user);
		const token = generateToken(req.user._id, req.user.initialPass);
		res.status(200).json({ token: token, isAdmin: req.user.admin });
	} catch (err) {
		res.status(500).json(err);
	}
};

async function hashPass(pass) {
	const hashedPass = await bcrypt.hash(pass, 10);
	return hashedPass;
}
function generateToken(id, initialPass) {
	const token = jwt.sign({ _id: id, initialPass }, process.env.AUTH_TOKEN_SECRET);
	return token;
}
function generateResetToken() {
	return Math.random().toString(36).substr(2, 5)
}

module.exports = {
	registerUser,
	registerAdmin,
	loginUser,
	generatePassResetKey,
	changePassword
};
