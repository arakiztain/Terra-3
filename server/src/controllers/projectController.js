import axios from "axios";
import projectModel from "../models/project.js";
import userModel from "../models/user.js";
import { NotFoundError, ForbiddenError, UserNotFound, ProjectAlreadyExists} from "../utils/errors.js";

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
      { name: title },
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

const getAllProjects = async (req, res, next) => {
  try {
    let projects;

    if (req.user.role === "admin") {

      projects = await projectModel.find().populate("user", "email role");
    } else {
      projects = await projectModel.find({ user: req.user._id }).populate("user", "email")

    }

    res.json(projects);
  } catch (error) {
    next(error);
  }
};


const getProjectById = async (req, res, next) => {
  try {
    const project = await projectModel.findById(req.params.id).populate("user", "email");
    if (!project) throw new NotFoundError("Project not found");


    if (req.user.role !== "admin" && project.user._id.toString() !== req.user._id) {
      throw new ForbiddenError("No tienes permiso para ver este proyecto");
    }

    res.json(project);
  } catch (error) {
    next(error);
  }
};


const updateProject = async (req, res, next) => {
  try {

    const { title, description, user } = req.body;
    const updated = await projectModel.findByIdAndUpdate(

      req.params.id,
      { title, url, description, user },
      { new: true }
    );
    if (!updated) throw new NotFoundError("Project not found");
    res.json({ message: "Project not updated", project: updated });
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const deleted = await projectModel.findByIdAndDelete(req.params.id);
    if (!deleted) throw new NotFoundError("Project not found");
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
