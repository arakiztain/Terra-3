import Project from "../models/project.js";
import User from "../models/user.js";
import axios from "axios";
import { NotFoundError, ForbiddenError, UserNotFound, ProjectAlreadyExists, ProjectNotFound} from "../utils/errors.js";

async function createProject(req, res, next) {
  try {
    console.log("HEADERS:", req.headers);
    console.log("BODY:", req.body);
    const { title, description, url, email} = req.body;

    let foundUsers = [];
    if (email) {
      const emails = email.map(e => e.trim());
      const users = await User.find({ email: { $in: emails } });

      if (users.length !== emails.length) {
        const foundEmails = users.map(u => u.email);
        const notFoundEmails = emails.filter(e => !foundEmails.includes(e));
        throw new UserNotFound(`The following emails were not found: ${notFoundEmails.join(', ')}`);
      }

      foundUsers = users.map(u => u._id);
    }

    const existingProject = await Project.findOne({ title });
    if (existingProject) throw new ProjectAlreadyExists();

    const responseWorkSpace = await axios.get('https://api.clickup.com/api/v2/team', {
      headers: {
        Authorization: process.env.CLICKUP_API_TOKEN,
      }
    });
    //Buscar workspace por nombre (?)
    const workspaceName = "Terra Ripple's Workspace";
    const workSpaceId = responseWorkSpace.data.teams.find(team => team.name === workspaceName).id;

    //CreateSpace (project)
    
    const responseSpace = await axios.post(
    `https://api.clickup.com/api/v2/team/${workSpaceId}/space`,
    {
      name: title/* ,
      content: description */
    },
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );
    
    const spaceId = responseSpace.data.id;

    const listNames = ["copy revision", "design issues", "requested change", "new item"];
    const createdLists = [];

    //Crear FolderId con los equipos de cada proyecto (space)
    const responseFolder = await axios.post(
    `https://api.clickup.com/api/v2/space/${spaceId}/folder`,
    {
      //name : folderName (equipo)
      name: "Folder prueba"
    },
    {
      headers: {
        Authorization: process.env.CLICKUP_API_TOKEN,
        "Content-Type": "application/json"
      }
    }
  );

    const folderId = responseFolder.data.id;
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
      spaceId,
      clickupLists: createdLists
    });

    res.status(201).json({
      message: `Project created${foundUsers.length > 0 ? '' : ' (without users)'}`,
      project,
      clickupProject: responseFolder.data
    });

  } catch (error) {
      console.error("ClickUp Error:", error.response?.data || error.message);
  next(error);
  }
};

async function getAllProjects(req, res, next) {
  try {
    let projects = [];

    const responseWorkSpace = await axios.get('https://api.clickup.com/api/v2/team', {
      headers: {
        Authorization: process.env.CLICKUP_API_TOKEN,
      }
    });

    const workspaceName = "Terra Ripple's Workspace";
    const workSpaceId = responseWorkSpace.data.teams.find(team => team.name === workspaceName).id;

    if (req.user.role === "admin") {
      const SpaceResponse = await axios.get(
      `https://api.clickup.com/api/v2/team/${workSpaceId}/space`,
          {
            headers: {
              Authorization: process.env.CLICKUP_API_TOKEN,
              "Content-Type": "application/json"
            }
          }
        );

        const spaces = SpaceResponse.data.spaces;

      projects = await Promise.all(
        spaces.map(async (folder) => {
          const mongoProject = await Project.findOne({ spaceId: folder.id }).populate("users", "email");
          return {
            mongoProject: mongoProject || null,
            clickupFolder: folder
          };
        })
      );
    } else {
      const userProjects = await Project.find({ users: req.user._id }).populate("users", "email");

      if (!userProjects || userProjects.length === 0) {
        throw new NotFoundError("You have no projects");
      }

      projects = await Promise.all(
        userProjects.map(async (project) => {
          const clickupFolderResponse = await axios.get(
            `https://api.clickup.com/api/v2/folder/${project.folderId}`,
            {
              headers: {
                Authorization: process.env.CLICKUP_API_TOKEN,
                "Content-Type": "application/json"
              }
            }
          );

          return {
            mongoProject: project,
            clickupFolder: clickupFolderResponse.data
          };
        })
      );
    }

    res.json(projects);
  } catch (error) {
    next(error);
  }
};

//MongoDb en clikcup no hay manera de buscar por id el folder, es esto o sacar todos y buscar por id en el response.data
async function getProjectById(req, res, next) {
  try {
    const projectId = req.params.projectId.trim();

    const project = await Project.findById(projectId).populate("users", "email");
    if (!project) throw new ProjectNotFound();

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

async function deleteProject(req, res, next) {
  try {
    const projectId = req.params.projectId.trim();

    const project = await Project.findById(projectId);

    if (!project) throw new ProjectNotFound();

    await axios.delete(`https://api.clickup.com/api/v2/space/${project.spaceId}`, {
      headers: {
        Authorization: process.env.CLICKUP_API_TOKEN
      }
    });

    await Project.findByIdAndDelete(projectId);

    res.json({ message: "Project deleted" });
  } catch (error) {
    next(error);
  }
};

export default {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject
};
