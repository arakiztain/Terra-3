import projectModel from "../models/project.js";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getIssues(req, res) {
  try {
    const response = await axios.get(
      `https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task?page=0`,
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
        },
      }
    );
    return res.json(response.data.tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.response?.data || error.message);
    throw error;
  }
};

async function reportIssue(req, res) {
  console.log("Reaches the report issue");
  const projectId = req.params.projectId.trim();
  const { name, description, priority, tags, request_type } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Missing required fields: name or description" });
  }

  const taskData = {
    name,
    description,
    tags: tags || [],
    priority: priority || 3, // values from 1 (Urgent) to 4 (Low)
    request_type: request_type
  };

  try {
    const project = await projectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
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

export default {
  getIssues,
  reportIssue,
  updateIssue,
  deleteIssue
};
