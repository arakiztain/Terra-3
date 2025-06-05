import {Router} from "express";
import authController from "../controllers/authController.js";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/login",authController.login);
router.post("/register",authController.register);
//router.get("/logout",isLoggedInAPI,authController.logout);
router.get("/user-info", isLoggedInAPI, authController.getUserInfo);
router.post('/test-email', authController.sendEmail);

export default router