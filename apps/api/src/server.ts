import db from "@quibly/database";
import colors from "colors";
import { Server } from "http";
import app from "./app";
import config from "./app/config";
import logger from "./app/logger";
import pingServer from "./app/utils/pingServer";

let server: Server;

async function main() {
  try {
    // Connect to the database
    await db.$connect();

    // Start the server
    server = app.listen(config.port, () => {
      logger.info(colors.green.bold(`Server listening on port ${config.port} ✔️`));
    });
    // Ping server on interval to keep service up on RENDER
    pingServer();
  } catch (error) {
    logger.error(colors.red.bold("Error connecting to database:"), error);
    cleanup();
  }
}

// Handle unhandledRejection
process.on("unhandledRejection", (error) => {
  logger.error(colors.red.bold("Unhandled Rejection Error:"), error);
  if (server) {
    server.close(() => {
      db.$disconnect();
      process.exit(1);
    });
  } else {
    cleanup();
  }
});

// Handle uncaughtException
process.on("uncaughtException", (error) => {
  logger.error(colors.red.bold("Uncaught Exception Error:"), error);
  if (server) {
    server.close(() => {
      db.$disconnect();
      process.exit(1);
    });
  } else {
    cleanup();
  }
});

function cleanup() {
  db.$disconnect();
  process.exit(1);
}

main();
