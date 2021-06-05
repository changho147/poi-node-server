const expressLoader = require("./express");
const databaseLoader = require("./database-loader");
const errorHandler = require("./error-handler");

module.exports = async ({rootPath, app}) => {
	await databaseLoader();
	await expressLoader({rootPath, app});
	await errorHandler({app});

	require("../models/user/user");
}