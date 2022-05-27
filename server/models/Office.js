const mongoose = require("mongoose");

var OfficeSchema = new mongoose.Schema({
    address: { type: String, required: true},
    name: { type: String, required: true},
});


module.exports = mongoose.model("Office", OfficeSchema );