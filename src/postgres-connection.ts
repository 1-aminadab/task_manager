// src/postgres-connection.ts
import { Pool } from "pg";
import dotenv from "dotenv";
import { logger } from "./logger";

dotenv.config();
class PostgresConnection {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    this.pool.on("connect", () => {
      logger.info("Connected to PostgreSQL");
    });

    this.pool.on("error", (err: any) => {
      logger.error(`PostgreSQL connection error: ${err.message}`);
      this.reconnect();
    });
  }

  public async query(text: string, params?: any[]): Promise<any> {
    try {
      const res = await this.pool.query(text, params);
      return res.rows;
    } catch (err) {
      logger.error(`PostgreSQL query error: ${err.message}`);
      throw err;
    }
  }

  public close(): void {
    this.pool.end(() => {
      logger.info("Closed PostgreSQL connection");
    });
  }

  private reconnect(): void {
    setTimeout(() => {
      this.pool.connect();
    }, 2000);
    logger.info("Retrying PostgreSQL connection");
  }
}

export default new PostgresConnection();
