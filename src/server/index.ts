/*eslint-env node*/
import "./init";
import http from "http";
import allApp from "./_globalRoutes";
import db from "../configs/db";
import logger from "../utils/winston";

const server = http.createServer(allApp);
const port = normalizePort(process.env.PORT || "8080");

server.listen(port);

server.on("listening", onListenning);
server.on("clientError", onError);
server.on("close", onClose);

function normalizePort(val: string) {
	const port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
}

function onError(error: any) {
	if (error.syscall !== "listen") {
		throw error;
	}
	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
	switch (error.code) {
		case "EACCES":
			logger.error(bind + " requires elevated privileges");
			break;

		case "EADDRINUSE":
			logger.error(bind + " is already in use");
			break;

		default:
			throw error;
	}

	process.exit(1);
}

function onClose() {
	db.$disconnect();
	process.exit(0);
}

function onListenning() {
	db.$connect()
		.then(() => {
			logger.info("Database Connected");
		})
		.catch((err: Error) => {
			logger.error(err.message);
		});
}

logger.info(`Docs on http://localhost:${port}/docs`);
logger.info(`Prometheus metrics on http://localhost:${port}/metrics`);

export default server;
