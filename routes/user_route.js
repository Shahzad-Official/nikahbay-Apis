import { Router } from "express";
import UserController from "../controllers/user_controller.js";
import { loginMiddleware, sendOtpMiddleware, signUpMiddleware, verifyMiddleware, verifyToken } from "../middlewares/user_middleware.js";

const userRouter= Router();
userRouter.post("/sign-up",signUpMiddleware,UserController.signUp);
userRouter.post("/login",loginMiddleware,UserController.login);
userRouter.post("/verify",verifyMiddleware,verifyToken,UserController.verifyOtp);
userRouter.post("/send-otp",sendOtpMiddleware,UserController.sendOtp);

export default userRouter;