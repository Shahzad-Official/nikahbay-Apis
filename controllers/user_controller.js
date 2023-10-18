import {
  AuthenticationError,
  BadRequest,
  NotFoundError,
} from "../handlers/error_handler.js";
import User from "../models/user_model.js";
import bcrypt from "bcrypt";
import fs from "fs";
import { generateShortCode, saveBase64Image } from "../utils/app_functions.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import env from "dotenv";
env.config();

export default class UserController {
  static async login(req, res, next) {
    const { userName, password } = req.body;
    try {
      var user = await User.findOne({
        $or: [{ email: userName }, { userName: userName }],
      });
      if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          const token = jwt.sign(JSON.stringify(user), process.env.JWT_SECRET);
          res.json({
            success: true,
            message: "User logged in successfully!",
            data: user,
            token:token,
          });
        } else {
          throw new BadRequest("Check your entered password");
        }
      } else {
        throw new NotFoundError("User not found");
      }
    } catch (err) {
      next(err);
    }
  }

  static async signUp(req, res, next) {
    const {
      firstName,
      lastName,
      userName,
      email,
      mobile,
      mobileCode,
      password,
      profile,
      referrer,
      address,
      latitude,
      longitude,
      gender,
    } = req.body;

    let pass;
    try {
      pass = await bcrypt.hash(password, 10);
    } catch (err) {
      next(err);
    }
    let userDoc;
    try {
      userDoc = await User.findOne({
        $or: [{ email: email }, { userName: userName }],
      });

      if (userDoc != null && userDoc.email === email) {
        throw new BadRequest("User already registered with this email");
      } else if (userDoc != null && userDoc.userName === userName) {
        throw new BadRequest("This username is already registered");
      } else {
        const path = saveBase64Image(profile, "profile", "profile", "png");
        const newPath = path.split("public/")[1];
        const user = new User({
          _id: new mongoose.Types.ObjectId().toString(),
          firstName: firstName,
          lastName: lastName,
          userName: userName,
          email: email,
          mobile: mobile,
          mobileCode: mobileCode,
          password: pass,
          profile: newPath,
          referralCode: generateShortCode(referrer),
          referrer: referrer,
          location: {
            address: address,
            latitude: latitude,
            longitude: longitude,
          },
          gender: gender,
        });

        await user
          .save()
          .then((doc) => {
            res.json({
              success: true,
              message: "User registered successfully!",
              data: doc,
            });
          })
          .catch((err) => {
            fs.rmSync(path);
            next(err);
          });
      }
    } catch (err) {
      next(err);
    }
  }
}
