import {Router} from "express";
import userController from "../controllers/userController.js";
import { isAdmin } from '../middlewares/isAdmin.js';

const router = Router();

router.put("/me",userController.updateCurrentUser);

router.get("/",/* isAdmin, */userController.getUsers);
router.get("/:id",isAdmin, userController.getUserById);
router.post("/",/* isAdmin, */ userController.createUser);
router.post("/activate/:token",/* isAdmin, */ userController.activateUser);
router.put("/:id",isAdmin,userController.updateUser);
router.delete("/:id",isAdmin, userController.deleteUser);

export default router