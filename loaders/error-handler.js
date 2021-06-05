const createError = require("http-errors");
const { ErrorLogger } = require("./logger");

module.exports = async ({app}) => {
	app.use((request, response, next) => next(createError(405, "")));

	app.use((error, request, response, next) => {
		ErrorLogger.log("error", error);
		response.status(error.status || 500);
		response.json({
			statusCode: error.errorCode || Number(9999),
			message: error.message
		});
	});
}