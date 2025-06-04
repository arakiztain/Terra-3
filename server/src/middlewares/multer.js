import multer from "multer";
import path from "path";
import fs from "fs";
import Project from "../models/project.js";
import Issue from "../models/issue.js";

// Middleware para obtener el projectName sincrónicamente para multer
export async function prepareProjectName(req, res, next) {
  try {
    const issueId = req.params.issueId || req.params.id;
    let projectName = "unknown";

    if (issueId) {
      const issue = await Issue.findById(issueId);
      if (!issue) return res.status(404).json({ error: "Issue no encontrado" });
      
      // Corrige esta línea para usar el campo correcto que relaciona issue con project
      const project = await Project.findById(issue.projectId); // Cambia issue.user por issue.projectId
      if (!project) return res.status(404).json({ error: "Proyecto no encontrado" });
      
      projectName = project.title.replace(/\s+/g, "_").toLowerCase();

      // Eliminar captura de pantalla previa si existe
      if (issue.screenshot) {
        const oldImagePath = path.join("public/images/issues", issue.screenshot);
        if (fs.existsSync(oldImagePath)) {
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Error eliminando imagen anterior:", err);
          });
        }
      }
    } else {
      return res.status(400).json({ error: "IssueId no proporcionado" });
    }

    req.projectName = projectName;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error interno preparando datos para imagen" });
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
