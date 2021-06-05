const authRoute = require("express").Router();
const User = require("../../../models/user/user");

module.exports = (router) => {
	router.use("/auth", authRoute);

	authRoute.get("/auths", (request, response, next) => {
		User.find((error, items) => {
			response.json(items);
		});
	});

	authRoute.post("/auths", (request, response, next) => {
		User.create({id: "changho", password: "changho", name: "이창호"});
		response.end();
	});
};