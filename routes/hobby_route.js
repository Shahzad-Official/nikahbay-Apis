import { Router } from "express";
import { verifyToken } from "../middlewares/user_middleware.js";
import { hobbyMiddleware } from "../middlewares/hobby_middleware.js";
import HobbyController from "../controllers/hobby_controller.js";

const hobbyRouter =Router();

hobbyRouter.post("/",verifyToken,hobbyMiddleware,HobbyController.addHobby);
hobbyRouter.get("/",verifyToken,HobbyController.getHobbies);

export default hobbyRouter;