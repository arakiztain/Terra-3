import multer from "multer";
import path from "path";
import fs from "fs";
import axios from "axios";

// Simplified middleware that doesn't depend on MongoDB
export async function prepareProjectName(req, res, next) {
  try {
    const taskId = req.params.issueId || req.params.id;
    
    if (!taskId) {
      return res.status(400).json({ error: "Task ID not provided" });
    }
    
    // Get task information directly from ClickUp
    try {
      const response = await axios.get(`https://api.clickup.com/api/v2/task/${taskId}`, {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN
        }
      });
      
      // Extract project/list name from ClickUp
      const taskData = response.data;
      let projectName = "clickup_task";
      
      // If the task has information about its list or folder, use it for the name
      if (taskData.list && taskData.list.name) {
        projectName = taskData.list.name.replace(/\s+/g, "_").toLowerCase();
      } else if (taskData.folder && taskData.folder.name) {
        projectName = taskData.folder.name.replace(/\s+/g, "_").toLowerCase();
      }
      
      req.projectName = projectName;
      next();
      
    } catch (clickupError) {
      // If task information cannot be obtained, use a generic name
      console.error("Error getting task information:", clickupError.message);
      req.projectName = `task_${taskId}`;
      next();
    }
    
  } catch (error) {
    console.error("Error in prepareProjectName:", error);
    req.projectName = "unknown_task";
    next(); // Continue anyway with a generic name
  }
}

// Multer configuration for issue screenshots
const issueStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create directory if it doesn't exist
    const dir = "public/images/issues";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const projectName = req.projectName || "unknown";
  
    const now = new Date();
    const shortYear = String(now.getFullYear()).slice(2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    
    // get original file name without extension
    const originalName = path.basename(file.originalname, path.extname(file.originalname));
    const extension = path.extname(file.originalname);
  
    // YYMMDD format
    const dateStr = `${shortYear}${month}${day}`;
    
    // combine all, using original file name
    cb(null, `${projectName}-${dateStr}-${originalName}${extension}`);
  }
});

// Function to filter by file type
const fileFilter = (req, file, cb) => {
  // accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

export const uploadIssueScreenshot = multer({ 
  storage: issueStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // limited to 5mb
  }
});