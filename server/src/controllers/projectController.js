import axios from "axios";
import projectModel from "../models/project.js";
import userModel from "../models/user.js";
import { NotFoundError, ForbiddenError, UserNotFound, ProjectAlreadyExists} from "../utils/errors.js";

//clickup
const createProject = async (req, res, next) => {
  try {
    const { title, description, url, email } = req.body;

    let foundUser = null;

    if (email) {
      const user = await userModel.findOne({ email });
      if (!user) throw new UserNotFound();
      foundUser = user;
    }

    const existingProject = await projectModel.findOne({ title });
    if (existingProject) throw new ProjectAlreadyExists();

    const responseFolder = await axios.post(
      `https://api.clickup.com/api/v2/space/${process.env.CLICKUP_SPACE_ID}/folder`,
      {
        name: title,
        content: description //No se muestra en clickup (solo internamente)
      },
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    const folderId = responseFolder.data.id;

    const listNames = ["Copy Revision", "Design Issues", "Requested Change", "New Item"];
    const createdLists = [];

    for (const name of listNames) {
      const responseList = await axios.post(
        `https://api.clickup.com/api/v2/folder/${folderId}/list`,
        { name },
        {
          headers: {
            Authorization: process.env.CLICKUP_API_TOKEN,
            "Content-Type": "application/json"
          }
        }
      );

      createdLists.push({
        name,
        listId: responseList.data.id
      });
    }

    const project = await projectModel.create({
      title,
      description,
      url,
      users: foundUser ? foundUser._id : undefined,
      folderId,
      clickupLists: createdLists
    });

    res.status(201).json({
      message: `Project created${foundUser ? '' : ' (without user)'}`,
      project,
      clickupProject: responseFolder.data
    });

  } catch (error) {
    next(error);
  }
};

//clickup
const getAllProjects = async (req, res, next) => {
  try {
    let projects = [];

    if (req.user.role === "admin") {
      const clickupResponse = await axios.get(
        `https://api.clickup.com/api/v2/space/${process.env.CLICKUP_SPACE_ID}/folder`,
        {
          headers: {
            Authorization: process.env.CLICKUP_API_TOKEN,
            "Content-Type": "application/json"
          }
        }
      );

      const folders = clickupResponse.data.folders;

      projects = await Promise.all(
        folders.map(async (folder) => {
          const mongoProject = await projectModel.findOne({ folderId: folder.id }).populate("users", "email");
          return {
            Projects: mongoProject || null
          };
        })
      );
    } else {
      projects = await projectModel.find({ user: req.user._id }).populate("users", "email");
      if (!projects || projects.length === 0) throw new NotFoundError("You have no projects");
    }

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

//MongoDb en clikcup no hay manera de buscar por id el folder, es esto o sacar todos y buscar por id en el response.data
const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;

    const project = await projectModel.findById(projectId).populate("users", "email");
    if (!project) throw new NotFoundError("Project not found");

    const isUserInProject = project.users.some(
      user => user._id.toString() === req.user._id.toString()
    );

    if (req.user.role !== "admin" && !isUserInProject) {
      throw new ForbiddenError("You don't have permission to access this project");
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};



//clickup
const updateProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const { title, description, url, user } = req.body;

    const updated = await projectModel.findByIdAndUpdate(
      projectId,
      { title, url, description, user },
      { new: true }
    );

    if (!updated) throw new NotFoundError("Project not found");

    await axios.put(`https://api.clickup.com/api/v2/folder/${updated.folderId}`, 
      { name: title, content: description }, 
      { headers: { Authorization: process.env.CLICKUP_API_TOKEN } }
    );

    res.json({ message: "Project updated", project: updated });
  } catch (error) {
    next(error);
  }
};

//clickup
const deleteProject = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;

    const deleted = await projectModel.findByIdAndDelete(projectId);
    if (!deleted) throw new NotFoundError("Project not found");

    await axios.delete(`https://api.clickup.com/api/v2/folder/${deleted.folderId}`, {
      headers: {
        Authorization: process.env.CLICKUP_API_TOKEN
      }
    });

    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
};
