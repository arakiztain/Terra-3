import express from "express";
import issueController from "../controllers/issueController.js";
import { prepareProjectName, uploadIssueScreenshot } from "../middlewares/multer.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/report-issue/:projectId", issueController.reportIssue);
router.get("/:projectId", issueController.getIssues);
router.put("/update/:issueId", issueController.updateIssue);
router.delete("/delete/:issueId", issueController.deleteIssue);
router.post("/:issueId/screenshot", prepareProjectName,
    uploadIssueScreenshot.array("screenshot", 10), // allow up to 5 images
    issueController.uploadScreenshot);

export default router;