const mongoose = require("mongoose");

var FloorSchema = new mongoose.Schema({
	Name: { type: String,  required: true},
    OfficeID: {  type: Schema.Types.ObjectId, ref: "Office"}
});

module.exports = mongoose.model("Floor", FloorSchema);
