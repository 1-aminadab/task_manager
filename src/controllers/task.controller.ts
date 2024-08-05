/* eslint-disable camelcase */
// src/controllers/taskController.ts
import { Request, Response } from 'express';
import { TaskService } from '../services/task.service';
import { Task } from '../types/task.type';
import { CustomRequest } from '../middleware/auth-middleware';

const taskService = new TaskService();

export class TaskController {
  async getAllTasksByUser(req: CustomRequest, res: Response): Promise<any> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(400).json({ message: 'User ID not found in token' });
      return;
    }
    const tasks = await taskService.getAllTasksByUser(userId);
    return res.json(tasks);
  }

  async getTaskById(req: CustomRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const task = await taskService.getTaskById(Number(id));
    res.json(task);
  }

  async createTask(req: CustomRequest, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      res.status(400).json({ message: 'User ID not found in token' });
      return;
    }
    const {
      title, description, end_at, time, priority, category
    } = req.body;

    const task: Task = {
      id: 0,
      userId,
      title,
      description,
      end_at,
      time,
      priority,
      category,
      is_complete: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const newTask = await taskService.createTask(task);
    console.log('newTask', newTask);
    res.json(newTask);
  }

  async updateTask(req: CustomRequest, res: Response): Promise<void> {
    const { id } = req.params;
    const userId = req.user?.id;
    if (!userId) {
      res.status(400).json({ message: 'User ID not found in token' });
      return;
    }
    const {
      title, description, end_at, time, priority, category, is_complete
    } = req.body;

    const task: Task = {
      id: Number(id),
      userId,
      title,
      description,
      end_at,
      time,
      priority,
      category,
      is_complete,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const updatedTask = await taskService.updateTask(task);
    res.json(updatedTask);
  }

  async deleteTask(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await taskService.deleteTask(Number(id));
    res.json({ message: 'Task deleted successfully' });
  }

  async markTaskComplete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { isComplete } = req.body;
    const updatedTask = await taskService.markTaskComplete(
      Number(id),
      isComplete
    );
    res.json(updatedTask);
  }
}
