// src/services/authService.ts
import pool from "../postgres-connection";

export class AuthService {
  static async findUserByEmail(email: string): Promise<any> {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.length > 0) {
      return result[0];
    }

    return null;
  }

  static async findUserById(id: string): Promise<any> {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.length > 0) {
      return result[0];
    }

    return null;
  }
}
