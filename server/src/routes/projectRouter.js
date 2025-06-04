import { Router } from "express";
import projectController from "../controllers/projectController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.post("/", isLoggedInAPI, isAdmin, projectController.createProject);
router.get("/", isLoggedInAPI, projectController.getAllProjects);
router.get("/:id", isLoggedInAPI, projectController.getProjectById);
router.put("/:id", isLoggedInAPI, isAdmin, projectController.updateProject);
router.delete("/:id", isLoggedInAPI, isAdmin, projectController.deleteProject);


export default router;