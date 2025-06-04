import Project from "../models/project.js";
import User from "../models/user.js";
import axios from "axios";
import { NotFoundError, ForbiddenError, UserNotFound, ProjectAlreadyExists} from "../utils/errors.js";

//clickup
const createProject = async (req, res, next) => {
  try {
    const { title, description, url, email } = req.body;

    let foundUsers = [];
    if (email) {
      const emails = email.map(e => e.trim());
      const users = await User.find({ email: { $in: emails } });
      console.log("These are the emails", emails);
      console.log("These are the users", users);
      if (users.length !== emails.length) {
        const foundEmails = users.map(u => u.email);
        const notFoundEmails = emails.filter(e => !foundEmails.includes(e));
        throw new UserNotFound(`The following emails were not found: ${notFoundEmails.join(', ')}`);
      }

      foundUsers = users.map(u => u._id);
    }

    const existingProject = await Project.findOne({ title });
    if (existingProject) throw new ProjectAlreadyExists();

    const responseFolder = await axios.post(
      `https://api.clickup.com/api/v2/space/${process.env.CLICKUP_SPACE_ID}/folder`,
      {
        name: title,
        content: description
      },
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );

    const folderId = responseFolder.data.id;

    const listNames = ["copy revision", "design issues", "requested change", "new item"];
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

    const project = await Project.create({
      title,
      description,
      url,
      users: foundUsers.length > 0 ? foundUsers : undefined,
      folderId,
      clickupLists: createdLists
    });

    res.status(201).json({
      message: `Project created${foundUsers.length > 0 ? '' : ' (without users)'}`,
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
          return await Project.findOne({ folderId: folder.id }).populate("users", "email");
        })
      );
    } else {
      projects = await Project.find({ user: req.user._id }).populate("users", "email");
      if (!projects || projects.length === 0) throw new NotFoundError("You have no projects");
      //clickup llamada id
    }

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

//MongoDb en clikcup no hay manera de buscar por id el folder, es esto o sacar todos y buscar por id en el response.data
const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.projectId.trim();

    const project = await Project.findById(projectId).populate("users", "email");
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
    const projectId = req.params.projectId.trim();
    const { title, description, url, user } = req.body;

    const updated = await Project.findByIdAndUpdate(
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
    const projectId = req.params.projectId.trim();

    const deleted = await Project.findByIdAndDelete(projectId);
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
