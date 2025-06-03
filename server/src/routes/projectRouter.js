import { Router } from "express";
import projectController from "../controllers/projectController.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post("/:userId", isAdmin, projectController.createProject);

router.get("/", projectController.getAllProjects);

router.get("/:id", projectController.getProjectById);

router.put("/:id", isAdmin, projectController.updateProject);

router.delete("/:id", isAdmin, projectController.deleteProject);


export default router;