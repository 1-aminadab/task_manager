/* eslint-disable camelcase */
export interface Task {
  id: number;
  userId: number;
  title: string;
  end_at: string,
  time: string,
  priority:string,
  category: string,
  description: string;
  is_complete: boolean;
  createdAt: Date;
  updatedAt: Date;
}
