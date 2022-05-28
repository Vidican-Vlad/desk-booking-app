const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true, minlength: 6 },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	admin: {
		type: Boolean,
		default: false,
	},
	
});

module.exports = mongoose.model("User", UserSchema);
