import { Router } from "express";
import projectController from "../controllers/projectController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post("/", isAdmin, projectController.createProject);

router.get("/", projectController.getAllProjects);

router.get("/:projectId", projectController.getProjectById);

router.put("/:projectId", isAdmin, projectController.assignProject);

router.delete("/:projectId", isAdmin, projectController.deleteProject);

export default router;