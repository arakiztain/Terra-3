import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const reportIssue = async (req, res) => {
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
