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
    console.error('Error al obtener tareas:', error.response?.data || error.message);
    throw error;
  }
};

async function reportIssue (req, res) {
  const { name, description, priority, tags } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Faltan campos obligatorios: name o description" });
  }

  const taskData = {
    name,
    description,
    tags: tags || [],
    priority: priority || 3 // valores de 1 (Urgente) a 4 (Baja)  
  };

  try {
    const response = await axios.post(
      `https://api.clickup.com/api/v2/list/${process.env.CLICKUP_LIST_ID}/task`,
      taskData,
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(201).json({
      message: "✅ Issue creado correctamente en ClickUp",
      task: response.data
    });
  } catch (error) {
    console.error("❌ Error al crear tarea en ClickUp:", error.response?.data || error.message);
    res.status(500).json({
      error: "No se pudo crear la tarea en ClickUp",
      details: error.response?.data || error.message
    });
  }
};

async function updateIssue (req, res) {
  try {
    const issueId = req.params.issueId;
    const updateFields = req.body;

    const response = await axios.put(
      `https://api.clickup.com/api/v2/task/${issueId}`,
      updateFields
    );
    console.log("✅ Tarea actualizada:", response.data);
    return res.json(response.data);
  } catch (error) {
    console.error("❌ Error al actualizar la tarea:", error.response?.data || error.message);
    throw new Error("No se pudo actualizar la tarea");
  }
};

export default {
	getIssues,
  reportIssue,
  updateIssue
};