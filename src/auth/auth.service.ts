import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import pool from '../config/database';
import { jwtConfig } from '../config/jwt';

export const login = async (email: string, password: string) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return { status: 403, data: { message: 'Auth failed' } };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return { status: 403, data: { message: 'Auth failed' } };
    }

    const token = jwt.sign({ email: user.email, userId: user.id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });

    return { status: 200, data: { token, uid: user.id } };
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Internal server error');
  }
};
