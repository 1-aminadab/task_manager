/* eslint-disable no-console */
// src/handlers/login.ts
import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import postgresConnection from '../../postgres-connection';
import { relogRequestHandler } from '../../middleware/request-middleware';

const loginWrapper: RequestHandler = async (req, res) => {
  const { email = undefined, password = undefined } = req.body;

  try {
    const result = await postgresConnection.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result[0]; // assuming result is an array with the user object

    if (!user) {
      return res.status(403).json({
        message: 'Auth failed'
      });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email
        },
        process.env.SECRET as string,
        {
          expiresIn: '12h'
        }
      );
      return res.status(200).json({
        token,
        uid: user.id
      });
    }

    return res.status(403).json({
      message: 'Auth failed'
    });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({
      message: 'Internal server error'
    });
  }
};

export const login = relogRequestHandler(loginWrapper, { skipJwtAuth: true });
