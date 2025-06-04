import express from "express";
import issueController from "../controllers/issueController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/report-issue/:projectId", isLoggedInAPI, issueController.reportIssue);
router.get("/:projectId", issueController.getIssues);
router.put("/update/:issueId", issueController.updateIssue);
router.delete("/delete/:issueId", issueController.deleteIssue);

export default router;