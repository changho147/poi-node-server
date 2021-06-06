const expressLoader = require("./express");
// const databaseLoader = require("./database-loader");

module.exports = async ({app}) => {
	// await databaseLoader();
	await expressLoader({app});
}