import pool from '../postgres-connection'; // Assuming default export from 'postgres-connection'
import { Task } from '../types/task.type';

export class TaskModel {
  async getAllTasksByUser(userId: number): Promise<Task[]> {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [
      userId
    ]);
    return result.rows;
  }

  async getTaskById(id: number): Promise<Task> {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0];
  }

  async createTask(task: Task): Promise<Task> {
    const result = await pool.query(
      `INSERT INTO tasks 
       (user_id, title, description, end_at, time, priority, category, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        task.userId,
        task.title,
        task.description,
        task.end_at,
        task.time,
        task.priority,
        task.category,
        new Date(),
        new Date()
      ]
    );
    return result[0];
  }

  async updateTask(task: Task): Promise<Task> {
    const result = await pool.query(
      `UPDATE tasks SET 
       title = $1, 
       description = $2, 
       end_at = $3, 
       time = $4, 
       priority = $5, 
       category = $6, 
       updated_at = $7 
       WHERE id = $8 RETURNING *`,
      [
        task.title,
        task.description,
        task.end_at,
        task.time,
        task.priority,
        task.category,
        new Date(),
        task.id
      ]
    );
    return result[0];
  }

  async deleteTask(id: number): Promise<void> {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  }

  async markTaskComplete(id: number, isComplete: boolean): Promise<Task> {
    const result = await pool.query(
      "UPDATE tasks SET is_complete = $1, updated_at = $2 WHERE id = $3 RETURNING *",
      [isComplete, new Date(), id]
    );
    return result;
  }
}
