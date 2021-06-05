const config = require("../config");
const createError = require("http-errors");
const { Logger } = require("./logger");

const mongoose = require("mongoose");

const databaseType = config.DATABASE_TYPE;
const databaseUrl = config.DATABASE_URL;
const databaseUserName = config.DATABASE_USERNAME;
const databasePassword = config.DATABASE_PASSWORD;

if (!databaseType || !databaseUrl || !databaseUserName || !databasePassword)
	throw createError(500, "Can't Connect Database.");

let connect;
switch (databaseType.toUpperCase()) {
	case "MONGODB":
		const connectUrl = `${databaseUrl.split("://")[0]}://${databaseUserName}:${databasePassword}@${databaseUrl.split("//")[1]}`;
		connect = async () => {
			try {
				await mongoose.connect(connectUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
				Logger.log("info","Connected Database");
			} catch (error) {
				throw createError(500, error);
			}
		};
		break;
}

if (typeof connect !== "function")
	throw createError(500, "Can't Connect Database.");

module.exports = async () => {
	await connect();
}