import userModel from "../models/user.js";
import projectModel from "../models/project.js";
import mongoose from "mongoose";
import { paginateQuery } from "../utils/paginate.js";
import { hash } from "../utils/bcrypt.js";
import {
  UserEmailNotProvided,
  UserEmailAlreadyExists,
  NoUsersFound,
  InvalidUserId,
  UserNotFound,
} from "../utils/errors.js";
import bcrypt from "bcrypt";
import { createActivationToken, verifyToken } from "../utils/token.js";
import { sendEmail } from "../utils/sendEmail.js";
import { validateActivation } from "../utils/validators.js";

const getUsers = async (req, res, next) => {
  try {
    const data = await paginateQuery(userModel, {}, {
      page: req.query.page,
      limit: req.query.limit,
      select: "-password",
      sort: { createdAt: -1 },
    });

    !data.results.length && (() => { throw new NoUsersFound(); })();


    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new InvalidUserId());
  }

  try {
    const user = await userModel.findById(id).select("-password");

    if (!user) {
      throw new UserNotFound();
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
};

async function createUser (req, res, next) {
  const { email } = req.body;
  try {
    if (!req.body || !email) throw new UserEmailNotProvided();

    const existingUser = await userModel.findOne({ email });
    if (existingUser) throw new UserEmailAlreadyExists();

    await createUserWithEmail(email);

    res.status(201).json({ message: "User created and activation email sent" });
  } catch (err) {
    next(err);
  }
};

export const activateUser = async (req, res, next) => {
  const token = req.params.token;
  const { password } = req.body;
  try {
    const { email } = verifyToken(token);

    const user = await userModel.findOne({ email });


    validateActivation(user, token, password);

    if (user.activationToken !== token) {
      return res.status(400).json({ error: "Token inválido" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.isActive = true;
    user.activationToken = undefined;

    await user.save();

    res.json({ message: "Account successfully activated" });
  } catch (error) {
    next(error);
  }
};


const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new InvalidUserId());
  }

  try {
	if (data.password) {
		data.password = await hash(data.password);
	}
	
    const updatedUser = await userModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      throw new UserNotFound();
    }

    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};


const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new InvalidUserId());
  }

  try {
    const deletedUser = await userModel.findByIdAndDelete(id).select("-password");

    if (!deletedUser) {
      throw new UserNotFound();
    }

    res.json({ message: "User succesfully deleted", user: deletedUser });
  } catch (error) {
    next(error);
  }
};

async function associateAccounts(email, projectName) {
  try {
    if (!email) throw new UserEmailNotProvided();
    if (!projectName) throw new ProjectNameNotProvided();

    const projectToAssign = await projectModel.findOne({ name: projectName }).populate("users", "_id email");
    if (!projectToAssign) throw new ProjectNotFound();

    let user = await userModel.findOne({ email });
    if (!user) {
      user = await createUserWithEmail(email);
    }

    const existingUserIds = projectToAssign.users.map(u => u._id.toString());
    if (existingUserIds.includes(user._id.toString())) {
      throw new UsersAssigned(`User with email ${email} is already assigned to the project`);
    }

    projectToAssign.users.push(user._id);
    await projectToAssign.save();

  } catch (error) {
    console.error(error);
    throw error;
  }
}

const createUserWithEmail = async (email) => {
  const token = createActivationToken(email);
  const newUser = new userModel({
    email,
    isActive: false,
    activationToken: token,
  });

  await newUser.save();
  const activationUrl = `${process.env.CLIENT_URL}/user/setpass/${token}`;  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Terra Ripple - Activate your account</title>
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
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 700;
          color: #FFFFFF;
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
        .content {
          padding: 30px 20px;
          line-height: 1.5;
          color: #FFFFFF;
        }
        .content p {
          color: #FFFFFF !important;
        }
        .button-container {
          text-align: center;
          margin: 30px 0;
        }
        .button {
          display: inline-block;
          background-color: #7CE55E;
          color: #0F0F0F !important;
          text-decoration: none;
          padding: 14px 24px;
          border-radius: 25px;
          font-weight: bold;
          border: none;
          font-size: 16px;
          transition: background-color 0.3s;
        }
        .button:hover {
          background-color: #65CC47;
          color: #0F0F0F !important;
        }
        .button:visited {
          color: #0F0F0F !important;
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
        a {
          color: #7CE55E !important;
          text-decoration: underline;
        }
        a:hover {
          color: #65CC47 !important;
        }
        a:visited {
          color: #7CE55E !important;
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
            <img src="https://i.imgur.com/KwCgOBD.png" alt="Logo 1" style="height: 40px;">
            <img src="https://i.imgur.com/KoHaqQM.png" alt="Logo 2" style="height: 40px;">
            <img src="https://i.imgur.com/VFP5Bse.png" alt="Logo 3" style="height: 40px;">
            <h1 style="color: #FFFFFF;">terra ripple</h1>
          </div>
        </div>
        
        <div class="content">
          <h2 style="color: #FFFFFF;">Welcome to Terra Ripple!</h2>
          <p style="color: #FFFFFF;">You've been invited to join the Terra Ripple platform.</p>
          <p style="color: #FFFFFF;">To activate your account and set your password, please click the button below:</p>
          
          <div class="button-container">
            <a href="${activationUrl}" class="button" style="color: #0F0F0F !important;">Activate Account</a>
          </div>
          
          <p style="color: #FFFFFF;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #FFFFFF;"><a href="${activationUrl}" style="color: #7CE55E !important;">${activationUrl}</a></p>
          
          <p style="color: #FFFFFF;">This link will expire in 24 hours.</p>
          
          <p style="color: #FFFFFF;">Thank you,<br>The Terra Ripple Team</p>
        </div>
        
        <div class="footer">
          <div class="icons">
            <img src="https://i.imgur.com/KwCgOBD.png" alt="Logo 1" style="height: 40px;">
            <img src="https://i.imgur.com/KoHaqQM.png" alt="Logo 2" style="height: 40px;">
            <img src="https://i.imgur.com/VFP5Bse.png" alt="Logo 3" style="height: 40px;">
          </div>
          <p style="color: #999999;">© ${new Date().getFullYear()} Terra Ripple. All rights reserved.</p>
          <p style="color: #999999;">If you didn't request this email, please ignore it.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await sendEmail(
    email,
    "Activate your account in Terra Ripple",
    htmlContent
  );
  
  return newUser;
}

export default {
  getUsers,
  getUserById,
  createUser,
  activateUser,
  updateUser,
  deleteUser,
  associateAccounts,
  createUserWithEmail
};
