const mongoose = require("mongoose");

var DeskSchema = new mongoose.Schema({

	Name: { type: String,  required: true},
    OfficeID: {  type: Schema.Types.ObjectId, ref: "Office"},
    FloorID: { type: Schema.Types.ObjectId, ref: "Floor"},
    Bookable: { type: Boolean, required: true },
    Owner: { type: Schema.Types.ObjectId, ref: "User", default: null}
});

module.exports = mongoose.model("Desk", DeskSchema);
