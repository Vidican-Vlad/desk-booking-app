const jwt = require("jsonwebtoken");

const config = process.env;

const auth = (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
			const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
			req.auth = decoded;
			res.locals.user = decoded;
			next();
		} catch (error) {
			console.error(error.message);
			return res.status(400).send({ errors: [{ msg: "TOKEN_INVALID" }] });
		}
	}
	if (!token) {
		return res.status(403).json({ errors: [{ msg: "TOKEN_REQUIRED" }] });
	}
};

module.exports = auth;
