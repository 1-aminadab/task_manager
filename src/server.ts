/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
import dotenv from "dotenv";

import { app } from "./app";
import postgresConnection from "./postgres-connection";
import { logger } from "./logger";

dotenv.config();

// Apply the cors middleware with configuration to allow any origin

if (!process.env.DATABASE_URL) {
  logger.error("DATABASE_URL not specified in environment");
  process.exit(1);
} else {
  postgresConnection
    .query("SELECT 1", [])
    .then(() => {
      app.listen(app.get("port"), (): void => {
        logger.info(
          `🌏 Express server started at http://localhost:${app.get("port")}`
        );
      });
    })
    .catch((err) => {
      logger.error(`Failed to connect to database: ${err.message}`);
      process.exit(1);
    });
}

// Close the PostgreSQL connection, when receiving SIGINT
process.on("SIGINT", () => {
  logger.info("Gracefully shutting down");
  postgresConnection.close();
  process.exit(0);
});
