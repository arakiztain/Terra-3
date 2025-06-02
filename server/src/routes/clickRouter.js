import express from "express";
import { reportIssue } from "../controllers/clickupController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/report-issue", reportIssue);

export default router;
