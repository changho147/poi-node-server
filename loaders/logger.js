const config = require("../config");
const winston = require("winston");
const { combine, errors, timestamp, printf } = winston.format;
const expressWinston = require("express-winston");
require("winston-daily-rotate-file");

const isDevelopment = process.env.NODE_ENV === "development";

const transports = {
	console: new winston.transports.Console({
		level: config.LOG_LEVEL,
		handleExceptions: true,
		json: false
	}),
	dailyRotateFile: new winston.transports.DailyRotateFile({
		level: config.LOG_LEVEL,
		dirname: config.LOG_DIR,
		filename: "application-%DATE%.log",
		datePattern: "YYYY-MM-DD",
		handleExceptions: true,
		zippedArchive: false,
		maxFiles: "10d"
	})
};

const Logger = winston.createLogger({
	format: combine(
		errors({stack: true}),
		timestamp({
			format: "YYYY-MM-DD HH:mm:ss"
		}),
		printf(({timestamp, level, message, ...metadata}) => {
			return `[${timestamp}][${level}] ${message} ${metadata?.meta?.req?.headers ? `\n requestHeaders: ${JSON.stringify(metadata.meta.req.headers)}`: ""} ${metadata?.meta?.req?.query ? `\n requestParameters: ${JSON.stringify(metadata.meta.req.query)}` : ""} ${metadata?.meta?.req?.body ? `\n requestBody: ${JSON.stringify(metadata.meta.req.body)}` : ""} ${metadata?.meta?.res ? `\n response: ${JSON.stringify(metadata.meta.res)}` : ""}`;
		})
	),
	transports: [
		isDevelopment ? transports.console : transports.dailyRotateFile
	]
});

const ErrorLogger = winston.createLogger({
	format: combine(
		errors({stack: true}),
		timestamp({
			format: "YYYY-MM-DD HH:mm:ss"
		}),
		printf(({timestamp, level, ...metadata}) => {
			const error = metadata?.meta ? metadata.meta : metadata;
			return `[${timestamp}][${level}] ${error.stack ? `\n ${error.stack}` : ""}`;
		})
	),
	transports: [
		isDevelopment ? transports.console : transports.dailyRotateFile
	]
})

expressWinston.requestWhitelist.push("body");
expressWinston.responseWhitelist.push("body");

module.exports = {
	expressWinston,
	Logger,
	ErrorLogger
}

