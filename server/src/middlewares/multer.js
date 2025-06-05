import multer from "multer";
import path from "path";
import fs from "fs";
import axios from "axios";
import Project from "../models/project.js";
import Issue from "../models/issue.js";

// Middleware simplificado que no depende de MongoDB
export async function prepareProjectName(req, res, next) {
  try {
    const taskId = req.params.issueId || req.params.id;
    
    if (!taskId) {
      return res.status(400).json({ error: "ID de tarea no proporcionado" });
    }
    
    // Obtener información de la tarea directamente de ClickUp
    try {
      const response = await axios.get(`https://api.clickup.com/api/v2/task/${taskId}`, {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN
        }
      });
      
      // Extraer el nombre del proyecto/lista de ClickUp
      const taskData = response.data;
      let projectName = "clickup_task";
      
      // Si la tarea tiene información sobre su lista o carpeta, usarla para el nombre
      if (taskData.list && taskData.list.name) {
        projectName = taskData.list.name.replace(/\s+/g, "_").toLowerCase();
      } else if (taskData.folder && taskData.folder.name) {
        projectName = taskData.folder.name.replace(/\s+/g, "_").toLowerCase();
      }
      
      req.projectName = projectName;
      next();
      
    } catch (clickupError) {
      // Si no se puede obtener la información de la tarea, usar un nombre genérico
      console.error("Error obteniendo información de la tarea:", clickupError.message);
      req.projectName = `task_${taskId}`;
      next();
    }
    
  } catch (error) {
    console.error("Error en prepareProjectName:", error);
    req.projectName = "unknown_task";
    next(); // Continúa de todos modos con un nombre genérico
  }
}

// Configuración Multer para capturas de pantalla de issues
const issueStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Crear directorio si no existe
    const dir = "public/images/issues";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const userId = req.user ? String(req.user._id).slice(0, 5) : "anon";
    const projectName = req.projectName || "unknown";
  
    const now = new Date();
    const shortYear = String(now.getFullYear()).slice(2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
    const extension = path.extname(file.originalname);
  
    const formattedDate = `${shortYear}${month}${day}${time}`;
  
    cb(null, `${userId}-${projectName}-${formattedDate}${extension}`);
  }
});

// Configuración Multer para imágenes de proyectos
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Crear directorio si no existe
    const dir = "public/images/projects";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const userId = req.user ? String(req.user._id).slice(0, 5) : "anon";
    const now = new Date();
    const shortYear = String(now.getFullYear()).slice(2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const day = ("0" + now.getDate()).slice(-2);
    const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
    const extension = path.extname(file.originalname);
    const formattedDate = `${shortYear}${month}${day}${time}`;
    cb(null, `${userId}-project-${formattedDate}${extension}`);
  }
});

// Función para filtrar por tipo de archivo
const fileFilter = (req, file, cb) => {
  // Aceptar solo imágenes
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos de imagen'), false);
  }
};

export const uploadIssueScreenshot = multer({ 
  storage: issueStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limitar a 5MB
  }
});

export const uploadProjectImage = multer({ 
  storage: projectStorage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limitar a 5MB
  }
});
