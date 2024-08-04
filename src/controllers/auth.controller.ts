/* eslint-disable no-console */
/* eslint-disable consistent-return */
// src/controllers/authController.ts
import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../config/jwt';
import { AuthService } from '../services/auth.service';
import { register } from './auth/register';

class AuthController {
  static register: RequestHandler = register;

  static login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await AuthService.findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = generateToken({ id: user.id, email: user.email });
      const refreshToken = generateRefreshToken({ id: user.id, email: user.email });

      res.status(200).json({ token, refreshToken });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  };

  static refreshToken: RequestHandler = async (req, res) => {
    const { refreshToken } = req.body;

    try {
      const decoded = verifyRefreshToken(refreshToken);
      const user = await AuthService.findUserByEmail(decoded.email);

      if (!user) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }

      const newToken = generateToken({ id: user.id, email: user.email });
      const newRefreshToken = generateRefreshToken({ id: user.id, email: user.email });

      res.status(200).json({ token: newToken, refreshToken: newRefreshToken });
    } catch (error) {
      console.error('Error during token refresh:', error);
      res.status(401).json({ message: 'Invalid refresh token', error: error.message });
    }
  };

  static logout: RequestHandler = (req, res) => {
    // For simplicity, we're not handling token invalidation here. This can be managed through a token blacklist in a real-world scenario.
    res.status(200).json({ message: 'Logged out successfully' });
  };
}

export default AuthController;