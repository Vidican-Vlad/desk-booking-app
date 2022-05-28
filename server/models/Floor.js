const mongoose = require("mongoose");

var FloorSchema = new mongoose.Schema({
	Name: { type: String,  required: true},
    OfficeID: { type: mongoose.Schema.Types.ObjectId, ref: "Office"},
    Image: { type: String, required: true}
});

module.exports = mongoose.model("Floor", FloorSchema);
