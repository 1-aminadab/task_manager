import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import apiSpec from "../swagger-doc.json";

import * as UserController from "./controllers/user";
import AuthController from "./controllers/auth.controller";
import { authenticateJWT } from "./middleware/auth-middleware";
import { TaskController } from "./controllers/task.controller";

export const router = Router();

// Auth routes
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

// User routes

const taskController = new TaskController();

router.use(authenticateJWT);
// router.get("/me", AuthController.getUser);
router.get("/user/all", UserController.all);

router.get("/tasks", taskController.getAllTasksByUser.bind(taskController));
router.get("/tasks/:id", taskController.getTaskById.bind(taskController));
router.post("/tasks", taskController.createTask.bind(taskController));
router.put("/tasks/:id", taskController.updateTask.bind(taskController));
router.delete("/tasks/:id", taskController.deleteTask.bind(taskController));
router.patch(
  "/tasks/:id/complete",
  taskController.markTaskComplete.bind(taskController)
);

// swagger docs
if (process.env.NODE_ENV === "development") {
  router.use("/dev/api-docs", swaggerUi.serve);
  router.get("/dev/api-docs", swaggerUi.setup(apiSpec));
}
