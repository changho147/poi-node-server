const express = require("express");
const config = require("../config");
const routes = require("../api");

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

	return app;
}