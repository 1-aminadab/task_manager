import { RequestHandler } from "express";
import { Pool } from "pg";
import { relogRequestHandler } from "../../middleware/request-middleware";

// Create a new PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const allWrapper: RequestHandler = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    const users = result.rows;
    return res.send({ users });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const all = relogRequestHandler(allWrapper);
