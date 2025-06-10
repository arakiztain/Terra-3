import {Router} from "express";
import userController from "../controllers/userController.js";
import { isAdmin } from '../middlewares/isAdmin.js';
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = Router();

//router.put("/me",userController.updateCurrentUser);

router.get("/", /*isAdmin,*/ userController.getUsers);
router.get("/:id",isAdmin, userController.getUserById);
router.post("/", isLoggedInAPI, isAdmin, userController.createUser);
router.post("/setpass/:token",/* isAdmin, */ userController.activateUser);
router.put("/:id",isAdmin,userController.updateUser);
router.delete("/:id",isAdmin, userController.deleteUser);

export default router