import userModel from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  UserNameNotProvided,
  UserEmailNotProvided,
  UserPasswordNotProvided,
  EmailNotFound,
  IncorrectPassword,
  UserEmailAlreadyExists,
  UsernameAlreadyExists,
} from "../utils/errors.js";
import { sendEmail } from "../utils/sendEmail.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Vars and things");
    console.log(email, password);
    if (!email) throw new UserEmailNotProvided();
    if (!password) throw new UserPasswordNotProvided();
    
    const user = await userModel.findOne({ email });
    /* if (!user || !user.isActive || !user.password) {
    return res.status(401).json({ error: 'Usuario no activo o sin contraseña' });
    } */
    if (!user) throw new EmailNotFound();

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) throw new IncorrectPassword();

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { email, password, role} = req.body;

    if (!email) throw new UserEmailNotProvided();
    if (!password) throw new UserPasswordNotProvided();
    
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) throw new UserEmailAlreadyExists();

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new userModel({
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const userToReturn = newUser.toObject();
    delete userToReturn.password;

    res.status(201).json({
      message: "Usuario creado correctamente",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

async function getUserInfo(req, res, next) {
  try {
    console.log("requser");
    console.log(req.user);
    const id = req.user._id;
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        activationToken: user.activationToken,
      },
    });
  } catch (error) {
    next(error);
  }
}

export default {
  getUserInfo,
  login,
  register,
  sendEmail,
};
