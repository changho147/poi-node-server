const router = require("express").Router();

const auth = require("./routes/auth/auth");

module.exports = () => {
	auth(router);

	return router;
};