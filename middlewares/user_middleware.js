import Joi from "joi";
import { BadRequest } from "../handlers/error_handler.js";
function loginMiddleware(req, res, next) {
  var joiSchema = Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().min(6).required(),
  });
  const { error, value } = joiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.details[0].message);
  } else {
    next();
  }
}
function signUpMiddleware(req, res, next) {
  var joiSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).optional(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileCode: Joi.string().required(),
    mobile: Joi.string().required(),
    password: Joi.string().min(6).required(),
    profile: Joi.string().required(),
    address: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
    gender: Joi.string().required(),
    referrer: Joi.string().allow("").allow(null).default(null),
  });

  const { error, value } = joiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.details[0].message);
  } else {
    next();
  }
}

export { signUpMiddleware, loginMiddleware };
