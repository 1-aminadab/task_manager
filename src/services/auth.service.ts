// src/services/authService.ts
import pool from '../postgres-connection';

export class AuthService {
  static async findUserByEmail(email: string): Promise<any> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    }

    return null;
  }
}
