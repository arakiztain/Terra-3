import Project from "../models/project.js";
import User from "../models/user.js";
import axios from "axios";
import userController from "./userController.js";
import { NotFoundError, ForbiddenError, UserNotFound, ProjectAlreadyExists, ProjectNotFound, UsersAssigned} from "../utils/errors.js";

async function createProject(req, res, next) {
  try {
    const { title, description, url, email } = req.body;
    //TODO this email concatenation thing could be cleaner
    let foundUsers = [];

    if (email) {
      const emails = email.map(e => e.trim());
      const users = await User.find({ email: { $in: emails } });
/*       console.log("This is the email");
      console.log(email); */
      if (users.length !== emails.length) {
        const foundEmails = users.map(u => u.email);
        const notFoundEmails = emails.filter(e => !foundEmails.includes(e));
        const newUsers = await Promise.all(
          notFoundEmails.map(email => userController.createUserWithEmail(email))
        );
        users.push(...newUsers);
        // This should send emails to the unkown users in order to make accounts
        // throw new UserNotFound(`The following emails were not found: ${notFoundEmails.join(', ')}`);
      }
      foundUsers = users.map(u => u._id);
/*       console.log("These are the found users");
      console.log(foundUsers) */
    }
    const existingProject = await Project.findOne({ title });
    if (existingProject) throw new ProjectAlreadyExists();

    const responseWorkSpace = await axios.get('https://api.clickup.com/api/v2/team', {
      headers: {
        Authorization: process.env.CLICKUP_API_TOKEN,
      }
    });
    //Buscar workspace por nombre (?)
    const workspaceName = process.env.CLICKUP_WORKSPACE_NAME;
    const workSpaceId = responseWorkSpace.data.teams.find(team => team.name === workspaceName).id;
    console.log(workSpaceId);
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
    const clickupToken = process.env.CLICKUP_API_TOKEN;
    const workspaceName = process.env.CLICKUP_WORKSPACE_NAME;

    const responseWorkSpace = await axios.get('https://api.clickup.com/api/v2/team', {
      headers: { Authorization: clickupToken },
    });
    const workSpaceId = responseWorkSpace.data.teams.find(team => team.name === workspaceName).id;

    if (req.user.role === "admin") {
      const SpaceResponse = await axios.get(`https://api.clickup.com/api/v2/team/${workSpaceId}/space`, {
        headers: {
          Authorization: clickupToken,
          "Content-Type": "application/json",
        }
      });
      const spaces = SpaceResponse.data.spaces;

      projects = (
        await Promise.all(
          spaces.map(async (space) => {
            const mongoProject = await Project.findOne({ spaceId: space.id }).populate("users", "email");
            return mongoProject ? mongoProject : null;
          })
        )
      ).filter(Boolean);

    } else {
      const localProjects = await Project.find({ users: req.user._id }).populate("users", "email");
      if (!localProjects || localProjects.length === 0) throw new NotFoundError("You have no projects");

      projects = await Promise.all(
        localProjects.map(async (localProject) => {
          try {
            const clickupResponse = await axios.get(`https://api.clickup.com/api/v2/space/${localProject.spaceId}`, {
              headers: { Authorization: clickupToken },
            });
            return {
              ...localProject.toObject(),
              clickupData: clickupResponse.data,
            };
          } catch (err) {
            return {
              ...localProject.toObject(),
              clickupData: null,
            };
          }
        })
      );
    }

    res.json(projects);
  } catch (error) {
    next(error);
  }
}

//MongoDb en clikcup no hay manera de buscar por id el folder, es esto o sacar todos y buscar por id en el response.data
async function getProjectById(req, res, next) {
  try {
    const projectId = req.params.projectId.trim();

    const project = await Project.findById(projectId).populate("users", "email");
    if (!project) throw new ProjectNotFound();

    const isUserInProject = project.users.some(
      user => user._id.toString() === req.user._id.toString()
    );

/*     if (req.user.role !== "admin" && !isUserInProject) {
      throw new ForbiddenError("You don't have permission to access this project");
    }
 */
    res.json(project);
  } catch (error) {
    next(error);
  }
};

async function assignProject(req, res, next) {
  try {
    const projectId = req.params.projectId.trim();
    const { email } = req.body;

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

    const project = await Project.findById(projectId).populate("users", "email");
    if (!project) throw new ProjectNotFound();

    // Verificación de permisos
    const isUserInProject = project.users.some(
      user => user._id.toString() === req.user._id.toString()
    );

    const existingUserIds = project.users.map(u => u._id.toString());
    const newUserIds = foundUsers.map(id => id.toString());

    const usersToAdd = newUserIds.filter(id => !existingUserIds.includes(id));

    if (usersToAdd.length === 0) {
      throw new UsersAssigned();
    }

    project.users = [...existingUserIds, ...usersToAdd];
    await project.save();

    res.json(project);
  } catch (error) {
    next(error);
  }
}

async function deleteProject(req, res, next) {
  try {
    const projectId = req.params.projectId.trim();
    console.log(projectId);
    const project = await Project.findById(projectId);
    console.log(project.spaceId);
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
  assignProject,
  deleteProject
};
