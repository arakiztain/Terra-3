import { Router } from "express";
import projectController from "../controllers/projectController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post("/", isAdmin, projectController.createProject);

router.get("/", projectController.getAllProjects);

router.get("/:projectId", projectController.getProjectById);

router.put("/:projectId", isAdmin, projectController.updateProject);

router.delete("/:projectId", isAdmin, projectController.deleteProject);


export default router;