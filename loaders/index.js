const expressLoader = require("./express");
// const databaseLoader = require("./database-loader");

module.exports = async ({rootPath, app}) => {
	// await databaseLoader();
	await expressLoader({rootPath, app});
}