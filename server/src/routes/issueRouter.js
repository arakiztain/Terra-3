import express from "express";
import issueController from "../controllers/issueController.js";

const router = express.Router();

router.get("/:projectId", issueController.getIssues);
router.post("/report-issue/:projectId", issueController.reportIssue);
router.put("/update/:issueId", issueController.updateIssue);
router.delete("/delete/:issueId", issueController.deleteIssue);

export default router;
