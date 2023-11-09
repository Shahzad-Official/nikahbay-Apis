
import { Schema, model } from "mongoose";

var userSchema = new Schema(
  {
    _id: {
      type: String,
      required:true,
    },

    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    mobileCode: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      latitude: {
        type: String,
        required: true,
      },
      longitude: {
        type: String,
        required: true,
      },
    },
    age:{
      type:String,
     default:"",
    },
    height:{
      feet:{
        type:String,
        default:"",
      },
      inches:{
        type:String,
        default:"",
      },
    },
    weight:{
      type:String,
      default:"",
    },
    bio:{
      type:String,
      default:"",
    },
    dob:{
      type:String,
      default:"",
    },
    status:{
      type:String,
     default:"",
    },
    education:{
      type:String,
      default:"",
    },
    religion:{
      type:String,
      default:"",
    },
    languages:{
      type:Array,
      default:"",
    },
    profession:{
      type:String,
      default:"",
    },
    income:{
      type:String,
      default:"",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
    subscription: {
      type: String,
      enum: ["free", "basic", "premium", "gold"],
      default: "free",
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    fcmToken: {
      type: String,
    },
    referralCode: {
      type: String,
    },
    referrerCode: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

const User = model("User", userSchema);
export default User;
