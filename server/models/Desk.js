const mongoose = require("mongoose");

var DeskSchema = new mongoose.Schema({
	Name: { type: String, required: true },
	OfficeID: { type: mongoose.Schema.Types.ObjectId, ref: "Office" },
	FloorID: { type: mongoose.Schema.Types.ObjectId, ref: "Floor" },
	Bookable: { type: Boolean, required: true },
	Owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
	upLeft: {
		x: { type: String, required: true },
		y: { type: String, required: true },
	},
	upRight: {
		x: { type: String, required: true },
		y: { type: String, required: true },
	},
	downLeft: {
		x: { type: String, required: true },
		y: { type: String, required: true },
	},
	downRight: {
		x: { type: String, required: true },
		y: { type: String, required: true },
	},
});

module.exports = mongoose.model("Desk", DeskSchema);
