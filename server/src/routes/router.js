import { Router } from "express";
import { isLoggedInAPI } from "../middlewares/authMiddleware.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import issueRouter from "./issueRouter.js";
const router = Router();

router.get("/",(req,res)=>{
    res.send("hola terra")
})

router.use("/", authRouter);
router.use("/user", /* isLoggedInAPI, */ userRouter);
router.use("/issue", isLoggedInAPI, issueRouter);


export default router