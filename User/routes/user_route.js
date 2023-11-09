import { Router } from "express";
import UserController from "../controllers/user_controller.js";
import { loginMiddleware, sendOtpMiddleware, signUpMiddleware, updateProfileMiddleware, verifyMiddleware, verifyToken } from "../middlewares/user_middleware.js";

const userRouter= Router();
userRouter.post("/sign-up",signUpMiddleware,UserController.signUp);
userRouter.post("/login",loginMiddleware,UserController.login);
userRouter.post("/verify",verifyMiddleware,verifyToken,UserController.verifyOtp);
userRouter.post("/send-otp",sendOtpMiddleware,UserController.sendOtp);
userRouter.post("/update",verifyToken,updateProfileMiddleware,UserController.updateProfile);

export default userRouter;