// src/config/jwtConfig.ts
import jwt from "jsonwebtoken";

export const secretKey = "your-secret-key"; // Should be stored securely
export const refreshTokenSecretKey = "your-refresh-secret-key"; // Should be stored securely
export const expiresIn = "1h"; // Access token expiration
export const refreshTokenExpiresIn = "7d"; // Refresh token expiration

interface JwtPayload {
  id: number;
  email: string;
}

export const generateToken = (payload: JwtPayload): string =>
  jwt.sign(payload, secretKey);

export const generateRefreshToken = (payload: JwtPayload): string =>
  jwt.sign(payload, refreshTokenSecretKey, {
    expiresIn: refreshTokenExpiresIn,
  });

export const verifyToken = (token: string): JwtPayload => {
  try {
    return jwt.verify(token, secretKey) as JwtPayload;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};

export const verifyRefreshToken = (token: string): JwtPayload =>
  jwt.verify(token, refreshTokenSecretKey) as JwtPayload;
