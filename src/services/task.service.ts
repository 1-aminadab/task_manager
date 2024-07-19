import { TaskModel } from '../models/task.model';
import { Task } from '../types/task.type';

const taskModel = new TaskModel();

export class TaskService {
  getAllTasksByUser(userId: number): Promise<Task[]> {
    return taskModel.getAllTasksByUser(userId);
  }

  getTaskById(id: number): Promise<Task> {
    return taskModel.getTaskById(id);
  }

  createTask(task: Task): Promise<Task> {
    return taskModel.createTask(task);
  }

  updateTask(task: Task): Promise<Task> {
    return taskModel.updateTask(task);
  }

  deleteTask(id: number): Promise<void> {
    return taskModel.deleteTask(id);
  }

  markTaskComplete(id: number, isComplete: boolean): Promise<Task> {
    return taskModel.markTaskComplete(id, isComplete);
  }
}
