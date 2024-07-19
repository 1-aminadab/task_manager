/* eslint-disable no-console */
/* eslint-disable consistent-return */
// src/middleware/auth-middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/jwt';

export interface CustomRequest extends Request {
  user?: any;
}
export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction): Response | void => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(403).json({ message: 'Invalid token' });
  }
};
