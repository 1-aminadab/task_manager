// src/types/express.d.ts
import { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: any; // Adjust the type based on your user object structure
  }
}
