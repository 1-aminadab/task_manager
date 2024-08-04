/* eslint-disable no-console */
/* eslint-disable consistent-return */
// src/handlers/register.ts
import { RequestHandler } from "express";
import Joi from "@hapi/joi";
import bcrypt from "bcrypt";
import postgresConnection from "../../postgres-connection";
import { relogRequestHandler } from "../../middleware/request-middleware";

export const addUserSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

const registerWrapper: RequestHandler = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    // Check if user already exists
    const existingUserResult = await postgresConnection.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (existingUserResult.length > 0) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Insert new user into the database
    const result = await postgresConnection.query(
      "INSERT INTO users (email, password, first_name, last_name, created_on, updated_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [email, hashedPassword, firstName, lastName, new Date(), new Date()]
    );

    const user = result[0];

    res.status(201).json(user);
  } catch (error) {
    if (error.code === "23505") {
      // Unique violation error code
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }
    console.error("Error during user registration:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const register = relogRequestHandler(registerWrapper, {
  validation: { body: addUserSchema },
  skipJwtAuth: true,
});
