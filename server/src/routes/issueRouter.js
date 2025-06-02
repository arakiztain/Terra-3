import express from "express";
import issueController from "../controllers/issueController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", issueController.getIssues);
router.post("/report-issue", issueController.reportIssue);
router.put("/update/:issueId", issueController.updateIssue);

export default router;
