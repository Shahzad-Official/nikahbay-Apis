import Joi from "joi";
import { BadRequest } from "../handlers/error_handler.js";
import { application } from "express";

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

function verifyToken(req, res, next) {
  const header = req.headers.authorization;

  if (header == null) {
    throw new BadRequest("Auth token is required!");
  } else {
    const token = header.split("Bearer ")[1];
    req.tokenVal = token;
    next();
  }
}

function verifyMiddleware(req, res, next) {
  var joiSchema = Joi.object({
    otp: Joi.string().min(5).required(),
  });
  const { error, value } = joiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.details[0].message);
  } else {
    next();
  }
}

function sendOtpMiddleware(req, res, next) {
  var joiSchema = Joi.object({
    email: Joi.string().email().required(),
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
function updateProfileMiddleware(req, res, next) {
  var joiSchema = Joi.object({
    height:Joi.object({
      feet: Joi.number().optional(),
      inches: Joi.number().optional(),
    }),
    age: Joi.number().optional(),
    weight: Joi.number().optional(),
    bio: Joi.string().optional(),
    dob: Joi.date().optional(),
    status: Joi.string().optional(),
    education: Joi.string().optional(),
    religion: Joi.string().optional(),
    languages: Joi.array().optional(),
    profession: Joi.string().optional(),
    income: Joi.string().optional(),
  });
  const { error, value } = joiSchema.validate(req.body);
  if (error) {
    throw new BadRequest(error.details[0].message);
  } else {
    next();
  }
}

export {
  signUpMiddleware,
  loginMiddleware,
  verifyMiddleware,
  sendOtpMiddleware,
  verifyToken,
  updateProfileMiddleware,
};
