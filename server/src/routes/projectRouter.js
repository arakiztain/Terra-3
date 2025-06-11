import { Router } from "express";
import projectController from "../controllers/projectController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post("/", isAdmin, projectController.createProject);

router.patch("/", isLoggedInAPI, isAdmin, projectController.updateProject);

router.get("/", isLoggedInAPI, projectController.getAllProjects);

router.get("/:projectId", projectController.getProjectById);

router.put("/:projectId", isAdmin, projectController.assignProject);

router.delete("/:projectId", isAdmin, projectController.deleteProject);

router.get("/:projectId/task-count", projectController.getTaskCount);

router.post("/:projectId/reminder", projectController.sendReminderEmail);

export default router;




