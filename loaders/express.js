const express = require("express");
const config = require("../config");
const routes = require("../api");
const createError = require("http-errors");

const { expressWinston, Logger, ErrorLogger } = require("./logger");

module.exports = async ({rootPath, app}) => {
	app.use(express.static(`${rootPath}/public`));
	app.use(express.json());

	app.use(expressWinston.logger({
		colorize: true,
		winstonInstance: Logger
	}));

	app.use(config.API_PREFIX, routes());

	app.use(expressWinston.errorLogger({
		colorize: true,
		winstonInstance: ErrorLogger
	}));

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