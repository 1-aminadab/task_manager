import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export interface IUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdOn: Date;
  updatedOn: Date;
}

export class User {
  static async findOne(email: string): Promise<IUser | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async save(user: IUser): Promise<IUser> {
    const result = await pool.query(
      'INSERT INTO users (email, password, first_name, last_name, created_on, updated_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [user.email, user.password, user.firstName, user.lastName, user.createdOn, user.updatedOn]
    );
    return result.rows[0];
  }

  static encryptPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  static validPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}
