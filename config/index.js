const path = require("path");
const dotenv = require("dotenv");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envMap = {
	"production": ".env",
	"development": "dev.env"
};

const env = dotenv.config({
	path: path.resolve(process.cwd(), `./config/${envMap[process.env.NODE_ENV || "development"]}`)
});

if (env.error)
	throw new Error("Couldn't find .env file️");

module.exports = {
	SERVER_PORT: process.env.SERVER_PORT || 8080,

	DATABASE_TYPE: process.env.DATABASE_TYPE,
	DATABASE_URL: process.env.DATABASE_URL,
	DATABASE_USERNAME: process.env.DATABASE_USERNAME,
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,

	LOG_LEVEL: process.env.LOG_LEVEL || "debug",
	LOG_DIR: process.env.LOG_DIR || "logs",

	API_PREFIX: "/rest/api/v1/"
}