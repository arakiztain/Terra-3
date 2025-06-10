import userModel from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  UserEmailNotProvided,
  UserPasswordNotProvided,
  EmailNotFound,
  TokenNotFound,
  IncorrectPassword,
  UserEmailAlreadyExists
} from "../utils/errors.js";
import { sendEmail } from "../utils/sendEmail.js";
import { validateLogin, validateLoginFields, validateRegisterFields } from "../utils/validators.js";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    validateLoginFields(email, password);

    const user = await userModel.findOne({ email });

    validateLogin(user, user.isActive, user.password);

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) throw new IncorrectPassword();

    const token = jwt.sign(
      { _id: user._id, role: user.role },
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
    const { email, password/* , role */ } = req.body;

    validateRegisterFields(email, password);

    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) throw new UserEmailAlreadyExists();

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new userModel({
      email,
      password: hashedPassword/* ,
      role */
    });

    await newUser.save();

    const token = jwt.sign(
      { _id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      message: "User created",
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
    console.log("This is the id", id);
    const user = await userModel.findById(id).select("-password");
    console.log("user", user);
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

const resetPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) throw new EmailNotFound();
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.activationToken = token;
    await user.save();
    const resetUrl = `${process.env.CLIENT_URL}/passwordReset/${token}`;
    await sendEmail(
      email,
      "Terra Ripple password reset",
      `<p>Click here to reset your password:</p>
      <a href="${resetUrl}">Terra Ripple</a>`
      );

    res.json({ message: "Email sent" });
  } catch (error) {
    next(error);
  }
}

/* const setPassword = async (req, res, next) => {
  const { token, password } = req.body;
  console.log("This the token", token);
  console.log("This the last character", token[token.length - 1]);
  try {
    const user = await userModel.findOne({ activationToken:token });
    if (!user) throw new TokenNotFound();
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;
    user.activationToken = undefined;
    await user.save();
    res.json({ message: "Password set" });
  } catch (error) {
    next(error);
  }
}
 */
const createUserWithEmail = async ( email ) =>{
  const token = createActivationToken(email);
  const newUser = new userModel({
    email,
    isActive: false,
    activationToken: token,
  });
  await newUser.save();
  const activationUrl = `http://localhost:${process.env.APP_PORT}/activate/${token}`;
  await sendEmail(
    email,
    "Activa tu cuenta en Terra Ripple",
    `<p>Haz clic aquí para activar tu cuenta y establecer tu contraseña:</p>
    <a href="${activationUrl}">Terra Ripple</a>`
  );
}


export default {
	getUserInfo,
	login,
	register,
  sendEmail,
  resetPassword/* ,
  setPassword */
};
