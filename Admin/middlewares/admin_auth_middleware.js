import Joi from "joi";
import { BadRequest } from "../../handlers/error_handler.js";
import jsonwebtoken from "jsonwebtoken";
import TokenSetting, { tokenMap } from "../../utils/refresh_token.js";

class AdminAuthMiddleware {
  static signupMiddleware(req, res, next) {
    const joiSchema = Joi.object({
      profile: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.details[0].message);
    } else {
      next();
    }
  }
  static verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (token == null || token == "") {
      throw new BadRequest("Auth Token is required.");
    } else if (!token.includes("Bearer")) {
      throw new BadRequest("Enter valid Auth Token.");
    } else {
      const newToken = token.split("Bearer ")[1];
      const decodedData = jsonwebtoken.decode(newToken).doc;
      
      if (tokenMap.get(decodedData.email) == null) {
        TokenSetting.saveToken(decodedData.email, newToken);
      }
      console.log(tokenMap);
      if (TokenSetting.getToken(decodedData.email) !== newToken) {
        throw new BadRequest("Auth Token has been expired");
      } else {
        req.authToken = newToken;
        next();
      }
    }
  }
  static loginMiddleware(req, res, next) {
    const joiSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.details[0].message);
    } else {
      next();
    }
  }
  static verifyotp(req, res, next) {
    const joiSchema = Joi.object({
      otp: Joi.string().min(5).required(),
    });
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.details[0].message);
    } else {
      next();
    }
  }
}

export default AdminAuthMiddleware;
