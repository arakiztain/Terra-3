import userModel from "../models/user.js";
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

/* const createUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username) throw new UserNameNotProvided();
    if (!email) throw new UserEmailNotProvided();
    if (!password) throw new UserPasswordNotProvided();
    if (!role) throw new UserRoleNotProvided();
    if (role && !["client", "admin"].includes(role)) throw new UserRoleIncorrect();

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) throw new UserEmailAlreadyExists();
    const existingUsername = await userModel.findOne({ username });
    if (existingUsername) throw new UsernameAlreadyExists();


    const newUser = new userModel({ username, email, password, role });
    await newUser.save();

    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (error) {
      next(error);
  }
};
 */

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

const updateCurrentUser = async (req, res, next) => {
	const id = req.user._id;
	const data = req.body;
  
	try {
	  if (data.password && data.password.trim() !== "") {
		  data.password = await hash(data.password);
	  } else {
		  delete data.password;
	  }
  
	  const updatedUser = await userModel.findByIdAndUpdate(id, data, {
		  new: true,
		  runValidators: true,
	  }).select("-password");
  
	  if (!updatedUser) throw new UserNotFound();
  
	  res.json(updatedUser);
	} catch (error) {
	  next(error);
	}
  };

async function associateAccounts(email, project) {
  try{
    if(!email) throw new UserEmailNotProvided();
    if(!project) throw new ProjectNameNotProvided();
    const projectToAssign = await Project.findOne({name: project});
    if(!projectToAssign) throw new ProjectNotFound();

    let existingEmail = await userModel.findOne({ email });
    if(!existingEmail){
      existingEmail = await createUserWithEmail(email);
    }
    projectToAssign.users.push(existingEmail._id);
    await projectToAssign.save();
  } catch (error) {
    console.error(error);
  }
}

const createUserWithEmail = async ( email ) =>{
  const token = createActivationToken(email);
  const newUser = new userModel({
    email,
    isActive: false,
    activationToken: token,
  });
  console.log("This was the token generated");
  console.log(token);
  await newUser.save();
  const activationUrl = `${process.env.CLIENT_URL}/user/setpass/${token}`;
  await sendEmail(
    email,
    "Active your account in Terra Ripple",
    `<p>Click here to activate your account and set your password:</p>
    <a href="${activationUrl}">Terra Ripple</a>`
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
  updateCurrentUser,
  createUserWithEmail
};
