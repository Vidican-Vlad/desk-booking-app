const mongoose = require("mongoose");

var OfficeSchema = new mongoose.Schema({
    Address: { type: String, required: true},
    Name: { type: String, required: true},
});


module.exports = mongoose.model("Office", OfficeSchema );