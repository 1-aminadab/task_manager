export interface Task {
    id: number;
    userId: number;
    title: string;
    description: string;
    isComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
