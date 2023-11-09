import mongoose from "mongoose";
import Admin from "../models/admin_model.js";
import { BadRequest } from "../../handlers/error_handler.js";
import { saveBase64Image, sendEmail } from "../../utils/app_functions.js";
import { compare, hash } from "bcrypt";
import { generate } from "otp-generator";
import { otpMap } from "../../User/controllers/user_controller.js";
import jsonwebtoken, { decode } from "jsonwebtoken";
import TokenSetting from "../../utils/refresh_token.js";
import fs from "fs";

class AdminAuthController {
  static async signUp(req, res, next) {
    const { firstName, lastName, email, password, profile } = req.body;

    const profilePath = saveBase64Image(profile, "admin", "admin", "png");

    const hashPassword = await hash(password, 10);

    const otp = generate(5, {
      lowerCaseAlphabets: false,
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const admin = new Admin({
      _id: new mongoose.Types.ObjectId().toString(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      profile: profilePath.split("public/")[1],
    });
    await Admin.findOne({ email: req.body.email })
      .then(async (doc) => {
        if (doc) {
          fs.rmSync(profilePath);
          throw new BadRequest("The email is already registered");
        } else {
          await sendEmail(email, otp)
            .then(async (value) => {
              otpMap.set(email, otp);

              await admin
                .save()
                .then((doc) => {
                    const nowDate=Date.now();
                  var token = jsonwebtoken.sign(
                    {doc,nowDate},
                    process.env.JWT_SECRET
                  );
                  TokenSetting.saveToken(email, token);
                  res.json({
                    success: true,
                    message: "Admin has been registered. Verify pin code now",
                    data: doc,
                    token: TokenSetting.getToken(email),
                  });
                })
                .catch((err) => {
                  next(err);
                });
            })
            .catch((err) => {
              next(err);
            });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
  static async verifyotp(req, res, next) {
    const { otp } = req.body;
    var token = req.authToken;
    var decodedData = decode(token).doc;
    const { email } = decodedData;
    console.log(otpMap);
    await Admin.findOneAndUpdate({ email: email },{$set:{tokenAuth:true}},{new:true})
      .then((doc) => {
        if (doc) {
          if (otpMap.get(email) == otp) {
            otpMap.delete(email);
            res.json({
              success: true,
              message: "User verified successfully.",
              data: doc,
              token: token,
            });
          } else {
            throw new BadRequest("Check your entered otp");
          }
        } else {
          throw new BadRequest("User not found");
        }
      })
      .catch((err) => next(err));
  }
  static async login(req, res, next) {
    const { email, password } = req.body;
    const otp = generate(5, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    await Admin.findOneAndUpdate({ email: email },{$set:{tokenAuth:false}},{new:true})
      .then(async (doc) => {
        if (doc) {
          var nowDate = Date.now();
          var token = jsonwebtoken.sign(
            { doc, nowDate },
            process.env.JWT_SECRET
          );
          TokenSetting.saveToken(email, token);
          await compare(password, doc.password)
            .then(async (result) => {
              if (result) {
                await sendEmail(email, otp)
                  .then(() => {
                    otpMap.set(email, otp);
                    res.json({
                      success: true,
                      message:
                        "OTP has been send to your email check your email.",
                      data: doc,
                      token: token,
                    });
                  })
                  .catch((err) => next(err));
              } else {
                throw new BadRequest("Check your password");
              }
            })
            .catch((err) => next(err));
        } else {
          throw new BadRequest("User not found");
        }
      })
      .catch((err) => next(err));
  }
}

export default AdminAuthController;
