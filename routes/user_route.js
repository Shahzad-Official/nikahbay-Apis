import { Router } from "express";
import UserController from "../controllers/user_controller.js";
import { loginMiddleware, signUpMiddleware } from "../middlewares/user_middleware.js";

const router= Router();
router.post("/sign-up",signUpMiddleware,UserController.signUp);
router.post("/login",loginMiddleware,UserController.login);

export default router;