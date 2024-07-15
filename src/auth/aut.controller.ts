import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.login(email, password);
    return res.status(result.status).json(result.data);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = (req: Request, res: Response) => {
  // Invalidate token logic if needed
  return res.status(200).json({ message: 'Logged out successfully' });
};

export const refreshToken = async (req: Request, res: Response) => {
  // Refresh token logic
};
