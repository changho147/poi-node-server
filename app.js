const express = require("express");
const config = require("./config");
const loaders = require("./loaders");

async function runServer() {
	const app = express();
	await loaders({rootPath: __dirname, app: app});

	app.listen(config.SERVER_PORT, error => {
		if (error)
			return console.error(error);

		console.log(`Started Server on Port ${config.SERVER_PORT}`);
	});
}

runServer().then();


