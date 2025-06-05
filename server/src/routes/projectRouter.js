import { Router } from "express";
import projectController from "../controllers/projectController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post("/", isLoggedInAPI, isAdmin, projectController.createProject);

router.get("/", isLoggedInAPI, isAdmin, projectController.getAllProjects);

router.get("/:projectId", isLoggedInAPI, projectController.getProjectById);

router.put("/:projectId", isLoggedInAPI, isAdmin, projectController.updateProject);

router.delete("/:projectId", isLoggedInAPI, isAdmin, projectController.deleteProject);

export default router;