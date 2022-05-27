const mongoose = require("mongoose");

const { MONGODB_URI } = process.env;
mongoose.set("returnOriginal", false);
exports.connect = () => {
	mongoose
		.connect(MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("MongoDB Connected");
		})
		.catch((err) => {
			console.log(err);
		});
};
