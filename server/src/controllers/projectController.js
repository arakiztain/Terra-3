import Project from "../models/project.js";
import User from "../models/user.js";
import axios from "axios";
import userController from "./userController.js";
import { NotFoundError, ForbiddenError, UserNotFound, ProjectAlreadyExists, ProjectNotFound, UsersAssigned} from "../utils/errors.js";
import { sendEmail } from "../utils/sendEmail.js";

async function createProject(req, res, next) {
  try {
    const { title, description, url, email } = req.body;
    //TODO this email concatenation thing could be cleaner
    let foundUsers = [];

    if (email) {
      const emails = email.map(e => e.trim());
      const users = await User.find({ email: { $in: emails } });
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
        name: title
      },
      {
        headers: {
          Authorization: process.env.CLICKUP_API_TOKEN,
          "Content-Type": "application/json"
        }
      }
    );
    
    const spaceId = responseSpace.data.id;

    //Crear FolderId con los equipos de cada proyecto (space)
      const responseFolder = await axios.post(
        `https://api.clickup.com/api/v2/space/${spaceId}/folder_template/${process.env.CLICKUP_FOLDER_TEMPLATE_ID}`,
        { options: { return_immediately: false }, name: 'Ripple' }, // body payload only
        {
          headers: {
            Accept: 'application/json',
            Authorization: process.env.CLICKUP_API_TOKEN,
            'Content-Type': 'application/json'
          }
        }
      );

    const folderId = responseFolder.data.id;
    console.log("This is the folderId,", folderId);
    const responseList = await axios.get(
    `https://api.clickup.com/api/v2/folder/${folderId}/list`,
    {
      headers: {
        Authorization: process.env.CLICKUP_API_TOKEN,
        "Content-Type": "application/json"
      }
    }
    );

    const createdLists = responseList.data.lists.map(list => ({ listId: list.id, name: list.name }));
    console.log("createdLists", createdLists);
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

async function updateProject(req, res, next) {
  console.log("Reaches");
  try {
    const { id, description, url, email } = req.body;
    const project = await Project.findById(id);
    if (!project) throw new ProjectNotFound();

    const emails = (email || []).map(e => e.trim());
    const existingUsers = await User.find({ email: { $in: emails } });
    const existingUserEmails = existingUsers.map(u => u.email);

    const missingEmails = emails.filter(e => !existingUserEmails.includes(e));
    const newUsers = await Promise.all(
      missingEmails.map(email => userController.createUserWithEmail(email))
    );

    const allUsers = [...existingUsers, ...newUsers];
    const updatedUserIds = allUsers.map(u => u._id.toString());

    const currentUserIds = project.users.map(id => id.toString());
    const removedUserIds = currentUserIds.filter(id => !updatedUserIds.includes(id));
    const addedUserIds = updatedUserIds.filter(id => !currentUserIds.includes(id));

    project.description = description ?? project.description;
    project.url = url ?? project.url;
    project.users = updatedUserIds;

    await project.save();

    res.status(200).json({
      message: `Project updated. Users removed: ${removedUserIds.length}, users added: ${addedUserIds.length}`,
      project
    });
  } catch (error) {
    console.error("UpdateProject Error:", error.response?.data || error.message);
    next(error);
  }
}

async function getAllProjects(req, res, next) {
  try {
    let projects = [];

    const responseWorkSpace = await axios.get('https://api.clickup.com/api/v2/team', {
      headers: {
        Authorization: process.env.CLICKUP_API_TOKEN,
      }
    });
    //Change name ?
    const workspaceName = process.env.CLICKUP_WORKSPACE_NAME;
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

    projects = (
      await Promise.all(
        spaces.map(async (folder) => {
          const mongoProject = await Project.findOne({ spaceId: folder.id }).populate("users", "email");
          return mongoProject ? mongoProject : null;
        })
      )
    ).filter(Boolean);
    } else {
      projects = await Project.find({ users: req.user._id }).populate("users", "email");
      if (!projects || projects.length === 0) throw new NotFoundError("You have no projects");
      //clickup llamada id
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

export async function getTaskCount(req, res) {
  //TODO Coger solo las tasks que cuentan
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const listIds = project.clickupLists.map(list => list.listId);
    let totalTasks = 0;

    for (const listId of listIds) {
      const response = await axios.get(
        `https://api.clickup.com/api/v2/list/${listId}/task?include_closed=true`,
        {
          headers: { Authorization: process.env.CLICKUP_API_TOKEN }
        }
      );
      totalTasks += response.data.tasks.length;
    }

    res.json({ count: totalTasks });
  } catch (error) {
    console.error("Error in getTaskCount:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to retrieve task count" });
  }
}

async function sendReminderEmail(req, res, next) {
  try {
    const projectId = req.params.projectId.trim();

    const project = await Project.findById(projectId).populate("users", "email");
    if (!project) throw new ProjectNotFound();

    const emails = project.users.map(user => user.email).filter(Boolean);

    const htmlContent = (title) => `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Terra Ripple - Reminder</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #0F0F0F;
            color: #FFFFFF;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0F0F0F;
            border-radius: 8px;
            overflow: hidden;
            border: 1px solid #333333;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
          }
          .header {
            background-color: #0F0F0F;
            color: white;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #333333;
          }
          .logo {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 10px;
          }
          .logo img {
            height: 40px;
            margin: 0 5px;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
            color: #FFFFFF;
          }
          .content {
            padding: 30px 20px;
            line-height: 1.5;
            color: #FFFFFF;
          }
          .content p {
            color: #FFFFFF !important;
          }
          .footer {
            background-color: #151515;
            padding: 20px;
            text-align: center;
            color: #999999;
            font-size: 12px;
            border-top: 1px solid #333333;
          }
          .footer p {
            color: #999999 !important;
          }
          .icons {
            margin: 15px 0;
            text-align: center;
            display: flex;
            justify-content: center;
          }
          .icons img {
            height: 30px;
            margin: 0 5px;
          }
          h2 {
            color: #FFFFFF !important;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">
              <img src="https://i.imgur.com/KwCgOBD.png" alt="Logo 1">
              <img src="https://i.imgur.com/KoHaqQM.png" alt="Logo 2">
              <img src="https://i.imgur.com/VFP5Bse.png" alt="Logo 3">
              <h1>terra ripple</h1>
            </div>
          </div>
          <div class="content">
            <h2>Task Feedback Reminder</h2>
            <p>This is a reminder to check your tasks for the project <strong>${title}</strong>.</p>
            <p>Feedback is important for maintaining progress and collaboration within the team.</p>
            <p>Please log in to the platform to review and leave your input where needed.</p>
          </div>
          <div class="footer">
            <div class="icons">
              <img src="https://i.imgur.com/KwCgOBD.png" alt="Logo 1">
              <img src="https://i.imgur.com/KoHaqQM.png" alt="Logo 2">
              <img src="https://i.imgur.com/VFP5Bse.png" alt="Logo 3">
            </div>
            <p>© ${new Date().getFullYear()} Terra Ripple. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await Promise.all(
      emails.map(email =>
        sendEmail(
          email,
          "You have tasks pending for feedback!",
          htmlContent(project.title)
        )
      )
    );

    res.status(200).json({ message: `Reminders sent to ${emails.length} users.` });
  } catch (error) {
    next(error);
  }
}

export default {
  createProject,
  getAllProjects,
  getProjectById,
  deleteProject,
  updateProject,
  assignProject,
  getTaskCount,
  sendReminderEmail
};
