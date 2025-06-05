import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import Issue from "../models/issue.js";

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
  const { name, description, priority, tags } = req.body; 
  if (!name || !description) {
    return res.status(400).json({ error: "Missing required fields: name or description" });
  }

  const taskData = {
    name,
    description,
    tags: tags || [],
    priority: priority || 3 // values from 1 (Urgent) to 4 (Low)
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
    if (!req.file) {
      return res.status(400).json({ error: "No se ha subido ninguna imagen" });
    }
    
    // Obtener el ID de la tarea de ClickUp directamente desde los parámetros
    const clickupTaskId = req.params.issueId || req.params.id;
    
    if (!clickupTaskId) {
      return res.status(400).json({ error: "ID de tarea de ClickUp no proporcionado" });
    }
    
    // Verificar si la tarea existe en ClickUp
    try {
      // Verificación opcional: comprobar si la tarea existe en ClickUp
      await axios.get(`https://api.clickup.com/api/v2/task/${clickupTaskId}`, {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN
        }
      });
      
      // Si llegamos aquí, la tarea existe en ClickUp
    } catch (verifyError) {
      console.error("Error verificando tarea en ClickUp:", verifyError.message);
      return res.status(404).json({ 
        error: "No se pudo verificar la tarea en ClickUp",
        details: verifyError.response?.data || verifyError.message
      });
    }
    
    // Subir la imagen a ClickUp
    const filePath = req.file.path;
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
      
      console.log("✅ Imagen subida a ClickUp:", clickupResponse.data);
      
      res.status(200).json({
        message: "Captura de pantalla subida correctamente a ClickUp",
        filename: req.file.filename,
        clickupAttachment: clickupResponse.data
      });
      
    } catch (clickupError) {
      console.error("Error al subir imagen a ClickUp:", clickupError.response?.data || clickupError.message);
      
      return res.status(500).json({
        error: "Error al subir imagen a ClickUp",
        details: clickupError.response?.data || clickupError.message
      });
    } finally {
      // Opcional: Si no quieres guardar la imagen localmente después de subirla a ClickUp,
      // puedes eliminarla del sistema de archivos
      if (fs.existsSync(req.file.path)) {
        fs.unlink(req.file.path, (err) => {
          if (err) console.error("Error eliminando archivo temporal:", err);
        });
      }
    }
    
  } catch (error) {
    console.error("Error general al subir captura de pantalla:", error);
    res.status(500).json({ error: "Error al subir captura de pantalla" });
  }
}

export default {
  getIssues,
  reportIssue,
  updateIssue,
  deleteIssue,
  uploadScreenshot
};
