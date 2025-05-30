import userModel from "../models/user.js";
import mongoose from "mongoose";
import { paginateQuery } from "../utils/paginate.js";
import { hash } from "../utils/bcrypt.js";
import {
  UserNameNotProvided,
  UserEmailNotProvided,
  UserPasswordNotProvided,
  UserRoleNotProvided,
  UserRoleIncorrect,
  UserEmailAlreadyExists,
  UsernameAlreadyExists,
  NoUsersFound,
  InvalidUserId,
  UserNotFound
} from "../utils/errors.js";
import bcrypt from "bcrypt";
import {
  createActivationToken,
  verifyToken
} from "../utils/token.js";
import { sendEmail } from "../utils/sendEmail.js";

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

export const createUser = async (req, res) => {
  const { email } = req.body;

  try {
    // Comprobamos si el usuario ya existe
    const existingUser = await userModel.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "El usuario ya existe" });

    // Generamos token de activación
    const token = createActivationToken(email);

    // Creamos el usuario (sin contraseña aún)
    const newUser = new userModel({
      email,
      isActive: false,
      activationToken: token,
    });
    await newUser.save();

    // Enviamos correo con enlace correcto (usando ruta con params)
    const activationUrl = `http://localhost:3004/activate/${token}`;
    await sendEmail(
      email,
      "Activa tu cuenta en Txuletak",
      `<p>Haz clic aquí para activar tu cuenta y establecer tu contraseña:</p>
       <a href="${activationUrl}">${activationUrl}</a>`
    );

    res.status(201).json({ message: "Usuario creado y correo enviado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};

export const activateUser = async (req, res) => {
  const token = req.params.token;
  console.log("Token recibido:", token);
  const { password } = req.body;

  try {
    const { email } = verifyToken(token);
    console.log("Email del token:", email);

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    if (user.activationToken !== token) {
      console.log("Token en DB:", user.activationToken);
      return res.status(400).json({ error: "Token inválido" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.isActive = true;
    user.activationToken = undefined;

    await user.save();

    res.json({ message: "Cuenta activada con éxito" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Token inválido o expirado" });
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

    res.json({ message: "Usuario eliminado correctamente", user: deletedUser });
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

export default {
  getUsers,
  getUserById,
  createUser,
  activateUser,
  updateUser,
  deleteUser,
  updateCurrentUser
};
