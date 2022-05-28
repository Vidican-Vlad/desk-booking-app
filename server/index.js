require("dotenv").config();
require("./config/database.js").connect();

const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const listener = app.listen(process.env.API_PORT, function () {
	console.log("Listening on port " + listener.address().port);
});

const authAPI = require("./routes/authRoutes");
const userAPI = require("./routes/userRoutes");

app.use(bodyParser.json());
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	}),
);
app.use(cookieParser());

app.use("/api/auth", authAPI);
app.use("/api/user", userAPI);

module.exports = app;
