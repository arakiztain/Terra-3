import projectModel from "../models/project.js";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import { ProjectNotFound } from "../utils/errors.js";

dotenv.config();

async function getIssues(req, res) {
  try {
    const projectId = req.params.projectId.trim();
    const project = await projectModel.findById(projectId);
    const folderIds = project.clickupLists.map(list => list.listId);
    console.log("folderIds", folderIds);
    const listsResponse = await axios.get(
      `https://api.clickup.com/api/v2/folder/${folderId}/list`,
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
        },
      }
    );

    const lists = listsResponse.data.lists;

    const allTasks = [];

    for (const list of lists) {
      const tasksResponse = await axios.get(
        `https://api.clickup.com/api/v2/list/${list.id}/task?page=0`,
        {
          headers: {
            Authorization: process.env.CLICKUP_API_TOKEN,
          },
        }
      );

      allTasks.push(...tasksResponse.data.tasks);
    }

    return res.json(allTasks);
  } catch (error) {
    console.error("❌ Error fetching tasks from folder:", error.response?.data || error.message);
    return res.status(500).json({
      error: "Could not fetch tasks from folder",
      details: error.response?.data || error.message,
    });
  }
}

async function reportIssue(req, res, next) {
  const projectId = req.params.projectId.trim();
  const { name, description, priority, tags, request_type } = req.body;
  console.log("This is req body");
  console.log(req.body);
  if (!name || !description) {
    return res.status(400).json({ error: "Missing required fields: name or description" });
  }

  const taskData = {
    name,
    description,
    tags: tags || [],
    priority: priority || 3, // values from 1 (Urgent) to 4 (Low)
    request_type
  };

  try {
    const project = await projectModel.findById(projectId);
    if (!project) {
      return next(new ProjectNotFound())
    }
    const listId = project.clickupLists.find(list => list.name === request_type.toLowerCase()).listId;
    taskData.list_id = listId;

    const response = await axios.post(
      `https://api.clickup.com/api/v2/list/${listId}/task`,
      taskData,
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(201).json({
      message: "✅ Issue successfully created in ClickUp",
      task: response.data
    });
  } catch (error) {
    console.error("❌ Error creating task in ClickUp:", error.response?.data || error.message);
    res.status(500).json({
      error: "Could not create task in ClickUp",
      details: error.response?.data || error.message
    });
  }
};

async function updateIssue(req, res) {
  try {
    const issueId = req.params.issueId;
    const updateFields = req.body;

    const response = await axios.put(
      `https://api.clickup.com/api/v2/task/${issueId}`,
      updateFields,
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Task updated:", response.data);
    return res.json(response.data);

  } catch (error) {
    console.error("❌ Error updating task:", error.response?.data || error.message);
    res.status(500).json({ error: "Could not update the task" });
  }
}

async function deleteIssue(req, res) {
  try {
    const issueId = req.params.issueId;

    const response = await axios.delete(
      `https://api.clickup.com/api/v2/task/${issueId}`,
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("🗑️ Task deleted:", response.data);
    return res.json({ message: "Task successfully deleted" });

  } catch (error) {
    console.error("❌ Error deleting task:", error.response?.data || error.message);
    res.status(500).json({ error: "Could not delete the task" });
  }
}

async function uploadScreenshot(req, res) {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No images have been uploaded" });
    }
    
    // Get the ClickUp task ID directly from parameters
    const clickupTaskId = req.params.issueId || req.params.id;
    
    if (!clickupTaskId) {
      return res.status(400).json({ error: "ClickUp task ID not provided" });
    }
    
    // Verify if the task exists in ClickUp
    try {
      await axios.get(`https://api.clickup.com/api/v2/task/${clickupTaskId}`, {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN
        }
      });
    } catch (verifyError) {
      console.error("Error verifying task in ClickUp:", verifyError.message);
      return res.status(404).json({ 
        error: "Could not verify task in ClickUp",
        details: verifyError.response?.data || verifyError.message
      });
    }
    
    // Array to store ClickUp responses
    const uploadResults = [];
    const errors = [];
    const filesToDelete = []; // Array to keep track of files to delete later
    
    // Upload multiple images to ClickUp, one by one
    for (const file of req.files) {
      
      // Store file path to delete it later
      filesToDelete.push(filePath);
      
      const form = new FormData();
      form.append('attachment', fs.createReadStream(filePath));
      
      try {
        const clickupResponse = await axios.post(
          `https://api.clickup.com/api/v2/task/${clickupTaskId}/attachment`,
          form,
          {
            headers: {
              Authorization: process.env.CLICKUP_API_TOKEN,
              ...form.getHeaders()
            }
          }
        );
        
        console.log(`✅ Image uploaded to ClickUp: ${file.filename}`);
        uploadResults.push({
          filename: file.filename,
          clickupAttachment: clickupResponse.data
        });
        
      } catch (clickupError) {
        console.error("Error uploading image to ClickUp:", clickupError.response?.data || clickupError.message);
        errors.push({
          filename: file.filename,
          error: clickupError.response?.data || clickupError.message
        });
      }
    }
    
    // Delete all temporary files after processing all uploads
    filesToDelete.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error(`Error deleting temporary file ${filePath}:`, err);
        });
      }
    });
    
    // Determine response message based on results
    if (uploadResults.length > 0 && errors.length === 0) {
      res.status(200).json({
        message: `${uploadResults.length} screenshots successfully uploaded to ClickUp`,
        uploads: uploadResults
      });
    } else if (uploadResults.length > 0 && errors.length > 0) {
      res.status(207).json({
        message: `${uploadResults.length} screenshots uploaded, but there were ${errors.length} errors`,
        uploads: uploadResults,
        errors
      });
    } else {
      res.status(500).json({
        error: "Could not upload any images to ClickUp",
        errors
      });
    }
    
  } catch (error) {
    console.error("General error uploading screenshots:", error);
    res.status(500).json({ error: "Error uploading screenshots" });
  }
}

export default {
  getIssues,
  reportIssue,
  updateIssue,
  deleteIssue,
  uploadScreenshot
};