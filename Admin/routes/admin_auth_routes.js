import { Router } from "express";
import AdminAuthController from "../controllers/admin_auth_controller.js";
import AdminAuthMiddleware from "../middlewares/admin_auth_middleware.js";

 const adminRoute=Router();

 adminRoute.post("/signup",AdminAuthMiddleware.signupMiddleware,AdminAuthController.signUp);
 adminRoute.post("/login",AdminAuthMiddleware.loginMiddleware,AdminAuthController.login);
 adminRoute.post("/verify",AdminAuthMiddleware.verifyToken,AdminAuthMiddleware.verifyotp,AdminAuthController.verifyotp);

 export default adminRoute;