const mongoose = require("mongoose");

var BookingSchema = new mongoose.Schema({
	desk: {  type: Schema.Types.ObjectId, ref: "Desk"},
    Owner: {  type: Schema.Types.ObjectId, ref: "User"},
    StartDate: { type: Date},
    EndDate: { type: Date}
});

module.exports = mongoose.model("Booking", BookingSchema);