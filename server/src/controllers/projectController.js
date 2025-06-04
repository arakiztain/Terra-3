import Project from "../models/project.js";
import User from "../models/user.js";
import { NotFoundError, ForbiddenError } from "../utils/errors.js";

//TODO : check if user is admin
const createProject = async (req, res, next) => {
  try {
    const { title, url, description, users } = req.body;
    
    const userDocs = await User.find({ email: { $in: users } });
    const userIds = userDocs.map(user => user._id);
    const project = await Project.create({ title, url, description, users: userIds });

    res.status(201).json({ message: "Project created", project });
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    req = {
      user: {
        email: "test@mail.com",
        role: "admin"
      }
    }
  }
  try {
    let projects;

    if (req.user.role === "admin") {
      projects = await Project.find().populate("users", "email role");
    } else {
      projects = await Project.find({ user: req.user._id }).populate("users", "email");
    }

    res.json(projects);
  } catch (error) {
    next(error);
  }
};


const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id).populate("user", "email");
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
    const { title, url, description, user } = req.body;
    const updated = await Project.findByIdAndUpdate(
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
    const deleted = await Project.findByIdAndDelete(req.params.id);
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
