import pool from '../postgres-connection'; // Assuming default export from 'postgres-connection'
import { Task } from '../types/task.type';

export class TaskModel {
  async getAllTasksByUser(userId: number): Promise<Task[]> {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    return result.rows;
  }

  async getTaskById(id: number): Promise<Task> {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  async createTask(task: Task): Promise<Task> {
    const result = await pool.query(
      'INSERT INTO tasks (user_id, title, description, is_complete, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [task.userId, task.title, task.description, task.isComplete, new Date(), new Date()]
    );
    return result.rows[0];
  }

  async updateTask(task: Task): Promise<Task> {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, is_complete = $3, updated_at = $4 WHERE id = $5 RETURNING *',
      [task.title, task.description, task.isComplete, new Date(), task.id]
    );
    return result.rows[0];
  }

  async deleteTask(id: number): Promise<void> {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  }

  async markTaskComplete(id: number, isComplete: boolean): Promise<Task> {
    const result = await pool.query(
      'UPDATE tasks SET is_complete = $1, updated_at = $2 WHERE id = $3 RETURNING *',
      [isComplete, new Date(), id]
    );
    return result.rows[0];
  }
}
